import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { site } from '../lib/site'

export const navLinks = [
  { to: '/', label: 'Index', port: '01' },
  { to: '/about', label: 'About', port: '02' },
  { to: '/projects', label: 'Work', port: '03' },
  { to: '/gallery', label: 'Gallery', port: '04' },
  { to: '/contact', label: 'Contact', port: '05' },
] as const

const ticker = [
  'All systems nominal',
  'Available for freelance builds — Q1',
  'Avg. ticket response < 2h',
  'DNS is always the problem',
  'Currently shipping: Deskline v2',
  'Label your cables',
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="overflow-hidden border-b border-ink bg-ink text-paper">
        <div className="flex w-max animate-marquee gap-10 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="flex items-center gap-3" aria-hidden={i >= ticker.length}>
              <span className="text-signal">■</span>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="shell flex items-stretch justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 py-3 pr-6"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-10 place-items-center bg-signal font-mono text-sm font-bold text-ink">
            {site.shortName}
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold uppercase tracking-tight [font-stretch:110%]">
              {site.name}
            </span>
            <span className="kicker block !text-[10px]">
              Support · Systems · Web
            </span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === '/' }}
              className="group flex items-center gap-2 border-l border-ink px-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper data-[status=active]:bg-signal data-[status=active]:text-ink"
            >
              <span className="text-mute group-hover:text-signal group-data-[status=active]:text-ink">
                {link.port}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden px-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-ink md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === '/' }}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-ink/30 px-5 py-4 display text-4xl data-[status=active]:bg-signal"
            >
              <span className="font-mono text-xs font-normal text-mute">
                {link.port}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
