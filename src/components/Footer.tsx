'use client'

import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaArrowUp } from 'react-icons/fa'
import { useRef } from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white mt-16 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Brand & Social */}
          <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl md:text-3xl text-white mb-3">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="#0070f3"/>
                <path d="M13 27L27 13M13 13H27V27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CodeLearner
            </Link>
            <span className="text-primary font-semibold text-lg mb-2">Level up your coding journey 🚀</span>
            <p className="text-gray-300 mb-5 max-w-xs text-center md:text-left">
              Learn programming languages, tools, and concepts with AI-powered examples and interactive quizzes.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub /></a>
              <a href="#" aria-label="Twitter" className="text-sky-400 hover:text-white transition-colors text-2xl"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn" className="text-blue-500 hover:text-white transition-colors text-2xl"><FaLinkedin /></a>
              <a href="#" aria-label="YouTube" className="text-red-500 hover:text-white transition-colors text-2xl"><FaYoutube /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-primary hover:underline transition-colors">Home</Link></li>
                <li><Link href="#trending" className="text-gray-300 hover:text-primary hover:underline transition-colors">Trending</Link></li>
                <li><Link href="#ai-code" className="text-gray-300 hover:text-primary hover:underline transition-colors">AI Code</Link></li>
                <li><Link href="#quizzes" className="text-gray-300 hover:text-primary hover:underline transition-colors">Quizzes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary hover:underline transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-end">
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <form className="flex w-full max-w-xs">
              <input type="email" aria-label="Email address" placeholder="Your email" className="rounded-l-lg px-4 py-2 w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="submit" className="rounded-r-lg px-4 py-2 bg-primary text-white font-semibold hover:bg-secondary transition-colors">Subscribe</button>
            </form>
            <span className="text-xs text-gray-400 mt-2">No spam. Unsubscribe anytime.</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center bg-gray-900/60">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 CodeLearner. All rights reserved.</p>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-gray-400 hover:text-primary text-sm font-semibold transition-colors focus:outline-none"
            aria-label="Back to top"
          >
            <FaArrowUp className="inline-block" /> Top
          </button>
        </div>
      </div>
    </footer>
  )
} 