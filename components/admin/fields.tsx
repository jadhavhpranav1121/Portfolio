'use client'

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
      />
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
      />
    </label>
  )
}

export function Button({
  children,
  onClick,
  variant = 'default',
  type = 'button',
  disabled,
  className,
  title,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'default' | 'ghost' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  title?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'default' && 'bg-primary text-primary-foreground hover:opacity-90',
        variant === 'ghost' && 'border border-border text-foreground hover:bg-muted',
        variant === 'danger' &&
          'border border-border text-muted-foreground hover:border-destructive hover:text-destructive',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <header className="mb-4">
        <h2 className="font-mono text-sm uppercase tracking-wider text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

/** A list of plain strings — tech tags, skill items, flow steps. */
export function StringList({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
            />
            <Button
              variant="danger"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              title="Remove"
            >
              <Trash2 className="size-3.5" aria-hidden />
            </Button>
          </div>
        ))}
        <Button variant="ghost" onClick={() => onChange([...items, ''])}>
          <Plus className="size-3.5" aria-hidden /> Add
        </Button>
      </div>
    </div>
  )
}

/**
 * Generic editor for a list of objects: renders each entry in its own card
 * with move up/down and delete, plus an add button that appends `empty()`.
 */
export function ListEditor<T>({
  items,
  onChange,
  empty,
  addLabel,
  itemLabel,
  render,
}: {
  items: T[]
  onChange: (items: T[]) => void
  empty: () => T
  addLabel: string
  itemLabel?: (item: T, index: number) => string
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-border bg-background/40 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {itemLabel ? itemLabel(item, i) : `#${i + 1}`}
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" onClick={() => move(i, i - 1)} title="Move up">
                <ChevronUp className="size-3.5" aria-hidden />
              </Button>
              <Button variant="ghost" onClick={() => move(i, i + 1)} title="Move down">
                <ChevronDown className="size-3.5" aria-hidden />
              </Button>
              <Button
                variant="danger"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                title="Delete"
              >
                <Trash2 className="size-3.5" aria-hidden />
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {render(item, (patch) => {
              const next = [...items]
              next[i] = { ...(item as object), ...(patch as object) } as T
              onChange(next)
            })}
          </div>
        </div>
      ))}
      <Button variant="ghost" onClick={() => onChange([...items, empty()])}>
        <Plus className="size-3.5" aria-hidden /> {addLabel}
      </Button>
    </div>
  )
}
