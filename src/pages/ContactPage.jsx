import Seo from '../components/Seo'
import Star from '../components/Star'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ExcellenceTeam } from '../components/mascot/index.js'

const EASE = [0.22, 1, 0.36, 1]

const FORMSPREE_URL = 'https://formspree.io/f/mzezbvdr'
const CAL_URL = 'https://cal.com/excellence-team-baw7ji'

const FIELD_STATE = {
  name: 'happy',
  email: 'thinking',
  company: 'surprised',
  budget: 'thinking',
  type: 'surprised',
  message: 'singing',
}

const channels = [
  {
    title: 'Email',
    value: 'contact@excellenceteam.site',
    href: 'mailto:contact@excellenceteam.site',
    d: 'M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z M2 8l10 6 10-6',
  },
  {
    title: 'WhatsApp',
    value: '+229 [XX XX XX XX]',
    href: 'https://wa.me/[229XXXXXXXX]',
    d: 'M20 3.5A12 12 0 003 21l-1 6 6-1a12 12 0 0018-16l-6-6.5zM8 11l1-2 2 1a5 5 0 002 2l1 2-2 1a5 5 0 00-4-4z',
  },
  {
    title: 'Prendre RDV',
    value: '30 min via Cal.com',
    href: CAL_URL,
    d: 'M3 5h18v16H3zM3 9h18 M8 3v4 M16 3v4',
  },
  {
    title: 'Locaux',
    value: 'Lokossa, Bénin',
    href: null,
    d: 'M12 22s7-8 7-13a7 7 0 10-14 0c0 5 7 13 7 13z M12 11a2 2 0 100-4 2 2 0 000 4z',
  },
]

function PageHeader() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 text-center">
      <div className="inline-flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Contact
        <span className="h-px w-8 bg-primary" />
      </div>
      <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
        Un brief, on vous <span className="italic-accent">répond</span>.
        <Star className="ml-3" />
      </h1>
      <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Décrivez votre besoin en quelques lignes. On revient vers vous sous <span className="font-semibold text-ink">24 à 48 heures ouvrées</span>, avec les prochaines étapes concrètes.
      </p>
    </section>
  )
}

