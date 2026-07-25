import { Link } from 'react-router-dom';
import { Plane, Twitter, Instagram, Github, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo group">
              <div className="footer-logo-icon">
                <Plane className="footer-logo-plane" strokeWidth={2.5} />
              </div>
              <span className="footer-logo-text">TripGenius</span>
            </Link>
            <p className="footer-brand-desc">
              Your personal AI travel concierge. Discover the world with itineraries tailored to your unique style and budget.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn"><Twitter className="footer-social-icon" /></a>
              <a href="#" className="footer-social-btn"><Instagram className="footer-social-icon" /></a>
              <a href="#" className="footer-social-btn"><Github className="footer-social-icon" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-col-list">
              <li><Link to="/create-trip" className="footer-col-link">Trip Planner</Link></li>
              <li><Link to="/dashboard" className="footer-col-link">Dashboard</Link></li>
              <li><a href="#" className="footer-col-link">Destinations</a></li>
              <li><a href="#" className="footer-col-link">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-col-list">
              <li><a href="#" className="footer-col-link">About Us</a></li>
              <li><a href="#" className="footer-col-link">Careers</a></li>
              <li><a href="#" className="footer-col-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-col-link">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-desc">Get travel inspiration and AI tips delivered to your inbox.</p>
            <form className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Email address"
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-btn">
                <Mail className="footer-newsletter-btn-icon" />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} TripGenius. All rights reserved.
          </p>
          <p className="footer-powered">
            Powered by <span className="footer-powered-name">Google Gemini AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
