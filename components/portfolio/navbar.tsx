'use client'

import { useEffect, useMemo, useState } from 'react'
import { Command, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useContent, useVisibleSections } from '@/lib/content'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { OPEN_PALETTE_EVENT } from './command-palette'

export function Navbar() {
  const { profile } = useContent()
  const sections = useVisibleSections()
  const navLinks = useMemo(
    () => [
      { label: 'Home', href: '#home' },
      ...sections.map((s) => ({ label: s.nav, href: `#${s.id}` })),
    ],
    [sections],
  )
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [navLinks])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const openPalette = () =>
    window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between gap-4 rounded-xl border px-4 py-2.5 transition-all duration-300',
          scrolled
            ? 'border-border bg-background/70 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-mono text-lg font-bold tracking-tight text-foreground"
          aria-label="Pranav Jadhav — home"
        >
          {profile.initials}
          <span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive ? (
                    <span className="absolute inset-0 -z-10 rounded-md bg-secondary" />
                  ) : null}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" aria-hidden />
            <span className="mono-label">K</span>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="GitHub profile"
          >
            <GithubIcon className="size-[18px]" aria-hidden />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="size-[18px]" aria-hidden />
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-4px_var(--glow)] transition-all hover:brightness-110 sm:inline-flex"
          >
            Resume
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute left-4 right-4 top-[4.5rem] rounded-xl border border-border bg-popover/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Download Resume
          </a>
        </div>
      ) : null}
    </header>
  )
}
