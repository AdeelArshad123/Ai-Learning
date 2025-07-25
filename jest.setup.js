import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.DEEPSEEK_API_KEY = 'test-deepseek-key'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Mock fetch for API tests
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    a: 'a',
    button: 'button',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiCode: () => 'FiCode',
  FiCopy: () => 'FiCopy',
  FiDownload: () => 'FiDownload',
  FiPlay: () => 'FiPlay',
  FiRefreshCw: () => 'FiRefreshCw',
  FiCheck: () => 'FiCheck',
  FiX: () => 'FiX',
  FiShare2: () => 'FiShare2',
  FiMessageSquare: () => 'FiMessageSquare',
  FiBookOpen: () => 'FiBookOpen',
  FiZap: () => 'FiZap',
  FiGrid: () => 'FiGrid',
  FiList: () => 'FiList',
  FiFilter: () => 'FiFilter',
  FiPlus: () => 'FiPlus',
  FiTrendingUp: () => 'FiTrendingUp',
  FiYoutube: () => 'FiYoutube',
  FiHelpCircle: () => 'FiHelpCircle',
  FiBarChart: () => 'FiBarChart',
  FiAward: () => 'FiAward',
}))

// Mock CodeMirror
jest.mock('@uiw/react-codemirror', () => {
  return function MockCodeMirror({ value, onChange }) {
    return (
      <textarea
        data-testid="codemirror"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    )
  }
})

// Mock Monaco Editor
jest.mock('@monaco-editor/react', () => {
  return function MockMonacoEditor({ value, onChange }) {
    return (
      <textarea
        data-testid="monaco-editor"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    )
  }
})

// Setup cleanup after each test
afterEach(() => {
  jest.clearAllMocks()
})
