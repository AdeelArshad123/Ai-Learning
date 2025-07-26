'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaYoutube, 
  FaUsers, 
  FaExternalLinkAlt, 
  FaPlay, 
  FaFire, 
  FaStar, 
  FaHeart,
  FaBookmark,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaEye,
  FaThumbsUp,
  FaPlayCircle
} from 'react-icons/fa'
import { 
  FiTrendingUp, 
  FiVideo, 
  FiMonitor, 
  FiCode, 
  FiZap,
  FiAward,
  FiClock,
  FiGrid,
  FiList
} from 'react-icons/fi'

interface YouTubeChannel {
  name: string
  url: string
  subscribers: string
  description: string
  language: string
}

const languages = [
  { name: 'All', icon: FiMonitor, color: 'from-gray-500 to-gray-600', count: 0 },
  { name: 'JavaScript', icon: FiCode, color: 'from-yellow-400 to-orange-500', count: 0 },
  { name: 'Python', icon: FiZap, color: 'from-blue-500 to-green-500', count: 0 },
  { name: 'React', icon: FiVideo, color: 'from-cyan-400 to-blue-500', count: 0 },
  { name: 'Node.js', icon: FiCode, color: 'from-green-500 to-emerald-500', count: 0 },
  { name: 'TypeScript', icon: FiCode, color: 'from-blue-600 to-indigo-600', count: 0 },
  { name: 'Java', icon: FiAward, color: 'from-red-500 to-orange-500', count: 0 },
  { name: 'C++', icon: FiCode, color: 'from-purple-500 to-pink-500', count: 0 }
]

