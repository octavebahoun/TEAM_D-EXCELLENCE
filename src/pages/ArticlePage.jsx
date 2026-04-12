import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./ArticlePage.css";

import blogData from "../data/blog.json";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [moreArticles, setMoreArticles] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let found = null;
    if (blogData.featured && blogData.featured.id === id) {
      found = blogData.featured;
    } else {
      found = blogData.articles.find((a) => a.id === id);
    }

    if (found) {
      setArticle(found);
      const others = blogData.articles.filter((a) => a.id !== id).slice(0, 3);
      setMoreArticles(others);
    } else {
      navigate("/blog");
    }
  }, [id, navigate]);

  if (!article) return null;

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        image={article.image}
        type="article"
      />
      <Navbar />

      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      <main className="article-main">
        <article className="article-container paddingTop">
          <header className="article-header">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="article-top-meta"
            >
              <span className="article-tag">{article.tag}</span>
              <span className="article-date-time">
                {article.date} • {article.readTime}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="article-title"
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="article-subtitle"
            >
              {article.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="article-hero-image"
            >
              <img src={article.image} alt={article.title} />
              <div className="image-grain" />
            </motion.div>
          </header>

          <div className="article-content">
            {article.content &&
              article.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <motion.h2
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {block.text}
                    </motion.h2>
                  );
                } else if (block.type === "quote") {
                  return (
                    <motion.blockquote
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      {block.text}
                    </motion.blockquote>
                  );
                } else {
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {block.text}
                    </motion.p>
                  );
                }
              })}
          </div>
        </article>

        {/* More Articles Section */}
        <section className="more-articles-section">
          <div className="article-container">
            <h2 className="more-articles-title">À lire aussi</h2>

            <div className="blog-asym-grid">
              {moreArticles.map((item, index) => (
                <div key={item.id} className="blog-post-card card-3">
                  <Link
                    to={`/blog/${item.id}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <div className="post-image-wrap">
                      <img src={item.image} alt={item.title} />
                      <span className="post-tag-floating">{item.tag}</span>
                    </div>
                    <div className="post-text-content">
                      <h3 className="post-title-small">{item.title}</h3>
                      <p className="post-preview">{item.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ArticlePage;
