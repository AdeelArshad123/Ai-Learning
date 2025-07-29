'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaCode,
  FaGithub,
  FaChartLine,
  FaStar,
  FaUsers,
  FaRocket,
  FaChevronRight,
  FaExternalLinkAlt,
  FaHeart,
  FaEye,
  FaFilter,
  FaFire,
  FaPlay,
  FaArrowRight,
  FaLightbulb,
  FaGem,
  FaCrown,
  FaThumbsUp,
  FaBookmark,
  FaShare
} from "react-icons/fa";
import {
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiAward,
  FiActivity,
  FiBarChart
} from "react-icons/fi";

const languages = [
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#F7DF1E"/>
        <path d="M19.5 23.5c.5.8 1.1 1.5 2.3 1.5 1.1 0 1.8-.5 1.8-1.2 0-.8-.6-1.1-2-1.6l-.7-.3c-2-0.7-3.3-1.6-3.3-3.5 0-1.7 1.3-3 3.4-3 1.5 0 2.6.5 3.4 1.8l-1.8 1.1c-.4-.7-.8-1-1.6-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.7.3c2.3.8 3.6 1.7 3.6 3.7 0 2.1-1.7 3.2-4 3.2-2.2 0-3.6-1-4.3-2.3l1.9-1.1zm-8.2.2c.4.7.8 1.3 1.7 1.3.8 0 1.3-.3 1.3-1.6v-7.1h2.3v7.2c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.8-.9-3.3-2l1.9-1.1z" fill="#222"/>
      </svg>
    ),
    description: "The language of the web, powering interactive websites and modern applications worldwide.",
    shortDesc: "Web development powerhouse",
    learnMore: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    examples: "https://github.com/topics/javascript",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
    darkBgGradient: "from-yellow-900/20 to-orange-900/20",
    popularity: 95,
    trend: "+12%",
    category: "Frontend",
    difficulty: "Beginner",
    jobs: "2.1M+",
    github: "12.5M"
  },
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#306998"/>
        <path d="M16 7c-2.2 0-4.2.2-5.7 1.2C8.2 9.2 8 10.7 8 12.5V15h8v2H8c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4h2v-2H8c-1.1 0-2-.9-2-2s.9-2 2-2h8c2.2 0 4-1.8 4-4V12.5c0-1.8-.2-3.3-2.3-4.3C20.2 7.2 18.2 7 16 7zm-3 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 14c2.2 0 4.2-.2 5.7-1.2 1.9-1 2.3-2.5 2.3-4.3V17h-8v-2h8c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4h-2v2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-8c-2.2 0-4 1.8-4 4v2.5c0 1.8.2 3.3 2.3 4.3C11.8 24.8 13.8 25 16 25zm3-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B"/>
      </svg>
    ),
    description: "Versatile language loved for its simplicity, powering AI, data science, and web development.",
    shortDesc: "AI & Data Science favorite",
    learnMore: "https://docs.python.org/3/",
    examples: "https://github.com/topics/python",
    gradient: "from-blue-500 to-yellow-400",
    bgGradient: "from-blue-50 to-yellow-50",
    darkBgGradient: "from-blue-900/20 to-yellow-900/20",
    popularity: 92,
    trend: "+18%",
    category: "Backend",
    difficulty: "Beginner",
    jobs: "1.8M+",
    github: "8.2M"
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#3178C6"/>
        <text x="8" y="22" fontSize="12" fontWeight="bold" fill="#fff">TS</text>
      </svg>
    ),
    description: "JavaScript with superpowers - static typing for safer, more maintainable code at scale.",
    shortDesc: "Type-safe JavaScript",
    learnMore: "https://www.typescriptlang.org/docs/",
    examples: "https://github.com/topics/typescript",
    gradient: "from-blue-600 to-blue-400",
    bgGradient: "from-blue-50 to-indigo-50",
    darkBgGradient: "from-blue-900/20 to-indigo-900/20",
    popularity: 88,
    trend: "+25%",
    category: "Frontend",
    difficulty: "Intermediate",
    jobs: "1.2M+",
    github: "5.8M"
  },
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#61DAFB"/>
        <circle cx="16" cy="16" r="2" fill="#222"/>
        <ellipse cx="16" cy="16" rx="8" ry="3" stroke="#222" strokeWidth="1.5" fill="none"/>
        <ellipse cx="16" cy="16" rx="8" ry="3" stroke="#222" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="8" ry="3" stroke="#222" strokeWidth="1.5" fill="none" transform="rotate(-60 16 16)"/>
      </svg>
    ),
    description: "The most popular library for building modern, interactive user interfaces and web applications.",
    shortDesc: "UI library champion",
    learnMore: "https://react.dev/",
    examples: "https://github.com/topics/react",
    gradient: "from-cyan-400 to-blue-500",
    bgGradient: "from-cyan-50 to-blue-50",
    darkBgGradient: "from-cyan-900/20 to-blue-900/20",
    popularity: 94,
    trend: "+15%",
    category: "Frontend",
    difficulty: "Intermediate",
    jobs: "1.5M+",
    github: "9.1M"
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#339933"/>
        <path d="M16 8l6 3.5v7L16 22l-6-3.5v-7L16 8z" fill="#fff"/>
        <path d="M16 8v14M10 11.5l12 7M22 11.5l-12 7" stroke="#339933" strokeWidth="1"/>
      </svg>
    ),
    description: "JavaScript runtime that enables server-side development, powering scalable network applications.",
    shortDesc: "Server-side JavaScript",
    learnMore: "https://nodejs.org/en/docs/",
    examples: "https://github.com/topics/nodejs",
    gradient: "from-green-600 to-green-400",
    bgGradient: "from-green-50 to-emerald-50",
    darkBgGradient: "from-green-900/20 to-emerald-900/20",
    popularity: 89,
    trend: "+8%",
    category: "Backend",
    difficulty: "Intermediate",
    jobs: "1.3M+",
    github: "7.4M"
  },
  {
    name: "Go",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#00ADD8"/>
        <ellipse cx="12" cy="16" rx="3" ry="4" fill="#fff"/>
        <ellipse cx="20" cy="16" rx="3" ry="4" fill="#fff"/>
        <circle cx="13" cy="17" r="1" fill="#222"/>
        <circle cx="19" cy="17" r="1" fill="#222"/>
        <ellipse cx="16" cy="22" rx="2" ry="1" fill="#222"/>
      </svg>
    ),
    description: "Google's language designed for simplicity and performance in cloud services and distributed systems.",
    shortDesc: "Cloud-native powerhouse",
    learnMore: "https://go.dev/doc/",
    examples: "https://github.com/topics/go",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
    darkBgGradient: "from-cyan-900/20 to-blue-900/20",
    popularity: 78,
    trend: "+22%",
    category: "Backend",
    difficulty: "Intermediate",
    jobs: "450K+",
    github: "3.2M"
  },
  {
    name: "Rust",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#CE422B"/>
        <circle cx="16" cy="16" r="8" fill="#fff"/>
        <circle cx="16" cy="16" r="4" fill="#CE422B"/>
        <circle cx="12" cy="12" r="1" fill="#CE422B"/>
        <circle cx="20" cy="12" r="1" fill="#CE422B"/>
        <circle cx="12" cy="20" r="1" fill="#CE422B"/>
        <circle cx="20" cy="20" r="1" fill="#CE422B"/>
      </svg>
    ),
    description: "Systems programming language focused on safety, speed, and concurrency without garbage collection.",
    shortDesc: "Memory-safe systems language",
    learnMore: "https://doc.rust-lang.org/",
    examples: "https://github.com/topics/rust",
    gradient: "from-orange-600 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    darkBgGradient: "from-orange-900/20 to-red-900/20",
    popularity: 83,
    trend: "+35%",
    category: "Systems",
    difficulty: "Advanced",
    jobs: "280K+",
    github: "2.1M"
  },
  {
    name: "Java",
    icon: (
      <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" fill="none">
        <rect width="32" height="32" rx="8" fill="#f89820"/>
        <path d="M16 22c-3 0-5-2-5-4h10c0 2-2 4-5 4z" fill="#fff"/>
        <path d="M16 10c1 1 0 2-1 3s-1 2 1 3" stroke="#fff" strokeWidth="1.2" fill="none"/>
        <ellipse cx="16" cy="24" rx="4" ry="1.2" fill="#fff" opacity=".5"/>
      </svg>
    ),
    description: "Enterprise-grade language powering Android apps, web backends, and large-scale systems worldwide.",
    shortDesc: "Enterprise standard",
    learnMore: "https://docs.oracle.com/en/java/",
    examples: "https://github.com/topics/java",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    darkBgGradient: "from-orange-900/20 to-red-900/20",
    popularity: 85,
    trend: "+5%",
    category: "Backend",
    difficulty: "Intermediate",
    jobs: "1.9M+",
    github: "6.8M"
  }
];

