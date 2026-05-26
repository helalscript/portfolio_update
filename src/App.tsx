import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { Home } from '@/pages/Home'
import { AllBlogs } from '@/pages/AllBlogs'
import { SingleBlog } from '@/pages/SingleBlog'
import { SingleProject } from '@/pages/SingleProject'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { SkillsPage } from '@/pages/SkillsPage'
import { ContactPage } from '@/pages/ContactPage'
import { useState, useEffect } from 'react'
import './index.css'

import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { PageBackground } from '@/components/ui/PageBackground'

function AppWrapper() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation handler
  const scrollToSection = () => {
    // In multi-page setup, Navbar handles routing, so this might be redundant 
    // unless we want to keep scroll functionality on the home page.
    // For now, keeping it basic.
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <PageBackground />
      <Navbar isScrolled={isScrolled} activeSection={activeSection} onNavigate={scrollToSection} />
      <div className="relative z-10 flex-grow pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/project/:id" element={<SingleProject />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <LanguageProvider defaultLanguage="en" storageKey="portfolio-language">
        <Router>
          <AppWrapper />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
