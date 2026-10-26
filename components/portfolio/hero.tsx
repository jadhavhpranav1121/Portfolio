'use client'

import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react'
import { useContent } from '@/lib/content'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { HeroDiagram } from './hero-diagram'
import { Markdown } from './markdown'
import { TechBadge } from './primitives'

export function Hero() {
  const { hero, profile } = useContent()

  return (
    <section id="home" className="relative pt-32 sm:pt-40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-28">
        <div>
          {hero.badge ? (
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {hero.badge}
            </p>
          ) : null}

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {hero.headline} <span className="text-primary">{hero.highlight}</span>
          </h1>

          <Markdown className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {hero.intro}
          </Markdown>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Core technologies">
            {hero.tech.map((t) => (
              <li key={t}>
                <TechBadge>{t}</TechBadge>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              {hero.primaryCta.label}
              <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <Download className="size-4" aria-hidden />
              {hero.resumeLabel}
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
