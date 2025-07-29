'use client'

import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure complete hydration
    const timer = setTimeout(() => {
      setHasMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Always return fallback during SSR and initial client render
  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