export default function YouTubeChannelsFixed() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [filteredChannels, setFilteredChannels] = useState<YouTubeChannel[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'subscribers' | 'name' | 'trending'>('subscribers')
  const [favorites, setFavorites] = useState<string[]>([])
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null)

  // Enhanced demo data
  const demoChannels: YouTubeChannel[] = [
    {
      name: "Traversy Media",
      url: "https://www.youtube.com/@TraversyMedia",
      subscribers: "2.1M",
      description: "Practical web development tutorials covering modern technologies and frameworks.",
      language: "JavaScript"
    },
    {
      name: "Programming with Mosh",
      url: "https://www.youtube.com/@programmingwithmosh",
      subscribers: "3.4M",
      description: "Clear, concise programming tutorials for beginners and professionals.",
      language: "Python"
    },
    {
      name: "The Net Ninja",
      url: "https://www.youtube.com/@NetNinja",
      subscribers: "1.2M",
      description: "Modern web development tutorials with a focus on JavaScript frameworks.",
      language: "React"
    },
    {
      name: "Fireship",
      url: "https://www.youtube.com/@Fireship",
      subscribers: "2.3M",
      description: "High-intensity code tutorials and tech news in 100 seconds or less.",
      language: "TypeScript"
    },
    {
      name: "freeCodeCamp.org",
      url: "https://www.youtube.com/@freecodecamp",
      subscribers: "8.1M",
      description: "Learn to code for free with comprehensive programming courses.",
      language: "JavaScript"
    },
    {
      name: "Corey Schafer",
      url: "https://www.youtube.com/@coreyms",
      subscribers: "1.1M",
      description: "Python programming tutorials from beginner to advanced topics.",
      language: "Python"
    },
    {
      name: "Academind",
      url: "https://www.youtube.com/@academind",
      subscribers: "890K",
      description: "In-depth web development courses and tutorials for modern developers.",
      language: "React"
    },
    {
      name: "Derek Banas",
      url: "https://www.youtube.com/@derekbanas",
      subscribers: "1.3M",
      description: "Programming tutorials covering multiple languages and technologies.",
      language: "Java"
    }
  ]

  useEffect(() => {
    setMounted(true)
    setChannels(demoChannels)
    setFilteredChannels(demoChannels)
  }, [])

  useEffect(() => {
    if (selectedLanguage === 'All') {
      setFilteredChannels(channels)
    } else {
      setFilteredChannels(channels.filter(channel => channel.language === selectedLanguage))
    }
  }, [selectedLanguage, channels])

  // Helper functions
  const toggleFavorite = (channelName: string) => {
    setFavorites(prev => 
      prev.includes(channelName) 
        ? prev.filter(name => name !== channelName)
        : [...prev, channelName]
    )
  }

  const getSubscriberCount = (subscribers: string) => {
    const num = parseFloat(subscribers.replace(/[^\d.]/g, ''))
    return subscribers.includes('M') ? num * 1000000 : subscribers.includes('K') ? num * 1000 : num
  }

  const isTrending = (subscribers: string) => {
    const count = getSubscriberCount(subscribers)
    return count >= 1000000
  }

  const sortChannels = (channels: YouTubeChannel[]) => {
    return [...channels].sort((a, b) => {
      switch (sortBy) {
        case 'subscribers':
          return getSubscriberCount(b.subscribers) - getSubscriberCount(a.subscribers)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'trending':
          return (isTrending(b.subscribers) ? 1 : 0) - (isTrending(a.subscribers) ? 1 : 0)
        default:
          return 0
      }
    })
  }

  const filteredAndSortedChannels = sortChannels(
    filteredChannels.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <FaYoutube className="text-white text-2xl" />
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              📺 Top YouTube Channels
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Learn from the world's best programming educators and content creators
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{channels.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Channels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500">{filteredChannels.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">{favorites.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Favorites</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
                >
                  <option value="subscribers">Sort by Subscribers</option>
                  <option value="name">Sort by Name</option>
                  <option value="trending">Sort by Trending</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-red-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-red-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            🎯 Filter by Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((language, index) => {
              const Icon = language.icon
              const isSelected = selectedLanguage === language.name
              return (
                <motion.button
                  key={language.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedLanguage(language.name)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${language.color} text-white shadow-2xl scale-105`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-xl border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    <span>{language.name}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>

                  {/* Glow effect */}
                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${language.color} opacity-20 blur-xl`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Channels Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredAndSortedChannels.map((channel, index) => (
                  <motion.div
                    key={channel.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
                    onMouseEnter={() => setHoveredChannel(channel.name)}
                    onMouseLeave={() => setHoveredChannel(null)}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Trending Badge */}
                    {isTrending(channel.subscribers) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                      >
                        <FaFire className="w-3 h-3" />
                        Trending
                      </motion.div>
                    )}

                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(channel.name)}
                      className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                        favorites.includes(channel.name)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className="w-4 h-4" />
                    </motion.button>

                    {/* Channel Avatar */}
                    <div className="relative mb-4 flex justify-center">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FaYoutube className="text-white text-3xl" />
                      </motion.div>

                      {/* Play Button Overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <FaPlay className="text-red-500 text-sm ml-0.5" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Channel Info */}
                    <div className="relative z-10 text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {channel.name}
                      </h3>

                      <div className="flex items-center justify-center gap-2 mb-3">
                        <FaUsers className="text-gray-400 w-4 h-4" />
                        <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          {channel.subscribers}
                        </span>
                        <span className="text-sm text-gray-500">subscribers</span>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-700">
                        <FiCode className="w-3 h-3" />
                        {channel.language}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 relative z-10">
                      {channel.description}
                    </p>

                    {/* Action Button */}
                    <motion.a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPlayCircle className="w-5 h-5 group-hover/btn:animate-pulse" />
                      <span>Watch Channel</span>
                      <FaExternalLinkAlt className="w-4 h-4 opacity-70" />

                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover/btn:opacity-100"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {filteredAndSortedChannels.map((channel, index) => (
                  <motion.div
                    key={channel.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-6">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaYoutube className="text-white text-xl" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {channel.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {isTrending(channel.subscribers) && (
                              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <FaFire className="w-3 h-3" />
                                Trending
                              </div>
                            )}
                            <button
                              onClick={() => toggleFavorite(channel.name)}
                              className={`p-2 rounded-full transition-all ${
                                favorites.includes(channel.name)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <FaHeart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <FaUsers className="text-gray-400 w-4 h-4" />
                            <span className="font-semibold text-gray-600 dark:text-gray-300">
                              {channel.subscribers} subscribers
                            </span>
                          </div>
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            {channel.language}
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {channel.description}
                        </p>

                        <motion.a
                          href={channel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaPlayCircle className="w-4 h-4" />
                          Watch Channel
                          <FaExternalLinkAlt className="w-3 h-3 opacity-70" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredAndSortedChannels.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No channels found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedLanguage('All')
                }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
