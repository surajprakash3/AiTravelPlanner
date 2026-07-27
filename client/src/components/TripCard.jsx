import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './TripCard.css';

const BUDGET_COLORS = {
  Budget: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
  'Mid-Range': 'text-amber-400 bg-amber-500/20 border-amber-500/30',
  Luxury: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
};

const IMAGES = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format,compress&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format,compress&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format,compress&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format,compress&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format,compress&q=80',
];

const TripCard = memo(function TripCard({ trip }) {
  const budgetClass = BUDGET_COLORS[trip.budget] || 'text-surface-300 bg-surface-700 border-surface-600';
  const createdDate = new Date(trip.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Pick a deterministic image based on destination length
  const imgIndex = (trip.destination?.length || 0) % IMAGES.length;
  const image = IMAGES[imgIndex];

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Link
        to={`/trip/${trip._id}`}
        id={`trip-card-${trip._id}`}
        className="trip-card-link group"
      >
        {/* Image Header */}
        <div className="trip-card-image-wrapper">
          <div className="trip-card-image-skeleton"></div>
          <img
            src={image}
            alt={trip.destination}
            className="trip-card-image"
            loading="lazy"
          />
          <div className="trip-card-image-gradient"></div>

          {/* Badges overlaid on image */}
          <div className="trip-card-badges">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border ${budgetClass}`}>
              {trip.budget}
            </span>
          </div>

          <div className="trip-card-destination">
            <h3 className="trip-card-destination-title">{trip.destination}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="trip-card-body">
          <p className="trip-card-description">
            {trip.title || `${trip.numberOfDays}-day ${trip.travelStyle} trip`}
          </p>

          {/* Meta tags */}
          <div className="trip-card-meta">
            <span className="trip-card-meta-tag">
              <Calendar className="trip-card-meta-icon-blue" />
              {trip.numberOfDays} {trip.numberOfDays === 1 ? 'day' : 'days'}
            </span>
            <span className="trip-card-meta-tag">
              <Compass className="trip-card-meta-icon-green" />
              {trip.travelStyle}
            </span>
          </div>

          {/* Footer */}
          <div className="trip-card-footer">
            <span className="trip-card-date">{createdDate}</span>
            <span className="trip-card-view-link">
              View Itinerary <ArrowRight className="trip-card-arrow-icon" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default TripCard;
