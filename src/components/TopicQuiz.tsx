'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface QuizQuestion {
  question: string
  options: { [key: string]: string }
  answer: string
  explanation: string
}

const CATEGORY_TOPICS = {
  frontend: [
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Frontend Testing', 'UI/UX', 'Redux', 'SASS', 'Webpack', 'Accessibility', 'Performance',
  ],
  backend: [
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Databases', 'API Design', 'Authentication', 'GraphQL', 'REST APIs', 'Microservices', 'Caching', 'Security',
  ],
};

// Sample quiz data for testing
const SAMPLE_QUIZZES: Record<string, QuizQuestion[]> = {
  'React': [
    {
      question: "What is JSX in React?",
      options: {
        A: "A JavaScript library",
        B: "A syntax extension for JavaScript",
        C: "A CSS framework",
        D: "A database query language"
      },
      answer: "B",
      explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
    },
    {
      question: "Which method is used to render a React component?",
      options: {
        A: "ReactDOM.render()",
        B: "React.render()",
        C: "component.render()",
        D: "render.component()"
      },
      answer: "A",
      explanation: "ReactDOM.render() is used to render React components into the DOM."
    },
    {
      question: "What are props in React?",
      options: {
        A: "Properties passed to components",
        B: "State variables",
        C: "CSS classes",
        D: "Event handlers"
      },
      answer: "A",
      explanation: "Props are properties passed from parent components to child components in React."
    },
    {
      question: "Which hook is used for state management in functional components?",
      options: {
        A: "useEffect",
        B: "useState",
        C: "useContext",
        D: "useReducer"
      },
      answer: "B",
      explanation: "useState is the primary hook for managing state in functional components."
    },
    {
      question: "What is the virtual DOM?",
      options: {
        A: "A real DOM element",
        B: "A JavaScript representation of the DOM",
        C: "A CSS framework",
        D: "A database"
      },
      answer: "B",
      explanation: "The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates."
    }
  ],
  'JavaScript': [
    {
      question: "What is the difference between let and var?",
      options: {
        A: "No difference",
        B: "let has block scope, var has function scope",
        C: "var has block scope, let has function scope",
        D: "Both have global scope"
      },
      answer: "B",
      explanation: "let has block scope while var has function scope, making let safer to use in most cases."
    },
    {
      question: "What does the spread operator (...) do?",
      options: {
        A: "Creates a new array",
        B: "Spreads elements of an iterable",
        C: "Deletes array elements",
        D: "Sorts an array"
      },
      answer: "B",
      explanation: "The spread operator spreads the elements of an iterable (like an array) into individual elements."
    },
    {
      question: "What is destructuring in JavaScript?",
      options: {
        A: "Breaking objects or arrays",
        B: "Extracting values from objects or arrays",
        C: "Creating new objects",
        D: "Deleting properties"
      },
      answer: "B",
      explanation: "Destructuring allows you to extract values from objects or arrays into distinct variables."
    },
    {
      question: "What is a Promise in JavaScript?",
      options: {
        A: "A synchronous operation",
        B: "An object representing eventual completion of an async operation",
        C: "A loop structure",
        D: "A variable type"
      },
      answer: "B",
      explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation."
    },
    {
      question: "What does async/await do?",
      options: {
        A: "Makes code run faster",
        B: "Handles promises in a synchronous-like manner",
        C: "Creates new threads",
        D: "Optimizes memory usage"
      },
      answer: "B",
      explanation: "async/await allows you to write asynchronous code that looks and behaves more like synchronous code."
    }
  ],
  'Node.js': [
    {
      question: "What is Node.js?",
      options: {
        A: "A web browser",
        B: "A JavaScript runtime built on Chrome's V8 engine",
        C: "A database",
        D: "A CSS framework"
      },
      answer: "B",
      explanation: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development."
    },
    {
      question: "Which module is used to create a web server in Node.js?",
      options: {
        A: "fs",
        B: "path",
        C: "http",
        D: "url"
      },
      answer: "C",
      explanation: "The http module is used to create HTTP servers and clients in Node.js."
    },
    {
      question: "What is npm?",
      options: {
        A: "Node Package Manager",
        B: "New Programming Method",
        C: "Network Protocol Manager",
        D: "Node Process Monitor"
      },
      answer: "A",
      explanation: "npm stands for Node Package Manager and is used to manage Node.js packages and dependencies."
    },
    {
      question: "What is the purpose of package.json?",
      options: {
        A: "Store user data",
        B: "Configure project metadata and dependencies",
        C: "Store CSS styles",
        D: "Handle routing"
      },
      answer: "B",
      explanation: "package.json contains metadata about the project and lists its dependencies."
    },
    {
      question: "What is middleware in Express.js?",
      options: {
        A: "Database connection",
        B: "Functions that execute during request-response cycle",
        C: "CSS preprocessor",
        D: "Testing framework"
      },
      answer: "B",
      explanation: "Middleware functions are functions that have access to the request and response objects and can execute code during the request-response cycle."
    }
  ]
};

