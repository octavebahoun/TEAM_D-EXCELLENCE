import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.css";

const faqData = [
  {
    question: "How long is the process?",
    answer:
      "Our process typically ranges from 4 to 8 weeks, depending on the scope. We prioritize quality over speed, but we work in focused sprints to ensure efficient delivery.",
  },
  {
    question: "Do you offer web maintenance?",
    answer:
      "Every site we build comes with a 3-month support period. We also offer monthly maintenance packages for updates, security monitoring, and continuous SEO improvements.",
  },
  {
    question: "I have a limited budget. Can we work together?",
    answer:
      "We strive to support ambitious founders. While our 'Studio' and 'Scale' tiers are standard, we can tailor a roadmap for smaller projects that need a high-impact starting point.",
  },
  {
    question: "What is your main expertise?",
    answer:
      "We specialize in brand-centric digital experiences. That means we don't just build websites; we create visual identities and digital products that tell a story and convert users.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="section-label">FAQ</span>
            <h2 className="faq-title">Questions?</h2>
            <p className="faq-desc">
              Everything you need to know about working with us. If you have
              more questions, let's talk.
            </p>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={() => setOpenIndex(index)}
              >
                <div className="faq-question">
                  <h3>{item.question}</h3>
                  <span className="faq-icon">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
