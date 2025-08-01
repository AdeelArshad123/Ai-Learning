import { OpenAI } from 'openai'

interface MicroLearningChunk {
  id: string
  title: string
  concept: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number // in minutes
  content: {
    explanation: string
    keyPoints: string[]
    examples: CodeExample[]
    visualAids?: string[]
    mnemonics?: string[]
  }
  prerequisites: string[]
  nextChunks: string[]
  practiceExercises: Exercise[]
  assessmentQuestions: Question[]
  spacedRepetition: {
    interval: number // days
    easeFactor: number
    repetitions: number
    nextReview: Date
  }
  metadata: {
    topic: string
    subtopic: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
  }
}

interface CodeExample {
  id: string
  language: string
  code: string
  explanation: string
  output?: string
  interactive: boolean
}

interface Exercise {
  id: string
  type: 'coding' | 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'matching'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  hints: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'code-completion'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

interface LearningPath {
  id: string
  userId: string
  topic: string
  chunks: string[] // chunk IDs in order
  currentChunk: number
  progress: {
    completedChunks: string[]
    masteredChunks: string[]
    strugglingChunks: string[]
    totalTimeSpent: number
    averageScore: number
  }
  adaptiveSettings: {
    paceAdjustment: 'slow' | 'normal' | 'fast'
    difficultyPreference: 'easier' | 'standard' | 'challenging'
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    sessionLength: number // preferred minutes per session
  }
  spacedRepetitionSchedule: {
    chunkId: string
    nextReview: Date
    priority: 'low' | 'medium' | 'high'
  }[]
}

interface UserPerformance {
  userId: string
  chunkId: string
  attempts: number
  bestScore: number
  averageScore: number
  timeSpent: number
  lastAttempt: Date
  masteryLevel: 'novice' | 'developing' | 'proficient' | 'expert'
  strugglingAreas: string[]
  strengths: string[]
}

export class AIMicrolearningEngine {
  private openai: OpenAI
  private chunkCache: Map<string, MicroLearningChunk>
  private performanceCache: Map<string, UserPerformance>

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.chunkCache = new Map()
    this.performanceCache = new Map()
  }

