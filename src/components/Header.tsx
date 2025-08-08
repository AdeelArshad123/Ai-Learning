'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut, FiBookOpen, FiTrendingUp, FiYoutube, FiCode, FiHelpCircle, FiStar, FiZap, FiChevronRight } from 'react-icons/fi'
import { FaRocket, FaBrain, FaGraduationCap } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'
import AuthModal from './AuthModal'

// Mock session hook for development
const useSession = () => ({ data: null, status: 'unauthenticated' })
const signIn = () => console.log('Sign in clicked')
const signOut = () => console.log('Sign out clicked')

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()

  const navigationItems = [
    { href: '/', label: 'Home', icon: FiBookOpen, description: 'Learning Hub' },
    { href: '#trending', label: 'Trending', icon: FiTrendingUp, description: 'Hot Topics' },
    { href: '#youtube', label: 'YouTube', icon: FiYoutube, description: 'Video Tutorials' },
    { href: '#ai-code', label: 'AI Code', icon: FiCode, description: 'Smart Coding' },
    { href: '#quizzes', label: 'Quizzes', icon: FiHelpCircle, description: 'Test Skills' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isLoggedIn = !!session

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center gap-4 group flex-shrink-0 relative">
            <div className="relative">
              {/* Glowing border effect */}
              <motion.div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-75 blur-lg"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative w-14 h-14 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 border border-white/20">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <FaBrain className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <motion.h1 
                className={`text-2xl font-black tracking-tight ${
                  scrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                CodeLearner
              </motion.h1>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FiZap className={`w-3 h-3 ${scrolled ? 'text-indigo-500' : 'text-yellow-300'}`} />
                <p className={`text-sm font-semibold ${
                  scrolled 
                    ? 'text-gray-600 dark:text-gray-300' 
                    : 'text-white/90'
                }`}>
                  AI-Powered Learning
                </p>
                <FiStar className={`w-3 h-3 ${scrolled ? 'text-yellow-500' : 'text-yellow-300'}`} />
              </motion.div>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm relative overflow-hidden group ${
                    scrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      scrolled
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30'
                        : 'bg-white/10 backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Icon with animation */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative z-10"
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Label */}
                  <span className="relative z-10 font-bold">
                    {item.label}
                  </span>
                  
                  {/* Description tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className={`absolute top-full mt-2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none ${
                      scrolled
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-white/90 text-gray-900'
                    } shadow-lg backdrop-blur-sm`}
                  >
                    {item.description}
                    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                      scrolled
                        ? 'bg-gray-900 dark:bg-white'
                        : 'bg-white/90'
                    }`} />
                  </motion.div>
                  
                  {/* Active indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      scrolled
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'bg-white'
                    }`}
                    whileHover={{ width: "80%" }}
                    initial={{ width: "0%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced User Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Theme Toggle with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Profile Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group ${
                      scrolled
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FiUser className="w-4 h-4" />
                    </motion.div>
                    <span>Profile</span>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
                
                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group ${
                    scrolled
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-red-500/80 border border-white/20'
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiLogOut className="w-4 h-4" />
                  </motion.div>
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthModalOpen(true)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group ${
                  scrolled
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
                    : 'bg-white text-indigo-600 hover:bg-gray-50 border-2 border-white/20'
                }`}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20"
                  animate={{ 
                    x: ["-100%", "100%"],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <FaRocket className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10">Get Started</span>
                
                {/* Sparkle effects */}
                <motion.div
                  className="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute bottom-1 left-1 w-1 h-1 bg-pink-300 rounded-full"
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </motion.button>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className={`p-3 rounded-xl transition-all duration-300 shadow-lg relative overflow-hidden ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20'
              }`}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </motion.div>
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`lg:hidden mt-6 rounded-2xl overflow-hidden backdrop-blur-xl ${
                scrolled
                  ? 'bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50'
                  : 'bg-white/10 border border-white/20'
              } shadow-2xl`}
            >
              <div className="p-6">
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 font-semibold group relative overflow-hidden ${
                          scrolled
                            ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                            : 'text-white hover:bg-white/20'
                        }`}
                      >
                        {/* Background effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                            scrolled
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
                              : 'bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        />

                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center relative z-10 ${
                            scrolled
                              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                              : 'bg-white/20 text-white'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex flex-col relative z-10">
                          <span className="font-bold text-base">{item.label}</span>
                          <span className={`text-sm ${
                            scrolled
                              ? 'text-gray-500 dark:text-gray-400'
                              : 'text-white/70'
                          }`}>
                            {item.description}
                          </span>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className={`ml-auto relative z-10 ${
                            scrolled
                              ? 'text-gray-400 dark:text-gray-500'
                              : 'text-white/50'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <FiChevronRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Enhanced Mobile User Actions */}
                  <div className={`border-t pt-6 mt-6 ${
                    scrolled
                      ? 'border-gray-200 dark:border-gray-700'
                      : 'border-white/20'
                  }`}>
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-3">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link
                            href="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 font-semibold group relative overflow-hidden ${
                              scrolled
                                ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                                : 'text-white bg-white/20 hover:bg-white/30'
                            } shadow-lg`}
                          >
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                            >
                              <FiUser className="w-5 h-5" />
                            </motion.div>
                            <span className="font-bold">Profile</span>
                          </Link>
                        </motion.div>

                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          onClick={() => {
                            signOut()
                            setIsMobileMenuOpen(false)
                          }}
                          className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 font-semibold group relative overflow-hidden w-full text-left ${
                            scrolled
                              ? 'text-white bg-red-500 hover:bg-red-600'
                              : 'text-white bg-white/20 hover:bg-red-500/80'
                          } shadow-lg`}
                        >
                          <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                          >
                            <FiLogOut className="w-5 h-5" />
                          </motion.div>
                          <span className="font-bold">Logout</span>
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => {
                          setAuthModalOpen(true)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 font-bold w-full text-left relative overflow-hidden group shadow-xl ${
                          scrolled
                            ? 'text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
                            : 'text-indigo-600 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center relative z-10 ${
                            scrolled
                              ? 'bg-white/20'
                              : 'bg-indigo-100'
                          }`}
                        >
                          <FaRocket className="w-5 h-5" />
                        </motion.div>
                        <span className="font-bold relative z-10">Get Started</span>
                      </motion.button>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </motion.header>
  )
}