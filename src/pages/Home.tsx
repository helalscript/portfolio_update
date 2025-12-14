import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { BlogSection } from '@/components/sections/BlogSection'
import { Contact } from '@/components/sections/Contact'

export function Home() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <main>
            <Hero onNavigate={scrollToSection} />
            <Projects />
            <Experience />
            <Skills />
            <BlogSection />
            <Contact />
        </main>
    )
}
