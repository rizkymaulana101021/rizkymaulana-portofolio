import { createFileRoute, Link } from '@tanstack/react-router'
import { allEducations, allJobs } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import { chronologicalEntries } from '../lib/chronology'
import { cdn, srcSet } from '../lib/image'
import { pageMeta, site } from '../lib/site'

export const Route = createFileRoute('/about')({
  component: About,
  head: () =>
    pageMeta(
      'About',
      'The person behind the tickets and the commits: background, experience, toolbox and how I work.',
    ),
})

const stats = [
  ['6+', 'years in IT'],
  ['4,000+', 'tickets closed'],
  ['30+', 'sites shipped'],
  ['1', 'label maker, well used'],
]

const toolbox = {
  'Systems & support': [
    'Microsoft 365',
    'Entra ID / Intune',
    'Google Workspace',
    'Windows · macOS · Linux',
    'PowerShell · Bash',
    'Backups & DR',
  ],
  Networking: ['VLANs & routing', 'UniFi', 'pfSense / OPNsense', 'WireGuard', 'DNS · DHCP', 'Structured cabling'],
  'Web development': [
    'TypeScript',
    'React',
    'TanStack Start',
    'Tailwind CSS',
    'Postgres',
    'Netlify',
  ],
}

function year(date: string) {
  return date.slice(0, 4)
}

function About() {
  return (
    <div className="shell pt-14">
      {/* Intro */}
      <section className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="kicker mb-6">02 / About</p>
          <h1 className="display text-[clamp(3.4rem,9vw,8rem)] animate-rise">
            Half sysadmin.
            <br />
            <span className="text-signal">Half developer.</span>
            <br />
            Fully on call.
          </h1>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-2">
            <p>
              I’m {site.name}. I started out swapping RAM and resetting
              passwords at a clinic helpdesk, and I never quite stopped. Today I
              run IT for a logistics company by day and build websites and
              internal tools for small businesses on the side.
            </p>
            <p>
              Doing both jobs makes me better at each. Support taught me that
              every confusing screen becomes a ticket — so I build software that
              doesn’t need a manual. Development taught me to automate the
              boring parts of support so I can spend time on the interesting
              ones.
            </p>
            <p className="font-semibold text-ink">
              My rule: if I fix something twice, I write a script. If I fix it
              three times, I build a tool.
            </p>
          </div>
        </div>
        <figure className="lg:col-span-5 lg:pt-16">
          <div className="relative border-2 border-ink shadow-[10px_10px_0_var(--signal)]">
            <img
              src={cdn('/img/workbench.png', 800, { h: 1000 })}
              srcSet={srcSet('/img/workbench.png', [480, 800, 1100], 1.25)}
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={800}
              height={1000}
              alt="Overhead view of an IT workbench with an open laptop, screwdrivers and labelled drives"
              className="aspect-[4/5] w-full object-cover"
            />
            <span className="stamp absolute -top-4 right-4 bg-paper">
              Field-tested
            </span>
          </div>
          <figcaption className="kicker mt-4">
            Fig. 1 — The bench, on a normal Monday.
          </figcaption>
        </figure>
      </section>

      {/* Stats */}
      <section aria-label="By the numbers" className="mt-20 grid grid-cols-2 border-l-2 border-t-2 border-ink lg:grid-cols-4">
        {stats.map(([n, label]) => (
          <div key={label} className="border-b-2 border-r-2 border-ink p-6">
            <p className="display text-6xl sm:text-7xl">{n}</p>
            <p className="kicker mt-3">{label}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="mt-24 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker mb-3">// Changelog</p>
          <h2 id="experience" className="display text-6xl lg:sticky lg:top-32">
            Experience
          </h2>
        </div>
        <ol className="border-t-2 border-ink lg:col-span-8">
          {chronologicalEntries(allJobs).map((job) => (
            <li key={job._meta.path} className="grid gap-4 border-b-2 border-ink py-8 sm:grid-cols-[9rem_1fr]">
              <p className="font-mono text-sm">
                <span className="font-bold">{year(job.startDate)}</span>
                <span className="text-mute"> → {job.endDate ? year(job.endDate) : 'now'}</span>
                {!job.endDate && (
                  <span className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-ok">
                    <span className="led" /> Current
                  </span>
                )}
              </p>
              <div>
                <h3 className="text-2xl font-extrabold [font-stretch:90%]">{job.jobTitle}</h3>
                <p className="font-mono text-sm text-mute">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ''}
                </p>
                <p className="mt-4 text-lg">{job.summary}</p>
                <div className="prose mt-3 max-w-none" dangerouslySetInnerHTML={{ __html: job.html }} />
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills">
                  {job.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Toolbox */}
      <section aria-labelledby="toolbox" className="mt-24">
        <p className="kicker mb-3">// What’s in the bag</p>
        <h2 id="toolbox" className="display text-6xl">
          Toolbox
        </h2>
        <div className="mt-10 grid gap-0 border-2 border-ink md:grid-cols-3">
          {Object.entries(toolbox).map(([group, items], i) => (
            <div key={group} className={`p-6 ${i > 0 ? 'border-t-2 border-ink md:border-t-0 md:border-l-2' : ''}`}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal-ink">
                {group}
              </h3>
              <ul className="mt-5 space-y-2 text-lg">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education" className="mt-24 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker mb-3">// Credentials</p>
          <h2 id="education" className="display text-6xl">
            Education & certs
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {chronologicalEntries(allEducations).map((e) => (
            <li key={e._meta.path} className="border-2 border-ink p-6">
              <p className="font-mono text-xs text-mute">
                {year(e.startDate)}
                {e.endDate && year(e.endDate) !== year(e.startDate) ? `–${year(e.endDate)}` : ''}
              </p>
              <h3 className="mt-3 text-xl font-extrabold [font-stretch:90%]">{e.school}</h3>
              <p className="mt-2 text-ink-2">{e.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 flex flex-col items-start justify-between gap-6 border-2 border-ink bg-signal p-8 sm:flex-row sm:items-center sm:p-12">
        <p className="display text-4xl sm:text-5xl">Need a hand, or a website?</p>
        <Link to="/contact" className="btn">
          Let’s talk <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </section>
    </div>
  )
}
