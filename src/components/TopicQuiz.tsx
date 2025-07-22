'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { quizTracker } from '@/utils/quizTracker'
import { quizBank, getQuizFromBank } from '@/utils/quizBank';
import { FiCode, FiCheck, FiX, FiDownload, FiRefreshCw, FiClock, FiAward, FiTrendingUp, FiBookOpen, FiPlay, FiPause, FiSkipForward, FiLogIn } from 'react-icons/fi'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { php } from '@codemirror/lang-php'
import { rust } from '@codemirror/lang-rust'
import ProgressTracker from './ProgressTracker';
import LearningTip from './LearningTip';
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

interface QuizQuestion {
  question: string
  options: { [key: string]: string }
  answer: string
  explanation: string
  codeSnippet?: string
  difficulty?: string
  category?: string
}

interface QuizSettings {
  quizType: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code-completion' | 'matching' | 'scenario'
  questionCount: number
  includeCodeSnippets: boolean
  includePracticalExamples: boolean
  timeLimit?: number
}

const CATEGORY_TOPICS = {
  frontend: [
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Frontend Testing', 'UI/UX', 'Redux', 'SASS', 'Webpack', 'Accessibility', 'Performance',
  ],
  backend: [
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Databases', 'API Design', 'Authentication', 'GraphQL', 'REST APIs', 'Microservices', 'Caching', 'Security',
  ],
};

