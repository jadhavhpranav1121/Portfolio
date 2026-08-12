import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { profile } from '@/lib/data'
import { Reveal, Section, SectionHeader } from './primitives'

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeader
        index="08"
        total="08"
        eyebrow="CONTACT"
        title="Let's talk"
        description="I'm interested in opportunities involving Java, Spring Boot, backend systems, distributed systems and full-stack engineering."
      />

      <Reveal className="overflow-hidden rounded-2xl border border-border bg-card/60 bg-grid">
        <div className="flex flex-col items-center gap-8 px-6 py-14 text-center sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="mono-label text-primary">
              SYSTEM.STATUS · OPEN TO SE OPPORTUNITIES
            </span>
          </div>

          <h3 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Building something that needs to be reliable under load? Let&apos;s
            connect.
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_28px_-6px_var(--glow)] transition-all hover:brightness-110"
            >
              <Mail className="size-4" aria-hidden />
              Email Me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <LinkedinIcon className="size-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <GithubIcon className="size-4" aria-hidden />
              GitHub
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden /> {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 font-mono transition-colors hover:text-foreground"
            >
              {profile.email}
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
