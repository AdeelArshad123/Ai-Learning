import { OpenAI } from 'openai'

interface UserProfile {
  id: string
  name: string
  email: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  goals: string[]
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  availableTime: number // minutes per day
  preferredLanguages: string[]
  currentStreak: number
  totalXP: number
  completedTopics: string[]
  weakAreas: string[]
  strongAreas: string[]
  lastActive: Date
  joinedAt: Date
  githubProfile?: string
  linkedinProfile?: string
}

interface LearningPath {
  id: string
  userId: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedDuration: number // in days
  modules: LearningModule[]
  prerequisites: string[]
  outcomes: string[]
  adaptiveElements: {
    canSkipModules: boolean
    canRepeatModules: boolean
    hasAlternativePaths: boolean
    difficultyAdjustment: boolean
  }
  progress: {
    currentModule: number
    completedModules: number[]
    totalModules: number
    percentComplete: number
    estimatedCompletion: Date
  }
  createdAt: Date
  updatedAt: Date
}

interface LearningModule {
  id: string
  title: string
  description: string
  type: 'lesson' | 'exercise' | 'quiz' | 'project' | 'assessment'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // in minutes
  content: any
  prerequisites: string[]
  learningObjectives: string[]
  resources: Resource[]
  adaptiveContent: {
    beginnerVersion?: any
    intermediateVersion?: any
    advancedVersion?: any
  }
}

interface Resource {
  type: 'video' | 'article' | 'documentation' | 'tutorial' | 'book'
  title: string
  url: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
}

interface PersonalizedRecommendation {
  id: string
  userId: string
  type: 'content' | 'path' | 'skill' | 'career' | 'project'
  title: string
  description: string
  reasoning: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  confidence: number // 0-1
  estimatedImpact: number // 0-1
  actionable: boolean
  action?: {
    type: 'start_path' | 'complete_module' | 'practice_skill' | 'join_community'
    data: any
  }
  expiresAt?: Date
  createdAt: Date
}

export class AIUserJourneyEngine {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  // 🎯 Analyze user's GitHub profile for skill assessment
  async analyzeGitHubProfile(githubUsername: string): Promise<Partial<UserProfile>> {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`)
      const profile = await response.json()
      
      const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=50`)
      const repos = await reposResponse.json()

      // Analyze languages and technologies
      const languages = new Map<string, number>()
      const technologies = new Set<string>()
      
      repos.forEach((repo: any) => {
        if (repo.language) {
          languages.set(repo.language, (languages.get(repo.language) || 0) + 1)
        }
        
        // Extract technologies from repo names and descriptions
        const text = `${repo.name} ${repo.description || ''}`.toLowerCase()
        const techKeywords = ['react', 'vue', 'angular', 'node', 'express', 'django', 'flask', 'spring', 'docker', 'kubernetes']
        techKeywords.forEach(tech => {
          if (text.includes(tech)) {
            technologies.add(tech)
          }
        })
      })

