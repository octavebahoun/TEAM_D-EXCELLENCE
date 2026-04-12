import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Testimonials.css";
import testimonialImg from "../assets/hero2.avif"; // Using existing asset for now

function Testimonials() {
  const quote =
    "Excellence Digital a su comprendre et traduire notre vision en une expérience digitale immersive et authentique. Leur expertise technique et leur créativité ont été des atouts majeurs pour le lancement du TWIN.";
  const words = quote.split(" ");

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.span
          className="section-label-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Temoignages
        </motion.span>

        <motion.h2
          className="testimonials-header"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          Ce que nos clients disent de nous
        </motion.h2>

        <div className="testimonial-card">
          <div className="testimonial-text">
            <span className="testimonial-brand">Le TWIN</span>
            <p className="testimonial-quote">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
            <Link to="/contact">
              <button
                className="testimonial-cta btn-roulette"
                data-text="Commencez avec nous ↗"
              >
                <span className="btn-text">Commencez avec nous ↗</span>
              </button>
            </Link>
          </div>

          <motion.div
            className="testimonial-image-wrap"
            initial={{
              opacity: 0,
              rotate: 5,
              scale: 0.9,
              filter: "blur(20px)",
            }}
            whileInView={{
              opacity: 1,
              rotate: 3,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://res.cloudinary.com/dla8wr5qj/image/upload/v1773383605/WhatsApp_Image_2026-03-13_at_07.28.01_1_pb0qhe.jpg"
              alt="Client"
            />
            <div className="testimonial-author">
              <strong className="text-white">Mechack HOUNKPATIN</strong>
              <span className="text-white">Directeur Général</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
