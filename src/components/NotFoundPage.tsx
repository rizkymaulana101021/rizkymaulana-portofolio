import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="shell py-20">
      <p className="kicker mb-6">Error · HTTP 404</p>
      <h1 className="display text-[clamp(4rem,14vw,12rem)]">
        Have you tried
        <br />
        <span className="text-signal">turning it off</span>
        <br />
        and on again?
      </h1>
      <p className="mt-8 max-w-lg text-lg text-ink-2">
        This page doesn’t exist — or it was moved without updating the
        documentation. (I know. I’m filing a ticket against myself.)
      </p>
      <Link to="/" className="btn mt-10">
        Back to index
      </Link>
    </div>
  )
}
