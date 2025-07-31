import { NextRequest, NextResponse } from 'next/server'
import { createAIBrain, createDefaultUserProfile } from '@/lib/ai-brain'

interface SmartNotification {
  id: string
  userId: string
  type: 'learning_reminder' | 'break_suggestion' | 'achievement' | 'motivation' | 'goal_progress' | 'streak_warning'
  title: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  scheduledTime: string
  actualSentTime?: string
  isRead: boolean
  isActioned: boolean
  context: any
  personalizationData: any
  expiresAt: string
  createdAt: string
}

interface NotificationPreferences {
  userId: string
  enabled: boolean
  quietHours: { start: string, end: string }
  frequency: 'minimal' | 'moderate' | 'frequent'
  types: {
    learning_reminders: boolean
    break_suggestions: boolean
    achievements: boolean
    motivation: boolean
    goal_progress: boolean
    streak_warnings: boolean
  }
  channels: {
    push: boolean
    email: boolean
    inApp: boolean
  }
  adaptiveScheduling: boolean
  lastUpdated: string
}

// Mock storage
const notifications = new Map<string, SmartNotification[]>()
const preferences = new Map<string, NotificationPreferences>()
const userBehaviorData = new Map<string, any>()

// 🔔 Smart Notification System API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, data } = body

    if (!action || !userId) {
      return NextResponse.json(
        { error: 'Action and userId are required' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'schedule-smart-notifications':
        return await scheduleSmartNotifications(userId, data)
      
      case 'send-immediate-notification':
        return await sendImmediateNotification(userId, data)
      
      case 'update-preferences':
        return await updateNotificationPreferences(userId, data.preferences)
      
      case 'mark-as-read':
        return await markNotificationAsRead(userId, data.notificationId)
      
      case 'mark-as-actioned':
        return await markNotificationAsActioned(userId, data.notificationId)
      
      case 'analyze-engagement':
        return await analyzeNotificationEngagement(userId)
      
      case 'optimize-timing':
        return await optimizeNotificationTiming(userId, data.behaviorData)
      
      case 'generate-motivation-notification':
        return await generateMotivationNotification(userId, data.context)
      
      case 'schedule-break-reminders':
        return await scheduleBreakReminders(userId, data.sessionData)
      
      case 'create-achievement-notification':
        return await createAchievementNotification(userId, data.achievement)
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Error in smart notifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Notification system failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

async function scheduleSmartNotifications(userId: string, data: any) {
  const userPrefs = getOrCreatePreferences(userId)
  const profile = createDefaultUserProfile(userId)
  const aiBrain = createAIBrain(profile)
  
  if (!userPrefs.enabled) {
    return NextResponse.json({
      success: false,
      message: 'Notifications are disabled for this user'
    })
  }

  const behaviorData = userBehaviorData.get(userId) || {}
  const optimalTimes = calculateOptimalNotificationTimes(behaviorData, userPrefs)
  
  const scheduledNotifications = []
  
  // Learning reminders
  if (userPrefs.types.learning_reminders) {
    const learningReminders = generateLearningReminders(userId, optimalTimes, data.learningGoals)
    scheduledNotifications.push(...learningReminders)
  }
  
  // Goal progress notifications
  if (userPrefs.types.goal_progress) {
    const progressNotifications = generateProgressNotifications(userId, data.goals, data.progress)
    scheduledNotifications.push(...progressNotifications)
  }
  
  // Streak warnings
  if (userPrefs.types.streak_warnings) {
    const streakNotifications = generateStreakNotifications(userId, data.streakData)
    scheduledNotifications.push(...streakNotifications)
  }
  
  // Store notifications
  const userNotifications = notifications.get(userId) || []
  userNotifications.push(...scheduledNotifications)
  notifications.set(userId, userNotifications)
  
  return NextResponse.json({
    success: true,
    scheduledCount: scheduledNotifications.length,
    notifications: scheduledNotifications.map(n => ({
      id: n.id,
      type: n.type,
      scheduledTime: n.scheduledTime,
      priority: n.priority
    })),
    nextNotification: getNextNotification(scheduledNotifications)
  })
}

async function sendImmediateNotification(userId: string, data: any) {
  const userPrefs = getOrCreatePreferences(userId)
  
  if (!userPrefs.enabled) {
    return NextResponse.json({
      success: false,
      message: 'Notifications are disabled'
    })
  }
  
  const notification: SmartNotification = {
    id: `notif_${Date.now()}`,
    userId,
    type: data.type,
    title: data.title,
    message: data.message,
    priority: data.priority || 'medium',
    scheduledTime: new Date().toISOString(),
    actualSentTime: new Date().toISOString(),
    isRead: false,
    isActioned: false,
    context: data.context || {},
    personalizationData: data.personalizationData || {},
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    createdAt: new Date().toISOString()
  }
  
  // Add to user's notifications
  const userNotifications = notifications.get(userId) || []
  userNotifications.push(notification)
  notifications.set(userId, userNotifications)
  
  // Simulate sending notification
  const deliveryResult = await simulateNotificationDelivery(notification, userPrefs)
  
  return NextResponse.json({
    success: true,
    notification: {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      sentAt: notification.actualSentTime
    },
    deliveryResult
  })
}

async function updateNotificationPreferences(userId: string, newPreferences: Partial<NotificationPreferences>) {
  const currentPrefs = getOrCreatePreferences(userId)
  
  const updatedPrefs = {
    ...currentPrefs,
    ...newPreferences,
    lastUpdated: new Date().toISOString()
  }
  
  preferences.set(userId, updatedPrefs)
  
  return NextResponse.json({
    success: true,
    message: 'Notification preferences updated',
    preferences: updatedPrefs
  })
}

async function markNotificationAsRead(userId: string, notificationId: string) {
  const userNotifications = notifications.get(userId) || []
  const notification = userNotifications.find(n => n.id === notificationId)
  
  if (!notification) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
  }
  
  notification.isRead = true
  
  return NextResponse.json({
    success: true,
    message: 'Notification marked as read'
  })
}

async function markNotificationAsActioned(userId: string, notificationId: string) {
  const userNotifications = notifications.get(userId) || []
  const notification = userNotifications.find(n => n.id === notificationId)
  
  if (!notification) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
  }
  
  notification.isActioned = true
  
  // Update behavior data for optimization
  updateBehaviorData(userId, 'notification_actioned', {
    notificationId,
    type: notification.type,
    time: new Date().toISOString()
  })
  
  return NextResponse.json({
    success: true,
    message: 'Notification marked as actioned'
  })
}

async function analyzeNotificationEngagement(userId: string) {
  const userNotifications = notifications.get(userId) || []
  
  const analysis = {
    totalSent: userNotifications.length,
    readRate: calculateReadRate(userNotifications),
    actionRate: calculateActionRate(userNotifications),
    engagementByType: analyzeEngagementByType(userNotifications),
    optimalTimes: identifyOptimalTimes(userNotifications),
    recommendations: generateEngagementRecommendations(userNotifications)
  }
  
  return NextResponse.json({
    success: true,
    analysis
  })
}

async function optimizeNotificationTiming(userId: string, behaviorData: any) {
  // Update behavior data
  userBehaviorData.set(userId, { ...userBehaviorData.get(userId), ...behaviorData })
  
  const optimization = {
    currentTiming: getCurrentNotificationTiming(userId),
    suggestedTiming: calculateOptimalTiming(behaviorData),
    improvementPotential: calculateImprovementPotential(behaviorData),
    recommendations: generateTimingRecommendations(behaviorData)
  }
  
  return NextResponse.json({
    success: true,
    optimization
  })
}

async function generateMotivationNotification(userId: string, context: any) {
  const profile = createDefaultUserProfile(userId)
  const motivationMessages = getMotivationMessages(context.mood, context.progress)
  
  const notification: SmartNotification = {
    id: `motiv_${Date.now()}`,
    userId,
    type: 'motivation',
    title: '🚀 Keep Going!',
    message: motivationMessages[Math.floor(Math.random() * motivationMessages.length)],
    priority: 'medium',
    scheduledTime: new Date().toISOString(),
    isRead: false,
    isActioned: false,
    context,
    personalizationData: { motivationType: 'encouragement' },
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours
    createdAt: new Date().toISOString()
  }
  
  return NextResponse.json({
    success: true,
    notification
  })
}

async function scheduleBreakReminders(userId: string, sessionData: any) {
  const breakReminders = []
  const sessionDuration = sessionData.plannedDuration || 60
  
  // Schedule break reminders based on session length
  const breakIntervals = calculateBreakIntervals(sessionDuration)
  
  breakIntervals.forEach((interval, index) => {
    const reminder: SmartNotification = {
      id: `break_${Date.now()}_${index}`,
      userId,
      type: 'break_suggestion',
      title: '⏰ Time for a Break',
      message: `You've been studying for ${interval} minutes. Take a 5-minute break!`,
      priority: 'medium',
      scheduledTime: new Date(Date.now() + interval * 60 * 1000).toISOString(),
      isRead: false,
      isActioned: false,
      context: { sessionId: sessionData.sessionId, breakNumber: index + 1 },
      personalizationData: { breakType: 'productivity' },
      expiresAt: new Date(Date.now() + (interval + 10) * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    }
    breakReminders.push(reminder)
  })
  
  return NextResponse.json({
    success: true,
    breakReminders: breakReminders.length,
    schedule: breakReminders.map(r => ({
      time: r.scheduledTime,
      message: r.message
    }))
  })
}

async function createAchievementNotification(userId: string, achievement: any) {
  const notification: SmartNotification = {
    id: `achieve_${Date.now()}`,
    userId,
    type: 'achievement',
    title: `🏆 ${achievement.title}`,
    message: `Congratulations! ${achievement.description}`,
    priority: 'high',
    scheduledTime: new Date().toISOString(),
    actualSentTime: new Date().toISOString(),
    isRead: false,
    isActioned: false,
    context: { achievement },
    personalizationData: { celebrationType: 'achievement' },
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    createdAt: new Date().toISOString()
  }
  
  return NextResponse.json({
    success: true,
    notification
  })
}

// Helper functions
function getOrCreatePreferences(userId: string): NotificationPreferences {
  if (!preferences.has(userId)) {
    const defaultPrefs: NotificationPreferences = {
      userId,
      enabled: true,
      quietHours: { start: '22:00', end: '08:00' },
      frequency: 'moderate',
      types: {
        learning_reminders: true,
        break_suggestions: true,
        achievements: true,
        motivation: true,
        goal_progress: true,
        streak_warnings: true
      },
      channels: {
        push: true,
        email: false,
        inApp: true
      },
      adaptiveScheduling: true,
      lastUpdated: new Date().toISOString()
    }
    preferences.set(userId, defaultPrefs)
  }
  return preferences.get(userId)!
}

function calculateOptimalNotificationTimes(behaviorData: any, prefs: NotificationPreferences): string[] {
  // Mock calculation - in production, use ML algorithms
  return ['09:00', '14:00', '19:00']
}

function generateLearningReminders(userId: string, optimalTimes: string[], goals: any[]): SmartNotification[] {
  return optimalTimes.map((time, index) => ({
    id: `learn_${Date.now()}_${index}`,
    userId,
    type: 'learning_reminder' as const,
    title: '📚 Learning Time!',
    message: 'Ready to continue your learning journey?',
    priority: 'medium' as const,
    scheduledTime: time,
    isRead: false,
    isActioned: false,
    context: { optimalTime: true },
    personalizationData: { reminderType: 'learning' },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  }))
}

function generateProgressNotifications(userId: string, goals: any[], progress: any): SmartNotification[] {
  return goals.map((goal, index) => ({
    id: `progress_${Date.now()}_${index}`,
    userId,
    type: 'goal_progress' as const,
    title: '🎯 Goal Progress',
    message: `You're ${progress[goal.id] || 0}% towards your ${goal.title} goal!`,
    priority: 'low' as const,
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    isActioned: false,
    context: { goal, progress: progress[goal.id] },
    personalizationData: { progressType: 'goal' },
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  }))
}

function generateStreakNotifications(userId: string, streakData: any): SmartNotification[] {
  const notifications = []
  
  if (streakData.current > 0 && streakData.lastActivity) {
    const hoursSinceLastActivity = (Date.now() - new Date(streakData.lastActivity).getTime()) / (1000 * 60 * 60)
    
    if (hoursSinceLastActivity > 20) { // Warn if no activity for 20+ hours
      notifications.push({
        id: `streak_${Date.now()}`,
        userId,
        type: 'streak_warning' as const,
        title: '🔥 Don\'t Break Your Streak!',
        message: `You have a ${streakData.current}-day streak. Keep it going!`,
        priority: 'high' as const,
        scheduledTime: new Date().toISOString(),
        isRead: false,
        isActioned: false,
        context: { streak: streakData.current },
        personalizationData: { warningType: 'streak' },
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
        createdAt: new Date().toISOString()
      })
    }
  }
  
  return notifications
}

// Additional helper functions (simplified for brevity)
function getNextNotification(notifications: SmartNotification[]): any {
  return notifications.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())[0] || null
}

function simulateNotificationDelivery(notification: SmartNotification, prefs: NotificationPreferences): any {
  return { delivered: true, channel: 'push', deliveredAt: new Date().toISOString() }
}

function updateBehaviorData(userId: string, action: string, data: any): void {
  const current = userBehaviorData.get(userId) || {}
  current[action] = current[action] || []
  current[action].push({ ...data, timestamp: new Date().toISOString() })
  userBehaviorData.set(userId, current)
}

function calculateReadRate(notifications: SmartNotification[]): number {
  if (notifications.length === 0) return 0
  return (notifications.filter(n => n.isRead).length / notifications.length) * 100
}

function calculateActionRate(notifications: SmartNotification[]): number {
  if (notifications.length === 0) return 0
  return (notifications.filter(n => n.isActioned).length / notifications.length) * 100
}

function analyzeEngagementByType(notifications: SmartNotification[]): any {
  const byType: any = {}
  notifications.forEach(n => {
    if (!byType[n.type]) byType[n.type] = { total: 0, read: 0, actioned: 0 }
    byType[n.type].total++
    if (n.isRead) byType[n.type].read++
    if (n.isActioned) byType[n.type].actioned++
  })
  return byType
}

function identifyOptimalTimes(notifications: SmartNotification[]): string[] {
  return ['9:00 AM', '2:00 PM', '7:00 PM'] // Mock optimal times
}

function generateEngagementRecommendations(notifications: SmartNotification[]): string[] {
  return ['Reduce frequency of low-engagement notifications', 'Focus on high-priority notifications']
}

function getCurrentNotificationTiming(userId: string): any {
  return { frequency: 'moderate', times: ['9:00', '14:00', '19:00'] }
}

function calculateOptimalTiming(behaviorData: any): any {
  return { frequency: 'optimized', times: ['9:30', '14:30', '19:30'] }
}

function calculateImprovementPotential(behaviorData: any): number {
  return 25 // 25% improvement potential
}

function generateTimingRecommendations(behaviorData: any): string[] {
  return ['Shift notifications 30 minutes later', 'Reduce weekend notifications']
}

function getMotivationMessages(mood: string, progress: any): string[] {
  return [
    'You\'re making great progress! Keep it up!',
    'Every step forward is progress. You\'ve got this!',
    'Your dedication is inspiring. Continue the journey!'
  ]
}

function calculateBreakIntervals(sessionDuration: number): number[] {
  const intervals = []
  for (let i = 25; i < sessionDuration; i += 30) {
    intervals.push(i)
  }
  return intervals
}

// GET endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type')
  
  if (userId) {
    const userNotifications = notifications.get(userId) || []
    const filteredNotifications = type 
      ? userNotifications.filter(n => n.type === type)
      : userNotifications
    
    return NextResponse.json({
      success: true,
      notifications: filteredNotifications.map(n => ({
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        priority: n.priority,
        scheduledTime: n.scheduledTime,
        isRead: n.isRead,
        isActioned: n.isActioned
      })),
      unreadCount: userNotifications.filter(n => !n.isRead).length
    })
  }
  
  return NextResponse.json({
    success: true,
    description: 'Smart Notification System API',
    features: [
      'Adaptive scheduling',
      'Personalized timing',
      'Engagement tracking',
      'Multiple notification types',
      'User preference management'
    ]
  })
}
