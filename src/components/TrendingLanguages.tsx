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
  FaFilter
} from "react-icons/fa";

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

  const categories = ['All', 'Frontend', 'Backend', 'Systems']

  const filteredLanguages = selectedCategory === 'All'
    ? languages
    : languages.filter(lang => lang.category === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <FaChartLine className="text-white text-xl" />
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              🔥 Trending Languages
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the most in-demand programming languages shaping the future of technology
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <FaFilter className="inline mr-2" />
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Languages Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredLang(lang.name)}
                onHoverEnd={() => setHoveredLang(null)}
                className={`relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden bg-gradient-to-br ${lang.bgGradient} dark:${lang.darkBgGradient}`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white to-transparent rounded-full translate-y-12 -translate-x-12" />
                </div>

                {/* Trending Badge */}
                {lang.trend.startsWith('+') && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <FaChartLine className="text-xs" />
                    {lang.trend}
                  </div>
                )}

                {/* Language Icon */}
                <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${lang.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {lang.icon}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {lang.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      {lang.shortDesc}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-600">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                        <FaStar className="text-sm" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {lang.popularity}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Popularity</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                        <FaUsers className="text-sm" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {lang.jobs}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Jobs</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {lang.description}
                  </p>

                  {/* Difficulty & Category */}
                  <div className="flex justify-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lang.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      lang.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {lang.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {lang.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={lang.learnMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <FaBookOpen className="text-sm group-hover/btn:scale-110 transition-transform" />
                      Learn
                      <FaExternalLinkAlt className="text-xs opacity-70" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={lang.examples}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <FaGithub className="text-sm group-hover/btn:scale-110 transition-transform" />
                      Code
                      <FaExternalLinkAlt className="text-xs opacity-70" />
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  animate={{
                    opacity: hoveredLang === lang.name ? 1 : 0
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg opacity-90 mb-6">
              Choose a language and begin building amazing projects today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-3 mx-auto"
            >
              <FaRocket />
              Start Learning Now
              <FaChevronRight />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrendingLanguages;
