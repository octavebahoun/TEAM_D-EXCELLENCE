import { motion } from "framer-motion";
import { useAccessibleMotion, containerStagger } from "../../lib/animations";
import aboutImage from "../../assets/hero2.avif";

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionSection = motion.section;

function About() {
  const descriptionText =
    "Excellence Team est une entreprise de services du numérique fondée en 2025 à Cotonou. Nous sommes 6 experts — développeurs, designers, ingénieurs réseaux et spécialistes cybersécurité — réunis par une conviction commune : les entreprises béninoises méritent des solutions numériques à la hauteur des standards internationaux.";
  const words = descriptionText.split(" ");

  const reduce = useAccessibleMotion();

  const containerVariants = reduce
    ? null
    : containerStagger(0.02, 0.1);

  const wordVariants = reduce
    ? null
    : {
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <MotionSection
      id="about"
      className="relative py-28 md:py-36 overflow-hidden z-10 bg-bg-ink"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Blueprint grid line backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/3 right-1/4 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <MotionDiv
              className="font-editorial text-accent-mint text-xl italic tracking-widest mb-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              À propos de nous
            </MotionDiv>

            <MotionDiv
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-tight tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Nés à Cotonou.<br />
              <span className="font-editorial italic font-light text-accent-gold">Pensés pour l'Afrique.</span>
            </MotionDiv>

            <MotionDiv
              className="text-text-muted text-lg sm:text-xl font-medium leading-relaxed max-w-2xl"
              {...(reduce
                ? { initial: undefined, whileInView: undefined }
                : { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 } })}
            >
              {reduce
                ? words.join(" ")
                : words.map((word, index) => (
                    <MotionSpan
                      key={index}
                      variants={wordVariants}
                      style={{ display: "inline-block", marginRight: "0.3em" }}
                    >
                      {word}
                    </MotionSpan>
                  ))}
            </MotionDiv>
          </div>

          {/* Right Image Block with Asymmetric Border Styling */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MotionDiv
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-asym-1 overflow-hidden border border-white/10 hover:border-accent-mint/30 shadow-soft transition-colors duration-500"
              {...(reduce
                ? { initial: undefined, whileInView: undefined }
                : {
                    initial: { opacity: 0, scale: 0.95, y: 20 },
                    whileInView: { opacity: 1, scale: 1, y: 0 },
                    viewport: { once: true, amount: 0.35 },
                    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                  })}
            >
              <img 
                src={aboutImage} 
                alt="Excellence Team Cotonou Office" 
                className="w-full h-full object-cover block filter brightness-90 hover:brightness-100 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-ink via-transparent to-transparent opacity-40 pointer-events-none" />
            </MotionDiv>
          </div>

        </div>
      </div>
    </MotionSection>
  );
}

export default About;