  // 🧩 Break complex topics into digestible chunks
  async createMicrolearningChunks(
    topic: string,
    complexity: 'beginner' | 'intermediate' | 'advanced',
    targetChunkCount: number = 8
  ): Promise<MicroLearningChunk[]> {
    try {
      const prompt = `Break down the topic "${topic}" into ${targetChunkCount} digestible microlearning chunks for ${complexity} level learners.

      Each chunk should:
      1. Focus on ONE specific concept
      2. Be completable in 5-15 minutes
      3. Include practical examples
      4. Have clear prerequisites and next steps
      5. Include practice exercises
      6. Have assessment questions

      Create a logical learning progression where each chunk builds on previous ones.

      Format as JSON array of MicroLearningChunk objects with:
      - Clear, engaging titles
      - Comprehensive explanations with examples
      - Interactive coding exercises where applicable
      - Multiple-choice and practical assessment questions
      - Proper prerequisite mapping
      - Spaced repetition parameters

      Focus on practical, hands-on learning with real-world applications.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert instructional designer who creates engaging, effective microlearning content. Focus on practical, hands-on learning with clear progression.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })

      const chunksData = JSON.parse(response.choices[0].message.content || '[]')
      
      const chunks: MicroLearningChunk[] = chunksData.map((chunk: any, index: number) => ({
        id: `chunk_${Date.now()}_${index}`,
        ...chunk,
        spacedRepetition: {
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0,
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
        },
        metadata: {
          topic,
          subtopic: chunk.concept,
          tags: this.extractTags(chunk.content?.explanation || ''),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }))

      // Cache the chunks
      chunks.forEach(chunk => {
        this.chunkCache.set(chunk.id, chunk)
      })

      return chunks
    } catch (error) {
      console.error('Error creating microlearning chunks:', error)
      return this.getFallbackChunks(topic, complexity)
    }
  }

  // 🎯 Adaptive spaced repetition system
  async updateSpacedRepetition(
    userId: string,
    chunkId: string,
    performance: {
      score: number
      timeSpent: number
      difficulty: 'easy' | 'medium' | 'hard'
    }
  ): Promise<{
    nextReview: Date
    interval: number
    easeFactor: number
    masteryLevel: 'novice' | 'developing' | 'proficient' | 'expert'
  }> {
    try {
      const chunk = this.chunkCache.get(chunkId)
      if (!chunk) {
        throw new Error('Chunk not found')
      }

      const userPerf = this.performanceCache.get(`${userId}_${chunkId}`) || {
        userId,
        chunkId,
        attempts: 0,
        bestScore: 0,
        averageScore: 0,
        timeSpent: 0,
        lastAttempt: new Date(),
        masteryLevel: 'novice' as const,
        strugglingAreas: [],
        strengths: []
      }

      // Update performance data
      userPerf.attempts += 1
      userPerf.bestScore = Math.max(userPerf.bestScore, performance.score)
      userPerf.averageScore = ((userPerf.averageScore * (userPerf.attempts - 1)) + performance.score) / userPerf.attempts
      userPerf.timeSpent += performance.timeSpent
      userPerf.lastAttempt = new Date()

      // Calculate new spaced repetition parameters using SM-2 algorithm
      let { interval, easeFactor, repetitions } = chunk.spacedRepetition
      
      // Quality of response (0-5 scale)
      const quality = this.calculateQuality(performance.score, performance.difficulty)
      
      if (quality >= 3) {
        // Correct response
        if (repetitions === 0) {
          interval = 1
        } else if (repetitions === 1) {
          interval = 6
        } else {
          interval = Math.round(interval * easeFactor)
        }
        repetitions += 1
      } else {
        // Incorrect response - reset
        repetitions = 0
        interval = 1
      }

      // Update ease factor
      easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

      // Calculate mastery level
      const masteryLevel = this.calculateMasteryLevel(userPerf.averageScore, userPerf.attempts, repetitions)
      userPerf.masteryLevel = masteryLevel

      // Update chunk's spaced repetition data
      chunk.spacedRepetition = {
        interval,
        easeFactor,
        repetitions,
        nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000)
      }

      // Cache updated performance
      this.performanceCache.set(`${userId}_${chunkId}`, userPerf)

      return {
        nextReview: chunk.spacedRepetition.nextReview,
        interval,
        easeFactor,
        masteryLevel
      }
    } catch (error) {
      console.error('Error updating spaced repetition:', error)
      return {
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        interval: 1,
        easeFactor: 2.5,
        masteryLevel: 'novice'
      }
    }
  }

  // 📚 Generate personalized learning path
  async generatePersonalizedPath(
    userId: string,
    topic: string,
    userProfile: {
      skillLevel: 'beginner' | 'intermediate' | 'advanced'
      learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
      availableTime: number // minutes per day
      goals: string[]
      weakAreas: string[]
      strongAreas: string[]
    }
  ): Promise<LearningPath> {
    try {
      // Create chunks for the topic
      const chunks = await this.createMicrolearningChunks(topic, userProfile.skillLevel)
      
      // Analyze user's weak areas to prioritize certain chunks
      const prioritizedChunks = this.prioritizeChunks(chunks, userProfile.weakAreas, userProfile.strongAreas)
      
      // Create adaptive settings based on user profile
      const adaptiveSettings = {
        paceAdjustment: this.determinePace(userProfile.availableTime),
        difficultyPreference: this.determineDifficultyPreference(userProfile.skillLevel),
        learningStyle: userProfile.learningStyle,
        sessionLength: Math.min(userProfile.availableTime, 30) // Max 30 min sessions
      }

      // Generate spaced repetition schedule
      const spacedRepetitionSchedule = chunks.map(chunk => ({
        chunkId: chunk.id,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // Start tomorrow
        priority: this.determinePriority(chunk.concept, userProfile.weakAreas)
      }))

      const learningPath: LearningPath = {
        id: `path_${Date.now()}_${userId}`,
        userId,
        topic,
        chunks: prioritizedChunks.map(chunk => chunk.id),
        currentChunk: 0,
        progress: {
          completedChunks: [],
          masteredChunks: [],
          strugglingChunks: [],
          totalTimeSpent: 0,
          averageScore: 0
        },
        adaptiveSettings,
        spacedRepetitionSchedule
      }

      return learningPath
    } catch (error) {
      console.error('Error generating personalized path:', error)
      return this.getFallbackPath(userId, topic)
    }
  }

  // 🔄 Get chunks due for review
  async getChunksDueForReview(userId: string): Promise<MicroLearningChunk[]> {
    const now = new Date()
    const dueChunks: MicroLearningChunk[] = []

    for (const [chunkId, chunk] of this.chunkCache) {
      if (chunk.spacedRepetition.nextReview <= now) {
        // Check if user has interacted with this chunk
        const userPerf = this.performanceCache.get(`${userId}_${chunkId}`)
        if (userPerf && userPerf.attempts > 0) {
          dueChunks.push(chunk)
        }
      }
    }

    // Sort by priority (struggling chunks first)
    return dueChunks.sort((a, b) => {
      const perfA = this.performanceCache.get(`${userId}_${a.id}`)
      const perfB = this.performanceCache.get(`${userId}_${b.id}`)
      
      if (!perfA || !perfB) return 0
      
      // Prioritize struggling chunks
      if (perfA.averageScore < 70 && perfB.averageScore >= 70) return -1
      if (perfA.averageScore >= 70 && perfB.averageScore < 70) return 1
      
      return 0
    })
  }

  // 🎨 Adapt content based on learning style
  async adaptContentForLearningStyle(
    chunk: MicroLearningChunk,
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  ): Promise<MicroLearningChunk> {
    try {
      const prompt = `Adapt this learning content for a ${learningStyle} learner:

      Original Content:
      Title: ${chunk.title}
      Concept: ${chunk.concept}
      Explanation: ${chunk.content.explanation}

      Adapt the content to be more effective for ${learningStyle} learning style:
      - Visual: Add diagrams, flowcharts, code visualizations, infographics
      - Auditory: Add audio explanations, verbal mnemonics, discussion prompts
      - Kinesthetic: Add hands-on exercises, interactive elements, physical analogies
      - Reading: Add detailed text, written examples, comprehensive documentation

      Return JSON with adapted content structure.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in learning styles and instructional design. Adapt content to maximize learning effectiveness.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 2000
      })

