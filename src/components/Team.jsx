import { useRef } from 'react'
import { motion } from 'motion/react'

import { members } from '../data/members.js'
const EASE = [0.22, 1, 0.36, 1]


function Portrait({ m }) {
  const initials = m.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  if (m.photo) {
    return <img src={m.photo} alt="" className="h-full w-full object-cover" />
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center text-white/40 text-6xl font-extrabold tracking-tight"
      style={{
        background:
          'radial-gradient(120% 100% at 30% 20%, #2a2a2a 0%, #0d0d0d 60%, #000 100%)',
      }}
    >
      {initials}
    </div>
  )
}

function TeamCard({ m }) {
  return (
    <article className="group relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-ink text-white shadow-soft">
      <div className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0">
        <Portrait m={m} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-[15px] font-bold leading-tight">{m.name}</div>
          <div className="mt-0.5 text-xs text-white/70">{m.role}</div>
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%), linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)',
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundBlendMode: 'normal, overlay, overlay',
        }}
      >
        <div>
          <div className="text-[15px] font-bold leading-tight">{m.name}</div>
          <div className="mt-1 text-[10px] text-primary font-semibold uppercase tracking-[0.14em]">
            {m.specialty}
          </div>
        </div>
        <p className="text-[12px] leading-relaxed text-white/80 italic">« {m.bio} »</p>
      </div>
    </article>
  )
}

function ArrowButton({ direction, onClick }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Précédent' : 'Suivant'}
      className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full bg-white text-ink border border-border shadow-soft hover:bg-ink hover:text-white transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        {isPrev ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}

export default function Team() {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const firstCard = el.querySelector('[data-card]')
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : 300
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24 sm:py-32">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — L’équipe
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
            Onze têtes, un même <span className="italic-accent">standard</span>. <span className="text-primary">✦</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-end">
          <ArrowButton direction="prev" onClick={() => scrollBy(-1)} />
          <ArrowButton direction="next" onClick={() => scrollBy(1)} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative"
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 -mx-6 px-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {members.map((m) => (
            <div
              key={m.id}
              data-card
              className="snap-start shrink-0 w-[62%] sm:w-[38%] md:w-[28%] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <TeamCard m={m} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
