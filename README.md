# Rizky Maulana — IT Support Engineer & Web Developer

A personal portfolio for someone who works both sides of the screen: keeping teams online, and building the websites and tools that stop tickets from coming back.

The design is deliberately opinionated — a "service manual" look with warm paper, hard black rules, one safety-orange accent, condensed display type and monospace metadata (port numbers, case files, ticket IDs).

## Pages

| Route       | What it is                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------- |
| `/`         | Hero, the two halves of the job (support / web), featured case files, principles, gallery strip |
| `/about`    | Story, numbers, experience changelog, toolbox, education & certifications                   |
| `/projects` | Case files with a headline metric each, filterable by Infra vs Web                          |
| `/gallery`  | Filterable photo mosaic with a keyboard-friendly lightbox                                   |
| `/contact`  | "Open a ticket" form (Netlify Forms), direct email, social "patch panel", service levels     |

## Tech

- **TanStack Start** (React 19, file-based routes, SSR) on **Netlify**
- **Tailwind CSS v4** — design tokens live in `src/styles.css`
- **Content Collections** — projects, jobs and education are Markdown in `content/`
- **Netlify Image CDN** — every image is resized and converted to WebP/AVIF on request via `/.netlify/images`
- **Netlify Forms** — contact submissions, with a honeypot for spam

## Run locally

```bash
pnpm install
netlify dev        # full Netlify emulation (Image CDN, Forms)
# or
pnpm dev           # plain Vite on :3000
```

## Make it yours

- Name, email, location and social links: `src/lib/site.ts`
- Projects / experience / certs: Markdown in `content/projects`, `content/jobs`, `content/education`
- Gallery photos: drop files into `public/img/` and list them in `src/lib/gallery.ts`
- Numbers on the About page and toolbox: top of `src/routes/about.tsx`

The included photos are AI-generated placeholders — swap in real shots from your own racks and desks.
