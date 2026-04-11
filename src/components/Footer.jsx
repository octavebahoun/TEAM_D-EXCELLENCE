import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Large CTA Section */}
        <div className="footer-top">
          <div className="cta-left">
            <h2 className="footer-main-title">
              LET'S CREATE <br />
              TOGETHER <span className="arrow-icon">↗</span>
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

        {/* Info Grid */}
        <div className="footer-grid">
          <div className="info-col">
            <span className="col-label">Visit Us</span>
            <p className="col-text">
              7814 Harrison Blvd. Wilmington,
              <br />
              19804 United States
            </p>
          </div>

          <div className="info-col">
            <span className="col-label">Contact Us</span>
            <p className="col-text">
              <a href="mailto:hello@framer.com">hello@framer.com</a>
              <br />
              <a href="tel:+12345678910">+1 (234) 567-8910</a>
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
          <div className="copyright">© 2025 Templyo - All right reserved</div>
          <div className="legal-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
