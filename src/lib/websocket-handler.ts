// WebSocket handler for real-time collaboration features
// This would typically integrate with a WebSocket server like Socket.io

interface WebSocketMessage {
  type: 'chat' | 'code-change' | 'cursor-position' | 'whiteboard-update' | 'user-join' | 'user-leave' | 'ai-suggestion'
  sessionId: string
  userId: string
  data: any
  timestamp: Date
}

interface CollaborationRoom {
  sessionId: string
  participants: Set<string>
  currentCode: string
  chatHistory: ChatMessage[]
  whiteboardState: any[]
  lastActivity: Date
}

interface ChatMessage {
  id: string
  userId: string
  message: string
  type: 'text' | 'code' | 'system' | 'ai-suggestion'
  timestamp: Date
}

export class WebSocketCollaborationHandler {
  private rooms: Map<string, CollaborationRoom>
  private userSessions: Map<string, string> // userId -> sessionId
  private connections: Map<string, any> // userId -> websocket connection

  constructor() {
    this.rooms = new Map()
    this.userSessions = new Map()
    this.connections = new Map()
  }

  // 🚀 Handle user joining a collaboration session
  handleUserJoin(userId: string, sessionId: string, connection: any) {
    try {
      // Store connection
      this.connections.set(userId, connection)
      this.userSessions.set(userId, sessionId)

      // Get or create room
      let room = this.rooms.get(sessionId)
      if (!room) {
        room = {
          sessionId,
          participants: new Set(),
          currentCode: '// Collaborative coding session\n// Start coding together!\n',
          chatHistory: [{
            id: `msg_${Date.now()}`,
            userId: 'system',
            message: `Welcome to the collaboration session! 🚀`,
            type: 'system',
            timestamp: new Date()
          }],
          whiteboardState: [],
          lastActivity: new Date()
        }
        this.rooms.set(sessionId, room)
      }

      // Add user to room
      room.participants.add(userId)
      room.lastActivity = new Date()

      // Notify other participants
      this.broadcastToRoom(sessionId, {
        type: 'user-join',
        sessionId,
        userId: 'system',
        data: {
          joinedUserId: userId,
          message: `User ${userId} joined the session`,
          participantCount: room.participants.size
        },
        timestamp: new Date()
      }, userId)

      // Send current state to new user
      this.sendToUser(userId, {
        type: 'session-state',
        sessionId,
        userId: 'system',
        data: {
          currentCode: room.currentCode,
          chatHistory: room.chatHistory.slice(-50), // Last 50 messages
          whiteboardState: room.whiteboardState,
          participants: Array.from(room.participants)
        },
        timestamp: new Date()
      })

      console.log(`User ${userId} joined session ${sessionId}`)
    } catch (error) {
      console.error('Error handling user join:', error)
    }
  }

  // 👋 Handle user leaving a collaboration session
  handleUserLeave(userId: string) {
    try {
      const sessionId = this.userSessions.get(userId)
      if (!sessionId) return

      const room = this.rooms.get(sessionId)
      if (room) {
        room.participants.delete(userId)
        room.lastActivity = new Date()

        // Notify other participants
        this.broadcastToRoom(sessionId, {
          type: 'user-leave',
          sessionId,
          userId: 'system',
          data: {
            leftUserId: userId,
            message: `User ${userId} left the session`,
            participantCount: room.participants.size
          },
          timestamp: new Date()
        })

        // Clean up empty rooms
        if (room.participants.size === 0) {
          this.rooms.delete(sessionId)
          console.log(`Cleaned up empty room ${sessionId}`)
        }
      }

      // Clean up user data
      this.connections.delete(userId)
      this.userSessions.delete(userId)

      console.log(`User ${userId} left session ${sessionId}`)
    } catch (error) {
      console.error('Error handling user leave:', error)
    }
  }

  // 💬 Handle chat messages
  handleChatMessage(userId: string, message: string, type: 'text' | 'code' = 'text') {
    try {
      const sessionId = this.userSessions.get(userId)
      if (!sessionId) return

      const room = this.rooms.get(sessionId)
      if (!room) return

      const chatMessage: ChatMessage = {
        id: `msg_${Date.now()}_${userId}`,
        userId,
        message,
        type,
        timestamp: new Date()
      }

      // Add to room history
      room.chatHistory.push(chatMessage)
      room.lastActivity = new Date()

      // Keep only last 100 messages
      if (room.chatHistory.length > 100) {
        room.chatHistory = room.chatHistory.slice(-100)
      }

      // Broadcast to all participants
      this.broadcastToRoom(sessionId, {
        type: 'chat',
        sessionId,
        userId,
        data: chatMessage,
        timestamp: new Date()
      })

      console.log(`Chat message from ${userId} in session ${sessionId}`)
    } catch (error) {
      console.error('Error handling chat message:', error)
    }
  }

  // 💻 Handle code changes
  handleCodeChange(userId: string, code: string, cursorPosition?: { line: number; column: number }) {
    try {
      const sessionId = this.userSessions.get(userId)
      if (!sessionId) return

      const room = this.rooms.get(sessionId)
      if (!room) return

      // Update room code
      room.currentCode = code
      room.lastActivity = new Date()

      // Broadcast code change to other participants
      this.broadcastToRoom(sessionId, {
        type: 'code-change',
        sessionId,
        userId,
        data: {
          code,
          cursorPosition,
          modifiedBy: userId,
          timestamp: new Date()
        },
        timestamp: new Date()
      }, userId) // Exclude the sender

      console.log(`Code updated by ${userId} in session ${sessionId}`)
    } catch (error) {
      console.error('Error handling code change:', error)
    }
  }

