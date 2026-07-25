import mongoose from 'mongoose';

/**
 * Trip Schema
 * Stores travel preferences and the AI-generated itinerary.
 */
const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: '',
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    numberOfDays: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [1, 'Trip must be at least 1 day'],
      max: [30, 'Trip cannot exceed 30 days'],
    },
    budget: {
      type: String,
      required: [true, 'Budget tier is required'],
      enum: ['Budget', 'Mid-Range', 'Luxury'],
    },
    travelStyle: {
      type: String,
      required: [true, 'Travel style is required'],
      enum: ['Adventure', 'Relaxation', 'Cultural', 'Family', 'Solo', 'Romantic'],
    },
    transportation: {
      type: String,
      required: [true, 'Transportation preference is required'],
      trim: true,
    },
    foodPreferences: {
      type: String,
      required: [true, 'Food preference is required'],
      trim: true,
    },
    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

// Text index for search functionality
tripSchema.index({ destination: 'text', title: 'text' });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
