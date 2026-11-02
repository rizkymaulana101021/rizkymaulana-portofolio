import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteHeader } from '../components/SiteHeader'
import { NotFoundPage } from '../components/NotFoundPage'
import { SiteFooter } from '../components/SiteFooter'
import { site } from '../lib/site'

import '../styles.css'

const siteName = site.name
const siteDescription = site.description

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'theme-color', content: '#ece8df' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400;500;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-signal focus:p-4 focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
