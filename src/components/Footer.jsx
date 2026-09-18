import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExcellenceTeam } from './mascot/index.js'

const FORMSPREE_URL = 'https://formspree.io/f/mzezbvdr'

const columns = [
  {
    title: 'Sitemap',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Projets', to: '/projets' },
      { label: 'Services', to: '/services' },
      { label: 'À propos', to: '/a-propos' },
      { label: 'Journal', to: '/journal' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web & SaaS', to: '/services#web' },
      { label: 'IA & Data', to: '/services#ia' },
      { label: 'Plateformes métier', to: '/services#plateformes' },
      { label: 'Cloud & Architecture', to: '/services#cloud' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'contact@excellenceteam.site', href: 'mailto:contact@excellenceteam.site' },
      { label: 'Prendre RDV', href: 'https://cal.com/excellence-team-baw7ji' },
      { label: 'Lokossa, Bénin', static: true },
    ],
  },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/octavebahoun/TEAM_D-EXCELLENCE', d: 'M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z' },
  { label: 'LinkedIn', href: '#', d: 'M20.5 3h-17A1.5 1.5 0 002 4.5v15A1.5 1.5 0 003.5 21h17a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0020.5 3zM8 18H5v-9h3v9zM6.5 7.7a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 18h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h-3v-9h3v1.2c.6-.9 1.7-1.4 2.8-1.4 2.1 0 4.2 1.7 4.2 4.5V18z' },
  { label: 'X', href: '#', d: 'M18.24 3H21l-6.5 7.43L22 21h-6.24l-4.9-6.44L5.28 21H2.52l6.95-7.94L2 3h6.4l4.44 5.87L18.24 3zm-1.09 16.19h1.72L7.94 4.72H6.12l11.03 14.47z' },
  { label: 'YouTube', href: '#', d: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z' },
]

function Newsletter() {
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
    <form onSubmit={handle} className="mt-6 w-full max-w-md">
      <input type="hidden" name="source" value="newsletter" />
      <div className="flex items-center gap-2 rounded-full bg-white p-2 shadow-soft">
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
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? '…' : 'S’abonner'}
        </button>
      </div>
      <p className="mt-3 text-xs text-text-light">
        {status === 'ok'
          ? 'Merci — vous êtes inscrit.'
          : status === 'error'
            ? 'Erreur d’envoi. Réessayez.'
            : 'En vous abonnant, vous acceptez notre politique de confidentialité.'}
      </p>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-bg-card">
      <div className="mx-auto max-w-[85rem] px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight max-w-md">
              Restez au courant. <span className="italic-accent">Une newsletter</span> par mois, pas plus.
            </h3>
            <Newsletter />

            <ul className="mt-8 flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-ink hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-[11px] font-bold tracking-[0.16em] uppercase text-ink">
                  {c.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.static ? (
                        <span className="text-sm text-text-muted">{l.label}</span>
                      ) : l.href ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel={l.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                          className="text-sm text-text-muted hover:text-primary transition-colors"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          to={l.to}
                          className="text-sm text-text-muted hover:text-primary transition-colors"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Wordmark géant — fit-to-width, avec mascotte perchée */}
        <div className="relative mt-16 sm:mt-24 select-none">
          <div className="absolute z-10 left-[3%] -top-8 sm:-top-12 lg:-top-20 -translate-y-1/4">
            <ExcellenceTeam state="happy" size={110} playing interactive />
          </div>
          <div className="overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="font-extrabold text-primary leading-[0.85] tracking-[-0.04em] whitespace-nowrap"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 11rem)' }}
            >
              excellence team<span className="text-ink">.</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-text-light">
            © 2026 Excellence Team — Lokossa, Bénin. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-xs text-text-light">
            <a href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </a>
            <a href="/confidentialite" className="hover:text-primary transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

