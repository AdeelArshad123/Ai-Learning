'use client'

import { motion } from 'framer-motion'
import TrendingTools from '@/components/TrendingTools'
import AICodeGenerator from '@/components/AICodeGenerator'
import YouTubeChannels from '@/components/YouTubeChannels'
import Dashboard from '@/components/Dashboard'
import SearchBar from '@/components/SearchBar'
import TopicQuiz from '@/components/TopicQuiz'
import QuizAnalytics from '@/components/QuizAnalytics'
import React from 'react'
import { FaReact, FaGithub, FaDatabase, FaStripe, FaYoutube, FaPalette, FaBook, FaCode, FaServer, FaCloud, FaIcons, FaRegLightbulb, FaRocket, FaCogs } from 'react-icons/fa';
import { FiBookOpen, FiCheck, FiTrendingUp, FiBarChart, FiAward, FiHelpCircle } from 'react-icons/fi';
import RecommendedResources from '@/components/RecommendedResources';
import TrendingLanguages from '../components/TrendingLanguages';
import Typewriter from '../components/Typewriter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center md:text-left py-10 md:py-16 bg-gradient-to-br from-primary via-secondary to-blue-400 rounded-3xl mx-4 mb-24 overflow-hidden shadow-2xl">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        {/* Remove the background SVG/ellipse design here */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-12">
          {/* Left: Text and CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-2xl tracking-tight leading-tight"
            >
              <span className="block">Learn Programming</span>
              <span className="block text-secondary">with AI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-2xl text-white mb-8 max-w-xl font-medium drop-shadow"
            >
              Discover trending tools, get AI-generated code examples, and test your knowledge with interactive quizzes—all in one beautiful platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-lg mx-auto mb-6"
            >
              <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-3xl shadow-2xl p-6 border border-white/30 dark:border-gray-700 flex flex-col items-center">
                <SearchBar />
              </div>
            </motion.div>
            <motion.a
              href="#dashboard"
              className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-3 shadow-2xl font-bold rounded-full hover:scale-105 transition-transform text-white border-4 border-white/20 mt-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Get Started
            </motion.a>
          </div>
          {/* Right: (empty for now) */}
          <div className="flex items-center justify-center"></div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mx-4">
          <Dashboard />
        </div>
      </section>

      {/* Single Recommended Resources Section */}
      <div className="mx-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <RecommendedResources />
        </div>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Quiz Generator Section */}
      <section id="quizzes" className="container mx-auto px-4 mb-24">
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-0 border-0 shadow-2xl overflow-hidden">
          <div className="max-w-3xl mx-auto py-16 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12 bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-xl p-10 backdrop-blur-md border border-gray-200 dark:border-gray-700 relative"
            >
              <span className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg animate-bounce">
                  <FiHelpCircle className="text-white text-5xl" />
                </span>
              </span>
              <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
                AI Quiz Generator
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Test your knowledge with AI-generated quizzes for any programming topic. Get instant feedback and explanations.
              </p>
              <a href="#start-quiz" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 text-lg font-bold transition-all">Start Quiz</a>
            </motion.div>
            <div id="start-quiz">
              <TopicQuiz language="JavaScript" topic="Async/Await" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* YouTube Channels Section (moved up) */}
      <section id="youtube" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-4 text-primary dark:text-white tracking-tight drop-shadow">
              Top YouTube Programming Channels
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the most popular YouTube channels for learning programming languages and frameworks. Filter by language to find the best resources for your learning journey.
            </p>
          </motion.div>
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
          <AICodeGenerator />
        </div>
      </section>

      <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 my-12 rounded-full" />

      {/* Trending Languages Section */}
      <section id="languages" className="container mx-auto px-4 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <TrendingLanguages />
        </div>
      </section>
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
  );
} 