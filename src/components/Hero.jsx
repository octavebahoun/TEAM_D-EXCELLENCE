import { motion } from "framer-motion";
import heroImage from "../assets/hero.avif";
import heroImageAlt from "../assets/hero2.avif";

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionSection = motion.section;

function ImageReveal({ className, src, alt, delay }) {
  return (
    <MotionDiv
      className={`hero-card ${className}`}
      initial={{ opacity: 0.2, filter: "blur(22px)", y: 24 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} loading="eager" />
      <MotionSpan
        className="card-noise"
        initial={{ opacity: 0.36 }}
        animate={{ opacity: 0 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, delay: delay + 0.35, ease: "easeOut" }}
      />
    </MotionDiv>
  );
}

function Hero() {
  return (
    <MotionSection
      className="hero"
      aria-label="Section d'accueil"
      initial={{ opacity: 0.15, filter: "blur(22px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionDiv
        className="hero-copy"
        initial={{ opacity: 0.2, y: 16, filter: "blur(18px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>
          BRINGING YOUR
          <br />
          VISION TO LIFE.
        </h1>
        <MotionP>
          {[
            "Where",
            "imagination,",
            "strategy,",
            "and",
            "storytelling",
            "collide",
            "to",
            "build",
            "unforgettable",
            "brand",
            "experiences",
            "that",
            "move",
            "people",
            "and",
            "grow",
            "businesses.",
          ].map((word, index) => (
            <MotionSpan
              key={index}
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </MotionSpan>
          ))}
        </MotionP>
        <button
          className="hero-main-cta btn-roulette"
          data-text="Let's Collab!"
        >
          <span className="btn-text">Let&apos;s Collab!</span>
        </button>
      </MotionDiv>

      <div className="hero-media" aria-hidden="true">
        <ImageReveal
          className="hero-card-back"
          src={heroImageAlt}
          alt="Visuel artistique secondaire"
          delay={0.2}
        />

        <ImageReveal
          className="hero-card-front"
          src={heroImage}
          alt="Visuel artistique principal"
          delay={0.35}
        />
      </div>
    </MotionSection>
  );
}

export default Hero;
