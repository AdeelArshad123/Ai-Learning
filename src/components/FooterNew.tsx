'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaArrowUp, 
  FaDiscord, 
  FaTelegram,
  FaHeart,
  FaCode,
  FaGraduationCap,
  FaRocket,
  FaShieldAlt,
  FaEnvelope
} from 'react-icons/fa'
import { 
  SiJavascript, 
  SiPython, 
  SiReact, 
  SiNodedotjs,
  SiGithub,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si'

export default function FooterNew() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const footerLinks = {
    product: [
      { name: 'AI Code Generator', href: '/ai-code-generator', icon: FaCode },
      { name: 'Interactive Quizzes', href: '/quizzes', icon: FaGraduationCap },
      { name: 'Learning Paths', href: '/learning-paths', icon: FaRocket },
      { name: 'Code Playground', href: '/playground', icon: SiReact },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api-docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Support', href: '/support' },
      { name: 'Press Kit', href: '/press' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, href: '#', color: 'hover:text-gray-300' },
    { name: 'Twitter', icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: FaLinkedin, href: '#', color: 'hover:text-blue-500' },
    { name: 'YouTube', icon: FaYoutube, href: '#', color: 'hover:text-red-500' },
    { name: 'Discord', icon: FaDiscord, href: '#', color: 'hover:text-indigo-400' },
    { name: 'Telegram', icon: FaTelegram, href: '#', color: 'hover:text-blue-400' },
  ]

  const techStack = [
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-400' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-400' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-400' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CodeLearner
                  </span>
                </Link>
                
                <p className="text-gray-300 leading-relaxed">
                  Empowering developers worldwide with AI-powered learning tools, 
                  interactive coding experiences, and personalized learning paths.
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaHeart className="text-red-500" />
                  <span>Made with love for the developer community</span>
                </div>

                {/* Tech Stack Display */}
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Built with</h4>
                  <div className="flex gap-3">
                    {techStack.map((tech) => (
                      <div key={tech.name} className="group relative">
                        <tech.icon className={`w-6 h-6 ${tech.color} transition-transform group-hover:scale-110`} />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                        >
                          {link.icon && <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                          <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Newsletter & Social */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get the latest updates, tutorials, and AI coding tips delivered to your inbox.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                    >
                      Subscribe Now
                    </button>
                  </form>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Connect with us</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${social.color} transition-all duration-200 hover:bg-gray-700`}
                        aria-label={social.name}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Happy Learners', value: '50K+', icon: FaGraduationCap },
                { label: 'Code Examples', value: '10K+', icon: FaCode },
                { label: 'Quizzes Taken', value: '100K+', icon: FaRocket },
                { label: 'Support Tickets', value: '24/7', icon: FaShieldAlt },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <stat.icon className="w-8 h-8 mx-auto text-blue-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CodeLearner. All rights reserved. Built with ❤️ for developers.
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex space-x-6 text-sm">
                  {footerLinks.legal.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <button
                  onClick={scrollToTop}
                  className={`fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                  aria-label="Back to top"
                >
                  <FaArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
