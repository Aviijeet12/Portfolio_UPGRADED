"use client"

import type React from "react"
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
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection("home")}
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
                  onClick={() => {
                    setIsOpen(false)
                    setActiveSection(item.id)
                    setTimeout(() => {
                      const el = document.getElementById(item.id)
                      if (el) el.scrollIntoView({ behavior: "smooth" })
                    }, 200)
                  }}
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

  const goToGithub = () => {
    window.open("https://github.com/Aviijeet12", "_blank")
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/AVIJIT-SWD.pdf"
    link.download = "AVIJIT-SWD.pdf"
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
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight break-words"
        >
          AVIJIT SINGH
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-300 font-bold">Software Developer • Full-Stack / Backend Engineering</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-base xs:text-lg sm:text-lg text-purple-300">
            <span className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              MERN
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              AWS 
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              DevOps
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-400 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed"
        >
          Transforming ideas into powerful digital solutions. I craft scalable applications and robust cloud
          infrastructures that drive business success in the modern digital landscape.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-16 w-full"
        >
          <Button
            onClick={goToGithub}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-full text-base sm:text-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Explore My Work
          </Button>

          <Button
            onClick={downloadCV}
            variant="outline"
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold rounded-full text-base sm:text-xl cursor-pointer transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-sm"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {[
            { href: "https://github.com/Aviijeet12", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/avijit-pratap-singh-587313252/", icon: ExternalLink, label: "LinkedIn" },
            //{ href: "https://www.instagram.com/avijitt.12/", icon: Instagram, label: "Instagram" },
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
                <social.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300 group-hover:text-purple-400 transition-colors" />
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
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300 group-hover:text-purple-400 transition-colors" />
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={() => {
              const el = document.getElementById("about")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
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
            I Like Building Stuff and DSA
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
                Software Developer
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                I'm Avijit Pratap Singh, a passionate software developer who specializes in creating cutting-edge mobile
                applications and robust cloud infrastructures. With expertise in Application development and AWS services, I
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
                title: "Application Development",
                description: "MERN Stack Applications",
                color: "purple",
              },
              {
                icon: <Database className="w-16 h-16 text-blue-400" />,
                title: "DevOps",
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
                description: "DSA & System Design",
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
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "</>",
      signal: "Compiler-friendly + scripting",
      description: "Typed and scripting languages for performant apps and automation.",
      accent: "from-pink-500/20 via-purple-500/10 to-transparent",
      skills: ["Dart", "Java", "Kotlin", "C++", "Python", "SQL"],
    },
    {
      title: "Mobile & Frontend",
      icon: "📱",
      signal: "Immersive UI systems",
      description: "Shipping fluid Android and web experiences with shared design systems.",
      accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
      skills: ["Flutter", "Android", "Jetpack Compose", "HTML", "CSS", "JavaScript", "React"],
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      signal: "Scalable delivery pipelines",
      description: "Automating releases, infra as code, and observability across clouds.",
      accent: "from-sky-500/20 via-emerald-500/10 to-transparent",
      skills: ["AWS", "OCI", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD"],
    },
    {
      title: "Backend & Databases",
      icon: "🗄️",
      signal: "API + data layer craft",
      description: "Designing resilient services with pragmatic persistence strategies.",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      skills: ["REST APIs", "Node.js", "Express", "MySQL", "PostgreSQL", "Firebase", "Supabase"],
    },
    {
      title: "Tools & Platforms",
      icon: "🛠️",
      signal: "Daily engineering cockpit",
      description: "Editor, OS, and collaboration stack that keeps delivery fast.",
      accent: "from-lime-500/20 via-teal-500/10 to-transparent",
      skills: ["Git", "GitHub", "Linux", "VS Code", "Android Studio", "IntelliJ"],
    },
    {
      title: "Other",
      icon: "🧠",
      signal: "Systems thinking",
      description: "Product discovery, architecture, and algorithmic problem solving.",
      accent: "from-fuchsia-500/20 via-rose-500/10 to-transparent",
      skills: ["Data Structures & Algorithms", "OOP", "System Design", "Problem Solving"],
    },
  ]

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Skills</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A snapshot of the technologies and tools I use to build scalable, production-ready solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative h-full overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.accent}`}
                />
                <div className="absolute inset-px rounded-[22px] bg-slate-900/80" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 mb-2">
                        {category.signal}
                      </p>
                      <CardTitle className="text-white text-xl md:text-2xl font-semibold">
                        {category.title}
                      </CardTitle>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-lg">
                      {category.icon}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 3).map((skill) => (
                      <span
                        key={`${category.title}-featured-${skill}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {category.skills.map((skill) => (
                      <div key={`${category.title}-${skill}`} className="flex items-center gap-2 text-sm text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                        {skill}
                      </div>
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

// Enhanced Projects Section
function EnhancedProjectsSection() {
  const projects = [
    {
      title: "AstraQA — Full-Stack QA Automation Assistant",
      description:
        "A robust QA platform that builds a knowledge base from documentation, generates automated test cases using RAG + LLMs, and produces Selenium automation scripts. Includes user auth and dashboard.",
      tech: [
        "Next.js 16",
        "React 19",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Prisma ORM",
        "PostgreSQL",
        "NextAuth",
        "Vercel",
        "LLaMA 2",
        "Supabase",
        "Hugging Face Inference API"
      ],
      category: "AI Test Automation",
      status: "Active",
      link: "https://astra.avijitsingh.dev",
    },
    {
      title: "Healthcare Symptom Checker — AI-Driven Symptom Insight Tool",
      description:
        "A symptom analyzer that receives free-form text symptoms and returns likely conditions and general recommendations via an LLM-powered backend.",
      tech: [
        "Next.js 15",
        "AWS Lambda",
        "API Gateway",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Hugging Face Inference API",
        "Redis",
        "Vercel",
        "Flask"
      ],
      category: "Healthcare AI",
      status: "Active",
      link: "https://hsc.avijitsingh.dev",
    },
    {
      title: "Spotify Playlist Rater — Music Playlist Analysis Platform",
      description:
        "An application that rates and analyzes Spotify playlists through authenticated API access to provide insights on track features and user data.",
      tech: [
        "Next.js",
        "Node.js",
        "TypeScript",
        "OpenAI API",
        "Spotify API"
      ],
      category: "Music Analytics",
      status: "Active",
      link: "https://spotify.avijitsingh.dev",
    },
    {
      title: "EMS — Employee Task Management System",
      description:
        "A web app for managing employee accounts and tasks with secure login, role-based dashboards, and real-time task tracking.",
      tech: [
        "Next.js (React + TypeScript)",
        "CSS",
        "MongoDB",
        "Mongoose",
        "JWT Authentication",
        "Backend API routes (Next.js)",
        "Context API"
      ],
      category: "Management Platform",
      status: "Active",
      link: "https://ems.avijitsingh.dev",
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
              <Card className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 cursor-pointer backdrop-blur-sm group-hover:transform group-hover:scale-105 h-full">
                <div className="flex items-start justify-between gap-4 p-6 pb-2">
                  <div>
                    <Badge className="bg-purple-500/80 text-white border-0 mb-2">{project.category}</Badge>
                    <Badge className="bg-green-500/80 text-white border-0 mb-2 ml-2">{project.status}</Badge>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/70 border border-white/30 hover:border-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
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
      date: "2025",
      credentialId: "1SckikiMEo",
    },
    {
      title: "Oracle Cloud Infrastructure GenAI Professional",
      issuer: "Oracle",
      description:
        "Advanced expertise in generative AI services, machine learning model deployment, and AI-powered application development on Oracle Cloud Infrastructure platform.",
      icon: <Database className="w-12 h-12 text-red-400" />,
      date: "2025",
      credentialId: "101988911OCI25GAIOCP",
    },
    {
      title: "Oracle Cloud Infrastructure Architect Associate",
      issuer: "Oracle",
      description:
        "Cloud architecture design, implementation, and management expertise covering compute, storage, networking, security, and governance on Oracle Cloud Infrastructure.",
      icon: <Code className="w-12 h-12 text-orange-400" />,
      date: "2025",
      credentialId: "101988911OCI25CAA",
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
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitStatus("success")
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
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

// Main Portfolio Component
export default function Portfolio() {
  const [hasThreeError, setHasThreeError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes("three") || event.message?.includes("canvas")) {
        setHasThreeError(true)
        console.warn("Three.js error detected, falling back to 2D mode")
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <ScrollProgress />
      {!hasThreeError && <ThreeScene />}
      <AdvancedNavigation />
      <EnhancedHeroSection />
      <EnhancedAboutSection />
      <EnhancedSkillsSection />
      <EnhancedProjectsSection />
      <EnhancedCertificationsSection />
      <EnhancedContactSection />
    </div>
  )
}