function ChannelsRow() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((c, i) => {
          const Wrapper = c.href ? 'a' : 'div'
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
            >
              <Wrapper
                {...(c.href
                  ? {
                      href: c.href,
                      target: c.href.startsWith('http') ? '_blank' : undefined,
                      rel: c.href.startsWith('http') ? 'noreferrer noopener' : undefined,
                    }
                  : {})}
                className="group flex flex-col items-start gap-3 rounded-[20px] bg-white border border-border p-6 h-full transition-shadow hover:shadow-soft"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-bg-soft text-ink group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={c.d} />
                  </svg>
                </span>
                <div>
                  <div className="text-[11px] tracking-[0.16em] uppercase text-text-light font-semibold">
                    {c.title}
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-ink break-words">
                    {c.value}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [focusedField, setFocusedField] = useState(null)
  const [mascotY, setMascotY] = useState(0)
  const formRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const companyRef = useRef(null)
  const typeRef = useRef(null)
  const budgetRef = useRef(null)
  const messageRef = useRef(null)
  const refs = {
    name: nameRef, email: emailRef, company: companyRef,
    type: typeRef, budget: budgetRef, message: messageRef,
  }

  useEffect(() => {
    if (!focusedField) return
    const el = refs[focusedField]?.current
    if (!el) return
    const y = el.offsetTop + el.offsetHeight / 2 - 32
    setMascotY(y)
  }, [focusedField])

  const mascotState =
    status === 'sending' ? 'loading' :
    status === 'ok' ? 'success' :
    status === 'error' ? 'sad' :
    focusedField ? FIELD_STATE[focusedField] : 'idle'

  async function handleSubmit(e) {
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

  function bindFocus(field, ref) {
    return {
      ref,
      onFocus: () => setFocusedField(field),
      onBlur: () => setFocusedField((f) => (f === field ? null : f)),
    }
  }

  const inputCls =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-4"
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ y: mascotY, opacity: focusedField ? 1 : 0.55 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="pointer-events-none absolute -left-20 top-0 hidden lg:block"
      >
        <ExcellenceTeam state={mascotState} size={64} interactive={false} />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Votre nom</span>
          <input required {...bindFocus('name', nameRef)} name="name" type="text" placeholder="Jean Dupont" className={inputCls} />
        </label>
        <label>
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Email</span>
          <input required {...bindFocus('email', emailRef)} name="email" type="email" placeholder="vous@email.com" className={inputCls} />
        </label>
      </div>

      <label>
        <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Société / structure</span>
        <input {...bindFocus('company', companyRef)} name="company" type="text" placeholder="Nom de votre organisation" className={inputCls} />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Type de projet</span>
          <select {...bindFocus('type', typeRef)} name="type" className={inputCls}>
            <option className="bg-ink">Web & SaaS</option>
            <option className="bg-ink">IA & Data</option>
            <option className="bg-ink">Plateforme métier</option>
            <option className="bg-ink">Cloud & Architecture</option>
            <option className="bg-ink">Autre</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Budget estimatif</span>
          <select {...bindFocus('budget', budgetRef)} name="budget" className={inputCls}>
            <option className="bg-ink">À définir</option>
            <option className="bg-ink">&lt; 500 000 FCFA</option>
            <option className="bg-ink">500 000 – 2 000 000 FCFA</option>
            <option className="bg-ink">2 000 000 – 10 000 000 FCFA</option>
            <option className="bg-ink">&gt; 10 000 000 FCFA</option>
          </select>
        </label>
      </div>

      <label>
        <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Décrivez votre besoin</span>
        <textarea
          required
          {...bindFocus('message', messageRef)}
          name="message"
          rows={5}
          placeholder="Contexte, objectif, échéance approximative, contraintes techniques…"
          className={`${inputCls} resize-none`}
        />
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Envoi…' : 'Envoyer'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          Prendre RDV
        </a>
      </div>

      {status === 'ok' && (
        <p className="mt-1 text-sm text-primary font-medium">Message envoyé — on vous répond sous 24-48h ouvrées.</p>
      )}
      {status === 'error' && (
        <p className="mt-1 text-sm text-red-300 font-medium">L’envoi a échoué. Réessayez ou écrivez-nous directement.</p>
      )}
    </form>
  )
}

function FormSection() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pb-20">
      <div className="rounded-[32px] bg-ink text-white p-8 sm:pl-28 sm:pr-14 sm:py-14 shadow-soft">
        <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
          <span className="h-px w-8 bg-primary" />
          — Parlons projet
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-xl">
          Racontez-nous <span className="italic-accent">l’essentiel</span>, on prépare le reste.
        </h2>
        <p className="mt-3 text-[15px] text-white/60 max-w-md">
          Champs marqués d’un rôle ne sont pas obligatoires — remplissez ce qui vous vient.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ResponsePromise() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pb-24 sm:pb-32">
      <div className="rounded-[24px] bg-bg-card p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-white shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <div>
            <div className="text-[11px] tracking-[0.16em] uppercase text-primary font-semibold">
              — Notre engagement
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-ink leading-tight">
              Réponse sous 24 à 48h ouvrées, quel que soit le canal.
            </div>
          </div>
        </div>
        <div className="text-xs text-text-muted">
          Ouvert lundi → vendredi · 9h–18h (GMT+1)
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Un brief, on vous répond sous 24-48h ouvrées. Email, WhatsApp, Cal.com — décrivez votre projet, on cadre la suite."
      />
      <PageHeader />
      <ChannelsRow />
      <FormSection />
      <ResponsePromise />
    </>
  )
}
