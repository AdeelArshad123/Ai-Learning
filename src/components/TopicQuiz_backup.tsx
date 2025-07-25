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
