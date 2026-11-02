import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Mail } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { pageMeta, site, socials } from '../lib/site'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () =>
    pageMeta(
      'Contact',
      'Open a ticket: IT support, a new website, or just a question. Email, GitHub, LinkedIn and more.',
    ),
})

const sla = [
  ['Response', '< 1 working day'],
  ['Hours', 'Mon–Fri · 09:00–18:00 WIB'],
  ['Emergencies', 'Existing clients jump the queue'],
]

function Contact() {
  return (
    <div className="shell pt-14">
      <header className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="kicker mb-6">05 / Contact</p>
          <h1 className="display text-[clamp(3.6rem,10vw,9rem)] animate-rise">
            Open a <span className="text-signal">ticket</span>
          </h1>
        </div>
        <p className="text-lg text-ink-2 lg:col-span-4">
          Tell me what’s broken or what you want built. Plain language is
          perfect — “the Wi-Fi hates me” is a valid bug report.
        </p>
      </header>

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="space-y-10 lg:col-span-5">
          <section aria-labelledby="direct">
            <h2 id="direct" className="kicker mb-4">
              // Direct line
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between gap-4 border-2 border-ink bg-signal p-5 transition-transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-4">
                <Mail aria-hidden="true" />
                <span className="text-lg font-bold break-all sm:text-xl">{site.email}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="shrink-0 transition-transform group-hover:rotate-45" />
            </a>
          </section>

          <section aria-labelledby="patch-panel">
            <h2 id="patch-panel" className="kicker mb-4">
              // Patch panel — find me elsewhere
            </h2>
            <ul className="border-2 border-ink">
              {socials.map((s, i) => (
                <li key={s.label} className="border-b-2 border-ink last:border-b-0">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
                  >
                    <span className="flex flex-col items-center gap-1.5 font-mono text-[10px] text-mute group-hover:text-signal">
                      <span className="led" />
                      P{String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block text-xl font-extrabold [font-stretch:90%]">{s.label}</span>
                      <span className="block font-mono text-xs text-mute group-hover:text-paper/60">
                        {s.handle} · {s.note}
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:rotate-45 group-hover:text-signal" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sla">
            <h2 id="sla" className="kicker mb-4">
              // Service level
            </h2>
            <dl className="border-t-2 border-ink font-mono text-sm">
              {sla.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-ink/30 py-3">
                  <dt className="text-mute uppercase tracking-wider text-xs pt-0.5">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  )
}
