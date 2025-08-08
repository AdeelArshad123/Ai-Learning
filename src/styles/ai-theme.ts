// AI automation system theme configuration
// Extending the existing theme with AI-specific design tokens

const aiTheme = {
  // AI-specific color palette
  colors: {
    ai: {
      primary: '#6366f1', // Indigo for main AI features
      secondary: '#8b5cf6', // Purple for advanced features
      accent: '#06b6d4', // Cyan for data/analytics
      success: '#10b981', // Green for positive outcomes
      warning: '#f59e0b', // Amber for attention
      error: '#ef4444', // Red for errors
      neural: '#3b82f6', // Blue for neural networks
      brain: '#8b5cf6', // Purple for intelligence
      automation: '#06b6d4', // Cyan for automation
      prediction: '#10b981', // Green for predictions
    },
    
    // Gradient combinations for AI features
    gradients: {
      aiPrimary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      neuralNetwork: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      intelligence: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      automation: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
      analytics: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
      futuristic: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)',
    },
    
    // Status colors for AI features
    status: {
      active: '#10b981',
      inactive: '#6b7280',
      pending: '#f59e0b',
      error: '#ef4444',
      learning: '#3b82f6',
      optimizing: '#8b5cf6',
    },
    
    // Skill level colors
    skillLevel: {
      beginner: '#10b981',
      intermediate: '#f59e0b', 
      advanced: '#ef4444',
      expert: '#8b5cf6',
    },
    
    // Performance score colors
    performance: {
      excellent: '#10b981',
      good: '#84cc16',
      fair: '#f59e0b',
      poor: '#ef4444',
    }
  },
  
  // AI-specific typography
  typography: {
    ai: {
      fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      }
    },
    
    // Code and technical text
    code: {
      fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
      }
    }
  },
  
  // AI component styling
  components: {
    // AI Card variants
    aiCard: {
      base: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm',
      elevated: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg',
      neural: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg',
    },
    
    // AI Button variants
    aiButton: {
      primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl',
      secondary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl',
      neural: 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl',
      automation: 'bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl',
    },
    
    // AI Badge variants
    aiBadge: {
      active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium',
      inactive: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium',
      learning: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium',
      optimizing: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium',
    },
    
    // AI Progress indicators
    aiProgress: {
      base: 'w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2',
      neural: 'bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300',
      skill: 'bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all duration-300',
      performance: 'bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full transition-all duration-300',
    },
    
    // AI Input variants
    aiInput: {
      base: 'w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300',
      neural: 'w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-600 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300',
    }
  },
  
  // AI-specific animations
  animations: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    
    // Custom AI animations
    neuralPulse: 'neuralPulse 3s ease-in-out infinite',
    brainWave: 'brainWave 4s ease-in-out infinite',
    dataFlow: 'dataFlow 2s linear infinite',
    thinking: 'thinking 1.5s ease-in-out infinite',
  },
  
  // AI-specific spacing and sizing
  spacing: {
    aiCard: '1.5rem',
    aiSection: '2rem',
    aiContainer: '3rem',
  },
  
  // AI-specific shadows
  shadows: {
    aiCard: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    aiElevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    aiGlow: '0 0 20px rgba(99, 102, 241, 0.3)',
    neuralGlow: '0 0 30px rgba(59, 130, 246, 0.4)',
  },
  
  // AI-specific border radius
  borderRadius: {
    aiCard: '12px',
    aiButton: '8px',
    aiBadge: '20px',
    aiInput: '10px',
  }
};

export default aiTheme;