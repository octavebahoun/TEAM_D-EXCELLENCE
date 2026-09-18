import Star from './Star'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

const services = [
  {
    n: '01',
    title: 'Web & SaaS',
    accent: 'SaaS',
    copy: 'Application web complète pensée pour votre métier. Prototype fonctionnel d’abord, mise en production ensuite, formation et remise des clés à la fin.',
    tags: ['React', 'Next.js', 'Node', 'Vercel'],
    tone: 'dark',
    span: 'lg:col-span-2',
    illu: '/service-01-web-saas.svg',
  },
  {
    n: '02',
    title: 'IA & Data',
    accent: 'IA',
    copy: 'Des LLMs en production, pas en démonstration. RAG, fine-tuning, enrichissement automatique, génération assistée. Chaque sortie validée.',
    tags: ['LLM', 'RAG', 'Python'],
    tone: 'light',
    span: 'lg:col-span-1 lg:row-span-2',
    illu: '/service-02-ia-data.svg',
  },
  {
    n: '03',
    title: 'Plateformes métier',
    accent: 'métier',
    copy: 'Outils de gestion sur mesure pour établissements, associations et communautés. Notes, membres, gouvernance, suivi.',
    tags: ['Postgres', 'Auth', 'Admin'],
    tone: 'light',
    span: 'lg:col-span-1',
    illu: '/service-03-plateformes-metier.svg',
  },
  {
    n: '04',
    title: 'Cloud & Architecture',
    accent: 'Cloud',
    copy: 'Infrastructure pensée pour durer. Composants open source, déploiement continu, API-first. Aucune dépendance à une licence éditeur.',
    tags: ['Docker', 'CI/CD', 'Open source'],
    tone: 'light',
    span: 'lg:col-span-1',
    illu: '/service-04-cloud-architecture.svg',
  },
]

function ArrowBadge({ dark }) {
  return (
    <span
      className={`inline-flex size-11 items-center justify-center rounded-full transition-transform group-hover:rotate-45 ${
        dark ? 'bg-primary text-white' : 'bg-white border border-border text-ink'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  )
}

function ServiceCard({ s, layout }) {
  const dark = s.tone === 'dark'
  const parts = s.title.split(s.accent)
  const isBigSide = layout === 'big-side'
  const isTallTop = layout === 'tall-top'
  const isSmallTop = layout === 'small-top'

  return (
    <a
      href="/services"
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] transition-shadow hover:shadow-lift min-h-[280px] ${
        dark ? 'bg-ink text-white shadow-soft' : 'bg-bg-card text-ink'
      }`}
    >
      {isBigSide && s.illu && (
        <img
          src={s.illu}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 w-[300px] select-none transition-transform duration-500 ease-out group-hover:scale-105 opacity-95 hidden lg:block"
        />
      )}
      {isBigSide && s.illu && (
        <div className="relative overflow-hidden rounded-t-[24px] bg-white/10 flex items-center justify-center h-44 sm:h-52 lg:hidden">
          <img
            src={s.illu}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none w-[70%]"
          />
        </div>
      )}

      {(isTallTop || isSmallTop) && s.illu && (
        <div className={`relative overflow-hidden rounded-t-[24px] bg-white/60 flex items-center justify-center ${isTallTop ? 'h-64 sm:h-72' : 'h-44'}`}>
          <img
            src={s.illu}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105 ${
              isTallTop ? 'w-[85%]' : 'w-[75%]'
            }`}
          />
        </div>
      )}

      <div className={`relative flex flex-1 flex-col justify-between p-8 sm:p-10 ${isBigSide ? '' : 'pt-6 sm:pt-8'}`}>
        <div className="flex items-start justify-between gap-4">
          <span
            className={`text-xs tracking-[0.18em] uppercase font-semibold ${
              dark ? 'text-white/50' : 'text-text-light'
            }`}
          >
            Service {s.n}
          </span>
          <ArrowBadge dark={dark} />
        </div>

        <div className={`mt-6 sm:mt-8 ${isBigSide ? 'lg:max-w-[55%]' : ''}`}>
          <h3
            className={`text-2xl sm:text-3xl font-bold leading-tight tracking-tight ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            {parts[0]}
            <span className="italic text-primary">{s.accent}</span>
            {parts[1]}
          </h3>
          <p
            className={`mt-4 text-[15px] leading-relaxed ${isBigSide ? 'lg:max-w-md' : ''} ${
              dark ? 'text-white/70' : 'text-text-muted'
            }`}
          >
            {s.copy}
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <li
              key={t}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                dark ? 'bg-white/10 text-white' : 'bg-white border border-border text-ink'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  )
}

export default function Services() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24 sm:py-32">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Ce qu’on fait
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
            Quatre <span className="italic-accent">terrains</span>, un seul standard. <Star />
          </h2>
        </div>
        <a
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-white transition-colors self-start sm:self-end"
        >
          Détail des services
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:auto-rows-[minmax(280px,auto)]">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
            className={s.span}
          >
            <ServiceCard
              s={{ ...s, span: '' }}
              layout={
                s.span.includes('col-span-2')
                  ? 'big-side'
                  : s.span.includes('row-span-2')
                    ? 'tall-top'
                    : 'small-top'
              }
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
