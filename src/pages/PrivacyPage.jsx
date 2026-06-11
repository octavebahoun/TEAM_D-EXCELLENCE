import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";

function PrivacyPage() {
  return (
    <>
      <SEO
        title="Politique de Confidentialité"
        description="Découvrez comment Excellence Team protège vos données personnelles et respecte votre vie privée."
      />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <main className="relative bg-bg-ink min-h-screen z-10 pt-28 overflow-hidden">
        {/* Grids and lights */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-1/4 right-1/4 opacity-25" />

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <header className="mb-12 border-b border-white/5 pb-8">
            <motion.span
              className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              JURIDIQUE
            </motion.span>
            <motion.h1
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Politique de <br />
              <span className="font-editorial italic font-light text-accent-mint">Confidentialité</span>
            </motion.h1>
            <p className="text-xs font-semibold text-text-muted">Dernière mise à jour : 12 Avril 2026</p>
          </header>

          <section className="prose prose-invert max-w-none flex flex-col gap-8 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">1. Collecte des données</h2>
              <p>
                Nous collectons les informations que vous nous fournissez volontairement via notre formulaire de contact (nom, email, budget, description du projet). Ces données sont utilisées exclusivement pour répondre à vos demandes.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">2. Utilisation des cookies</h2>
              <p>
                Notre site peut utiliser des cookies pour améliorer votre expérience utilisateur et analyser le trafic via des outils tiers comme Google Analytics. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">3. Protection des données</h2>
              <p>
                Excellence Team s’engage à protéger la confidentialité de vos informations. Vos données personnelles ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">4. Vos droits</h2>
              <p>
                Conformément à la législation sur la protection des données, vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à excellenceteam@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">5. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé ou perte accidentelle.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPage;
