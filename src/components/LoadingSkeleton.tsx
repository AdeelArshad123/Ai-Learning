import React from 'react'

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'text' | 'hero'
  count?: number
  className?: string
}

export default function LoadingSkeleton({ 
  type = 'card', 
  count = 1, 
  className = '' 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  if (type === 'hero') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl"></div>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className={`animate-pulse space-y-2 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        ))}
      </div>
    )
  }

  return null
}

// Quick skeleton components for common use cases
export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <LoadingSkeleton type="card" count={count} />
)

export const ListSkeleton = ({ count = 5 }: { count?: number }) => (
  <LoadingSkeleton type="list" count={count} />
)

export const TextSkeleton = ({ count = 3 }: { count?: number }) => (
  <LoadingSkeleton type="text" count={count} />
)

export const HeroSkeleton = () => (
  <LoadingSkeleton type="hero" />
)
