'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiPlay, FiCheck, FiX, FiHelpCircle, FiClock, FiTarget, FiAward, FiRefreshCw, FiEye, FiEyeOff, FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { useNotifications } from './NotificationProvider'

interface CodingChallenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: string
  category: string
  starterCode: string
  testCases: TestCase[]
  hints: string[]
  timeLimit?: number
  memoryLimit?: number
  tags: string[]
}

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isHidden: boolean
  description?: string
}

interface TestResult {
  testCaseId: string
  passed: boolean
  input: string
  expected: string
  actual: string
  description?: string
  isHidden: boolean
  error?: string
}

interface SubmissionResult {
  allPassed: boolean
  results: TestResult[]
  totalTests: number
  passedTests: number
  solution?: string
  explanation?: string
}

export default function CodingChallenges() {
  const [challenges, setChallenges] = useState<CodingChallenge[]>([])
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null)
  const [userCode, setUserCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [usedHints, setUsedHints] = useState<number[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [difficulty, setDifficulty] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')
  const [showSolution, setShowSolution] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const { showSuccess, showError, showInfo } = useNotifications()

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  // Load completed challenges from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('completedChallenges')
    if (completed) {
      setCompletedChallenges(JSON.parse(completed))
    }
  }, [])

  // Fetch challenges on component mount
  useEffect(() => {
    fetchChallenges()
  }, [difficulty, category])

  const fetchChallenges = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (difficulty !== 'all') params.append('difficulty', difficulty)
      if (category !== 'all') params.append('category', category)

      const response = await fetch(`/api/coding-challenges?${params}`)
      const data = await response.json()

      if (data.success) {
        setChallenges(data.data)
      } else {
        showError('Error', 'Failed to load coding challenges')
      }
    } catch (error) {
      showError('Error', 'Failed to load coding challenges')
    } finally {
      setLoading(false)
    }
  }

  const selectChallenge = (challenge: CodingChallenge) => {
    setSelectedChallenge(challenge)
    setUserCode(challenge.starterCode)
    setSubmissionResult(null)
    setOutput('')
    setShowHints(false)
    setUsedHints([])
    setCurrentHintIndex(0)
    setTimeElapsed(0)
    setTimerActive(true)
    setShowSolution(false)
  }

  const runCode = async () => {
    if (!selectedChallenge || !userCode.trim()) return

    setRunning(true)
    setOutput('')

    try {
      const response = await fetch('/api/coding-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          userCode,
          action: 'run'
        })
      })

      const data = await response.json()
      if (data.success) {
        setOutput(data.data.output)
      } else {
        setOutput(`Error: ${data.error}`)
      }
    } catch (error) {
      setOutput('Error: Failed to run code')
    } finally {
      setRunning(false)
    }
  }

  const submitCode = async () => {
    if (!selectedChallenge || !userCode.trim()) return

    setSubmitting(true)
    setSubmissionResult(null)

    try {
      const response = await fetch('/api/coding-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          userCode,
          action: 'submit'
        })
      })

      const data = await response.json()
      if (data.success) {
        setSubmissionResult(data.data)
        setTimerActive(false)

        if (data.data.allPassed) {
          showSuccess('Challenge Completed!', `All ${data.data.totalTests} test cases passed!`)
          
          // Mark challenge as completed
          const newCompleted = [...completedChallenges, selectedChallenge.id]
          setCompletedChallenges(newCompleted)
          localStorage.setItem('completedChallenges', JSON.stringify(newCompleted))
        } else {
          showInfo('Some Tests Failed', `${data.data.passedTests}/${data.data.totalTests} test cases passed`)
        }
      } else {
        showError('Submission Error', data.error)
      }
    } catch (error) {
      showError('Error', 'Failed to submit code')
    } finally {
      setSubmitting(false)
    }
  }

  const resetChallenge = () => {
    if (selectedChallenge) {
      setUserCode(selectedChallenge.starterCode)
      setSubmissionResult(null)
      setOutput('')
      setShowHints(false)
      setUsedHints([])
      setCurrentHintIndex(0)
      setTimeElapsed(0)
      setTimerActive(true)
      setShowSolution(false)
    }
  }

  const useHint = () => {
    if (selectedChallenge && currentHintIndex < selectedChallenge.hints.length) {
      setUsedHints(prev => [...prev, currentHintIndex])
      setCurrentHintIndex(prev => prev + 1)
      setShowHints(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const categories = ['all', 'Arrays', 'Strings', 'Stack', 'Dynamic Programming', 'Search Algorithms']
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  if (!selectedChallenge) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Interactive Coding Challenges
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice your programming skills with interactive coding challenges. Write code, run tests, and get instant feedback.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => selectChallenge(challenge)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  {completedChallenges.includes(challenge.id) && (
                    <FiCheck className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {challenge.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {challenge.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <FiCode className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {challenge.language}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {challenges.length === 0 && !loading && (
          <div className="text-center py-12">
            <FiCode className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No challenges found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more challenges.</p>
          </div>
        )}
      </div>
    )
  }

  // Challenge solving interface
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedChallenge(null)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Back to Challenges
        </button>
        
        <div className="flex items-center gap-4">
          {timerActive && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiClock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          )}
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
            {selectedChallenge.difficulty}
          </span>
        </div>
      </div>

      {/* Challenge content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Problem description */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedChallenge.title}
            </h1>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {selectedChallenge.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedChallenge.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Test cases preview */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Example Test Cases
              </h3>
              {selectedChallenge.testCases
                .filter(tc => !tc.isHidden)
                .slice(0, 2)
                .map((testCase, index) => (
                  <div key={testCase.id} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Example {index + 1}:
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-gray-600 dark:text-gray-400">
                        Input: <span className="text-gray-900 dark:text-white">{testCase.input}</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Output: <span className="text-gray-900 dark:text-white">{testCase.expectedOutput}</span>
                      </div>
                    </div>
                    {testCase.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {testCase.description}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Hints section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Hints ({usedHints.length}/{selectedChallenge.hints.length})
              </h3>
              <button
                onClick={useHint}
                disabled={currentHintIndex >= selectedChallenge.hints.length}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Get Hint
              </button>
            </div>
            
            {usedHints.length > 0 ? (
              <div className="space-y-3">
                {usedHints.map((hintIndex) => (
                  <div key={hintIndex} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      💡 Hint {hintIndex + 1}: {selectedChallenge.hints[hintIndex]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Click "Get Hint" if you need help solving this challenge.
              </p>
            )}
          </div>
        </div>

        {/* Right side - Code editor and results */}
        <div className="space-y-6">
          {/* Code editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiCode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedChallenge.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runCode}
                  disabled={running}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {running ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiPlay className="w-4 h-4" />}
                  {running ? 'Running...' : 'Run'}
                </button>
                <button
                  onClick={submitCode}
                  disabled={submitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {submitting ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiTarget className="w-4 h-4" />}
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  onClick={resetChallenge}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <CodeMirror
                value={userCode}
                height="400px"
                extensions={[javascript()]}
                onChange={(value) => setUserCode(value)}
                theme={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  foldGutter: true,
                  drawSelection: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                }}
                className="rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Output section */}
          {output && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Output</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}

          {/* Test results */}
          {submissionResult && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Test Results
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  submissionResult.allPassed 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {submissionResult.passedTests}/{submissionResult.totalTests} Passed
                </div>
              </div>

              <div className="space-y-3">
                {submissionResult.results.map((result, index) => (
                  <div
                    key={result.testCaseId}
                    className={`p-4 rounded-lg border ${
                      result.passed
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <FiCheck className="w-4 h-4 text-green-600" />
                      ) : (
                        <FiX className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium text-sm">
                        Test Case {index + 1} {result.isHidden ? '(Hidden)' : ''}
                      </span>
                    </div>
                    
                    {!result.isHidden && (
                      <div className="text-sm font-mono space-y-1">
                        <div>Input: {result.input}</div>
                        <div>Expected: {result.expected}</div>
                        <div>Actual: {result.actual}</div>
                      </div>
                    )}
                    
                    {result.description && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        {result.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {submissionResult.allPassed && submissionResult.solution && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                      🎉 Challenge Completed! Here's the optimal solution:
                    </h4>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      {showSolution ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {showSolution && (
                    <>
                      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm font-mono text-gray-800 dark:text-gray-200 mb-3 overflow-x-auto">
                        {submissionResult.solution}
                      </pre>
                      {submissionResult.explanation && (
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {submissionResult.explanation}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
