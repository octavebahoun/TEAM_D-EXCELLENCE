import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

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
  { label: 'React',         tone: 'dark',   pos: 'top-8 left-[8%]' },
  { label: 'SaaS',          tone: 'orange', pos: 'top-24 right-[10%]' },
  { label: 'Design',        tone: 'dark',   pos: 'top-56 left-[4%]' },
  { label: 'Ingénierie IA', tone: 'orange', pos: 'top-64 right-[4%]' },
  { label: 'Cloud',         tone: 'dark',   pos: 'bottom-40 left-[10%]' },
  { label: 'Open Source',   tone: 'orange', pos: 'bottom-28 right-[8%]' },
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
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
          className={`pointer-events-none absolute hidden md:block ${p.pos}`}
        >
          <Pill tone={p.tone}>{p.label}</Pill>
        </motion.div>
      ))}

      <div className="relative text-center max-w-3xl mx-auto">
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
          className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-ink"
        >
          On construit,{' '}
          <span className="italic-accent">on livre</span>,
          <br />
          on <span className="italic-accent">publie</span>.
          <span className="text-primary ml-3">✦</span>
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
