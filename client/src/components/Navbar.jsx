import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, LayoutDashboard, PlusCircle, LogOut, Menu, X, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-row">
          {/* Logo */}
          <Link to="/" className="navbar-logo group" id="nav-logo">
            <div className="navbar-logo-icon">
              <Plane className="navbar-logo-plane" strokeWidth={2.5} />
            </div>
            <span className="navbar-logo-text">TripGenius</span>
          </Link>

          {/* Desktop nav */}
          <div className="navbar-desktop">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  id="nav-dashboard"
                  className={`navbar-nav-link ${isActive('/dashboard') ? 'navbar-nav-link-active' : 'navbar-nav-link-inactive'}`}
                >
                  <LayoutDashboard className="navbar-nav-link-icon" />
                  Dashboard
                </Link>
                <Link
                  to="/create-trip"
                  id="nav-create-trip"
                  className="navbar-cta-btn"
                >
                  <PlusCircle className="navbar-cta-icon" />
                  New Trip
                </Link>
                <div className="navbar-user-section">
                  <div className="navbar-user-info">
                    <div className="navbar-avatar">
                      {user?.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
                    </div>
                    <span className="navbar-username">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    id="nav-logout"
                    className="navbar-logout-btn"
                    title="Logout"
                  >
                    <LogOut className="navbar-logout-icon" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" id="nav-login" className="navbar-auth-login">Login</Link>
                <Link to="/register" id="nav-register" className="navbar-auth-register">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="navbar-mobile-toggle-icon" /> : <Menu className="navbar-mobile-toggle-icon" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="navbar-mobile-menu"
            >
              <div className="navbar-mobile-links">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className={`navbar-mobile-link ${isActive('/dashboard') ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'}`}
                    >
                      <LayoutDashboard className="navbar-mobile-link-icon" /> Dashboard
                    </Link>
                    <Link
                      to="/create-trip"
                      onClick={() => setMobileOpen(false)}
                      className={`navbar-mobile-link ${isActive('/create-trip') ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'}`}
                    >
                      <PlusCircle className="navbar-mobile-link-icon" /> New Trip
                    </Link>
                    <button onClick={handleLogout} className="navbar-mobile-logout-btn">
                      <LogOut className="navbar-mobile-link-icon" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="navbar-mobile-auth-login">Login</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="navbar-mobile-auth-register">Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
