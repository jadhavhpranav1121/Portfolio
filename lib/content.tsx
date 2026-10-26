'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { contentVersion, defaultContent, type SiteContent } from '@/lib/data'
import { CONTENT_PATH, getDb } from '@/lib/firebase'

/**
 * True when a Firestore document was published on top of the Markdown this
 * build was made from. Once the Markdown changes and the site is rebuilt, older
 * live edits are stale and the Markdown wins.
 */
export function isCurrent(stored: unknown): boolean {
  return (stored as { version?: unknown } | null)?.version === contentVersion
}

/**
 * Merges a stored document over the built-in defaults, one top-level key at a
 * time. Anything missing or of the wrong shape falls back to the default, so a
 * partial or half-written Firestore document can never blank out a section.
 * Stale documents (see `isCurrent`) are ignored entirely.
 */
export function mergeContent(stored: unknown): SiteContent {
  if (!stored || typeof stored !== 'object' || !isCurrent(stored)) return defaultContent
  const raw = stored as Record<string, unknown>
  const merged = { ...defaultContent } as Record<string, unknown>

  for (const key of Object.keys(defaultContent) as (keyof SiteContent)[]) {
    const value = raw[key]
    if (value == null) continue
    const fallback = defaultContent[key]
    if (Array.isArray(fallback)) {
      if (Array.isArray(value)) merged[key] = value
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      merged[key] = { ...(fallback as object), ...(value as object) }
    }
  }

  return merged as SiteContent
}

const ContentContext = createContext<SiteContent>(defaultContent)

/**
 * Serves site content to every section. Renders the static defaults first (so
 * the exported HTML is complete and indexable), then swaps in the Firestore
 * document as soon as it arrives and on every later edit from /admin.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    const db = getDb()
    if (!db) return

    let active = true
    let unsubscribe: (() => void) | undefined

    void (async () => {
      const { doc, onSnapshot } = await import('firebase/firestore')
      if (!active) return
      unsubscribe = onSnapshot(
        doc(db, CONTENT_PATH.collection, CONTENT_PATH.doc),
        (snapshot) => {
          if (snapshot.exists()) setContent(mergeContent(snapshot.data()))
        },
        (error) => {
          // Offline, rules-denied or project missing — keep the defaults.
          console.warn('[content] falling back to built-in content:', error.message)
        },
      )
    })()

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

/** Live site content. Always defined — defaults until Firestore responds. */
export function useContent(): SiteContent {
  return useContext(ContentContext)
}

/** Visible sections, in page order. */
export function useVisibleSections() {
  return useContent().sections.filter((s) => !s.hidden)
}
