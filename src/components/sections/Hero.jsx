import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, imageReveal, useAccessibleMotion } from "../../lib/animations";

const heroImage = "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956867/digital_kiin4o.avif";
const heroImageAlt = "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956985/alt_pt9hxh.avif";

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
    <MotionDiv 
      className={`absolute overflow-hidden border border-white/10 rounded-3xl bg-surface-card/60 shadow-soft transform-origin-center hover:border-accent-mint/30 transition-colors duration-500 ${className}`} 
      {...revealProps}
    >
      <img src={src} alt={alt} loading="eager" className="w-full h-full object-cover block" />
      <MotionSpan 
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E")`
        }}
        {...noiseProps} 
      />
    </MotionDiv>
  );
}

function Hero() {
  const reduce = useAccessibleMotion();
  const sectionProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0, 1.1);
  const copyProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.05, 1);

  return (
    <MotionSection 
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden z-10" 
      aria-label="Section d'accueil" 
      {...sectionProps}
    >
      {/* Mesh gradients & Grid background */}
      <div className="blueprint-grid opacity-50" />
      <div className="glow-spot top-1/4 left-1/4 opacity-40 animate-pulse-slow" />
      <div className="glow-spot bottom-10 right-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Copy block */}
        <MotionDiv className="lg:col-span-7 flex flex-col items-start text-left" {...copyProps}>
          
          {/* Tech badge kicker */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent-mint/20 bg-accent-mint/5 rounded-full text-xs font-bold tracking-widest uppercase text-accent-mint mb-8">
            <span className="w-1.5 h-1.5 bg-accent-mint rounded-full animate-ping" />
            SARL d'ingénierie digitale au Bénin
          </span>

          {/* Massive Display Title */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-bright leading-[0.9] tracking-tighter mb-8">
            Système robuste.<br />
            <span className="font-editorial italic font-light text-accent-gold pr-3">Design premium.</span><br />
            Impact mesurable.
          </h1>

          {/* Clean Description */}
          <MotionP 
            className="text-text-muted text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8"
            {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.12, 0.9))}
          >
            Excellence Team accompagne les entreprises et institutions avec une
            exécution complète : architecture logicielle, cybersécurité,
            infrastructure cloud et expériences web haut de gamme.
          </MotionP>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2.5 mb-10" aria-label="Éléments de confiance">
            {[
              "Équipe pluridisciplinaire",
              "Exécution de bout en bout",
              "Réponse initiale sous 24h"
            ].map((text, idx) => (
              <span key={idx} className="px-4 py-2 bg-surface-card border border-white/5 rounded-full text-xs font-bold text-text-bright/80 tracking-wide">
                {text}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-accent-gold hover:bg-amber-400 text-bg-ink font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 shadow-glow-gold">
                Démarrer un projet
              </button>
            </Link>
            <Link to="/works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-accent-mint bg-transparent hover:bg-accent-mint/5 text-text-bright hover:text-accent-mint font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300">
                Voir nos réalisations
              </button>
            </Link>
          </div>

        </MotionDiv>

        {/* Right Media block */}
        <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[480px] lg:h-[600px] flex items-center justify-center lg:justify-end" aria-hidden="true">
          
          {/* Back card: slightly rotated, blue visual */}
          <ImageReveal
            className="w-[70%] sm:w-[65%] aspect-[16/11] top-4 left-4 lg:left-auto lg:right-28 rotate-[8deg] z-0"
            src={heroImageAlt}
            alt="Visuel artistique secondaire"
            delay={0.2}
          />

          {/* Front card: rotated counter-wise, dark globe visual */}
          <ImageReveal
            className="w-[85%] sm:w-[80%] aspect-[16/11] bottom-4 right-4 lg:right-0 -rotate-[4deg] z-10 border-accent-mint/20"
            src={heroImage}
            alt="Visuel artistique principal"
            delay={0.35}
          />
          
        </div>

      </div>
    </MotionSection>
  );
}

export default Hero;
