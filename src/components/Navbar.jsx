import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import navbarLogo from "../assets/navbarlogo.png";

const navItems = ["About Us", "Services", "Works", "Blog"];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="top-nav-wrap">
        <nav className="top-nav" aria-label="Navigation principale">
          <button
            className="nav-logo"
            aria-label="Accueil"
            onClick={() => setIsOpen(false)}
          >
            <img src={navbarLogo} alt="Excellence" />
          </button>

          {/* Desktop Links */}
          <div className="nav-desktop">
            {navItems.map((item) => (
              <button key={item} className="nav-item">
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Burger Toggle */}
          <button
            className="nav-burger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`burger-line ${isOpen ? "open-1" : ""}`} />
            <div className={`burger-line ${isOpen ? "open-2" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  className="mobile-nav-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
