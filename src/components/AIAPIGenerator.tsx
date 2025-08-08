'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCode,
  FiDownload,
  FiPlay,
  FiSettings,
  FiDatabase,
  FiShield,
  FiZap,
  FiCheck,
  FiX,
  FiLoader,
  FiEye,
  FiCopy,
  FiExternalLink,
  FiArrowRight
} from 'react-icons/fi'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiRuby,
  SiPhp,
  SiRust,
  SiSharp
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

interface GeneratedAPI {
  language: string
  framework: string
  files: GeneratedFile[]
  documentation: string
  examples: string[]
  deploymentInstructions: string
}

interface GeneratedFile {
  path: string
  content: string
  type: 'code' | 'config' | 'documentation' | 'test'
}

const AIAPIGenerator: React.FC = () => {
  const [description, setDescription] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['javascript'])
  const [authType, setAuthType] = useState<'jwt' | 'oauth' | 'apikey' | 'basic' | 'none'>('jwt')
  const [database, setDatabase] = useState<'mongodb' | 'postgresql' | 'mysql' | 'sqlite' | 'none'>('mongodb')
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate')
  const [includeTests, setIncludeTests] = useState(true)
  const [includeDocs, setIncludeDocs] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAPIs, setGeneratedAPIs] = useState<GeneratedAPI[]>([])
  const [selectedAPI, setSelectedAPI] = useState<GeneratedAPI | null>(null)
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null)
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'download'>('form')

  // New automation states
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [autoSuggestions, setAutoSuggestions] = useState<any>(null)
  const [smartDefaults, setSmartDefaults] = useState<any>(null)
  const [projectTemplate, setProjectTemplate] = useState<string>('')
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false)

  const languages = [
    { id: 'python', name: 'Python', icon: SiPython, color: 'text-blue-500' },
    { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
    { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { id: 'java', name: 'Java', icon: FaJava, color: 'text-red-500' },
    { id: 'csharp', name: 'C#', icon: SiSharp, color: 'text-purple-500' },
    { id: 'go', name: 'Go', icon: SiGo, color: 'text-cyan-500' },
    { id: 'ruby', name: 'Ruby', icon: SiRuby, color: 'text-red-600' },
    { id: 'php', name: 'PHP', icon: SiPhp, color: 'text-indigo-500' },
    { id: 'rust', name: 'Rust', icon: SiRust, color: 'text-orange-500' }
  ]

  const authOptions = [
    { id: 'jwt', name: 'JWT Token', icon: FiShield, description: 'JSON Web Token authentication' },
    { id: 'oauth', name: 'OAuth 2.0', icon: FiZap, description: 'OAuth 2.0 authorization' },
    { id: 'apikey', name: 'API Key', icon: FiCode, description: 'Simple API key authentication' },
    { id: 'basic', name: 'Basic Auth', icon: FiSettings, description: 'Username/password authentication' },
    { id: 'none', name: 'No Auth', icon: FiX, description: 'Public API without authentication' }
  ]

  const databaseOptions = [
    { id: 'mongodb', name: 'MongoDB', icon: FiDatabase, description: 'NoSQL document database' },
    { id: 'postgresql', name: 'PostgreSQL', icon: FiDatabase, description: 'Advanced relational database' },
    { id: 'mysql', name: 'MySQL', icon: FiDatabase, description: 'Popular relational database' },
    { id: 'sqlite', name: 'SQLite', icon: FiDatabase, description: 'Lightweight file-based database' },
    { id: 'none', name: 'No Database', icon: FiX, description: 'In-memory or external data source' }
  ]

  const handleLanguageToggle = (languageId: string) => {
    setSelectedLanguages(prev =>
      prev.includes(languageId)
        ? prev.filter(id => id !== languageId)
        : [...prev, languageId]
    )
  }

  // Smart Analysis Function
  const analyzeDescription = async (desc: string) => {
    if (!desc.trim() || desc.length < 20) return

    setIsAnalyzing(true)
    try {
      // Simulate AI analysis - in real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 1500))

      const analysis = {
        detectedEntities: extractEntities(desc),
        suggestedLanguages: suggestLanguages(desc),
        recommendedAuth: suggestAuth(desc),
        recommendedDatabase: suggestDatabase(desc),
        complexity: analyzeComplexity(desc),
        estimatedEndpoints: estimateEndpoints(desc)
      }

      setAnalysisResults(analysis)
      setAutoSuggestions(analysis)

      // Auto-apply smart defaults
      if (analysis.suggestedLanguages.length > 0) {
        setSelectedLanguages(analysis.suggestedLanguages.slice(0, 2))
      }
      if (analysis.recommendedAuth) {
        setAuthType(analysis.recommendedAuth)
      }
      if (analysis.recommendedDatabase) {
        setDatabase(analysis.recommendedDatabase)
      }
      setComplexity(analysis.complexity)

    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper functions for smart analysis
  const extractEntities = (desc: string) => {
    const entities = []
    const keywords = ['user', 'todo', 'task', 'product', 'order', 'comment', 'post', 'article', 'category']
    keywords.forEach(keyword => {
      if (desc.toLowerCase().includes(keyword)) {
        entities.push(keyword)
      }
    })
    return entities
  }

  const suggestLanguages = (desc: string) => {
    const suggestions = []
    if (desc.toLowerCase().includes('machine learning') || desc.toLowerCase().includes('ai')) {
      suggestions.push('python')
    }
    if (desc.toLowerCase().includes('web') || desc.toLowerCase().includes('frontend')) {
      suggestions.push('javascript', 'typescript')
    }
    if (desc.toLowerCase().includes('enterprise') || desc.toLowerCase().includes('corporate')) {
      suggestions.push('java', 'csharp')
    }
    if (desc.toLowerCase().includes('performance') || desc.toLowerCase().includes('high-load')) {
      suggestions.push('go', 'rust')
    }
    return suggestions.length > 0 ? suggestions : ['javascript', 'python']
  }

  const suggestAuth = (desc: string) => {
    if (desc.toLowerCase().includes('public') || desc.toLowerCase().includes('open')) return 'none'
    if (desc.toLowerCase().includes('oauth') || desc.toLowerCase().includes('social')) return 'oauth'
    if (desc.toLowerCase().includes('enterprise') || desc.toLowerCase().includes('secure')) return 'jwt'
    return 'jwt'
  }

  const suggestDatabase = (desc: string) => {
    if (desc.toLowerCase().includes('nosql') || desc.toLowerCase().includes('mongodb')) return 'mongodb'
    if (desc.toLowerCase().includes('postgresql') || desc.toLowerCase().includes('postgres')) return 'postgresql'
    if (desc.toLowerCase().includes('mysql')) return 'mysql'
    if (desc.toLowerCase().includes('simple') || desc.toLowerCase().includes('lightweight')) return 'sqlite'
    return 'mongodb'
  }

  const analyzeComplexity = (desc: string) => {
    const complexWords = ['advanced', 'complex', 'enterprise', 'scalable', 'microservice']
    const simpleWords = ['simple', 'basic', 'minimal', 'lightweight']

    const hasComplex = complexWords.some(word => desc.toLowerCase().includes(word))
    const hasSimple = simpleWords.some(word => desc.toLowerCase().includes(word))

    if (hasComplex) return 'complex'
    if (hasSimple) return 'simple'
    return 'moderate'
  }

  const estimateEndpoints = (desc: string) => {
    const entities = extractEntities(desc)
    const baseEndpoints = entities.length * 4 // CRUD operations
    const authEndpoints = desc.toLowerCase().includes('auth') ? 3 : 0
    return baseEndpoints + authEndpoints
  }

  // Auto-configure based on project template
  const applyProjectTemplate = (template: string) => {
    setIsAutoConfiguring(true)

    const templates = {
      'ecommerce': {
        description: 'A complete e-commerce API with products, orders, payments, user management, and inventory tracking. Includes shopping cart, wishlist, reviews, and admin dashboard.',
        languages: ['javascript', 'python'],
        auth: 'jwt',
        database: 'postgresql',
        complexity: 'complex',
        includeTests: true,
        includeDocs: true
      },
      'social': {
        description: 'A social media platform API with user profiles, posts, comments, likes, follows, and real-time messaging. Includes content moderation and analytics.',
        languages: ['javascript', 'typescript'],
        auth: 'oauth',
        database: 'mongodb',
        complexity: 'complex',
        includeTests: true,
        includeDocs: true
      },
      'blog': {
        description: 'A blogging platform API with articles, categories, tags, comments, and user management. Includes SEO optimization and content scheduling.',
        languages: ['javascript', 'php'],
        auth: 'jwt',
        database: 'mysql',
        complexity: 'moderate',
        includeTests: true,
        includeDocs: true
      },
      'todo': {
        description: 'A task management API with todos, projects, categories, due dates, and collaboration features. Includes notifications and progress tracking.',
        languages: ['javascript', 'python'],
        auth: 'jwt',
        database: 'mongodb',
        complexity: 'simple',
        includeTests: true,
        includeDocs: true
      }
    }

    const config = templates[template as keyof typeof templates]
    if (config) {
      setDescription(config.description)
      setSelectedLanguages(config.languages)
      setAuthType(config.auth as any)
      setDatabase(config.database as any)
      setComplexity(config.complexity as any)
      setIncludeTests(config.includeTests)
      setIncludeDocs(config.includeDocs)
    }

    setTimeout(() => setIsAutoConfiguring(false), 1000)
  }

  const generateAPI = async () => {
    if (!description.trim() || selectedLanguages.length === 0) {
      alert('Please provide a description and select at least one programming language.')
      return
    }

    setIsGenerating(true)
    setActiveTab('preview')

    try {
      const response = await fetch('/api/ai-api-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          languages: selectedLanguages,
          authType,
          database,
          complexity,
          includeTests,
          includeDocs
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        setGeneratedAPIs(result.data.generatedAPIs)
        setSelectedAPI(result.data.generatedAPIs[0])
        if (result.data.generatedAPIs[0]?.files?.length > 0) {
          setSelectedFile(result.data.generatedAPIs[0].files[0])
        }
      } else {
        throw new Error(result.error || 'Failed to generate API')
      }
    } catch (error) {
      console.error('Error generating API:', error)
      alert(`Failed to generate API: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadAPI = (api: GeneratedAPI) => {
    // Create a simple text file with all the generated code
    const content = api.files.map(file => 
      `// File: ${file.path}\n${file.content}\n\n`
    ).join('\n' + '='.repeat(80) + '\n\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${api.language}-${api.framework}-api.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Modern Header with Floating Cards */}
        <div className="text-center mb-12 relative">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-1/3 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Enhanced Main Title */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-6 inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full shadow-2xl">
                  <FiCode className="text-4xl text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
              >
                AI API Generator
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 mb-6"
              >
                <div className="flex items-center gap-1 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🤖 AI-Powered</span>
                </div>
                <div className="flex items-center gap-1 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">⚡ Production-Ready</span>
                </div>
                <div className="flex items-center gap-1 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">🌐 Multi-Language</span>
                </div>
                <div className="flex items-center gap-1 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">📚 Auto-Docs</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Transform your natural language descriptions into complete, production-ready APIs.
                Get full implementations with authentication, database integration, tests, and comprehensive documentation.
              </motion.p>
            </div>

            {/* Enhanced Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: FiZap, title: "Lightning Fast", desc: "Generate complete APIs in under 30 seconds", color: "from-yellow-400 to-orange-500", emoji: "⚡" },
                { icon: FiShield, title: "Production Ready", desc: "Built-in security, validation & best practices", color: "from-green-400 to-emerald-500", emoji: "🛡️" },
                { icon: FiDatabase, title: "Multi-Language", desc: "Support for 9+ programming languages", color: "from-blue-400 to-cyan-500", emoji: "🌐" },
                { icon: FiSettings, title: "Auto-Configure", desc: "Database, auth, tests & docs included", color: "from-purple-400 to-pink-500", emoji: "⚙️" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg`}>
                      <feature.icon className="text-white text-2xl" />
                    </div>
                    <div className="text-3xl mb-2">{feature.emoji}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Modern Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/30 dark:border-gray-700/30">
            <div className="flex items-center">
              {[
                { id: 'form', label: 'Configure', icon: FiSettings, step: 1, color: 'from-blue-500 to-cyan-500' },
                { id: 'preview', label: 'Preview', icon: FiEye, step: 2, color: 'from-purple-500 to-pink-500' },
                { id: 'download', label: 'Download', icon: FiDownload, step: 3, color: 'from-green-500 to-emerald-500' }
              ].map((tab, index) => (
                <div key={tab.id} className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {/* Step Number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {tab.step}
                    </div>

                    {/* Icon and Label */}
                    <div className="flex items-center gap-2">
                      <tab.icon className="text-lg" />
                      <span className="hidden sm:block">{tab.label}</span>
                    </div>

                    {/* Active Indicator */}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>

                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Smart Project Templates */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-2xl border border-purple-200 dark:border-purple-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30" />
                    <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                      <FiZap className="text-white text-2xl" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quick Start Templates ⚡</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Choose a template to auto-configure your API</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'ecommerce', name: 'E-commerce', icon: '🛒', desc: 'Products, orders, payments', color: 'from-green-400 to-emerald-500' },
                    { id: 'social', name: 'Social Media', icon: '📱', desc: 'Posts, comments, follows', color: 'from-blue-400 to-cyan-500' },
                    { id: 'blog', name: 'Blog Platform', icon: '📝', desc: 'Articles, categories, SEO', color: 'from-orange-400 to-red-500' },
                    { id: 'todo', name: 'Task Manager', icon: '✅', desc: 'Todos, projects, teams', color: 'from-purple-400 to-pink-500' }
                  ].map((template, index) => (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => applyProjectTemplate(template.id)}
                      disabled={isAutoConfiguring}
                      className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isAutoConfiguring && projectTemplate === template.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse" />
                      )}

                      <div className="text-center">
                        <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${template.color} mb-3`}>
                          <span className="text-2xl">{template.icon}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{template.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <span className="text-sm text-purple-700 dark:text-purple-300">
                      💡 Templates auto-configure languages, database, auth, and more!
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced API Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30" />
                    <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                      <FiCode className="text-white text-2xl" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Describe Your API 🚀</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Tell us what you want to build in natural language</p>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                      // Auto-analyze after user stops typing
                      if (e.target.value.length > 50) {
                        clearTimeout(window.analysisTimeout)
                        window.analysisTimeout = setTimeout(() => analyzeDescription(e.target.value), 2000)
                      }
                    }}
                    placeholder="Example: I need a REST API for a todo application with user authentication. Users should be able to create, read, update, and delete todos. Each todo has a title, description, due date, and completion status. Include user registration, login, and password reset functionality."
                    className="w-full h-48 p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-700 dark:to-blue-900/10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-lg leading-relaxed shadow-inner"
                  />

                  {/* Smart Analysis Indicator */}
                  {isAnalyzing && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FiLoader className="w-4 h-4 text-blue-600" />
                      </motion.div>
                      <span className="text-xs text-blue-700 dark:text-blue-300">Analyzing...</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      description.length > 400 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                      description.length > 200 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {description.length}/500
                    </div>

                    {/* Manual Analysis Button */}
                    {description.length > 20 && !isAnalyzing && (
                      <button
                        onClick={() => analyzeDescription(description)}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        🤖 Analyze
                      </button>
                    )}
                  </div>
                </div>

                {/* Smart Analysis Results */}
                {analysisResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <FiZap className="text-blue-600" />
                      <h3 className="font-bold text-gray-900 dark:text-white">Smart Analysis Results</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-700 dark:text-gray-300">Detected Entities</div>
                        <div className="text-blue-600 dark:text-blue-400">{analysisResults.detectedEntities.join(', ') || 'None'}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-700 dark:text-gray-300">Complexity</div>
                        <div className="text-purple-600 dark:text-purple-400 capitalize">{analysisResults.complexity}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-700 dark:text-gray-300">Est. Endpoints</div>
                        <div className="text-green-600 dark:text-green-400">{analysisResults.estimatedEndpoints}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-700 dark:text-gray-300">Suggested Auth</div>
                        <div className="text-orange-600 dark:text-orange-400 uppercase">{analysisResults.recommendedAuth}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Examples */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Quick examples:</span>
                  {[
                    "E-commerce API with payments",
                    "Social media platform API",
                    "Task management system",
                    "Blog with comments API"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setDescription(example + " with user authentication and CRUD operations.")}
                      className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Programming Languages Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
                    <FiZap className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Choose Languages</h2>
                    <p className="text-gray-600 dark:text-gray-400">Select one or more programming languages for your API</p>
                  </div>
                </div>

                {/* Smart Language Suggestions */}
                {autoSuggestions?.suggestedLanguages && autoSuggestions.suggestedLanguages.length > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-3">
                      <FiZap className="text-green-600" />
                      <span className="font-medium text-green-700 dark:text-green-300">AI Recommendations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {autoSuggestions.suggestedLanguages.map((langId: string) => {
                        const lang = languages.find(l => l.id === langId)
                        if (!lang) return null
                        return (
                          <button
                            key={langId}
                            onClick={() => handleLanguageToggle(langId)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              selectedLanguages.includes(langId)
                                ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                            }`}
                          >
                            <lang.icon className={`text-sm ${lang.color}`} />
                            {lang.name}
                            {selectedLanguages.includes(langId) ? <FiCheck className="text-sm" /> : '+'}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {languages.map((lang, index) => {
                    const isRecommended = autoSuggestions?.suggestedLanguages?.includes(lang.id)
                    return (
                      <motion.button
                        key={lang.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLanguageToggle(lang.id)}
                        className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 ${
                          selectedLanguages.includes(lang.id)
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg'
                            : isRecommended
                              ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:border-green-400 shadow-md'
                              : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md'
                        }`}
                      >
                        {/* AI Recommendation Badge */}
                        {isRecommended && !selectedLanguages.includes(lang.id) && (
                          <div className="absolute -top-2 -left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            AI
                          </div>
                        )}

                        {/* Selection Indicator */}
                        {selectedLanguages.includes(lang.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <FiCheck className="text-white text-sm" />
                          </motion.div>
                        )}

                        {/* Language Icon */}
                        <div className="relative mb-3">
                          <div className={`absolute inset-0 ${lang.color} opacity-20 rounded-xl blur-lg group-hover:opacity-30 transition-opacity`}></div>
                          <lang.icon className={`relative text-4xl mx-auto ${lang.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>

                        {/* Language Name */}
                        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {lang.name}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Selected Count */}
                {selectedLanguages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400"
                  >
                    <FiCheck className="text-lg" />
                    <span className="font-medium">
                      {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''} selected
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* Configuration Options */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Authentication Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl">
                      <FiShield className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Authentication</h2>
                      <p className="text-gray-600 dark:text-gray-400">Choose security method</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {authOptions.map((option, index) => (
                      <motion.label
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className={`group flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          authType === option.id
                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 shadow-lg'
                            : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="authType"
                          value={option.id}
                          checked={authType === option.id}
                          onChange={(e) => setAuthType(e.target.value as any)}
                          className="sr-only"
                        />

                        {/* Selection Indicator */}
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                          authType === option.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300 dark:border-gray-500 group-hover:border-orange-400'
                        }`}>
                          {authType === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </div>

                        {/* Icon */}
                        <div className={`p-2 rounded-xl mr-3 ${
                          authType === option.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-orange-100 group-hover:text-orange-600'
                        }`}>
                          <option.icon className="text-lg" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {option.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Database Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl">
                      <FiDatabase className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Database</h2>
                      <p className="text-gray-600 dark:text-gray-400">Select data storage</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {databaseOptions.map((option, index) => (
                      <motion.label
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + index * 0.05 }}
                        className={`group flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          database === option.id
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 shadow-lg'
                            : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="database"
                          value={option.id}
                          checked={database === option.id}
                          onChange={(e) => setDatabase(e.target.value as any)}
                          className="sr-only"
                        />

                        {/* Selection Indicator */}
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                          database === option.id
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300 dark:border-gray-500 group-hover:border-purple-400'
                        }`}>
                          {database === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </div>

                        {/* Icon */}
                        <div className={`p-2 rounded-xl mr-3 ${
                          database === option.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 group-hover:text-purple-600'
                        }`}>
                          <option.icon className="text-lg" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {option.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Additional Options Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl">
                    <FiSettings className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Options</h2>
                    <p className="text-gray-600 dark:text-gray-400">Fine-tune your API generation</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Complexity Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Complexity Level
                    </label>
                    <div className="relative">
                      <select
                        value={complexity}
                        onChange={(e) => setComplexity(e.target.value as any)}
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="simple">Simple - Basic CRUD</option>
                        <option value="moderate">Moderate - With validation</option>
                        <option value="complex">Complex - Advanced features</option>
                      </select>
                      <FiSettings className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Include Tests */}
                  <div className="flex items-center justify-center">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 w-full ${
                        includeTests
                          ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30'
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-cyan-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includeTests}
                        onChange={(e) => setIncludeTests(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 mr-3 flex items-center justify-center transition-all ${
                        includeTests
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {includeTests && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <FiCheck className="text-white text-sm" />
                          </motion.div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Include Tests
                      </span>
                    </motion.label>
                  </div>

                  {/* Include Documentation */}
                  <div className="flex items-center justify-center">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 w-full ${
                        includeDocs
                          ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30'
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-cyan-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includeDocs}
                        onChange={(e) => setIncludeDocs(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 mr-3 flex items-center justify-center transition-all ${
                        includeDocs
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {includeDocs && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <FiCheck className="text-white text-sm" />
                          </motion.div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Include Docs
                      </span>
                    </motion.label>
                  </div>
                </div>
              </motion.div>

              {/* Generate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                {/* Productivity Dashboard */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 shadow-xl border border-indigo-200 dark:border-indigo-700 mb-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
                      <FiSettings className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Controls 🤖</h2>
                      <p className="text-gray-600 dark:text-gray-400">Smart features to boost your productivity</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Auto-Configuration */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <FiZap className="text-blue-600 text-lg" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Auto-Config</h3>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={includeTests}
                            onChange={(e) => setIncludeTests(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Auto-generate tests</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={includeDocs}
                            onChange={(e) => setIncludeDocs(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Auto-generate docs</span>
                        </label>
                        <button
                          onClick={() => analyzeDescription(description)}
                          disabled={!description.trim() || isAnalyzing}
                          className="w-full px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
                        >
                          {isAnalyzing ? 'Analyzing...' : '🧠 Smart Analysis'}
                        </button>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <FiDatabase className="text-green-600 text-lg" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Quick Stats</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Languages:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedLanguages.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Auth Type:</span>
                          <span className="font-medium text-gray-900 dark:text-white uppercase">{authType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Database:</span>
                          <span className="font-medium text-gray-900 dark:text-white capitalize">{database}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Complexity:</span>
                          <span className="font-medium text-gray-900 dark:text-white capitalize">{complexity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Time Estimation */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <FiZap className="text-purple-600 text-lg" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Time Saved</h3>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                          {selectedLanguages.length * (complexity === 'simple' ? 2 : complexity === 'moderate' ? 4 : 8)}h
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">Manual development time</div>
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          ⚡ Generated in ~30s
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {Math.round((selectedLanguages.length * (complexity === 'simple' ? 2 : complexity === 'moderate' ? 4 : 8) * 60) / 0.5)}x faster!
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="relative inline-block">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

                  {/* Enhanced Generate Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={generateAPI}
                      disabled={isGenerating || !description.trim() || selectedLanguages.length === 0}
                      className="relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-16 py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {/* Button Content */}
                      <div className="relative flex items-center gap-4">
                        {isGenerating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="p-2 bg-white/20 rounded-full"
                            >
                              <FiLoader className="text-2xl" />
                            </motion.div>
                            <span>Generating Your APIs...</span>
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                  className="w-2 h-2 bg-white rounded-full"
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 15 }}
                              className="p-3 bg-white/20 rounded-full"
                            >
                              <FiZap className="text-2xl" />
                            </motion.div>
                            <span>Generate My API</span>
                            <span className="text-3xl">🚀</span>
                            <motion.div
                              animate={{ x: [0, 8, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <FiArrowRight className="text-2xl" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Helper Text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-gray-600 dark:text-gray-400"
                    >
                      {!description.trim() ? "💡 Add a description to get started" :
                       selectedLanguages.length === 0 ? "🔧 Select at least one programming language" :
                       "✨ Ready to generate your production-ready API!"}
                    </motion.p>
                  </div>
                </div>

                {/* Helper Text */}
                {(!description.trim() || selectedLanguages.length === 0) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-sm text-gray-500 dark:text-gray-400"
                  >
                    {!description.trim() && "Please describe your API first"}
                    {!description.trim() && selectedLanguages.length === 0 && " and "}
                    {selectedLanguages.length === 0 && "select at least one programming language"}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {generatedAPIs.length === 0 ? (
                <div className="text-center py-12">
                  <FiCode className="text-6xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No APIs Generated Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Configure your API settings and click "Generate API" to see the results here.
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* API Selection */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Generated APIs
                    </h3>
                    <div className="space-y-3">
                      {generatedAPIs.map((api, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedAPI(api)
                            setSelectedFile(api.files[0])
                          }}
                          className={`w-full p-4 rounded-lg border text-left transition-all ${
                            selectedAPI === api
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {api.language.charAt(0).toUpperCase() + api.language.slice(1)} API
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {api.framework} • {api.files.length} files
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File Tree and Code Preview */}
                  <div className="lg:col-span-2">
                    {selectedAPI && (
                      <div className="space-y-4">
                        {/* File Tree */}
                        <div>
                          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            Project Files
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {selectedAPI.files.map((file, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedFile(file)}
                                className={`p-2 rounded text-left text-sm transition-all ${
                                  selectedFile === file
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {file.path}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Code Preview */}
                        {selectedFile && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                                {selectedFile.path}
                              </h4>
                              <button
                                onClick={() => copyToClipboard(selectedFile.content)}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <FiCopy className="text-sm" />
                                Copy
                              </button>
                            </div>
                            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                              <CodeMirror
                                value={selectedFile.content}
                                height="400px"
                                extensions={[
                                  selectedFile.path.endsWith('.js') || selectedFile.path.endsWith('.ts')
                                    ? javascript()
                                    : selectedFile.path.endsWith('.py')
                                    ? python()
                                    : javascript()
                                ]}
                                theme="light"
                                editable={false}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Download Tab */}
          {activeTab === 'download' && (
            <motion.div
              key="download"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {generatedAPIs.length === 0 ? (
                <div className="text-center py-12">
                  <FiDownload className="text-6xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No APIs to Download
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Generate some APIs first to download them.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedAPIs.map((api, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FiCode className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {api.language.charAt(0).toUpperCase() + api.language.slice(1)} API
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {api.framework}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCheck className="text-green-500" />
                          {api.files.length} files generated
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCheck className="text-green-500" />
                          Authentication included
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCheck className="text-green-500" />
                          Documentation included
                        </div>
                      </div>

                      <button
                        onClick={() => downloadAPI(api)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        <FiDownload className="text-lg" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default AIAPIGenerator
