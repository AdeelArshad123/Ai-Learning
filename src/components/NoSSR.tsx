'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

interface NoSSRProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// This component ensures no server-side rendering
function NoSSRComponent({ children, fallback = null }: NoSSRProps) {
  return <>{children}</>
}

// Export a dynamically imported version with no SSR
const NoSSR = dynamic(() => Promise.resolve(NoSSRComponent), {
  ssr: false,
  loading: () => null
})

export default NoSSR

// Higher-order component to wrap any component with NoSSR
export function withNoSSR<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  const WrappedComponent = (props: P) => (
    <NoSSR fallback={fallback}>
      <Component {...props} />
    </NoSSR>
  )
  
  WrappedComponent.displayName = `withNoSSR(${Component.displayName || Component.name})`
  
  return WrappedComponent
}
