import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { site, socials } from '../lib/site'
import { navLinks } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="kicker !text-paper/60 mb-5">// Got a problem?</p>
          <Link
            to="/contact"
            className="display block text-6xl sm:text-7xl hover:text-signal transition-colors"
          >
            Open a<br />
            ticket <span className="text-signal">→</span>
          </Link>
          <p className="mt-6 max-w-sm text-paper/70">
            Broken laptop, flaky Wi-Fi, or a website that needs to exist by
            Friday. I reply within one working day.
          </p>
        </div>
        <div>
          <p className="kicker !text-paper/60 mb-5">Sitemap</p>
          <ul className="space-y-2 font-mono text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-u">
                  <span className="text-paper/40">{l.port}</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker !text-paper/60 mb-5">Elsewhere</p>
          <ul className="space-y-2 font-mono text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u inline-flex items-center gap-1"
                >
                  {s.label}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="link-u">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <div className="shell flex flex-wrap justify-between gap-3 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex items-center gap-2">
            <span className="led" /> Uptime matters. So does this site — hosted
            on Netlify.
          </span>
        </div>
      </div>
    </footer>
  )
}
