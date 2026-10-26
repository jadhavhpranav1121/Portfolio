import { Marked } from 'marked'
import { cn } from '@/lib/utils'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Raw HTML in the Markdown is shown as text, never injected.
const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    html: ({ text }) => escape(text),
  },
})

/** Renders a Markdown string from the content files or /admin. */
export function Markdown({ children, className }: { children?: string; className?: string }) {
  if (!children?.trim()) return null
  return (
    <div
      className={cn('prose-site', className)}
      dangerouslySetInnerHTML={{ __html: marked.parse(children, { async: false }) }}
    />
  )
}
