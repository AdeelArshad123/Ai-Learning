'use client'

import YouTubeChannels from '@/components/YouTubeChannels'

export default function TestYouTubePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          YouTube Channels Test Page
        </h1>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <YouTubeChannels />
        </div>
      </div>
    </div>
  )
}
