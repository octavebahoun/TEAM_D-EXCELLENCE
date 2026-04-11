import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WorksPage from "./pages/WorksPage";

function HomePage() {
  return (
    <>
      <div className="vignette-blur-bottom" />
      <div className="hero-section">
        <main className="page-shell">
          <Navbar />
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
      <Blog />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
