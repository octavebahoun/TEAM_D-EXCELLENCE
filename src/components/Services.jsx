import { motion } from "framer-motion";
import "./Services.css";

const services = [
  {
    title: "Brand Identity",
    description:
      "Crafting memorable identities that express the heart of your brand.",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Brand Strategy",
    description:
      "Defining your brand's direction, voice, and positioning for long lasting impact.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Creative Direction",
    description:
      "Guiding the visual story and ensuring every detail aligns with your mission.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
];

const MotionDiv = motion.div;

function Services() {
  return (
    <section className="services-section">
      <div className="services-header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          OUR SERVICES
        </motion.span>
        <div className="services-title-row">
          <motion.h2
            className="services-main-title"
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How We Elevate
            <br />
            Your Brand
          </motion.h2>
          <motion.button
            className="start-project-btn"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            Start a Project ↗
          </motion.button>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <MotionDiv
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

export default Services;
