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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30">
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
            {/* Main Title Card */}
            <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                    <FiCode className="text-3xl text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI API Generator
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into production-ready APIs with AI. Get complete implementations
                in multiple languages with authentication, database integration, and documentation.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { icon: FiZap, title: "Lightning Fast", desc: "Generate APIs in seconds", color: "from-yellow-400 to-orange-500" },
                { icon: FiShield, title: "Production Ready", desc: "Built-in security & best practices", color: "from-green-400 to-emerald-500" },
                { icon: FiDatabase, title: "Multi-Language", desc: "Support for 9+ programming languages", color: "from-blue-400 to-cyan-500" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 dark:border-gray-700/30"
                >
                  <div className={`inline-flex p-2 rounded-xl bg-gradient-to-r ${feature.color} mb-2`}>
                    <feature.icon className="text-white text-lg" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
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
              {/* API Description Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <FiCode className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Describe Your API</h2>
                    <p className="text-gray-600 dark:text-gray-400">Tell us what you want to build in natural language</p>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Example: I need a REST API for a todo application with user authentication. Users should be able to create, read, update, and delete todos. Each todo has a title, description, due date, and completion status."
                    className="w-full h-40 p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {description.length}/500
                  </div>
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {languages.map((lang, index) => (
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
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md'
                      }`}
                    >
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
                  ))}
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
                <div className="relative inline-block">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

                  {/* Main Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateAPI}
                    disabled={isGenerating || !description.trim() || selectedLanguages.length === 0}
                    className="relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center gap-4">
                      {isGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FiLoader className="text-2xl" />
                          </motion.div>
                          <span>Generating APIs...</span>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-2 bg-white/20 rounded-full"
                          >
                            <FiZap className="text-2xl" />
                          </motion.div>
                          <span>Generate API</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FiArrowRight className="text-xl" />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.button>
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
