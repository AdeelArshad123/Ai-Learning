// Mock data for AI automation features
import { SkillLevel, LearningStyle, AIFeatureType, AssessmentType, ContentType, AnalysisType, AutomationLevel, PredictionType, IntegrationStatus } from '../types/ai-automation';

// AI Features Configuration
export const mockAIFeatures = {
  codeReviewer: {
    enabled: true,
    analysisTypes: [AnalysisType.PERFORMANCE, AnalysisType.SECURITY, AnalysisType.QUALITY],
    realTimeAnalysis: true,
    autoFix: false,
    confidenceThreshold: 0.8
  },
  adaptiveLearning: {
    enabled: true,
    personalizationLevel: AutomationLevel.ADVANCED,
    skillGapAnalysis: true,
    learningStyleDetection: true,
    optimalTimePrediction: true
  },
  contentGenerator: {
    enabled: true,
    autoExercises: true,
    projectIdeas: true,
    documentation: true,
    testCases: true,
    difficulty: SkillLevel.INTERMEDIATE
  },
  predictiveAnalytics: {
    enabled: true,
    predictionTypes: [PredictionType.LEARNING_OUTCOME, PredictionType.SKILL_MASTERY],
    confidenceLevel: 0.85,
    updateFrequency: 'daily' as const
  }
};

// User Learning Profile
export const mockUserProfile = {
  userId: 'user-123',
  skillLevel: SkillLevel.INTERMEDIATE,
  learningStyle: LearningStyle.VISUAL,
  preferredLanguages: ['JavaScript', 'Python', 'React'],
  weakAreas: ['Algorithms', 'System Design'],
  strongAreas: ['Frontend Development', 'API Integration'],
  learningGoals: ['Master React Hooks', 'Learn Node.js', 'Improve Problem Solving'],
  studyTime: {
    daily: 120, // minutes
    optimal: '09:00-11:00' as const,
    timezone: 'UTC-5' as const
  },
  performance: {
    averageScore: 78.5,
    completionRate: 85,
    streakDays: 12,
    totalHours: 145.5
  }
};

// AI Analysis Results
export const mockAnalysisResults = {
  codeQuality: {
    score: 85,
    issues: [
      { type: 'performance' as const, severity: 'medium' as const, line: 45, message: 'Consider using memoization for expensive calculations' },
      { type: 'security' as const, severity: 'high' as const, line: 23, message: 'Potential XSS vulnerability in user input handling' }
    ],
    suggestions: [
      'Add input validation',
      'Implement error boundaries',
      'Use TypeScript for better type safety'
    ],
    metrics: {
      complexity: 6.2,
      maintainability: 78,
      testCoverage: 65
    }
  },
  learningAnalysis: {
    currentLevel: SkillLevel.INTERMEDIATE,
    progressRate: 1.2, // skills per week
    estimatedTimeToAdvanced: 8, // weeks
    recommendedTopics: ['Advanced React Patterns', 'Node.js Streams', 'Database Optimization'],
    learningEfficiency: 0.82
  }
};

// Predictive Models Data
export const mockPredictions = {
  skillMastery: {
    javascript: { current: 75, predicted: 85, timeframe: 4 }, // weeks
    react: { current: 80, predicted: 90, timeframe: 3 },
    nodejs: { current: 45, predicted: 70, timeframe: 6 }
  },
  careerPath: {
    currentRole: 'Frontend Developer',
    suggestedRoles: ['Full Stack Developer', 'React Specialist', 'Technical Lead'],
    skillGaps: ['Backend Development', 'DevOps', 'System Architecture'],
    timeToTransition: 12 // weeks
  },
  learningOutcome: {
    nextQuizScore: 82,
    confidence: 0.87,
    recommendedDifficulty: SkillLevel.INTERMEDIATE,
    optimalStudyDuration: 45 // minutes
  }
};

// Content Generation Templates
export const mockContentTemplates = {
  exercises: [
    {
      id: 'ex-1',
      title: 'Build a Todo App with React Hooks',
      difficulty: SkillLevel.INTERMEDIATE,
      estimatedTime: 90,
      skills: ['React', 'Hooks', 'State Management'],
      description: 'Create a fully functional todo application using modern React patterns'
    },
    {
      id: 'ex-2', 
      title: 'Implement Binary Search Algorithm',
      difficulty: SkillLevel.BEGINNER,
      estimatedTime: 45,
      skills: ['Algorithms', 'Problem Solving'],
      description: 'Learn and implement the binary search algorithm with optimizations'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'E-commerce API with Node.js',
      difficulty: SkillLevel.ADVANCED,
      estimatedTime: 480, // 8 hours
      skills: ['Node.js', 'Express', 'Database', 'Authentication'],
      description: 'Build a complete e-commerce backend with payment integration'
    }
  ]
};

