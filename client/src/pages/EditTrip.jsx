import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTripById, updateTrip } from '../services/api.js';
import './EditTrip.css';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const BUDGET_OPTIONS = ['Budget', 'Mid-Range', 'Luxury'];
const TRAVEL_STYLES = ['Adventure', 'Relaxation', 'Cultural', 'Family', 'Solo', 'Romantic'];
const TRANSPORT_OPTIONS = [
  'Public Transit',
  'Rental Car',
  'Walking & Cycling',
  'Ride-sharing (Uber/Lyft)',
  'Mix of Everything',
];
const FOOD_OPTIONS = [
  'Local Street Food',
  'Fine Dining',
  'Vegetarian / Vegan',
  'Halal',
  'Mix of Everything',
  'Budget-friendly Eateries',
];

const STYLE_EMOJIS = {
  Adventure: '🏔️',
  Relaxation: '🏖️',
  Cultural: '🏛️',
  Family: '👨‍👩‍👧‍👦',
  Solo: '🎒',
  Romantic: '💑',
};

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    destination: '',
    numberOfDays: 3,
    budget: '',
    travelStyle: '',
    transportation: '',
    foodPreferences: '',
  });

  // Load existing trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);
        setForm({
          destination: data.destination,
          numberOfDays: data.numberOfDays,
          budget: data.budget,
          travelStyle: data.travelStyle,
          transportation: data.transportation,
          foodPreferences: data.foodPreferences,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load trip.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const selectOption = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSave = async (regenerate = false) => {
    setError('');
    const setter = regenerate ? setRegenerating : setSaving;
    setter(true);

    try {
      await updateTrip(id, {
        ...form,
        numberOfDays: Number(form.numberOfDays),
        regenerate,
      });
      navigate(`/trip/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update trip.');
      setter(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-loading">
        <LoadingSpinner message="Loading trip data..." />
      </div>
    );
  }

  if (regenerating) {
    return (
      <div className="edit-regenerating">
        <div className="edit-regenerating-card">
          <div className="edit-regenerating-icon">🔄</div>
          <h2 className="edit-regenerating-title">Regenerating Itinerary</h2>
          <p className="edit-regenerating-desc">
            AI is creating a fresh itinerary for{' '}
            <span className="text-primary-400 font-medium">{form.destination}</span> with your updated preferences.
          </p>
          <LoadingSpinner message="This may take 10–20 seconds..." />
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      {/* Back link */}
      <Link to={`/trip/${id}`} className="edit-back-link">
        ← Back to Trip
      </Link>

      {/* Header */}
      <div className="edit-page-header">
        <h1 className="edit-page-title">
          Edit <span className="gradient-text">Trip Preferences</span>
        </h1>
        <p className="edit-page-subtitle">
          Update your preferences. You can save changes or regenerate the entire itinerary with AI.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="edit-error-msg">{error}</div>
      )}

      {/* Form */}
      <div className="edit-form">
        {/* Destination */}
        <div className="form-section">
          <label className="form-label">📍 Destination</label>
          <input
            type="text"
            name="destination"
            id="edit-destination"
            value={form.destination}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Number of days */}
        <div className="form-section">
          <label className="form-label">📅 Number of Days</label>
          <div className="range-container">
            <input
              type="range"
              name="numberOfDays"
              id="edit-days"
              min="1"
              max="30"
              value={form.numberOfDays}
              onChange={handleChange}
              className="range-input"
            />
            <span className="range-value">{form.numberOfDays}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="form-section">
          <label className="form-label">💰 Budget Tier</label>
          <div className="options-grid-3">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => selectOption('budget', opt)}
                className={`option-btn ${form.budget === opt ? 'option-selected' : 'option-unselected'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div className="form-section">
          <label className="form-label">🧭 Travel Style</label>
          <div className="options-grid-responsive">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => selectOption('travelStyle', style)}
                className={`option-btn ${form.travelStyle === style ? 'option-selected' : 'option-unselected'}`}
              >
                {STYLE_EMOJIS[style]} {style}
              </button>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div className="form-section">
          <label className="form-label">🚗 Transportation</label>
          <div className="options-grid-responsive-2">
            {TRANSPORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => selectOption('transportation', opt)}
                className={`option-btn-left ${form.transportation === opt ? 'option-selected' : 'option-unselected'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Food */}
        <div className="form-section">
          <label className="form-label">🍽️ Food Preferences</label>
          <div className="options-grid-responsive-2">
            {FOOD_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => selectOption('foodPreferences', opt)}
                className={`option-btn-left ${form.foodPreferences === opt ? 'option-selected' : 'option-unselected'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="edit-actions-row">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            id="edit-save-btn"
            className="edit-save-btn"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || regenerating}
            id="edit-regenerate-btn"
            className="edit-regenerate-btn"
          >
            🔄 Regenerate Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}
