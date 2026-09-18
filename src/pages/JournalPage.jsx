import Seo from '../components/Seo'
import Star from '../components/Star'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { articleCategories, articles } from '../data/articles.js'

const EASE = [0.22, 1, 0.36, 1]

const FORMSPREE_URL = 'https://formspree.io/f/mzezbvdr'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function categoryOf(key) {
  return articleCategories.find((c) => c.key === key)
}

function Cover({ a, size = 'sm' }) {
  const cat = categoryOf(a.category)
  const tone = cat?.tone || '#0D0D0D'
  return (
    <div
      aria-hidden="true"
      className={`relative w-full ${size === 'lg' ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden`}
      style={{
        background: `radial-gradient(120% 100% at 20% 20%, ${tone}dd 0%, #0d0d0d 80%)`,
      }}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-25"
      >
        <circle cx="330" cy="60" r="90" fill="#ffffff" opacity="0.15" />
        <circle cx="60" cy="240" r="130" fill="#ffffff" opacity="0.08" />
        <path d="M0 250 Q 100 200 200 240 T 400 220" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
      <span
        className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-white"
        style={{ background: tone }}
      >
        {cat?.label || a.category}
      </span>
    </div>
  )
}

function PageHeader() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 text-center">
      <div className="inline-flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Journal
        <span className="h-px w-8 bg-primary" />
      </div>
      <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
        Nos retex, <span className="italic-accent">tirés du terrain</span>. <Star />
      </h1>
      <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Ce qu’on apprend en construisant. Décisions d’architecture, cas concrets, patterns qu’on répète, erreurs qu’on ne refait plus.
      </p>
    </section>
  )
}

function FeaturedArticle({ a }) {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 mb-16">
      <Link
        to={`/blog/${a.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-[28px] bg-white shadow-soft overflow-hidden hover:shadow-lift transition-shadow"
      >
        <div className="lg:h-full rounded-l-[28px] overflow-hidden">
          <Cover a={a} size="lg" />
        </div>
        <div className="p-8 lg:p-12">
          <div className="text-[11px] tracking-[0.16em] uppercase font-bold text-primary">
            — À la une
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-ink group-hover:text-primary transition-colors">
            {a.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{a.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-light">
            <span className="font-semibold text-ink">{a.author}</span>
            <span>·</span>
            <span>{formatDate(a.date)}</span>
            <span>·</span>
            <span>{a.readMin} min de lecture</span>
          </div>
        </div>
      </Link>
    </section>
  )
}

function FilterChips({ active, onChange, counts }) {
  const chips = [
    { key: 'all', label: 'Tous', total: counts.all },
    ...articleCategories.map((c) => ({ ...c, total: counts[c.key] || 0 })),
  ]
  return (
    <div className="mx-auto max-w-[77.5rem] px-6 mb-10 flex justify-center">
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
                    isActive ? 'bg-ink text-white' : 'text-ink hover:bg-bg-soft'
                  }`}
                >
                  {c.label}
                  <span
                    className={`text-[10px] tabular-nums rounded-full px-1.5 py-0.5 ${
                      isActive ? 'bg-primary text-white' : 'bg-bg-soft text-text-muted'
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

function ArticleCard({ a }) {
  return (
    <Link
      to={`/blog/${a.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-soft transition-shadow hover:shadow-lift"
    >
      <Cover a={a} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight leading-tight text-ink group-hover:text-primary transition-colors">
          {a.title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-text-muted line-clamp-3 flex-1">
          {a.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 text-[11px] text-text-light">
          <span className="font-semibold text-ink truncate">{a.author}</span>
          <span>{formatDate(a.date)} · {a.readMin} min</span>
        </div>
      </div>
    </Link>
  )
}

function NewsletterCta() {
  const [status, setStatus] = useState('idle')

  async function handle(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-8 pb-24 sm:pb-32">
      <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16 flex flex-col lg:flex-row items-start lg:items-center gap-10 justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Newsletter
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05]">
            Un article, <span className="italic-accent">une fois par mois</span>. Pas plus.
          </h2>
          <p className="mt-3 text-[15px] text-white/60">
            On envoie un mail par mois avec les nouveaux articles et une réflexion sur ce qu’on construit. Zéro spam.
          </p>
        </div>
        <form onSubmit={handle} className="w-full max-w-md">
          <input type="hidden" name="source" value="journal-newsletter" />
          <div className="flex items-center gap-2 rounded-full bg-white p-2">
            <input
              required
              type="email"
              name="email"
              placeholder="votre@email.com"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-text-light focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? '…' : 'S’abonner'}
            </button>
          </div>
          <p className="mt-3 text-xs text-white/50">
            {status === 'ok'
              ? 'Merci — vous êtes inscrit.'
              : status === 'error'
                ? 'Erreur d’envoi. Réessayez.'
                : 'En vous abonnant, vous acceptez notre politique de confidentialité.'}
          </p>
        </form>
      </div>
    </section>
  )
}

export default function JournalPage() {
  const [active, setActive] = useState('all')

  const sorted = useMemo(() => [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)), [])
  const [featured, ...rest] = sorted

  const counts = useMemo(() => {
    const c = { all: rest.length }
    for (const a of rest) c[a.category] = (c[a.category] || 0) + 1
    return c
  }, [rest])

  const filtered = useMemo(
    () => (active === 'all' ? rest : rest.filter((a) => a.category === active)),
    [active, rest],
  )

  return (
    <>
      <Seo
        path="/journal"
        title="Journal"
        description="Nos retex tirés du terrain — décisions d’architecture, cas concrets, patterns qu’on répète, erreurs qu’on ne refait plus."
      />
      <PageHeader />
      {featured && <FeaturedArticle a={featured} />}
      <FilterChips active={active} onChange={setActive} counts={counts} />

      <section className="mx-auto max-w-[77.5rem] px-6 min-h-[400px]">
        {filtered.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-border p-16 text-center">
            <p className="text-sm text-text-muted">Aucun article dans cette catégorie pour l’instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((a, i) => (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE, delay: (i % 3) * 0.05 }}
                >
                  <ArticleCard a={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <NewsletterCta />
    </>
  )
}
