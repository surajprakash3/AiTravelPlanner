import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTripById, deleteTrip } from '../services/api.js';
import ItineraryView from '../components/ItineraryView.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import './TripDetail.css';

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load trip.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTrip(id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete trip.');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="trip-detail-loading">
        <LoadingSpinner message="Loading trip details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-detail-error">
        <div className="trip-detail-error-icon">😕</div>
        <h2 className="trip-detail-error-title">Something went wrong</h2>
        <p className="trip-detail-error-desc">{error}</p>
        <Link to="/dashboard" className="trip-detail-error-link">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!trip) return null;

  const createdDate = new Date(trip.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="trip-detail-page">
      {/* Back link */}
      <Link to="/dashboard" className="trip-detail-back-link">
        ← Back to Dashboard
      </Link>

      {/* Trip header */}
      <div className="trip-header-card">
        <div className="trip-header-row">
          <div className="trip-header-text">
            <h1 className="trip-title">
              {trip.itinerary?.title || trip.title || `Trip to ${trip.destination}`}
            </h1>
            <p className="trip-created-date">Created on {createdDate}</p>
            {trip.itinerary?.summary && (
              <p className="trip-summary">{trip.itinerary.summary}</p>
            )}
          </div>
          <div className="trip-header-actions">
            <Link
              to={`/edit-trip/${trip._id}`}
              id="trip-edit-btn"
              className="trip-edit-btn"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              id="trip-delete-btn"
              className="trip-delete-btn"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Trip meta tags */}
        <div className="trip-meta-tags">
          <MetaTag emoji="📍" label={trip.destination} />
          <MetaTag emoji="📅" label={`${trip.numberOfDays} days`} />
          <MetaTag emoji="💰" label={trip.budget} />
          <MetaTag emoji="🧭" label={trip.travelStyle} />
          <MetaTag emoji="🚗" label={trip.transportation} />
          <MetaTag emoji="🍽️" label={trip.foodPreferences} />
        </div>
      </div>

      {/* Itinerary */}
      <div className="trip-itinerary-wrapper" style={{ animationDelay: '0.2s' }}>
        <ItineraryView itinerary={trip.itinerary} />
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          {/* Backdrop */}
          <div
            className="delete-modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          />
          {/* Modal */}
          <div className="delete-modal-card">
            <div className="delete-modal-inner">
              <div className="delete-modal-icon">⚠️</div>
              <h3 className="delete-modal-title">Delete this trip?</h3>
              <p className="delete-modal-desc">
                This will permanently delete your trip to <strong className="text-white">{trip.destination}</strong> and its itinerary.
                This action cannot be undone.
              </p>
              <div className="delete-modal-actions">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="delete-modal-cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  id="confirm-delete-btn"
                  className="delete-modal-confirm-btn"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetaTag({ emoji, label }) {
  return (
    <span className="trip-meta-tag">
      <span className="trip-meta-tag-emoji">{emoji}</span> {label}
    </span>
  );
}
