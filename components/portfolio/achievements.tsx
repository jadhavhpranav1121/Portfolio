'use client'

import { useContent } from '@/lib/content'
import { Reveal, Section } from './primitives'

export function Achievements() {
  const { achievements } = useContent()
  return (
    <Section id="achievements">

      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal
            key={a.title}
            delay={i * 90}
            className="card-hover relative overflow-hidden rounded-xl border border-border bg-card p-7"
          >
            <span className="mono-label absolute right-5 top-5 text-muted-foreground">
              {a.tag}
            </span>
            <p className="font-mono text-5xl font-semibold tracking-tight text-foreground">
              {a.value}
            </p>
            <p className="mt-4 text-lg font-semibold tracking-tight">{a.title}</p>
            <p className="mono-label mt-1 text-primary">{a.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {a.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
