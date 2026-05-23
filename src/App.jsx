import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import SEO from "./components/SEO";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import teamData from "./data/team.json";

import Footer from "./components/Footer";
import WorksPage from "./pages/WorksPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <SEO
        title="L'Ingénierie Digitale d'Exception au Bénin"
        description="Experts en développement logiciel, cybersécurité et infrastructure. Excellence Team accompagne les entreprises vers une transformation digitale premium."
        teamMembers={teamData}
      />
      <div className="vignette-blur-bottom" />

      <div className="hero-section">
        <main className="page-shell">
          <Hero />
        </main>
      </div>
      <div className="about-section">
        <div className="page-shell">
          <About />
        </div>
      </div>
      <Services />
      <Works />
      <Testimonials />
      <Pricing />
      <Team />
      <Blog />

      <FAQ />
      <Footer />
    </>
  );
}

export default App;
