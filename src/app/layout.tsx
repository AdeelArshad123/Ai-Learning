import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export const metadata: Metadata = {
  title: 'CodeLearner - Learn Programming with AI',
  description: 'Learn programming languages, tools, and concepts with AI-powered examples and quizzes',
  keywords: 'programming, coding, AI, learning, tutorials, JavaScript, Python, React',
  authors: [{ name: 'CodeLearner Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <Providers>
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
} 