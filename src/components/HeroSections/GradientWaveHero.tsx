'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaRegLightbulb, FaStar } from 'react-icons/fa'

// Fixed star positions to avoid hydration mismatch
const STAR_POSITIONS = [
  { left: 10, top: 20 },
  { left: 85, top: 15 },
  { left: 25, top: 35 },
  { left: 70, top: 45 },
  { left: 15, top: 60 },
  { left: 90, top: 25 },
  { left: 45, top: 10 },
  { left: 60, top: 70 },
  { left: 5, top: 80 },
  { left: 80, top: 55 },
  { left: 35, top: 25 },
  { left: 95, top: 65 },
  { left: 20, top: 85 },
  { left: 75, top: 30 },
  { left: 50, top: 50 },
  { left: 30, top: 75 },
  { left: 65, top: 20 },
  { left: 40, top: 90 },
  { left: 85, top: 40 },
  { left: 12, top: 45 }
]

// Custom Typewriter Component for Hero
const HeroTypewriter = ({ texts, speed = 100, pauseTime = 2000 }: { texts: string[], speed?: number, pauseTime?: number }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const text = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1))
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, pauseTime])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span>
      {currentText}
      <span className={`inline-block w-1 h-16 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  )
}

const GradientWaveHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        {/* Multiple wave layers */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(217, 70, 239, 0.3)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="50%" stopColor="rgba(217, 70, 239, 0.3)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(217, 70, 239, 0.1)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(244, 114, 182, 0.1)" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <motion.path
            d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
            fill="url(#wave1)"
            animate={{
              d: [
                "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z",
                "M0,450 C300,350 600,550 1200,450 L1200,800 L0,800 Z",
                "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Wave 2 */}
          <motion.path
            d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
            fill="url(#wave2)"
            animate={{
              d: [
                "M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z",
                "M0,550 C400,450 800,650 1200,550 L1200,800 L0,800 Z",
                "M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Wave 3 */}
          <motion.path
            d="M0,600 C500,500 700,700 1200,600 L1200,800 L0,800 Z"
            fill="url(#wave3)"
            animate={{
              d: [
                "M0,600 C500,500 700,700 1200,600 L1200,800 L0,800 Z",
                "M0,650 C500,550 700,750 1200,650 L1200,800 L0,800 Z",
                "M0,600 C500,500 700,700 1200,600 L1200,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0">
        {STAR_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/40"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 4) + 3, // Deterministic duration based on index
              repeat: Infinity,
              delay: (i % 3) * 0.5, // Deterministic delay based on index
            }}
          >
            <FaStar className="text-sm" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-purple-200 text-sm font-medium">
              ✨ Next-Gen AI Learning
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight min-h-[200px] flex flex-col justify-center"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            <HeroTypewriter
              texts={[
                "Master Programming",
                "Build Amazing Apps",
                "Code with AI",
                "Learn Faster",
                "Create the Future"
              ]}
              speed={120}
              pauseTime={1500}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto font-light"
        >
          Transform your coding journey with personalized AI-driven learning experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#dashboard"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-fuchsia-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
          
          <motion.a
            href="#features"
            className="px-8 py-4 border-2 border-purple-400/50 text-purple-200 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Features
          </motion.a>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 flex justify-center gap-8"
        >
          {[
            { icon: FaCode, label: 'Smart Coding' },
            { icon: FaRocket, label: 'Fast Learning' },
            { icon: FaRegLightbulb, label: 'AI Insights' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                y: { duration: 2, repeat: Infinity, delay: index * 0.5 }
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                <item.icon className="text-purple-300 text-xl" />
              </div>
              <span className="text-purple-200 text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none" />
    </section>
  )
}

export default GradientWaveHero
