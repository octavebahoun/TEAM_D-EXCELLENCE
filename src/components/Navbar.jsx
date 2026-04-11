import navbarLogo from "../assets/navbarlogo.png";

const navItems = ["About Us", "Services", "Works", "Blog"];

function Navbar() {
  return (
    <header className="top-nav-wrap">
      <nav className="top-nav" aria-label="Navigation principale">
        <button className="nav-logo" aria-label="Accueil">
          <img src={navbarLogo} alt="Excellence" />
        </button>
        {navItems.map((item) => (
          <button key={item} className="nav-item">
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
