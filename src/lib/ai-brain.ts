// 🧠 AI Learning Brain - Central Intelligence System
// This can run on both client and server

export interface UserLearningProfile {
  id: string
  name: string
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  goals: string[]
  weakAreas: string[]
  strengths: string[]
  preferredPace: 'slow' | 'medium' | 'fast'
  optimalLearningTime: string[]
  completedTopics: string[]
  currentStreak: number
  totalXP: number
  level: number
  achievements: Achievement[]
  learningPatterns: LearningPattern[]
}

export interface LearningPattern {
  timeOfDay: string
  duration: number
  topicType: string
  successRate: number
  engagementLevel: number
  completionRate: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  xpReward: number
  category: 'learning' | 'streak' | 'skill' | 'community' | 'project'
}

export interface AIInsight {
  type: 'recommendation' | 'warning' | 'celebration' | 'tip'
  title: string
  message: string
  actionable: boolean
  action?: string
  priority: 'low' | 'medium' | 'high'
  category: string
}

export interface PredictiveAnalysis {
  completionProbability: number
  estimatedTimeToGoal: string
  recommendedActions: string[]
  potentialObstacles: string[]
  successFactors: string[]
}

export class AILearningBrain {
  private userProfile: UserLearningProfile
  private learningHistory: any[]
  private contextData: any

  constructor(userProfile: UserLearningProfile) {
    this.userProfile = userProfile
    this.learningHistory = []
    this.contextData = {}
  }

  // 🎯 Analyze user's learning patterns
  analyzeLearningPatterns(): LearningPattern[] {
    const patterns: LearningPattern[] = []
    
    // Analyze time-based patterns
    const timePatterns = this.analyzeTimePatterns()
    const topicPatterns = this.analyzeTopicPatterns()
    const engagementPatterns = this.analyzeEngagementPatterns()
    
    return [...timePatterns, ...topicPatterns, ...engagementPatterns]
  }

  // 🧠 Generate personalized insights
  generateInsights(): AIInsight[] {
    const insights: AIInsight[] = []
    
    // Learning streak insights
    if (this.userProfile.currentStreak >= 7) {
      insights.push({
        type: 'celebration',
        title: '🔥 Amazing Streak!',
        message: `You're on a ${this.userProfile.currentStreak}-day learning streak! Keep it up!`,
        actionable: false,
        priority: 'medium',
        category: 'motivation'
      })
    }
    
    // Skill gap insights
    if (this.userProfile.weakAreas.length > 0) {
      insights.push({
        type: 'recommendation',
        title: '🎯 Focus Area Detected',
        message: `Consider strengthening your ${this.userProfile.weakAreas[0]} skills`,
        actionable: true,
        action: `practice-${this.userProfile.weakAreas[0]}`,
        priority: 'high',
        category: 'skill-development'
      })
    }
    
    // Learning time optimization
    const optimalTime = this.getOptimalLearningTime()
    if (optimalTime) {
      insights.push({
        type: 'tip',
        title: '⏰ Optimal Learning Time',
        message: `You learn best around ${optimalTime}. Schedule important topics then!`,
        actionable: true,
        action: 'schedule-learning',
        priority: 'medium',
        category: 'optimization'
      })
    }
    
    return insights
  }

  // 📊 Predict learning outcomes
  predictLearningOutcome(topic: string, timeframe: string): PredictiveAnalysis {
    const userSkillLevel = this.userProfile.skillLevel
    const relatedExperience = this.getRelatedExperience(topic)
    const learningVelocity = this.calculateLearningVelocity()
    
    // Calculate completion probability based on multiple factors
    let completionProbability = 0.5 // Base probability
    
    // Adjust based on skill level
    if (userSkillLevel === 'advanced') completionProbability += 0.3
    else if (userSkillLevel === 'intermediate') completionProbability += 0.1
    
    // Adjust based on related experience
    completionProbability += relatedExperience * 0.2
    
    // Adjust based on learning velocity
    completionProbability += learningVelocity * 0.2
    
    // Adjust based on current streak
    if (this.userProfile.currentStreak > 5) completionProbability += 0.1
    
    // Cap at 95%
    completionProbability = Math.min(completionProbability, 0.95)
    
    return {
      completionProbability: Math.round(completionProbability * 100),
      estimatedTimeToGoal: this.estimateTimeToGoal(topic, timeframe),
      recommendedActions: this.getRecommendedActions(topic),
      potentialObstacles: this.identifyPotentialObstacles(topic),
      successFactors: this.identifySuccessFactors(topic)
    }
  }

