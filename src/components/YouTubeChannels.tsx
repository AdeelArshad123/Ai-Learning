'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaYoutube, FaUsers, FaPlay, FaExternalLinkAlt, FaStar, FaHeart, FaBookmark } from 'react-icons/fa'
import { FiTrendingUp, FiEye, FiClock, FiAward } from 'react-icons/fi'
import Image from 'next/image'

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

function getAvatar(channel: YouTubeChannel) {
  // Use a YouTube logo as a placeholder for all channels
  return <FaYoutube className="text-red-500 text-4xl drop-shadow" />;
}

function isTrending(subscribers: string) {
  // Mark as trending if subscribers > 1M
  const num = parseFloat(subscribers.replace(/[^\d.]/g, ''));
  return subscribers.includes('M') && num >= 1;
}

export default function YouTubeChannels() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [filteredChannels, setFilteredChannels] = useState<YouTubeChannel[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/api/get-youtube-channels')
        setChannels(response.data)
        setFilteredChannels(response.data)
        setLoading(false)
      } catch (err: any) {
        setError('Failed to fetch YouTube channels')
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

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
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
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter by Language:</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === language
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            {/* Favorite Button */}
            <button
              className={`absolute top-5 right-5 z-10 text-xl transition-colors ${favorites.includes(channel.name) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
              onClick={() => toggleFavorite(channel.name)}
              aria-label="Favorite"
            >
              <FaHeart />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0">
                {getAvatar(channel)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                  {channel.name}
                  {isTrending(channel.subscribers) && (
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
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                  {channel.language}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 min-h-[56px]">
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