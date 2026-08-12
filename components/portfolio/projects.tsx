import { ArrowUpRight, Lock } from 'lucide-react'
import { projects, type Project } from '@/lib/data'
import { Reveal, Section, SectionHeader, TechBadge } from './primitives'
import { GithubIcon } from './brand-icons'

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
  const earlier = projects.filter((p) => !p.featured)

  return (
    <Section id="projects">
      <SectionHeader
        index="05"
        total="08"
        eyebrow="PROJECTS"
        title="Featured & earlier work"
        description="My strongest engineering work lives in production systems at Emerson. Here is how that maps, alongside earlier projects that show the progression."
      />

      {/* Featured production work pointer */}
      <Reveal className="mb-10 overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.06]">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-background/40 px-2.5 py-1">
              <Lock className="size-3 text-primary" aria-hidden />
              <span className="mono-label text-primary">FEATURED · PRODUCTION</span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Event-driven campaign & meeting platform
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Multi-tenant Spring Boot services with Kafka event pipelines,
              transactional outbox, Redis caching and an Angular frontend — the
              engineering detail lives in the Experience and Engineering
              Highlights sections above.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Angular', 'AWS'].map(
                (t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ),
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="#engineering"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              See highlights
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="mb-5 flex items-center gap-3">
        <span className="mono-label text-muted-foreground">EARLIER PROJECTS</span>
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
