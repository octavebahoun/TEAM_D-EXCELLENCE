import { motion } from "framer-motion";
import aboutImage from "../assets/hero2.avif";
import "./About.css";

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionSection = motion.section;

function About() {
  const descriptionText =
    "Damas Creative is a collective of designers, strategists, and storytellers who turn bold ideas into meaningful brand expressions. We partner with ambitious companies to shape identities, build trust, and create visual narratives that leave a lasting impression.";

  const words = descriptionText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(12px)",
      rotate: 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionSection
      id="about"
      className="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-content">
        <div className="about-text">
          <MotionDiv
            className="about-label"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            ABOUT US
          </MotionDiv>

          <MotionDiv
            className="about-title"
            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Ideas Crafted Into Impact
          </MotionDiv>

          <MotionDiv
            className="about-description"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {words.map((word, index) => (
              <MotionSpan
                key={index}
                variants={wordVariants}
                style={{ display: "inline-block", marginRight: "0.38em" }}
              >
                {word}
              </MotionSpan>
            ))}
          </MotionDiv>
        </div>

        <div className="about-media">
          <MotionDiv
            className="about-image-wrapper"
            initial={{
              opacity: 0,
              filter: "blur(25px)",
              rotate: -12,
              scale: 0.85,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              filter: "blur(0px)",
              rotate: -6,
              scale: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img src={aboutImage} alt="Damas Creative work" />
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

export default About;
