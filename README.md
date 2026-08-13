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

## Scripts

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Start the dev server                               |
| `pnpm build`     | Production build + static export to `out/`         |
| `pnpm typecheck` | Run `tsc --noEmit`                                 |

## Project structure

```
app/                     Next.js App Router — layout, page, SEO routes
  layout.tsx             Metadata, OpenGraph, Person JSON-LD, fonts
  page.tsx               Section composition
  admin/                 Password-protected content editor (noindex)
  robots.ts sitemap.ts   Statically generated robots.txt / sitemap.xml
  globals.css            Design tokens, utilities, animations
components/portfolio/    One component per section + shared primitives
components/admin/        Editor UI — form primitives + section editors
hooks/                   useReveal (scroll reveal), useCountUp (stat counters)
lib/data.ts              Default site content + types (SiteContent)
lib/content.tsx          ContentProvider / useContent — Firestore over defaults
lib/firebase.ts          Firebase client bootstrap
lib/content-io.ts        Cleans edited content before publishing
public/                  Icons, OG image, resume PDF
```

Content has two layers:

1. **`lib/data.ts`** — the committed defaults. These are prerendered into the
   static HTML, so the site is complete and indexable even with no network.
2. **Firestore `site/content`** — the live overrides published from `/admin`.
   The provider merges them over the defaults key by key, so a partial or
   missing document can never blank out a section.

Editing `lib/data.ts` still works and needs a rebuild. Editing at `/admin` goes
live immediately, with no rebuild and no deploy.

## Deployment

```bash
pnpm build
firebase deploy --only hosting
```

`firebase.json` serves the exported `out/` directory.

## Admin — editing content without a deploy

`/admin` is a Firebase-Auth-protected editor covering every section: profile and
resume link, hero stack, nav, stats, engineering impact, case studies, skills,
projects, achievements, timeline and the terminal lines. Hit **Publish** and the
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
shows a setup notice and the site simply renders the committed defaults.

### Day-to-day

- Open `/admin`, sign in, edit, **Publish**. That's the whole loop.
- **Raw JSON** tab exports the current document (keep it as a backup) and lets
  you paste one back in.
- **Defaults** resets the editor to the content committed in `lib/data.ts` —
  it only stages the reset; nothing changes until you publish.
- To make the live content permanent in the repo, copy the JSON from the Raw
  JSON tab into `lib/data.ts` and commit.

## Resume

The resume buttons use `profile.resume` — editable at `/admin` under **Profile &
Resume**, with `lib/data.ts` as the committed fallback. Point it at a share link,
or drop a PDF into `public/` and use `/resume.pdf`.
