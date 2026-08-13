import type { SiteContent } from '@/lib/data'

function cleanMetric<T extends Record<string, string | undefined>>(metric?: T) {
  if (!metric) return undefined
  const entries = Object.entries(metric).filter(([, v]) => typeof v === 'string' && v.trim())
  return entries.length ? (Object.fromEntries(entries) as T) : undefined
}

function omitUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T
}

/**
 * Prepares edited content for Firestore: drops empty optional fields and
 * `undefined` values (which Firestore rejects), and trims blank list entries
 * left behind by the "Add" buttons.
 */
export function sanitizeContent(content: SiteContent): SiteContent {
  const keep = (s: string) => s.trim().length > 0

  return {
    profile: content.profile,
    navLinks: content.navLinks.filter((l) => keep(l.label)),
    heroTech: content.heroTech.filter(keep),
    stats: content.stats,
    impactGroups: content.impactGroups.map((group) => ({
      ...group,
      items: group.items
        .filter((item) => keep(item.name) || keep(item.detail))
        .map((item) => omitUndefined({ ...item, metric: cleanMetric(item.metric) })),
    })),
    caseStudies: content.caseStudies.map((study) =>
      omitUndefined({
        ...study,
        result: cleanMetric(study.result),
        tech: study.tech.filter(keep),
        steps: study.steps?.filter(keep).length ? study.steps.filter(keep) : undefined,
      }),
    ),
    skillGroups: content.skillGroups.map((group) => ({
      ...group,
      items: group.items.filter(keep),
    })),
    projects: content.projects.map((project) =>
      omitUndefined({
        ...project,
        tech: project.tech.filter(keep),
        github: project.github?.trim() ? project.github : undefined,
        demo: project.demo?.trim() ? project.demo : undefined,
      }),
    ),
    achievements: content.achievements,
    timeline: content.timeline,
    terminalLines: content.terminalLines.filter((l) => keep(l.cmd) || keep(l.out)),
  }
}
