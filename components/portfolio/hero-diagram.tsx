'use client'

import { Cloud, Database, Layers, Server, Users, Workflow } from 'lucide-react'

const nodes = [
  { label: 'Client', sub: 'Angular', icon: Users, tag: 'HTTP' },
  { label: 'API Gateway', sub: 'Spring Cloud', icon: Workflow, tag: 'JWT' },
  { label: 'Spring Boot', sub: 'Services', icon: Server, tag: 'REST' },
  { label: 'Kafka', sub: 'Event Bus', icon: Layers, tag: 'EVENTS' },
  { label: 'Workers', sub: 'Consumers', icon: Cloud, tag: 'ASYNC' },
  { label: 'PostgreSQL / Redis', sub: 'Persistence · Cache', icon: Database, tag: 'STATE' },
]

export function HeroDiagram() {
  return (
    <div
      className="relative w-full rounded-xl border border-border bg-card p-4 sm:p-5"
      aria-label="Distributed system request flow: Client to API Gateway to Spring Boot to Kafka to Workers to PostgreSQL and Redis"
      role="img"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="mono-label text-muted-foreground">SYSTEM.FLOW</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          LIVE
        </span>
      </div>

      <ul className="grid gap-2">
        {nodes.map((n, i) => {
          const Icon = n.icon
          return (
            <li key={n.label}>
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
