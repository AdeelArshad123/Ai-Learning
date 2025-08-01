'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCopy, FiShare2, FiLink, FiDownload } from 'react-icons/fi'
import { useNotifications } from './NotificationProvider'

interface CodeShareData {
  code: string
  language: string
  topic: string
  difficulty: string
  explanation?: string
  keyPoints?: string[]
}

interface CodeShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareData: CodeShareData | null
}

export default function CodeShareModal({ isOpen, onClose, shareData }: CodeShareModalProps) {
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const { showSuccess, showError } = useNotifications()

  React.useEffect(() => {
    if (shareData && isOpen) {
      const data = encodeURIComponent(JSON.stringify(shareData))
      const url = `${window.location.origin}/share?data=${data}`
      setShareUrl(url)
    }
  }, [shareData, isOpen])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      showSuccess('Copied!', 'Share link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showError('Copy Failed', 'Failed to copy link to clipboard')
    }
  }

  const downloadCode = () => {
    if (!shareData) return

    const content = `// ${shareData.topic} - ${shareData.language} (${shareData.difficulty})
// Generated by CodeLearner

${shareData.code}

${shareData.explanation ? `\n// Explanation: ${shareData.explanation}` : ''}

${shareData.keyPoints && shareData.keyPoints.length > 0 ? `\n// Key Points:\n${shareData.keyPoints.map(point => `// - ${point}`).join('\n')}` : ''}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${shareData.topic.replace(/\s+/g, '_')}_${shareData.language}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showSuccess('Downloaded!', 'Code file downloaded successfully')
  }

  const shareNative = async () => {
    if (!shareData || !navigator.share) return

    try {
      await navigator.share({
        title: `${shareData.language} Code Example`,
        text: `Check out this ${shareData.difficulty}-level ${shareData.language} code for ${shareData.topic}`,
        url: shareUrl
      })
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  if (!isOpen || !shareData) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FiShare2 className="w-5 h-5" />
              Share Code
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Code Preview */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full bg-${shareData.language === 'JavaScript' ? 'yellow' : shareData.language === 'Python' ? 'green' : 'blue'}-500`}></div>
                <span className="font-medium text-gray-900 dark:text-white">{shareData.language}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">• {shareData.difficulty}</span>
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto max-h-32 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{shareData.code.substring(0, 200)}...</pre>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    {copied ? <FiX className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={shareNative}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FiShare2 className="w-4 h-4" />
                    Share via System
                  </button>
                )}
                
                <button
                  onClick={downloadCode}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiDownload className="w-4 h-4" />
                  Download Code
                </button>
              </div>
            </div>

            {/* Share Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">How to share:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Copy the link above and share it with others</li>
                <li>• Use the system share button (if available)</li>
                <li>• Download the code file and share it directly</li>
                <li>• Anyone with the link can view and use your code</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 