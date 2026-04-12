import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Large CTA Section */}
        <Link to="/contact" className="footer-cta-link">
          <div className="footer-top">
            <div className="cta-left">
              <h2 className="footer-main-title">
                CRÉONS L'AVENIR <br />
                ENSEMBLE <span className="arrow-icon">↗</span>
              </h2>
            </div>

            <div className="cta-right">
              <div className="footer-image-stack">
                <div className="footer-img-card card-3"></div>
                <div className="footer-img-card card-2"></div>
                <div className="footer-img-card card-1">
                  <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                    alt="Creative work"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Info Grid */}
        <div className="footer-grid">
          <div className="info-col">
            <span className="col-label">Nous rendre visite</span>
            <p className="col-text">
              Lokossa , Bénin
              <br />
              Agnivedji
            </p>
          </div>

          <div className="info-col">
            <span className="col-label">Nous contacter</span>
            <p className="col-text">
              <a href="mailto:excellenceteam@gmail.com">
                excellenceteam@gmail.com
              </a>
              <br />
              <a href="tel:+2290147797082">+229 01 47 79 70 82</a>
            </p>
          </div>

          <div className="social-links">
            <a href="#" className="social-icon icon-roulette">
              <span className="icon-front">
                <Instagram size={20} />
              </span>
              <span className="icon-back">
                <Instagram size={20} />
              </span>
            </a>
            <a href="#" className="social-icon icon-roulette">
              <span className="icon-front">
                <Youtube size={20} />
              </span>
              <span className="icon-back">
                <Youtube size={20} />
              </span>
            </a>
            <a href="#" className="social-icon icon-roulette">
              <span className="icon-front">
                <Linkedin size={20} />
              </span>
              <span className="icon-back">
                <Linkedin size={20} />
              </span>
            </a>
            <a href="#" className="social-icon icon-roulette">
              <span className="icon-front">
                <Twitter size={20} />
              </span>
              <span className="icon-back">
                <Twitter size={20} />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © 2026 Excellence Team - Tous droits réservés
          </div>
          <div className="legal-links">
            <Link to="/terms">Conditions Générales</Link>
            <Link to="/privacy">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