  // 🎨 Handle whiteboard updates
  handleWhiteboardUpdate(userId: string, elements: any[]) {
    try {
      const sessionId = this.userSessions.get(userId)
      if (!sessionId) return

      const room = this.rooms.get(sessionId)
      if (!room) return

      // Update whiteboard state
      room.whiteboardState = elements
      room.lastActivity = new Date()

      // Broadcast to other participants
      this.broadcastToRoom(sessionId, {
        type: 'whiteboard-update',
        sessionId,
        userId,
        data: {
          elements,
          updatedBy: userId
        },
        timestamp: new Date()
      }, userId)

      console.log(`Whiteboard updated by ${userId} in session ${sessionId}`)
    } catch (error) {
      console.error('Error handling whiteboard update:', error)
    }
  }

  // 🤖 Send AI suggestions
  sendAISuggestion(sessionId: string, suggestion: string, context?: any) {
    try {
      const room = this.rooms.get(sessionId)
      if (!room) return

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        userId: 'ai-assistant',
        message: suggestion,
        type: 'ai-suggestion',
        timestamp: new Date()
      }

      // Add to chat history
      room.chatHistory.push(aiMessage)

      // Broadcast AI suggestion
      this.broadcastToRoom(sessionId, {
        type: 'ai-suggestion',
        sessionId,
        userId: 'ai-assistant',
        data: {
          suggestion,
          context,
          message: aiMessage
        },
        timestamp: new Date()
      })

      console.log(`AI suggestion sent to session ${sessionId}`)
    } catch (error) {
      console.error('Error sending AI suggestion:', error)
    }
  }

  // 📊 Get session statistics
  getSessionStats(sessionId: string) {
    const room = this.rooms.get(sessionId)
    if (!room) return null

    return {
      sessionId,
      participantCount: room.participants.size,
      participants: Array.from(room.participants),
      messageCount: room.chatHistory.length,
      codeLength: room.currentCode.length,
      whiteboardElements: room.whiteboardState.length,
      lastActivity: room.lastActivity,
      isActive: Date.now() - room.lastActivity.getTime() < 5 * 60 * 1000 // Active if activity within 5 minutes
    }
  }

  // 🧹 Clean up inactive sessions
  cleanupInactiveSessions(maxInactiveMinutes: number = 30) {
    const cutoffTime = Date.now() - maxInactiveMinutes * 60 * 1000

    for (const [sessionId, room] of this.rooms.entries()) {
      if (room.lastActivity.getTime() < cutoffTime) {
        // Notify participants before cleanup
        this.broadcastToRoom(sessionId, {
          type: 'session-cleanup',
          sessionId,
          userId: 'system',
          data: {
            message: 'Session is being cleaned up due to inactivity',
            reason: 'inactivity'
          },
          timestamp: new Date()
        })

        // Remove room
        this.rooms.delete(sessionId)
        console.log(`Cleaned up inactive session ${sessionId}`)
      }
    }
  }

  // 📤 Send message to specific user
  private sendToUser(userId: string, message: WebSocketMessage) {
    const connection = this.connections.get(userId)
    if (connection && connection.readyState === 1) { // WebSocket.OPEN
      try {
        connection.send(JSON.stringify(message))
      } catch (error) {
        console.error(`Error sending message to user ${userId}:`, error)
        // Clean up broken connection
        this.connections.delete(userId)
      }
    }
  }

  // 📢 Broadcast message to all users in a room
  private broadcastToRoom(sessionId: string, message: WebSocketMessage, excludeUserId?: string) {
    const room = this.rooms.get(sessionId)
    if (!room) return

    for (const userId of room.participants) {
      if (excludeUserId && userId === excludeUserId) continue
      this.sendToUser(userId, message)
    }
  }

  // 📈 Get all active sessions
  getActiveSessions() {
    const sessions = []
    for (const [sessionId, room] of this.rooms.entries()) {
      sessions.push({
        sessionId,
        participantCount: room.participants.size,
        lastActivity: room.lastActivity,
        isActive: Date.now() - room.lastActivity.getTime() < 5 * 60 * 1000
      })
    }
    return sessions
  }

  // 🔍 Get room by session ID
  getRoom(sessionId: string) {
    return this.rooms.get(sessionId)
  }

  // 👥 Get user's current session
  getUserSession(userId: string) {
    return this.userSessions.get(userId)
  }

  // 📊 Get global statistics
  getGlobalStats() {
    const totalSessions = this.rooms.size
    const totalParticipants = Array.from(this.rooms.values())
      .reduce((sum, room) => sum + room.participants.size, 0)
    const activeSessions = Array.from(this.rooms.values())
      .filter(room => Date.now() - room.lastActivity.getTime() < 5 * 60 * 1000).length

    return {
      totalSessions,
      activeSessions,
      totalParticipants,
      averageParticipantsPerSession: totalSessions > 0 ? totalParticipants / totalSessions : 0,
      timestamp: new Date()
    }
  }
}

// Export singleton instance
export const wsCollaborationHandler = new WebSocketCollaborationHandler()

// Auto cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    wsCollaborationHandler.cleanupInactiveSessions(30)
  }, 10 * 60 * 1000)
}
