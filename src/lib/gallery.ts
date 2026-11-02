/**
 * Gallery photos. Originals live in /public/img (1264×848) and are served
 * through the Netlify Image CDN — see src/lib/image.ts.
 * To add a photo: drop the file into public/img and add an entry here.
 */
export type GalleryCategory = 'infra' | 'desk' | 'field'

export type GalleryPhoto = {
  id: string
  src: string
  title: string
  caption: string
  category: GalleryCategory
  /** Layout hint for the mosaic: wide spans two columns, tall spans two rows. */
  size?: 'wide' | 'tall'
}

export const galleryCategories: { id: GalleryCategory | 'all'; label: string }[] =
  [
    { id: 'all', label: 'Everything' },
    { id: 'infra', label: 'Racks & networks' },
    { id: 'desk', label: 'Desk & code' },
    { id: 'field', label: 'Field calls' },
  ]

export const gallery: GalleryPhoto[] = [
  {
    id: 'rack-cabling',
    src: '/img/rack-cabling.png',
    title: 'Colour-coded or it didn’t happen',
    caption:
      'Blue for staff, green for servers, yellow for cameras, white for uplinks. Velcro, never zip ties.',
    category: 'infra',
    size: 'wide',
  },
  {
    id: 'cable-chaos',
    src: '/img/cable-chaos.png',
    title: 'The “before” photo',
    caption:
      'Every comms closet I inherit looks like this. Ten years of “just one more cable”.',
    category: 'infra',
    size: 'tall',
  },
  {
    id: 'workbench',
    src: '/img/workbench.png',
    title: 'Monday morning bench',
    caption:
      'Anti-static mat, labelled drives, a network diagram drawn by hand. Coffee optional, but not really.',
    category: 'desk',
  },
  {
    id: 'homelab',
    src: '/img/homelab.png',
    title: 'The home lab',
    caption:
      'Where I break things on purpose so I don’t break them at work. Mini PCs, a managed switch and a NAS.',
    category: 'infra',
  },
  {
    id: 'monitor-code',
    src: '/img/monitor-code.png',
    title: 'Night shift, the fun kind',
    caption:
      'After the tickets close, the editor opens. Most of my side projects start as a fix for a ticket.',
    category: 'desk',
    size: 'wide',
  },
  {
    id: 'field-call',
    src: '/img/field-call.png',
    title: 'Go-bag',
    caption:
      'Cable tester, label maker, spare patch leads and a laptop with a serial console. Covers 90% of call-outs.',
    category: 'field',
  },
  {
    id: 'label-maker',
    src: '/img/label-maker.png',
    title: 'Label everything',
    caption:
      'The single most underrated tool in IT. Future-you will thank present-you.',
    category: 'field',
    size: 'tall',
  },
  {
    id: 'helpdesk-desk',
    src: '/img/helpdesk-desk.png',
    title: 'Queue at zero',
    caption:
      'Two monitors, one headset, a ticket queue — and the rare, beautiful moment it hits zero.',
    category: 'desk',
  },
]
