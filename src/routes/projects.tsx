import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowUpRight } from 'lucide-react'
import { cdn, srcSet } from '../lib/image'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () =>
    pageMeta(
      'Work',
      'Case files from both sides of the job: infrastructure that stays up and websites that load fast.',
    ),
})

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'infra', label: 'Infra & support' },
  { id: 'web', label: 'Web builds' },
] as const

type Filter = (typeof filters)[number]['id']

function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const projects = [...allProjects]
    .sort((a, b) => a.order - b.order)
    .filter((p) => filter === 'all' || p.kind === filter)

  return (
    <div className="shell pt-14">
      <header className="grid gap-8 border-b-2 border-ink pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="kicker mb-6">03 / Work</p>
          <h1 className="display text-[clamp(3.6rem,10vw,9rem)] animate-rise">
            Case <span className="text-signal">files</span>
          </h1>
        </div>
        <p className="text-lg text-ink-2 lg:col-span-4">
          Every project starts with a problem someone was tired of. Here’s the
          problem, what I did, and the one number that proves it worked.
        </p>
      </header>

      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-0 border-b-2 border-ink">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="border-r-2 border-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper aria-pressed:bg-signal aria-pressed:text-ink"
          >
            {f.label}
            <span className="ml-2 text-mute">
              {f.id === 'all' ? allProjects.length : allProjects.filter((p) => p.kind === f.id).length}
            </span>
          </button>
        ))}
      </div>

      {projects.length ? (
        <div>
          {projects.map((project, i) => (
            <article
              key={project._meta.path}
              id={project._meta.path}
              className="grid scroll-mt-32 gap-8 border-b-2 border-ink py-14 lg:grid-cols-12 animate-rise"
            >
              <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                {project.image && (
                  <div className="group relative overflow-hidden border-2 border-ink">
                    <img
                      src={cdn(project.image, 1000, { h: 640 })}
                      srcSet={srcSet(project.image, [560, 1000, 1400], 0.64)}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      width={1000}
                      height={640}
                      alt={project.imageAlt ?? ''}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="aspect-[25/16] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
                      Case {String(project.order).padStart(3, '0')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
                  <span className={project.kind === 'infra' ? 'tag' : 'tag bg-ink text-paper'}>
                    {project.kind === 'infra' ? 'Infra & support' : 'Web build'}
                  </span>
                  {project.year && <span className="text-mute">{project.year}</span>}
                  {project.role && <span className="text-mute">· {project.role}</span>}
                </div>
                <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] [font-stretch:85%] sm:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-4 text-lg text-ink-2">{project.description}</p>
                {project.metric && (
                  <div className="my-6 border-y-2 border-ink py-4">
                    <p className="display text-7xl text-signal-ink">{project.metric}</p>
                    <p className="kicker mt-1">{project.metricLabel}</p>
                  </div>
                )}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.html }}
                />
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                {(project.github || project.liveUrl) && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">
                        Visit site <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                        Source <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-20 font-mono text-mute">No projects in this category yet.</p>
      )}
    </div>
  )
}
