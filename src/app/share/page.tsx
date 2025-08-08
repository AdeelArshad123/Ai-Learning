'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiCode, FiDownload, FiCopy, FiCheck } from 'react-icons/fi'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { php } from '@codemirror/lang-php'
import { rust } from '@codemirror/lang-rust'

interface SharedCodeData {
  code: string
  language: string
  topic: string
  difficulty: string
  explanation?: string
  keyPoints?: string[]
}

function SharePageContent() {
  const searchParams = useSearchParams()
  const [sharedData, setSharedData] = useState<SharedCodeData | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        setSharedData(decodedData)
      } catch (err) {
        setError('Invalid share link')
      }
    } else {
      setError('No shared data found')
    }
  }, [searchParams])

  const getCodeMirrorExtension = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'typescript':
        return javascript()
      case 'python':
        return python()
      case 'java':
        return java()
      case 'c++':
      case 'cpp':
        return cpp()
      case 'php':
        return php()
      case 'rust':
        return rust()
      default:
        return javascript()
    }
  }

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Java': 'bg-red-500',
      'C++': 'bg-purple-500',
      'C#': 'bg-purple-600',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-500',
      'PHP': 'bg-purple-400',
      'Ruby': 'bg-red-400',
      'Swift': 'bg-orange-400',
      'Kotlin': 'bg-purple-500',
      'Dart': 'bg-blue-400'
    }
    return colors[lang] || 'bg-gray-500'
  }

  const copyToClipboard = async () => {
    if (!sharedData) return

    try {
      await navigator.clipboard.writeText(sharedData.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code')
    }
  }

  const downloadCode = () => {
    if (!sharedData) return

    const content = `// ${sharedData.topic} - ${sharedData.language} (${sharedData.difficulty})
// Shared via CodeLearner

${sharedData.code}

${sharedData.explanation ? `\n// Explanation: ${sharedData.explanation}` : ''}

${sharedData.keyPoints && sharedData.keyPoints.length > 0 ? `\n// Key Points:\n${sharedData.keyPoints.map(point => `// - ${point}`).join('\n')}` : ''}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${sharedData.topic.replace(/\s+/g, '_')}_${sharedData.language}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <FiCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invalid Share Link</h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    )
  }

  if (!sharedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading shared code...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shared Code Example
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {sharedData.topic} in {sharedData.language}
            </p>
          </div>

          {/* Code Display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(sharedData.language)}`}></div>
                <span className="font-medium text-gray-900 dark:text-white">{sharedData.language}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">• {sharedData.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Copy code"
                >
                  {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Download code"
                >
                  <FiDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <CodeMirror
                value={sharedData.code}
                height="400px"
                extensions={[getCodeMirrorExtension(sharedData.language)]}
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
                readOnly={true}
              />
            </div>
          </div>

          {/* Explanation */}
          {sharedData.explanation && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Explanation</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{sharedData.explanation}</p>
            </div>
          )}

          {/* Key Points */}
          {sharedData.keyPoints && sharedData.keyPoints.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Learning Points</h3>
              <ul className="space-y-2">
                {sharedData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Generate Your Own Code
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading shared code...</p>
        </div>
      </div>
    }>
      <SharePageContent />
    </Suspense>
  )
}