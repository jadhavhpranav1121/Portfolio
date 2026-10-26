'use client'

import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { useContent } from '@/lib/content'
import { Reveal, Section } from './primitives'

export function Contact() {
  const { profile, contact } = useContent()
  return (
    <Section id="contact">

      <Reveal className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <div className="flex flex-col items-center gap-8 px-6 py-14 text-center sm:px-10">
          {contact.status ? (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-1.5 rounded-full bg-[oklch(0.72_0.17_150)]" aria-hidden />
              {contact.status}
            </span>
          ) : null}

          <h3 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {contact.headline}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
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
