import { OpenAI } from 'openai'

interface UserProfile {
  id: string
  name: string
  email: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  goals: string[]
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  timezone: string
  availableHours: string[] // e.g., ['09:00', '10:00', '14:00']
  preferredLanguages: string[]
  currentTopics: string[]
  completedTopics: string[]
  mentorshipPreference: 'mentor' | 'mentee' | 'both' | 'none'
  collaborationStyle: 'leader' | 'follower' | 'balanced'
  communicationPreference: 'text' | 'voice' | 'video' | 'mixed'
  githubProfile?: string
  linkedinProfile?: string
}

interface CollaborationMatch {
  id: string
  type: 'peer-learning' | 'mentorship' | 'study-group' | 'coding-session'
  participants: string[] // user IDs
  topic: string
  skillLevelRange: string
  matchScore: number // 0-100
  compatibility: {
    skillAlignment: number
    scheduleOverlap: number
    goalSimilarity: number
    personalityFit: number
    communicationStyle: number
  }
  suggestedActivities: string[]
  estimatedDuration: number // minutes
  scheduledTime?: Date
  status: 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled'
  createdAt: Date
}

interface CollaborationSession {
  id: string
  matchId: string
  type: 'peer-learning' | 'mentorship' | 'study-group' | 'coding-session'
  participants: SessionParticipant[]
  topic: string
  agenda: string[]
  sharedResources: SharedResource[]
  codeEditor: {
    language: string
    code: string
    lastModified: Date
    modifiedBy: string
  }
  chat: ChatMessage[]
  whiteboard: WhiteboardElement[]
  status: 'waiting' | 'active' | 'paused' | 'completed'
  startTime: Date
  endTime?: Date
  feedback: SessionFeedback[]
}

interface SessionParticipant {
  userId: string
  role: 'mentor' | 'mentee' | 'peer' | 'facilitator'
  joinedAt: Date
  isActive: boolean
  permissions: {
    canEdit: boolean
    canShare: boolean
    canModerate: boolean
  }
}

interface SharedResource {
  id: string
  type: 'link' | 'file' | 'code-snippet' | 'note'
  title: string
  content: string
  url?: string
  sharedBy: string
  sharedAt: Date
}

interface ChatMessage {
  id: string
  userId: string
  message: string
  type: 'text' | 'code' | 'system' | 'ai-suggestion'
  timestamp: Date
  reactions?: { emoji: string; users: string[] }[]
}

interface WhiteboardElement {
  id: string
  type: 'text' | 'shape' | 'drawing' | 'sticky-note'
  position: { x: number; y: number }
  content: any
  createdBy: string
  createdAt: Date
}

interface SessionFeedback {
  userId: string
  rating: number // 1-5
  feedback: string
  categories: {
    helpfulness: number
    communication: number
    knowledge: number
    engagement: number
  }
  wouldCollaborateAgain: boolean
  submittedAt: Date
}

interface MentorshipProgram {
  id: string
  title: string
  description: string
  topic: string
  duration: number // weeks
  mentorId: string
  mentees: string[]
  maxMentees: number
  requirements: string[]
  curriculum: string[]
  schedule: {
    frequency: 'weekly' | 'bi-weekly' | 'monthly'
    duration: number // minutes per session
    preferredTimes: string[]
  }
  status: 'open' | 'full' | 'active' | 'completed'
  createdAt: Date
}

