'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaChartLine, 
  FaCrystalBall, 
  FaTrendingUp, 
  FaTrendingDown,
  FaTarget,
  FaRocket,
  FaBrain,
  FaCalendarAlt,
  FaAward,
  FaLightbulb
} from 'react-icons/fa'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface PredictiveAnalyticsDashboardProps {
  className?: string
}

export default function PredictiveAnalyticsDashboard({ className = '' }: PredictiveAnalyticsDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months')
  const [selectedMetric, setSelectedMetric] = useState('skill_mastery')

  // Mock data for charts
  const skillProgressData = [
    { skill: 'JavaScript', current: 75, predicted: 85, improvement: 15 },
    { skill: 'React', current: 80, predicted: 90, improvement: 15 },
    { skill: 'Node.js', current: 45, predicted: 70, improvement: 30 },
    { skill: 'Python', current: 60, predicted: 80, improvement: 20 },
    { skill: 'Algorithms', current: 40, predicted: 70, improvement: 30 }
  ]

  const learningTrendData = [
    { month: 'Jan', hours: 20, score: 65, predicted: 68 },
    { month: 'Feb', hours: 25, score: 70, predicted: 73 },
    { month: 'Mar', hours: 30, score: 75, predicted: 78 },
    { month: 'Apr', hours: 35, score: 80, predicted: 83 },
    { month: 'May', hours: 40, score: 85, predicted: 88 },
    { month: 'Jun', hours: 45, score: 88, predicted: 92 }
  ]

  const performanceRadarData = [
    { metric: 'Code Quality', current: 85, predicted: 90 },
    { metric: 'Problem Solving', current: 78, predicted: 85 },
    { metric: 'Best Practices', current: 82, predicted: 88 },
    { metric: 'Speed', current: 75, predicted: 82 },
    { metric: 'Debugging', current: 70, predicted: 78 },
    { metric: 'Testing', current: 65, predicted: 75 }
  ]

  const careerPathData = [
    { role: 'Frontend Dev', probability: 85, timeframe: '3-6 months' },
    { role: 'Full Stack Dev', probability: 70, timeframe: '6-12 months' },
    { role: 'Tech Lead', probability: 45, timeframe: '12-18 months' },
    { role: 'Architect', probability: 25, timeframe: '18-24 months' }
  ]

  const confidenceColors = ['#10b981', '#f59e0b', '#ef4444', '#6b7280']

  const predictions = {
    nextQuizScore: 87,
    skillMasteryWeeks: 8,
    careerAdvancement: '6 months',
    learningVelocity: '+15%'
  }

  const insights = [
    {
      type: 'opportunity',
      title: 'Skill Acceleration Detected',
      description: 'Your React learning pace is 23% above average. Consider advancing to advanced patterns.',
      confidence: 92,
      action: 'Explore React Advanced Patterns'
    },
    {
      type: 'warning',
      title: 'Algorithm Practice Needed',
      description: 'Your algorithm skills are lagging behind other areas. This may impact technical interviews.',
      confidence: 78,
      action: 'Schedule daily algorithm practice'
    },
    {
      type: 'prediction',
      title: 'Career Transition Ready',
      description: 'Based on current progress, you\'ll be ready for senior roles in 8-12 months.',
      confidence: 85,
      action: 'Start building portfolio projects'
    }
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <FaRocket className="text-green-500" />
      case 'warning': return <FaLightbulb className="text-yellow-500" />
      case 'prediction': return <FaCrystalBall className="text-purple-500" />
      default: return <FaBrain className="text-blue-500" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-500'
    if (confidence >= 80) return 'text-blue-500'
    if (confidence >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FaChartLine className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Predictive Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-driven performance prediction and insights</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
        </div>
      </div>

      {/* Key Predictions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <FaTarget className="text-blue-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Quiz Score</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{predictions.nextQuizScore}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Predicted accuracy: 89%</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-2">
            <FaAward className="text-green-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Mastery</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{predictions.skillMasteryWeeks}w</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">To reach advanced level</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-2">
            <FaRocket className="text-purple-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Career Ready</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{predictions.careerAdvancement}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">For senior positions</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-2 mb-2">
            <FaTrendingUp className="text-orange-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Learning Velocity</span>
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{predictions.learningVelocity}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Above average pace</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress Prediction */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaBrain className="text-blue-500 w-4 h-4" />
            Skill Mastery Prediction
          </h4>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="skill" 
                stroke="#6b7280" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="current" fill="#3b82f6" name="Current Level" />
              <Bar dataKey="predicted" fill="#10b981" name="Predicted Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Trend Analysis */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaTrendingUp className="text-green-500 w-4 h-4" />
            Learning Trend Analysis
          </h4>
          
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={learningTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name="Actual Score"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                strokeDasharray="5 5"
                name="Predicted Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaTarget className="text-purple-500 w-4 h-4" />
            Performance Analysis
          </h4>
          
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={performanceRadarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6b7280' }}
              />
              <Radar 
                name="Current" 
                dataKey="current" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
              />
              <Radar 
                name="Predicted" 
                dataKey="predicted" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                strokeDasharray="5 5"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Career Path Predictions */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaRocket className="text-orange-500 w-4 h-4" />
            Career Path Predictions
          </h4>
          
          <div className="space-y-3">
            {careerPathData.map((path, index) => (
              <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{path.role}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{path.timeframe}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${path.probability}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{path.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaCrystalBall className="text-indigo-500 w-4 h-4" />
          AI-Generated Insights
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">{insight.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                      {insight.action}
                    </button>
                    <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                      {insight.confidence}% confident
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}