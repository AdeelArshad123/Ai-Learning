'use client'

import { motion } from 'framer-motion'
import TrendingTools from '@/components/TrendingTools'
import YouTubeChannels from '@/components/YouTubeChannelsFixed'
import Dashboard from '@/components/Dashboard'
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'
import { 
  LazyAICodeGenerator,
  LazyTopicQuiz,
  LazyAITutor
} from '@/components/LazyComponents'

import { FaReact, FaGithub, FaDatabase, FaStripe, FaYoutube, FaPalette, FaBook, FaCode, FaServer, FaCloud, FaIcons, FaRegLightbulb, FaRocket, FaCogs } from 'react-icons/fa';
import { FiBookOpen, FiCheck, FiTrendingUp, FiBarChart, FiAward, FiHelpCircle } from 'react-icons/fi';
import RecommendedResources from '@/components/RecommendedResources';

import TrendingLanguages from '../components/TrendingLanguages';
import Typewriter from '../components/Typewriter';
import HeroSelector from '../components/HeroSections/HeroSelector';

export default function Home() {
  const [isTutorOpen, setIsTutorOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Multiple Options */}
      <HeroSelector />

      {/* Dashboard Section */}
      <section id="dashboard" className="mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mx-4">
          <Dashboard />
        </div>
      </section>



      {/* Single Recommended Resources Section - Full Width */}
      <div className="w-full mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
          <RecommendedResources />
        </div>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Quiz Generator Section */}
      <section id="quizzes" className="container mx-auto px-4 mb-24">
        <LazyTopicQuiz language="JavaScript" topic="Async/Await" />
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

      {/* AI Tutor Floating Button */}
      {!isTutorOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsTutorOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-blue-500/25"
        >
          <span className="text-2xl">🤖</span>
        </motion.button>
      )}

      {/* AI Tutor Chat */}
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
