/**
 * Visual budget breakdown component with colored bars.
 * Used as a standalone widget (e.g. on the dashboard summary).
 */
import './BudgetBreakdown.css';

export default function BudgetBreakdown({ data }) {
  if (!data) return null;

  const items = [
    { label: 'Accommodation', value: data.accommodation, color: 'bg-blue-500' },
    { label: 'Food', value: data.food, color: 'bg-amber-500' },
    { label: 'Transport', value: data.transportation, color: 'bg-emerald-500' },
    { label: 'Activities', value: data.activities, color: 'bg-purple-500' },
    { label: 'Misc', value: data.miscellaneous, color: 'bg-rose-500' },
  ];

  return (
    <div className="budget-breakdown">
      <div className="budget-breakdown-header">
        <span className="budget-breakdown-total-label">Total</span>
        <span className="budget-breakdown-total-value">{data.totalEstimate}</span>
      </div>

      {/* Color bar */}
      <div className="budget-breakdown-bar">
        {items.map((item, i) => (
          <div
            key={i}
            className={`budget-breakdown-bar-segment ${item.color}`}
            style={{ flex: 1 }}
            title={`${item.label}: ${item.value}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="budget-breakdown-legend">
        {items.map((item, i) => (
          <div key={i} className="budget-breakdown-legend-item">
            <span className={`budget-breakdown-legend-dot ${item.color}`}></span>
            <span className="budget-breakdown-legend-text">
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
