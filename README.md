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
  robots.ts sitemap.ts   Statically generated robots.txt / sitemap.xml
  globals.css            Design tokens, utilities, animations
components/portfolio/    One component per section + shared primitives
hooks/                   useReveal (scroll reveal), useCountUp (stat counters)
lib/data.ts              All site content in one typed module
public/                  Icons, OG image, resume PDF
```

All copy, metrics, projects, skills and timeline entries live in
[`lib/data.ts`](lib/data.ts) — edit content there rather than in components.

## Deployment

```bash
pnpm build
firebase deploy --only hosting
```

`firebase.json` serves the exported `out/` directory.

## Resume

The resume buttons use `profile.resume` in [`lib/data.ts`](lib/data.ts), which
currently points at the Google Drive link carried over from the previous
portfolio. Update it there, or drop a PDF in `public/` and reference it.
