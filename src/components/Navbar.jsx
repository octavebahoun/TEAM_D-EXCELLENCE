import { useNavigate, useLocation } from "react-router-dom";
import navbarLogo from "../assets/navbarlogo.png";

const ObjectNavItems = [
  { name: "About Us", id: "about" },
  { name: "Services", id: "services" },
];

const navItems = ["About Us", "Services", "Works", "Blog"];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (name) => {
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
    <header className="top-nav-wrap">
      <nav className="top-nav" aria-label="Navigation principale">
        <button
          className="nav-logo"
          aria-label="Accueil"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img src={navbarLogo} alt="Excellence" />
        </button>

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
      </nav>
    </header>
  );
}

export default Navbar;
