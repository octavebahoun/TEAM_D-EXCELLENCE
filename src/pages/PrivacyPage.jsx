import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./LegalPage.css";

function PrivacyPage() {
  return (
    <>
      <SEO
        title="Politique de Confidentialité"
        description="Découvrez comment Excellence Team protège vos données personnelles et respecte votre vie privée."
      />
      <Navbar />

      <main className="legal-main">
        <div className="legal-container">
          <header className="legal-header">
            <motion.span
              className="legal-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Juridique
            </motion.span>
            <motion.h1
              className="legal-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Politique de <br /> Confidentialité
            </motion.h1>
            <p className="legal-update">Dernière mise à jour : 12 Avril 2026</p>
          </header>

          <section className="legal-content">
            <h2>1. Collecte des données</h2>
            <p>
              Nous collectons les informations que vous nous fournissez
              volontairement via notre formulaire de contact (nom, email,
              budget, description du projet). Ces données sont utilisées
              exclusivement pour répondre à vos demandes.
            </p>

            <h2>2. Utilisation des cookies</h2>
            <p>
              Notre site peut utiliser des cookies pour améliorer votre
              expérience utilisateur et analyser le trafic via des outils tiers
              comme Google Analytics. Vous pouvez désactiver les cookies dans
              les paramètres de votre navigateur.
            </p>

            <h2>3. Protection des données</h2>
            <p>
              Excellence Team s’engage à protéger la confidentialité de vos
              informations. Vos données personnelles ne sont jamais vendues,
              louées ou partagées avec des tiers à des fins commerciales.
            </p>

            <h2>4. Vos droits</h2>
            <p>
              Conformément à la législation sur la protection des données, vous
              disposez d’un droit d’accès, de rectification et de suppression de
              vos données personnelles. Pour exercer ce droit, contactez-nous à
              excellenceteam@gmail.com.
            </p>

            <h2>5. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et
              organisationnelles pour protéger vos données contre tout accès non
              autorisé ou perte accidentelle.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPage;
