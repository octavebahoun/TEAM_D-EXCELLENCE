import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import indispensable
import "./Blog.css";

const posts = [
  {
    id: "cybersecurite-pme",
    tag: "Cybersécurité",
    title: "Protéger sa PME contre les cyber-attaques",
    description: "5 étapes simples pour sécuriser vos données.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "saas-academique",
    tag: "Ingénierie",
    title: "Pourquoi le SaaS révolutionne l'éducation",
    description: "Retour sur le succès d'Academix au Bénin.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
  }
];

function Blog() {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <div className="blog-title-wrap">
            <motion.span className="section-label">BLOG</motion.span>
            <h2 className="blog-main-title">Le Journal Digital</h2>
          </div>
          
          {/* Navigation vers la page liste */}
          <Link to="/blog" className="nav-link">
            <button className="see-all-btn btn-roulette" data-text="Voir tout ↗">
              <span className="btn-text">Voir tout ↗</span>
            </button>
          </Link>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <motion.div key={post.id} className="blog-card" whileHover={{ y: -12 }}>
              {/* Lien vers l'article spécifique */}
              <Link to={`/blog/${post.id}`}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-info">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;