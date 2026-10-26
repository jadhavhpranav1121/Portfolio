'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { applyMarkdownFile, contentToMarkdown } from '@/lib/content-md'
import type { IconName, SiteContent } from '@/lib/data'
import { ICONS } from '@/components/portfolio/icons'
import {
  Button,
  Checkbox,
  Field,
  ListEditor,
  MarkdownField,
  Panel,
  StringList,
  TextArea,
} from './fields'

const ICON_NAMES = Object.keys(ICONS).join(', ')

type SectionKey =
  | 'profile'
  | 'sections'
  | 'hero'
  | 'stats'
  | 'experience'
  | 'architecture'
  | 'caseStudies'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'about'
  | 'contact'
  | 'markdown'
  | 'json'

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'profile', label: 'Profile & Resume' },
  { key: 'sections', label: 'Sections & order' },
  { key: 'hero', label: 'Hero' },
  { key: 'stats', label: 'Stats' },
  { key: 'experience', label: 'Experience' },
  { key: 'caseStudies', label: 'Case Studies' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'about', label: 'About & Timeline' },
  { key: 'contact', label: 'Contact & Footer' },
  { key: 'markdown', label: 'Markdown files' },
  { key: 'json', label: 'Raw JSON' },
]

export function ContentEditor({
  content,
  onChange,
}: {
  content: SiteContent
  onChange: (next: SiteContent) => void
}) {
  const [section, setSection] = useState<SectionKey>('profile')
  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    onChange({ ...content, [key]: value })
  const setHero = (patch: Partial<SiteContent['hero']>) =>
    set('hero', { ...content.hero, ...patch })
  const setFeatured = (patch: Partial<SiteContent['featured']>) =>
    set('featured', { ...content.featured, ...patch })

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
      <nav className="flex flex-wrap gap-1 lg:sticky lg:top-24 lg:h-fit lg:flex-col">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setSection(s.key)}
            className={cn(
              'rounded-md px-3 py-1.5 text-left text-sm transition-colors',
              section === s.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="min-w-0 space-y-6">
        {section === 'profile' && (
          <Panel
            title="Profile & Resume"
            description="Name, role and the links used across the hero, navbar, contact section and command palette."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                value={content.profile.name}
                onChange={(v) => set('profile', { ...content.profile, name: v })}
              />
              <Field
                label="Initials"
                value={content.profile.initials}
                onChange={(v) => set('profile', { ...content.profile, initials: v })}
              />
              <Field
                label="Role"
                value={content.profile.role}
                onChange={(v) => set('profile', { ...content.profile, role: v })}
              />
              <Field
                label="Company"
                value={content.profile.company}
                onChange={(v) => set('profile', { ...content.profile, company: v })}
              />
              <Field
                label="Location"
                value={content.profile.location}
                onChange={(v) => set('profile', { ...content.profile, location: v })}
              />
              <Field
                label="Tenure"
                value={content.profile.tenure}
                onChange={(v) => set('profile', { ...content.profile, tenure: v })}
              />
              <Field
                label="Email"
                value={content.profile.email}
                onChange={(v) => set('profile', { ...content.profile, email: v })}
              />
              <Field
                label="GitHub URL"
                value={content.profile.github}
                onChange={(v) => set('profile', { ...content.profile, github: v })}
              />
              <Field
                label="LinkedIn URL"
                value={content.profile.linkedin}
                onChange={(v) => set('profile', { ...content.profile, linkedin: v })}
              />
              <Field
                label="Resume URL"
                value={content.profile.resume}
                onChange={(v) => set('profile', { ...content.profile, resume: v })}
                hint="A share link, or /resume.pdf if you drop the file into public/."
              />
            </div>
          </Panel>
        )}

        {section === 'sections' && (
          <Panel
            title="Sections"
            description="Heading, nav label and intro for every section. Order here is the order on the page; hide a section to take it off the page and out of the nav."
          >
            <ListEditor
              items={content.sections}
              onChange={(v) => set('sections', v)}
              itemLabel={(s) => `${s.id}${s.hidden ? ' · hidden' : ''}`}
              render={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Nav label" value={item.nav} onChange={(v) => update({ nav: v })} />
                    <Field
                      label="Eyebrow"
                      value={item.eyebrow}
                      onChange={(v) => update({ eyebrow: v })}
                    />
                    <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                  </div>
                  <MarkdownField
                    label={item.id === 'about' ? 'Body' : 'Intro'}
                    value={item.intro}
                    onChange={(v) => update({ intro: v })}
                    rows={item.id === 'about' ? 8 : 3}
                  />
                  <Checkbox
                    label="Hidden"
                    checked={!!item.hidden}
                    onChange={(hidden) => update({ hidden })}
                  />
                </>
              )}
            />
          </Panel>
        )}

        {section === 'hero' && (
          <>
            <Panel title="Hero" description="The first screen of the site.">
              <Field label="Badge" value={content.hero.badge} onChange={(v) => setHero({ badge: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Headline"
                  value={content.hero.headline}
                  onChange={(v) => setHero({ headline: v })}
                />
                <Field
                  label="Highlight (accent colour)"
                  value={content.hero.highlight}
                  onChange={(v) => setHero({ highlight: v })}
                />
              </div>
              <MarkdownField
                label="Intro"
                value={content.hero.intro}
                onChange={(v) => setHero({ intro: v })}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field
                  label="Main button label"
                  value={content.hero.primaryCta.label}
                  onChange={(v) => setHero({ primaryCta: { ...content.hero.primaryCta, label: v } })}
                />
                <Field
                  label="Main button link"
                  value={content.hero.primaryCta.href}
                  onChange={(v) => setHero({ primaryCta: { ...content.hero.primaryCta, href: v } })}
                />
                <Field
                  label="Resume button label"
                  value={content.hero.resumeLabel}
                  onChange={(v) => setHero({ resumeLabel: v })}
                />
              </div>
              <StringList
                label="Tech chips"
                items={content.hero.tech}
                onChange={(tech) => setHero({ tech })}
                placeholder="Spring Boot"
              />
            </Panel>
            <Panel
              title="Hero flow diagram"
              description={`The card beside the headline. Icons: ${ICON_NAMES}.`}
            >
              <Field
                label="Title"
                value={content.hero.flowTitle}
                onChange={(v) => setHero({ flowTitle: v })}
              />
              <ListEditor
                items={content.hero.flow}
                onChange={(flow) => setHero({ flow })}
                empty={() => ({ label: '', sub: '', icon: 'server' as IconName, tag: '' })}
                addLabel="Add step"
                itemLabel={(n) => n.label || 'New step'}
                render={(node, update) => (
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Field label="Label" value={node.label} onChange={(v) => update({ label: v })} />
                    <Field label="Sub" value={node.sub} onChange={(v) => update({ sub: v })} />
                    <IconSelect value={node.icon} onChange={(icon) => update({ icon })} />
                    <Field label="Tag" value={node.tag} onChange={(v) => update({ tag: v })} />
                  </div>
                )}
              />
            </Panel>
          </>
        )}

        {section === 'architecture' && (
          <Panel
            title="Architecture diagram"
            description="Layers top to bottom. A layer with a group name renders as a labelled cluster; otherwise its nodes sit side by side."
          >
            <ListEditor
              items={content.architecture}
              onChange={(v) => set('architecture', v)}
              empty={() => ({ connector: '', nodes: [{ title: '' }] })}
              addLabel="Add layer"
              itemLabel={(l) => l.group || l.nodes.map((n) => n.title).join(' · ') || 'New layer'}
              render={(layer, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Connector label (line above)"
                      value={layer.connector ?? ''}
                      onChange={(v) => update({ connector: v })}
                    />
                    <Field
                      label="Group name (optional)"
                      value={layer.group ?? ''}
                      onChange={(v) => update({ group: v })}
                    />
                  </div>
                  <ListEditor
                    items={layer.nodes}
                    onChange={(nodes) => update({ nodes })}
                    empty={() => ({ title: '', sub: '', icon: 'server' as IconName })}
                    addLabel="Add node"
                    itemLabel={(n) => n.title || 'New node'}
                    render={(node, updateNode) => (
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Field
                          label="Title"
                          value={node.title}
                          onChange={(v) => updateNode({ title: v })}
                        />
                        <Field
                          label="Sub"
                          value={node.sub ?? ''}
                          onChange={(v) => updateNode({ sub: v })}
                        />
                        <IconSelect
                          value={node.icon}
                          onChange={(icon) => updateNode({ icon })}
                        />
                      </div>
                    )}
                  />
                </>
              )}
            />
          </Panel>
        )}

        {section === 'about' && (
          <>
            <Panel
              title="About"
              description="The About text itself is the About section's body under Sections & order."
            >
              <Button variant="ghost" onClick={() => setSection('sections')}>
                Edit About text
              </Button>
            </Panel>
            <Panel title="Timeline" description="The career timeline in the About section.">
              <ListEditor
                items={content.timeline}
                onChange={(v) => set('timeline', v)}
                empty={() => ({ year: '', title: '', detail: '' })}
                addLabel="Add entry"
                itemLabel={(t) => t.title || 'New entry'}
                render={(item, update) => (
                  <>
                    <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                      <Field label="Year" value={item.year} onChange={(v) => update({ year: v })} />
                      <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    </div>
                    <Field label="Detail" value={item.detail} onChange={(v) => update({ detail: v })} />
                  </>
                )}
              />
            </Panel>
            <Panel title="Terminal" description="The terminal card beside the About text.">
              <ListEditor
                items={content.terminalLines}
                onChange={(v) => set('terminalLines', v)}
                empty={() => ({ cmd: '', out: '' })}
                addLabel="Add line"
                itemLabel={(l) => l.cmd || 'New line'}
                render={(line, update) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Command" value={line.cmd} onChange={(v) => update({ cmd: v })} />
                    <Field label="Output" value={line.out} onChange={(v) => update({ out: v })} />
                  </div>
                )}
              />
            </Panel>
          </>
        )}

        {section === 'contact' && (
          <>
            <Panel title="Contact" description="The closing call to action.">
              <Field
                label="Status line"
                value={content.contact.status}
                onChange={(v) => set('contact', { ...content.contact, status: v })}
                hint="Leave empty to hide it."
              />
              <TextArea
                label="Headline"
                value={content.contact.headline}
                onChange={(v) => set('contact', { ...content.contact, headline: v })}
              />
            </Panel>
            <Panel title="Footer">
              <Field
                label="Tagline"
                value={content.footer.tagline}
                onChange={(v) => set('footer', { tagline: v })}
              />
            </Panel>
          </>
        )}

        {section === 'markdown' && <MarkdownPanel content={content} onChange={onChange} />}

        {section === 'stats' && (
          <Panel title="Stats strip" description="The counters below the hero.">
            <ListEditor
              items={content.stats}
              onChange={(v) => set('stats', v)}
              empty={() => ({ value: '', unit: '', label: '', tag: '' })}
              addLabel="Add stat"
              itemLabel={(s) => s.label || 'New stat'}
              render={(stat, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Value" value={stat.value} onChange={(v) => update({ value: v })} />
                  <Field label="Unit" value={stat.unit} onChange={(v) => update({ unit: v })} />
                  <Field label="Label" value={stat.label} onChange={(v) => update({ label: v })} />
                  <Field label="Tag" value={stat.tag} onChange={(v) => update({ tag: v })} />
                </div>
              )}
            />
          </Panel>
        )}

        {section === 'experience' && (
          <>
          <Panel title="Role" description="The line under the company name.">
            <Field
              label="Role line"
              value={content.experienceRole}
              onChange={(v) => set('experienceRole', v)}
            />
          </Panel>
          <Panel
            title="Engineering impact"
            description="Grouped highlights in the Experience section. Each group holds one or more items."
          >
            <ListEditor
              items={content.impactGroups}
              onChange={(v) => set('impactGroups', v)}
              empty={() => ({ tag: '', title: '', items: [] })}
              addLabel="Add group"
              itemLabel={(g) => g.title || 'New group'}
              render={(group, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Tag" value={group.tag} onChange={(v) => update({ tag: v })} />
                    <Field label="Title" value={group.title} onChange={(v) => update({ title: v })} />
                  </div>
                  <ListEditor
                    items={group.items}
                    onChange={(items) => update({ items })}
                    empty={() => ({ name: '', detail: '', metric: {} })}
                    addLabel="Add item"
                    itemLabel={(it) => it.name || 'New item'}
                    render={(item, updateItem) => (
                      <>
                        <Field
                          label="Name"
                          value={item.name}
                          onChange={(v) => updateItem({ name: v })}
                        />
                        <TextArea
                          label="Detail"
                          value={item.detail}
                          onChange={(v) => updateItem({ detail: v })}
                        />
                        <div className="grid gap-3 sm:grid-cols-3">
                          <Field
                            label="Before"
                            value={item.metric?.before ?? ''}
                            onChange={(v) =>
                              updateItem({ metric: { ...item.metric, before: v } })
                            }
                          />
                          <Field
                            label="After"
                            value={item.metric?.after ?? ''}
                            onChange={(v) => updateItem({ metric: { ...item.metric, after: v } })}
                          />
                          <Field
                            label="Note"
                            value={item.metric?.note ?? ''}
                            onChange={(v) => updateItem({ metric: { ...item.metric, note: v } })}
                          />
                        </div>
                      </>
                    )}
                  />
                </>
              )}
            />
          </Panel>
          </>
        )}

        {section === 'caseStudies' && (
          <Panel
            title="Case studies"
            description="Problem / approach write-ups. Steps render as a flow diagram when present."
          >
            <ListEditor
              items={content.caseStudies}
              onChange={(v) => set('caseStudies', v)}
              empty={() => ({ id: '', title: '', problem: '', approach: '', tech: [] })}
              addLabel="Add case study"
              itemLabel={(c) => c.title || 'New case study'}
              render={(study, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
                    <Field label="ID" value={study.id} onChange={(v) => update({ id: v })} />
                    <Field label="Title" value={study.title} onChange={(v) => update({ title: v })} />
                  </div>
                  <TextArea
                    label="Problem"
                    value={study.problem}
                    onChange={(v) => update({ problem: v })}
                  />
                  <TextArea
                    label="Approach"
                    value={study.approach}
                    onChange={(v) => update({ approach: v })}
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field
                      label="Result before"
                      value={study.result?.before ?? ''}
                      onChange={(v) => update({ result: { ...study.result, before: v } })}
                    />
                    <Field
                      label="Result after"
                      value={study.result?.after ?? ''}
                      onChange={(v) => update({ result: { ...study.result, after: v } })}
                    />
                    <Field
                      label="Result note"
                      value={study.result?.note ?? ''}
                      onChange={(v) => update({ result: { ...study.result, note: v } })}
                    />
                  </div>
                  <StringList
                    label="Tech"
                    items={study.tech}
                    onChange={(tech) => update({ tech })}
                  />
                  <StringList
                    label="Flow steps (optional)"
                    items={study.steps ?? []}
                    onChange={(steps) => update({ steps })}
                  />
                </>
              )}
            />
          </Panel>
        )}

        {section === 'skills' && (
          <Panel title="Skills" description="Grouped skill chips.">
            <ListEditor
              items={content.skillGroups}
              onChange={(v) => set('skillGroups', v)}
              empty={() => ({ tag: '', items: [] })}
              addLabel="Add group"
              itemLabel={(g) => g.tag || 'New group'}
              render={(group, update) => (
                <>
                  <Field label="Tag" value={group.tag} onChange={(v) => update({ tag: v })} />
                  <StringList
                    label="Skills"
                    items={group.items}
                    onChange={(items) => update({ items })}
                  />
                </>
              )}
            />
          </Panel>
        )}

        {section === 'projects' && (
          <>
          <Panel title="Featured work" description="The highlighted card above the project grid.">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Label"
                value={content.featured.label}
                onChange={(v) => setFeatured({ label: v })}
              />
              <Field
                label="Title"
                value={content.featured.title}
                onChange={(v) => setFeatured({ title: v })}
              />
            </div>
            <MarkdownField
              label="Body"
              value={content.featured.body}
              onChange={(v) => setFeatured({ body: v })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Link label"
                value={content.featured.cta.label}
                onChange={(v) => setFeatured({ cta: { ...content.featured.cta, label: v } })}
                hint="Leave empty to hide the link."
              />
              <Field
                label="Link"
                value={content.featured.cta.href}
                onChange={(v) => setFeatured({ cta: { ...content.featured.cta, href: v } })}
              />
            </div>
            <StringList
              label="Tech"
              items={content.featured.tech}
              onChange={(tech) => setFeatured({ tech })}
            />
          </Panel>
          <Panel title="Projects" description="Featured projects render first.">
            <ListEditor
              items={content.projects}
              onChange={(v) => set('projects', v)}
              empty={() => ({
                name: '',
                description: '',
                focus: '',
                tech: [],
                github: '',
                featured: false,
              })}
              addLabel="Add project"
              itemLabel={(p) => p.name || 'New project'}
              render={(project, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Name" value={project.name} onChange={(v) => update({ name: v })} />
                    <Field
                      label="Focus"
                      value={project.focus}
                      onChange={(v) => update({ focus: v })}
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={project.description}
                    onChange={(v) => update({ description: v })}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="GitHub URL"
                      value={project.github ?? ''}
                      onChange={(v) => update({ github: v })}
                    />
                    <Field
                      label="Demo URL"
                      value={project.demo ?? ''}
                      onChange={(v) => update({ demo: v })}
                    />
                  </div>
                  <StringList label="Tech" items={project.tech} onChange={(tech) => update({ tech })} />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => update({ featured: e.target.checked })}
                      className="size-4 accent-[oklch(0.62_0.2_274)]"
                    />
                    Featured
                  </label>
                </>
              )}
            />
          </Panel>
          </>
        )}

        {section === 'achievements' && (
          <Panel title="Achievements" description="Competition results and rankings.">
            <ListEditor
              items={content.achievements}
              onChange={(v) => set('achievements', v)}
              empty={() => ({ value: '', title: '', subtitle: '', detail: '', tag: '' })}
              addLabel="Add achievement"
              itemLabel={(a) => a.title || 'New achievement'}
              render={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Value" value={item.value} onChange={(v) => update({ value: v })} />
                    <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <Field
                      label="Subtitle"
                      value={item.subtitle}
                      onChange={(v) => update({ subtitle: v })}
                    />
                    <Field label="Tag" value={item.tag} onChange={(v) => update({ tag: v })} />
                  </div>
                  <TextArea
                    label="Detail"
                    value={item.detail}
                    onChange={(v) => update({ detail: v })}
                  />
                </>
              )}
            />
          </Panel>
        )}

        {section === 'json' && <JsonPanel content={content} onChange={onChange} />}
      </div>
    </div>
  )
}