      // Determine skill level based on activity and complexity
      const totalRepos = repos.length
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
      const recentActivity = repos.filter((repo: any) => 
        new Date(repo.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      ).length

      let skillLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
      if (totalRepos > 20 && totalStars > 50 && recentActivity > 5) {
        skillLevel = 'advanced'
      } else if (totalRepos > 10 && totalStars > 10 && recentActivity > 2) {
        skillLevel = 'intermediate'
      }

      return {
        skillLevel,
        preferredLanguages: Array.from(languages.keys()).slice(0, 5),
        interests: Array.from(technologies),
        strongAreas: Array.from(languages.keys()).slice(0, 3),
        githubProfile: githubUsername
      }
    } catch (error) {
      console.error('Error analyzing GitHub profile:', error)
      return {}
    }
  }

  // 🛤️ Generate personalized learning path
  async generatePersonalizedPath(userProfile: UserProfile, goal: string): Promise<LearningPath> {
    try {
      const prompt = `Create a personalized learning path for a ${userProfile.skillLevel} developer.

      User Profile:
      - Skill Level: ${userProfile.skillLevel}
      - Interests: ${userProfile.interests.join(', ')}
      - Goals: ${userProfile.goals.join(', ')}
      - Learning Style: ${userProfile.learningStyle}
      - Available Time: ${userProfile.availableTime} minutes/day
      - Preferred Languages: ${userProfile.preferredLanguages.join(', ')}
      - Strong Areas: ${userProfile.strongAreas.join(', ')}
      - Weak Areas: ${userProfile.weakAreas.join(', ')}

      Target Goal: ${goal}

      Generate a comprehensive learning path with:
      1. 8-12 progressive modules
      2. Estimated timeline based on available time
      3. Prerequisites and learning objectives
      4. Adaptive content for different skill levels
      5. Practical projects and assessments

      Format as JSON with the LearningPath interface structure.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert learning path designer who creates personalized, adaptive curricula for developers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })

      const pathData = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        id: `path_${Date.now()}_${userProfile.id}`,
        userId: userProfile.id,
        ...pathData,
        progress: {
          currentModule: 0,
          completedModules: [],
          totalModules: pathData.modules?.length || 0,
          percentComplete: 0,
          estimatedCompletion: this.calculateEstimatedCompletion(
            pathData.modules || [],
            userProfile.availableTime
          )
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } catch (error) {
      console.error('Error generating personalized path:', error)
      return this.getFallbackPath(userProfile, goal)
    }
  }

  // 🔄 Automatically adjust difficulty based on performance
  async adjustDifficultyBasedOnPerformance(
    userId: string,
    moduleId: string,
    performance: {
      score: number
      timeSpent: number
      attemptsCount: number
      struggledAreas: string[]
    }
  ): Promise<{
    newDifficulty: 'easy' | 'medium' | 'hard'
    adjustmentReason: string
    recommendedActions: string[]
  }> {
    try {
      // Analyze performance patterns
      const performanceScore = this.calculatePerformanceScore(performance)
      let newDifficulty: 'easy' | 'medium' | 'hard' = 'medium'
      let adjustmentReason = ''
      const recommendedActions: string[] = []

      if (performanceScore < 0.3) {
        // Poor performance - reduce difficulty
        newDifficulty = 'easy'
        adjustmentReason = 'Performance indicates content is too challenging. Reducing difficulty to build confidence.'
        recommendedActions.push('Review prerequisite concepts')
        recommendedActions.push('Practice with easier exercises')
        recommendedActions.push('Watch introductory videos')
      } else if (performanceScore > 0.8) {
        // Excellent performance - increase difficulty
        newDifficulty = 'hard'
        adjustmentReason = 'Excellent performance indicates readiness for more challenging content.'
        recommendedActions.push('Try advanced exercises')
        recommendedActions.push('Explore related advanced topics')
        recommendedActions.push('Work on real-world projects')
      } else {
        // Good performance - maintain current level
        adjustmentReason = 'Performance is appropriate for current difficulty level.'
        recommendedActions.push('Continue with current pace')
        recommendedActions.push('Focus on practical applications')
      }

      return {
        newDifficulty,
        adjustmentReason,
        recommendedActions
      }
    } catch (error) {
      console.error('Error adjusting difficulty:', error)
      return {
        newDifficulty: 'medium',
        adjustmentReason: 'Unable to analyze performance, maintaining current difficulty',
        recommendedActions: ['Continue with current content']
      }
    }
  }

  // 🎯 Generate predictive content recommendations
  async generatePredictiveRecommendations(userProfile: UserProfile): Promise<PersonalizedRecommendation[]> {
    try {
      const prompt = `Generate personalized learning recommendations for this user profile:

      User Profile:
      - Skill Level: ${userProfile.skillLevel}
      - Interests: ${userProfile.interests.join(', ')}
      - Goals: ${userProfile.goals.join(', ')}
      - Learning Style: ${userProfile.learningStyle}
      - Current Streak: ${userProfile.currentStreak} days
      - Completed Topics: ${userProfile.completedTopics.join(', ')}
      - Weak Areas: ${userProfile.weakAreas.join(', ')}
      - Strong Areas: ${userProfile.strongAreas.join(', ')}

      Generate 5-8 personalized recommendations including:
      1. Next learning topics based on completed work
      2. Skill gap analysis and improvement suggestions
      3. Career advancement opportunities
      4. Project ideas matching their interests
      5. Community engagement suggestions

      Consider:
      - Market trends and job demand
      - Natural progression from current skills
      - Time constraints and learning style
      - Motivation and engagement factors

      Format as JSON array of PersonalizedRecommendation objects.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI career advisor and learning strategist who provides data-driven, personalized recommendations for developers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })

      const recommendations = JSON.parse(response.choices[0].message.content || '[]')
      
      return recommendations.map((rec: any, index: number) => ({
        id: `rec_${Date.now()}_${index}`,
        userId: userProfile.id,
        ...rec,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }))
    } catch (error) {
      console.error('Error generating recommendations:', error)
      return this.getFallbackRecommendations(userProfile)
    }
  }

  // 📊 Calculate performance score
  private calculatePerformanceScore(performance: {
    score: number
    timeSpent: number
    attemptsCount: number
    struggledAreas: string[]
  }): number {
    const scoreWeight = 0.4
    const timeWeight = 0.2
    const attemptsWeight = 0.2
    const strugglesWeight = 0.2

    // Normalize scores (0-1)
    const normalizedScore = performance.score / 100
    const normalizedTime = Math.max(0, 1 - (performance.timeSpent / 120)) // Assume 120 min is max expected
    const normalizedAttempts = Math.max(0, 1 - (performance.attemptsCount / 5)) // 5 attempts is poor
    const normalizedStruggles = Math.max(0, 1 - (performance.struggledAreas.length / 10)) // 10 areas is many

    return (
      normalizedScore * scoreWeight +
      normalizedTime * timeWeight +
      normalizedAttempts * attemptsWeight +
      normalizedStruggles * strugglesWeight
    )
  }

  // 📅 Calculate estimated completion date
  private calculateEstimatedCompletion(modules: LearningModule[], availableTimePerDay: number): Date {
    const totalMinutes = modules.reduce((sum, module) => sum + module.estimatedTime, 0)
    const totalDays = Math.ceil(totalMinutes / availableTimePerDay)
    return new Date(Date.now() + totalDays * 24 * 60 * 60 * 1000)
  }

  // 🔄 Get fallback learning path
  private getFallbackPath(userProfile: UserProfile, goal: string): LearningPath {
    return {
      id: `fallback_path_${Date.now()}`,
      userId: userProfile.id,
      title: `${goal} Learning Path`,
      description: `Personalized learning path for ${goal}`,
      difficulty: userProfile.skillLevel,
      estimatedDuration: 30,
      modules: [],
      prerequisites: [],
      outcomes: [`Master ${goal}`, 'Build practical projects', 'Gain industry-relevant skills'],
      adaptiveElements: {
        canSkipModules: true,
        canRepeatModules: true,
        hasAlternativePaths: true,
        difficultyAdjustment: true
      },
      progress: {
        currentModule: 0,
        completedModules: [],
        totalModules: 0,
        percentComplete: 0,
        estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  // 🔄 Get fallback recommendations
  private getFallbackRecommendations(userProfile: UserProfile): PersonalizedRecommendation[] {
    return [
      {
        id: `fallback_rec_${Date.now()}`,
        userId: userProfile.id,
        type: 'content',
        title: 'Continue Learning Journey',
        description: 'Based on your progress, continue with the next module in your current path',
        reasoning: 'Maintaining consistent progress is key to skill development',
        priority: 'medium',
        confidence: 0.8,
        estimatedImpact: 0.7,
        actionable: true,
        createdAt: new Date()
      }
    ]
  }
}

// Export singleton instance
export const aiUserJourneyEngine = new AIUserJourneyEngine()
