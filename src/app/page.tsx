'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBrain, 
  FaRobot, 
  FaChartLine, 
  FaCode, 
  FaLightbulb,
  FaCog,
  FaGraduationCap,
  FaRocket,
  FaShieldAlt
} from 'react-icons/fa'

// Import AI automation components
import SmartCodeReviewer from '../components/ai-automation/SmartCodeReviewer'
import AdaptiveLearningEngine from '../components/ai-automation/AdaptiveLearningEngine'
import PredictiveAnalyticsDashboard from '../components/ai-automation/PredictiveAnalyticsDashboard'
import IntelligentContentGenerator from '../components/ai-automation/IntelligentContentGenerator'
import AdvancedAutomationHub from '../components/ai-automation/AdvancedAutomationHub'

// Import existing components
import Dashboard from '../components/Dashboard'
import AIQuizGenerator from '../components/AIQuizGenerator'

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState('overview')

  const aiFeatures = [
    {
      id: 'overview',
      name: 'Overview',
      icon: FaChartLine,
      color: 'from-blue-500 to-cyan-500',
      description: 'System overview and dashboard'
    },
    {
      id: 'code-reviewer',
      name: 'Smart Code Reviewer',
      icon: FaCode,
      color: 'from-blue-500 to-purple-600',
      description: 'Real-time AI code analysis with performance optimization'
    },
    {
      id: 'adaptive-learning',
      name: 'Adaptive Learning Engine',
      icon: FaBrain,
      color: 'from-purple-500 to-pink-600',
      description: 'Personalized learning paths with skill gap analysis'
    },
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics',
      icon: FaChartLine,
      color: 'from-green-500 to-teal-600',
      description: 'AI-driven performance prediction and insights'
    },
    {
      id: 'content-generator',
      name: 'Content Generator',
      icon: FaLightbulb,
      color: 'from-yellow-500 to-orange-600',
      description: 'Auto-generate coding exercises and projects'
    },
    {
      id: 'smart-assessment',
      name: 'Smart Assessment',
      icon: FaGraduationCap,
      color: 'from-indigo-500 to-purple-600',
      description: 'Adaptive questioning with real-time difficulty adjustment'
    },
    {
      id: 'automation-hub',
      name: 'Automation Hub',
      icon: FaCog,
      color: 'from-indigo-500 to-purple-600',
      description: 'Central control panel for AI automation features'
    }
  ]

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'overview':
        return <Dashboard />
      case 'code-reviewer':
        return <SmartCodeReviewer />
      case 'adaptive-learning':
        return <AdaptiveLearningEngine />
      case 'predictive-analytics':
        return <PredictiveAnalyticsDashboard />
      case 'content-generator':
        return <IntelligentContentGenerator />
      case 'smart-assessment':
        return <AIQuizGenerator topic="JavaScript" difficulty="intermediate" questionCount={5} />
      case 'automation-hub':
        return <AdvancedAutomationHub />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  <FaRobot className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              AI Automation System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Comprehensive AI-powered learning platform with advanced automation features
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FaBrain className="text-blue-600 w-4 h-4" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FaRocket className="text-green-600 w-4 h-4" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Intelligent</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <FaShieldAlt className="text-purple-600 w-4 h-4" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Adaptive</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {aiFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeFeature === feature.id
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg scale-105`
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{feature.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Feature Content */}
      <div className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderFeatureContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI CodeLearner - Advanced Automation System
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
              <span>🤖 AI Features</span>
              <span>⚡ Real-time Analysis</span>
              <span>🎯 Personalized Learning</span>
              <span>📊 Predictive Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}