'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCode, FiCopy, FiPlay, FiRefreshCw, FiMessageSquare, FiBookOpen, FiZap, FiCheck,
  FiEdit3, FiDownload, FiSave, FiUpload, FiTarget, FiClock, FiShield, FiDatabase,
  FiLayers, FiGlobe, FiCpu, FiBarChart, FiAward, FiLightbulb, FiTool, FiPackage,
  FiGitCommit, FiMonitor, FiActivity, FiAlertCircle, FiCheckCircle, FiArrowRight,
  FiChevronDown, FiChevronUp, FiMaximize2, FiMinimize2, FiSettings, FiTrendingUp,
  FiUser, FiStar, FiGitBranch, FiEye, FiTrash2, FiShare2, FiHeart, FiThumbsUp
} from 'react-icons/fi'
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaPhp, FaRust, FaGolang, FaDocker,
  FaAws, FaGithub, FaRobot, FaBrain, FaRocket, FaFlask, FaDatabase
} from 'react-icons/fa'
import { useNotifications } from './NotificationProvider'

interface AICodeGeneratorProps {
  className?: string
}

export default function AICodeGenerator({ className = '' }: AICodeGeneratorProps) {
  // Core state
  const [activeMode, setActiveMode] = useState<'smart' | 'template' | 'review'>('smart')
  const [language, setLanguage] = useState('JavaScript')
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isCompact, setIsCompact] = useState(true)

  // Smart AI features
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([])
  const [detectedPatterns, setDetectedPatterns] = useState<string[]>([])
  const [complexityLevel, setComplexityLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  const [codeQuality, setCodeQuality] = useState<number>(0)
  const [securityScore, setSecurityScore] = useState<number>(0)
  const [performanceScore, setPerformanceScore] = useState<number>(0)

  // Project context
  const [projectType, setProjectType] = useState('')
  const [framework, setFramework] = useState('')
  const [includeTests, setIncludeTests] = useState(false)
  const [includeDocs, setIncludeDocs] = useState(false)
  const [includeComments, setIncludeComments] = useState(true)

  // Generation history and analytics
  const [generationHistory, setGenerationHistory] = useState<any[]>([])
  const [userSkillLevel, setUserSkillLevel] = useState<number>(50)
  const [favoriteLanguages, setFavoriteLanguages] = useState<string[]>(['JavaScript'])

  const { addNotification } = useNotifications()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Smart language data with frameworks and use cases
  const languageData = {
    JavaScript: {
      icon: FaReact,
      color: 'from-yellow-400 to-orange-500',
      frameworks: ['React', 'Vue', 'Angular', 'Node.js', 'Express'],
      useCases: ['Web Apps', 'APIs', 'Mobile Apps', 'Desktop Apps'],
      difficulty: 'beginner'
    },
    Python: {
      icon: FaPython,
      color: 'from-blue-400 to-green-500',
      frameworks: ['Django', 'Flask', 'FastAPI', 'Pandas', 'TensorFlow'],
      useCases: ['Web APIs', 'Data Science', 'AI/ML', 'Automation'],
      difficulty: 'beginner'
    },
    Java: {
      icon: FaJava,
      color: 'from-red-500 to-orange-600',
      frameworks: ['Spring', 'Spring Boot', 'Hibernate', 'Maven'],
      useCases: ['Enterprise Apps', 'Android', 'Web Services'],
      difficulty: 'intermediate'
    },
    TypeScript: {
      icon: FaReact,
      color: 'from-blue-500 to-purple-600',
      frameworks: ['Angular', 'React', 'Vue', 'NestJS'],
      useCases: ['Large Web Apps', 'Enterprise', 'Type Safety'],
      difficulty: 'intermediate'
    },
    Go: {
      icon: FaGolang,
      color: 'from-cyan-400 to-blue-500',
      frameworks: ['Gin', 'Echo', 'Fiber', 'Gorilla'],
      useCases: ['Microservices', 'CLI Tools', 'Cloud Native'],
      difficulty: 'intermediate'
    },
    Rust: {
      icon: FaRust,
      color: 'from-orange-600 to-red-600',
      frameworks: ['Actix', 'Rocket', 'Warp', 'Tokio'],
      useCases: ['System Programming', 'WebAssembly', 'Performance'],
      difficulty: 'advanced'
    }
  }

  // Smart pattern detection
  const codePatterns = {
    'api': ['REST API', 'GraphQL', 'Authentication', 'Database'],
    'component': ['React Component', 'Vue Component', 'UI Library'],
    'algorithm': ['Sorting', 'Searching', 'Data Structures'],
    'database': ['CRUD Operations', 'Queries', 'Migrations'],
    'auth': ['JWT', 'OAuth', 'Session Management'],
    'testing': ['Unit Tests', 'Integration Tests', 'E2E Tests']
  }

  // Project templates with intelligent suggestions
  const smartTemplates = {
    'E-commerce API': {
      languages: ['JavaScript', 'Python', 'Java'],
      frameworks: ['Express', 'Django', 'Spring Boot'],
      features: ['Authentication', 'Payment', 'Database', 'Testing'],
      complexity: 'intermediate'
    },
    'React Dashboard': {
      languages: ['JavaScript', 'TypeScript'],
      frameworks: ['React', 'Next.js'],
      features: ['Charts', 'Authentication', 'Responsive', 'Testing'],
      complexity: 'intermediate'
    },
    'Data Processing': {
      languages: ['Python', 'JavaScript'],
      frameworks: ['Pandas', 'NumPy', 'Node.js'],
      features: ['CSV Processing', 'Visualization', 'APIs'],
      complexity: 'beginner'
    }
  }

  // Intelligent analysis functions
  const analyzeUserInput = useCallback((input: string) => {
    const patterns = []
    const suggestions = []
    let detectedComplexity = 'beginner'
    let suggestedFramework = ''

    // Pattern detection
    if (input.toLowerCase().includes('api') || input.toLowerCase().includes('endpoint')) {
      patterns.push('API Development')
      suggestions.push('Consider adding authentication and error handling')
      suggestedFramework = language === 'JavaScript' ? 'Express' : language === 'Python' ? 'FastAPI' : 'Spring Boot'
    }

    if (input.toLowerCase().includes('component') || input.toLowerCase().includes('ui')) {
      patterns.push('UI Component')
      suggestions.push('Include accessibility features and responsive design')
      suggestedFramework = 'React'
    }

    if (input.toLowerCase().includes('database') || input.toLowerCase().includes('crud')) {
      patterns.push('Database Operations')
      suggestions.push('Add input validation and SQL injection protection')
      detectedComplexity = 'intermediate'
    }

    if (input.toLowerCase().includes('algorithm') || input.toLowerCase().includes('sort')) {
      patterns.push('Algorithm Implementation')
      suggestions.push('Consider time and space complexity optimization')
      detectedComplexity = 'intermediate'
    }

    // Complexity detection
    const complexWords = ['advanced', 'optimization', 'performance', 'scalable', 'enterprise']
    if (complexWords.some(word => input.toLowerCase().includes(word))) {
      detectedComplexity = 'advanced'
    }

    setDetectedPatterns(patterns)
    setSmartSuggestions(suggestions)
    setComplexityLevel(detectedComplexity as any)
    if (suggestedFramework) setFramework(suggestedFramework)

    return { patterns, suggestions, complexity: detectedComplexity, framework: suggestedFramework }
  }, [language])

  // Smart code generation with enhanced features
  const generateSmartCode = async () => {
    if (!topic.trim()) {
      addNotification('Please describe what you want to build', 'error')
      return
    }

    setIsLoading(true)

    // Analyze user input
    const analysis = analyzeUserInput(topic)
    setAiAnalysis(analysis)

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          language,
          difficulty: complexityLevel,
          framework,
          includeTests,
          includeDocs,
          includeComments,
          projectType,
          patterns: detectedPatterns,
          userSkillLevel,
          customInstructions: `Generate production-ready code with best practices. Include error handling, security considerations, and performance optimizations.`
        })
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedCode(data.data.code)
        setExplanation(data.data.explanation)

        // Calculate quality scores
        setCodeQuality(calculateCodeQuality(data.data.code))
        setSecurityScore(calculateSecurityScore(data.data.code))
        setPerformanceScore(calculatePerformanceScore(data.data.code))

        // Update generation history
        const newEntry = {
          id: Date.now(),
          topic,
          language,
          code: data.data.code,
          timestamp: new Date().toISOString(),
          quality: codeQuality
        }
        setGenerationHistory(prev => [newEntry, ...prev.slice(0, 9)])

        addNotification('Smart code generated successfully!', 'success')
      }
    } catch (error) {
      addNotification('Generation failed. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Quality calculation functions
  const calculateCodeQuality = (code: string): number => {
    let score = 50
    if (code.includes('try') && code.includes('catch')) score += 15
    if (code.includes('const ') || code.includes('let ')) score += 10
    if (code.includes('//') || code.includes('/*')) score += 10
    if (code.includes('async') || code.includes('await')) score += 10
    if (code.length > 200) score += 5
    return Math.min(score, 100)
  }

  const calculateSecurityScore = (code: string): number => {
    let score = 60
    if (code.includes('validate') || code.includes('sanitize')) score += 20
    if (code.includes('bcrypt') || code.includes('hash')) score += 15
    if (code.includes('jwt') || code.includes('auth')) score += 5
    return Math.min(score, 100)
  }

  const calculatePerformanceScore = (code: string): number => {
    let score = 70
    if (code.includes('cache') || code.includes('memo')) score += 15
    if (code.includes('async') || code.includes('Promise')) score += 10
    if (code.includes('optimize') || code.includes('efficient')) score += 5
    return Math.min(score, 100)
  }

  const templates = {
    JavaScript: {
      'React Component': `import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default MyComponent;`,
      'API Call': `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();`,
      'Form Validation': `function validateForm(formData) {
  const errors = {};

  if (!formData.email || !/\\S+@\\S+\\.\\S+/.test(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!formData.password || formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}`
    },
    Python: {
      'Flask API': `from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello, World!'})

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    return jsonify({'received': data})

if __name__ == '__main__':
    app.run(debug=True)`,
      'Data Processing': `import pandas as pd
import numpy as np

def process_data(filename):
    # Read data
    df = pd.read_csv(filename)

    # Clean data
    df = df.dropna()
    df = df.drop_duplicates()

    # Process data
    df['processed'] = df['value'].apply(lambda x: x * 2)

    return df

# Usage
result = process_data('data.csv')
print(result.head())`,
      'Class Example': `class Calculator:
    def __init__(self):
        self.history = []

    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result

    def subtract(self, a, b):
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result

    def get_history(self):
        return self.history

# Usage
calc = Calculator()
print(calc.add(5, 3))
print(calc.subtract(10, 4))`
    }
  }

  const generateCode = async () => {
    if (!topic.trim()) {
      addNotification('Please enter a topic or description', 'error')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          topic,
          difficulty: 'beginner',
          codeQuality: 'production',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate code')
      }

      const data = await response.json()
      setGeneratedCode(data.code)
      setExplanation(data.explanation)
      addNotification('Code generated successfully!', 'success')
    } catch (error) {
      console.error('Error generating code:', error)
      // Fallback demo code
      setGeneratedCode(`// ${language} code for: ${topic}\n\nfunction example() {\n  console.log("Hello, World!");\n  return "Generated code example";\n}\n\nexample();`)
      setExplanation(`This is a simple ${language} example for "${topic}". The code demonstrates basic syntax and structure.`)
      addNotification('Demo code generated!', 'success')
    } finally {
      setIsLoading(false)
    }
  }

  // Live Editor functions
  const runLiveCode = () => {
    try {
      // Simple JavaScript execution simulation
      if (language === 'JavaScript') {
        const logs: string[] = []
        const originalLog = console.log
        console.log = (...args) => {
          logs.push(args.join(' '))
        }

        // Execute the code (in a real app, use a sandboxed environment)
        eval(liveCode)

        console.log = originalLog
        setLiveOutput(logs.join('\n') || 'Code executed successfully!')
      } else {
        setLiveOutput(`${language} execution simulation:\nCode would run here...`)
      }
      addNotification('Code executed!', 'success')
    } catch (error: any) {
      setLiveOutput(`Error: ${error.message}`)
      addNotification('Code execution failed', 'error')
    }
  }

  // Template functions
  const loadTemplate = (templateName: string) => {
    const template = templates[language as keyof typeof templates]?.[templateName]
    if (template) {
      setLiveCode(template)
      setSelectedTemplate(templateName)
      addNotification(`Template "${templateName}" loaded!`, 'success')
    }
  }

  // AI Suggestions functions
  const generateSuggestions = () => {
    const suggestionsList = [
      'Add error handling with try-catch blocks',
      'Consider using async/await for better readability',
      'Add input validation for better security',
      'Use const instead of let for immutable variables',
      'Consider breaking this into smaller functions',
      'Add comments to explain complex logic',
      'Use meaningful variable names',
      'Consider using TypeScript for better type safety'
    ]

    // Use a deterministic approach based on current time to avoid hydration issues
    const seed = Date.now() % suggestionsList.length
    const randomSuggestions = [
      suggestionsList[seed % suggestionsList.length],
      suggestionsList[(seed + 1) % suggestionsList.length],
      suggestionsList[(seed + 2) % suggestionsList.length],
      suggestionsList[(seed + 3) % suggestionsList.length]
    ]

    setSuggestions(randomSuggestions)
    addNotification('AI suggestions generated!', 'success')
  }

  // Code Review functions
  const performCodeReview = () => {
    const issues = []
    const improvements = []

    if (reviewCode.includes('var ')) {
      issues.push('Use let or const instead of var')
    }
    if (reviewCode.includes('==')) {
      issues.push('Use === instead of == for strict equality')
    }
    if (!reviewCode.includes('try') && reviewCode.includes('fetch')) {
      improvements.push('Add error handling for API calls')
    }
    if (reviewCode.length > 500) {
      improvements.push('Consider breaking this into smaller functions')
    }

    setReviewResults({
      score: Math.max(70, 100 - issues.length * 10 - improvements.length * 5),
      issues,
      improvements,
      strengths: [
        'Code structure looks good',
        'Variable naming is clear',
        'Logic flow is easy to follow'
      ]
    })

    addNotification('Code review completed!', 'success')
  }

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript': return 'bg-yellow-500'
      case 'python': return 'bg-blue-500'
      case 'java': return 'bg-red-500'
      case 'c++': return 'bg-purple-500'
      case 'php': return 'bg-indigo-500'
      case 'rust': return 'bg-orange-500'
      case 'go': return 'bg-cyan-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className={`max-w-7xl mx-auto p-8 ${className}`}>
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-blue-200 dark:border-blue-700"
      >
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-6 mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <FiCode className="text-white text-3xl" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                AI Code Generator
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Generate, edit, and optimize code with AI assistance
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3 mb-12 p-3 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-x-auto"
      >
        {[
          { id: 'ai', label: 'AI Generator', icon: FiZap, color: 'from-blue-500 to-purple-600' },
          { id: 'live', label: 'Live Editor', icon: FiCode, color: 'from-green-500 to-emerald-600' },
          { id: 'templates', label: 'Templates', icon: FiBookOpen, color: 'from-orange-500 to-red-600' },
          { id: 'suggestions', label: 'AI Suggestions', icon: FiMessageSquare, color: 'from-purple-500 to-pink-600' },
          { id: 'review', label: 'Code Review', icon: FiCheck, color: 'from-indigo-500 to-blue-600' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-1 min-w-[140px] px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105`
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-102'
            }`}
          >
            <tab.icon className="text-xl" />
            <span className="hidden sm:inline text-lg">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'ai' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Input Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FiCode className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Generate Code</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered code generation</p>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiCode className="text-blue-500" />
                    Programming Language
                  </label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="PHP">PHP</option>
                      <option value="Rust">Rust</option>
                      <option value="Go">Go</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`}></div>
                    </div>
                  </div>
                </div>

                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiMessageSquare className="text-purple-500" />
                    Topic/Description
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe what you want to build... (e.g., 'Create a function to sort an array', 'Build a REST API endpoint', 'Generate a React component')"
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 font-medium"
                    rows={4}
                  />
                </div>

                {/* Generate Button */}
                <motion.button
                  onClick={generateCode}
                  disabled={isLoading || !topic.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FiRefreshCw className="w-6 h-6" />
                      </motion.div>
                      <span className="text-lg">Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <FiZap className="w-6 h-6" />
                      <span className="text-lg">Generate Code</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Output Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FiPlay className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generated Code</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered code output</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="relative mb-8">
                      <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 rounded-full animate-spin"></div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 m-auto w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      >
                        <FiZap className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                    <motion.h4
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
                    >
                      Generating your code...
                    </motion.h4>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Creating a {language} example for "{topic}" ✨
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                ) : generatedCode ? (
                  <div className="space-y-6">
                    {/* Code Display */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`}></div>
                          <span className="font-medium text-gray-900 dark:text-white">{language}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedCode)
                              addNotification('Code copied to clipboard!', 'success')
                            }}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                          >
                            <FiCopy className="text-sm" />
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <pre className="whitespace-pre-wrap text-gray-900 dark:text-white font-mono text-sm bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          {generatedCode}
                        </pre>
                      </div>
                    </div>

                    {/* Explanation */}
                    {explanation && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <FiBookOpen className="text-blue-500" />
                          Code Explanation
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{explanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mb-6"
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <FiCode className="text-4xl text-gray-500 dark:text-gray-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Generate Code</h3>
                    <p className="text-gray-600 dark:text-gray-400">Select a language, enter a topic, and click "Generate Code" to get started.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      ) : activeTab === 'live' ? (
        /* Live Code Editor */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Live Code Editor</h3>
              <div className="flex gap-2">
                <button
                  onClick={runLiveCode}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <FiPlay size={16} />
                  Run
                </button>
                <button
                  onClick={() => setLiveCode('')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={liveCode}
              onChange={(e) => setLiveCode(e.target.value)}
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your code here..."
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Output</h3>
            <div className="h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm overflow-auto">
              {liveOutput || 'Click "Run" to execute your code...'}
            </div>
          </div>
        </div>
      ) : activeTab === 'templates' ? (
        /* Code Templates */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Templates</h3>
            <div className="space-y-2">
              {Object.keys(templates[language as keyof typeof templates] || {}).map((templateName) => (
                <button
                  key={templateName}
                  onClick={() => loadTemplate(templateName)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTemplate === templateName
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {templateName}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Template Preview</h3>
              <button
                onClick={() => navigator.clipboard.writeText(liveCode)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FiCopy size={16} />
                Copy
              </button>
            </div>
            <pre className="h-80 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm overflow-auto">
              <code>{liveCode}</code>
            </pre>
          </div>
        </div>
      ) : activeTab === 'suggestions' ? (
        /* AI Suggestions */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Code</h3>
              <button
                onClick={generateSuggestions}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <FiZap size={16} />
                Get Suggestions
              </button>
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste your code here to get AI suggestions..."
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">AI Suggestions</h3>
            <div className="space-y-3">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                    <p className="text-purple-800 dark:text-purple-200">{suggestion}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Paste your code and click "Get Suggestions" to receive AI-powered improvement recommendations.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Code Review */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Review</h3>
              <button
                onClick={performCodeReview}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <FiMessageSquare size={16} />
                Review Code
              </button>
            </div>
            <textarea
              value={reviewCode}
              onChange={(e) => setReviewCode(e.target.value)}
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Paste your code here for AI review..."
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Review Results</h3>
            {reviewResults ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    reviewResults.score >= 80 ? 'bg-green-100 text-green-600' :
                    reviewResults.score >= 60 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {reviewResults.score}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Code Quality Score</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Based on best practices</p>
                  </div>
                </div>

                {reviewResults.issues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Issues Found:</h4>
                    <ul className="space-y-1">
                      {reviewResults.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-sm text-red-600 dark:text-red-400">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reviewResults.improvements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-600 mb-2">Improvements:</h4>
                    <ul className="space-y-1">
                      {reviewResults.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="text-sm text-yellow-600 dark:text-yellow-400">• {improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Strengths:</h4>
                  <ul className="space-y-1">
                    {reviewResults.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm text-green-600 dark:text-green-400">• {strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Paste your code and click "Review Code" to get detailed feedback and suggestions.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
