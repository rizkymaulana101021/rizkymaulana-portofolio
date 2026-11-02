# AGENTS.md

Personal portfolio for an IT support engineer & web developer. TanStack Start + React 19 + Tailwind v4, deployed on Netlify. No database, no auth — content is static Markdown and TS data modules.

## Architecture

- `src/routes/` — file routes: `index.tsx` (home), `about.tsx`, `projects.tsx`, `gallery.tsx`, `contact.tsx`, `__root.tsx` (shell: fonts, header, footer, skip link). `src/routeTree.gen.ts` is generated — never edit.
- `src/components/` — `SiteHeader.tsx` (nav links + ticker; exports `navLinks`, reused by the footer), `SiteFooter.tsx`, `ContactForm.tsx`, `NotFoundPage.tsx`. `ui/` holds leftover shadcn primitives (mostly unused).
- `src/lib/site.ts` — identity, email, `socials` array, `pageMeta()` helper for per-route head tags.
- `src/lib/gallery.ts` — gallery photo list + categories (the single source of gallery data).
- `src/lib/image.ts` — `cdn()` and `srcSet()` helpers that build Netlify Image CDN URLs. **All images must go through these**; never reference `/img/*.png` directly in an `<img src>` — the originals are ~2 MB PNGs.
- `content/` + `content-collections.ts` + `src/lib/content.ts` — Markdown collections for `projects`, `jobs`, `education` with Zod schemas. Projects have extra fields: `kind` (`infra` | `web`), `year`, `role`, `metric`, `metricLabel`, `order` (sort key, also used as the "Case 00N" number).
- `public/contact.html` — static Netlify Forms registration. Its fields (`form-name`, `bot-field`, `topic` ×3 radios, `name`, `email`, `message`) must stay in sync with `ContactForm.tsx`; a test enforces this.

## Design system ("service manual")

- Tokens in `src/styles.css`: `paper`, `paper-2`, `ink`, `ink-2`, `mute`, `signal` (orange accent), `signal-ink` (darker orange for text on paper), `ok` (green LED). Radius is 0 everywhere — keep it square.
- Fonts: Archivo (variable width — `.display` uses `font-stretch: 75%`, uppercase, tight leading) and JetBrains Mono for metadata. Loaded from Google Fonts in `__root.tsx`.
- Component classes: `.display`, `.kicker` (mono uppercase label), `.shell` (page container), `.tag`, `.btn` (ink button with orange offset shadow), `.btn-ghost`, `.link-u` (orange underline on hover), `.led`, `.stamp`, `.contact-input`.
- Motifs: 2px ink borders, numbered items (`01`, `P01`, `IMG_001`, `RULE_01`), the `// comment` kicker style. Use one accent colour only.
- Motion: `animate-rise` for entrance, transforms/opacity only; `prefers-reduced-motion` disables animation globally.

## Conventions

- Browser APIs only in effects/handlers (SSR). The gallery lightbox uses a native `<dialog>` opened in an effect.
- Netlify Forms is enabled for this site; the form POSTs URL-encoded data to `/contact.html`.
- The blog collection was removed on purpose; `blogSchema`/`resolveSlug` remain in `src/lib/content.ts` only because existing unit tests cover them.
- Gallery/project images in `public/img` are AI-generated placeholders (1264×848).
