import { Navbar } from '@/components/portfolio/navbar'
import { CommandPalette } from '@/components/portfolio/command-palette'
import { Hero } from '@/components/portfolio/hero'
import { Experience } from '@/components/portfolio/experience'
import { CaseStudies } from '@/components/portfolio/case-studies'
import { Architecture } from '@/components/portfolio/architecture'
import { Skills } from '@/components/portfolio/skills'
import { Projects } from '@/components/portfolio/projects'
import { Achievements } from '@/components/portfolio/achievements'
import { About } from '@/components/portfolio/about'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export default function Page() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <Experience />
        <CaseStudies />
        <Architecture />
        <Skills />
        <Projects />
        <Achievements />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
