'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaYoutube, FaUsers, FaExternalLinkAlt } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'

interface YouTubeChannel {
  name: string
  url: string
  subscribers: string
  description: string
  language: string
}

const languages = [
  'All', 'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 
  'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby'
]

export default function YouTubeChannelsWorking() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [filteredChannels, setFilteredChannels] = useState<YouTubeChannel[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        console.log('Fetching YouTube channels...')
        const response = await fetch('/api/get-youtube-channels')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received channels:', data.length)
        setChannels(data)
        setFilteredChannels(data)
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching YouTube channels:', err)
        setError('Failed to fetch YouTube channels: ' + err.message)
        setLoading(false)
      }
    }

    fetchChannels()
  }, [])

  useEffect(() => {
    if (selectedLanguage === 'All') {
      setFilteredChannels(channels)
    } else {
      setFilteredChannels(channels.filter(channel => channel.language === selectedLanguage))
    }
  }, [selectedLanguage, channels])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading YouTube channels...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Language Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Filter by Language:</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === language
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChannels.map((channel, idx) => (
          <motion.div
            key={`${channel.name}-${channel.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-7 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full min-h-[220px] relative"
            whileHover={{ scale: 1.04, y: -6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0">
                <FaYoutube className="text-red-500 text-4xl drop-shadow" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {channel.name}
                  {channel.subscribers.includes('M') && parseFloat(channel.subscribers.replace(/[^\d.]/g, '')) >= 1 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 animate-pulse">
                      <FiTrendingUp className="mr-1" /> Trending
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-500 font-medium">
                    {channel.subscribers} subscribers
                  </span>
                </div>
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                  {channel.language}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[56px] overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {channel.description}
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-colors w-full justify-center text-base mt-2 border-2 border-red-400/30"
              >
                <FaYoutube size={20} />
                Watch Channel
                <FaExternalLinkAlt size={14} className="ml-1 opacity-70" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">
            No channels found for {selectedLanguage}. Try selecting a different language.
          </p>
        </motion.div>
      )}
    </div>
  )
}
