'use client'

import dynamic from 'next/dynamic'
import LoadingSkeleton from './LoadingSkeleton'

// Lazy load heavy components with proper loading states
export const LazyAICodeGenerator = dynamic(() => import('./AICodeGenerator'), {
  loading: () => <LoadingSkeleton type="hero" className="h-96" />,
  ssr: false
})

export const LazyTopicQuiz = dynamic(() => import('./TopicQuiz'), {
  loading: () => <LoadingSkeleton type="card" count={3} />,
  ssr: false
})

export const LazyQuizAnalytics = dynamic(() => import('./QuizAnalytics'), {
  loading: () => <LoadingSkeleton type="card" count={2} />,
  ssr: false
})

export const LazyCodingChallenges = dynamic(() => import('./CodingChallenges'), {
  loading: () => <LoadingSkeleton type="hero" className="h-64" />,
  ssr: false
})

export const LazyPersonalizedRecommendations = dynamic(() => import('./PersonalizedRecommendations'), {
  loading: () => <LoadingSkeleton type="card" count={4} />,
  ssr: false
})

export const LazyAITutor = dynamic(() => import('./AITutor'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 w-16 rounded-full fixed bottom-4 right-4"></div>,
  ssr: false
})