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

export default function FooterModern() {
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
