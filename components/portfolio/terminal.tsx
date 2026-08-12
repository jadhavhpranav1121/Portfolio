'use client'

import { useEffect, useRef, useState } from 'react'
import { terminalLines } from '@/lib/data'
import { useReveal } from '@/hooks/use-reveal'

export function Terminal() {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const [step, setStep] = useState(-1)
  const started = useRef(false)

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStep(terminalLines.length)
      return
    }

    let i = 0
    const id = setInterval(() => {
      i += 1
      setStep(i)
      if (i >= terminalLines.length) clearInterval(id)
    }, 650)
    return () => clearInterval(id)
  }, [visible])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-border bg-[oklch(0.13_0.008_265)] font-mono text-sm shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-2.5">
        <span className="size-3 rounded-full bg-destructive/70" aria-hidden />
        <span className="size-3 rounded-full bg-[oklch(0.78_0.15_85)]" aria-hidden />
        <span className="size-3 rounded-full bg-[oklch(0.72_0.17_150)]" aria-hidden />
        <span className="ml-2 text-xs text-muted-foreground">pranav@portfolio ~ %</span>
      </div>
      <div className="space-y-2 p-5">
        {terminalLines.map((line, i) => {
          const shown = i < step
          return (
            <div key={line.cmd} className={shown ? 'opacity-100' : 'opacity-0'}>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> {line.cmd}
              </p>
              <p className="text-foreground">{line.out}</p>
            </div>
          )
        })}
        <p className="text-primary">
          $ <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary align-middle" />
        </p>
      </div>
    </div>
  )
}
