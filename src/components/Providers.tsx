'use client'

import { SessionProvider } from 'next-auth/react'
import NotificationProvider from './NotificationProvider'

// Mock session for development
const mockSession = {
  user: {
    name: 'Demo User',
    email: 'demo@example.com',
    image: null
  },
  expires: '2024-12-31'
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={null}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </SessionProvider>
  )
}