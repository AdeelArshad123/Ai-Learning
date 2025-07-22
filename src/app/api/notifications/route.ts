import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock notifications data - replace with your actual database
let notifications = new Map()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const userNotifications = notifications.get(userEmail) || []

    let filteredNotifications = userNotifications

    if (unreadOnly) {
      filteredNotifications = userNotifications.filter((notification: any) => !notification.read)
    }

    // Sort by date (newest first)
    filteredNotifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      notifications: filteredNotifications,
      unreadCount: userNotifications.filter((n: any) => !n.read).length,
      totalCount: userNotifications.length
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const body = await request.json()
    const { type, title, message, data, priority = 'normal' } = body

    const userNotifications = notifications.get(userEmail) || []

    const newNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      data,
      priority,
      read: false,
      createdAt: new Date().toISOString(),
      userId: userEmail
    }

    userNotifications.unshift(newNotification)

    // Keep only last 50 notifications
    if (userNotifications.length > 50) {
      userNotifications.splice(50)
    }

    notifications.set(userEmail, userNotifications)

    return NextResponse.json(newNotification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const body = await request.json()
    const { notificationId, action } = body

    const userNotifications = notifications.get(userEmail) || []

    if (action === 'mark-read') {
      const notification = userNotifications.find((n: any) => n.id === notificationId)
      if (notification) {
        notification.read = true
        notification.readAt = new Date().toISOString()
      }
    } else if (action === 'mark-all-read') {
      userNotifications.forEach((notification: any) => {
        notification.read = true
        notification.readAt = new Date().toISOString()
      })
    } else if (action === 'delete') {
      const index = userNotifications.findIndex((n: any) => n.id === notificationId)
      if (index > -1) {
        userNotifications.splice(index, 1)
      }
    }

    notifications.set(userEmail, userNotifications)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const userNotifications = notifications.get(userEmail) || []

    if (type) {
      // Delete notifications by type
      const filteredNotifications = userNotifications.filter((n: any) => n.type !== type)
      notifications.set(userEmail, filteredNotifications)
    } else {
      // Delete all notifications
      notifications.set(userEmail, [])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 