function JsonPanel({
  content,
  onChange,
}: {
  content: SiteContent
  onChange: (next: SiteContent) => void
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(content, null, 2))
  const [error, setError] = useState('')

  const apply = () => {
    try {
      onChange(JSON.parse(draft) as SiteContent)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
    }
  }

  return (
    <Panel
      title="Raw JSON"
      description="Paste a whole content document, or copy this out as a backup. Applying only stages the change — you still have to publish."
    >
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={24}
        spellCheck={false}
        className="w-full rounded-md border border-input bg-background p-3 font-mono text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      <div className="flex gap-2">
        <Button onClick={apply}>Apply JSON</Button>
        <Button variant="ghost" onClick={() => setDraft(JSON.stringify(content, null, 2))}>
          Reload from editor
        </Button>
      </div>
    </Panel>
  )
}

function IconSelect({ value, onChange }: { value?: IconName; onChange: (v: IconName) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Icon
      </span>
      <select
        value={value ?? 'server'}
        onChange={(e) => onChange(e.target.value as IconName)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
      >
        {Object.keys(ICONS).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </label>
  )
}

/**
 * The bridge between /admin and the repo: download the current editor content
 * as the Markdown files in content/, or load edited .md files back in.
 */
function MarkdownPanel({
  content,
  onChange,
}: {
  content: SiteContent
  onChange: (next: SiteContent) => void
}) {
  const files = contentToMarkdown(content)
  const [open, setOpen] = useState(files[0]?.name ?? '')
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const current = files.find((f) => f.name === open) ?? files[0]

  const download = (name: string, text: string) => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown' }))
    const a = document.createElement('a')
    a.href = url
    a.download = name.split('/').pop()!
    a.click()
    URL.revokeObjectURL(url)
  }

  const importFiles = async (list: FileList | null) => {
    if (!list?.length) return
    try {
      let next = content
      for (const file of Array.from(list)) {
        next = applyMarkdownFile(next, { name: file.name, text: await file.text() })
      }
      onChange(next)
      setMessage({ ok: true, text: `Loaded ${list.length} file(s). Review, then Publish.` })
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : 'Could not read file' })
    }
  }

  return (
    <Panel
      title="Markdown files"
      description="These are the files in content/ of the repo. Download one to commit your admin edits permanently, or upload edited .md files to stage them here."
    >
      <div className="flex flex-wrap gap-1">
        {files.map((f) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setOpen(f.name)}
            className={cn(
              'rounded-md px-2 py-1 font-mono text-xs',
              f.name === current?.name
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {f.name}
          </button>
        ))}
      </div>
      {current ? (
        <>
          <pre className="max-h-[28rem] overflow-auto rounded-md border border-input bg-background p-3 font-mono text-xs leading-relaxed">
            {current.text}
          </pre>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => void navigator.clipboard.writeText(current.text)}>
              Copy
            </Button>
            <Button variant="ghost" onClick={() => download(current.name, current.text)}>
              Download {current.name.split('/').pop()}
            </Button>
            <Button
              variant="ghost"
              onClick={() => files.forEach((f) => download(f.name, f.text))}
            >
              Download all
            </Button>
          </div>
        </>
      ) : null}
      <label className="block">
        <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Upload .md files
        </span>
        <input
          type="file"
          accept=".md,text/markdown"
          multiple
          onChange={(e) => {
            void importFiles(e.target.files)
            e.target.value = ''
          }}
          className="text-sm"
        />
      </label>
      {message ? (
        <p className={cn('text-xs', message.ok ? 'text-muted-foreground' : 'text-destructive')}>
          {message.text}
        </p>
      ) : null}
    </Panel>
  )
}
