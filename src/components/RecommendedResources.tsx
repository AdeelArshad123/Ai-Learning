'use client'

import { useState, memo, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaReact,
  FaCss3Alt,
  FaPython,
  FaVuejs,
  FaBootstrap,
  FaNodeJs,
  FaJs,
  FaDatabase,
  FaHeart,
  FaRocket,
  FaStar,
  FaSearch,
  FaAngular,
  FaJava,
  FaPhp,
  FaServer,
  FaCloud,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaWordpress,
  FaUnity,
  FaAndroid,
  FaApple,
  FaCode,
  FaCogs,
  FaMobile,
  FaGamepad
} from 'react-icons/fa'
import {
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiAward,
  FiDownload
} from 'react-icons/fi'

// Optimized debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const resources = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    libraryUrl: 'https://react.dev/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    language: 'JavaScript',
    icon: <FaReact className="w-6 h-6" />,
    isNew: true,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 95,
    stars: '220k',
    downloads: '18M/week',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development with modern design systems.',
    libraryUrl: 'https://tailwindcss.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=pfaSUYaSgRo',
    language: 'CSS',
    icon: <FaCss3Alt className="w-6 h-6" />,
    isNew: true,
    category: 'UI',
    difficulty: 'Beginner',
    popularity: 88,
    stars: '78k',
    downloads: '5.2M/week',
    gradient: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    textColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    name: 'Django',
    description: 'A high-level Python web framework that encourages rapid development and clean design.',
    libraryUrl: 'https://www.djangoproject.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=F5mRW0jo-U4',
    language: 'Python',
    icon: <FaPython className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 82,
    stars: '75k',
    downloads: '1.8M/week',
    gradient: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
    textColor: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework for building modern web interfaces.',
    libraryUrl: 'https://vuejs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=nhBVL41-_Cw',
    language: 'JavaScript',
    icon: <FaVuejs className="w-6 h-6" />,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 85,
    stars: '206k',
    downloads: '4.2M/week',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    name: 'Bootstrap',
    description: 'The world\'s most popular front-end open source toolkit for responsive design.',
    libraryUrl: 'https://getbootstrap.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=4sosXZsdy-s',
    language: 'CSS',
    icon: <FaBootstrap className="w-6 h-6" />,
    category: 'UI',
    difficulty: 'Beginner',
    popularity: 78,
    stars: '167k',
    downloads: '6.8M/week',
    gradient: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    name: 'Node.js',
    description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for server-side development.',
    libraryUrl: 'https://nodejs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    language: 'JavaScript',
    icon: <FaNodeJs className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 90,
    stars: '102k',
    downloads: '2.1M/week',
    gradient: 'from-green-600 to-lime-500',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    name: 'Angular',
    description: 'A platform for building mobile and desktop web applications with TypeScript.',
    libraryUrl: 'https://angular.io/',
    youtubeUrl: 'https://www.youtube.com/watch?v=k5E2AVpwsko',
    language: 'TypeScript',
    icon: <FaAngular className="w-6 h-6" />,
    category: 'Frontend',
    difficulty: 'Advanced',
    popularity: 75,
    stars: '93k',
    downloads: '3.1M/week',
    gradient: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    textColor: 'text-red-600 dark:text-red-400'
  },
  {
    name: 'Docker',
    description: 'A platform for developing, shipping, and running applications using containerization.',
    libraryUrl: 'https://www.docker.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
    language: 'DevOps',
    icon: <FaDocker className="w-6 h-6" />,
    category: 'Tools',
    difficulty: 'Intermediate',
    popularity: 87,
    stars: '67k',
    downloads: '10M+ pulls',
    gradient: 'from-blue-600 to-sky-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Spring Boot',
    description: 'A Java-based framework for building production-ready applications with minimal configuration.',
    libraryUrl: 'https://spring.io/projects/spring-boot',
    youtubeUrl: 'https://www.youtube.com/watch?v=vtPkZShrvXQ',
    language: 'Java',
    icon: <FaJava className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 85,
    stars: '72k',
    downloads: '2.5M/week',
    gradient: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    name: 'Laravel',
    description: 'A PHP web application framework with expressive, elegant syntax for rapid development.',
    libraryUrl: 'https://laravel.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=ImtZ5yENzgE',
    language: 'PHP',
    icon: <FaPhp className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 80,
    stars: '76k',
    downloads: '1.2M/week',
    gradient: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    textColor: 'text-red-600 dark:text-red-400'
  },
  {
    name: 'Flutter',
    description: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop.',
    libraryUrl: 'https://flutter.dev/',
    youtubeUrl: 'https://www.youtube.com/watch?v=1xipg02Wu8s',
    language: 'Dart',
    icon: <FaMobile className="w-6 h-6" />,
    category: 'Mobile',
    difficulty: 'Intermediate',
    popularity: 88,
    stars: '162k',
    downloads: '500k/week',
    gradient: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'React Native',
    description: 'A framework for building native mobile applications using React and JavaScript.',
    libraryUrl: 'https://reactnative.dev/',
    youtubeUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
    language: 'JavaScript',
    icon: <FaReact className="w-6 h-6" />,
    category: 'Mobile',
    difficulty: 'Intermediate',
    popularity: 83,
    stars: '116k',
    downloads: '800k/week',
    gradient: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    textColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    name: 'Swift',
    description: 'Apple\'s powerful programming language for iOS, macOS, watchOS, and tvOS development.',
    libraryUrl: 'https://swift.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=comQ1-x2a1Q',
    language: 'Swift',
    icon: <FaApple className="w-6 h-6" />,
    category: 'Mobile',
    difficulty: 'Intermediate',
    popularity: 75,
    stars: '66k',
    downloads: 'iOS/macOS',
    gradient: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gray-50 dark:bg-gray-900/10',
    textColor: 'text-gray-600 dark:text-gray-400'
  },
  {
    name: 'Kotlin',
    description: 'A modern programming language for Android development and cross-platform applications.',
    libraryUrl: 'https://kotlinlang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
    language: 'Kotlin',
    icon: <FaAndroid className="w-6 h-6" />,
    category: 'Mobile',
    difficulty: 'Intermediate',
    popularity: 78,
    stars: '47k',
    downloads: 'Android',
    gradient: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    name: 'Go',
    description: 'An open source programming language that makes it easy to build simple, reliable software.',
    libraryUrl: 'https://golang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=YS4e4q9oBaU',
    language: 'Go',
    icon: <FaCode className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 82,
    stars: '120k',
    downloads: '2.8M/week',
    gradient: 'from-cyan-600 to-blue-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    textColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    name: 'Rust',
    description: 'A systems programming language focused on safety, speed, and concurrency.',
    libraryUrl: 'https://www.rust-lang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=zF34dRivLOw',
    language: 'Rust',
    icon: <FaCogs className="w-6 h-6" />,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 79,
    stars: '93k',
    downloads: '1.5M/week',
    gradient: 'from-orange-600 to-red-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    name: 'Unity',
    description: 'A cross-platform game engine for developing 2D and 3D games and interactive experiences.',
    libraryUrl: 'https://unity.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=XtQMytORBmM',
    language: 'C#',
    icon: <FaUnity className="w-6 h-6" />,
    category: 'GameDev',
    difficulty: 'Intermediate',
    popularity: 85,
    stars: 'Game Engine',
    downloads: '3M+ devs',
    gradient: 'from-gray-700 to-black',
    bgColor: 'bg-gray-50 dark:bg-gray-900/10',
    textColor: 'text-gray-600 dark:text-gray-400'
  },
  {
    name: 'WordPress',
    description: 'The world\'s most popular content management system for building websites and blogs.',
    libraryUrl: 'https://wordpress.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=O79pJ7qXwoE',
    language: 'PHP',
    icon: <FaWordpress className="w-6 h-6" />,
    category: 'CMS',
    difficulty: 'Beginner',
    popularity: 90,
    stars: '18k',
    downloads: '43% of web',
    gradient: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'MongoDB',
    description: 'A document database designed for ease of development and scaling for modern applications.',
    libraryUrl: 'https://www.mongodb.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=ExcRbA7fy_A',
    language: 'Database',
    icon: <FaDatabase className="w-6 h-6" />,
    category: 'Database',
    difficulty: 'Intermediate',
    popularity: 84,
    stars: '25k',
    downloads: '1.8M/week',
    gradient: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    name: 'Next.js',
    description: 'The React framework for production with hybrid static & server rendering, smart bundling, and more.',
    libraryUrl: 'https://nextjs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Sklc_fQBmcs',
    language: 'JavaScript',
    icon: <FaReact className="w-6 h-6" />,
    isNew: true,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 92,
    stars: '120k',
    downloads: '5.8M/week',
    gradient: 'from-gray-800 to-gray-900',
    bgColor: 'bg-gray-50 dark:bg-gray-900/10',
    textColor: 'text-gray-700 dark:text-gray-400'
  }
]

