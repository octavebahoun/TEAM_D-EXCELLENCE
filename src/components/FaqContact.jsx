import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExcellenceTeam } from './mascot/index.js'

const EASE = [0.22, 1, 0.36, 1]

const FORMSPREE_URL = 'https://formspree.io/f/mzezbvdr'
const CAL_URL = 'https://cal.com/excellence-team-baw7ji'

const faqs = [
  {
    q: 'À partir de combien démarre un projet ?',
    a: 'On chiffre chaque projet au périmètre. Un premier site vitrine part autour de 400 000 FCFA ; une plateforme sur mesure ou un SaaS interne se cadre lors du premier échange.',
  },
  {
    q: 'Combien de temps pour livrer ?',
    a: '2 à 4 semaines pour un site vitrine, 2 à 4 mois pour une plateforme complète. On fixe un jalon toutes les 2 semaines et on livre en incréments visibles.',
  },
  {
    q: 'Comment on travaille avec vous ?',
    a: 'Un interlocuteur unique, un canal partagé (Slack ou WhatsApp), un point hebdo. Décisions écrites, livrables vérifiables, aucune surprise en fin de mois.',
  },
  {
    q: 'Quelles technos vous utilisez ?',
    a: 'React / Next.js, Node.js, PostgreSQL, LLM (RAG, agents), n8n, Docker. On choisit la stack qui sert le projet, pas l’inverse.',
  },
  {
    q: 'Et après la livraison ?',
    a: 'On propose un contrat de maintenance mensuel (correctifs, mises à jour de dépendances, monitoring). Sans engagement long, résiliable au mois.',
  },
  {
    q: 'Vous êtes étudiants, on peut vous confier un projet sérieux ?',
    a: 'Onze personnes, six cofondateurs, une gouvernance écrite. Douze projets livrés, cinq en open source, 2000+ utilisateurs. On répond de nos livrables.',
  },
]

function FaqItem({ item, isOpen, onToggle, index }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="flex items-baseline gap-3 text-ink">
          <span className="text-[11px] font-bold tabular-nums text-text-light tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] sm:text-base font-semibold leading-snug">
            {item.q}
          </span>
        </span>
        <span
          className={`shrink-0 inline-flex size-8 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-primary text-white' : 'bg-bg-soft text-ink'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {isOpen ? <path d="M6 12h12" /> : <path d="M12 6v12M6 12h12" />}
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 pl-8 text-[14px] leading-relaxed text-text-muted">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FIELD_STATE = {
  name: 'happy',
  email: 'thinking',
  type: 'surprised',
  message: 'singing',
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [focusedField, setFocusedField] = useState(null)
  const [mascotY, setMascotY] = useState(0)
  const formRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const typeRef = useRef(null)
  const messageRef = useRef(null)
  const refs = { name: nameRef, email: emailRef, type: typeRef, message: messageRef }

  useEffect(() => {
    if (!focusedField) return
    const el = refs[focusedField]?.current
    const form = formRef.current
    if (!el || !form) return
    const y = el.offsetTop + el.offsetHeight / 2 - 28 // center 56px mascot on the field
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
      } else {
        setStatus('error')
      }
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
        className="pointer-events-none absolute -left-16 top-0 hidden lg:block"
      >
        <ExcellenceTeam state={mascotState} size={56} interactive={false} />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Votre nom</span>
          <input
            required
            {...bindFocus('name', nameRef)}
            name="name"
            type="text"
            placeholder="Jean Dupont"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Email</span>
          <input
            required
            {...bindFocus('email', emailRef)}
            name="email"
            type="email"
            placeholder="vous@email.com"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Type de projet</span>
        <select
          {...bindFocus('type', typeRef)}
          name="type"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none transition-colors"
        >
          <option className="bg-ink">Web & SaaS</option>
          <option className="bg-ink">IA & Data</option>
          <option className="bg-ink">Plateforme métier</option>
          <option className="bg-ink">Cloud & Architecture</option>
          <option className="bg-ink">Autre</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Décrivez brièvement votre besoin</span>
        <textarea
          required
          {...bindFocus('message', messageRef)}
          name="message"
          rows={4}
          placeholder="Contexte, objectif, échéance approximative…"
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
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
        <p className="mt-1 text-sm text-primary font-medium">Message envoyé — on vous répond sous 24-48h.</p>
      )}
      {status === 'error' && (
        <p className="mt-1 text-sm text-red-300 font-medium">L’envoi a échoué. Réessayez ou écrivez-nous directement.</p>
      )}
    </form>
  )
}

export default function FaqContact() {
  const [open, setOpen] = useState(0)

  return (
    <section id="contact" className="relative bg-bg-soft">
      <div className="mx-auto max-w-[85rem] px-6 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* FAQ side — light card */}
        <div className="rounded-[28px] bg-white p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Questions fréquentes
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink">
            Vos <span className="italic-accent">doutes</span>, nos réponses.
          </h2>
          <p className="mt-4 text-[15px] text-text-muted max-w-md">
            Ce qu’on nous demande le plus souvent. Si votre question n’y est pas, écrivez-nous à droite.
          </p>

          <div className="mt-8">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>

        {/* Contact side — dark card */}
        <div className="rounded-[28px] bg-ink p-8 sm:pl-24 sm:pr-12 sm:py-12 shadow-soft">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Parlons de votre projet
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
            Un <span className="italic-accent">brief</span>, un devis, une réponse.
          </h2>
          <p className="mt-4 text-[15px] text-white/60 max-w-md">
            Décrivez votre besoin en quelques lignes, ou prenez directement un créneau de 30 minutes.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
