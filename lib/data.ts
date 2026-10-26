import generated from './content.generated.json'

export const siteUrl = 'https://pranavj.web.app'

export type Profile = {
  name: string
  initials: string
  role: string
  company: string
  location: string
  tenure: string
  email: string
  github: string
  linkedin: string
  resume: string
}

export type Link = { label: string; href: string }

/** Small icon names the architecture diagram and hero flow understand. */
export type IconName =
  | 'globe'
  | 'users'
  | 'server'
  | 'workflow'
  | 'layers'
  | 'zap'
  | 'database'
  | 'cloud'
  | 'boxes'
  | 'cpu'
  | 'shield'
  | 'mail'

export type Hero = {
  /** Small line above the headline, e.g. "Software Engineer at Emerson". */
  badge: string
  headline: string
  /** Rendered in the accent colour right after the headline. */
  highlight: string
  /** Markdown. */
  intro: string
  tech: string[]
  primaryCta: Link
  resumeLabel: string
  flowTitle: string
  flow: { label: string; sub: string; icon: IconName; tag: string }[]
}

export type Stat = { value: string; unit: string; label: string; tag: string }

export type SectionId =
  | 'experience'
  | 'engineering'
  | 'architecture'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'about'
  | 'contact'

/** Heading, nav label and visibility for one page section. */
export type Section = {
  id: SectionId
  nav: string
  eyebrow: string
  title: string
  /** Markdown shown under the title (the About section uses it as its body). */
  intro: string
  hidden?: boolean
}

export type ImpactGroup = {
  tag: string
  title: string
  items: {
    name: string
    detail: string
    metric?: { before?: string; after?: string; note?: string }
  }[]
}

export type CaseStudy = {
  id: string
  title: string
  problem: string
  approach: string
  result?: { before?: string; after?: string; note?: string }
  tech: string[]
  steps?: string[]
}

export type ArchitectureLayer = {
  /** Label on the connector drawn above this layer. */
  connector?: string
  /** When set, the nodes render as a labelled cluster. */
  group?: string
  nodes: { title: string; sub?: string; icon?: IconName }[]
}

export type SkillGroup = { tag: string; items: string[] }

export type Featured = {
  label: string
  title: string
  /** Markdown. */
  body: string
  tech: string[]
  cta: Link
}

export type Project = {
  name: string
  description: string
  focus: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
}

export type Achievement = {
  value: string
  title: string
  subtitle: string
  detail: string
  tag: string
}

export type TimelineItem = { year: string; title: string; detail: string }

export type TerminalLine = { cmd: string; out: string }

/**
 * The full editable content of the site, in one object.
 *
 * The committed source is the Markdown in `content/` — `pnpm content` (run
 * automatically before dev and build) turns it into `content.generated.json`,
 * which is what ships as the default. /admin can override it live through
 * Firestore (`site/content`) until the Markdown next changes; missing keys
 * always fall back to these defaults.
 */
export type SiteContent = {
  profile: Profile
  hero: Hero
  stats: Stat[]
  sections: Section[]
  experienceRole: string
  impactGroups: ImpactGroup[]
  caseStudies: CaseStudy[]
  architecture: ArchitectureLayer[]
  skillGroups: SkillGroup[]
  featured: Featured
  projects: Project[]
  achievements: Achievement[]
  timeline: TimelineItem[]
  terminalLines: TerminalLine[]
  contact: { status: string; headline: string }
  footer: { tagline: string }
}

export const defaultContent = generated.content as SiteContent

/** Hash of the Markdown this build was made from. */
export const contentVersion: string = generated.version
