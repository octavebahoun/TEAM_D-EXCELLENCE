import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { categories, projects } from '../data/projects.js'

const EASE = [0.22, 1, 0.36, 1]

function ProjectCard({ p }) {
  return (
    <Link
      to={`/projets/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-soft">
        {p.image ? (
          <img
            src={p.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full"
            style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #FE4619 100%)' }}
          />
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
          <span
            className={`size-1.5 rounded-full ${
              p.kind === 'SaaS interne'
                ? 'bg-primary'
                : p.kind === 'Open source'
                  ? 'bg-emerald-500'
                  : 'bg-ink'
            }`}
          />
          {p.kind}
        </span>
        <span className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-ink leading-tight">
            {p.name}
          </h3>
          <span className="text-xs tracking-[0.14em] uppercase text-text-light font-semibold">
            {p.year}
          </span>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-text-muted line-clamp-3">
          {p.copy}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-bg-soft px-3 py-1.5 text-[11px] font-medium text-ink">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

function PageHeader({ total }) {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 text-center">
      <div className="inline-flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Projets
        <span className="h-px w-8 bg-primary" />
      </div>
      <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
        {total} projets, une seule <span className="italic-accent">exigence</span>.
        <span className="text-primary ml-3">✦</span>
      </h1>
      <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        SaaS internes, missions clients, contributions open source. Filtrez par domaine pour voir ce qu’on livre concrètement.
      </p>
    </section>
  )
}

function FilterChips({ active, onChange, counts }) {
  const chips = [{ key: 'all', label: 'Tous', total: counts.all }, ...categories.map((c) => ({ ...c, total: counts[c.key] || 0 }))]
  return (
    <div className="mx-auto max-w-[77.5rem] px-6 mb-12 flex justify-center">
      <div className="rounded-full bg-white border border-border shadow-soft overflow-x-auto max-w-full">
        <ul className="flex items-center gap-1 p-1 min-w-max">
          {chips.map((c) => {
            const isActive = active === c.key
            return (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => onChange(c.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-ink text-white'
                      : 'text-ink hover:bg-bg-soft'
                  }`}
                >
                  {c.label}
                  <span
                    className={`text-[10px] tabular-nums rounded-full px-1.5 py-0.5 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-bg-soft text-text-muted'
                    }`}
                  >
                    {c.total}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function CtaFinal() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-8 pb-24 sm:pb-32">
      <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Vous avez un projet ?
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            On vous prépare un <span className="italic-accent">devis</span> sous 48h.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Nous écrire
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <a
            href="https://cal.com/excellence-team-baw7ji"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink transition-colors"
          >
            Prendre RDV
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  const [active, setActive] = useState('all')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    for (const p of projects) c[p.category] = (c[p.category] || 0) + 1
    return c
  }, [])

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <>
      <PageHeader total={projects.length} />
      <FilterChips active={active} onChange={setActive} counts={counts} />

      <section className="mx-auto max-w-[77.5rem] px-6 min-h-[400px]">
        {filtered.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-border p-16 text-center">
            <p className="text-sm text-text-muted">Rien de public dans cette catégorie pour l’instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE, delay: (i % 4) * 0.04 }}
                >
                  <ProjectCard p={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <CtaFinal />
    </>
  )
}
