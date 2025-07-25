'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiCopy, FiDownload, FiPlay, FiRefreshCw, FiCheck, FiX, FiShare2, FiMessageSquare, FiBookOpen, FiZap } from 'react-icons/fi'
import { useNotifications } from './NotificationProvider'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';
import { oneDark } from '@codemirror/theme-one-dark';

interface AICodeGeneratorProps {
  className?: string
}

export default function AICodeGenerator({ className = '' }: AICodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState('ai')
  const [language, setLanguage] = useState('JavaScript')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('beginner')
  const [codeQuality, setCodeQuality] = useState('production')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [liveCode, setLiveCode] = useState('// Write your code here...')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [codeReview, setCodeReview] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { addNotification } = useNotifications()

  // Simplified AI Code Generator Component
  return (
    <div className={`max-w-7xl mx-auto p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
            <FiCode className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Code Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
              Generate, edit, and optimize code with AI assistance
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        {[
          { id: 'ai', label: 'AI Generator', icon: FiZap, color: 'from-blue-500 to-purple-600' },
          { id: 'live', label: 'Live Editor', icon: FiCode, color: 'from-green-500 to-emerald-600' },
          { id: 'templates', label: 'Templates', icon: FiBookOpen, color: 'from-orange-500 to-red-600' },
          { id: 'suggestions', label: 'AI Suggestions', icon: FiMessageSquare, color: 'from-purple-500 to-pink-600' },
          { id: 'review', label: 'Code Review', icon: FiCheck, color: 'from-indigo-500 to-blue-600' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="text-lg" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'ai' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Generate Code</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="PHP">PHP</option>
                    <option value="Rust">Rust</option>
                    <option value="Go">Go</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic/Description
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe what you want to build..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    rows={3}
                  />
                </div>

                <button
                  onClick={() => {
                    setIsLoading(true)
                    // Simulate API call
                    setTimeout(() => {
                      setGeneratedCode(`// ${language} code for: ${topic}\nconsole.log("Hello, World!");`)
                      setIsLoading(false)
                    }, 2000)
                  }}
                  disabled={isLoading || !topic.trim()}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate Code'}
                </button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Generated Code</h3>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Generating your code...</p>
                  </div>
                </div>
              ) : generatedCode ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">{generatedCode}</pre>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedCode)
                        addNotification('Code copied to clipboard!', 'success')
                      }}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <FiCopy className="text-sm" />
                      Copy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  <FiCode className="text-4xl mb-4 mx-auto" />
                  <p>Enter a topic and click "Generate Code" to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {activeTab === 'live' && 'Live Code Editor'}
            {activeTab === 'templates' && 'Code Templates'}
            {activeTab === 'suggestions' && 'AI Suggestions'}
            {activeTab === 'review' && 'Code Review'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This feature is coming soon! Stay tuned for more AI-powered coding tools.
          </p>
        </div>
      )}
    </div>
  )
}
