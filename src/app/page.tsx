'use client'

import { motion } from 'framer-motion'
import TrendingTools from '@/components/TrendingTools'
import YouTubeChannels from '@/components/YouTubeChannelsFixed'

import SearchBar from '@/components/SearchBar'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import {
  LazyAICodeGenerator,
  LazyTopicQuiz,
  LazyAITutor
} from '@/components/LazyComponents'

// Lazy load heavy components
const TopicQuiz = dynamic(() => import('@/components/TopicQuiz'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-xl"></div>
})

const RecommendedResources = dynamic(() => import('@/components/RecommendedResources'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-xl"></div>
})

const TrendingLanguages = dynamic(() => import('@/components/TrendingLanguages'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-xl"></div>
})

// AI Components - Regular imports with ClientOnly wrapper
import AILearningAssistant from '@/components/AILearningAssistant'
import AIQuizGenerator from '@/components/AIQuizGenerator'
import AIRoadmapGenerator from '@/components/AIRoadmapGenerator'
import AILearningAnalytics from '@/components/AILearningAnalytics'
import AISearchBar from '@/components/AISearchBar'
import FloatingAIButton from '@/components/FloatingAIButton'
import AIAPIGenerator from '@/components/AIAPIGenerator'
const QuizAnalytics = dynamic(() => import('@/components/QuizAnalytics'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"></div>
})
import { FaReact, FaGithub, FaDatabase, FaStripe, FaYoutube, FaPalette, FaBook, FaCode, FaServer, FaCloud, FaIcons, FaRegLightbulb, FaRocket, FaCogs, FaRobot } from 'react-icons/fa';
import { FiBookOpen, FiCheck, FiTrendingUp, FiBarChart, FiAward, FiHelpCircle } from 'react-icons/fi';

import Typewriter from '../components/Typewriter';
import HeroSelector from '../components/HeroSections/HeroSelector';
import ClientOnly from '../components/ClientOnly';
import NoSSR from '../components/NoSSR';

export default function Home() {
  const [isTutorOpen, setIsTutorOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Multiple Options */}
      <HeroSelector />



      {/* AI Learning Analytics Section */}
      <section id="ai-analytics" className="container mx-auto px-4 mb-24">
        <NoSSR fallback={
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <AILearningAnalytics />
        </NoSSR>
      </section>

      {/* AI-Powered Search Section - Full Width */}
      <section id="ai-search" className="w-full mb-24">
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                  <FaRobot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    AI-Powered Search
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🤖 Intelligent</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">🎤 Voice Enabled</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">⚡ Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the best programming resources with our AI-powered search engine. Get intelligent suggestions,
                use voice search, and find exactly what you need to advance your coding journey.
              </p>
            </motion.div>

            <ClientOnly fallback={
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded-xl mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-xl"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-xl"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-xl"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-xl"></div>
                </div>
              </div>
            }>
              <AISearchBar />
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Single Recommended Resources Section - Full Width */}
      <div className="w-full mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
          <RecommendedResources />
        </div>
      </div>

      {/* AI Learning Roadmap Generator Section */}
      <section id="ai-recommendations" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-4 text-primary dark:text-white tracking-tight drop-shadow">
              AI Learning Roadmap Generator
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Get a personalized learning roadmap tailored specifically for beginners and freshers. Our AI analyzes your goals, experience, and schedule to create the perfect learning path.
            </p>
          </motion.div>

          <AIRoadmapGenerator />







        </div>
      </section>

      {/* AI API Generator Section */}
      <section id="ai-api-generator" className="container mx-auto px-4 mb-24">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <AIAPIGenerator />
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Unified Quiz Generator Section */}
      <section id="quizzes" className="container mx-auto px-4 mb-24">
        <div className="max-w-6xl mx-auto">
          <ClientOnly fallback={
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 rounded-3xl p-8 shadow-2xl border border-purple-200 dark:border-purple-700 animate-pulse">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          }>
            <AIQuizGenerator
              topic="JavaScript"
              difficulty="intermediate"
              questionCount={5}
            />
          </ClientOnly>
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* YouTube Channels Section (moved up) */}
      <section id="youtube" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <YouTubeChannels />
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Trending Section */}
      <section id="trending" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-4 text-primary dark:text-white tracking-tight drop-shadow">
              Trending GitHub Repositories
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the most popular and trending programming tools, frameworks, and libraries from the developer community.
            </p>
          </motion.div>
          <TrendingTools />
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* AI Code Generator Section */}
      <section id="ai-code" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-4 text-primary dark:text-white tracking-tight drop-shadow">
              AI Code Generator
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Generate AI-powered code examples with explanations, key learning points, and multiple programming languages.
            </p>
          </motion.div>
          <LazyAICodeGenerator />
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Trending Languages Section */}
      <section id="languages" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <TrendingLanguages />
        </div>
      </section>

      {/* AI Learning Assistant - Testing */}
      <ClientOnly>
        <AILearningAssistant
          currentTopic="JavaScript"
          currentSection="dashboard"
        />
      </ClientOnly>

      {/* Enhanced Floating AI Assistant */}
      <FloatingAIButton />

      {/* AI Tutor Chat (Legacy - keeping for compatibility) */}
      <LazyAITutor
        isOpen={isTutorOpen}
        onToggle={() => setIsTutorOpen(!isTutorOpen)}
      />
    </div>
  )
}

function ResourceCard({ name, url, description }: { name: string; url: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-md flex flex-col h-full justify-between hover:shadow-xl transition-shadow">
      <div>
        <h3 className="text-xl font-bold text-primary mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-auto bg-primary text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors"
      >
        Visit
      </a>
    </div>
  )
}
