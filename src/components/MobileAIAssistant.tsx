'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaRobot, 
  FaMicrophone, 
  FaKeyboard, 
  FaCamera, 
  FaPaperPlane,
  FaBrain,
  FaLightbulb,
  FaCode,
  FaBookOpen,
  FaVideo,
  FaHeadphones,
  FaGamepad,
  FaTrophy,
  FaFire,
  FaStar
} from 'react-icons/fa'
import { 
  FiX, 
  FiMinimize2, 
  FiMaximize2,
  FiSettings,
  FiHelpCircle,
  FiZap
} from 'react-icons/fi'

interface MobileAIAssistantProps {
  isOpen: boolean
  onToggle: () => void
}

interface AIMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
  codeExample?: string
  resources?: Array<{
    title: string
    type: 'video' | 'article' | 'course' | 'tool'
    url: string
    duration?: string
  }>
}

export default function MobileAIAssistant({ isOpen, onToggle }: MobileAIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'camera'>('text')
  const [isMinimized, setIsMinimized] = useState(false)

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: '1',
        type: 'ai',
        content: "👋 Hi! I'm your AI learning companion. I can help you with coding questions, suggest learning paths, explain concepts, and much more. What would you like to learn today?",
        timestamp: new Date(),
        suggestions: [
          "Explain React hooks",
          "Best way to learn JavaScript?",
          "Help me debug this code",
          "Create a learning plan",
          "Show me coding challenges"
        ]
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): AIMessage => {
    const input = userInput.toLowerCase()
    
    if (input.includes('react') || input.includes('hooks')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "React Hooks are functions that let you use state and other React features in functional components. Here's a simple example:",
        timestamp: new Date(),
        codeExample: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
        suggestions: [
          "Explain useEffect",
          "Custom hooks example",
          "React best practices",
          "State management patterns"
        ],
        resources: [
          {
            title: "React Hooks Documentation",
            type: "article",
            url: "#",
            duration: "15 min read"
          },
          {
            title: "Hooks in Action - Video Tutorial",
            type: "video",
            url: "#",
            duration: "25 min"
          }
        ]
      }
    } else if (input.includes('javascript') || input.includes('js')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "JavaScript is a versatile programming language! Here's a roadmap to master it:",
        timestamp: new Date(),
        suggestions: [
          "JavaScript fundamentals",
          "ES6+ features",
          "Async/await explained",
          "DOM manipulation",
          "JavaScript projects"
        ],
        resources: [
          {
            title: "JavaScript Fundamentals Course",
            type: "course",
            url: "#",
            duration: "8 hours"
          },
          {
            title: "30 JavaScript Projects",
            type: "article",
            url: "#",
            duration: "Project-based"
          }
        ]
      }
    } else if (input.includes('debug') || input.includes('error')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "I'd be happy to help you debug! Here are some common debugging strategies:",
        timestamp: new Date(),
        suggestions: [
          "Console.log debugging",
          "Browser DevTools",
          "Common JavaScript errors",
          "React debugging tips"
        ]
      }
    } else {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "That's a great question! I'm here to help you learn and grow as a developer. Could you provide more details about what you'd like to know?",
        timestamp: new Date(),
        suggestions: [
          "Ask about specific technologies",
          "Request coding examples",
          "Get learning recommendations",
          "Troubleshoot issues"
        ]
      }
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)
      
      recognition.start()
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
            <p className="text-white/80 text-xs">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            {isMinimized ? <FiMaximize2 className="w-4 h-4 text-white" /> : <FiMinimize2 className="w-4 h-4 text-white" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <FiX className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-64 space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Code Example */}
                    {message.codeExample && (
                      <div className="mt-2 p-2 bg-gray-900 rounded-lg overflow-x-auto">
                        <pre className="text-xs text-green-400">
                          <code>{message.codeExample}</code>
                        </pre>
                      </div>
                    )}
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(suggestion)}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Resources */}
                    {message.resources && (
                      <div className="mt-2 space-y-1">
                        {message.resources.slice(0, 2).map((resource, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs bg-white/10 p-2 rounded">
                            {resource.type === 'video' && <FaVideo className="w-3 h-3" />}
                            {resource.type === 'article' && <FaBookOpen className="w-3 h-3" />}
                            {resource.type === 'course' && <FaGamepad className="w-3 h-3" />}
                            <span className="flex-1 truncate">{resource.title}</span>
                            <span className="text-xs opacity-70">{resource.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                  placeholder="Ask me anything..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-xl transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <FaMicrophone className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
