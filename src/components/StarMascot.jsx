import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { ExcellenceTeam2 } from './mascot2/index.js'

const SIZE = 56

export default function StarMascot() {
  const location = useLocation()
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0
    let ticking = false

    const update = () => {
      const stars = document.querySelectorAll('[data-star]')
      if (!stars.length) {
        setVisible(false)
        ticking = false
        return
      }
      const vh = window.innerHeight
      const anchor = vh * 0.42 // légèrement au-dessus du milieu
      let closest = null
      let closestDist = Infinity
      stars.forEach((el) => {
        const r = el.getBoundingClientRect()
        const centerY = r.top + r.height / 2
        const dist = Math.abs(centerY - anchor)
        if (dist < closestDist) {
          closest = el
          closestDist = dist
        }
      })
      if (closest) {
        const r = closest.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        setPos({ x: cx - SIZE / 2, y: cy - SIZE / 2 })
        // ne s’affiche que si l’étoile visée est dans la fenêtre + une petite marge
        const inView = r.bottom > -80 && r.top < vh + 80
        setVisible(inView)
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(update)
        ticking = true
      }
    }

    // Laisse le DOM se poser avant de mesurer (routes qui viennent de monter)
    const initial = setTimeout(update, 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      clearTimeout(initial)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-40 hidden md:block"
      initial={false}
      animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{
        x: { type: 'spring', stiffness: 140, damping: 22 },
        y: { type: 'spring', stiffness: 140, damping: 22 },
        opacity: { duration: 0.3 },
        scale: { type: 'spring', stiffness: 200, damping: 24 },
      }}
      style={{ top: 0, left: 0, width: SIZE, height: SIZE }}
    >
      <ExcellenceTeam2 state="happy" size={SIZE} interactive={false} />
    </motion.div>
  )
}
