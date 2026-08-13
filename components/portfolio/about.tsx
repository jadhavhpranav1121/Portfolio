'use client'

import { useContent } from '@/lib/content'
import { Reveal, Section, SectionHeader } from './primitives'
import { Terminal } from './terminal'

export function About() {
  const { timeline } = useContent()
  return (
    <Section id="about">
      <SectionHeader
        index="07"
        total="08"
        eyebrow="ABOUT"
        title="Engineer, not just a coder"
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <Reveal className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
          <p>
            I&apos;m a Software Engineer based in Pune, India, currently working at{' '}
            <span className="text-foreground">Emerson Export Engineering Center</span>.
          </p>
          <p>
            I enjoy building backend systems where reliability, concurrency and
            performance actually matter — event-driven workflows, distributed
            services, database-heavy APIs and production debugging.
          </p>
          <p>
            My primary stack is{' '}
            <span className="text-foreground">
              Java, Spring Boot, PostgreSQL, Kafka and Redis
            </span>
            , while Angular gives me the ability to work across the full product
            stack.
          </p>
          <p>
            Outside day-to-day development, I enjoy competitive programming,
            cybersecurity challenges and understanding how systems behave under
            failure.
          </p>

          {/* Timeline */}
          <div className="pt-4">
            <span className="mono-label text-primary">CAREER.TIMELINE</span>
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
