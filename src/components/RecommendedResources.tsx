import { useState, memo, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from '@/utils/performance'
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
  FaFire,
  FaRocket,
  FaPlay,
  FaStar,
  FaGem,

  FaFilter,
  FaSearch,
  FaChevronDown,
  FaAngular,
  FaJava,
  FaPhp,
  FaApple,
  FaServer,
  FaCloud,
  FaDocker,
  FaAws,
  FaGitAlt
} from 'react-icons/fa'
import {
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiAward,
  FiActivity,
  FiGrid,
  FiList
} from 'react-icons/fi';

const resources = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    libraryUrl: 'https://react.dev/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    language: 'JavaScript',
    icon: <FaReact className="text-blue-500 w-10 h-10" />,
    isNew: true,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 95,
    stars: '220k',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    darkBgGradient: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development with modern design systems.',
    libraryUrl: 'https://tailwindcss.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=pfaSUYaSgRo',
    language: 'CSS',
    icon: <FaCss3Alt className="text-cyan-500 w-10 h-10" />,
    isNew: true,
    category: 'UI',
    difficulty: 'Beginner',
    popularity: 88,
    stars: '78k',
    gradient: 'from-cyan-500 to-teal-500',
    bgGradient: 'from-cyan-50 to-teal-50',
    darkBgGradient: 'from-cyan-900/20 to-teal-900/20'
  },
  {
    name: 'Django',
    description: 'A high-level Python web framework that encourages rapid development and clean design.',
    libraryUrl: 'https://www.djangoproject.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=F5mRW0jo-U4',
    language: 'Python',
    icon: <FaPython className="text-yellow-500 w-10 h-10" />,
    isNew: true,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 82,
    stars: '75k',
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    darkBgGradient: 'from-yellow-900/20 to-orange-900/20'
  },
  {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework for building modern user interfaces.',
    libraryUrl: 'https://vuejs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=YrxBCBibVo0',
    language: 'JavaScript',
    icon: <FaVuejs className="text-green-500 w-10 h-10" />,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 90,
    stars: '206k',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    darkBgGradient: 'from-green-900/20 to-emerald-900/20'
  },
  {
    name: 'Bootstrap',
    description: 'The most popular HTML, CSS, and JS library for responsive web development.',
    libraryUrl: 'https://getbootstrap.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=-qfEOE4vtxE',
    language: 'CSS',
    icon: <FaBootstrap className="text-purple-600 w-10 h-10" />,
    category: 'UI',
    difficulty: 'Beginner',
    popularity: 75,
    stars: '167k',
    gradient: 'from-purple-600 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    darkBgGradient: 'from-purple-900/20 to-pink-900/20'
  },
  {
    name: 'Flask',
    description: 'A lightweight WSGI web application framework for Python microservices.',
    libraryUrl: 'https://flask.palletsprojects.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA',
    language: 'Python',
    icon: <FaPython className="text-blue-400 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 78,
    stars: '66k',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    darkBgGradient: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    name: 'Next.js',
    description: 'The React Framework for Production with server-side rendering and static generation.',
    libraryUrl: 'https://nextjs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=1WmNXEVia8I',
    language: 'JavaScript',
    icon: <FaJs className="text-yellow-400 w-10 h-10" />,
    category: 'Fullstack',
    difficulty: 'Advanced',
    popularity: 92,
    stars: '118k',
    gradient: 'from-yellow-400 to-amber-500',
    bgGradient: 'from-yellow-50 to-amber-50',
    darkBgGradient: 'from-yellow-900/20 to-amber-900/20'
  },
  {
    name: 'Material-UI',
    description: 'React components implementing Google\'s Material Design for faster development.',
    libraryUrl: 'https://mui.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=vyJU9efvUtQ',
    language: 'JavaScript',
    icon: <FaReact className="text-blue-400 w-10 h-10" />,
    category: 'UI',
    difficulty: 'Intermediate',
    popularity: 85,
    stars: '91k',
    gradient: 'from-blue-400 to-purple-500',
    bgGradient: 'from-blue-50 to-purple-50',
    darkBgGradient: 'from-blue-900/20 to-purple-900/20'
  },
  {
    name: 'Express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js applications.',
    libraryUrl: 'https://expressjs.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
    language: 'JavaScript',
    icon: <FaNodeJs className="text-green-600 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 87,
    stars: '63k',
    gradient: 'from-green-600 to-teal-600',
    bgGradient: 'from-green-50 to-teal-50',
    darkBgGradient: 'from-green-900/20 to-teal-900/20'
  },
  {
    name: 'MongoDB',
    description: 'The most popular NoSQL database for modern applications and microservices.',
    libraryUrl: 'https://mongodb.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=ofme2o29ngU',
    language: 'Database',
    icon: <FaDatabase className="text-green-700 w-10 h-10" />,
    category: 'Database',
    difficulty: 'Intermediate',
    popularity: 80,
    stars: '25k',
    gradient: 'from-green-700 to-emerald-700',
    bgGradient: 'from-green-50 to-emerald-50',
    darkBgGradient: 'from-green-900/20 to-emerald-900/20'
  },
  {
    name: 'Angular',
    description: 'A platform for building mobile and desktop web applications with TypeScript.',
    libraryUrl: 'https://angular.io/',
    youtubeUrl: 'https://www.youtube.com/watch?v=k5E2AVpwsko',
    language: 'TypeScript',
    icon: <FaAngular className="text-red-600 w-10 h-10" />,
    isNew: false,
    category: 'Frontend',
    difficulty: 'Advanced',
    popularity: 85,
    stars: '93k',
    gradient: 'from-red-600 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
    darkBgGradient: 'from-red-900/20 to-pink-900/20'
  },
  {
    name: 'TypeScript',
    description: 'A strongly typed programming language that builds on JavaScript.',
    libraryUrl: 'https://www.typescriptlang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
    language: 'TypeScript',
    icon: <FaJs className="text-blue-600 w-10 h-10" />,
    isNew: false,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 89,
    stars: '97k',
    gradient: 'from-blue-600 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    darkBgGradient: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    name: 'Java Spring',
    description: 'The most popular Java framework for building enterprise applications.',
    libraryUrl: 'https://spring.io/',
    youtubeUrl: 'https://www.youtube.com/watch?v=vtPkZShrvXQ',
    language: 'Java',
    icon: <FaJava className="text-orange-600 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 83,
    stars: '54k',
    gradient: 'from-orange-600 to-red-600',
    bgGradient: 'from-orange-50 to-red-50',
    darkBgGradient: 'from-orange-900/20 to-red-900/20'
  },
  {
    name: 'Laravel',
    description: 'The PHP framework for web artisans with elegant syntax and powerful features.',
    libraryUrl: 'https://laravel.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=MFh0Fd7BsjE',
    language: 'PHP',
    icon: <FaPhp className="text-purple-700 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 76,
    stars: '76k',
    gradient: 'from-purple-700 to-indigo-700',
    bgGradient: 'from-purple-50 to-indigo-50',
    darkBgGradient: 'from-purple-900/20 to-indigo-900/20'
  },
  {
    name: 'Swift UI',
    description: 'Apple\'s modern framework for building user interfaces across all Apple platforms.',
    libraryUrl: 'https://developer.apple.com/xcode/swiftui/',
    youtubeUrl: 'https://www.youtube.com/watch?v=F2ojC6TNwws',
    language: 'Swift',
    icon: <FaApple className="text-orange-500 w-10 h-10" />,
    isNew: true,
    category: 'Frontend',
    difficulty: 'Intermediate',
    popularity: 72,
    stars: '45k',
    gradient: 'from-orange-500 to-yellow-500',
    bgGradient: 'from-orange-50 to-yellow-50',
    darkBgGradient: 'from-orange-900/20 to-yellow-900/20'
  },
  {
    name: 'Rust',
    description: 'A systems programming language focused on safety, speed, and concurrency.',
    libraryUrl: 'https://www.rust-lang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=zF34dRivLOw',
    language: 'Rust',
    icon: <FaServer className="text-orange-800 w-10 h-10" />,
    isNew: true,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 79,
    stars: '89k',
    gradient: 'from-orange-800 to-red-800',
    bgGradient: 'from-orange-50 to-red-50',
    darkBgGradient: 'from-orange-900/20 to-red-900/20'
  },
  {
    name: 'Go',
    description: 'An open source programming language that makes it easy to build simple, reliable software.',
    libraryUrl: 'https://golang.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=YS4e4q9oBaU',
    language: 'Go',
    icon: <FaCloud className="text-cyan-600 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 81,
    stars: '118k',
    gradient: 'from-cyan-600 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    darkBgGradient: 'from-cyan-900/20 to-blue-900/20'
  },
  {
    name: 'Docker',
    description: 'A platform for developing, shipping, and running applications using containerization.',
    libraryUrl: 'https://www.docker.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
    language: 'DevOps',
    icon: <FaDocker className="text-blue-500 w-10 h-10" />,
    isNew: false,
    category: 'Backend',
    difficulty: 'Intermediate',
    popularity: 84,
    stars: '67k',
    gradient: 'from-blue-500 to-sky-500',
    bgGradient: 'from-blue-50 to-sky-50',
    darkBgGradient: 'from-blue-900/20 to-sky-900/20'
  },
  {
    name: 'AWS',
    description: 'Amazon Web Services - comprehensive cloud computing platform and services.',
    libraryUrl: 'https://aws.amazon.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=ulprqHHWlng',
    language: 'Cloud',
    icon: <FaAws className="text-orange-400 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Advanced',
    popularity: 88,
    stars: '156k',
    gradient: 'from-orange-400 to-yellow-400',
    bgGradient: 'from-orange-50 to-yellow-50',
    darkBgGradient: 'from-orange-900/20 to-yellow-900/20'
  },
  {
    name: 'Git',
    description: 'A distributed version control system for tracking changes in source code.',
    libraryUrl: 'https://git-scm.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
    language: 'Tool',
    icon: <FaGitAlt className="text-red-500 w-10 h-10" />,
    category: 'Backend',
    difficulty: 'Beginner',
    popularity: 94,
    stars: '49k',
    gradient: 'from-red-500 to-orange-500',
    bgGradient: 'from-red-50 to-orange-50',
    darkBgGradient: 'from-red-900/20 to-orange-900/20'
  },
];

