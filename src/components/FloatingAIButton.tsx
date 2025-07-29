'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaBrain, FaMagic, FaComments } from 'react-icons/fa'
import { FiMessageCircle, FiZap } from 'react-icons/fi'
import MobileAIAssistant from './MobileAIAssistant'

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)

  // Simulate AI activity with periodic pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1)
      if (Math.random() > 0.7) {
        setHasNewMessage(true)
        setTimeout(() => setHasNewMessage(false), 3000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const toggleAssistant = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main Button */}
          <motion.button
            onClick={toggleAssistant}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            
            {/* Icon */}
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <FaRobot className="w-7 h-7" />
            </motion.div>
            
            {/* New Message Indicator */}
            <AnimatePresence>
              {hasNewMessage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
              >
                Ask AI Assistant
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Feature Indicators */}
        <div className="absolute -top-2 -left-2 flex gap-1">
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-3 h-3 bg-pink-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-30 flex flex-col gap-2"
          >
            {[
              { icon: FaBrain, label: "Ask Question", color: "from-blue-500 to-blue-600" },
              { icon: FaMagic, label: "Generate Code", color: "from-purple-500 to-purple-600" },
              { icon: FiZap, label: "Quick Help", color: "from-green-500 to-green-600" }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setIsOpen(true)
                  setIsHovered(false)
                }}
                className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium group`}
              >
                <action.icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <MobileAIAssistant 
            isOpen={isOpen} 
            onToggle={toggleAssistant}
          />
        )}
      </AnimatePresence>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={toggleAssistant}
          />
        )}
      </AnimatePresence>
    </>
  )
}
