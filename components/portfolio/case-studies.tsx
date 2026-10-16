'use client'

import { ChevronRight } from 'lucide-react'
import { type CaseStudy } from '@/lib/data'
import { useContent } from '@/lib/content'
import { MetricArrow, Reveal, Section, SectionHeader, TechBadge } from './primitives'

function StepFlow({ steps }: { steps: string[] }) {
  return (
    <ul className="mt-4 space-y-1.5">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className="font-mono text-xs text-muted-foreground">{step}</span>
          {i < steps.length - 1 ? (
            <ChevronRight className="ml-auto size-3 text-border" aria-hidden />
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function Card({ study, delay }: { study: CaseStudy; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="card-hover group flex flex-col rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-2xl font-semibold text-border transition-colors group-hover:text-primary/50">
          {study.id}
        </span>
        <span className="mono-label text-muted-foreground">CASE.STUDY</span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight">{study.title}</h3>

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <span className="mono-label text-primary">Problem</span>
          <p className="mt-1 text-muted-foreground">{study.problem}</p>
        </div>
        <div>
          <span className="mono-label text-primary">Approach</span>
          <p className="mt-1 text-muted-foreground">{study.approach}</p>
        </div>
      </div>

      {study.steps ? <StepFlow steps={study.steps} /> : null}

      {study.result ? (
        <div className="mt-4 flex items-center gap-2">
          <span className="mono-label text-muted-foreground">Result</span>
          <MetricArrow {...study.result} />
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {study.tech.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>
    </Reveal>
  )
}

export function CaseStudies() {
  const { caseStudies } = useContent()
  return (
    <Section id="engineering" className="relative">
      <SectionHeader
        index="02"
        total="08"
        eyebrow="ENGINEERING HIGHLIGHTS"
        title="Problems I've solved"
        description="Real production work distilled to problem, approach and result — the way engineering decisions actually get made."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <Card key={study.id} study={study} delay={(i % 3) * 80} />
        ))}
      </div>
    </Section>
  )
}