  // 🎨 Generate personalized content recommendations
  generateContentRecommendations(limit: number = 5): any[] {
    const recommendations = []
    
    // Based on weak areas
    this.userProfile.weakAreas.forEach(area => {
      recommendations.push({
        type: 'skill-building',
        title: `Master ${area}`,
        description: `Focused practice to strengthen your ${area} skills`,
        difficulty: this.userProfile.skillLevel,
        estimatedTime: '30-45 minutes',
        priority: 'high',
        reason: `Identified as a weak area in your profile`
      })
    })
    
    // Based on interests
    this.userProfile.interests.forEach(interest => {
      recommendations.push({
        type: 'exploration',
        title: `Advanced ${interest} Concepts`,
        description: `Dive deeper into ${interest} with advanced topics`,
        difficulty: this.getNextDifficultyLevel(),
        estimatedTime: '45-60 minutes',
        priority: 'medium',
        reason: `Matches your interest in ${interest}`
      })
    })
    
    // Based on learning patterns
    const optimalTopicType = this.getOptimalTopicType()
    if (optimalTopicType) {
      recommendations.push({
        type: 'optimized',
        title: `${optimalTopicType} Practice Session`,
        description: `Optimized for your learning style and patterns`,
        difficulty: this.userProfile.skillLevel,
        estimatedTime: '30 minutes',
        priority: 'high',
        reason: 'Optimized based on your learning patterns'
      })
    }
    
    return recommendations.slice(0, limit)
  }

  // 🎯 Adaptive difficulty adjustment
  adjustDifficulty(currentDifficulty: string, performanceScore: number): string {
    if (performanceScore >= 90) {
      // User is excelling, increase difficulty
      if (currentDifficulty === 'beginner') return 'intermediate'
      if (currentDifficulty === 'intermediate') return 'advanced'
      return 'advanced'
    } else if (performanceScore <= 60) {
      // User is struggling, decrease difficulty
      if (currentDifficulty === 'advanced') return 'intermediate'
      if (currentDifficulty === 'intermediate') return 'beginner'
      return 'beginner'
    }
    
    // Performance is good, maintain current difficulty
    return currentDifficulty
  }

  // 🏆 Achievement system
  checkAchievements(action: string, data: any): Achievement[] {
    const newAchievements: Achievement[] = []
    
    // Streak achievements
    if (action === 'daily-login' && this.userProfile.currentStreak === 7) {
      newAchievements.push({
        id: 'week-streak',
        title: '🔥 Week Warrior',
        description: 'Maintained a 7-day learning streak',
        icon: '🔥',
        unlockedAt: new Date(),
        xpReward: 100,
        category: 'streak'
      })
    }
    
    // Skill achievements
    if (action === 'topic-completed' && data.difficulty === 'advanced') {
      newAchievements.push({
        id: 'advanced-master',
        title: '🎓 Advanced Master',
        description: 'Completed an advanced topic',
        icon: '🎓',
        unlockedAt: new Date(),
        xpReward: 200,
        category: 'skill'
      })
    }
    
    // XP milestones
    if (action === 'xp-gained' && this.userProfile.totalXP >= 1000) {
      newAchievements.push({
        id: 'xp-1000',
        title: '⭐ Rising Star',
        description: 'Earned 1000 XP points',
        icon: '⭐',
        unlockedAt: new Date(),
        xpReward: 0,
        category: 'learning'
      })
    }
    
    return newAchievements
  }

  // 🔍 Advanced Learning Style Detection
  detectLearningStyle(interactionData: any[]): 'visual' | 'auditory' | 'kinesthetic' | 'reading' {
    const styleScores = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      reading: 0
    }

    interactionData.forEach(interaction => {
      switch (interaction.type) {
        case 'video_watched':
        case 'diagram_viewed':
        case 'code_highlighted':
          styleScores.visual += interaction.engagementScore || 1
          break
        case 'audio_played':
        case 'voice_command':
        case 'discussion_participated':
          styleScores.auditory += interaction.engagementScore || 1
          break
        case 'code_typed':
        case 'exercise_completed':
        case 'project_built':
          styleScores.kinesthetic += interaction.engagementScore || 1
          break
        case 'article_read':
        case 'documentation_viewed':
        case 'text_highlighted':
          styleScores.reading += interaction.engagementScore || 1
          break
      }
    })

