"use client"

import type React from "react"
import emailjs from "@emailjs/browser"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Instagram, Code, Database, Award, Mail, ExternalLink, Download, Menu, X, ChevronDown, Zap, Rocket, Globe, Shield, Cpu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"

// Dynamically import Three.js components with no SSR
const ThreeScene = dynamic(() => import("@/components/three-scene"), { ssr: false })

// Add Supabase client with error handling
let supabase: any = null

if (typeof window !== "undefined") {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = require("@supabase/supabase-js")
      supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
  } catch (error) {
    console.warn("Supabase not configured:", error)
  }
}

// Loading Screen Component
function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-400 rounded-full mx-auto mb-8"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
            >
              AVIJIT SINGH
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300"
            >
              Crafting Digital Excellence...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Advanced Custom Cursor
function AdvancedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.classList.contains("cursor-pointer")) {
        setIsHovering(true)
        setCursorVariant("hover")
      } else if (target.classList.contains("cursor-text")) {
        setCursorVariant("text")
      } else {
        setIsHovering(false)
        setCursorVariant("default")
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: cursorVariant === "text" ? "#10b981" : "#8b5cf6",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] border-2 border-purple-400/50 rounded-full"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
      />

      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9997] rounded-full bg-purple-400/10 blur-md"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      />
    </>
  )
}

