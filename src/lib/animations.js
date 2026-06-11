import { useReducedMotion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export const fadeIn = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration, delay, ease },
});

export const imageReveal = (delay = 0, duration = 0.7) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration, delay, ease },
});

export const containerStagger = (stagger = 0.04, delayChildren = 0) => ({
  initial: {},
  animate: { transition: { staggerChildren: stagger, delayChildren } },
});

export function useAccessibleMotion() {
  return useReducedMotion();
}
