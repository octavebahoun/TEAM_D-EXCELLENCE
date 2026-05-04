import { useReducedMotion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export const fadeIn = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration, delay, ease },
});

export const imageReveal = (delay = 0, duration = 1.1) => ({
  initial: { opacity: 0.2, filter: "blur(20px)", y: 24 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration, delay, ease },
});

export const containerStagger = (stagger = 0.06, delayChildren = 0) => ({
  initial: {},
  animate: { transition: { staggerChildren: stagger, delayChildren } },
});

export function useAccessibleMotion() {
  // Hook for components to check reduced motion preference
  return useReducedMotion();
}
