import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ArticlePage.css";
import blogData from "../data/blog.json";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [moreArticles, setMoreArticles] = useState([]);

  useEffect(() => {
    // Find article in featured or articles list
    let found = null;
    if (blogData.featured && blogData.featured.id === id) {
      found = blogData.featured;
    } else {
      found = blogData.articles.find((a) => a.id === id);
    }
    
    if (found) {
      setArticle(found);
      // Get other articles for "More Articles"
      const others = blogData.articles.filter((a) => a.id !== id).slice(0, 3);
      setMoreArticles(others);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!article) return null;

  return (
    <>
      <Navbar />
      <div className="vignette-blur-bottom" />
      <main className="article-main" style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}>
        <article className="article-container paddingTop">
          
          <header className="article-header">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="article-title"
            >
              {article.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="article-subtitle"
            >
              {article.description}
            </motion.p>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="article-hero-image"
            >
              <img src={article.image} alt={article.title} />
            </motion.div>
          </header>

          <div className="article-content">
            {article.content && article.content.map((block, index) => {
              if (block.type === "heading") {
                return <h2 key={index}>{block.text}</h2>;
              } else if (block.type === "quote") {
                return <blockquote key={index}>{block.text}</blockquote>;
              } else {
                return <p key={index}>{block.text}</p>;
              }
            })}
          </div>
        </article>

        {/* More Articles Section */}
        <section className="more-articles-section">
          <div className="article-container">
            <h2 className="more-articles-title">More Articles</h2>
            
            <div className="blogpage-grid">
              {moreArticles.map((item, index) => (
                <Link to={`/blog/${item.id}`} key={item.id} className="blogpage-card" onClick={() => window.scrollTo(0,0)}>
                  <div className="blogpage-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <h3 className="blogpage-card-title">{item.title}</h3>
                  <p className="blogpage-card-desc">{item.description}</p>
                </Link>
              ))}
            </div>

            {/* Let's Create Together Block */}
            <div className="create-together-block">
              <div className="create-together-text">
                <h2>LET'S CREATE<br/>TOGETHER <span>↗</span></h2>
              </div>
              <div className="create-together-images">
                 {/* Visual representation of the overlapping cards */}
                 <div className="ct-card ct-card-1"></div>
                 <div className="ct-card ct-card-2"></div>
                 <div className="ct-card ct-card-3">
                    <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop" alt="Abstract" />
                 </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default ArticlePage;
