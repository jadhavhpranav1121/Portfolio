'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SiteContent } from '@/lib/data'
import { Button, Field, ListEditor, Panel, StringList, TextArea } from './fields'

type SectionKey =
  | 'profile'
  | 'hero'
  | 'stats'
  | 'experience'
  | 'caseStudies'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'timeline'
  | 'json'

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'profile', label: 'Profile & Resume' },
  { key: 'hero', label: 'Hero & Nav' },
  { key: 'stats', label: 'Stats' },
  { key: 'experience', label: 'Experience' },
  { key: 'caseStudies', label: 'Case Studies' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'timeline', label: 'Timeline' },
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

        {section === 'hero' && (
          <>
            <Panel title="Hero tech stack" description="The chips under the hero headline.">
              <StringList
                label="Tech"
                items={content.heroTech}
                onChange={(v) => set('heroTech', v)}
                placeholder="Spring Boot"
              />
            </Panel>
            <Panel title="Navigation" description="Links in the navbar. href must start with #.">
              <ListEditor
                items={content.navLinks}
                onChange={(v) => set('navLinks', v)}
                empty={() => ({ label: '', href: '#' })}
                addLabel="Add link"
                itemLabel={(l) => l.label || 'New link'}
                render={(link, update) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Label" value={link.label} onChange={(v) => update({ label: v })} />
                    <Field label="Href" value={link.href} onChange={(v) => update({ href: v })} />
                  </div>
                )}
              />
            </Panel>
            <Panel title="Terminal" description="The animated terminal in the About section.">
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

        {section === 'timeline' && (
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
