import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import worksData from "../data/works.json";

function WorksPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    setWorks(worksData);
  }, []);

  return (
    <>
      <SEO
        title="Nos Réalisations"
        description="Explorez le portfolio d'Excellence Team : plateformes E-commerce, solutions SaaS, audits de cybersécurité et infrastructures IT au Bénin."
      />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <main className="relative bg-bg-ink min-h-screen z-10">
        {/* Mesh and Grids */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-10 left-10 opacity-30" />
        <div className="glow-spot bottom-1/3 right-1/4 opacity-25" />

        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8 w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <span className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4">
              PORTFOLIO
            </span>
            <motion.h1
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-text-bright leading-none tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nos Brillantes <br />
              <span className="font-editorial italic font-light text-accent-mint">Réalisations</span>
            </motion.h1>
            <motion.p
              className="text-text-muted text-base sm:text-lg md:text-xl font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Une sélection de nos projets récents, alliant design réfléchi, stratégie claire et résultats d'impact.
            </motion.p>
          </div>

          {/* List of projects */}
          <div className="flex flex-col gap-24 md:gap-36">
            {works.map((work) => (
              <div 
                key={work.id} 
                className={`flex flex-col lg:flex-row justify-between items-center gap-12 ${
                  work.side === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Details info */}
                <motion.div
                  className="w-full lg:w-5/12 p-8 sm:p-10 border border-white/5 rounded-3xl bg-surface-card/40 hover:border-accent-mint/20 shadow-soft relative"
                  initial={{ opacity: 0, x: work.side === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="block text-xs font-bold text-accent-gold tracking-widest uppercase mb-4">
                    {work.topLabel}
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-text-bright mb-6">
                    {work.title}
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-8">
                    {work.description}
                  </p>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-3 bg-accent-mint text-bg-ink font-bold text-[0.82rem] tracking-widest uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-colors shadow-glow-mint">
                      Visiter le site ↗
                    </button>
                  </a>
                </motion.div>

                {/* Visuals stack */}
                <motion.div
                  className="w-full lg:w-7/12 flex flex-col gap-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Main large image */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-mint/30 shadow-soft transition-colors duration-500">
                    <img 
                      src={work.mainImage} 
                      alt={work.title} 
                      className="w-full h-full object-cover block filter brightness-90 hover:brightness-100 transition-all duration-750" 
                    />
                  </div>
                  
                  {/* Two small thumbnails */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden border border-white/5 bg-surface-card">
                      <img src={work.thumb1} alt={`${work.title} detail 1`} className="w-full h-full object-cover block" />
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden border border-white/5 bg-surface-card">
                      <img src={work.thumb2} alt={`${work.title} detail 2`} className="w-full h-full object-cover block" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        <FAQ />
      </main>

      <Footer />
    </>
  );
}

export default WorksPage;