      const adaptedContent = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        ...chunk,
        content: {
          ...chunk.content,
          ...adaptedContent
        },
        metadata: {
          ...chunk.metadata,
          updatedAt: new Date()
        }
      }
    } catch (error) {
      console.error('Error adapting content:', error)
      return chunk
    }
  }

  // 🔧 Private helper methods
  private calculateQuality(score: number, difficulty: 'easy' | 'medium' | 'hard'): number {
    let baseQuality = Math.floor(score / 20) // 0-5 scale
    
    // Adjust for difficulty
    if (difficulty === 'easy' && score >= 80) baseQuality = Math.min(5, baseQuality + 1)
    if (difficulty === 'hard' && score >= 60) baseQuality = Math.min(5, baseQuality + 1)
    
    return Math.max(0, Math.min(5, baseQuality))
  }

  private calculateMasteryLevel(averageScore: number, attempts: number, repetitions: number): 'novice' | 'developing' | 'proficient' | 'expert' {
    if (averageScore >= 90 && repetitions >= 3) return 'expert'
    if (averageScore >= 80 && repetitions >= 2) return 'proficient'
    if (averageScore >= 70 && attempts >= 2) return 'developing'
    return 'novice'
  }

  private extractTags(content: string): string[] {
    // Simple tag extraction based on common programming terms
    const commonTags = ['javascript', 'python', 'react', 'node', 'api', 'database', 'function', 'variable', 'loop', 'array', 'object']
    return commonTags.filter(tag => content.toLowerCase().includes(tag))
  }

  private prioritizeChunks(chunks: MicroLearningChunk[], weakAreas: string[], strongAreas: string[]): MicroLearningChunk[] {
    return chunks.sort((a, b) => {
      const aIsWeak = weakAreas.some(area => a.concept.toLowerCase().includes(area.toLowerCase()))
      const bIsWeak = weakAreas.some(area => b.concept.toLowerCase().includes(area.toLowerCase()))
      
      if (aIsWeak && !bIsWeak) return -1
      if (!aIsWeak && bIsWeak) return 1
      
      return 0
    })
  }

  private determinePace(availableTime: number): 'slow' | 'normal' | 'fast' {
    if (availableTime < 30) return 'slow'
    if (availableTime > 60) return 'fast'
    return 'normal'
  }

  private determineDifficultyPreference(skillLevel: 'beginner' | 'intermediate' | 'advanced'): 'easier' | 'standard' | 'challenging' {
    switch (skillLevel) {
      case 'beginner': return 'easier'
      case 'advanced': return 'challenging'
      default: return 'standard'
    }
  }

  private determinePriority(concept: string, weakAreas: string[]): 'low' | 'medium' | 'high' {
    const isWeak = weakAreas.some(area => concept.toLowerCase().includes(area.toLowerCase()))
    return isWeak ? 'high' : 'medium'
  }

  private getFallbackChunks(topic: string, complexity: 'beginner' | 'intermediate' | 'advanced'): MicroLearningChunk[] {
    return [{
      id: `fallback_chunk_${Date.now()}`,
      title: `Introduction to ${topic}`,
      concept: `Basic ${topic} concepts`,
      difficulty: complexity,
      estimatedTime: 10,
      content: {
        explanation: `Learn the fundamentals of ${topic}`,
        keyPoints: [`Understanding ${topic}`, 'Practical applications', 'Best practices'],
        examples: []
      },
      prerequisites: [],
      nextChunks: [],
      practiceExercises: [],
      assessmentQuestions: [],
      spacedRepetition: {
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      metadata: {
        topic,
        subtopic: 'Introduction',
        tags: [topic.toLowerCase()],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }]
  }

  private getFallbackPath(userId: string, topic: string): LearningPath {
    return {
      id: `fallback_path_${Date.now()}`,
      userId,
      topic,
      chunks: [],
      currentChunk: 0,
      progress: {
        completedChunks: [],
        masteredChunks: [],
        strugglingChunks: [],
        totalTimeSpent: 0,
        averageScore: 0
      },
      adaptiveSettings: {
        paceAdjustment: 'normal',
        difficultyPreference: 'standard',
        learningStyle: 'reading',
        sessionLength: 20
      },
      spacedRepetitionSchedule: []
    }
  }
}

// Export singleton instance
export const aiMicrolearningEngine = new AIMicrolearningEngine()
