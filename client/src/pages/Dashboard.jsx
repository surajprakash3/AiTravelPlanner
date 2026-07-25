import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getTrips } from '../services/api.js';
import TripCard from '../components/TripCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { motion } from 'framer-motion';
import './Dashboard.css';
import { Search, MapPin, Sparkles, Map, CalendarDays, PlusCircle, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounce(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const { data } = await getTrips(searchDebounce);
        setTrips(data);
      } catch (err) {
        console.error('Failed to load trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [searchDebounce]);

  // Compute stats
  const uniqueDestinations = new Set(trips.map((t) => t.destination.split(',')[0].trim())).size;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Traveler'}</span>! 👋
          </h1>
          <p className="dashboard-subtitle">Manage your AI-generated travel plans</p>
        </div>
        <Link to="/create-trip" className="dashboard-new-trip-btn">
          <PlusCircle className="w-5 h-5" /> New Trip
        </Link>
      </motion.div>

      <div className="dashboard-grid">
        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stats-grid"
          >
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon-blue"><Map className="stat-icon" /></div>
                <p className="stat-label">Total Trips</p>
              </div>
              <p className="stat-value">{trips.length}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon-green"><MapPin className="stat-icon" /></div>
                <p className="stat-label">Destinations</p>
              </div>
              <p className="stat-value">{uniqueDestinations}</p>
            </div>
            <div className="stat-card-hidden">
              <div className="stat-card-header">
                <div className="stat-icon-purple"><CalendarDays className="stat-icon" /></div>
                <p className="stat-label">Days Planned</p>
              </div>
              <p className="stat-value">
                {trips.reduce((sum, t) => sum + (t.numberOfDays || 0), 0)}
              </p>
            </div>
          </motion.div>

          {/* Search & Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="search-header-row"
          >
            <h2 className="search-section-title">Your Itineraries</h2>
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations..."
                className="search-input"
              />
            </div>
          </motion.div>

          {/* Trip grid */}
          {loading ? (
            <LoadingSpinner message="Loading your adventures..." />
          ) : trips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="empty-state-card"
            >
              <div className="empty-state-icon">🗺️</div>
              <h2 className="empty-state-title">
                {search ? 'No trips found' : 'No trips yet'}
              </h2>
              <p className="empty-state-desc">
                {search
                  ? `No trips match "${search}". Try a different destination.`
                  : 'Your travel canvas is empty. Let Gemini AI craft your first unforgettable journey!'}
              </p>
              {!search && (
                <Link to="/create-trip" className="empty-state-btn">
                  <Sparkles className="w-5 h-5" /> Plan Your First Trip
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="trips-grid"
            >
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="dashboard-sidebar"
        >
          {/* AI Recommendations */}
          <div className="ai-suggestions-card group">
            <div className="ai-suggestions-glow" />
            <div className="ai-suggestions-header">
              <Sparkles className="ai-suggestions-header-icon" />
              <h3 className="ai-suggestions-title">AI Suggestions</h3>
            </div>

            <div className="ai-suggestions-list">
              {[
                { name: 'Kyoto, Japan', desc: 'Cherry blossoms & temples', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop' },
                { name: 'Amalfi Coast, Italy', desc: 'Coastal cliffs & lemons', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400&auto=format&fit=crop' },
                { name: 'Banff, Canada', desc: 'Mountains & emerald lakes', img: 'https://images.unsplash.com/photo-1573514088924-f7b5883ef596?q=80&w=400&auto=format&fit=crop' }
              ].map((dest, i) => (
                <div key={i} className="suggestion-item group/item">
                  <img src={dest.img} alt={dest.name} className="suggestion-img" />
                  <div className="suggestion-info">
                    <p className="suggestion-name">{dest.name}</p>
                    <p className="suggestion-desc">{dest.desc}</p>
                  </div>
                  <ArrowRight className="suggestion-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Pro Banner */}
          <div className="pro-banner">
            <div className="pro-banner-icon">
              <span className="text-xl">✨</span>
            </div>
            <h4 className="pro-banner-title">TripGenius Pro</h4>
            <p className="pro-banner-desc">Unlock unlimited PDF exports and real-time flight tracking.</p>
            <button className="pro-banner-btn">Upgrade Now</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
