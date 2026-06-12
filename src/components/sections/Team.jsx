import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibleMotion, fadeIn } from "../../lib/animations";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import teamData from "../../data/team.json";

function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const reduce = useAccessibleMotion();

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 640) setItemsToShow(1);
      else if (window.innerWidth <= 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const next = () =>
    currentIndex < teamData.length - itemsToShow &&
    setCurrentIndex(currentIndex + 1);
  const prev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  return (
    <section className="relative py-28 md:py-36 bg-surface-dark border-t border-white/5 overflow-hidden z-10">
      {/* Grid backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/4 right-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
            EXPERTISE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight">
            Notre <span className="font-editorial italic font-light text-accent-mint">Équipe</span>
          </h2>
          <p className="text-text-muted mt-6 text-base font-medium max-w-xl">
            Une équipe pluridisciplinaire qui combine vision produit, développement, cloud et sécurité pour livrer des projets fiables.
          </p>
        </div>

        {/* Carousel block */}
        <div className="relative flex items-center mb-16 px-0 md:px-8">

          {/* Previous Arrow Button */}
          <button
            className={`absolute left-0 z-30 w-12 h-12 rounded-full border border-white/10 bg-bg-ink/80 text-text-bright flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-accent-mint hover:text-accent-mint hover:shadow-glow-mint disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex`}
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Membres précédents"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slider window */}
          <div className="w-full overflow-hidden py-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {teamData.map((member) => (
                <div
                  key={member.id}
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <motion.div
                    className="glass-panel group p-8 rounded-3xl border border-white/5 bg-surface-card/40 hover:border-accent-mint/30 shadow-soft h-full flex flex-col justify-between items-center text-center transition-all duration-500"
                    {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } } : fadeIn(0, 0.6))}
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* circular avatar frame with glowing green border */}
                      <div className="w-32 h-32 rounded-full p-1 border-2 border-white/10 group-hover:border-accent-mint shadow-soft overflow-hidden transition-all duration-500 mb-6">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full block filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <h3 className="font-display font-black text-xl text-text-bright mb-1 tracking-tight">
                        {member.name}
                      </h3>
                      <span className="text-xs font-black text-accent-mint tracking-widest uppercase mb-4 block">
                        {member.role}
                      </span>

                      {/* Editorial quote styling */}
                      <p className="font-editorial italic font-light text-base text-text-muted/90 leading-relaxed mb-6">
                        "{member.quote}"
                      </p>
                    </div>

                    {member.portfolio && member.portfolio !== "#" ? (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-black tracking-widest text-text-bright hover:text-accent-mint border-b border-white/20 hover:border-accent-mint pb-1 uppercase transition-colors mt-auto inline-flex items-center gap-1"
                      >
                        <span>Voir le profil</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-black tracking-widest text-text-muted/50 uppercase pb-1 mt-auto inline-block">
                        Profil à venir
                      </span>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            className={`absolute right-0 z-30 w-12 h-12 rounded-full border border-white/10 bg-bg-ink/80 text-text-bright flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-accent-mint hover:text-accent-mint hover:shadow-glow-mint disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex`}
            onClick={next}
            disabled={currentIndex >= teamData.length - itemsToShow}
            aria-label="Membres suivants"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile-only nav helper arrows */}
        <div className="flex justify-center gap-4 md:hidden mb-12">
          <button
            className="w-10 h-10 rounded-full border border-white/10 text-text-bright flex items-center justify-center cursor-pointer disabled:opacity-30"
            onClick={prev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 rounded-full border border-white/10 text-text-bright flex items-center justify-center cursor-pointer disabled:opacity-30"
            onClick={next}
            disabled={currentIndex >= teamData.length - itemsToShow}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Call to action panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-8 bg-surface-card/30 border border-white/5 rounded-2xl w-full gap-6 text-center sm:text-left">
          <p className="font-semibold text-text-bright text-base sm:text-lg">
            Un projet sensible ou stratégique à lancer ?
          </p>
          <Link to="/contact">
            <button className="px-6 py-3 bg-accent-mint hover:bg-emerald-400 text-bg-ink font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer transition-colors shadow-glow-mint flex items-center justify-center gap-1.5">
              <span>Échanger avec l'équipe</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Team;
