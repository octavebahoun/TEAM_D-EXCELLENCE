import Star from './Star'
import { motion } from 'motion/react'
import { projects as allProjects } from '../data/projects.js'

const EASE = [0.22, 1, 0.36, 1]

const projects = allProjects.slice(0, 4)

function ProjectCard({ p }) {
  return (
    <a
      href={`/projets/${p.slug}`}
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
          <span className={`size-1.5 rounded-full ${p.kind === 'SaaS interne' ? 'bg-primary' : 'bg-ink'}`} />
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
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight">
            {p.name}
          </h3>
          <span className="text-xs tracking-[0.14em] uppercase text-text-light font-semibold">
            {p.year}
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
          {p.copy}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-bg-soft px-3 py-1.5 text-xs font-medium text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24 sm:py-32">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Projets phares
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
            Ce qu’on a <span className="italic-accent">livré</span> récemment. <Star />
          </h2>
        </div>
        <a
          href="/projets"
          className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-white transition-colors self-start sm:self-end"
        >
          Tous les projets
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
          >
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
