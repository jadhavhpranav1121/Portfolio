'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/use-reveal'
import { useVisibleSections } from '@/lib/content'
import type { SectionId } from '@/lib/data'
import { Markdown } from './markdown'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: React.ElementType
}) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/**
 * A page section driven by content: heading, intro and visibility come from
 * the matching `sections` entry (content/sections/NN-<id>.md). Hidden sections
 * render nothing.
 */
export function Section({
  id,
  children,
  className,
  intro = true,
}: {
  id: SectionId
  children: ReactNode
  className?: string
  /** Set false when the section renders its intro Markdown itself. */
  intro?: boolean
}) {
  const sections = useVisibleSections()
  const index = sections.findIndex((s) => s.id === id)
  if (index === -1) return null
  const section = sections[index]

  return (
    <section id={id} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 sm:mb-14">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mono-label text-primary">{section.eyebrow}</span>
          </div>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {intro ? (
            <Markdown className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {section.intro}
            </Markdown>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
      {children}
    </span>
  )
}

export function MonoTag({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'mono-label inline-flex items-center gap-1.5 text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function MetricArrow({
  before,
  after,
  note,
}: {
  before?: string
  after?: string
  note?: string
}) {
  if (note) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-xs font-medium text-primary">
        {note}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm">
      <span className="text-muted-foreground line-through decoration-destructive/60">
        {before}
      </span>
      <span aria-hidden className="text-primary">
        →
      </span>
      <span className="font-semibold text-foreground">{after}</span>
    </span>
  )
}
