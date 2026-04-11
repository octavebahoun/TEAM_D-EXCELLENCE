import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import "./BlogPage.css";
import blogData from "../data/blog.json";

function BlogPage() {
  const [data, setData] = useState({ featured: null, articles: [] });

  useEffect(() => {
    // Simulating API fetch
    setData(blogData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="vignette-blur-bottom" />
      <main
        className="blogpage-main"
        style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}
      >
        <section className="blogpage-section" style={{ paddingTop: "180px", paddingBottom: "120px" }}>
          <div className="blogpage-container">
            
            <div className="blogpage-header">
              <motion.h2
                className="blogpage-main-title"
                initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
              >
                Inside the <br/>Damas Journal
              </motion.h2>
              <motion.p 
                className="blogpage-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover fresh ideas, practical tips, and creative insights <br/>
                designed to inspire and help you build better digital experiences.
              </motion.p>
            </div>

            <div className="blogpage-search-container">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="blogpage-search-input"
              />
            </div>

            {data.featured && (
              <motion.div 
                className="blogpage-featured"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="featured-content">
                  <span className="featured-tag">{data.featured.tag}</span>
                  <h2 className="featured-title">{data.featured.title}</h2>
                  <p className="featured-desc">{data.featured.description}</p>
                  <button className="featured-btn btn-roulette" data-text={data.featured.linkText}>
                    <span className="btn-text">{data.featured.linkText}</span>
                  </button>
                </div>
                <div className="featured-image">
                  <img src={data.featured.image} alt={data.featured.title} />
                  <div className="featured-sparkle">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 0V30" stroke="#fcd718" strokeWidth="8" strokeLinecap="round"/>
                      <path d="M85 15L65 35" stroke="#fcd718" strokeWidth="8" strokeLinecap="round"/>
                      <path d="M100 50H70" stroke="#fcd718" strokeWidth="8" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="blogpage-grid">
              {data.articles.map((article, index) => (
                <motion.div 
                  key={article.id} 
                  className="blogpage-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="blogpage-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <h3 className="blogpage-card-title">{article.title}</h3>
                  <p className="blogpage-card-desc">{article.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default BlogPage;
