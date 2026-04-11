import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import navbarLogo from "../assets/navbarlogo.png";

const ObjectNavItems = [
  { name: "About Us", id: "about" },
  { name: "Services", id: "services" },
];

const navItems = ["About Us", "Services", "Works", "Blog"];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (name) => {
    setIsOpen(false);

    if (name === "Works") {
      navigate("/works");
      window.scrollTo(0, 0);
      return;
    }

    if (name === "Blog") {
      navigate("/blog");
      window.scrollTo(0, 0);
      return;
    }

    const targetItem = ObjectNavItems.find((item) => item.name === name);
    if (targetItem && targetItem.id) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetItem.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetItem.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header className="top-nav-wrap">
        <nav className="top-nav" aria-label="Navigation principale">
          <button
            className="nav-logo"
            aria-label="Accueil"
            onClick={() => {
              setIsOpen(false);
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            <img src={navbarLogo} alt="Excellence" />
          </button>

          {/* Desktop Links */}
          <div className="nav-desktop">
            {navItems.map((item) => (
              <button
                key={item}
                className="nav-item btn-roulette"
                data-text={item}
                onClick={() => handleNavClick(item)}
              >
                <span className="btn-text">{item}</span>
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
                  className="mobile-nav-item btn-roulette"
                  data-text={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => handleNavClick(item)}
                >
                  <span className="btn-text">{item}</span>
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