// Automation Settings
export const mockAutomationSettings = {
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
};

// Integration Status
export const mockIntegrationStatus = {
  openai: IntegrationStatus.ACTIVE,
  deepseek: IntegrationStatus.ACTIVE,
  github: IntegrationStatus.PENDING,
  vscode: IntegrationStatus.INACTIVE,
  slack: IntegrationStatus.ERROR
};

// Chart Data for Analytics
export const mockChartData = {
  skillProgress: [
    { skill: 'JavaScript', current: 75, target: 90, improvement: 15 },
    { skill: 'React', current: 80, target: 95, improvement: 15 },
    { skill: 'Node.js', current: 45, target: 75, improvement: 30 },
    { skill: 'Python', current: 60, target: 80, improvement: 20 },
    { skill: 'Algorithms', current: 40, target: 70, improvement: 30 }
  ],
  learningTrend: [
    { month: 'Jan', hours: 20, score: 65 },
    { month: 'Feb', hours: 25, score: 70 },
    { month: 'Mar', hours: 30, score: 75 },
    { month: 'Apr', hours: 35, score: 80 },
    { month: 'May', hours: 40, score: 85 },
    { month: 'Jun', hours: 45, score: 88 }
  ],
  performanceMetrics: [
    { metric: 'Code Quality', score: 85, trend: 'up' },
    { metric: 'Problem Solving', score: 78, trend: 'up' },
    { metric: 'Best Practices', score: 82, trend: 'stable' },
    { metric: 'Speed', score: 75, trend: 'up' },
    { metric: 'Debugging', score: 70, trend: 'down' }
  ]
};

// Assessment Data
export const mockAssessmentData = {
  recentQuizzes: [
    { topic: 'React Hooks', score: 85, date: '2024-01-15', difficulty: 'intermediate' },
    { topic: 'JavaScript ES6', score: 92, date: '2024-01-14', difficulty: 'beginner' },
    { topic: 'Node.js Basics', score: 78, date: '2024-01-13', difficulty: 'intermediate' },
    { topic: 'CSS Grid', score: 88, date: '2024-01-12', difficulty: 'beginner' }
  ],
  adaptiveQuestions: [
    {
      id: 'q1',
      question: 'What is the purpose of useEffect hook in React?',
      options: ['State management', 'Side effects', 'Event handling', 'Rendering'],
      correctAnswer: 1,
      difficulty: 'intermediate',
      explanation: 'useEffect is used to perform side effects in functional components'
    }
  ]
};

// Mentor System Data
export const mockMentorData = {
  availableMentors: [
    {
      id: 'mentor-1',
      name: 'Sarah Chen',
      expertise: ['React', 'JavaScript', 'Frontend Architecture'],
      rating: 4.9,
      experience: '8 years',
      avatar: 'https://i.pravatar.cc/150?img=1',
      specialties: ['Code Review', 'Career Guidance', 'Technical Interviews']
    },
    {
      id: 'mentor-2',
      name: 'Alex Rodriguez',
      expertise: ['Node.js', 'Python', 'System Design'],
      rating: 4.8,
      experience: '10 years',
      avatar: 'https://i.pravatar.cc/150?img=2',
      specialties: ['Backend Development', 'Database Design', 'API Architecture']
    }
  ],
  mentoringSessions: [
    {
      id: 'session-1',
      mentorName: 'Sarah Chen',
      topic: 'React Performance Optimization',
      date: '2024-01-20',
      duration: 60,
      status: 'scheduled'
    }
  ]
};

// Pair Programming Data
export const mockPairProgrammingData = {
  activeSessions: [
    {
      id: 'session-1',
      partner: 'AI Assistant',
      topic: 'Building REST API',
      language: 'JavaScript',
      startTime: '2024-01-15T10:00:00Z',
      status: 'active'
    }
  ],
  codeCollaboration: {
    currentCode: `function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`,
    suggestions: [
      'Add input validation for the items parameter',
      'Consider using TypeScript for better type safety',
      'Add error handling for invalid price values'
    ]
  }
};

// Content Curation Data
export const mockContentCurationData = {
  trendingTopics: [
    { topic: 'AI/ML Integration', growth: 45, relevance: 92 },
    { topic: 'Web3 Development', growth: 38, relevance: 78 },
    { topic: 'Serverless Architecture', growth: 32, relevance: 85 },
    { topic: 'Micro-frontends', growth: 28, relevance: 80 }
  ],
  recommendedResources: [
    {
      title: 'Advanced React Patterns',
      type: 'course',
      provider: 'Tech Academy',
      rating: 4.8,
      duration: '6 hours',
      relevanceScore: 95
    },
    {
      title: 'Node.js Best Practices',
      type: 'article',
      provider: 'Dev Blog',
      rating: 4.6,
      duration: '15 min',
      relevanceScore: 88
    }
  ]
};