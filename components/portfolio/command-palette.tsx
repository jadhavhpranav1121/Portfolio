'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Cpu,
  FileText,
  FolderGit2,
  Layers,
  Mail,
  Search,
  Trophy,
  User,
  Wrench,
} from 'lucide-react'
import { useContent, useVisibleSections } from '@/lib/content'
import type { SectionId } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from './brand-icons'

type Command = {
  label: string
  hint: string
  icon: React.ElementType
  run: () => void
}

const SECTION_ICONS: Partial<Record<SectionId, React.ElementType>> = {
  experience: Briefcase,
  engineering: Cpu,
  architecture: Layers,
  skills: Wrench,
  projects: FolderGit2,
  achievements: Trophy,
  about: User,
  contact: Mail,
}

export const OPEN_PALETTE_EVENT = 'open-command-palette'

export function CommandPalette() {
  const { profile } = useContent()
  const sections = useVisibleSections()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const go = useCallback((hash: string) => {
    setOpen(false)
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const open_ = useCallback((url: string) => {
    setOpen(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const commands: Command[] = useMemo(
    () => [
      ...sections.map((s) => ({
        label: `Go to ${s.nav}`,
        hint: 'section',
        icon: SECTION_ICONS[s.id] ?? ArrowRight,
        run: () => go(`#${s.id}`),
      })),
      { label: 'Open GitHub', hint: 'external', icon: GithubIcon, run: () => open_(profile.github) },
      { label: 'Open LinkedIn', hint: 'external', icon: LinkedinIcon, run: () => open_(profile.linkedin) },
      { label: 'Download / View Resume', hint: 'external', icon: FileText, run: () => open_(profile.resume) },
    ],
    [go, open_, profile, sections],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        aria-label="Close command palette"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, filtered.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter') {
                e.preventDefault()
                filtered[active]?.run()
              }
            }}
            placeholder="Type a command or search..."
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
          <kbd className="mono-label rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            ESC
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No commands found.
            </li>
          ) : (
            filtered.map((c, i) => {
              const Icon = c.icon
              return (
                <li key={c.label}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => c.run()}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active
                        ? 'bg-primary/15 text-foreground'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                    <span className="flex-1">{c.label}</span>
                    <span className="mono-label text-muted-foreground/70">{c.hint}</span>
                    {i === active ? (
                      <ArrowRight className="size-3.5 text-primary" aria-hidden />
                    ) : null}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
