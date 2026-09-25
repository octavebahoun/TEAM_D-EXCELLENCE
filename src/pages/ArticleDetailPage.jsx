import Seo from '../components/Seo'
import Star from '../components/Star'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { articleCategories, articles } from '../data/articles.js'

const EASE = [0.22, 1, 0.36, 1]

const markdowns = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true })
const bySlug = Object.fromEntries(
  Object.entries(markdowns).map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    return [slug, raw]
  }),
)

marked.setOptions({ gfm: true, breaks: false })

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function categoryOf(key) {
  return articleCategories.find((c) => c.key === key)
}

function NotFound() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-32 text-center">
      <div className="text-xs tracking-[0.14em] uppercase text-primary font-semibold">— 404</div>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink">Article introuvable</h1>
      <p className="mt-4 text-text-muted">Cet article n’existe pas ou plus dans le journal.</p>
      <Link
        to="/journal"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-semibold hover:bg-primary transition-colors"
      >
        Retour au journal
      </Link>
    </section>
  )
}

function ArticleHero({ a }) {
  const cat = categoryOf(a.category)
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-16 pb-8 sm:pt-24">
      <div className="text-sm text-text-light mb-6">
        <Link to="/journal" className="hover:text-primary transition-colors">← Journal</Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {cat && (
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.14em] uppercase text-white"
            style={{ background: cat.tone }}
          >
            {cat.label}
          </span>
        )}

        <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-ink">
          {a.title} <Star />
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-light">
          <span className="font-semibold text-ink">{a.author}</span>
          <span>·</span>
          <span>{formatDate(a.date)}</span>
          <span>·</span>
          <span>{a.readMin} min de lecture</span>
        </div>
      </motion.div>
    </section>
  )
}

function MarkdownBody({ raw }) {
  const html = useMemo(() => (raw ? marked.parse(raw) : ''), [raw])
  if (!raw) {
    return (
      <div className="rounded-[20px] border border-dashed border-border p-10 text-center text-text-muted text-sm">
        Article à venir.
      </div>
    )
  }
  return (
    <article
      className="project-prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const article = articles.find((a) => a.slug === id)

  if (!article) return <NotFound />

  const raw = bySlug[article.slug]

  return (
    <>
      <Seo
        path={`/blog/${article.slug}`}
        title={article.title}
        description={article.excerpt}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          author: { '@type': 'Person', name: article.author },
          datePublished: article.date,
          url: `https://www.excellenceteam.site/blog/${article.slug}`,
        }}
      />
      <ArticleHero a={article} />

      <section className="mx-auto max-w-[68ch] px-6 py-12">
        <MarkdownBody raw={raw} />
      </section>

      <section className="mx-auto max-w-[77.5rem] px-6 pb-24 sm:pb-32">
        <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
              <span className="h-px w-8 bg-primary" />
              — Un projet en tête ?
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
