'use client'

import { Fragment } from 'react'
import { Boxes } from 'lucide-react'
import { useContent } from '@/lib/content'
import { cn } from '@/lib/utils'
import { iconFor } from './icons'
import { Reveal, Section } from './primitives'

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <svg width="2" height="26" viewBox="0 0 2 26" className="overflow-visible">
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="26"
          stroke="var(--primary)"
          strokeWidth="1.5"
          className="flow-line"
          opacity="0.55"
        />
      </svg>
      {label ? (
        <span className="mono-label -mt-[13px] rounded bg-background px-1.5 text-muted-foreground">
          {label}
        </span>
      ) : null}
    </div>
  )
}

function Node({
  icon: Icon,
  title,
  sub,
  className = '',
}: {
  icon: React.ElementType
  title: string
  sub?: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 ${className}`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {sub ? (
          <p className="font-mono text-[11px] text-muted-foreground">{sub}</p>
        ) : null}
      </div>
    </div>
  )
}

export function Architecture() {
  const { architecture } = useContent()
  return (
    <Section id="architecture">
      <Reveal className="rounded-xl border border-border bg-card/40 p-6 sm:p-10">
        <div className="mx-auto flex max-w-md flex-col items-stretch">
          {architecture.map((layer, i) => (
            <Fragment key={i}>
              {i > 0 ? <Connector label={layer.connector} /> : null}
              {layer.group ? (
                <div className="rounded-lg border border-primary/25 bg-primary/[0.06] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Boxes className="size-4 text-primary" aria-hidden />
                    <span className="mono-label text-primary">{layer.group}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {layer.nodes.map((n) => (
                      <div
                        key={n.title}
                        className="rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground"
                      >
                        {n.title}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    'grid grid-cols-1 gap-2',
                    layer.nodes.length > 1 && 'sm:grid-cols-3',
                  )}
                >
                  {layer.nodes.map((n) => (
                    <Node key={n.title} icon={iconFor(n.icon)} title={n.title} sub={n.sub} />
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
