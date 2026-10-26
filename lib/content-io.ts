import type { SiteContent } from '@/lib/data'

/**
 * Prepares edited content for Firestore: drops `undefined` values (which
 * Firestore rejects), empty optional objects such as a blank metric, and blank
 * list entries left behind by the "Add" buttons.
 */
export function sanitizeContent(content: SiteContent): SiteContent {
  return clean(content) as SiteContent
}

function clean(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map(clean)
      .filter((v) => v !== undefined && !(typeof v === 'string' && !v.trim()))
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => [k, METRIC_KEYS.has(k) ? cleanMetric(v) : clean(v)] as const)
      .filter(([, v]) => v !== undefined)
    // Keep empty strings on objects (a cleared heading is a real edit), but
    // collapse objects that ended up with nothing in them.
    return entries.length ? Object.fromEntries(entries) : undefined
  }
  return value
}

const METRIC_KEYS = new Set(['metric', 'result'])

/** A metric with only blank fields is no metric at all. */
function cleanMetric(value: unknown): unknown {
  if (!value || typeof value !== 'object') return undefined
  const entries = Object.entries(value).filter(([, v]) => typeof v === 'string' && v.trim())
  return entries.length ? Object.fromEntries(entries) : undefined
}
