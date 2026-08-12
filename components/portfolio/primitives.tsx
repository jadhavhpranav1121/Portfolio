'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/use-reveal'

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

export function Section({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-20 sm:py-28', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHeader({
  index,
  total,
  eyebrow,
  title,
  description,
}: {
  index: string
  total: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3">
        <span className="mono-label text-primary">{eyebrow}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="mono-label text-muted-foreground">
          {index} / {total}
        </span>
      </div>
      <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
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
