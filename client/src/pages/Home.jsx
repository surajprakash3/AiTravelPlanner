import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import './Home.css';
import { MapPin, Search, Compass, Hotel, Utensils, Wallet, Backpack, ShieldCheck } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchDest, setSearchDest] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchDest.trim()) {
      navigate(`/create-trip`);
    }
  };

  return (
    <div className="home-container">
      {/* ——— Hero Section ——— */}
      <section className="hero-section">
        {/* Background Image with Overlay */}
        <div
          className="hero-bg-wrapper"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop")' }}
        >
          <div className="hero-bg-overlay"></div>
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-text-center">
            {/* Badge */}
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Powered by Google Gemini AI
            </div>

            {/* Heading */}
            <h1 className="hero-heading">
              Your AI-Powered <br className="hidden sm:block" />
              <span className="gradient-text">Travel Companion</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle" style={{ animationDelay: '0.2s' }}>
              Create personalized travel itineraries in seconds. Tell us your destination, budget, and style —
              and let Gemini AI craft the perfect trip with day-by-day schedules, hotel picks, and local gems.
            </p>

            {/* CTAs & Quick Planner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {isAuthenticated ? (
                <div className="hero-search-card">
                  <form onSubmit={handleSearch} className="hero-search-form">
                    <div className="hero-search-input-wrapper">
                      <MapPin className="hero-search-icon" />
                      <input
                        type="text"
                        placeholder="Where do you want to go?"
                        value={searchDest}
                        onChange={(e) => setSearchDest(e.target.value)}
                        className="hero-search-input"
                      />
                    </div>
                    <button type="submit" className="hero-search-btn">
                      <Search className="hero-search-btn-icon" /> Start Planning
                    </button>
                  </form>
                </div>
              ) : (
                <div className="hero-auth-actions">
                  <Link to="/register" id="hero-register" className="hero-btn-primary">
                    Get Started Free
                  </Link>
                  <Link to="/login" id="hero-login" className="hero-btn-secondary">
                    Already have an account? →
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— Features Section ——— */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to{' '}
              <span className="gradient-text">Plan the Perfect Trip</span>
            </h2>
            <p className="section-subtitle">
              Our AI analyzes thousands of travel data points to create hyper-personalized itineraries tailored to your unique preferences.
            </p>
          </div>

          <div className="features-grid stagger">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="feature-card"
                >
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" />
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— How It Works ——— */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <div className="section-header">
            <h2 className="section-title">
              Plan in <span className="gradient-text-warm">3 Simple Steps</span>
            </h2>
          </div>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="feature-card group">
                <div className="step-number">{i + 1}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA Section ——— */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Start Your{' '}
            <span className="gradient-text">Adventure?</span>
          </h2>
          <p className="cta-subtitle">
            Join thousands of travelers who use TripGenius to plan unforgettable journeys.
          </p>
          <Link
            to={isAuthenticated ? '/create-trip' : '/register'}
            id="cta-start"
            className="cta-btn"
          >
            {isAuthenticated ? '✨ Create Your Trip' : '🚀 Get Started for Free'}
          </Link>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const features = [
  {
    icon: Compass,
    title: 'AI-Powered Itineraries',
    description: 'Google Gemini AI crafts detailed day-by-day travel plans tailored to your preferences, budget, and style.',
  },
  {
    icon: Hotel,
    title: 'Smart Hotel Picks',
    description: 'Get curated hotel recommendations across budget tiers with pricing, descriptions, and neighborhood info.',
  },
  {
    icon: Utensils,
    title: 'Restaurant Recommendations',
    description: 'Discover local dining gems with cuisine type, price range, and must-try dishes for every day of your trip.',
  },
  {
    icon: Wallet,
    title: 'Budget Breakdown',
    description: 'See a realistic cost estimate covering accommodation, food, transport, activities, and miscellaneous expenses.',
  },
  {
    icon: Backpack,
    title: 'Packing Checklist',
    description: 'Never forget essentials again with an AI-generated packing list tailored to your destination and activities.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Local Tips',
    description: 'Travel confidently with destination-specific safety tips, weather advice, and local transportation guidance.',
  },
];

const steps = [
  {
    title: 'Enter Your Preferences',
    description: 'Tell us your destination, number of days, budget, travel style, and food preferences.',
  },
  {
    title: 'AI Generates Your Plan',
    description: 'Gemini AI creates a comprehensive itinerary with hotels, restaurants, attractions, and more.',
  },
  {
    title: 'Save & Explore',
    description: 'Save your trip to your dashboard, edit anytime, and access your plans on the go.',
  },
];
