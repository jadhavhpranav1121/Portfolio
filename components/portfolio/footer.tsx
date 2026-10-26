'use client'

import { Mail } from 'lucide-react'
import { useContent } from '@/lib/content'
import { GithubIcon, LinkedinIcon } from './brand-icons'

export function Footer() {
  const { profile, footer } = useContent()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a
            href="#home"
            className="font-mono text-lg font-bold tracking-tight"
            aria-label="Back to top"
          >
            {profile.initials}
            <span className="text-primary">.</span>
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            Designed &amp; built by {profile.name}.
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="GitHub"
            >
              <GithubIcon className="size-[18px]" aria-hidden />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-[18px]" aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="size-[18px]" aria-hidden />
            </a>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
