import { skillGroups } from '@/lib/data'
import { Reveal, Section, SectionHeader } from './primitives'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        index="04"
        total="08"
        eyebrow="TECH STACK"
        title="Tools I reach for"
        description="Grouped by intent, not by a meaningless percentage bar. These are the technologies I use to ship and operate production systems."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.tag}
            delay={(i % 3) * 70}
            className="card-hover rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              <h3 className="mono-label text-primary">{group.tag}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
