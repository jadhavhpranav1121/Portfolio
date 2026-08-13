'use client'

import { MapPin } from 'lucide-react'
import { useContent } from '@/lib/content'
import { cn } from '@/lib/utils'
import { MetricArrow, Reveal, Section, SectionHeader } from './primitives'

export function Experience() {
  const { impactGroups, profile } = useContent()
  return (
    <Section id="experience">
      <SectionHeader
        index="01"
        total="08"
        eyebrow="EXPERIENCE"
        title="Building production software"
        description="A single role, gone deep. Instead of a wall of resume bullets, here is the engineering work grouped by the problems it solved."
      />

      <Reveal className="mb-10 overflow-hidden rounded-xl border border-border bg-card/60">
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {profile.company}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Software Engineer — Full Stack ·{' '}
              <span className="text-foreground">Promoted from Intern, Jul 2023</span>
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
              {profile.tenure}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <MapPin className="size-3" aria-hidden /> {profile.location}
            </span>
          </div>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2">
          {impactGroups.map((group, i) => (
            <div
              key={group.tag}
              className={cn(
                'bg-card p-6 transition-colors hover:bg-secondary/30',
                // keep the grid flush when the group count is odd
                i === impactGroups.length - 1 &&
                  impactGroups.length % 2 === 1 &&
                  'sm:col-span-2',
              )}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="mono-label text-primary">{group.tag}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-foreground">{item.name}</p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                    {item.metric ? (
                      <div className="mt-3">
                        <MetricArrow {...item.metric} />
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
