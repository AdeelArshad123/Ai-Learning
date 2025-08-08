'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCode, 
  FaShieldAlt, 
  FaRocket, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle,
  FaCopy,
  FaPlay,
  FaDownload,
  FaEye,
  FaBug,
  FaLightbulb,
  FaChartLine
} from 'react-icons/fa'
import { AnalysisType } from '../../types/ai-automation'

interface CodeIssue {
  type: AnalysisType
  severity: 'low' | 'medium' | 'high'
  line: number
  message: string
  suggestion?: string
}

interface CodeMetrics {
  complexity: number
  maintainability: number
  testCoverage: number
  performance: number
}

interface CodeAnalysisResult {
  score: number
  issues: CodeIssue[]
  suggestions: string[]
  metrics: CodeMetrics
  securityScore: number
  performanceScore: number
}

interface SmartCodeReviewerProps {
  className?: string
}

export default function SmartCodeReviewer({ className = '' }: SmartCodeReviewerProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResult | null>(null)
  const [selectedAnalysisTypes, setSelectedAnalysisTypes] = useState<AnalysisType[]>([
    AnalysisType.QUALITY,
    AnalysisType.SECURITY,
    AnalysisType.PERFORMANCE
  ])
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(false)

  const analyzeCode = useCallback(async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: CodeAnalysisResult = {
        score: 85,
        issues: [
          {
            type: AnalysisType.PERFORMANCE,
            severity: 'medium',
            line: 12,
            message: 'Consider using memoization for expensive calculations',
            suggestion: 'Use React.useMemo() or React.useCallback() to optimize performance'
          },
          {
            type: AnalysisType.SECURITY,
            severity: 'high',
            line: 8,
            message: 'Potential XSS vulnerability in user input handling',
            suggestion: 'Sanitize user input before rendering'
          },
          {
            type: AnalysisType.QUALITY,
            severity: 'low',
            line: 5,
            message: 'Variable name could be more descriptive',
            suggestion: 'Rename "data" to something more specific like "userData"'
          }
        ],
        suggestions: [
          'Add input validation for all user inputs',
          'Implement error boundaries for better error handling',
          'Consider using TypeScript for better type safety',
          'Add unit tests for critical functions'
        ],
        metrics: {
          complexity: 6.2,
          maintainability: 78,
          testCoverage: 65,
          performance: 82
        },
        securityScore: 75,
        performanceScore: 88
      }
      
      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
    }, 2000)
  }, [code, selectedAnalysisTypes])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/30'
    if (score >= 80) return 'bg-blue-100 dark:bg-blue-900/30'
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/30'
    if (score >= 60) return 'bg-orange-100 dark:bg-orange-900/30'
    return 'bg-red-100 dark:bg-red-900/30'
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <FaTimesCircle className="text-red-500" />
      case 'medium': return <FaExclamationTriangle className="text-yellow-500" />
      case 'low': return <FaCheckCircle className="text-blue-500" />
      default: return <FaCheckCircle className="text-gray-500" />
    }
  }

  const toggleAnalysisType = (type: AnalysisType) => {
    setSelectedAnalysisTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <FaCode className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Code Reviewer</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered code analysis and optimization</p>
        </div>
      </div>

      {/* Analysis Type Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Analysis Types</h4>
        <div className="flex flex-wrap gap-2">
          {Object.values(AnalysisType).map((type) => (
            <button
              key={type}
              onClick={() => toggleAnalysisType(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedAnalysisTypes.includes(type)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Input */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Code Input</h4>
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={realTimeAnalysis}
                  onChange={(e) => setRealTimeAnalysis(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-400">Real-time</span>
              </label>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here for AI analysis..."
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={analyzeCode}
              disabled={!code.trim() || isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FaPlay className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </button>
            
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy code"
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Analysis Results</h4>
          
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Analyzing your code...</p>
              </div>
            </div>
          ) : analysisResult ? (
            <div className="space-y-4">
              {/* Overall Score */}
              <div className={`p-4 rounded-xl ${getScoreBgColor(analysisResult.score)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Overall Score</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Code quality assessment</p>
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(analysisResult.score)}`}>
                    {analysisResult.score}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FaShieldAlt className="text-blue-500 w-4 h-4" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Security</span>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(analysisResult.securityScore)}`}>
                    {analysisResult.securityScore}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FaRocket className="text-green-500 w-4 h-4" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Performance</span>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(analysisResult.performanceScore)}`}>
                    {analysisResult.performanceScore}
                  </div>
                </div>
              </div>

              {/* Issues */}
              {analysisResult.issues.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FaBug className="text-red-500 w-4 h-4" />
                    Issues Found ({analysisResult.issues.length})
                  </h5>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {analysisResult.issues.map((issue, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-start gap-2">
                          {getSeverityIcon(issue.severity)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Line {issue.line}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                issue.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              }`}>
                                {issue.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {issue.message}
                            </p>
                            {issue.suggestion && (
                              <p className="text-xs text-blue-600 dark:text-blue-400">
                                💡 {issue.suggestion}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysisResult.suggestions.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-500 w-4 h-4" />
                    AI Suggestions
                  </h5>
                  <div className="space-y-2">
                    {analysisResult.suggestions.slice(0, 3).map((suggestion, index) => (
                      <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          • {suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="text-center">
                <FaEye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Paste code and click analyze to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}