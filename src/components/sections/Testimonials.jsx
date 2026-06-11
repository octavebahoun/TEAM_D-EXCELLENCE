import { motion } from "framer-motion";
import { useAccessibleMotion } from "../../lib/animations";
import { Link } from "react-router-dom";

function Testimonials() {
  const quote =
    "Excellence Digital a su comprendre et traduire notre vision en une expérience digitale immersive et authentique. Leur expertise technique et leur créativité ont été des atouts majeurs pour le lancement du TWIN.";
  const words = quote.split(" ");
  const reduce = useAccessibleMotion();

  return (
    <section className="relative py-28 md:py-36 bg-surface-dark border-t border-white/5 overflow-hidden z-10">
      {/* Blueprint grid line backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/4 right-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            TÉMOIGNAGES
          </motion.span>
          <motion.h2
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Ce que nos partenaires <span className="font-editorial italic font-light text-accent-mint">pensent de nous</span>
          </motion.h2>
        </div>

        {/* Testimonial Panel */}
        <div className="glass-panel flex flex-col lg:flex-row items-center justify-between border border-white/5 rounded-3xl overflow-hidden bg-surface-card/30 hover:border-accent-mint/20 shadow-soft w-full gap-8">
          
          {/* Quote content */}
          <div className="w-full lg:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col items-start">
            <span className="text-xs font-bold text-accent-gold tracking-widest uppercase mb-6 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              Le TWIN
            </span>
            <p className="font-editorial italic font-light text-2xl sm:text-3xl lg:text-4xl text-text-bright leading-relaxed mb-8">
              "
              {reduce
                ? quote
                : words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      style={{ display: "inline-block", marginRight: "0.3em" }}
                    >
                      {word}
                    </motion.span>
                  ))}
              "
            </p>
            <Link to="/contact">
              <button className="px-6 py-3 bg-accent-mint text-bg-ink font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-colors shadow-glow-mint">
                Commencez avec nous ↗
              </button>
            </Link>
          </div>

          {/* Author/Image panel */}
          <motion.div 
            className="w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto self-stretch relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5" 
            {...(reduce ? { initial: { opacity: 1, scale: 1 }, whileInView: { opacity: 1, scale: 1 } } : { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } })}
          >
            <img
              src="https://res.cloudinary.com/dla8wr5qj/image/upload/v1773383605/WhatsApp_Image_2026-03-13_at_07.28.01_1_pb0qhe.jpg"
              alt="Mechack HOUNKPATIN - Directeur Général Le TWIN"
              className="w-full h-full object-cover block filter brightness-90"
            />
            {/* Dark glassmorphic caption at the bottom of image */}
            <div className="absolute bottom-6 left-6 right-6 p-5 backdrop-blur-md bg-bg-ink/80 border border-white/5 rounded-2xl flex flex-col">
              <strong className="text-text-bright text-base font-bold">Mechack HOUNKPATIN</strong>
              <span className="text-accent-mint text-xs font-semibold uppercase tracking-wider mt-1">Directeur Général</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;
