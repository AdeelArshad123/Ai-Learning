'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMic,
  FiMicOff,
  FiX,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiSettings,
  FiHelpCircle,
  FiBook,
  FiCode,
  FiAward,
  FiTrendingUp,
  FiUser,
  FiClock,
  FiTarget,
  FiZap,
  FiBrain,
  FiMessageCircle,
  FiCheckCircle
} from 'react-icons/fi'
import { FaRobot, FaMicrophone, FaMicrophoneSlash, FaBrain, FaRegLightbulb } from 'react-icons/fa'

interface VoiceAIAssistantProps {
  isOpen: boolean
  onToggle: () => void
  onVoiceCommand: (command: string) => void
  onVoiceResponse: (response: string) => void
}

interface VoiceCommand {
  id: string
  command: string
  response: string
  timestamp: Date
  type: 'user' | 'ai'
}

export default function VoiceAIAssistant({
  isOpen,
  onToggle,
  onVoiceCommand,
  onVoiceResponse
}: VoiceAIAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [commands, setCommands] = useState<VoiceCommand[]>([])
  const [recognition, setRecognition] = useState<any>(null)
  const [synthesis, setSynthesis] = useState<any>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTopic, setCurrentTopic] = useState('JavaScript')
  const [userLevel, setUserLevel] = useState('Intermediate')
  const [learningGoals, setLearningGoals] = useState(['React', 'Node.js', 'TypeScript'])

  const transcriptRef = useRef<HTMLDivElement>(null)
  const commandsRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = 'en-US'

        recognitionInstance.onstart = () => {
          setIsListening(true)
          setTranscript('Listening...')
        }

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setTranscript(transcript)
          handleVoiceCommand(transcript)
          setIsListening(false)
        }

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          setTranscript('Error: ' + event.error)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
        setVoiceEnabled(true)
      }

      // Speech Synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis)
      }
    }
  }, [])

  // Auto-scroll to bottom of commands
  useEffect(() => {
    if (commandsRef.current) {
      commandsRef.current.scrollTop = commandsRef.current.scrollHeight
    }
  }, [commands])

  const handleVoiceCommand = async (command: string) => {
    const userCommand: VoiceCommand = {
      id: Date.now().toString(),
      command,
      response: '',
      timestamp: new Date(),
      type: 'user'
    }

    setCommands(prev => [...prev, userCommand])
    onVoiceCommand(command)

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    const aiResponse = await processVoiceCommand(command)
    
    const aiCommand: VoiceCommand = {
      id: (Date.now() + 1).toString(),
      command: '',
      response: aiResponse,
      timestamp: new Date(),
      type: 'ai'
    }

    setCommands(prev => [...prev, aiCommand])
    onVoiceResponse(aiResponse)

    // Speak the response
    if (synthesis && !isMuted) {
      speakResponse(aiResponse)
    }
  }

  const processVoiceCommand = async (command: string): Promise<string> => {
    const lowerCommand = command.toLowerCase()

    // Learning-related commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      if (lowerCommand.includes('react') || lowerCommand.includes('hooks')) {
        return "React hooks are functions that allow you to use state and other React features in functional components. The most common hooks are useState for state management and useEffect for side effects."
      }
      if (lowerCommand.includes('javascript') || lowerCommand.includes('js')) {
        return "JavaScript is a programming language that runs in web browsers. It's used for creating interactive websites and web applications."
      }
      if (lowerCommand.includes('typescript')) {
        return "TypeScript is a superset of JavaScript that adds static typing. It helps catch errors during development and provides better tooling support."
      }
      return "I'd be happy to explain that concept. Could you be more specific about what you'd like to learn?"
    }

    // Quiz commands
    if (lowerCommand.includes('quiz') || lowerCommand.includes('test')) {
      if (lowerCommand.includes('javascript')) {
        return "Starting a JavaScript quiz for you. I'll generate 5 questions at your current level."
      }
      if (lowerCommand.includes('react')) {
        return "Creating a React quiz with questions about components, hooks, and state management."
      }
      return "I'll start a quiz for you. What topic would you like to test your knowledge on?"
    }

    // Progress commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      return "You're making excellent progress! You've completed 12 topics, have a 7-day streak, and your average quiz score is 78.5%. Keep up the great work!"
    }

    // Goal commands
    if (lowerCommand.includes('goal') || lowerCommand.includes('target')) {
      return `Your current learning goals are: ${learningGoals.join(', ')}. You're on track to complete them in about 3 weeks at your current pace.`
    }

    // Study session commands
    if (lowerCommand.includes('study') || lowerCommand.includes('learn')) {
      if (lowerCommand.includes('react')) {
        return "Starting a React study session. I'll focus on components, hooks, and state management based on your current level."
      }
      if (lowerCommand.includes('javascript')) {
        return "Beginning a JavaScript study session. I'll cover ES6+ features, async programming, and modern patterns."
      }
      return "I'll start a personalized study session for you. What would you like to focus on today?"
    }

    // Help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      return "I can help you with: explaining programming concepts, starting quizzes, checking your progress, setting learning goals, and creating study sessions. Just ask me anything!"
    }

    // Default response
    return "I heard you say: " + command + ". How can I help you with your learning today?"
  }

  const speakResponse = (text: string) => {
    if (synthesis && !isMuted) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
      }

      synthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognition && voiceEnabled && !isListening) {
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const clearCommands = () => {
    setCommands([])
  }

  const quickCommands = [
    { text: 'Explain React hooks', icon: <FiCode /> },
    { text: 'Start JavaScript quiz', icon: <FiBook /> },
    { text: 'Check my progress', icon: <FiTrendingUp /> },
    { text: 'What can you do?', icon: <FiHelpCircle /> }
  ]

  return (
    <>
      {/* Voice AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onToggle}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <FaRobot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Voice AI Assistant
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {voiceEnabled ? 'Voice recognition ready' : 'Voice not available'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-xl transition-colors ${
                      isMuted
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={onToggle}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex h-[calc(90vh-120px)]">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  {/* Voice Controls */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={!voiceEnabled}
                        className={`p-6 rounded-full transition-all duration-300 ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse shadow-lg'
                            : voiceEnabled
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-110 shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        title={voiceEnabled ? 'Start listening' : 'Voice not available'}
                      >
                        {isListening ? (
                          <FaMicrophoneSlash className="w-8 h-8" />
                        ) : (
                          <FaMicrophone className="w-8 h-8" />
                        )}
                      </button>

                      {isSpeaking && (
                        <button
                          onClick={stopSpeaking}
                          className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                          title="Stop speaking"
                        >
                          <FiPause className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Transcript Display */}
                    <div className="mt-4 text-center">
                      <div
                        ref={transcriptRef}
                        className="min-h-[60px] p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300"
                      >
                        {transcript || 'Say something to get started...'}
                      </div>
                    </div>

                    {/* Quick Commands */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Quick Commands
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {quickCommands.map((cmd, index) => (
                          <button
                            key={index}
                            onClick={() => handleVoiceCommand(cmd.text)}
                            className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm"
                          >
                            {cmd.icon}
                            <span>{cmd.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Conversation History */}
                  <div className="flex-1 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Conversation History
                        </h3>
                        <button
                          onClick={clearCommands}
                          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      
                      <div
                        ref={commandsRef}
                        className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
                      >
                        {commands.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <FaBrain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No conversation yet. Start by saying something!</p>
                          </div>
                        ) : (
                          commands.map((cmd) => (
                            <motion.div
                              key={cmd.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex gap-3 ${
                                cmd.type === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-[80%] p-4 rounded-2xl ${
                                  cmd.type === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  {cmd.type === 'user' ? (
                                    <FiUser className="w-4 h-4" />
                                  ) : (
                                    <FaRobot className="w-4 h-4" />
                                  )}
                                  <span className="text-xs opacity-70">
                                    {cmd.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <p className="text-sm">
                                  {cmd.type === 'user' ? cmd.command : cmd.response}
                                </p>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - User Context */}
                <div className="w-80 bg-gray-50 dark:bg-gray-900 p-6 border-l border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Your Learning Context
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Current Topic */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Topic
                      </h4>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <FiBook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          {currentTopic}
                        </span>
                      </div>
                    </div>

                    {/* Skill Level */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Skill Level
                      </h4>
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <FiTarget className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          {userLevel}
                        </span>
                      </div>
                    </div>

                    {/* Learning Goals */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Learning Goals
                      </h4>
                      <div className="space-y-2">
                        {learningGoals.map((goal, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                            <FiCheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm text-purple-700 dark:text-purple-300">
                              {goal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Voice Tips */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Voice Commands
                      </h4>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <p>• "Explain React hooks"</p>
                        <p>• "Start JavaScript quiz"</p>
                        <p>• "Check my progress"</p>
                        <p>• "What can you do?"</p>
                        <p>• "Study TypeScript"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Voice Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          title="Voice AI Assistant"
        >
          <FaMicrophone className="w-6 h-6" />
        </motion.button>
      )}
    </>
  )
} 