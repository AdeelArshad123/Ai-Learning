'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCog, 
  FaRobot, 
  FaCalendarAlt, 
  FaBell, 
  FaChartBar,
  FaToggleOn,
  FaToggleOff,
  FaDownload,
  FaUpload,
  FaSync,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaShieldAlt,
  FaDatabase,
  FaCloud
} from 'react-icons/fa'
import { AutomationLevel, IntegrationStatus } from '../../types/ai-automation'

interface AdvancedAutomationHubProps {
  className?: string
}

export default function AdvancedAutomationHub({ className = '' }: AdvancedAutomationHubProps) {
  const [automationSettings, setAutomationSettings] = useState({
    smartScheduling: {
      enabled: true,
      adaptToPerformance: true,
      breakReminders: true,
      optimalSessionLength: 45
    },
    progressReports: {
      frequency: 'weekly' as const,
      includeAnalytics: true,
      includePredictions: true,
      autoEmail: false
    },
    notifications: {
      learningReminders: true,
      achievements: true,
      recommendations: true,
      systemUpdates: false
    },
    aiAssistance: {
      codeCompletion: true,
      errorExplanation: true,
      optimizationSuggestions: true,
      realTimeHelp: true
    }
  })

  const [integrationStatus, setIntegrationStatus] = useState({
    openai: IntegrationStatus.ACTIVE,
    deepseek: IntegrationStatus.ACTIVE,
    github: IntegrationStatus.PENDING,
    vscode: IntegrationStatus.INACTIVE,
    slack: IntegrationStatus.ERROR
  })

  const [systemMetrics, setSystemMetrics] = useState({
    totalAutomations: 12,
    activeFeatures: 8,
    systemUptime: 99.9,
    avgResponseTime: 245,
    dailyTasks: 156,
    weeklyReports: 3
  })

  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case IntegrationStatus.ACTIVE:
        return <FaCheck className="text-green-500" />
      case IntegrationStatus.PENDING:
        return <FaClock className="text-yellow-500" />
      case IntegrationStatus.ERROR:
        return <FaTimes className="text-red-500" />
      default:
        return <FaTimes className="text-gray-500" />
    }
  }

  const getStatusColor = (status: IntegrationStatus) => {
    switch (status) {
      case IntegrationStatus.ACTIVE:
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      case IntegrationStatus.PENDING:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
      case IntegrationStatus.ERROR:
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    }
  }

  const toggleSetting = (category: string, setting: string) => {
    setAutomationSettings(prev => {
      const categoryData = prev[category as keyof typeof prev] as any
      return {
        ...prev,
        [category]: {
          ...categoryData,
          [setting]: !categoryData[setting]
        }
      }
    })
  }

  const updateIntegrationStatus = (integration: string, status: IntegrationStatus) => {
    setIntegrationStatus(prev => ({
      ...prev,
      [integration]: status
    }))
  }

  const exportSettings = () => {
    const settings = {
      automationSettings,
      integrationStatus,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-automation-settings.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FaCog className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Automation Hub</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Central control for AI automation features</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={exportSettings}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <FaDownload className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
            <FaUpload className="w-4 h-4" />
            Import
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-1">
            <FaRobot className="text-blue-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Automations</span>
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{systemMetrics.totalAutomations}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-1">
            <FaCheck className="text-green-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Active</span>
          </div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">{systemMetrics.activeFeatures}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-1">
            <FaShieldAlt className="text-purple-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Uptime</span>
          </div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{systemMetrics.systemUptime}%</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-3 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-2 mb-1">
            <FaClock className="text-orange-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Response</span>
          </div>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{systemMetrics.avgResponseTime}ms</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-3 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2 mb-1">
            <FaChartBar className="text-indigo-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Tasks</span>
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{systemMetrics.dailyTasks}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-3 rounded-xl border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center gap-2 mb-1">
            <FaCalendarAlt className="text-yellow-500 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Reports</span>
          </div>
          <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{systemMetrics.weeklyReports}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automation Settings */}
        <div className="space-y-6">
          {/* Smart Scheduling */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500 w-4 h-4" />
              Smart Scheduling
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Enable Smart Scheduling</span>
                <button
                  onClick={() => toggleSetting('smartScheduling', 'enabled')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.smartScheduling.enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.smartScheduling.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Adapt to Performance</span>
                <button
                  onClick={() => toggleSetting('smartScheduling', 'adaptToPerformance')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.smartScheduling.adaptToPerformance ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.smartScheduling.adaptToPerformance ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Break Reminders</span>
                <button
                  onClick={() => toggleSetting('smartScheduling', 'breakReminders')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.smartScheduling.breakReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.smartScheduling.breakReminders ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Session Length: {automationSettings.smartScheduling.optimalSessionLength} minutes
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  value={automationSettings.smartScheduling.optimalSessionLength}
                  onChange={(e) => setAutomationSettings(prev => ({
                    ...prev,
                    smartScheduling: {
                      ...prev.smartScheduling,
                      optimalSessionLength: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Progress Reports */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaChartBar className="text-green-500 w-4 h-4" />
              Progress Reports
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
                <select
                  value={automationSettings.progressReports.frequency}
                  onChange={(e) => setAutomationSettings(prev => ({
                    ...prev,
                    progressReports: {
                      ...prev.progressReports,
                      frequency: e.target.value as 'daily' | 'weekly' | 'monthly'
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Include Analytics</span>
                <button
                  onClick={() => toggleSetting('progressReports', 'includeAnalytics')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.progressReports.includeAnalytics ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.progressReports.includeAnalytics ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Include Predictions</span>
                <button
                  onClick={() => toggleSetting('progressReports', 'includePredictions')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.progressReports.includePredictions ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.progressReports.includePredictions ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Auto Email</span>
                <button
                  onClick={() => toggleSetting('progressReports', 'autoEmail')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.progressReports.autoEmail ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.progressReports.autoEmail ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Status & AI Assistance */}
        <div className="space-y-6">
          {/* Integration Status */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaCloud className="text-purple-500 w-4 h-4" />
              Integration Status
            </h4>
            
            <div className="space-y-3">
              {Object.entries(integrationStatus).map(([integration, status]) => (
                <div key={integration} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status)}
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {integration}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistance */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaRobot className="text-orange-500 w-4 h-4" />
              AI Assistance
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Code Completion</span>
                <button
                  onClick={() => toggleSetting('aiAssistance', 'codeCompletion')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.aiAssistance.codeCompletion ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.aiAssistance.codeCompletion ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Error Explanation</span>
                <button
                  onClick={() => toggleSetting('aiAssistance', 'errorExplanation')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.aiAssistance.errorExplanation ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.aiAssistance.errorExplanation ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Optimization Suggestions</span>
                <button
                  onClick={() => toggleSetting('aiAssistance', 'optimizationSuggestions')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.aiAssistance.optimizationSuggestions ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.aiAssistance.optimizationSuggestions ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Real-time Help</span>
                <button
                  onClick={() => toggleSetting('aiAssistance', 'realTimeHelp')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationSettings.aiAssistance.realTimeHelp ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    automationSettings.aiAssistance.realTimeHelp ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}