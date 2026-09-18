import { useEffect, useState } from 'react'
import Star from './Star'
import { AnimatePresence, motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

function RollingWords({ words, interval = 2400 }) {
  const [i, setI] = useState(0)
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])

  return (
    <span className="relative inline-block align-baseline">
      {/* fantôme : réserve la largeur du mot le plus long */}
      <span aria-hidden="true" className="invisible italic whitespace-nowrap">
        {longest}
      </span>
      <span
        className="absolute inset-0 "
        style={{ lineHeight: 1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-110%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="italic-accent whitespace-nowrap block"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

function SlantedUnderline() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -bottom-1.5 h-[6px] w-[115%] rounded-full bg-primary"
      style={{ transform: 'translateX(-50%) rotate(-4deg)' }}
    />
  )
}

function RollingCounter({ min, max, speed = 0.18, pauseSeconds = 10 }) {
  const items = []
  for (let n = min; n <= max; n++) items.push(n)
  const keyframes = items.map((_, i) => `-${i}em`)
  const width = `${String(max).length}ch`

  return (
    <span className="relative inline-block align-baseline" style={{ width }}>
      <span className="relative block overflow-hidden" style={{ height: '1em', lineHeight: 1 }}>
        <motion.span
          initial={{ y: 0 }}
          animate={{ y: keyframes }}
          transition={{
            duration: items.length * speed,
            ease: EASE,
            repeat: Infinity,
            repeatDelay: pauseSeconds,
            repeatType: 'loop',
          }}
          className="flex flex-col"
        >
          {items.map((n, i) => (
            <span key={i} className="block" style={{ height: '1em', lineHeight: 1 }}>
              {n}
            </span>
          ))}
        </motion.span>
      </span>
      <SlantedUnderline />
    </span>
  )
}

function StaticStat({ children }) {
  return (
    <span className="relative inline-block align-baseline">
      {children}
      <SlantedUnderline />
    </span>
  )
}

const pills = [
  { label: 'Cybersécurité', tone: 'dark',   pos: 'top-8 left-[8%]',      dur: 4.2, amp: 10 },
  { label: 'SaaS',          tone: 'orange', pos: 'top-24 right-[10%]',   dur: 5.0, amp: 12 },
  { label: 'Design',        tone: 'dark',   pos: 'top-56 left-[4%]',     dur: 4.6, amp: 8  },
  { label: 'Ingénierie IA', tone: 'orange', pos: 'top-64 right-[4%]',    dur: 5.4, amp: 11 },
  { label: 'Cloud',         tone: 'dark',   pos: 'bottom-40 left-[10%]', dur: 4.8, amp: 9  },
  { label: 'Open Source',   tone: 'orange', pos: 'bottom-28 right-[8%]', dur: 5.2, amp: 10 },
]

function Pill({ tone = 'orange', children, className = '' }) {
  const bg = tone === 'dark' ? 'bg-ink' : 'bg-primary'
  return (
    <span
      className={`inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-soft ${bg} ${className}`}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-[77.5rem] px-6 pt-16 pb-24 overflow-hidden">
      {pills.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
          className={`pointer-events-none absolute hidden md:block ${p.pos}`}
        >
          <motion.div
            animate={{ y: [0, -p.amp, 0, p.amp * 0.5, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          >
            <Pill tone={p.tone}>{p.label}</Pill>
          </motion.div>
        </motion.div>
      ))}

      <div className="relative text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-center gap-3 text-sm font-semibold text-ink"
        >
          <span className="h-px w-8 bg-primary" />
          Collectif · Lokossa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mt-6 text-xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-ink"
        >
          On construit,{' '}
          <RollingWords words={['on livre ,', 'on itère ,', 'on build ,', 'on tech ,']} />
          <br />
          on <RollingWords words={['publie', 'partage', 'déploie', 'rénove']} interval={2100} />.
          <Star className="ml-3" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
          className="mt-6 text-lg text-text-muted leading-relaxed max-w-2xl mx-auto"
        >
          Étudiants ingénieurs et designers. Applications web, SaaS, IA, cloud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
          className="mt-8 flex flex-nowrap items-baseline justify-center gap-x-4 sm:gap-x-5 whitespace-nowrap text-ink text-sm sm:text-base font-medium"
        >
          <span>
            <span className="font-extrabold text-ink tabular-nums">
              <RollingCounter min={1} max={12} />
            </span>{' '}
            projets livrés
          </span>
          <span className="text-primary" aria-hidden="true">·</span>
          <span>
            <span className="font-extrabold text-ink tabular-nums">
              <RollingCounter min={1} max={5} />
            </span>{' '}
            en open source
          </span>
          <span className="text-primary" aria-hidden="true">·</span>
          <span>
            <span className="font-extrabold text-ink tabular-nums">
              <StaticStat>+2000</StaticStat>
            </span>{' '}
            utilisateurs total
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/projets"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-white text-sm font-semibold hover:bg-primary transition-colors"
          >
            Voir nos projets
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-ink pl-6 pr-1.5 py-1.5 text-ink text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
          >
            Nous contacter
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
