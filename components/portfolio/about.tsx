'use client'

import { useContent } from '@/lib/content'
import { Reveal, Section } from './primitives'
import { Markdown } from './markdown'
import { Terminal } from './terminal'

export function About() {
  const { timeline, sections } = useContent()
  const section = sections.find((s) => s.id === 'about')
  return (
    <Section id="about" intro={false}>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <Reveal className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
          <Markdown>{section?.intro}</Markdown>

          {/* Timeline */}
          <div className="pt-4">
            <span className="mono-label text-primary">Timeline</span>
            <ol className="mt-5 border-l border-border">
              {timeline.map((item) => (
                <li key={item.year + item.title} className="relative pb-6 pl-6 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-primary"
                    aria-hidden
                  />
                  <span className="font-mono text-xs text-primary">{item.year}</span>
                  <p className="mt-0.5 font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
          <Terminal />
        </Reveal>
      </div>
    </Section>
  )
}
