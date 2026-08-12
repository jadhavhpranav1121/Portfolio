'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react'
import { heroTech, profile } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { HeroDiagram } from './hero-diagram'
import { TechBadge } from './primitives'

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const el = glowRef.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* mouse-following glow + grid */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              'radial-gradient(500px circle at var(--mx, 50%) var(--my, 30%), oklch(0.62 0.2 274 / 0.12), transparent 60%)',
          }}
        />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-28">
        <div>
          <div className="reveal is-visible inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground">
              Software Engineer at{' '}
              <span className="text-foreground">Emerson</span>
            </span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Software Engineer building{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-indigo-300 bg-clip-text text-transparent text-glow">
              scalable backend systems.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            I&apos;m {profile.name}, specializing in Java, Spring Boot, distributed
            systems and modern web applications. I enjoy solving performance,
            concurrency and reliability problems in production systems.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Core technologies">
            {heroTech.map((t) => (
              <li key={t}>
                <TechBadge>{t}</TechBadge>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_28px_-6px_var(--glow)] transition-all hover:brightness-110"
            >
              View My Work
              <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <Download className="size-4" aria-hidden />
              Download Resume
            </a>
          </div>

          <div className="mt-7 flex items-center gap-5 text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" aria-hidden /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-4" aria-hidden /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden /> Email
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>

        <div className="reveal is-visible">
          <HeroDiagram />
        </div>
      </div>
    </section>
  )
}
