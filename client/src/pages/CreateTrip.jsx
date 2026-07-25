import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import './CreateTrip.css';

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

export default function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    destination: '',
    numberOfDays: 3,
    budget: '',
    travelStyle: '',
    transportation: '',
    foodPreferences: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const selectOption = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const missing = [];
    if (!form.destination.trim()) missing.push('Destination');
    if (!form.budget) missing.push('Budget');
    if (!form.travelStyle) missing.push('Travel Style');
    if (!form.transportation) missing.push('Transportation');
    if (!form.foodPreferences) missing.push('Food Preferences');
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const { data } = await createTrip({
        ...form,
        numberOfDays: Number(form.numberOfDays),
      });
      navigate(`/trip/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="create-trip-loading">
        <div className="create-trip-loading-card animate-pulse-glow">
          <div className="create-trip-loading-icon animate-float">✈️</div>
          <h2 className="create-trip-loading-title">AI is Planning Your Trip</h2>
          <p className="create-trip-loading-desc">
            Gemini AI is crafting a personalized itinerary for your trip to{' '}
            <span className="text-primary-400 font-medium">{form.destination}</span>. This usually takes 10–20 seconds.
          </p>
          <LoadingSpinner isAiMode={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="create-trip-page">
      {/* Background */}
      <div className="create-trip-bg-wrapper"></div>
      <div className="create-trip-bg-overlay"></div>

      <div className="create-trip-container">
        {/* Header */}
        <div className="create-trip-header animate-fade-in">
          <h1 className="create-trip-title">
            Plan Your <span className="gradient-text">Dream Trip</span> ✨
          </h1>
          <p className="create-trip-subtitle">
            Tell us about your ideal vacation and our AI will create a comprehensive travel plan just for you.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="create-trip-error animate-fade-in">
            {error}
          </div>
        )}

        {/* Form Box */}
        <div className="create-trip-card animate-slide-up">
          <form onSubmit={handleSubmit} className="create-trip-form">
            <div className="create-trip-grid">
              
              {/* Left Column */}
              <div className="create-trip-col">
                <div className="form-section">
                  <label className="form-label">📍 Where are you going?</label>
                  <input
                    type="text"
                    name="destination"
                    id="create-destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g., Tokyo, Japan"
                    className="form-input"
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">📅 How many days?</label>
                  <div className="range-container">
                    <input
                      type="range"
                      name="numberOfDays"
                      id="create-days"
                      min="1"
                      max="30"
                      value={form.numberOfDays}
                      onChange={handleChange}
                      className="range-input"
                    />
                    <span className="range-value">{form.numberOfDays}</span>
                  </div>
                  <p className="range-subtext">
                    {form.numberOfDays} {form.numberOfDays === 1 ? 'day' : 'days'}
                  </p>
                </div>

                <div className="form-section">
                  <label className="form-label">💰 Budget Tier</label>
                  <div className="options-grid-3">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectOption('budget', opt)}
                        className={`option-btn ${
                          form.budget === opt ? 'option-selected' : 'option-unselected'
                        }`}
                      >
                        {opt === 'Budget' && '💵'} {opt === 'Mid-Range' && '💳'} {opt === 'Luxury' && '💎'} {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="create-trip-col">
                <div className="form-section">
                  <label className="form-label">🧭 Travel Style</label>
                  <div className="options-grid-3">
                    {TRAVEL_STYLES.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => selectOption('travelStyle', style)}
                        className={`option-btn ${
                          form.travelStyle === style ? 'option-selected' : 'option-unselected'
                        }`}
                      >
                        <span className="block mb-1 text-2xl">{STYLE_EMOJIS[style]}</span>
                        <span>{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <label className="form-label">🚗 Transportation Preference</label>
                  <div className="options-grid-2">
                    {TRANSPORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectOption('transportation', opt)}
                        className={`option-btn-left ${
                          form.transportation === opt ? 'option-selected' : 'option-unselected'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <label className="form-label">🍽️ Food Preferences</label>
                  <div className="options-grid-2">
                    {FOOD_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectOption('foodPreferences', opt)}
                        className={`option-btn-left ${
                          form.foodPreferences === opt ? 'option-selected' : 'option-unselected'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="create-trip-submit-wrapper">
              <button type="submit" id="create-trip-submit" className="submit-btn group">
                <span className="submit-btn-glow"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  ✨ Generate My Travel Plan
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
