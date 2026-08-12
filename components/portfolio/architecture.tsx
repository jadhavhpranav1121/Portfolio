import {
  Boxes,
  Cloud,
  Database,
  Globe,
  Layers,
  Server,
  Zap,
} from 'lucide-react'
import { Reveal, Section, SectionHeader } from './primitives'

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
      className={`flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 ${className}`}
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

const services = ['Campaign', 'Meeting', 'Notification', 'AI']
const stores = [
  { icon: Layers, title: 'Kafka', sub: 'Events' },
  { icon: Zap, title: 'Redis', sub: 'Cache' },
  { icon: Database, title: 'PostgreSQL', sub: 'Persistence' },
]

export function Architecture() {
  return (
    <Section id="architecture">
      <SectionHeader
        index="03"
        total="08"
        eyebrow="SYSTEM ARCHITECTURE"
        title="How the systems fit together"
        description="A representative view of the multi-tenant, event-driven architecture I work in — from the Angular client down to persistence and cloud."
      />

      <Reveal className="rounded-xl border border-border bg-card/40 bg-grid p-6 sm:p-10">
        <div className="mx-auto flex max-w-md flex-col items-stretch">
          <Node icon={Globe} title="Angular Client" sub="TypeScript · RxJS" />
          <Connector label="HTTPS · WebSocket" />
          <Node icon={Server} title="Spring Cloud Gateway" sub="Routing · JWT Auth" />
          <Connector label="REST · JWT" />

          {/* Services cluster */}
          <div className="rounded-lg border border-primary/25 bg-primary/[0.06] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Boxes className="size-4 text-primary" aria-hidden />
              <span className="mono-label text-primary">SPRING BOOT SERVICES</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <div
                  key={s}
                  className="rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground transition-colors hover:border-primary/40"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <Connector label="Events · Cache · Persistence" />

          {/* Stores */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {stores.map((s) => (
              <Node key={s.title} icon={s.icon} title={s.title} sub={s.sub} />
            ))}
          </div>

          <Connector />
          <Node
            icon={Cloud}
            title="AWS"
            sub="S3 · EC2 · EKS · Chime SDK"
            className="justify-center"
          />
        </div>
      </Reveal>
    </Section>
  )
}
