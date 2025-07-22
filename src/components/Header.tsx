'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut, FiBookOpen, FiTrendingUp, FiYoutube, FiCode, FiHelpCircle } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useSession, signIn, signOut } from 'next-auth/react'
import AuthModal from './AuthModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { data: session, status } = useSession()

  const navigationItems = [
    { href: '/', label: 'Home', icon: FiBookOpen },
    { href: '#trending', label: 'Trending', icon: FiTrendingUp },
    { href: '#youtube', label: 'YouTube', icon: FiYoutube },
    { href: '#ai-code', label: 'AI Code', icon: FiCode },
    { href: '#quizzes', label: 'Quizzes', icon: FiHelpCircle },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isLoggedIn = !!session

  return (
    <header className="z-50 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              {/* Animated gradient border */}
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-secondary to-blue-400 blur-sm opacity-70 group-hover:opacity-100 transition-all animate-pulse z-0" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 z-10">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L18 6V14L10 18L2 14V6L10 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 10L18 6M10 10V18M10 10L2 6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Sparkle */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full shadow-lg"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CodeLearner</h1>
              <p className="text-xs text-gray-700 dark:text-white/80 -mt-1">AI-Powered Learning</p>
            </div>
          </Link>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-white hover:text-primary transition-colors duration-200 font-semibold group relative px-4 py-2 rounded-full overflow-hidden"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {item.label}
                {/* Animated underline */}
                <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                {/* Pill hover */}
                <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-900 dark:text-gray-300 hover:text-primary transition-colors bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg font-semibold"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="text-sm font-semibold">Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-gray-900 dark:text-gray-300 hover:text-red-600 transition-colors bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-lg shadow font-semibold"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-colors font-semibold text-base border border-gray-800"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Developer Auth</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-800 font-semibold"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
                {/* Mobile User Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-white hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-800 font-semibold"
                      >
                        <FiUser className="w-5 h-5" />
                        <span className="font-semibold">Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center gap-3 text-white hover:text-red-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-800 font-semibold w-full text-left"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalOpen(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg hover:shadow-lg transition-colors font-semibold w-full text-base border border-gray-800"
                    >
                      <FiLogIn className="w-5 h-5" />
                      <span>Developer Auth</span>
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  )
} 