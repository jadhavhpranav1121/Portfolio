# Pranav Jadhav — Portfolio

Personal portfolio for **Pranav Jadhav**, Software Engineer (Java · Spring Boot · Distributed Systems · Angular).

Live: [pranavj.web.app](https://pranavj.web.app)

## Stack

- **Next.js 16** (App Router, static export) + **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- Inter + JetBrains Mono via `next/font`
- Deployed as static files to **Firebase Hosting**

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

## Editing content

**Every word on the site lives in Markdown files in `content/`.** No code
changes needed.

```
content/
  profile.md                 name, links, resume URL, footer tagline
  hero.md                    headline, intro, buttons, tech chips, flow card, stats
  sections/
    01-experience.md         one file per section, in page order
    02-engineering.md
    03-architecture.md
    04-skills.md
    05-projects.md
    06-achievements.md
    07-about.md
    08-contact.md
```

Each file has YAML frontmatter (between the `---` lines) for structured data,
and a Markdown body for prose:

```md
---
nav: Skills              # label in the navbar
eyebrow: Skills          # small label above the heading
title: What I use        # section heading
hidden: true             # optional: removes the section and its nav link
skillGroups:
  - tag: Backend
    items: [Java 17, Spring Boot 3]
---

The paragraph under the heading. **Bold**, *italic* and [links](https://…) work.
```

- **Reorder sections:** change the number prefix (`04-skills.md` → `02-skills.md`).
- **Hide a section:** add `hidden: true`.
- **Icons** (hero flow, architecture): `globe users server workflow layers zap
  database cloud boxes cpu shield mail`.
- A typo in a key name fails the build with a message naming the file and key,
  so mistakes never reach the live site.

Run `pnpm content --watch` alongside `pnpm dev` to rebuild on every save.
`pnpm build` always converts the Markdown first.

## Scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Build content, start the dev server                   |
| `pnpm content`   | Convert `content/*.md` → `lib/content.generated.json` |
| `pnpm build`     | Build content, production build + export to `out/`    |
| `pnpm typecheck` | Build content, run `tsc --noEmit`                     |

## Project structure

```
content/                 The site's content, as Markdown (edit these)
scripts/build-content.ts Markdown → lib/content.generated.json (git-ignored)
app/                     Next.js App Router: layout, page, SEO routes
  admin/                 Owner-only content editor (noindex)
components/portfolio/    One component per section + shared primitives
components/admin/        Editor UI: form primitives + section editors
lib/data.ts              Content types (SiteContent)
lib/content-md.ts        Markdown ⇄ content conversion (build script + admin)
lib/content.tsx          ContentProvider / useContent: Firestore over Markdown
lib/content-io.ts        Cleans edited content before publishing
```

### Markdown vs. /admin: which one wins?

Both edit the same content. **Whichever you changed most recently wins:**

- Publish from `/admin` → live immediately, no deploy.
- Edit `content/*.md` and deploy → the new Markdown replaces any earlier admin
  edits (each build is stamped with a hash of the Markdown, and admin edits made
  on an older version are ignored).

To keep admin edits for good, open **Markdown files** in `/admin`, download the
files and commit them into `content/`. To go the other way, upload `.md` files
there and publish.

## Deployment

Every push to `master` deploys automatically
(`.github/workflows/deploy.yml`): it builds from `content/`, then deploys
hosting and `firestore.rules`. You can also run it by hand from the Actions tab.

One-time setup, in GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase console → Project settings → Service accounts → **Generate new private key**; paste the whole JSON |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Project settings → Your apps → Web app config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | same |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | same |

Manual deploy still works:

```bash
pnpm build
firebase deploy --only hosting
```

## Admin — editing content without a deploy

`/admin` is an editor for every section (headings, order and visibility,
hero, stats, experience, case studies, architecture, skills, projects,
achievements, about, timeline, contact) with a live Markdown preview.
**It only opens for the owner account** (`OWNER_EMAIL` in `lib/firebase.ts`,
matching `firestore.rules`); any other account is signed straight back out. Hit **Publish** and the
live site picks the change up on its next load — no rebuild, no `git push`.

### One-time setup

1. **Firebase console → Firestore Database → Create database** (production mode)
   in project `fir-91088`.
2. **Authentication → Sign-in method → Email/Password → Enable**, then
   **Users → Add user** with your email and a password. That account is the only
   one allowed to write.
3. **Project settings → Your apps → Web app → SDK setup and configuration** —
   copy the config values.
4. `cp .env.example .env.local` and fill in `NEXT_PUBLIC_FIREBASE_API_KEY`,
   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` and `NEXT_PUBLIC_FIREBASE_APP_ID`
   (the rest are pre-filled for this project). Set the same variables wherever
   you run `pnpm build`, since they are baked into the static export.
5. Deploy the rules: `firebase deploy --only firestore:rules`.
6. `pnpm build && firebase deploy --only hosting`, then open
   [pranavj.web.app/admin](https://pranavj.web.app/admin) and sign in.

The `NEXT_PUBLIC_*` values are public by design — they identify the project and
grant nothing. Write access is enforced by `firestore.rules`, which only accepts
the owner's verified, signed-in account. If those variables are absent, `/admin`
shows a setup notice and the site simply renders the Markdown content.

### Day-to-day

- Open `/admin`, sign in, edit, **Publish**. That's the whole loop.
- **Raw JSON** tab exports the current document (keep it as a backup) and lets
  you paste one back in.
- **Defaults** resets the editor to the Markdown committed in `content/`. It
  only stages the reset; nothing changes until you publish.
- **Markdown files** shows the current content as the `content/` files.
  Download and commit them to make admin edits permanent.

## Resume

The resume buttons use `resume` in `content/profile.md` — editable at `/admin` under **Profile &
Resume**, with `content/profile.md` as the committed source. Point it at a share link,
or drop a PDF into `public/` and use `/resume.pdf`.
