import { useState } from 'react';
import './ItineraryView.css';

/**
 * Renders the full AI-generated itinerary in a structured, beautiful layout.
 * Includes day-by-day schedule, attractions, hotels, restaurants, packing, weather, safety, and transport.
 */
export default function ItineraryView({ itinerary }) {
  const [activeTab, setActiveTab] = useState('schedule');

  if (!itinerary) {
    return (
      <div className="itinerary-empty">
        <div className="itinerary-empty-icon">🗺️</div>
        <h3 className="itinerary-empty-title">No Itinerary Available</h3>
        <p className="itinerary-empty-desc">Please generate a new trip to see the details here.</p>
      </div>
    );
  }

  const tabs = [
    { key: 'schedule', label: 'Schedule', icon: '📅' },
    { key: 'attractions', label: 'Attractions', icon: '🏛️' },
    { key: 'hotels', label: 'Hotels', icon: '🏨' },
    { key: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    { key: 'budget', label: 'Budget', icon: '💰' },
    { key: 'packing', label: 'Packing', icon: '🎒' },
    { key: 'info', label: 'Info', icon: 'ℹ️' },
  ];

  return (
    <div className="itinerary-wrapper">
      {/* Tab Navigation */}
      <div className="tab-scroll-wrapper">
        <div className="tab-group">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              id={`tab-${tab.key}`}
              className={activeTab === tab.key ? 'tab-btn-active' : 'tab-btn-inactive'}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="tab-content-area">
        {activeTab === 'schedule' && <DaySchedule days={itinerary.dailySchedule || []} />}
        {activeTab === 'attractions' && <Attractions data={itinerary.attractions || []} />}
        {activeTab === 'hotels' && <Hotels data={itinerary.hotels || []} />}
        {activeTab === 'restaurants' && <Restaurants data={itinerary.restaurants || []} />}
        {activeTab === 'budget' && <BudgetSection data={itinerary.budgetBreakdown} />}
        {activeTab === 'packing' && <PackingChecklist data={itinerary.packingChecklist || []} />}
        {activeTab === 'info' && (
          <TravelInfo
            weather={itinerary.weatherAdvice}
            safety={itinerary.safetyTips || []}
            transport={itinerary.localTransportation}
          />
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* Sub-components                                                            */
/* ========================================================================= */

function DaySchedule({ days }) {
  if (!days.length) return <EmptyState icon="📅" text="No schedule data available for this trip." />;

  return (
    <div className="schedule-container">
      {days.map((day, idx) => (
        <div key={idx} className="day-wrapper">
          {/* Day Header */}
          <div className="day-header">
            <div className="day-number-badge">
              <span className="day-label">Day</span>
              <span className="day-number">{day.day || idx + 1}</span>
            </div>
            <div>
              <h3 className="day-theme">{day.theme || `Day ${day.day || idx + 1}`}</h3>
            </div>
          </div>

          {/* Timeline connecting line */}
          <div className="day-timeline-line" />

          {/* Timeline Events */}
          <div className="day-events">
            {['morning', 'afternoon', 'evening'].map((period) => {
              const data = day[period];
              if (!data) return null;

              const periodConfig = {
                morning: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', icon: '🌅', cardBorderClass: 'event-card-border-amber' },
                afternoon: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: '☀️', cardBorderClass: 'event-card-border-blue' },
                evening: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', icon: '🌙', cardBorderClass: 'event-card-border-purple' },
              };
              const style = periodConfig[period];

              return (
                <div key={period} className="event-wrapper group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[3.7rem] top-6 w-4 h-4 rounded-full border-4 border-surface-950 ${style.bg} ${style.color} hidden sm:block transition-transform group-hover:scale-125`} />

                  {/* Event Card */}
                  <div className={`event-card ${style.cardBorderClass}`}>
                    <div className="event-header">
                      <span className={`event-period-badge ${style.bg} ${style.color}`}>
                        <span className="text-sm">{style.icon}</span> {period}
                      </span>
                      {data.estimatedTime && (
                        <span className="event-time-badge">⏳ {data.estimatedTime}</span>
                      )}
                    </div>

                    <h4 className="event-title">{data.activity}</h4>
                    <p className="event-desc">{data.description}</p>

                    {data.location && (
                      <div className="event-location">
                        <span className="text-base">📍</span> {data.location}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Attractions({ data }) {
  if (!data.length) return <EmptyState icon="🏛️" text="No attractions listed for this trip." />;
  return (
    <div className="cards-grid">
      {data.map((a, i) => (
        <div key={i} className="attraction-card group">
          <div className="mb-4">
            <h4 className="attraction-card-title">{a.name}</h4>
          </div>
          <p className="attraction-card-desc">{a.description}</p>
          <div className="attraction-card-footer">
            {a.estimatedDuration && (
              <span className="attraction-duration-badge">⏱️ {a.estimatedDuration}</span>
            )}
            {a.entryFee && (
              <span className="attraction-fee-badge">🎟️ {a.entryFee}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Hotels({ data }) {
  if (!data.length) return <EmptyState icon="🏨" text="No hotel suggestions provided." />;
  const catStyles = {
    Budget: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    'Mid-Range': { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    Luxury: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  };
  return (
    <div className="cards-grid">
      {data.map((h, i) => {
        const style = catStyles[h.category] || { border: 'border-surface-600/50', bg: 'bg-surface-600/20', text: 'text-surface-300' };
        return (
          <div key={i} className={`hotel-card border-t-4 ${style.border}`}>
            <div className="hotel-card-header">
              <h4 className="hotel-card-name">{h.name}</h4>
              <span className="hotel-card-price">{h.pricePerNight}</span>
            </div>
            <div className="hotel-card-category-wrapper">
              <span className={`hotel-card-category-badge ${style.bg} ${style.text}`}>
                {h.category}
              </span>
            </div>
            <p className="hotel-card-desc">{h.description}</p>
            {h.location && (
              <div className="hotel-card-location">
                <span>📍</span> {h.location}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Restaurants({ data }) {
  if (!data.length) return <EmptyState icon="🍽️" text="No restaurant recommendations found." />;
  return (
    <div className="cards-grid">
      {data.map((r, i) => (
        <div key={i} className="restaurant-card">
          <h4 className="restaurant-card-name">{r.name}</h4>
          <div className="restaurant-card-badges">
            {r.cuisine && (
              <span className="restaurant-cuisine-badge">🌮 {r.cuisine}</span>
            )}
            {r.priceRange && (
              <span className="restaurant-price-badge">💵 {r.priceRange}</span>
            )}
          </div>
          <p className="restaurant-card-desc">{r.description}</p>
          {r.recommendedDish && (
            <div className="restaurant-must-try">
              <p className="restaurant-must-try-text">
                <span className="text-lg">✨</span> Must try: <span className="text-white">{r.recommendedDish}</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BudgetSection({ data }) {
  if (!data) return <EmptyState icon="💰" text="No budget breakdown available." />;

  const items = [
    { label: 'Accommodation', value: data.accommodation, color: 'bg-blue-500', icon: '🏨' },
    { label: 'Food & Dining', value: data.food, color: 'bg-amber-500', icon: '🍽️' },
    { label: 'Transportation', value: data.transportation, color: 'bg-emerald-500', icon: '🚗' },
    { label: 'Activities', value: data.activities, color: 'bg-purple-500', icon: '🎭' },
    { label: 'Miscellaneous', value: data.miscellaneous, color: 'bg-rose-500', icon: '🛍️' },
  ];

  return (
    <div className="budget-section-outer">
      <div className="budget-section-card">
        {/* Decorative background element */}
        <div className="budget-section-glow" />

        {/* Total Estimate */}
        <div className="budget-section-total">
          <p className="budget-section-total-label">Estimated Total Budget</p>
          <div className="inline-block relative">
            <span className="budget-section-total-value">{data.totalEstimate}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="budget-section-items">
          {items.map((item, i) => (
            <div key={i} className="budget-item group">
              <div className="budget-item-icon">{item.icon}</div>
              <div className="budget-item-info">
                <div className="budget-item-label-row">
                  <span className="budget-item-label">{item.label}</span>
                  <span className="budget-item-value">{item.value}</span>
                </div>
                <div className="budget-item-bar-track">
                  <div className={`budget-item-bar ${item.color}`} style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackingChecklist({ data }) {
  const [checked, setChecked] = useState({});
  if (!data.length) return <EmptyState icon="🎒" text="No packing checklist provided." />;

  const toggle = (idx) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const packedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((packedCount / data.length) * 100) || 0;

  return (
    <div className="packing-card">
      <div className="packing-header">
        <div className="packing-title-group">
          <h4 className="packing-title">Packing Checklist</h4>
          <p className="packing-subtitle">Don't forget the essentials for your trip.</p>
        </div>
        <div className="packing-progress-wrapper">
          <div className="packing-progress-circle">
            <svg className="packing-progress-svg" viewBox="0 0 36 36">
              <path
                className="text-emerald-500"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <span className="packing-progress-percent">{progress}%</span>
          </div>
          <div>
            <p className="packing-progress-count">{packedCount} of {data.length}</p>
            <p className="packing-progress-label">Items Packed</p>
          </div>
        </div>
      </div>

      <div className="packing-grid">
        {data.map((item, i) => {
          const isChecked = !!checked[i];
          return (
            <label
              key={i}
              onClick={() => toggle(i)}
              className={isChecked ? 'packing-item-checked' : 'packing-item-unchecked'}
            >
              <div className={isChecked ? 'packing-checkbox-checked' : 'packing-checkbox-unchecked'}>
                {isChecked && (
                  <svg className="packing-check-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={isChecked ? 'packing-item-text-checked' : 'packing-item-text-unchecked'}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function TravelInfo({ weather, safety, transport }) {
  return (
    <div className="travel-info-grid">
      {/* Weather */}
      {weather && (
        <div className="weather-card">
          <div className="weather-bg-icon">🌤️</div>
          <h4 className="weather-title">Weather Forecast & Advice</h4>
          <p className="weather-desc">{weather}</p>
        </div>
      )}

      {/* Safety */}
      {safety && safety.length > 0 && (
        <div className="safety-card">
          <h4 className="safety-title">
            <span className="safety-title-icon">🛡️</span> Safety Tips
          </h4>
          <ul className="safety-list">
            {safety.map((tip, i) => (
              <li key={i} className="safety-list-item">
                <span className="safety-number">{i + 1}</span>
                <span className="safety-text">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transportation */}
      {transport && (
        <div className="transport-card">
          <h4 className="transport-title">
            <span className="transport-title-icon">🚌</span> Getting Around
          </h4>
          {transport.overview && (
            <p className="transport-overview">{transport.overview}</p>
          )}
          {transport.options && transport.options.length > 0 && (
            <div className="transport-options-list">
              {transport.options.map((opt, i) => (
                <div key={i} className="transport-option-item">
                  <div>
                    <h5 className="transport-option-name">{opt.mode}</h5>
                    <p className="transport-option-desc">{opt.description}</p>
                  </div>
                  {opt.cost && (
                    <span className="transport-option-cost">{opt.cost}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <p className="empty-state-text">{text}</p>
    </div>
  );
}
