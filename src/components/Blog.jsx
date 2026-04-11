import { motion } from "framer-motion";
import "./Blog.css";

const posts = [
  {
    title: "Designing Products with Clear Purpose",
    description:
      "How mission-led design turns digital products into richer, more meaningful experiences.",
    image:
      "https://images.unsplash.com/photo-1550133730-69222584178a?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Future of Modern Fashion Websites",
    description:
      "Why modern fashion brands need digital experiences as stylish as their collections.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "How Creative Teams Build Brand Systems",
    description:
      "A look at the workflows that keep branding consistent across every touchpoint.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
];

function Blog() {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <div className="blog-title-wrap">
            <motion.span
              className="section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              BLOG
            </motion.span>
            <motion.h2
              className="blog-main-title"
              initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            >
              Inside the
              <br />
              Damas Journal
            </motion.h2>
          </div>
          <motion.button
            className="see-all-btn btn-roulette"
            data-text="See All Posts ↗"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="btn-text">See All Posts ↗</span>
          </motion.button>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              className="blog-card"
              initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -12 }}
            >
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-info">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
