'use client'

import { stats } from '@/lib/data'
import { useCountUp } from '@/hooks/use-count-up'
import { Reveal } from './primitives'

function StatValue({ value, unit }: { value: string; unit: string }) {
  const numeric = Number(value.replace(/[^0-9]/g, ''))
  const isNumeric = /^\d+$/.test(value.replace(/\+/g, ''))
  const suffix = value.replace(/[0-9]/g, '')
  const { ref, value: counted } = useCountUp(numeric)

  return (
    <p className="flex items-baseline gap-1">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {isNumeric ? counted : value}
        {isNumeric ? suffix : ''}
      </span>
      <span className="font-mono text-xs text-primary">{unit}</span>
    </p>
  )
}

export function StatsStrip() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal className="grid grid-cols-2 divide-border overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border-t border-border p-5 first:border-t-0 sm:p-6 md:border-t-0 [&:nth-child(2)]:border-t-0"
          >
            <span className="mono-label text-muted-foreground">{s.tag}</span>
            <div className="mt-3">
              <StatValue value={s.value} unit={s.unit} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}