    return Object.entries(styleScores).reduce((a, b) =>
      styleScores[a[0] as keyof typeof styleScores] > styleScores[b[0] as keyof typeof styleScores] ? a : b
    )[0] as 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  }

  // 🎯 Optimal Study Time Detection
  detectOptimalStudyTimes(sessionData: any[]): string[] {
    const hourlyPerformance: { [hour: string]: { total: number, count: number, avg: number } } = {}

    sessionData.forEach(session => {
      const hour = new Date(session.timestamp).getHours().toString().padStart(2, '0') + ':00'
      if (!hourlyPerformance[hour]) {
        hourlyPerformance[hour] = { total: 0, count: 0, avg: 0 }
      }
      hourlyPerformance[hour].total += session.performanceScore || 0
      hourlyPerformance[hour].count += 1
      hourlyPerformance[hour].avg = hourlyPerformance[hour].total / hourlyPerformance[hour].count
    })

    return Object.entries(hourlyPerformance)
      .filter(([_, data]) => data.count >= 3) // Minimum 3 sessions
      .sort(([_, a], [__, b]) => b.avg - a.avg)
      .slice(0, 3)
      .map(([hour, _]) => hour)
  }

  // 🧠 Motivation & Fatigue Tracking
  trackMotivationLevel(recentSessions: any[]): {
    currentLevel: number
    trend: 'increasing' | 'decreasing' | 'stable'
    fatigueRisk: 'low' | 'medium' | 'high'
    recommendations: string[]
  } {
    if (recentSessions.length === 0) {
      return {
        currentLevel: 50,
        trend: 'stable',
        fatigueRisk: 'low',
        recommendations: ['Start with short learning sessions']
      }
    }

    const motivationScores = recentSessions.map(session => {
      let score = 50 // Base score

      // Adjust based on session completion
      if (session.completed) score += 20
      if (session.completionRate > 0.8) score += 15
      if (session.completionRate < 0.3) score -= 20

      // Adjust based on engagement
      if (session.engagementLevel > 80) score += 10
      if (session.engagementLevel < 40) score -= 15

      // Adjust based on session length vs planned
      const lengthRatio = session.actualDuration / session.plannedDuration
      if (lengthRatio > 1.2) score -= 10 // Overextended
      if (lengthRatio < 0.5) score -= 5  // Cut short

      return Math.max(0, Math.min(100, score))
    })

    const currentLevel = motivationScores[motivationScores.length - 1] || 50
    const previousLevel = motivationScores[motivationScores.length - 2] || currentLevel

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable'
    if (currentLevel > previousLevel + 5) trend = 'increasing'
    else if (currentLevel < previousLevel - 5) trend = 'decreasing'

    // Calculate fatigue risk
    const recentAvg = motivationScores.slice(-5).reduce((a, b) => a + b, 0) / Math.min(5, motivationScores.length)
    const fatigueRisk = recentAvg < 30 ? 'high' : recentAvg < 60 ? 'medium' : 'low'

    const recommendations = []
    if (fatigueRisk === 'high') {
      recommendations.push('Take a break and try shorter sessions')
      recommendations.push('Switch to easier topics temporarily')
    } else if (trend === 'decreasing') {
      recommendations.push('Try a different learning format')
      recommendations.push('Set smaller, achievable goals')
    } else if (currentLevel > 80) {
      recommendations.push('Great momentum! Consider tackling challenging topics')
    }

    return { currentLevel, trend, fatigueRisk, recommendations }
  }

  // Private helper methods
  private analyzeTimePatterns(): LearningPattern[] {
    // Enhanced time pattern analysis
    const mockPatterns: LearningPattern[] = [
      {
        timeOfDay: '9:00 AM',
        duration: 45,
        topicType: 'Theory',
        successRate: 85,
        engagementLevel: 90,
        completionRate: 88
      },
      {
        timeOfDay: '2:00 PM',
        duration: 30,
        topicType: 'Coding Practice',
        successRate: 78,
        engagementLevel: 85,
        completionRate: 82
      },
      {
        timeOfDay: '7:00 PM',
        duration: 60,
        topicType: 'Projects',
        successRate: 92,
        engagementLevel: 95,
        completionRate: 90
      }
    ]

    return mockPatterns
  }

  private analyzeTopicPatterns(): LearningPattern[] {
    // Enhanced topic pattern analysis
    const topicPerformance = this.userProfile.completedTopics.map(topic => ({
      timeOfDay: 'Various',
      duration: 35,
      topicType: topic,
      successRate: 75 + Math.random() * 20,
      engagementLevel: 70 + Math.random() * 25,
      completionRate: 80 + Math.random() * 15
    }))

    return topicPerformance
  }

  private analyzeEngagementPatterns(): LearningPattern[] {
    // Enhanced engagement pattern analysis
    const engagementTypes = ['Interactive', 'Reading', 'Video', 'Practice']

    return engagementTypes.map(type => ({
      timeOfDay: 'Various',
      duration: 25 + Math.random() * 30,
      topicType: type,
      successRate: 60 + Math.random() * 35,
      engagementLevel: 50 + Math.random() * 45,
      completionRate: 70 + Math.random() * 25
    }))
  }

  private getOptimalLearningTime(): string | null {
    if (this.userProfile.optimalLearningTime.length > 0) {
      return this.userProfile.optimalLearningTime[0]
    }
    return null
  }

  private getRelatedExperience(topic: string): number {
    // Calculate how much related experience user has
    const relatedTopics = this.userProfile.completedTopics.filter(
      completed => completed.toLowerCase().includes(topic.toLowerCase())
    )
    return relatedTopics.length / 10 // Normalize to 0-1 scale
  }

  private calculateLearningVelocity(): number {
    // Calculate how fast user typically learns
    return 0.7 // Placeholder
  }

  private estimateTimeToGoal(topic: string, timeframe: string): string {
    // Estimate realistic time to complete goal
    return '2-3 weeks'
  }

  private getRecommendedActions(topic: string): string[] {
    return [
      'Start with fundamentals',
      'Practice with hands-on projects',
      'Join study groups',
      'Take regular breaks'
    ]
  }

  private identifyPotentialObstacles(topic: string): string[] {
    return [
      'Complex concepts may require extra time',
      'Prerequisites might need review',
      'Practical application can be challenging'
    ]
  }

  private identifySuccessFactors(topic: string): string[] {
    return [
      'Strong foundation in related topics',
      'Consistent daily practice',
      'Active community participation',
      'Regular progress reviews'
    ]
  }

  private getNextDifficultyLevel(): string {
    if (this.userProfile.skillLevel === 'beginner') return 'intermediate'
    if (this.userProfile.skillLevel === 'intermediate') return 'advanced'
    return 'expert'
  }

  private getOptimalTopicType(): string | null {
    // Analyze user's performance across different topic types
    const topicPerformance = this.analyzeTopicPatterns()
    if (topicPerformance.length === 0) return 'hands-on-coding'

    const bestTopic = topicPerformance.reduce((best, current) =>
      current.successRate > best.successRate ? current : best
    )

    return bestTopic.topicType
  }

  // 🚀 Advanced Predictive Modeling
  predictCareerPath(currentSkills: string[], interests: string[], timeframe: string): {
    recommendedPath: string
    probability: number
    requiredSkills: string[]
    timeline: { phase: string, duration: string, skills: string[] }[]
    marketDemand: number
  } {
    const careerPaths = {
      'Frontend Developer': {
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
        marketDemand: 85,
        timeline: [
          { phase: 'Foundation', duration: '2-3 months', skills: ['HTML', 'CSS', 'JavaScript'] },
          { phase: 'Framework', duration: '2-3 months', skills: ['React', 'Vue', 'Angular'] },
          { phase: 'Advanced', duration: '3-4 months', skills: ['TypeScript', 'Testing', 'Performance'] }
        ]
      },
      'Full Stack Developer': {
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'Database', 'API Design'],
        marketDemand: 90,
        timeline: [
          { phase: 'Frontend', duration: '3-4 months', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
          { phase: 'Backend', duration: '3-4 months', skills: ['Node.js', 'Express', 'Database'] },
          { phase: 'Integration', duration: '2-3 months', skills: ['API Design', 'Testing', 'Deployment'] }
        ]
      },
      'Data Scientist': {
        requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
        marketDemand: 95,
        timeline: [
          { phase: 'Programming', duration: '2-3 months', skills: ['Python', 'SQL'] },
          { phase: 'Statistics', duration: '3-4 months', skills: ['Statistics', 'Data Analysis'] },
          { phase: 'ML/AI', duration: '4-6 months', skills: ['Machine Learning', 'Deep Learning'] }
        ]
      }
    }

    // Calculate best match based on current skills and interests
    let bestMatch = { path: 'Frontend Developer', score: 0 }

    Object.entries(careerPaths).forEach(([path, data]) => {
      let score = 0

      // Score based on existing skills
      const skillMatch = currentSkills.filter(skill =>
        data.requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
      ).length
      score += (skillMatch / data.requiredSkills.length) * 40

      // Score based on interests
      const interestMatch = interests.filter(interest =>
        path.toLowerCase().includes(interest.toLowerCase()) ||
        data.requiredSkills.some(skill => skill.toLowerCase().includes(interest.toLowerCase()))
      ).length
      score += (interestMatch / interests.length) * 30

      // Score based on market demand
      score += (data.marketDemand / 100) * 30

      if (score > bestMatch.score) {
        bestMatch = { path, score }
      }
    })

    const selectedPath = careerPaths[bestMatch.path as keyof typeof careerPaths]
    const missingSkills = selectedPath.requiredSkills.filter(skill =>
      !currentSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    )

    return {
      recommendedPath: bestMatch.path,
      probability: Math.min(95, Math.round(bestMatch.score)),
      requiredSkills: missingSkills,
      timeline: selectedPath.timeline,
      marketDemand: selectedPath.marketDemand
    }
  }

  // 🎯 Adaptive Learning Algorithm
  adaptLearningPath(performanceHistory: any[], currentGoals: string[]): {
    adjustedDifficulty: string
    recommendedTopics: string[]
    learningStrategy: string
    estimatedCompletion: string
    confidenceLevel: number
  } {
    // Analyze recent performance trends
    const recentPerformance = performanceHistory.slice(-10)
    const avgScore = recentPerformance.reduce((sum, p) => sum + (p.score || 0), 0) / recentPerformance.length || 0
    const trend = this.calculatePerformanceTrend(recentPerformance)

    // Determine optimal difficulty
    let adjustedDifficulty = this.userProfile.skillLevel
    if (avgScore > 85 && trend === 'improving') {
      adjustedDifficulty = this.getNextDifficultyLevel()
    } else if (avgScore < 60 && trend === 'declining') {
      adjustedDifficulty = this.getPreviousDifficultyLevel()
    }

    // Recommend topics based on weak areas and goals
    const recommendedTopics = this.generateAdaptiveTopics(currentGoals, this.userProfile.weakAreas)

    // Determine learning strategy
    const learningStrategy = this.selectOptimalStrategy(avgScore, this.userProfile.learningStyle)

    // Estimate completion time
    const estimatedCompletion = this.estimateAdaptiveCompletion(recommendedTopics, adjustedDifficulty)

    // Calculate confidence level
    const confidenceLevel = this.calculateConfidenceLevel(performanceHistory, currentGoals)

    return {
      adjustedDifficulty,
      recommendedTopics,
      learningStrategy,
      estimatedCompletion,
      confidenceLevel
    }
  }

  // 📊 Industry Trend Analysis
  analyzeIndustryTrends(userSkills: string[]): {
    trendingSkills: { skill: string, growth: number, demand: number }[]
    decliningSkills: string[]
    emergingOpportunities: string[]
    skillGapAnalysis: { missing: string[], outdated: string[], strong: string[] }
  } {
    const industryData = {
      trending: [
        { skill: 'TypeScript', growth: 45, demand: 85 },
        { skill: 'React', growth: 35, demand: 90 },
        { skill: 'Python', growth: 40, demand: 95 },
        { skill: 'Kubernetes', growth: 60, demand: 80 },
        { skill: 'Machine Learning', growth: 55, demand: 88 },
        { skill: 'GraphQL', growth: 50, demand: 70 },
        { skill: 'Rust', growth: 65, demand: 60 },
        { skill: 'Next.js', growth: 55, demand: 75 }
      ],
      declining: ['jQuery', 'Flash', 'Perl', 'CoffeeScript'],
      emerging: ['WebAssembly', 'Edge Computing', 'Quantum Computing', 'AR/VR Development']
    }

    const userSkillsLower = userSkills.map(s => s.toLowerCase())

    const skillGapAnalysis = {
      missing: industryData.trending
        .filter(trend => !userSkillsLower.some(skill => skill.includes(trend.skill.toLowerCase())))
        .filter(trend => trend.demand > 75)
        .map(trend => trend.skill),
      outdated: userSkills.filter(skill =>
        industryData.declining.some(declining =>
          skill.toLowerCase().includes(declining.toLowerCase())
        )
      ),
      strong: userSkills.filter(skill =>
        industryData.trending.some(trend =>
          skill.toLowerCase().includes(trend.skill.toLowerCase()) && trend.demand > 80
        )
      )
    }

    return {
      trendingSkills: industryData.trending,
      decliningSkills: industryData.declining,
      emergingOpportunities: industryData.emerging,
      skillGapAnalysis
    }
  }

  // Helper methods for adaptive learning
  private calculatePerformanceTrend(performanceHistory: any[]): 'improving' | 'declining' | 'stable' {
    if (performanceHistory.length < 3) return 'stable'

    const recent = performanceHistory.slice(-3).map(p => p.score || 0)
    const earlier = performanceHistory.slice(-6, -3).map(p => p.score || 0)

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length || recentAvg

    if (recentAvg > earlierAvg + 5) return 'improving'
    if (recentAvg < earlierAvg - 5) return 'declining'
    return 'stable'
  }

  private getPreviousDifficultyLevel(): string {
    if (this.userProfile.skillLevel === 'advanced') return 'intermediate'
    if (this.userProfile.skillLevel === 'intermediate') return 'beginner'
    return 'beginner'
  }

  private generateAdaptiveTopics(goals: string[], weakAreas: string[]): string[] {
    const topics = [...weakAreas]

    // Add goal-related topics
    goals.forEach(goal => {
      if (goal.toLowerCase().includes('react')) topics.push('React Hooks', 'React Router')
      if (goal.toLowerCase().includes('node')) topics.push('Express.js', 'API Development')
      if (goal.toLowerCase().includes('database')) topics.push('SQL', 'MongoDB')
    })

    return [...new Set(topics)].slice(0, 5)
  }

  private selectOptimalStrategy(avgScore: number, learningStyle: string): string {
    if (avgScore < 60) {
      return learningStyle === 'visual' ? 'Visual tutorials with step-by-step guides' :
             learningStyle === 'kinesthetic' ? 'Hands-on coding exercises' :
             learningStyle === 'auditory' ? 'Video lectures and discussions' :
             'Reading comprehensive documentation'
    } else if (avgScore > 85) {
      return 'Challenge-based learning with real-world projects'
    } else {
      return 'Balanced approach with theory and practice'
    }
  }

  private estimateAdaptiveCompletion(topics: string[], difficulty: string): string {
    const baseTime = topics.length * (difficulty === 'beginner' ? 2 : difficulty === 'intermediate' ? 3 : 4)
    const adjustedTime = Math.round(baseTime * (1 + (this.userProfile.preferredPace === 'slow' ? 0.5 :
                                                     this.userProfile.preferredPace === 'fast' ? -0.3 : 0)))
    return `${adjustedTime} weeks`
  }

  private calculateConfidenceLevel(performanceHistory: any[], goals: string[]): number {
    const recentPerformance = performanceHistory.slice(-5)
    const avgScore = recentPerformance.reduce((sum, p) => sum + (p.score || 0), 0) / recentPerformance.length || 0
    const consistency = this.calculateConsistency(recentPerformance)
    const goalAlignment = goals.length > 0 ? 80 : 60

    return Math.round((avgScore * 0.4 + consistency * 0.3 + goalAlignment * 0.3))
  }

  private calculateConsistency(performanceHistory: any[]): number {
    if (performanceHistory.length < 2) return 50

    const scores = performanceHistory.map(p => p.score || 0)
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)

    // Lower standard deviation = higher consistency
    return Math.max(0, Math.min(100, 100 - (standardDeviation * 2)))
  }
}

// 🎯 AI Brain Factory
export function createAIBrain(userProfile: UserLearningProfile): AILearningBrain {
  return new AILearningBrain(userProfile)
}

// 📊 Default user profile for new users
export function createDefaultUserProfile(name: string): UserLearningProfile {
  return {
    id: `user-${Date.now()}`,
    name,
    learningStyle: 'visual',
    skillLevel: 'beginner',
    interests: [],
    goals: [],
    weakAreas: [],
    strengths: [],
    preferredPace: 'medium',
    optimalLearningTime: [],
    completedTopics: [],
    currentStreak: 0,
    totalXP: 0,
    level: 1,
    achievements: [],
    learningPatterns: []
  }
}
