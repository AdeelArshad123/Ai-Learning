import { OpenAI } from 'openai'

interface TrendingTechnology {
  name: string
  category: string
  popularity: number
  description: string
  githubStars?: number
  stackOverflowQuestions?: number
  jobDemand?: number
}

interface GeneratedContent {
  id: string
  title: string
  description: string
  content: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  tags: string[]
  exercises: Exercise[]
  quiz: QuizQuestion[]
  createdAt: Date
  updatedAt: Date
}

interface Exercise {
  id: string
  title: string
  description: string
  code: string
  solution: string
  hints: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export class AIContentGenerator {
  private openai: OpenAI
  private trendingSources: string[]

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.trendingSources = [
      'https://api.github.com/search/repositories',
      'https://api.stackexchange.com/2.3/questions',
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    ]
  }

  // 🔍 Scan trending technologies from multiple sources
  async scanTrendingTechnologies(): Promise<TrendingTechnology[]> {
    try {
      const [githubTrends, stackOverflowTrends, hackerNewsTrends] = await Promise.all([
        this.getGitHubTrends(),
        this.getStackOverflowTrends(),
        this.getHackerNewsTrends()
      ])

      // Combine and rank technologies
      const allTrends = [...githubTrends, ...stackOverflowTrends, ...hackerNewsTrends]
      const rankedTrends = this.rankTechnologies(allTrends)
      
      return rankedTrends.slice(0, 20) // Top 20 trending technologies
    } catch (error) {
      console.error('Error scanning trending technologies:', error)
      return this.getFallbackTrends()
    }
  }

  // 📊 Get GitHub trending repositories
  private async getGitHubTrends(): Promise<TrendingTechnology[]> {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=50'
      )
      const data = await response.json()
      
