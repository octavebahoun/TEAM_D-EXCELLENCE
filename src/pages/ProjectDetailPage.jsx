import { useMemo } from 'react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { categories, projects } from '../data/projects.js'

const EASE = [0.22, 1, 0.36, 1]

const markdowns = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true })
const bySlug = Object.fromEntries(
  Object.entries(markdowns).map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    return [slug, raw]
  }),
)

marked.setOptions({ gfm: true, breaks: false })

function NotFound() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-32 text-center">
      <div className="text-xs tracking-[0.14em] uppercase text-primary font-semibold">— 404</div>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink">Projet introuvable</h1>
      <p className="mt-4 text-text-muted">Ce projet n’existe pas ou plus dans notre catalogue.</p>
      <Link
        to="/projets"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-semibold hover:bg-primary transition-colors"
      >
        Retour aux projets
      </Link>
    </section>
  )
}

function ProjectHero({ p }) {
  const cat = categories.find((c) => c.key === p.category)
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-16 pb-8 sm:pt-24">
      <div className="text-sm text-text-light mb-6">
        <Link to="/projets" className="hover:text-primary transition-colors">← Tous les projets</Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-3 py-1.5 font-semibold">
            <span
              className={`size-1.5 rounded-full ${
                p.kind === 'SaaS interne'
                  ? 'bg-primary'
                  : p.kind === 'Open source'
                    ? 'bg-emerald-500'
                    : 'bg-white'
              }`}
            />
            {p.kind}
          </span>
          {cat && (
            <span className="inline-flex items-center gap-2 rounded-full bg-bg-card border border-border px-3 py-1.5 font-semibold text-ink">
              {cat.label}
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-3 py-1.5 font-semibold">
            {p.status || p.year}
          </span>
        </div>

        <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
          {p.name} <span className="text-primary">✦</span>
        </h1>
        <p className="mt-6 text-lg text-text-muted max-w-3xl leading-relaxed">{p.copy}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {p.site && (
            <a
              href={p.site}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Voir en ligne
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z" />
              </svg>
              Code source
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function CoverImage({ p }) {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        className="rounded-[32px] overflow-hidden bg-bg-card shadow-soft aspect-[16/9]"
      >
        {p.image ? (
          <img src={p.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full"
            style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #FE4619 100%)' }}
          />
        )}
      </motion.div>
    </section>
  )
}

function SideStack({ p }) {
  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <div className="rounded-[24px] bg-bg-card p-6">
        <div className="text-[11px] tracking-[0.16em] uppercase text-primary font-bold">— Stack</div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-white border border-border px-3 py-1.5 text-xs font-medium text-ink">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-text-light font-semibold tracking-[0.14em] uppercase mb-1">Année</div>
            <div className="text-ink font-bold">{p.year}</div>
          </div>
          <div>
            <div className="text-text-light font-semibold tracking-[0.14em] uppercase mb-1">Statut</div>
            <div className="text-ink font-bold">{p.status || '—'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-text-light font-semibold tracking-[0.14em] uppercase mb-1">Type</div>
            <div className="text-ink font-bold">{p.kind}</div>
          </div>
        </div>

        {(p.site || p.github) && (
          <div className="mt-6 border-t border-border pt-4 flex flex-col gap-2">
            {p.site && (
              <a href={p.site} target="_blank" rel="noreferrer noopener" className="text-xs text-ink hover:text-primary transition-colors flex items-center gap-2 break-all">
                <span className="text-text-light">↗</span>{p.site.replace(/^https?:\/\//, '')}
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer noopener" className="text-xs text-ink hover:text-primary transition-colors flex items-center gap-2 break-all">
                <span className="text-text-light">↗</span>{p.github.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

function MarkdownBody({ raw }) {
  const html = useMemo(() => (raw ? marked.parse(raw) : ''), [raw])
  if (!raw) {
    return (
      <div className="rounded-[20px] border border-dashed border-border p-10 text-center text-text-muted text-sm">
        Fiche détaillée à venir.
      </div>
    )
  }
  return (
    <article
      className="project-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function RelatedProjects({ current }) {
  const related = projects.filter((p) => p.category === current.category && p.slug !== current.slug).slice(0, 3)
  if (related.length === 0) return null
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Dans la même catégorie
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            À voir <span className="italic-accent">aussi</span>.
          </h2>
        </div>
        <Link
          to="/projets"
          className="text-sm font-semibold text-ink hover:text-primary transition-colors"
        >
          Tous les projets →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/projets/${p.slug}`}
            className="group rounded-[20px] bg-white shadow-soft overflow-hidden hover:shadow-lift transition-shadow"
          >
            <div className="aspect-[16/10] bg-bg-soft overflow-hidden">
              {p.image ? (
                <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div aria-hidden="true" className="h-full w-full" style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #FE4619 100%)' }} />
              )}
            </div>
            <div className="p-5">
              <div className="text-lg font-bold text-ink group-hover:text-primary transition-colors">{p.name}</div>
              <div className="mt-1 text-xs text-text-light">{p.kind} · {p.year}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.slug === id)

  if (!project) return <NotFound />

  const raw = bySlug[project.slug]

  return (
    <>
      <ProjectHero p={project} />
      <CoverImage p={project} />

      <section className="mx-auto max-w-[77.5rem] px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <MarkdownBody raw={raw} />
          <SideStack p={project} />
        </div>
      </section>

      <RelatedProjects current={project} />

      <section className="mx-auto max-w-[77.5rem] px-6 pb-24 sm:pb-32">
        <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
              <span className="h-px w-8 bg-primary" />
              — Un projet similaire ?
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05]">
              On peut vous <span className="italic-accent">accompagner</span>.
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Nous écrire
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