const categories = [
  { name: 'All', icon: FiTarget, color: 'from-gray-500 to-gray-600' },
  { name: 'Frontend', icon: FiActivity, color: 'from-blue-500 to-cyan-500' },
  { name: 'Backend', icon: FiZap, color: 'from-green-500 to-emerald-500' },
  { name: 'UI', icon: FiAward, color: 'from-purple-500 to-pink-500' },
  { name: 'Fullstack', icon: FiTrendingUp, color: 'from-yellow-500 to-orange-500' },
  { name: 'Database', icon: FiGrid, color: 'from-emerald-600 to-teal-600' }
]

function RecommendedResources() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Debounced search to improve performance
  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  )
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'difficulty'>('popularity')

  const toggleFavorite = (resourceName: string) => {
    setFavorites(prev =>
      prev.includes(resourceName)
        ? prev.filter(name => name !== resourceName)
        : [...prev, resourceName]
    )
  }

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const sortedResources = useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity
        case 'name':
          return a.name.localeCompare(b.name)
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        default:
          return 0
      }
    })
  }, [filteredResources, sortBy])

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="w-full px-6 relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 w-full"
        >
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight mb-4">
              Resources & Libraries
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore top frameworks, UI libraries, and learning resources to supercharge your development journey
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{resources.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{filteredResources.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{favorites.length}</div>
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-lg"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
                >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="name">Sort by Name</option>
                  <option value="difficulty">Sort by Difficulty</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Filter by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.name
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-transparent'
                  }`}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    rotateY: 5,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.15
                    }
                  }}
                  whileTap={{
                    scale: 0.92,
                    rotateY: 0,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Animated Background Gradient */}
                  {!isSelected && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.2 }
                      }}
                    />
                  )}

                  {/* Shimmer Effect */}
                  {!isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{
                        x: '200%',
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Icon className={`w-4 h-4 transition-colors duration-200 ${
                        isSelected
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-white'
                      }`} />
                    </motion.div>
                    <span className={`transition-colors duration-200 ${
                      isSelected
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-white'
                    }`}>
                      {category.name}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>

                  {/* Enhanced Glow Effect for Selected */}
                  {isSelected && (
                    <>
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-30 blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Floating Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-white rounded-full opacity-60`}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                          }}
                          animate={{
                            y: [-2, -8, -2],
                            x: [-1, 1, -1],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 1.5 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Hover Glow for Non-Selected */}
                  {!isSelected && (
                    <motion.div
                      className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 blur-md group-hover:opacity-40 transition-opacity duration-200`}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Resources Grid/List */}
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
              >
                {sortedResources.map((res, idx) => (
                  <motion.div
                    key={res.name}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                      transition: { duration: 0.1 }
                    }}
                    className="group relative"
                  >
                    {/* Enhanced Card Container */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 overflow-hidden group-hover:shadow-xl group-hover:border-transparent transition-all duration-100 p-6">

                      {/* Simple Border */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${res.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-100 p-0.5`}>
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl" />
                      </div>

                      {/* Header Section */}
                      <div className="relative z-10 mb-5">
                        <div className="flex items-start justify-between mb-4">
                          {/* Enhanced Icon */}
                          <div className={`relative w-14 h-14 bg-gradient-to-br ${res.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-100 group-hover:scale-105`}>
                            <div className="text-white text-xl">
                              {res.icon}
                            </div>
                          </div>

                          {/* Top Right Controls */}
                          <div className="flex items-center gap-2">
                            {res.isNew && (
                              <motion.div
                                className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                <FaFire className="text-xs animate-pulse" />
                                NEW
                              </motion.div>
                            )}

                            <button
                              className={`p-2 rounded-xl transition-all duration-100 hover:scale-105 ${
                                favorites.includes(res.name)
                                  ? 'bg-red-500 text-white shadow-md'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              }`}
                              onClick={() => toggleFavorite(res.name)}
                            >
                              <FaHeart className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Title and YouTube */}
                        <div className="mb-3">
                          <div className="flex items-center gap-3 mb-1">
                            <motion.h3
                              className="text-xl font-black text-gray-900 dark:text-white"
                              whileHover={{ scale: 1.02 }}
                            >
                              {res.name}
                            </motion.h3>
                            {res.youtubeUrl && (
                              <motion.a
                                href={res.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:text-red-600 transition-colors"
                                whileHover={{ scale: 1.3, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FaYoutube className="text-lg" />
                              </motion.a>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                            {res.language} • {res.category}
                          </p>
                        </div>
                      </div>

                      {/* Compact Stats Row */}
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {res.popularity}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaGem className="text-purple-500 text-sm" />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {res.stars}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            res.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                            res.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {res.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Compact Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 relative z-10 line-clamp-2">
                        {res.description}
                      </p>

                      {/* Compact Action Buttons */}
                      <div className="flex gap-3 relative z-10">
                        <a
                          href={res.libraryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 bg-gradient-to-r ${res.gradient} text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-100 flex items-center justify-center gap-2 hover:scale-102`}
                        >
                          <FaRocket className="text-sm" />
                          <span>Explore</span>
                          <FaExternalLinkAlt className="text-xs opacity-80" />
                        </a>

                        <a
                          href={res.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-100 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:scale-102"
                        >
                          <FaPlay className="text-red-500 text-sm" />
                          <span>Watch</span>
                        </a>
                      </div>


                    </div>
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
                {sortedResources.map((res, idx) => (
                  <motion.div
                    key={res.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02, type: "spring", stiffness: 200, damping: 20 }}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-100 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 hover:scale-1005"
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Compact Icon */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${res.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-100`}>
                        <div className="text-white text-xl">
                          {res.icon}
                        </div>
                      </div>

                      {/* Compact Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                {res.name}
                              </h3>
                              {res.youtubeUrl && (
                                <motion.a
                                  href={res.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-500 hover:text-red-600 flex-shrink-0"
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <FaYoutube className="text-sm" />
                                </motion.a>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {res.language} • {res.category}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {res.isNew && (
                              <motion.div
                                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                                whileHover={{ scale: 1.05 }}
                              >
                                <FaFire className="text-xs" />
                                NEW
                              </motion.div>
                            )}
                            <motion.button
                              onClick={() => toggleFavorite(res.name)}
                              className={`p-2 rounded-lg transition-all ${
                                favorites.includes(res.name)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaHeart className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Compact Stats and Description */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500 text-sm" />
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {res.popularity}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaGem className="text-purple-500 text-sm" />
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {res.stars}
                              </span>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              res.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              res.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {res.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Description and Actions */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 mr-4 line-clamp-1">
                            {res.description}
                          </p>

                          <div className="flex gap-2 flex-shrink-0">
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={res.libraryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`bg-gradient-to-r ${res.gradient} text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg transition-all flex items-center gap-1`}
                            >
                              <FaRocket className="text-xs" />
                              <span>Explore</span>
                            </motion.a>

                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={res.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg font-semibold text-sm shadow-lg transition-all flex items-center gap-1"
                            >
                              <FaPlay className="text-red-500 text-xs" />
                              <span>Watch</span>
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

          {/* Empty State */}
          {sortedResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-100"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(RecommendedResources);