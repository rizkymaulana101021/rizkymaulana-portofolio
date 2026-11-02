import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { site, pageMeta } from '../lib/site'
import { gallery } from '../lib/gallery'
import { cdn, srcSet } from '../lib/image'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => pageMeta('IT Support Engineer & Web Developer', site.description),
})

const services = {
  support: [
    'Helpdesk & on-site support',
    'Microsoft 365 / Google Workspace admin',
    'Office networks, Wi-Fi & firewalls',
    'Device fleets: imaging, MDM, backups',
    'Documentation people actually read',
  ],
  web: [
    'Marketing sites & storefronts',
    'Internal tools & dashboards',
    'Performance & Core Web Vitals rescue',
    'Accessibility audits & fixes',
    'Hosting, DNS & deploy pipelines',
  ],
}

const opinions = [
  ['Boring tech wins.', 'The best stack is the one your team can fix at 2am.'],
  ['Write it down.', 'If a fix lives only in my head, it isn’t finished.'],
  ['Speed is a feature.', 'A site that loads in 4 seconds is a site nobody uses.'],
  ['No blame, just logs.', 'Every outage is a lesson, not a scapegoat hunt.'],
]

function Home() {
  const featured = [...allProjects].sort((a, b) => a.order - b.order).slice(0, 2)
  const strip = gallery.slice(0, 4)
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="shell relative grid gap-10 pt-14 pb-16 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-8">
          <p className="kicker mb-6 flex items-center gap-3 animate-rise">
            <span className="led" /> Online · {site.location}
          </p>
          <h1 className="display text-[clamp(3.6rem,11vw,10.5rem)] animate-rise [animation-delay:80ms]">
            I fix the
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">thing.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.28em] bg-signal"
              />
            </span>
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">
              Then I build
            </span>
            <br />
            the better one.
          </h1>
        </div>
        <aside className="lg:col-span-4 lg:pt-24 animate-rise [animation-delay:220ms]">
          <div className="border-2 border-ink bg-paper shadow-[8px_8px_0_var(--ink)]">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
              <span>whoami</span>
              <span className="text-signal">● ● ●</span>
            </div>
            <dl className="divide-y divide-ink/20 font-mono text-sm">
              {[
                ['name', site.name],
                ['role', 'IT Support Engineer'],
                ['also', 'Web Developer'],
                ['uptime', '6+ yrs in the trenches'],
                ['status', 'Taking new projects'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 px-4 py-2.5">
                  <dt className="w-16 shrink-0 text-mute">{k}</dt>
                  <dd className={k === 'status' ? 'text-signal-ink font-bold' : ''}>
                    {v}
                  </dd>
                </div>
              ))}
              <div className="px-4 py-2.5 text-mute">
                $ <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-ink" />
              </div>
            </dl>
          </div>
          <p className="mt-8 text-lg leading-relaxed text-ink-2">{site.summary}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/projects" className="btn">
              See the work <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in touch
            </Link>
          </div>
        </aside>
      </section>

      {/* ── Two jobs ─────────────────────────────────────── */}
      <section aria-labelledby="two-jobs" className="border-y-2 border-ink">
        <div className="shell grid lg:grid-cols-2">
          <h2 id="two-jobs" className="sr-only">
            What I do
          </h2>
          {(
            [
              ['A', 'Keep it running', 'IT support & systems', services.support],
              ['B', 'Build it better', 'Web development', services.web],
            ] as const
          ).map(([letter, title, sub, items], i) => (
            <div
              key={letter}
              className={`py-12 lg:py-16 ${i === 0 ? 'lg:border-r-2 lg:border-ink lg:pr-12' : 'border-t-2 border-ink lg:border-t-0 lg:pl-12'}`}
            >
              <div className="flex items-start justify-between">
                <p className="kicker">
                  Side {letter} — {sub}
                </p>
                <span className="display text-7xl text-signal">{letter}</span>
              </div>
              <h3 className="display mt-2 text-5xl sm:text-6xl">{title}</h3>
              <ul className="mt-8 border-t border-ink">
                {items.map((item, n) => (
                  <li
                    key={item}
                    className="group flex items-baseline gap-4 border-b border-ink/25 py-3 transition-colors hover:bg-ink hover:text-paper hover:px-3"
                  >
                    <span className="font-mono text-xs text-mute group-hover:text-signal">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured work ────────────────────────────────── */}
      <section aria-labelledby="featured" className="shell pt-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-3">// Case files</p>
            <h2 id="featured" className="display text-6xl sm:text-7xl">
              Selected work
            </h2>
          </div>
          <Link to="/projects" className="link-u font-mono text-sm uppercase tracking-widest">
            All {allProjects.length} projects →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {featured.map((p, i) => (
            <Link
              key={p._meta.path}
              to="/projects"
              hash={p._meta.path}
              className={`group block border-2 border-ink bg-paper transition-transform hover:-translate-y-1 ${i === 1 ? 'md:mt-16' : ''}`}
            >
              {p.image && (
                <div className="overflow-hidden border-b-2 border-ink">
                  <img
                    src={cdn(p.image, 800, { h: 500 })}
                    srcSet={srcSet(p.image, [480, 800, 1200], 0.625)}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    width={800}
                    height={500}
                    alt={p.imageAlt ?? ''}
                    loading="lazy"
                    className="aspect-[8/5] w-full object-cover grayscale-[35%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
                  <span className={p.kind === 'infra' ? 'tag' : 'tag bg-ink text-paper'}>
                    {p.kind === 'infra' ? 'Infra' : 'Web'}
                  </span>
                  <span className="text-mute">{p.year}</span>
                </div>
                <h3 className="text-2xl font-extrabold leading-tight [font-stretch:90%]">
                  {p.title}
                </h3>
                <p className="mt-3 text-ink-2">{p.description}</p>
                {p.metric && (
                  <p className="mt-6 flex items-baseline gap-3 border-t border-ink pt-4">
                    <span className="display text-5xl text-signal-ink">{p.metric}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-mute">
                      {p.metricLabel}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Opinions ─────────────────────────────────────── */}
      <section aria-labelledby="opinions" className="shell pt-24">
        <p className="kicker mb-3">// Strong opinions, loosely held</p>
        <h2 id="opinions" className="sr-only">
          How I work
        </h2>
        <ol className="grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {opinions.map(([title, body], i) => (
            <li
              key={title}
              className="border-b-2 border-r-2 border-ink p-6 transition-colors hover:bg-signal"
            >
              <span className="font-mono text-xs text-mute">RULE_{String(i + 1).padStart(2, '0')}</span>
              <p className="display mt-6 text-3xl">{title}</p>
              <p className="mt-3 text-ink-2">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Gallery strip ────────────────────────────────── */}
      <section aria-labelledby="from-the-field" className="pt-24">
        <div className="shell mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-3">// From the field</p>
            <h2 id="from-the-field" className="display text-6xl sm:text-7xl">
              Racks, desks & <span className="text-signal">cable crimes</span>
            </h2>
          </div>
          <Link to="/gallery" className="btn-ghost">
            Open gallery <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="shell grid grid-cols-2 gap-3 lg:grid-cols-4">
          {strip.map((photo, i) => (
            <Link
              key={photo.id}
              to="/gallery"
              className={`group relative block overflow-hidden border-2 border-ink ${i % 2 ? 'lg:translate-y-8' : ''}`}
            >
              <img
                src={cdn(photo.src, 480, { h: 600 })}
                srcSet={srcSet(photo.src, [320, 480, 720], 1.25)}
                sizes="(min-width: 1024px) 25vw, 50vw"
                width={480}
                height={600}
                alt={photo.title}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-0 left-0 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
                IMG_{String(i + 1).padStart(3, '0')}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
