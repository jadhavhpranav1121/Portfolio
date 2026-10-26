// Converts between the Markdown files in content/ and the SiteContent object.
// Used by scripts/build-content.ts (files → JSON at build time) and by /admin
// (import a pasted .md file, export the live content back to .md files).
// Keep imports type-only or from packages: the build script runs under plain
// Node with type stripping, which cannot resolve the `@/` alias.

import { parse, stringify } from 'yaml'
import type { Section, SectionId, SiteContent } from './data'

export type MarkdownFile = { name: string; text: string }

/** Section files, in default order. Rename the number prefix to reorder. */
export const SECTION_FILES: { id: SectionId; data: (keyof SiteContent)[] }[] = [
  { id: 'experience', data: ['experienceRole', 'impactGroups'] },
  { id: 'engineering', data: ['caseStudies'] },
  { id: 'architecture', data: ['architecture'] },
  { id: 'skills', data: ['skillGroups'] },
  { id: 'projects', data: ['featured', 'projects'] },
  { id: 'achievements', data: ['achievements'] },
  { id: 'about', data: ['timeline', 'terminalLines'] },
  { id: 'contact', data: ['contact'] },
]

const META_KEYS = ['nav', 'eyebrow', 'title', 'hidden'] as const

export function splitFrontmatter(text: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text.replace(/^﻿/, ''))
  if (!match) return { data: {}, body: text.trim() }
  const data = parse(match[1]) ?? {}
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Frontmatter must be a YAML mapping (key: value lines)')
  }
  return { data: data as Record<string, unknown>, body: match[2].trim() }
}

function joinFrontmatter(data: Record<string, unknown>, body = ''): string {
  const yaml = stringify(data, { lineWidth: 0 }).trimEnd()
  return `---\n${yaml}\n---\n${body ? `\n${body.trim()}\n` : ''}`
}

/** `03-architecture.md` → `architecture`; `profile.md` → `profile`. */
export function fileId(name: string): string {
  return name
    .split('/')
    .pop()!
    .replace(/\.md$/i, '')
    .replace(/^\d+[-_]/, '')
}

/**
 * Applies one Markdown file onto `content`, returning the updated copy.
 * Section files may also update `sections` (heading, nav label, intro).
 */
export function applyMarkdownFile(content: SiteContent, file: MarkdownFile): SiteContent {
  const id = fileId(file.name)
  const { data, body } = splitFrontmatter(file.text)
  const next: SiteContent = { ...content }

  if (id === 'profile') {
    const { footer, ...profile } = data as Record<string, unknown>
    next.profile = { ...content.profile, ...(profile as object) }
    if (footer) next.footer = { ...content.footer, ...(footer as object) }
    return next
  }

  if (id === 'hero') {
    const { stats, ...hero } = data as Record<string, unknown>
    next.hero = { ...content.hero, ...(hero as object), intro: body }
    if (Array.isArray(stats)) next.stats = stats as SiteContent['stats']
    return next
  }

  const spec = SECTION_FILES.find((s) => s.id === id)
  if (!spec) throw new Error(`Unknown content file "${file.name}"`)

  const existing = content.sections.find((s) => s.id === id)
  const section: Section = {
    id: spec.id,
    nav: String(data.nav ?? existing?.nav ?? id),
    eyebrow: String(data.eyebrow ?? existing?.eyebrow ?? id.toUpperCase()),
    title: String(data.title ?? existing?.title ?? ''),
    intro: body,
    ...(data.hidden ? { hidden: true } : {}),
  }
  next.sections = existing
    ? content.sections.map((s) => (s.id === id ? section : s))
    : [...content.sections, section]

  for (const key of spec.data) {
    if (data[key] !== undefined) (next as Record<string, unknown>)[key] = data[key]
  }
  for (const key of Object.keys(data)) {
    if (!META_KEYS.includes(key as never) && !spec.data.includes(key as keyof SiteContent)) {
      throw new Error(`${file.name}: unknown key "${key}" (allowed: ${[...META_KEYS, ...spec.data].join(', ')})`)
    }
  }
  return next
}

/** Builds the whole SiteContent from a full set of content files. */
export function contentFromMarkdown(files: MarkdownFile[]): SiteContent {
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name))
  const empty = { sections: [] } as unknown as SiteContent
  const content = sorted.reduce(applyMarkdownFile, empty)
  // Section order follows the sorted file names (the number prefixes).
  return content
}

/** The inverse: one Markdown file per area, ready to drop into content/. */
export function contentToMarkdown(content: SiteContent): MarkdownFile[] {
  const { intro, ...hero } = content.hero
  const files: MarkdownFile[] = [
    { name: 'profile.md', text: joinFrontmatter({ ...content.profile, footer: content.footer }) },
    { name: 'hero.md', text: joinFrontmatter({ ...hero, stats: content.stats }, intro) },
  ]
  content.sections.forEach((section, i) => {
    const spec = SECTION_FILES.find((s) => s.id === section.id)
    if (!spec) return
    const data: Record<string, unknown> = {
      nav: section.nav,
      eyebrow: section.eyebrow,
      title: section.title,
    }
    if (section.hidden) data.hidden = true
    for (const key of spec.data) data[key] = content[key]
    files.push({
      name: `sections/${String(i + 1).padStart(2, '0')}-${section.id}.md`,
      text: joinFrontmatter(data, section.intro),
    })
  })
  return files
}