      return data.items.map((repo: any) => ({
        name: repo.name,
        category: repo.language || 'General',
        popularity: repo.stargazers_count,
        description: repo.description || '',
        githubStars: repo.stargazers_count
      }))
    } catch (error) {
      console.error('Error fetching GitHub trends:', error)
      return []
    }
  }

  // 📈 Get Stack Overflow trending topics
  private async getStackOverflowTrends(): Promise<TrendingTechnology[]> {
    try {
      const response = await fetch(
        'https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&tagged=javascript;python;react;nodejs&site=stackoverflow&pagesize=30'
      )
      const data = await response.json()
      
      const techCounts = new Map<string, number>()
      data.items.forEach((item: any) => {
        item.tags.forEach((tag: string) => {
          techCounts.set(tag, (techCounts.get(tag) || 0) + 1)
        })
      })

      return Array.from(techCounts.entries()).map(([name, count]) => ({
        name,
        category: 'Programming',
        popularity: count,
        description: `Trending topic on Stack Overflow`,
        stackOverflowQuestions: count
      }))
    } catch (error) {
      console.error('Error fetching Stack Overflow trends:', error)
      return []
    }
  }

  // 🔥 Get Hacker News trending tech topics
  private async getHackerNewsTrends(): Promise<TrendingTechnology[]> {
    try {
      const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      const topStories = await topStoriesResponse.json()
      
      const stories = await Promise.all(
        topStories.slice(0, 30).map(async (id: number) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          return storyResponse.json()
        })
      )

      const techKeywords = ['AI', 'React', 'Python', 'JavaScript', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes']
      const techMentions = new Map<string, number>()

      stories.forEach((story: any) => {
        if (story.title) {
          techKeywords.forEach(keyword => {
            if (story.title.toLowerCase().includes(keyword.toLowerCase())) {
              techMentions.set(keyword, (techMentions.get(keyword) || 0) + 1)
            }
          })
        }
      })

      return Array.from(techMentions.entries()).map(([name, count]) => ({
        name,
        category: 'Technology',
        popularity: count,
        description: `Trending on Hacker News`,
        jobDemand: count
      }))
    } catch (error) {
      console.error('Error fetching Hacker News trends:', error)
      return []
    }
  }

  // 🎯 Rank technologies by combined popularity metrics
  private rankTechnologies(technologies: TrendingTechnology[]): TrendingTechnology[] {
    const techMap = new Map<string, TrendingTechnology>()

    technologies.forEach(tech => {
      const existing = techMap.get(tech.name.toLowerCase())
      if (existing) {
        existing.popularity += tech.popularity
        existing.githubStars = Math.max(existing.githubStars || 0, tech.githubStars || 0)
        existing.stackOverflowQuestions = (existing.stackOverflowQuestions || 0) + (tech.stackOverflowQuestions || 0)
        existing.jobDemand = (existing.jobDemand || 0) + (tech.jobDemand || 0)
      } else {
        techMap.set(tech.name.toLowerCase(), { ...tech })
      }
    })

    return Array.from(techMap.values())
      .sort((a, b) => b.popularity - a.popularity)
  }

  // 🔄 Generate comprehensive learning content for a technology
  async generateLearningContent(technology: TrendingTechnology, targetAudience: string = 'intermediate'): Promise<GeneratedContent> {
    try {
      const prompt = `Create comprehensive learning content for ${technology.name} (${technology.category}).
      
      Target Audience: ${targetAudience}
      Technology Description: ${technology.description}
      
      Generate:
      1. A detailed lesson with explanations and examples
      2. 3 practical exercises with solutions
      3. 5 quiz questions with explanations
      4. Estimated learning time
      5. Relevant tags
      
      Format as JSON with the following structure:
      {
        "title": "string",
        "description": "string", 
        "content": "detailed lesson content with code examples",
        "difficulty": "beginner|intermediate|advanced",
        "estimatedTime": number (in minutes),
        "tags": ["array", "of", "tags"],
        "exercises": [
          {
            "title": "string",
            "description": "string",
            "code": "starter code",
            "solution": "complete solution",
            "hints": ["array", "of", "hints"],
            "difficulty": "easy|medium|hard"
          }
        ],
        "quiz": [
          {
            "question": "string",
            "options": ["option1", "option2", "option3", "option4"],
            "correctAnswer": number (0-3),
            "explanation": "string",
            "difficulty": "easy|medium|hard"
          }
        ]
      }`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical educator who creates engaging, practical learning content for developers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })

      const generatedData = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        id: `content_${Date.now()}_${technology.name.toLowerCase().replace(/\s+/g, '_')}`,
        ...generatedData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } catch (error) {
      console.error('Error generating learning content:', error)
      return this.getFallbackContent(technology, targetAudience)
    }
  }

  // 🔄 Auto-generate weekly content updates
  async generateWeeklyContentUpdate(): Promise<GeneratedContent[]> {
    try {
      const trendingTechs = await this.scanTrendingTechnologies()
      const topTechs = trendingTechs.slice(0, 5) // Generate content for top 5 trending technologies
      
      const contentPromises = topTechs.map(tech => 
        this.generateLearningContent(tech, 'intermediate')
      )
      
      const generatedContent = await Promise.all(contentPromises)
      
      // Store in database or cache
      await this.storeGeneratedContent(generatedContent)
      
      return generatedContent
    } catch (error) {
      console.error('Error generating weekly content update:', error)
      return []
    }
  }

  // 💾 Store generated content (implement based on your database)
  private async storeGeneratedContent(content: GeneratedContent[]): Promise<void> {
    // Implementation depends on your database choice
    // For now, we'll store in a JSON file or send to API endpoint
    try {
      const response = await fetch('/api/content/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
      
      if (!response.ok) {
        throw new Error('Failed to store content')
      }
    } catch (error) {
      console.error('Error storing content:', error)
      // Fallback: store locally
      if (typeof window === 'undefined') {
        const fs = require('fs')
        fs.writeFileSync(
          `generated-content-${Date.now()}.json`, 
          JSON.stringify(content, null, 2)
        )
      }
    }
  }

  // 🔄 Get fallback trending technologies
  private getFallbackTrends(): TrendingTechnology[] {
    return [
      { name: 'React', category: 'Frontend', popularity: 1000, description: 'Popular JavaScript library for building user interfaces' },
      { name: 'Python', category: 'Programming Language', popularity: 950, description: 'Versatile programming language for web development, data science, and AI' },
      { name: 'TypeScript', category: 'Programming Language', popularity: 900, description: 'Typed superset of JavaScript' },
      { name: 'Node.js', category: 'Backend', popularity: 850, description: 'JavaScript runtime for server-side development' },
      { name: 'Docker', category: 'DevOps', popularity: 800, description: 'Containerization platform for application deployment' }
    ]
  }

  // 🔄 Get fallback content
  private getFallbackContent(technology: TrendingTechnology, targetAudience: string): GeneratedContent {
    return {
      id: `fallback_${Date.now()}_${technology.name.toLowerCase().replace(/\s+/g, '_')}`,
      title: `Introduction to ${technology.name}`,
      description: `Learn the basics of ${technology.name} and how to get started`,
      content: `# ${technology.name} Overview\n\n${technology.description}\n\nThis is a comprehensive introduction to ${technology.name} for ${targetAudience} developers.`,
      difficulty: targetAudience as any,
      estimatedTime: 30,
      tags: [technology.name.toLowerCase(), technology.category.toLowerCase()],
      exercises: [],
      quiz: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

// Export singleton instance
export const aiContentGenerator = new AIContentGenerator()
