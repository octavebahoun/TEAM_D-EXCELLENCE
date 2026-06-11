import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Combien coûte un projet avec Excellence Team ?",
    answer:
      "Nous ne publions pas de tarifs fixes car chaque projet est différent. Ce qui détermine le prix : la complexité technique, le délai souhaité, et le niveau d'accompagnement. Tout commence par un audit gratuit pour comprendre votre besoin avant de chiffrer.",
  },
  {
    question: "Combien de temps prend un projet ?",
    answer:
      "Un site vitrine : 2 à 4 semaines. Une application sur-mesure : 1 à 3 mois. Un audit cybersécurité : 1 à 2 semaines. Nous vous donnons un planning précis dès la validation du devis — et nous le respectons.",
  },
  {
    question: "Travaillez-vous uniquement à Cotonou ?",
    answer:
      "Non. Nous intervenons dans tout le Bénin — Cotonou, Abomey-Calavi, Lokossa, Porto-Novo — et nous travaillons à distance pour les projets digitaux, partout en Afrique et au-delà.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "40% à la signature du devis, 40% à mi-parcours ou à la validation des livrables intermédiaires, 20% à la livraison finale. Nous acceptons Mobile Money, virement bancaire et espèces.",
  },
  {
    question: "Est-ce que vous assurez la maintenance après livraison ?",
    answer:
      "Oui. Nous proposons des contrats de maintenance mensuelle ou annuelle selon vos besoins — mises à jour, corrections, sauvegardes, monitoring. C'est optionnel mais fortement recommandé.",
  },
  {
    question: "Vous avez une expertise sur quelle technologies ?",
    answer:
      "React, Next.js, Node.js, Laravel, Vue.js, React Native, Three.js, Python, MongoDB, MySQL, Docker, AWS, Kali Linux — et bien d'autres. Si votre besoin nécessite une stack spécifique, on s'adapte.",
  },
  {
    question: "Comment démarrer avec Excellence Team ?",
    answer:
      "Remplissez le formulaire de contact ou envoyez-nous un message WhatsApp. On vous répond sous 24h pour fixer un premier appel de 30 minutes — gratuit, sans engagement — pendant lequel on définit ensemble si on peut vous aider.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-28 md:py-36 bg-bg-ink overflow-hidden z-10 border-b border-white/5">
      {/* Blueprint Grid line backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot bottom-10 right-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Description Column */}
          <div className="lg:col-span-4 sticky top-36">
            <span className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4">
              FAQ
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight mb-6">
              Questions <span className="font-editorial italic font-light text-accent-mint">?</span>
            </h2>
            <p className="text-text-muted text-base font-medium leading-relaxed max-w-sm">
              Tout ce que vous devez savoir sur notre collaboration. Si vous avez d'autres questions, discutons-en directement.
            </p>
          </div>

          {/* Right Accordion List Column */}
          <div className="lg:col-span-8 flex flex-col gap-4 w-full">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-500 bg-surface-card/20 ${
                    isOpen ? "border-accent-mint/30 shadow-glow-mint bg-surface-card/45" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    className="w-full text-left p-6 sm:p-8 flex justify-between items-center cursor-pointer gap-6"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <h3 className={`font-display font-bold text-base sm:text-lg transition-colors ${
                      isOpen ? "text-accent-mint" : "text-text-bright"
                    }`}>
                      {item.question}
                    </h3>
                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isOpen 
                        ? "border-accent-mint text-accent-mint bg-accent-mint/5" 
                        : "border-white/10 text-text-muted hover:border-text-bright hover:text-text-bright"
                    }`} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-6 pb-8 sm:px-8 text-text-muted text-sm sm:text-base leading-relaxed border-t border-white/5 pt-6">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
