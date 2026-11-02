export const site = {
  name: 'Rizky Maulana',
  shortName: 'RM',
  role: 'IT Support Engineer & Web Developer',
  email: 'hello@rizkymaulana.dev',
  location: 'Indonesia · Remote-friendly',
  description:
    'Rizky Maulana — IT support engineer and web developer. I keep teams online and build fast, boring-in-the-best-way websites.',
  summary:
    'I spend my days on both sides of the screen: fixing the laptop, the Wi-Fi and the printer nobody else will touch — and then building the web app that stops the ticket from coming back.',
}

export const socials = [
  {
    label: 'GitHub',
    handle: '@rizkymaulana',
    href: 'https://github.com/rizkymaulana',
    note: 'Code, scripts & dotfiles',
  },
  {
    label: 'LinkedIn',
    handle: 'in/rizkymaulana',
    href: 'https://www.linkedin.com/in/rizkymaulana',
    note: 'Work history & references',
  },
  {
    label: 'Instagram',
    handle: '@rizky.builds',
    href: 'https://www.instagram.com/rizky.builds',
    note: 'Rack shots & cable crimes',
  },
  {
    label: 'X / Twitter',
    handle: '@rizkymaulana',
    href: 'https://x.com/rizkymaulana',
    note: 'Hot takes on DNS',
  },
] as const

export function pageMeta(title: string, description: string) {
  const fullTitle = `${title} — ${site.name}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
    ],
  }
}
