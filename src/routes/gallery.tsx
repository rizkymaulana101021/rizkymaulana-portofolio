import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
} from '../lib/gallery'
import { cdn, srcSet } from '../lib/image'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
  head: () =>
    pageMeta(
      'Gallery',
      'Server racks, workbenches, field calls and late-night code — photos from the job.',
    ),
})

const ORIGINAL_RATIO = 848 / 1264

function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const photos = gallery.filter((p) => filter === 'all' || p.category === filter)
  const current = active === null ? null : photos[active]

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (active !== null && !el.open) el.showModal()
    if (active === null && el.open) el.close()
  }, [active])

  function step(delta: number) {
    setActive((i) => (i === null ? i : (i + delta + photos.length) % photos.length))
  }

  return (
    <div className="shell pt-14">
      <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="kicker mb-6">04 / Gallery</p>
          <h1 className="display text-[clamp(3.6rem,10vw,9rem)] animate-rise">
            Proof of <span className="text-signal">work</span>
          </h1>
        </div>
        <p className="text-lg text-ink-2 lg:col-span-4">
          Before-and-afters, workbenches and the occasional crime scene. Every
          image is resized and converted on the fly, so this page stays fast on
          a phone.
        </p>
      </header>

      <div
        role="group"
        aria-label="Filter photos"
        className="mt-10 flex flex-wrap border-2 border-ink"
      >
        {galleryCategories.map((c) => {
          const count =
            c.id === 'all'
              ? gallery.length
              : gallery.filter((p) => p.category === c.id).length
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => {
                setFilter(c.id)
                setActive(null)
              }}
              className="flex-1 whitespace-nowrap border-r-2 border-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] last:border-r-0 transition-colors hover:bg-ink hover:text-paper aria-pressed:bg-signal aria-pressed:text-ink"
            >
              {c.label} <span className="text-mute">({count})</span>
            </button>
          )
        })}
      </div>

      <ul className="mt-6 grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[240px] lg:grid-cols-4">
        {photos.map((photo, i) => {
          const span =
            photo.size === 'wide'
              ? 'sm:col-span-2'
              : photo.size === 'tall'
                ? 'sm:row-span-2'
                : ''
          const w = photo.size === 'wide' ? 960 : 520
          const h = photo.size === 'tall' ? 760 : 380
          return (
            <li key={photo.id} className={`${span} animate-rise`} style={{ animationDelay: `${i * 50}ms` }}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block h-full w-full overflow-hidden border-2 border-ink bg-ink text-left"
                aria-label={`Open photo: ${photo.title}`}
              >
                <img
                  src={cdn(photo.src, w, { h })}
                  srcSet={srcSet(photo.src, [Math.round(w / 2), w, Math.round(w * 1.5)], h / w)}
                  sizes={photo.size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                  width={w}
                  height={h}
                  alt=""
                  loading={i < 4 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-paper p-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span className="kicker block !text-[10px]">
                    IMG_{String(gallery.indexOf(photo) + 1).padStart(3, '0')} ·{' '}
                    {galleryCategories.find((c) => c.id === photo.category)?.label}
                  </span>
                  <span className="mt-1 block font-bold">{photo.title}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? current.title : 'Photo viewer'}
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null)
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 text-paper backdrop:bg-ink/90"
      >
        {current && (
          <div className="flex w-[min(92vw,1200px)] flex-col">
            <div className="flex items-center justify-between border-2 border-b-0 border-paper bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]">
              <span>
                {String((active ?? 0) + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex items-center gap-2 hover:text-signal"
                aria-label="Close photo viewer"
              >
                Esc <X aria-hidden="true" size={18} />
              </button>
            </div>
            <div className="relative border-2 border-paper bg-ink">
              <img
                key={current.id}
                src={cdn(current.src, 1200)}
                srcSet={srcSet(current.src, [640, 1000, 1264])}
                sizes="92vw"
                width={1200}
                height={Math.round(1200 * ORIGINAL_RATIO)}
                alt={current.title}
                className="max-h-[72vh] w-full animate-in fade-in object-contain duration-300"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-paper p-3 text-ink hover:bg-signal"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-paper p-3 text-ink hover:bg-signal"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
            <div className="border-2 border-t-0 border-paper bg-paper p-5 text-ink">
              <p className="display text-3xl">{current.title}</p>
              <p className="mt-2 max-w-3xl text-ink-2">{current.caption}</p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
