'use client'

import { ArrowUpRight, Lock } from 'lucide-react'
import { type Project } from '@/lib/data'
import { useContent } from '@/lib/content'
import { Reveal, Section, TechBadge } from './primitives'
import { GithubIcon } from './brand-icons'
import { Markdown } from './markdown'

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="card-hover group flex flex-col rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold tracking-tight">{project.name}</h4>
          <span className="mono-label mt-1 block text-primary">{project.focus}</span>
        </div>
        <div className="flex gap-1">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={`${project.name} live demo`}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={`${project.name} on GitHub`}
          >
            <GithubIcon className="size-4" aria-hidden />
          </a>
        ) : null}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {project.tech.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>
    </Reveal>
  )
}

export function Projects() {
  const { projects, featured } = useContent()
  const earlier = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <Section id="projects">

      <Reveal className="mb-10 rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="mono-label inline-flex items-center gap-1.5 text-primary">
              <Lock className="size-3" aria-hidden /> {featured.label}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{featured.title}</h3>
            <Markdown className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {featured.body}
            </Markdown>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.tech.map((t) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
            </div>
          </div>
          {featured.cta.label ? (
            <a
              href={featured.cta.href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {featured.cta.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </Reveal>

      <Reveal className="mb-5 flex items-center gap-3">
        <span className="mono-label text-muted-foreground">Personal projects</span>
        <span className="h-px flex-1 bg-border" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earlier.map((p, i) => (
          <ProjectCard key={p.name} project={p} delay={(i % 3) * 70} />
        ))}
      </div>
    </Section>
  )
}