const TrendingLanguages = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards')

  const categories = ['All', 'Frontend', 'Backend', 'Systems']

  const filteredLanguages = selectedCategory === 'All'
    ? languages
    : languages.filter(lang => lang.category === selectedCategory)

  const toggleFavorite = (langName: string) => {
    setFavorites(prev =>
      prev.includes(langName)
        ? prev.filter(name => name !== langName)
        : [...prev, langName]
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaFire className="text-white text-2xl" />
            </motion.div>
            <div className="text-left">
              <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
                Trending Languages
              </h2>
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover the most popular programming languages shaping the future of technology and driving innovation worldwide
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{languages.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{filteredLanguages.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{favorites.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Favorites</div>
            </div>
          </div>

          {/* Enhanced Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-2xl scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiTarget className={`w-5 h-5 ${selectedCategory === category ? 'text-white' : 'text-purple-500'}`} />
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>

                {/* Glow effect for active button */}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 blur-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <FiActivity className="inline mr-2" />
                Cards
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === 'compact'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <FiBarChart className="inline mr-2" />
                Compact
              </button>
            </div>
          </div>
        </motion.div>

        {/* Languages Grid */}
        <AnimatePresence mode="wait">
          {viewMode === 'cards' ? (
            <motion.div
              key="cards"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.1 } }}
                  onHoverStart={() => setHoveredLang(lang.name)}
                  onHoverEnd={() => setHoveredLang(null)}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-100 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  {/* Header Section with Gradient */}
                  <div className={`relative h-24 bg-gradient-to-br ${lang.gradient} overflow-hidden`}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/30 rounded-full -translate-y-8 translate-x-8"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/20 rounded-full translate-y-6 -translate-x-6"></div>
                    </div>

                    {/* Top Controls */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      {/* Favorite Button */}
                      <button
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-100 hover:scale-105 ${
                          favorites.includes(lang.name)
                            ? 'bg-white/90 text-red-500 shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        onClick={() => toggleFavorite(lang.name)}
                      >
                        <FaHeart className="w-3 h-3" />
                      </button>

                      {/* Trending Badge */}
                      {lang.trend.startsWith('+') && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <FiTrendingUp className="w-3 h-3" />
                          {lang.trend}
                        </div>
                      )}
                    </div>

                    {/* Language Icon - Positioned to overlap */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
                        <div className={`w-full h-full bg-gradient-to-r ${lang.gradient} rounded-full flex items-center justify-center text-white text-lg`}>
                          {lang.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="pt-8 px-5 pb-5">
                    {/* Language Name and Description */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-100">
                        {lang.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang.shortDesc}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex justify-center gap-6 mb-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <FaStar className="w-3 h-3" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{lang.popularity}%</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Popular</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-blue-500 mb-1">
                          <FaUsers className="w-3 h-3" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{lang.jobs}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Jobs</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-4 text-center">
                      {lang.description}
                    </p>

                    {/* Tags */}
                    <div className="flex justify-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lang.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        lang.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {lang.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {lang.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={lang.learnMore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 bg-gradient-to-r ${lang.gradient} text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-100 flex items-center justify-center gap-2 hover:scale-105`}
                      >
                        <FaLightbulb className="w-3 h-3" />
                        <span>Learn</span>
                      </a>

                      <a
                        href={lang.examples}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-100 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <FaGithub className="w-3 h-3" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>


                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-100 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  whileHover={{ scale: 1.005, x: 2, transition: { duration: 0.1 } }}
                >
                  <div className="flex items-center gap-6">
                    {/* Compact Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${lang.gradient} p-4 shadow-lg flex-shrink-0`}>
                      {lang.icon}
                    </div>

                    {/* Compact Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {lang.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {lang.shortDesc}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {lang.trend.startsWith('+') && (
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <FiTrendingUp className="text-xs" />
                              {lang.trend}
                            </div>
                          )}
                          <button
                            onClick={() => toggleFavorite(lang.name)}
                            className={`p-2 rounded-full transition-all ${
                              favorites.includes(lang.name)
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <FaHeart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className="font-bold text-gray-900 dark:text-white">
                            {lang.popularity}%
                          </span>
                          <span className="text-sm text-gray-500">popularity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-blue-500 text-sm" />
                          <span className="font-bold text-gray-900 dark:text-white">
                            {lang.jobs}
                          </span>
                          <span className="text-sm text-gray-500">jobs</span>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            lang.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            lang.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {lang.difficulty}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${lang.gradient} text-white`}>
                            {lang.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 mr-4">
                          {lang.description}
                        </p>
                        <div className="flex gap-2">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={lang.learnMore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-gradient-to-r ${lang.gradient} text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2`}
                          >
                            <FaLightbulb className="text-sm" />
                            Learn
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={lang.examples}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2"
                          >
                            <FaGithub className="text-sm" />
                            Code
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-12 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'translate(50%, -50%)' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full"
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'translate(-50%, 50%)' }}
              />
            </div>

            <div className="relative z-10">
              <motion.div
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <FaRocket className="text-3xl text-white" />
              </motion.div>

              <h3 className="text-4xl font-black mb-4">Ready to Start Your Journey?</h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Choose a language and begin building amazing projects today! Join millions of developers worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 group"
                >
                  <FaPlay className="group-hover:scale-110 transition-transform" />
                  Start Learning Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all flex items-center gap-3"
                >
                  <FaBookmark />
                  Save Favorites
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrendingLanguages;
