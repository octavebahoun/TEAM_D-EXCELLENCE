import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, imageReveal, useAccessibleMotion } from "../lib/animations";


const heroImage = "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956867/digital_kiin4o.avif"

const heroImageAlt = "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956985/alt_pt9hxh.avif"
const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionSection = motion.section;

function ImageReveal({ className, src, alt, delay }) {
  const reduce = useAccessibleMotion();
  const revealProps = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } }
    : imageReveal(delay, 1.2);

  const noiseProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 0 }, whileInView: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0.36 },
        animate: { opacity: 0 },
        whileInView: { opacity: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 1.1, delay: delay + 0.35, ease: "easeOut" },
      };

  return (
    <MotionDiv className={`hero-card ${className}`} {...revealProps}>
      <img src={src} alt={alt} loading="eager" />
      <MotionSpan className="card-noise" {...noiseProps} />
    </MotionDiv>
  );
}

function Hero() {
  const reduce = useAccessibleMotion();
  const sectionProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0, 1.1);
  const copyProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.05, 1);

  return (
    <MotionSection className="hero" aria-label="Section d'accueil" {...sectionProps}>
      <MotionDiv className="hero-copy" {...copyProps}>
        <span className="hero-kicker">SARL d'ingenierie digitale au Benin</span>
        <h1>
          Systeme robuste.
          <br />
          Design premium.
          <br />
          Impact mesurable.
        </h1>
        <MotionP {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.12, 0.9))}>
          Excellence Team accompagne les entreprises et institutions avec une
          execution complete: architecture logicielle, cybersécurite,
          infrastructure cloud et experiences web haut de gamme.
        </MotionP>

        <div className="hero-proof-list" aria-label="Elements de confiance">
          <span>Equipe pluridisciplinaire</span>
          <span>Execution de bout en bout</span>
          <span>Reponse initiale sous 24h</span>
        </div>

        <div className="hero-cta-row">
          <Link to="/contact">
            <button
              className="hero-main-cta btn-roulette"
              data-text="Demarrer un projet"
            >
              <span className="btn-text">Demarrer un projet</span>
            </button>
          </Link>
          <Link to="/works">
            <button className="hero-secondary-cta">Voir nos realisations</button>
          </Link>
        </div>
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