export default function TopicQuiz({ language, topic }: { language: string; topic: string }) {
  const [category, setCategory] = useState<keyof typeof CATEGORY_TOPICS | ''>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | undefined>(undefined);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate quiz when all parameters are selected
  useEffect(() => {
    if (category && selectedTopic && difficulty && questionCount && quiz.length === 0 && !loading) {
      setLoading(true);
      setError('');
      
      // Simulate loading delay
      setTimeout(() => {
        try {
          // Get quiz from sample data
          const availableQuiz = SAMPLE_QUIZZES[selectedTopic];
          if (availableQuiz && availableQuiz.length > 0) {
            // Shuffle questions and take the requested number
            const shuffledQuiz = [...availableQuiz].sort(() => Math.random() - 0.5);
            const selectedQuestions = shuffledQuiz.slice(0, Math.min(questionCount, shuffledQuiz.length));
            
            setQuiz(selectedQuestions);
            setUserAnswers({});
            setCurrentQuestionIndex(0);
            setShowResults(false);
          } else {
            // If no specific quiz available, create a generic one
            const genericQuiz: QuizQuestion[] = Array.from({ length: questionCount }, (_, i) => ({
              question: `Sample question ${i + 1} for ${selectedTopic}`,
              options: {
                A: "Option A",
                B: "Option B", 
                C: "Option C",
                D: "Option D"
              },
              answer: "A",
              explanation: `This is a sample explanation for ${selectedTopic} question ${i + 1}.`
            }));
            setQuiz(genericQuiz);
            setUserAnswers({});
            setCurrentQuestionIndex(0);
            setShowResults(false);
          }
        } catch (err) {
          console.error('Error generating quiz:', err);
          setError('Failed to generate quiz. Please try again.');
        }
        setLoading(false);
      }, 1000);
    }
  }, [category, selectedTopic, difficulty, questionCount]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Compact Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🧠</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Quiz Generator
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Challenge yourself with intelligent quizzes that adapt to your skill level
        </p>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Quiz Configuration */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">Category</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setCategory('frontend')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  category === 'frontend'
                    ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                    : 'border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <div className="font-semibold">Frontend</div>
                    <div className="text-xs opacity-75">UI/UX, React, Vue</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCategory('backend')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  category === 'backend'
                    ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                    : 'border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <div className="font-semibold">Backend</div>
                    <div className="text-xs opacity-75">APIs, Databases</div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Topic Selection */}
          {category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">Topic</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {(CATEGORY_TOPICS[category as keyof typeof CATEGORY_TOPICS] as string[]).map((topic: string) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all text-center ${
                      selectedTopic === topic
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-200 dark:border-purple-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Difficulty & Questions */}
          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Difficulty */}
              <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">Difficulty</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { level: 'beginner', label: 'Beginner', color: 'green', icon: '🌱' },
                    { level: 'intermediate', label: 'Intermediate', color: 'yellow', icon: '🔥' },
                    { level: 'advanced', label: 'Advanced', color: 'red', icon: '⚡' }
                  ].map((item) => (
                    <button
                      key={item.level}
                      onClick={() => setDifficulty(item.level as 'beginner' | 'intermediate' | 'advanced')}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        difficulty === item.level
                          ? `border-${item.color}-500 bg-${item.color}-500 text-white shadow-md`
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100">Questions</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { count: 5, time: '10 min' },
                    { count: 10, time: '20 min' },
                    { count: 15, time: '30 min' }
                  ].map((item) => (
                    <button
                      key={item.count}
                      onClick={() => setQuestionCount(item.count)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        questionCount === item.count
                          ? 'border-green-500 bg-green-500 text-white shadow-md'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.count} Questions</span>
                        <span className="text-xs opacity-75">~{item.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side - Compact Quiz Summary & Start Button */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 h-fit">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Quiz Summary</h3>

          {/* Compact Summary Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Category</div>
              <div className={`font-semibold truncate ${category ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                {category ? (category === 'frontend' ? 'Frontend' : 'Backend') : 'Not Set'}
              </div>
            </div>

            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Topic</div>
              <div className={`font-semibold truncate ${selectedTopic ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                {selectedTopic || 'Not Set'}
              </div>
            </div>

            <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Difficulty</div>
              <div className={`font-semibold capitalize ${
                difficulty === 'beginner' ? 'text-green-600 dark:text-green-400' :
                difficulty === 'intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                difficulty === 'advanced' ? 'text-red-600 dark:text-red-400' :
                'text-gray-400'
              }`}>
                {difficulty || 'Not Set'}
              </div>
            </div>

            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Questions</div>
              <div className={`font-semibold ${questionCount ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                {questionCount || 'Not Set'}
              </div>
            </div>
          </div>

          {/* Compact Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(((category ? 1 : 0) + (selectedTopic ? 1 : 0) + (difficulty ? 1 : 0) + (questionCount ? 1 : 0)) / 4 * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((category ? 1 : 0) + (selectedTopic ? 1 : 0) + (difficulty ? 1 : 0) + (questionCount ? 1 : 0)) / 4 * 100}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Start Quiz Button */}
          <button
            onClick={() => {
              if (category && selectedTopic && difficulty && questionCount) {
                // Quiz will auto-generate due to useEffect
              }
            }}
            disabled={!category || !selectedTopic || !difficulty || !questionCount || loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              category && selectedTopic && difficulty && questionCount && !loading
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Generating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span className="text-sm">Start AI Quiz</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Quiz Questions Section */}
      {quiz.length > 0 && !showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedTopic} Quiz
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {quiz[currentQuestionIndex]?.question}
              </h3>

              <div className="space-y-3">
                {quiz[currentQuestionIndex]?.options && Object.entries(quiz[currentQuestionIndex].options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setUserAnswers(prev => ({
                        ...prev,
                        [currentQuestionIndex]: key
                      }))
                    }}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      userAnswers[currentQuestionIndex] === key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                    }`}
                  >
                    <span className="font-medium">{key}.</span> {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>

              {currentQuestionIndex === quiz.length - 1 ? (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(userAnswers).length !== quiz.length}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.length - 1, prev + 1))}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quiz Results Section */}
      {showResults && quiz.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete! 🎉</h2>

            {/* Score Display */}
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)]?.answer === ans).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-2xl text-gray-400">/</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-600 dark:text-gray-400">
                  {quiz.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              <div className="text-center ml-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round((Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)]?.answer === ans).length / quiz.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Review Your Answers</h3>
            {quiz.map((question, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    userAnswers[idx] === question.answer ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {userAnswers[idx] === question.answer ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Q{idx + 1}: {question.question}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Your answer: </span>
                        <span className={userAnswers[idx] === question.answer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {userAnswers[idx] ? `${userAnswers[idx]}. ${question.options[userAnswers[idx]]}` : 'No answer'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Correct answer: </span>
                        <span className="text-green-600 dark:text-green-400">
                          {question.answer}. {question.options[question.answer]}
                        </span>
                      </div>
                      {question.explanation && (
                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                          <span className="font-medium text-blue-900 dark:text-blue-100">Explanation: </span>
                          <span className="text-blue-800 dark:text-blue-200">{question.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setQuiz([])
                setUserAnswers({})
                setCurrentQuestionIndex(0)
                setShowResults(false)
                setCategory('')
                setSelectedTopic('')
                setDifficulty(undefined as any)
                setQuestionCount(null)
              }}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => {
                setQuiz([])
                setUserAnswers({})
                setCurrentQuestionIndex(0)
                setShowResults(false)
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Retake This Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