const categories = [
  { name: 'All', icon: FiTarget, color: 'from-gray-500 to-gray-600' },
  { name: 'Frontend', icon: FaJs, color: 'from-blue-500 to-cyan-500' },
  { name: 'Backend', icon: FaServer, color: 'from-green-500 to-emerald-500' },
  { name: 'Mobile', icon: FaMobile, color: 'from-indigo-500 to-purple-500' },
  { name: 'UI', icon: FaCss3Alt, color: 'from-purple-500 to-pink-500' },
  { name: 'Tools', icon: FaDocker, color: 'from-orange-500 to-red-500' },
  { name: 'Database', icon: FaDatabase, color: 'from-emerald-500 to-teal-500' },
  { name: 'GameDev', icon: FaGamepad, color: 'from-red-500 to-orange-500' },
  { name: 'CMS', icon: FaWordpress, color: 'from-blue-600 to-indigo-600' }
]

function RecommendedResourcesNew() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'difficulty'>('popularity')

  // Debounced search to improve performance
  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  )

  const toggleFavorite = useCallback((resourceName: string) => {
    setFavorites(prev =>
      prev.includes(resourceName)
        ? prev.filter(name => name !== resourceName)
        : [...prev, resourceName]
    )
  }, [])

  // Optimized filtering and sorting
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.language.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const sortedResources = useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
                 difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        case 'popularity':
        default:
          return b.popularity - a.popularity
      }
    })
  }, [filteredResources, sortBy])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Resources & Libraries
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover powerful frameworks, libraries, and tools to accelerate your development
          </p>
        </div>

        {/* Simple Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="name">Sort by Name</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.name
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isSelected
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedResources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                  <div className={resource.textColor}>
                    {resource.icon}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {resource.isNew && (
                    <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                      NEW
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(resource.name)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(resource.name)
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <FaHeart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {resource.name}
                  </h3>
                  {resource.youtubeUrl && (
                    <a
                      href={resource.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaYoutube className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {resource.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="w-3 h-3 text-yellow-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {resource.popularity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiDownload className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {resource.downloads}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  resource.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  resource.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}>
                  {resource.difficulty}
                </span>
              </div>

              {/* Action Button */}
              <a
                href={resource.libraryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r ${resource.gradient} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
              >
                <FaRocket className="w-4 h-4" />
                <span>Explore</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(RecommendedResourcesNew)