export class AICollaborationEngine {
  private openai: OpenAI
  private userProfiles: Map<string, UserProfile>
  private activeSessions: Map<string, CollaborationSession>
  private matchHistory: Map<string, CollaborationMatch[]>

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.userProfiles = new Map()
    this.activeSessions = new Map()
    this.matchHistory = new Map()
  }

  // 🤝 AI-powered peer matching
  async findCollaborationMatches(
    userId: string,
    preferences: {
      type: 'peer-learning' | 'mentorship' | 'study-group' | 'coding-session'
      topic?: string
      maxParticipants?: number
      timeframe?: 'now' | 'today' | 'this-week' | 'flexible'
    }
  ): Promise<CollaborationMatch[]> {
    try {
      const userProfile = this.userProfiles.get(userId)
      if (!userProfile) {
        throw new Error('User profile not found')
      }

      // Get potential matches from user pool
      const potentialMatches = Array.from(this.userProfiles.values())
        .filter(profile => profile.id !== userId)
        .filter(profile => this.isAvailableForCollaboration(profile, preferences.timeframe))

      const matches: CollaborationMatch[] = []

      for (const candidate of potentialMatches) {
        const matchScore = await this.calculateMatchScore(userProfile, candidate, preferences.type)
        
        if (matchScore.overall >= 60) { // Minimum compatibility threshold
          const match: CollaborationMatch = {
            id: `match_${Date.now()}_${userId}_${candidate.id}`,
            type: preferences.type,
            participants: [userId, candidate.id],
            topic: preferences.topic || this.findCommonTopic(userProfile, candidate),
            skillLevelRange: this.determineSkillRange([userProfile, candidate]),
            matchScore: matchScore.overall,
            compatibility: matchScore.breakdown,
            suggestedActivities: await this.generateSuggestedActivities(userProfile, candidate, preferences.type),
            estimatedDuration: this.estimateSessionDuration(preferences.type),
            status: 'pending',
            createdAt: new Date()
          }
          matches.push(match)
        }
      }

      // Sort by match score and return top matches
      return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10)
    } catch (error) {
      console.error('Error finding collaboration matches:', error)
      return []
    }
  }

  // 🎯 Create mentorship programs
  async createMentorshipProgram(
    mentorId: string,
    programData: {
      title: string
      description: string
      topic: string
      duration: number
      maxMentees: number
      requirements: string[]
      schedule: {
        frequency: 'weekly' | 'bi-weekly' | 'monthly'
        duration: number
        preferredTimes: string[]
      }
    }
  ): Promise<MentorshipProgram> {
    try {
      const mentor = this.userProfiles.get(mentorId)
      if (!mentor) {
        throw new Error('Mentor profile not found')
      }

      // Generate AI-enhanced curriculum
      const curriculum = await this.generateMentorshipCurriculum(
        programData.topic,
        programData.duration,
        mentor.skillLevel
      )

      const program: MentorshipProgram = {
        id: `program_${Date.now()}_${mentorId}`,
        ...programData,
        mentorId,
        mentees: [],
        curriculum,
        status: 'open',
        createdAt: new Date()
      }

      return program
    } catch (error) {
      console.error('Error creating mentorship program:', error)
      throw error
    }
  }

  // 🚀 Start collaboration session
  async startCollaborationSession(
    matchId: string,
    initiatorId: string
  ): Promise<CollaborationSession> {
    try {
      // This would typically fetch match from database
      const match = await this.getMatchById(matchId)
      if (!match) {
        throw new Error('Match not found')
      }

      const participants: SessionParticipant[] = match.participants.map(userId => ({
        userId,
        role: this.determineParticipantRole(userId, match.type, initiatorId),
        joinedAt: new Date(),
        isActive: true,
        permissions: this.getParticipantPermissions(userId, match.type, initiatorId)
      }))

      const session: CollaborationSession = {
        id: `session_${Date.now()}_${matchId}`,
        matchId,
        type: match.type,
        participants,
        topic: match.topic,
        agenda: await this.generateSessionAgenda(match),
        sharedResources: [],
        codeEditor: {
          language: 'javascript',
          code: '// Collaborative coding session\n// Start coding together!\n',
          lastModified: new Date(),
          modifiedBy: initiatorId
        },
        chat: [{
          id: `msg_${Date.now()}`,
          userId: 'system',
          message: `Welcome to your ${match.type} session on ${match.topic}! 🚀`,
          type: 'system',
          timestamp: new Date()
        }],
        whiteboard: [],
        status: 'active',
        startTime: new Date(),
        feedback: []
      }

      this.activeSessions.set(session.id, session)
      return session
    } catch (error) {
      console.error('Error starting collaboration session:', error)
      throw error
    }
  }

  // 💬 AI-powered session facilitation
  async facilitateSession(
    sessionId: string,
    context: {
      recentMessages: ChatMessage[]
      currentCode: string
      participantActivity: { userId: string; lastActive: Date }[]
    }
  ): Promise<{
    suggestions: string[]
    nextSteps: string[]
    interventions: string[]
  }> {
    try {
      const session = this.activeSessions.get(sessionId)
      if (!session) {
        throw new Error('Session not found')
      }

      const prompt = `Analyze this collaborative learning session and provide facilitation suggestions:

      Session Type: ${session.type}
      Topic: ${session.topic}
      Duration: ${Math.floor((Date.now() - session.startTime.getTime()) / 60000)} minutes
      Participants: ${session.participants.length}

      Recent Chat Messages:
      ${context.recentMessages.map(msg => `${msg.userId}: ${msg.message}`).join('\n')}

      Current Code:
      ${context.currentCode}

      Participant Activity:
      ${context.participantActivity.map(p => `${p.userId}: last active ${Math.floor((Date.now() - p.lastActive.getTime()) / 60000)} min ago`).join('\n')}

      Provide:
      1. Helpful suggestions to improve collaboration
      2. Next steps to keep the session productive
      3. Interventions if participants seem stuck or disengaged

      Format as JSON with suggestions, nextSteps, and interventions arrays.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert collaboration facilitator who helps optimize learning sessions and peer interactions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })

      const facilitation = JSON.parse(response.choices[0].message.content || '{}')
      return {
        suggestions: facilitation.suggestions || [],
        nextSteps: facilitation.nextSteps || [],
        interventions: facilitation.interventions || []
      }
    } catch (error) {
      console.error('Error facilitating session:', error)
      return {
        suggestions: ['Continue collaborating and sharing ideas'],
        nextSteps: ['Work on the current task together'],
        interventions: []
      }
    }
  }

  // 📊 Generate collaboration insights
  async generateCollaborationInsights(userId: string): Promise<{
    collaborationStats: {
      totalSessions: number
      averageRating: number
      preferredTypes: string[]
      successfulMatches: number
    }
    strengths: string[]
    improvementAreas: string[]
    recommendations: string[]
  }> {
    try {
      const userMatches = this.matchHistory.get(userId) || []
      const completedSessions = userMatches.filter(match => match.status === 'completed')

      // Calculate stats
      const stats = {
        totalSessions: completedSessions.length,
        averageRating: 0, // Would calculate from feedback
        preferredTypes: this.getPreferredCollaborationTypes(completedSessions),
        successfulMatches: completedSessions.filter(match => match.matchScore >= 80).length
      }

      // Generate AI insights
      const prompt = `Analyze this user's collaboration history and provide insights:

      Collaboration Stats:
      - Total Sessions: ${stats.totalSessions}
      - Successful Matches: ${stats.successfulMatches}
      - Preferred Types: ${stats.preferredTypes.join(', ')}

      Recent Matches:
      ${completedSessions.slice(-5).map(match => 
        `Type: ${match.type}, Score: ${match.matchScore}, Topic: ${match.topic}`
      ).join('\n')}

      Provide:
      1. User's collaboration strengths
      2. Areas for improvement
      3. Personalized recommendations for better collaboration

      Format as JSON with strengths, improvementAreas, and recommendations arrays.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in collaborative learning analytics who provides actionable insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1000
      })

      const insights = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        collaborationStats: stats,
        strengths: insights.strengths || [],
        improvementAreas: insights.improvementAreas || [],
        recommendations: insights.recommendations || []
      }
    } catch (error) {
      console.error('Error generating collaboration insights:', error)
      return {
        collaborationStats: {
          totalSessions: 0,
          averageRating: 0,
          preferredTypes: [],
          successfulMatches: 0
        },
        strengths: [],
        improvementAreas: [],
        recommendations: []
      }
    }
  }

  // 🔧 Private helper methods
  private async calculateMatchScore(
    user1: UserProfile,
    user2: UserProfile,
    collaborationType: string
  ): Promise<{
    overall: number
    breakdown: {
      skillAlignment: number
      scheduleOverlap: number
      goalSimilarity: number
      personalityFit: number
      communicationStyle: number
    }
  }> {
    // Skill alignment (0-100)
    const skillAlignment = this.calculateSkillAlignment(user1, user2, collaborationType)
    
    // Schedule overlap (0-100)
    const scheduleOverlap = this.calculateScheduleOverlap(user1.availableHours, user2.availableHours)
    
    // Goal similarity (0-100)
    const goalSimilarity = this.calculateGoalSimilarity(user1.goals, user2.goals)
    
    // Personality fit (0-100)
    const personalityFit = this.calculatePersonalityFit(user1, user2)
    
    // Communication style (0-100)
    const communicationStyle = this.calculateCommunicationCompatibility(user1, user2)

    // Weighted overall score
    const weights = {
      skillAlignment: 0.3,
      scheduleOverlap: 0.2,
      goalSimilarity: 0.2,
      personalityFit: 0.15,
      communicationStyle: 0.15
    }

    const overall = Math.round(
      skillAlignment * weights.skillAlignment +
      scheduleOverlap * weights.scheduleOverlap +
      goalSimilarity * weights.goalSimilarity +
      personalityFit * weights.personalityFit +
      communicationStyle * weights.communicationStyle
    )

    return {
      overall,
      breakdown: {
        skillAlignment,
        scheduleOverlap,
        goalSimilarity,
        personalityFit,
        communicationStyle
      }
    }
  }

  private calculateSkillAlignment(user1: UserProfile, user2: UserProfile, type: string): number {
    if (type === 'mentorship') {
      // For mentorship, we want skill gap
      const skillLevels = { beginner: 1, intermediate: 2, advanced: 3 }
      const gap = skillLevels[user1.skillLevel] - skillLevels[user2.skillLevel]
      return Math.max(0, 100 - Math.abs(gap - 1) * 50) // Ideal gap is 1 level
    } else {
      // For peer learning, we want similar skills
      const skillLevels = { beginner: 1, intermediate: 2, advanced: 3 }
      const diff = Math.abs(skillLevels[user1.skillLevel] - skillLevels[user2.skillLevel])
      return Math.max(0, 100 - diff * 30)
    }
  }

  private calculateScheduleOverlap(hours1: string[], hours2: string[]): number {
    const overlap = hours1.filter(hour => hours2.includes(hour)).length
    const total = Math.max(hours1.length, hours2.length)
    return total > 0 ? Math.round((overlap / total) * 100) : 0
  }

  private calculateGoalSimilarity(goals1: string[], goals2: string[]): number {
    const commonGoals = goals1.filter(goal => 
      goals2.some(g => g.toLowerCase().includes(goal.toLowerCase()) || goal.toLowerCase().includes(g.toLowerCase()))
    ).length
    const totalGoals = Math.max(goals1.length, goals2.length)
    return totalGoals > 0 ? Math.round((commonGoals / totalGoals) * 100) : 0
  }

  private calculatePersonalityFit(user1: UserProfile, user2: UserProfile): number {
    // Simple compatibility based on collaboration styles
    const styleCompatibility = {
      'leader-follower': 90,
      'leader-balanced': 80,
      'follower-balanced': 80,
      'balanced-balanced': 85,
      'leader-leader': 60,
      'follower-follower': 70
    }
    
    const key = `${user1.collaborationStyle}-${user2.collaborationStyle}`
    return styleCompatibility[key] || styleCompatibility[`${user2.collaborationStyle}-${user1.collaborationStyle}`] || 70
  }

  private calculateCommunicationCompatibility(user1: UserProfile, user2: UserProfile): number {
    if (user1.communicationPreference === user2.communicationPreference) return 100
    if (user1.communicationPreference === 'mixed' || user2.communicationPreference === 'mixed') return 85
    return 70
  }

  private isAvailableForCollaboration(profile: UserProfile, timeframe?: string): boolean {
    // Simple availability check - in real implementation, would check actual availability
    return profile.availableHours.length > 0
  }

  private findCommonTopic(user1: UserProfile, user2: UserProfile): string {
    const commonInterests = user1.interests.filter(interest => 
      user2.interests.some(i => i.toLowerCase().includes(interest.toLowerCase()))
    )
    return commonInterests[0] || user1.currentTopics[0] || 'General Programming'
  }

  private determineSkillRange(profiles: UserProfile[]): string {
    const levels = profiles.map(p => p.skillLevel)
    const unique = [...new Set(levels)]
    return unique.length === 1 ? unique[0] : `${unique.sort()[0]}-${unique.sort()[unique.length - 1]}`
  }

  private async generateSuggestedActivities(user1: UserProfile, user2: UserProfile, type: string): Promise<string[]> {
    const activities = {
      'peer-learning': ['Code review session', 'Problem-solving together', 'Knowledge sharing', 'Practice exercises'],
      'mentorship': ['Goal setting', 'Skill assessment', 'Career guidance', 'Project review'],
      'study-group': ['Topic discussion', 'Group exercises', 'Quiz session', 'Concept mapping'],
      'coding-session': ['Pair programming', 'Code challenges', 'Project collaboration', 'Debugging together']
    }
    return activities[type] || activities['peer-learning']
  }

  private estimateSessionDuration(type: string): number {
    const durations = {
      'peer-learning': 45,
      'mentorship': 60,
      'study-group': 90,
      'coding-session': 120
    }
    return durations[type] || 60
  }

  private async getMatchById(matchId: string): Promise<CollaborationMatch | null> {
    // In real implementation, would fetch from database
    return null
  }

  private determineParticipantRole(userId: string, type: string, initiatorId: string): 'mentor' | 'mentee' | 'peer' | 'facilitator' {
    if (type === 'mentorship') {
      return userId === initiatorId ? 'mentor' : 'mentee'
    }
    return 'peer'
  }

  private getParticipantPermissions(userId: string, type: string, initiatorId: string) {
    return {
      canEdit: true,
      canShare: true,
      canModerate: userId === initiatorId
    }
  }

  private async generateSessionAgenda(match: CollaborationMatch): Promise<string[]> {
    return [
      'Introductions and goal setting',
      `Discuss ${match.topic}`,
      'Hands-on practice/coding',
      'Q&A and knowledge sharing',
      'Next steps and follow-up'
    ]
  }

  private async generateMentorshipCurriculum(topic: string, duration: number, mentorLevel: string): Promise<string[]> {
    // Generate AI-powered curriculum
    return [
      `Week 1: ${topic} Fundamentals`,
      `Week 2: Practical Applications`,
      `Week 3: Advanced Concepts`,
      `Week 4: Real-world Projects`
    ]
  }

  private getPreferredCollaborationTypes(matches: CollaborationMatch[]): string[] {
    const typeCounts = matches.reduce((acc, match) => {
      acc[match.type] = (acc[match.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([type]) => type)
  }
}

// Export singleton instance
export const aiCollaborationEngine = new AICollaborationEngine()
