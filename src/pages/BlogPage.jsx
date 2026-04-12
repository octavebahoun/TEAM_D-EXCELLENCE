import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./BlogPage.css";
import blogData from "../data/blog.json";

function BlogPage() {
  const [data, setData] = useState({ featured: null, articles: [] });

  useEffect(() => {
    setData(blogData);
  }, []);

  return (
    <>
      <SEO
        title="Blog & Insights"
        description="Décryptage tech, actualités cybersécurité et guides de transformation digitale. Le journal d'Excellence Team pour rester à la pointe de l'innovation."
      />
      <Navbar />

      <main className="blogpage-main">
        {/* Marquee Header */}
        <div className="blog-marquee">
          <div className="marquee-content">
            {[1, 2, 3].map((n) => (
              <span key={n}>
                L'OPINION D'EXCELLENCE • INSIGHTS DIGITAUX • STRATÉGIE TECH
                •{" "}
              </span>
            ))}
          </div>
        </div>

        <section className="blog-hero">
          <div className="blog-container">
            <motion.h1
              className="blog-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Le Journal
              <br />
              <span className="italic-text">d'Excellence</span>
            </motion.h1>
          </div>
        </section>

        <section className="blog-content">
          <div className="blog-container">
            {/* Featured Article - Large Side Layout */}
            {data.featured && (
              <motion.div
                className="featured-post"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/blog/${data.featured.id}`}
                  className="featured-link"
                >
                  <div className="featured-image-box">
                    <img src={data.featured.image} alt={data.featured.title} />
                    <div className="image-overlay" />
                  </div>
                  <div className="featured-info">
                    <span className="post-tag">{data.featured.tag}</span>
                    <h2 className="featured-post-title">
                      {data.featured.title}
                    </h2>
                    <p className="featured-post-desc">
                      {data.featured.description}
                    </p>
                    <div className="post-meta">
                      {data.featured.date} • {data.featured.readTime}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Asymmetrical Grid */}
            <div className="blog-asym-grid">
              {data.articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  className={`blog-post-card card-${(i % 4) + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${article.id}`}>
                    <div className="post-image-wrap">
                      <img src={article.image} alt={article.title} />
                      <span className="post-tag-floating">{article.tag}</span>
                    </div>
                    <div className="post-text-content">
                      <h3 className="post-title-small">{article.title}</h3>
                      <p className="post-preview">{article.description}</p>
                      <div className="post-meta-small">
                        {article.date} • {article.readTime}
                      </div>
                    </div>
                  </Link>
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
