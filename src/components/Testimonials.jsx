import { motion } from "framer-motion";
import "./Testimonials.css";
import testimonialImg from "../assets/hero2.avif"; // Using existing asset for now

function Testimonials() {
  const quote =
    "Damas elevated our brand far beyond expectations. The campaign they crafted felt authentic, fresh, and exactly what our audience needed.";
  const words = quote.split(" ");

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.span
          className="section-label-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          TESTIMONIALS
        </motion.span>

        <motion.h2
          className="testimonials-header"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="testimonial-card">
          <div className="testimonial-text">
            <span className="testimonial-brand">StyleStash</span>
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
            <button className="testimonial-cta">Start a Project ↗</button>
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
              alt="Client"
            />
            <div className="testimonial-author">
              <strong>Yakoub Kashmiri</strong>
              <span>Marketing Director</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
