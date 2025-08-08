'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaArrowUp,
  FaDiscord,
  FaReddit,
  FaStackOverflow,
  FaCode,
  FaRobot,
  FaBrain,
  FaGraduationCap,
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaTrophy,
  FaHeart,
  FaRocket,
  FaZap,
  FaTarget,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaVolume2,
  FaVolumeX,
  FaHelpCircle,
  FaInfo,
  FaRegLightbulb,
  FaCrown,
  FaGem,
  FaMedal,
  FaAward,
  FaStar,
  FaFire,
  FaRegLightbulb as FaLightbulb
} from 'react-icons/fa'
import { 
  FiAward,
  FiStar,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiHeart,
  FiGift,
  FiCrown,
  FiCheckCircle,
  FiClock,
  FiBook,
  FiCode,
  FiUsers,
  FiFire,
  FiRocket,
  FiBrain,
  FiLightbulb,
  FiSettings,
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiHelpCircle,
  FiInfo
} from 'react-icons/fi'
import { useRef, useState, useEffect } from 'react'

export default function Footer() {
  const [isSticky, setIsSticky] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const aiFeatures = [
    { icon: <FaRobot className="w-5 h-5" />, name: 'AI Code Generator', desc: 'Generate code from natural language' },
    { icon: <FaBrain className="w-5 h-5" />, name: 'AI Learning Assistant', desc: 'Personalized learning guidance' },
    { icon: <FaGraduationCap className="w-5 h-5" />, name: 'AI Roadmap Generator', desc: 'Custom learning paths' },
    { icon: <FaUsers className="w-5 h-5" />, name: 'AI Collaboration', desc: 'Community learning features' },
    { icon: <FaBookOpen className="w-5 h-5" />, name: 'Smart Content Curation', desc: 'Personalized recommendations' },
    { icon: <FaChartLine className="w-5 h-5" />, name: 'AI Analytics', desc: 'Learning progress insights' }
  ]

  const learningResources = [
    { icon: <FiCode className="w-5 h-5" />, name: 'Interactive Coding', desc: 'Real-time code execution' },
    { icon: <FiBook className="w-5 h-5" />, name: 'Comprehensive Guides', desc: 'Step-by-step tutorials' },
    { icon: <FiTarget className="w-5 h-5" />, name: 'Practice Challenges', desc: 'Hands-on exercises' },
    { icon: <FiTrendingUp className="w-5 h-5" />, name: 'Progress Tracking', desc: 'Monitor your growth' },
    { icon: <FiAward className="w-5 h-5" />, name: 'Achievement System', desc: 'Gamified learning' },
    { icon: <FiUsers className="w-5 h-5" />, name: 'Community Support', desc: 'Learn with others' }
  ]

  const socialLinks = [
    { icon: <FaGithub />, name: 'GitHub', href: '#', color: 'hover:text-gray-300' },
    { icon: <FaTwitter />, name: 'Twitter', href: '#', color: 'hover:text-sky-400' },
    { icon: <FaLinkedin />, name: 'LinkedIn', href: '#', color: 'hover:text-blue-500' },
    { icon: <FaYoutube />, name: 'YouTube', href: '#', color: 'hover:text-red-500' },
    { icon: <FaDiscord />, name: 'Discord', href: '#', color: 'hover:text-indigo-400' },
    { icon: <FaReddit />, name: 'Reddit', href: '#', color: 'hover:text-orange-500' }
  ]

  return (
    <footer className={`bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden ${isSticky ? 'fixed bottom-0 left-0 w-full z-50 shadow-2xl' : ''}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link href="/" className="flex items-center gap-3 font-extrabold text-3xl text-white mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <FaRegLightbulb className="w-2 h-2 text-white" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CodeLearner
                </span>
            </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Master programming with AI-powered learning. Interactive tutorials, real-time coding, and personalized guidance to accelerate your development journey.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`text-gray-400 ${social.color} transition-all duration-300 text-xl p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Features Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaRobot className="text-blue-400" />
                AI Features
              </h3>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="text-blue-400 mt-0.5">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.name}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Learning Resources Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-green-400" />
                Learning Resources
              </h3>
              <div className="space-y-4">
                {learningResources.map((resource, index) => (
                  <motion.div
                    key={resource.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="text-green-400 mt-0.5">{resource.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{resource.name}</h4>
                      <p className="text-sm text-gray-400">{resource.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaRocket className="text-purple-400" />
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest AI learning features, coding tips, and community updates delivered to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <FaRegLightbulb className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubscribed ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaCheckCircle className="w-4 h-4" />
                      Subscribed!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaRocket className="w-4 h-4" />
                      Subscribe Now
                    </span>
                  )}
                </motion.button>
              </form>
              
              <p className="text-xs text-gray-400 mt-3">
                Join 10,000+ developers learning with AI
              </p>
            </motion.div>
            </div>
          </div>

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
            <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#ai-features" className="text-gray-400 hover:text-white transition-colors">AI Features</Link></li>
              <li><Link href="#learning-paths" className="text-gray-400 hover:text-white transition-colors">Learning Paths</Link></li>
              <li><Link href="#community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
          
            <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          
            <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-gray-400 text-sm">
                © 2024 CodeLearner. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI-Powered Learning Platform</span>
              </div>
            </div>
          </div>
        </motion.div>
          </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 z-50"
            aria-label="Back to top"
          >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
