import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className = '', 
  color = 'blue',
  size = 'md',
  showLabel = false
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    red: 'from-red-500 to-pink-500',
    purple: 'from-purple-500 to-indigo-500'
  }
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>{Math.round(percentage)}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizes[size]}`}>
        <motion.div
          className={`bg-gradient-to-r ${colors[color]} ${sizes[size]} rounded-full transition-all duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}