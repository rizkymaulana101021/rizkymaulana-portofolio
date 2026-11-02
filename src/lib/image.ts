/**
 * Netlify Image CDN helpers. Originals live in /public/img and are never
 * shipped directly — every <img> goes through /.netlify/images so visitors
 * get a right-sized WebP/AVIF instead of a 2 MB PNG.
 */
type Opts = { h?: number; q?: number; fit?: 'cover' | 'contain' }

export function cdn(src: string, w: number, { h, q = 72, fit }: Opts = {}) {
  const params = new URLSearchParams({ url: src, w: String(w), q: String(q) })
  if (h) params.set('h', String(h))
  if (fit ?? (h ? 'cover' : undefined))
    params.set('fit', fit ?? (h ? 'cover' : 'contain'))
  return `/.netlify/images?${params.toString()}`
}

/** srcset across widths; pass `ratio` (h/w) to crop each width consistently. */
export function srcSet(src: string, widths: number[], ratio?: number, q?: number) {
  return widths
    .map(
      (w) =>
        `${cdn(src, w, { h: ratio ? Math.round(w * ratio) : undefined, q })} ${w}w`,
    )
    .join(', ')
}
