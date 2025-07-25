'use client'

import { useEffect, useState } from 'react'

interface YouTubeChannel {
  name: string
  url: string
  subscribers: string
  description: string
  language: string
}

export default function YouTubeTestPage() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        console.log('Fetching YouTube channels...')
        const response = await fetch('/api/get-youtube-channels')
        
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received channels:', data.length)
        setChannels(data)
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching YouTube channels:', err)
        setError('Failed to fetch YouTube channels: ' + err.message)
        setLoading(false)
      }
    }

    fetchChannels()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">YouTube Channels Test</h1>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading YouTube channels...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">YouTube Channels Test</h1>
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">YouTube Channels Test</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Found {channels.length} channels</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.slice(0, 12).map((channel, idx) => (
            <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">{channel.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{channel.subscribers} subscribers</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">{channel.language}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
