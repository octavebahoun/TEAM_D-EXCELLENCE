import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="vignette-blur-bottom" />
      <main className="contact-main" style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}>
        <section className="contact-section">
          <div className="contact-container">
            
            <div className="contact-left">
              <motion.h1 
                className="contact-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Let's Build<br/>Something<br/>Together.
              </motion.h1>
              <motion.p 
                className="contact-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have a project or need help? Fill out the form, and we'll get back to you soon.
              </motion.p>
            </div>

            <motion.div 
              className="contact-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" />
                </div>

                <div className="form-group">
                  <label>Your Budget</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="budget" value="<5000" defaultChecked />
                      <span className="radio-custom"></span> &$lt;$5,000
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="budget" value="<10000" />
                      <span className="radio-custom"></span> &$lt;$10,000
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="budget" value=">10000" />
                      <span className="radio-custom"></span> &$gt;$10,000
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="project">Your Project</label>
                  <textarea id="project" rows="4" placeholder="Tell us about your project"></textarea>
                </div>

                <button type="submit" className="submit-btn btn-roulette" data-text="Submit">
                  <span className="btn-text">Submit</span>
                </button>
              </form>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
