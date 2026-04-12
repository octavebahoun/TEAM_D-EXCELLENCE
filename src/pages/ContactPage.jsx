import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <SEO
        title="Contactez-nous"
        description="Vous avez un projet digital ou une question sur la cybersécurité ? Contactez Excellence Team à Cotonou pour un accompagnement sur mesure."
      />
      <div className="vignette-blur-bottom" />

      <main
        className="contact-main"
        style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}
      >
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-left">
              <motion.h1
                className="contact-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Collaborons
                <br />
                Ensemble.
              </motion.h1>
              <motion.p
                className="contact-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Vous avez un projet ou une question ? Remplissez le formulaire,
                et nous reviendrons vers vous rapidement.
              </motion.p>
            </div>

            <motion.div
              className="contact-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form
                className="contact-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Votre Budget (FCFA)</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="budget"
                        value="<1M"
                        defaultChecked
                      />
                      <span className="radio-custom"></span> &$lt;$ 1M
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="budget" value="1M-5M" />
                      <span className="radio-custom"></span> 1M - 5M
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="budget" value=">5M" />
                      <span className="radio-custom"></span> &$gt;$ 5M
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="project">Votre Projet</label>
                  <textarea
                    id="project"
                    rows="4"
                    placeholder="Décrivez votre projet ou votre besoin"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn btn-roulette"
                  data-text="Envoyer"
                >
                  <span className="btn-text">Envoyer</span>
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
