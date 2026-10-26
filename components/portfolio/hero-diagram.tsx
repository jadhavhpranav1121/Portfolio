'use client'

import { useContent } from '@/lib/content'
import { iconFor } from './icons'

export function HeroDiagram() {
  const { hero } = useContent()
  const nodes = hero.flow
  if (!nodes.length) return null
  return (
    <div
      className="relative w-full rounded-xl border border-border bg-card/60 p-4 sm:p-5"
      aria-label={`${hero.flowTitle}: ${nodes.map((n) => n.label).join(' → ')}`}
      role="img"
    >
      {hero.flowTitle ? (
        <p className="mb-4 mono-label text-muted-foreground">{hero.flowTitle}</p>
      ) : null}

      <ul className="grid gap-2">
        {nodes.map((n, i) => {
          const Icon = iconFor(n.icon)
          return (
            <li key={n.label + i}>
              <div className="group flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 transition-colors hover:border-primary/40">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {n.label}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {n.sub}
                  </p>
                </div>
                <span className="mono-label rounded border border-border px-1.5 py-0.5 text-muted-foreground">
                  {n.tag}
                </span>
              </div>
              {i < nodes.length - 1 ? (
                <div className="flex justify-start pl-[1.9rem]" aria-hidden>
                  <svg width="2" height="14" viewBox="0 0 2 14" className="overflow-visible">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="14"
                      stroke="var(--primary)"
                      strokeWidth="1.5"
                      className="flow-line"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
