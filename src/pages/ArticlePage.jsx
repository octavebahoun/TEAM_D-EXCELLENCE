import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
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
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      {/* Progress reading bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-accent-mint z-[110] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <main className="relative bg-bg-ink min-h-screen z-10 pt-28 overflow-hidden">
        {/* Grids and lights */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-1/4 right-1/4 opacity-25" />

        <article className="max-w-4xl mx-auto px-4 md:px-8 pt-16 pb-24">
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="px-3 py-1 bg-accent-mint/5 border border-accent-mint/15 rounded-full text-[0.68rem] font-black text-accent-mint tracking-wider uppercase">
                {article.tag}
              </span>
              <span className="text-xs font-semibold text-text-muted">
                {article.date} • {article.readTime}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-tight tracking-tight mb-8"
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-muted text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-12"
            >
              {article.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-soft"
            >
              <img src={article.image} alt={article.title} className="w-full h-full object-cover block" />
            </motion.div>
          </header>

          {/* Render Rich Content Blocks */}
          <div className="prose prose-invert max-w-none flex flex-col gap-8 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
            {article.content &&
              article.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <motion.h2
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="font-display font-black text-2xl sm:text-3xl text-text-bright mt-8 mb-4 tracking-tight"
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
                      className="pl-6 border-l-4 border-accent-gold font-editorial italic font-light text-2xl text-accent-gold py-2 my-6"
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
                      className="mb-4 text-text-muted"
                    >
                      {block.text}
                    </motion.p>
                  );
                }
              })}
          </div>
        </article>

        {/* More Articles Section */}
        <section className="relative py-24 bg-surface-dark border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-display font-black text-3xl text-text-bright mb-12 tracking-tight text-center sm:text-left">
              À lire aussi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreArticles.map((item) => (
                <div 
                  key={item.id} 
                  className="glass-panel group border border-white/5 rounded-3xl overflow-hidden bg-surface-card/45 hover:border-accent-mint/20 shadow-soft transition-all duration-500 flex flex-col justify-between"
                >
                  <Link
                    to={`/blog/${item.id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="block flex-grow"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover block filter brightness-75 group-hover:scale-102 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-bg-ink/80 border border-white/10 rounded-full text-[0.68rem] font-black text-accent-mint tracking-wider uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-text-bright mb-3 group-hover:text-accent-mint transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed">
                        {item.description}
                      </p>
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