export default function TopicQuiz({ language, topic }: { language: string; topic: string }) {
  // All hooks at the top, no mounted check
  const [category, setCategory] = useState<keyof typeof CATEGORY_TOPICS | ''>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [idx: number]: string }>({});
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    quizType: 'multiple-choice',
    questionCount: 5,
    includeCodeSnippets: true,
    includePracticalExamples: true,
  });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const { data: session } = useSession();
  // Load quiz history from localStorage on mount
  useEffect(() => {
    const history = localStorage.getItem('quizHistory');
    if (history) setQuizHistory(JSON.parse(history));
  }, []);
  // Save result to localStorage after quiz completion
  useEffect(() => {
    if (showResults && quiz.length > 0) {
      const score = Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length;
      const result = {
        score,
        totalQuestions: quiz.length,
        topic: selectedTopic,
        difficulty,
        timestamp: new Date().toISOString(),
        answers: userAnswers
      };
      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      history.unshift(result);
      localStorage.setItem('quizHistory', JSON.stringify(history.slice(0, 20)));
      setQuizHistory(history.slice(0, 20));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);
  // On mount, check for saved progress
  useEffect(() => {
    const saved = localStorage.getItem('quizProgress');
    if (saved) setResumeAvailable(true);
  }, []);
  // Auto-save progress after each answer
  useEffect(() => {
    if (quiz.length > 0 && Object.keys(userAnswers).length > 0) {
      localStorage.setItem('quizProgress', JSON.stringify({
        quiz,
        userAnswers,
        currentQuestionIndex,
        selectedTopic,
        difficulty,
        questionCount
      }));
    }
  }, [quiz, userAnswers, currentQuestionIndex, selectedTopic, difficulty, questionCount]);
  // Download results as text file
  function handleDownload() {
    if (!quiz.length) return;
    const score = Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length;
    let content = `Quiz Results\nTopic: ${selectedTopic}\nDifficulty: ${difficulty}\nScore: ${score} / ${quiz.length}\n\n`;
    quiz.forEach((q, idx) => {
      content += `Q${idx + 1}: ${q.question}\n`;
      content += `Your answer: ${userAnswers[idx] ? userAnswers[idx] + '. ' + q.options[userAnswers[idx]] : 'No answer'}\n`;
      content += `Correct answer: ${q.answer}. ${q.options[q.answer]}\n`;
      content += `Explanation: ${q.explanation}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_${selectedTopic}_${difficulty}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Step indicator labels and logic
  const stepLabels = [
    'Choose Category',
    'Choose Topic',
    'Number of Questions',
    'Quiz',
  ];
  const getStep = () => {
    if (!category) return 1;
    if (category && !selectedTopic) return 2;
    if (category && selectedTopic && !questionCount) return 3;
    if (category && selectedTopic && questionCount) return 4;
    return 1;
  };
  const step = getStep();

  // Step 1: Select category
  // Step 2: Select topic (from category)
  // Step 3: Select number of questions
  // Step 4: When all selected, auto-generate quiz
  useEffect(() => {
    if (category && selectedTopic && questionCount && quiz.length === 0 && !loading) {
      setLoading(true);
      setError('');
      setQuizSettings(prev => ({ ...prev, questionCount }));
      // Use local quiz bank instead of API
      let questions = getQuizFromBank(selectedTopic, difficulty, questionCount);
      if (questions.length > 0) {
        // Shuffle questions and options
        questions = shuffleArray(questions).map(q => ({
          ...q,
          options: Object.fromEntries(shuffleArray(Object.entries(q.options)))
        }));
        setQuiz(questions);
        setShowResults(false);
        setUserAnswers({});
        setQuizStartTime(Date.now());
        localStorage.setItem('currentQuiz', JSON.stringify(questions));
      } else {
        setError('No questions available for this topic/difficulty.');
      }
      setLoading(false);
    }
  }, [category, selectedTopic, questionCount, difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev <= 1) {
            setIsTimerRunning(false);
            setShowResults(true);
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  // In renderQuestion, add progress bar, timer, and instant feedback
  const renderQuestion = (q: QuizQuestion, idx: number) => (
    <motion.div
      key={idx}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Bar and Timer */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Question {idx + 1} of {quiz.length}</span>
        {quizSettings.timeLimit && (
          <span className="text-xs flex items-center gap-1 text-primary font-bold">
            <FiClock /> {timeRemaining !== null ? `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}` : ''}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{q.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(q.options).map(([key, value]) => (
          <motion.label
            key={key}
            className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors text-sm ${userAnswers[idx] === key ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
            whileTap={{ scale: 0.97 }}
          >
            <input
              type="radio"
              name={`q${idx}`}
              value={key}
              checked={userAnswers[idx] === key}
              onChange={() => {
                setUserAnswers(prev => ({ ...prev, [idx]: key }));
                // Show instant feedback and auto-advance
                if (!showResults) setTimeout(() => setCurrentQuestionIndex(idx + 1), 800);
              }}
              disabled={showResults}
              className="w-3 h-3 text-primary"
            />
            <span>{key}. {value}</span>
            {/* Instant Feedback */}
            {!showResults && userAnswers[idx] === key && (
              <span className={`ml-2 text-xs font-bold ${key === q.answer ? 'text-green-600' : 'text-red-600'}`}>{key === q.answer ? '✔️ Correct' : '❌ Incorrect'}</span>
            )}
          </motion.label>
        ))}
      </div>
      {showResults && (
        <motion.div
          className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-2">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${userAnswers[idx] === q.answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {userAnswers[idx] === q.answer ? '✔️' : '❌'}
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold mb-1 text-sm ${userAnswers[idx] === q.answer ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{userAnswers[idx] === q.answer ? 'Correct!' : `Incorrect. The correct answer is ${q.answer}.`}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  // Shuffle helper
  function shuffleArray<T>(array: T[]): T[] {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Adaptive difficulty suggestion
  const getNextDifficulty = (score: number, total: number) => {
    if (score / total >= 0.8 && difficulty !== 'advanced') {
      return difficulty === 'beginner' ? 'intermediate' : 'advanced';
    } else if (score / total < 0.5 && difficulty !== 'beginner') {
      return difficulty === 'advanced' ? 'intermediate' : 'beginner';
    }
    return difficulty;
  };

  // Main quiz UI with sidebar (always two columns)
  return (
    <div className="w-full">
      {/* Row 1: Main Heading and Description */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl text-center mb-10">
        <h1 className="text-3xl font-extrabold mb-2 text-primary dark:text-white">AI Quiz Generator</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Test your knowledge with AI-generated quizzes for any programming topic.<br/>Get instant feedback and explanations.</p>
      </div>
      {/* Row 2: Main Content Only (no sidebar) */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {stepLabels.map((label, idx) => (
            <div key={label} className={`flex items-center gap-1 ${step === idx + 1 ? 'font-bold text-primary' : 'text-gray-400'}`}> 
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${step === idx + 1 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>{idx + 1}</span>
              <span className="hidden sm:inline text-xs">{label}</span>
              {idx < stepLabels.length - 1 && <span className="w-6 h-0.5 bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>
        {/* Step 1: Select category */}
        {!category && (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">Choose Quiz Category</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setCategory('frontend')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Frontend</button>
              <button onClick={() => setCategory('backend')} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold">Backend</button>
            </div>
          </div>
        )}
        {/* Step 2: Select topic */}
        {category && !selectedTopic && (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">Choose a Topic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-0">
              {(CATEGORY_TOPICS[category as keyof typeof CATEGORY_TOPICS] as string[]).map((t: string) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
            <button onClick={() => setCategory('')} className="mt-6 text-sm text-gray-500 underline">Back</button>
          </div>
        )}
        {/* Add difficulty selection step before number of questions */}
        {category && selectedTopic && !difficulty && (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">Select Difficulty</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDifficulty('beginner')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Beginner</button>
              <button onClick={() => setDifficulty('intermediate')} className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-bold">Intermediate</button>
              <button onClick={() => setDifficulty('advanced')} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold">Advanced</button>
            </div>
            <button onClick={() => setSelectedTopic('')} className="mt-6 text-sm text-gray-500 underline">Back</button>
          </div>
        )}
        {/* Step 3: Select number of questions */}
        {category && selectedTopic && difficulty && !questionCount && (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">How many questions?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setQuestionCount(5)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">5</button>
              <button onClick={() => setQuestionCount(10)} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold">10</button>
            </div>
            <button onClick={() => setDifficulty(undefined as any)} className="mt-6 text-sm text-gray-500 underline">Back</button>
          </div>
        )}
        {/* Show resume option if available */}
        {resumeAvailable && (
          <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6 text-center">
            <p className="mb-2">You have an unfinished quiz. Would you like to resume?</p>
            <button onClick={() => {
              const saved = localStorage.getItem('quizProgress');
              if (saved) {
                const data = JSON.parse(saved);
                setQuiz(data.quiz);
                setUserAnswers(data.userAnswers);
                setCurrentQuestionIndex(data.currentQuestionIndex);
                setSelectedTopic(data.selectedTopic);
                setDifficulty(data.difficulty);
                setQuestionCount(data.questionCount);
                setResumeAvailable(false);
              }
            }} className="px-6 py-2 bg-primary text-white rounded font-bold">Resume Quiz</button>
            <button onClick={() => { localStorage.removeItem('quizProgress'); setResumeAvailable(false); }} className="ml-4 px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold">Start New</button>
          </div>
        )}
        {/* Step 4: Show quiz */}
        {category && selectedTopic && questionCount && (
          <>
            {loading && <div className="flex flex-col items-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div><span>Generating quiz...</span></div>}
            {error && <div className="text-red-700 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg font-medium">{error}</div>}
            {!loading && quiz.length > 0 && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  // Answer checking and scoring logic
                  setShowResults(true);
                }}
                className="space-y-6"
              >
                {/* Questions */}
                {quiz.map((q, idx) => renderQuestion(q, idx))}
                {/* Submit Button */}
                {!showResults && (
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold border-2 border-primary shadow-md"
                    >
                      Submit Quiz
                    </button>
                  </div>
                )}
                {/* Results */}
                {showResults && (
                  <div className="mt-8 text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    {/* Score Display */}
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length} / {quiz.length}
                      </div>
                      <div className="text-lg text-gray-600 dark:text-gray-300">
                        {Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length === quiz.length
                          ? 'Perfect Score! 🎉'
                          : Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length >= quiz.length * 0.8
                          ? 'Great Job! 👍'
                          : 'Keep Learning! 📚'
                        }
                      </div>
                    </div>
                    {/* Review Mode: All Questions & Answers Summary */}
                    <div className="text-left max-w-2xl mx-auto mb-6">
                      <h4 className="text-xl font-bold mb-4 text-primary dark:text-white">Quiz Review</h4>
                      {quiz.map((q, idx) => (
                        <div key={idx} className="mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <div className="font-semibold mb-2">Q{idx + 1}: {q.question}</div>
                          <div className="mb-1">
                            <span className="font-medium">Your answer: </span>
                            <span className={userAnswers[idx] === q.answer ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                              {userAnswers[idx] ? `${userAnswers[idx]}. ${q.options[userAnswers[idx]]}` : 'No answer'}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Correct answer: </span>
                            <span className="text-green-700 font-bold">{q.answer}. {q.options[q.answer]}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">{q.explanation}</div>
                        </div>
                      ))}
                    </div>
                    {/* Action Buttons */}
                    {/* After quiz completion, suggest next difficulty */}
                    <div className="mb-4">
                      {(() => {
                        const score = Object.entries(userAnswers).filter(([idx, ans]) => quiz[Number(idx)].answer === ans).length;
                        const nextDiff = getNextDifficulty(score, quiz.length);
                        if (nextDiff !== difficulty) {
                          return <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold">Try a {nextDiff} quiz next for more challenge!</div>;
                        }
                        return null;
                      })()}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        type="button"
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                        onClick={() => {
                          setQuiz([]);
                          setUserAnswers({});
                          setShowResults(false);
                          setQuestionCount(null);
                          setDifficulty(undefined as any);
                          setSelectedTopic('');
                        }}
                      >
                        Retake Quiz
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                        onClick={handleDownload}
                      >
                        Download Results
                      </button>
                    </div>
                    {/* Quiz History Section */}
                    {quizHistory.length > 0 && (
                      <div className="mt-10 text-left max-w-2xl mx-auto">
                        <h4 className="text-xl font-bold mb-4 text-primary dark:text-white">Quiz History</h4>
                        <ul className="space-y-2">
                          {quizHistory.map((h, i) => (
                            <li key={i} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="font-semibold">{h.topic} ({h.difficulty})</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">Score: {h.score} / {h.totalQuestions}</span>
                              <span className="text-xs text-gray-400">{new Date(h.timestamp).toLocaleString()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
} 