'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBrain,
  FaRocket,
  FaCheck,
  FaTimes,
  FaLightbulb,
  FaSpinner,
  FaTrophy,
  FaChartLine,
  FaRedo
} from 'react-icons/fa'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topic: string
}

interface AIQuizGeneratorProps {
  topic: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  questionCount?: number
}

export default function AIQuizGenerator({
  topic,
  difficulty = 'intermediate',
  questionCount = 5
}: AIQuizGeneratorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [score, setScore] = useState(0)

  // AI-generated quiz questions based on topic
  const generateQuizQuestions = async (topic: string, difficulty: string): Promise<QuizQuestion[]> => {
    setIsGenerating(true)
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Pre-generated questions for different topics and difficulties
    const questionBank: Record<string, Record<string, QuizQuestion[]>> = {
      'JavaScript': {
        'beginner': [
          {
            id: '1',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
            correctAnswer: 0,
            explanation: 'In JavaScript, you can declare variables using var, let, or const keywords. "var" is the traditional way, though "let" and "const" are preferred in modern JavaScript.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          },
          {
            id: '2',
            question: 'Which method is used to add an element to the end of an array?',
            options: ['append()', 'push()', 'add()', 'insert()'],
            correctAnswer: 1,
            explanation: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          },
          {
            id: '3',
            question: 'What does "=== " operator do in JavaScript?',
            options: ['Assignment', 'Equality without type checking', 'Strict equality with type checking', 'Not equal'],
            correctAnswer: 2,
            explanation: 'The === operator checks for strict equality, meaning both value and type must be the same. It does not perform type coercion.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          }
        ],
        'intermediate': [
          {
            id: '4',
            question: 'What is a closure in JavaScript?',
            options: [
              'A way to close browser windows',
              'A function that has access to variables in its outer scope',
              'A method to end loops',
              'A type of error handling'
            ],
            correctAnswer: 1,
            explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This is a powerful feature in JavaScript.',
            difficulty: 'intermediate',
            topic: 'JavaScript'
          },
          {
            id: '5',
            question: 'What is the purpose of the "async" keyword?',
            options: [
              'To make functions run faster',
              'To declare a function that returns a Promise',
              'To handle errors',
              'To create loops'
            ],
            correctAnswer: 1,
            explanation: 'The async keyword is used to declare an asynchronous function that returns a Promise. It allows you to use await inside the function.',
            difficulty: 'intermediate',
            topic: 'JavaScript'
          }
        ]
      },
      'React': {
        'beginner': [
          {
            id: '6',
            question: 'What is JSX in React?',
            options: [
              'A JavaScript library',
              'A syntax extension for JavaScript',
              'A CSS framework',
              'A database'
            ],
            correctAnswer: 1,
            explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and easier to write.',
            difficulty: 'beginner',
            topic: 'React'
          },
          {
            id: '7',
            question: 'How do you pass data from parent to child component in React?',
            options: ['Through state', 'Through props', 'Through context', 'Through refs'],
            correctAnswer: 1,
            explanation: 'Props (properties) are used to pass data from parent components to child components in React. They are read-only and help make components reusable.',
            difficulty: 'beginner',
            topic: 'React'
          }
        ],
        'intermediate': [
          {
            id: '8',
            question: 'What is the purpose of useEffect hook?',
            options: [
              'To manage component state',
              'To perform side effects in functional components',
              'To create new components',
              'To handle user input'
            ],
            correctAnswer: 1,
            explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It replaces lifecycle methods from class components.',
            difficulty: 'intermediate',
            topic: 'React'
          }
        ]
      },
      'Python': {
        'beginner': [
          {
            id: '9',
            question: 'Which of the following is the correct way to create a list in Python?',
            options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
            correctAnswer: 1,
            explanation: 'In Python, lists are created using square brackets []. Lists are ordered, mutable collections that can contain different data types.',
            difficulty: 'beginner',
            topic: 'Python'
          },
          {
            id: '10',
            question: 'What is the output of print(type(5.0))?',
            options: ['<class "int">', '<class "float">', '<class "number">', '<class "decimal">'],
            correctAnswer: 1,
            explanation: 'In Python, 5.0 is a floating-point number, so type(5.0) returns <class "float">. The decimal point makes it a float even though the value is a whole number.',
            difficulty: 'beginner',
            topic: 'Python'
          }
        ]
      }
    }

    // Get questions for the topic and difficulty
    const topicQuestions = questionBank[topic]?.[difficulty] || questionBank['JavaScript']['beginner']
    
    // Return requested number of questions (no random shuffling to avoid hydration issues)
    return topicQuestions.slice(0, Math.min(questionCount, topicQuestions.length))
  }

  const startQuiz = async () => {
    const generatedQuestions = await generateQuizQuestions(topic, difficulty)
    setQuestions(generatedQuestions)
    setQuizStarted(true)
    setIsGenerating(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setShowResults(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setScore(0)
    setQuestions([])
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "Outstanding! You're a master! 🏆"
    if (percentage >= 80) return "Excellent work! Keep it up! 🌟"
    if (percentage >= 70) return "Good job! You're on the right track! 👍"
    if (percentage >= 60) return "Not bad! Keep practicing! 📚"
    return "Keep learning! Practice makes perfect! 💪"
  }

  if (!quizStarted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBrain className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Generated Quiz: {topic}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Test your knowledge with AI-generated questions tailored to your skill level
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                📊 {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <span className="text-green-700 dark:text-green-300 font-medium">
                🎯 {questionCount} Questions
              </span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <FaSpinner className="w-5 h-5 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <FaRocket className="w-5 h-5" />
                Start AI Quiz
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTrophy className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Complete!
          </h3>

          <div className={`text-6xl font-black mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {getScoreMessage()}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{score}</div>
                <div className="text-sm text-gray-500">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
                <div className="text-sm text-gray-500">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Score</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <FaRedo className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <FaBrain className="w-4 h-4" />
              New Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300 dark:border-gray-500'
                }`}>
                  {selectedAnswers[currentQuestionIndex] === index && (
                    <FaCheck className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <>
              <FaTrophy className="w-4 h-4" />
              Finish Quiz
            </>
          ) : (
            <>
              Next Question
              <FaRocket className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
