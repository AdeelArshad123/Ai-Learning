'use client'

import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaArrowUp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FooterWithStyleSelector() {
  const [isSticky, setIsSticky] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [simplifiedLayout, setSimplifiedLayout] = useState(false)
  const [hoverEffect, setHoverEffect] = useState(true)
  const [stickyFooter, setStickyFooter] = useState(true)
  const [largeTypography, setLargeTypography] = useState(true)
  const [roundedInputs, setRoundedInputs] = useState(true)
  const [floatingButton, setFloatingButton] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerBgClass = darkMode ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'bg-white'
  const textColorClass = darkMode ? 'text-white' : 'text-gray-900'
  const headingSizeClass = largeTypography ? 'text-xl font-bold mb-6' : 'text-lg font-semibold mb-4'
  const navColumnsClass = simplifiedLayout ? 'grid-cols-2' : 'grid-cols-3'
  const socialIconClass = hoverEffect ? 'transition-colors transform hover:scale-110 hover:text-white' : ''
  const inputRoundedClass = roundedInputs ? 'rounded-full' : 'rounded-md'
  const footerStickyClass = stickyFooter && isSticky ? 'fixed bottom-0 left-0 w-full z-50 shadow-lg' : ''
  const backToTopClass = floatingButton ? 'fixed bottom-8 right-8' : 'hidden'

  return (
    <>
      <motion.footer 
        className={`${containerBgClass} ${textColorClass} mt-16 relative overflow-hidden ${footerStickyClass}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated background particles - matching header design */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            {/* Brand & Social */}
            <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-start mb-8 md:mb-0">
              <Link href="/" className="flex items-center gap-3 font-extrabold text-3xl text-white mb-3 group">
                <div className="relative">
                  {/* Glowing border effect - matching header */}
                  <motion.div
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-75 blur-lg"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="relative w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 border border-white/20">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <FaGithub className="w-6 h-6 text-white" />
                      
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
                <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                CodeLearner
                </span>
              </Link>
              <span className="text-yellow-300 font-semibold text-lg mb-2">Level up your coding journey 🚀</span>
              <p className="text-white/90 mb-5 max-w-xs text-center md:text-left">
                Learn programming languages, tools, and concepts with AI-powered examples and interactive quizzes.
              </p>
              <div className="flex space-x-4 mt-2">
                <motion.a 
                  href="#" 
                  aria-label="GitHub" 
                  className={`text-white/80 ${socialIconClass} text-2xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Twitter" 
                  className={`text-white/80 ${socialIconClass} text-2xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTwitter />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="LinkedIn" 
                  className={`text-white/80 ${socialIconClass} text-2xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="YouTube" 
                  className={`text-white/80 ${socialIconClass} text-2xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 md:${navColumnsClass} gap-8`}>
              <div>
                <h3 className={`${headingSizeClass} text-white`}>Product</h3>
                <ul className="space-y-3 text-lg">
                  <li><Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors">Home</Link></li>
                  <li><Link href="#trending" className="text-white/80 hover:text-white hover:underline transition-colors">Trending</Link></li>
                  <li><Link href="#ai-code" className="text-white/80 hover:text-white hover:underline transition-colors">AI Code</Link></li>
                  <li><Link href="#quizzes" className="text-white/80 hover:text-white hover:underline transition-colors">Quizzes</Link></li>
                </ul>
              </div>
              <div>
                <h3 className={`${headingSizeClass} text-white`}>Resources</h3>
                <ul className="space-y-3 text-lg">
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Community</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className={`${headingSizeClass} text-white`}>Company</h3>
                <ul className="space-y-3 text-lg">
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">About</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Careers</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Contact</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Support</a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-end">
              <h3 className={`${headingSizeClass} text-white`}>Stay Updated</h3>
              <form className="flex w-full max-w-xs">
                <input 
                  type="email" 
                  aria-label="Email address" 
                  placeholder="Your email" 
                  className={`${roundedInputs ? 'rounded-full' : 'rounded-md'} px-5 py-3 w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 backdrop-blur-sm`} 
                />
                <motion.button 
                  type="submit" 
                  className={`${roundedInputs ? 'rounded-full' : 'rounded-md'} px-6 py-3 bg-white/20 text-white font-semibold hover:bg-white/30 transition-all border border-white/20 backdrop-blur-sm`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
              <span className="text-xs text-white/60 mt-3">No spam. Unsubscribe anytime.</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-16 pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl`}>
            <p className="text-white/80 text-base mb-6 md:mb-0">© 2024 CodeLearner. All rights reserved.</p>
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="#" className="text-white/80 hover:text-white text-base transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white text-base transition-colors">Terms of Service</a>
              <a href="#" className="text-white/80 hover:text-white text-base transition-colors">Cookie Policy</a>
            </div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`${floatingButton ? 'fixed bottom-8 right-8' : 'hidden'} flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-full px-4 py-3 shadow-lg transition-all backdrop-blur-sm border border-white/20`}
              aria-label="Back to top"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowUp className="inline-block" /> Top
            </motion.button>
            </div>
          </div>
      </motion.footer>
    </>
  )
}
