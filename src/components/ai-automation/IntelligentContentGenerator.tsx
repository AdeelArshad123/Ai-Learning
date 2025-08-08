'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaLightbulb, 
  FaCode, 
  FaProjectDiagram, 
  FaBook, 
  FaFlask,
  FaRocket,
  FaDownload,
  FaCopy,
  FaPlay,
  FaRefreshCw,
  FaCheckCircle,
  FaFileAlt,
  FaGraduationCap
} from 'react-icons/fa'
import { ContentType, SkillLevel } from '../../types/ai-automation'

interface GeneratedContent {
  id: string
  type: ContentType
  title: string
  description: string
  content: string
  difficulty: SkillLevel
  estimatedTime: number
  skills: string[]
}

interface IntelligentContentGeneratorProps {
  className?: string
}

export default function IntelligentContentGenerator({ className = '' }: IntelligentContentGeneratorProps) {
  const [selectedType, setSelectedType] = useState<ContentType>(ContentType.EXERCISE)
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState<SkillLevel>(SkillLevel.INTERMEDIATE)
  const [language, setLanguage] = useState('javascript')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[]>([])

  const contentTypes = [
    { type: ContentType.EXERCISE, label: 'Coding Exercise', icon: FaCode, color: 'from-blue-500 to-cyan-500' },
    { type: ContentType.PROJECT, label: 'Project Idea', icon: FaProjectDiagram, color: 'from-green-500 to-emerald-500' },
    { type: ContentType.TUTORIAL, label: 'Tutorial', icon: FaBook, color: 'from-purple-500 to-pink-500' },
    { type: ContentType.DOCUMENTATION, label: 'Documentation', icon: FaFileAlt, color: 'from-orange-500 to-red-500' },
    { type: ContentType.TEST_CASE, label: 'Test Cases', icon: FaFlask, color: 'from-indigo-500 to-purple-500' }
  ]

  const generateContent = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    // Simulate AI content generation
    setTimeout(() => {
      const mockContent: GeneratedContent = {
        id: `content-${Date.now()}`,
        type: selectedType,
        title: `${selectedType === ContentType.EXERCISE ? 'Build a' : selectedType === ContentType.PROJECT ? 'Create a' : 'Learn about'} ${topic}`,
        description: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}-level ${selectedType} focusing on ${topic} concepts`,
        content: generateMockContent(),
        difficulty,
        estimatedTime: getEstimatedTime(),
        skills: generateSkills()
      }

      setGeneratedContent(mockContent)
      setGenerationHistory(prev => [mockContent, ...prev.slice(0, 4)])
      setIsGenerating(false)
    }, 2000)
  }

  const generateMockContent = (): string => {
    switch (selectedType) {
      case ContentType.EXERCISE:
        return `// ${topic} Exercise - ${difficulty} level

function ${topic.toLowerCase().replace(/\s+/g, '')}Exercise() {
  // TODO: Implement ${topic} functionality
  // Requirements:
  // 1. Create the main function
  // 2. Add error handling
  // 3. Write unit tests
  // 4. Optimize for performance
  
  const solution = {
    // Your implementation here
  };
  
  return solution;
}

// Example usage:
const result = ${topic.toLowerCase().replace(/\s+/g, '')}Exercise();
console.log(result);

// Tests:
// Add your test cases here`

      case ContentType.PROJECT:
        return `# ${topic} Project

## Overview
Build a comprehensive ${topic} application that demonstrates modern development practices.

## Features
- Core ${topic} functionality
- User authentication
- Responsive design
- API integration
- Testing suite

## Tech Stack
- Frontend: ${language === 'javascript' ? 'React/Next.js' : language}
- Backend: Node.js/Express
- Database: MongoDB/PostgreSQL
- Testing: Jest/Cypress

## Getting Started
1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run development server

## Implementation Steps
1. Project setup and configuration
2. Core feature development
3. UI/UX implementation
4. Testing and optimization
5. Deployment preparation`

      case ContentType.TUTORIAL:
        return `# ${topic} Tutorial

## Introduction
Welcome to this comprehensive ${topic} tutorial. By the end of this guide, you'll understand the core concepts and be able to implement ${topic} in your projects.

## Prerequisites
- Basic ${language} knowledge
- Understanding of programming fundamentals
- Development environment setup

## What You'll Learn
1. ${topic} fundamentals
2. Best practices and patterns
3. Common pitfalls and solutions
4. Real-world applications

## Step-by-Step Guide

### Step 1: Understanding the Basics
[Detailed explanation of core concepts]

### Step 2: Implementation
[Code examples and explanations]

### Step 3: Advanced Techniques
[Advanced patterns and optimizations]

### Step 4: Testing and Debugging
[Testing strategies and debugging tips]

## Conclusion
You've successfully learned ${topic}! Practice with the provided exercises and explore advanced topics.`

      case ContentType.DOCUMENTATION:
        return `# ${topic} Documentation

## API Reference

### Overview
This documentation covers the ${topic} API and its usage patterns.

### Installation
\`\`\`bash
npm install ${topic.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

### Quick Start
\`\`\`${language}
import { ${topic.replace(/\s+/g, '')} } from '${topic.toLowerCase().replace(/\s+/g, '-')}';

const instance = new ${topic.replace(/\s+/g, '')}({
  // configuration options
});
\`\`\`

### Methods

#### \`initialize(options)\`
Initializes the ${topic} instance with the provided options.

**Parameters:**
- \`options\` (Object): Configuration object

**Returns:**
- Promise<void>

#### \`execute(data)\`
Executes the main ${topic} functionality.

**Parameters:**
- \`data\` (Any): Input data

**Returns:**
- Promise<Result>

### Examples
[Detailed usage examples]

### Error Handling
[Error codes and handling strategies]`

      case ContentType.TEST_CASE:
        return `// ${topic} Test Cases

describe('${topic}', () => {
  beforeEach(() => {
    // Setup test environment
  });

  afterEach(() => {
    // Cleanup
  });

  describe('Basic Functionality', () => {
    test('should initialize correctly', () => {
      // Test initialization
      expect(true).toBe(true);
    });

    test('should handle valid input', () => {
      // Test valid scenarios
    });

    test('should handle invalid input', () => {
      // Test error scenarios
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty input', () => {
      // Test edge cases
    });

    test('should handle large datasets', () => {
      // Test performance
    });
  });

  describe('Integration Tests', () => {
    test('should work with external APIs', () => {
      // Test integrations
    });
  });
});

// Performance Tests
describe('${topic} Performance', () => {
  test('should complete within time limit', async () => {
    const start = Date.now();
    // Execute function
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});`

      default:
        return 'Generated content will appear here...'
    }
  }

  const getEstimatedTime = (): number => {
    const baseTime = {
      [ContentType.EXERCISE]: 30,
      [ContentType.PROJECT]: 120,
      [ContentType.TUTORIAL]: 45,
      [ContentType.DOCUMENTATION]: 20,
      [ContentType.TEST_CASE]: 25
    }

    const difficultyMultiplier = {
      [SkillLevel.BEGINNER]: 1,
      [SkillLevel.INTERMEDIATE]: 1.5,
      [SkillLevel.ADVANCED]: 2,
      [SkillLevel.EXPERT]: 2.5
    }

    return Math.round(baseTime[selectedType] * difficultyMultiplier[difficulty])
  }

  const generateSkills = (): string[] => {
    const baseSkills = [language.charAt(0).toUpperCase() + language.slice(1)]
    
    switch (selectedType) {
      case ContentType.EXERCISE:
        return [...baseSkills, 'Problem Solving', 'Algorithms']
      case ContentType.PROJECT:
        return [...baseSkills, 'Architecture', 'Full Stack Development', 'Testing']
      case ContentType.TUTORIAL:
        return [...baseSkills, 'Teaching', 'Documentation', 'Best Practices']
      case ContentType.DOCUMENTATION:
        return [...baseSkills, 'Technical Writing', 'API Design']
      case ContentType.TEST_CASE:
        return [...baseSkills, 'Testing', 'Quality Assurance', 'Debugging']
      default:
        return baseSkills
    }
  }

  const getTypeIcon = (type: ContentType) => {
    const typeConfig = contentTypes.find(t => t.type === type)
    return typeConfig ? typeConfig.icon : FaCode
  }

  const getTypeColor = (type: ContentType) => {
    const typeConfig = contentTypes.find(t => t.type === type)
    return typeConfig ? typeConfig.color : 'from-gray-500 to-gray-600'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
          <FaLightbulb className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Intelligent Content Generator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered content creation for learning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Type Selection */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Content Type</h4>
          <div className="space-y-2">
            {contentTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className={`w-full p-3 rounded-xl border-2 transition-all ${
                    selectedType === type.type
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="text-white text-sm" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white text-left">
                      {type.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Generation Settings */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic/Description
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as SkillLevel)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {Object.values(SkillLevel).map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaRocket className="w-4 h-4" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">Generated Content</h4>
            {generatedContent && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedContent.content)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Copy content"
                >
                  <FaCopy className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Download content"
                >
                  <FaDownload className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {isGenerating ? (
            <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Generating your content...</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Creating {selectedType} for "{topic}"
                </p>
              </div>
            </div>
          ) : generatedContent ? (
            <div className="space-y-4">
              {/* Content Header */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(generatedContent.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {React.createElement(getTypeIcon(generatedContent.type), { className: "text-white text-lg" })}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">{generatedContent.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{generatedContent.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-blue-500 w-3 h-3" />
                        <span className="text-gray-600 dark:text-gray-400">{generatedContent.estimatedTime}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaGraduationCap className="text-green-500 w-3 h-3" />
                        <span className="text-gray-600 dark:text-gray-400">{generatedContent.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-purple-500 w-3 h-3" />
                        <span className="text-gray-600 dark:text-gray-400">{generatedContent.skills.length} skills</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white font-mono overflow-x-auto">
                  {generatedContent.content}
                </pre>
              </div>

              {/* Skills Tags */}
              <div>
                <h6 className="font-medium text-gray-900 dark:text-white mb-2">Skills Covered</h6>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="text-center">
                <FaLightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Select content type and describe your topic</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">AI will generate personalized content for you</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generation History */}
      {generationHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Generations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {generationHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => setGeneratedContent(item)}
                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  {React.createElement(getTypeIcon(item.type), { className: "text-gray-500 w-4 h-4" })}
                  <span className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}