// Advanced Navigation
function AdvancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95])

  // Add scroll listener to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: <Rocket className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Globe className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Cpu className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ]

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent"
          >
            AVIJIT SINGH
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-purple-400 hover:bg-slate-800/50"
                }`}
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-purple-400 cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-purple-500/20"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3"
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Enhanced Hero Section
function EnhancedHeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Avijit_Pratap_Singh_CV.pdf"
    link.download = "Avijit_Pratap_Singh_CV.pdf"
    link.click()
  }

  const openGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=avijitpratapsin@gmail.com`
    window.open(gmailUrl, "_blank")
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500/15 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight"
        >
          AVIJIT SINGH
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-300 font-bold">Full-Stack Developer & DevOps Engineer</h2>
          <div className="flex flex-wrap justify-center gap-4 text-lg text-purple-300">
            <span className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Flutter Expert
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              AWS Specialist
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              DevOps Engineer
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl mb-12 text-gray-400 max-w-4xl mx-auto leading-relaxed"
        >
          Transforming ideas into powerful digital solutions. I craft scalable applications and robust cloud
          infrastructures that drive business success in the modern digital landscape.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <Button
            onClick={scrollToProjects}
            className="px-10 py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-full text-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Explore My Work
          </Button>

          <Button
            onClick={downloadCV}
            variant="outline"
            className="px-10 py-6 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold rounded-full text-xl cursor-pointer transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-sm"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center space-x-8"
        >
          {[
            { href: "https://github.com/Aviijeet12", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/avijit-pratap-singh-587313252/", icon: ExternalLink, label: "LinkedIn" },
            { href: "https://www.instagram.com/avijitt.12/", icon: Instagram, label: "Instagram" },
            { href: "https://leetcode.com/u/avijit_1209/", icon: Code, label: "LeetCode" },
            { href: "https://www.geeksforgeeks.org/user/avijitpreekw/", icon: Database, label: "GeeksforGeeks" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="cursor-pointer group"
            >
              <div className="w-16 h-16 bg-slate-800/50 border border-purple-500/30 rounded-full shadow-2xl flex items-center justify-center group-hover:shadow-xl group-hover:border-purple-400 transition-all duration-300 transform group-hover:scale-110 backdrop-blur-sm">
                <social.icon className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </div>
            </motion.a>
          ))}
          <motion.button
            onClick={openGmail}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="cursor-pointer group"
          >
            <div className="w-16 h-16 bg-slate-800/50 border border-purple-500/30 rounded-full shadow-2xl flex items-center justify-center group-hover:shadow-xl group-hover:border-purple-400 transition-all duration-300 transform group-hover:scale-110 backdrop-blur-sm">
              <Mail className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors" />
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced About Section
function EnhancedAboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">About Me</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Passionate about creating digital experiences that matter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Developer & Innovator
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                I'm Avijit Pratap Singh, a passionate software developer who specializes in creating cutting-edge mobile
                applications and robust cloud infrastructures. With expertise in Flutter development and AWS services, I
                transform complex business requirements into elegant, scalable solutions.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                My journey in technology is driven by an insatiable curiosity and a commitment to excellence. I believe
                in the power of clean code, innovative architecture, and seamless user experiences that make a real
                difference in people's lives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              {
                icon: <Code className="w-16 h-16 text-purple-400" />,
                title: "Mobile Development",
                description: "Flutter & Cross-platform Solutions",
                color: "purple",
              },
              {
                icon: <Database className="w-16 h-16 text-blue-400" />,
                title: "DevOps Engineering",
                description: "CI/CD & Infrastructure Automation",
                color: "blue",
              },
              {
                icon: <Award className="w-16 h-16 text-yellow-400" />,
                title: "Cloud Architecture",
                description: "AWS & Scalable Solutions",
                color: "yellow",
              },
              {
                icon: <Shield className="w-16 h-16 text-green-400" />,
                title: "Problem Solving",
                description: "Algorithmic & System Design",
                color: "green",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-purple-500/20 h-full hover:border-purple-400/40 transition-all duration-300 cursor-pointer backdrop-blur-sm group-hover:transform group-hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h4 className="text-white font-bold text-xl mb-3">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Skills Section
function EnhancedSkillsSection() {
  const skills = [
    { name: "Flutter", level: 95, icon: "📱", color: "from-blue-400 to-cyan-400" },
    { name: "AWS", level: 90, icon: "☁️", color: "from-orange-400 to-red-400" },
    { name: "DevOps", level: 88, icon: "⚙️", color: "from-green-400 to-emerald-400" },
    { name: "Docker", level: 85, icon: "🐳", color: "from-blue-400 to-indigo-400" },
    { name: "Kubernetes", level: 82, icon: "⚓", color: "from-purple-400 to-pink-400" },
    { name: "CI/CD", level: 87, icon: "🔄", color: "from-yellow-400 to-orange-400" },
    { name: "MySQL", level: 85, icon: "🗄️", color: "from-blue-400 to-green-400" },
    { name: "Kotlin", level: 83, icon: "🎯", color: "from-purple-400 to-blue-400" },
  ]

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">Skills & Expertise</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Mastering the technologies that power modern applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="text-white font-bold text-2xl">{skill.name}</h3>
                  </div>
                  <span className="text-purple-400 font-bold text-xl">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-gradient-to-r ${skill.color} h-4 rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Projects Section
function EnhancedProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Flutter App",
      description:
        "A comprehensive e-commerce platform built with Flutter, featuring advanced user authentication, real-time inventory management, secure payment processing, and AI-powered product recommendations.",
      tech: ["Flutter", "Firebase", "Stripe API", "Provider", "AI/ML"],
      image: "/placeholder.svg?height=400&width=600",
      category: "Mobile App",
      status: "Live",
    },
    {
      title: "AWS Infrastructure Automation",
      description:
        "Enterprise-grade infrastructure automation solution using Terraform and advanced CI/CD pipelines, reducing deployment time by 80% and ensuring zero-downtime deployments across multiple environments.",
      tech: ["AWS", "Terraform", "Jenkins", "Docker", "Kubernetes"],
      image: "/placeholder.svg?height=400&width=600",
      category: "DevOps",
      status: "Production",
    },
    {
      title: "Flutter Task Management Suite",
      description:
        "A sophisticated productivity application with real-time collaboration, offline-first architecture, advanced analytics, and beautiful micro-interactions. Features team management and AI-powered task prioritization.",
      tech: ["Flutter", "SQLite", "Provider", "Firebase", "WebRTC"],
      image: "/placeholder.svg?height=400&width=600",
      category: "Mobile App",
      status: "Beta",
    },
    {
      title: "Kubernetes Monitoring Platform",
      description:
        "Custom monitoring and observability platform for Kubernetes clusters with real-time metrics, intelligent alerting, automated scaling, and comprehensive security monitoring with ML-based anomaly detection.",
      tech: ["Kubernetes", "Prometheus", "Grafana", "Go", "Machine Learning"],
      image: "/placeholder.svg?height=400&width=600",
      category: "DevOps",
      status: "Live",
    },
  ]

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">Featured Projects</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Showcasing innovative solutions that drive business success
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-500 cursor-pointer backdrop-blur-sm group-hover:transform group-hover:scale-105 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-purple-500/80 text-white border-0">{project.category}</Badge>
                    <Badge className="bg-green-500/80 text-white border-0">{project.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 transition-colors text-sm px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Certifications Section
function EnhancedCertificationsSection() {
  const certifications = [
    {
      title: "IBM DevOps Professional Certificate",
      issuer: "IBM",
      description:
        "Comprehensive DevOps practices including advanced CI/CD pipelines, containerization strategies, microservices architecture, and cloud-native deployment methodologies.",
      icon: <Award className="w-12 h-12 text-blue-400" />,
      date: "2024",
      credentialId: "IBM-DEVOPS-2024",
    },
    {
      title: "Oracle Cloud Infrastructure GenAI Professional",
      issuer: "Oracle",
      description:
        "Advanced expertise in generative AI services, machine learning model deployment, and AI-powered application development on Oracle Cloud Infrastructure platform.",
      icon: <Database className="w-12 h-12 text-red-400" />,
      date: "2024",
      credentialId: "OCI-GENAI-2024",
    },
    {
      title: "Oracle Cloud Infrastructure Architect Associate",
      issuer: "Oracle",
      description:
        "Cloud architecture design, implementation, and management expertise covering compute, storage, networking, security, and governance on Oracle Cloud Infrastructure.",
      icon: <Code className="w-12 h-12 text-orange-400" />,
      date: "2023",
      credentialId: "OCI-ARCH-2023",
    },
  ]

  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">Certifications</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Validated expertise in cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-purple-500/20 h-full hover:border-purple-400/40 transition-all duration-300 cursor-pointer backdrop-blur-sm group-hover:transform group-hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {cert.icon}
                  </div>
                  <CardTitle className="text-white text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {cert.title}
                  </CardTitle>
                  <CardDescription className="text-purple-300 font-semibold text-lg">{cert.issuer}</CardDescription>
                  <div className="text-gray-400 text-sm mt-2">
                    Issued: {cert.date} • ID: {cert.credentialId}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Contact Section
function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs.send(
      "service_xps0rgh",
      "template_n0w2xve",
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "j5LT7kltMPmABktrQ"
    )
      .then(
        (result) => {
          setFormData({ name: "", email: "", subject: "", message: "" })
          setSubmitStatus("success")
        },
        (error) => {
          setSubmitStatus("error")
          console.error("EmailJS error:", error)
        }
      )
      .finally(() => {
        setIsSubmitting(false)
        setTimeout(() => setSubmitStatus("idle"), 3000)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">Let's Connect</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to bring your next project to life? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, innovative projects, and potential collaborations.
                Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from
                you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                <Mail className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-gray-300">avijitpratapsin@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                <Globe className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-gray-300">Available Worldwide (Remote)</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-white font-semibold">Response Time</div>
                  <div className="text-gray-300">Within 24 hours</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-3 text-lg">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white focus:border-purple-400 h-12 text-lg cursor-text"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-3 text-lg">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white focus:border-purple-400 h-12 text-lg cursor-text"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-semibold mb-3 text-lg">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white focus:border-purple-400 h-12 text-lg cursor-text"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-3 text-lg">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-slate-700/50 border-purple-500/30 text-white focus:border-purple-400 text-lg cursor-text"
                      placeholder="Tell me about your project, goals, and how I can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 text-lg cursor-pointer transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-6 h-6 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center text-green-400 font-semibold"
                      >
                        Message sent successfully! I'll get back to you soon!
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center text-red-400 font-semibold"
                      >
                        Something went wrong. Please try again or contact me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Footer
function EnhancedFooter() {
  return (
    <footer className="relative py-8 overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-purple-500/20 pt-8"
          >
            <p className="text-gray-400 text-lg">
              © 2024 Avijit Pratap Singh. Crafted with passion, powered by innovation.
            </p>
            <p className="text-gray-500 mt-2">Built with Next.js, Three.js, and a lot of ☕</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

// Scroll to section helper
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// Main Portfolio Component
export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [hasThreeError, setHasThreeError] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Error handler for Three.js
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes("three") || event.message?.includes("canvas")) {
        setHasThreeError(true)
        console.warn("Three.js error detected, falling back to 2D mode")
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden" style={{ cursor: "none" }}>
      <LoadingScreen isLoading={isLoading} />
      <AdvancedCursor />
      <ScrollProgress />
      {!hasThreeError && <ThreeScene />}
      <AdvancedNavigation />
      <EnhancedHeroSection />
      <EnhancedAboutSection />
      <EnhancedSkillsSection />
      <EnhancedProjectsSection />
      <EnhancedCertificationsSection />
      <EnhancedContactSection />
      <EnhancedFooter />
    </div>
  )
}
