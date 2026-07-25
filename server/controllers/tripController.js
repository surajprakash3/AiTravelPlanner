import Trip from '../models/Trip.js';
import { generateItinerary } from '../services/geminiService.js';

// ---------------------------------------------------------------------------
// POST /api/trips   — Create a new trip (calls Gemini AI)
// ---------------------------------------------------------------------------
export const createTrip = async (req, res, next) => {
  try {
    const { destination, numberOfDays, budget, travelStyle, transportation, foodPreferences } =
      req.body;

    // Validate required fields
    if (!destination || !numberOfDays || !budget || !travelStyle || !transportation || !foodPreferences) {
      return res.status(400).json({ message: 'All travel preference fields are required' });
    }

    // Generate AI itinerary
    const itinerary = await generateItinerary({
      destination,
      numberOfDays,
      budget,
      travelStyle,
      transportation,
      foodPreferences,
    });

    // Create and save trip
    const trip = await Trip.create({
      user: req.user.id,
      destination,
      numberOfDays,
      budget,
      travelStyle,
      transportation,
      foodPreferences,
      title: itinerary.title || `Trip to ${destination}`,
      itinerary,
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// GET /api/trips   — Get all trips for authenticated user
// Supports ?search=<query> for filtering by destination/title
// ---------------------------------------------------------------------------
export const getTrips = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = { user: req.user.id };

    if (search) {
      filter.$or = [
        { destination: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const trips = await Trip.find(filter).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// GET /api/trips/:id   — Get a single trip (ownership verified)
// ---------------------------------------------------------------------------
export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// PUT /api/trips/:id   — Update trip preferences & optionally regenerate
// ---------------------------------------------------------------------------
export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const { destination, numberOfDays, budget, travelStyle, transportation, foodPreferences, regenerate } =
      req.body;

    // Update fields if provided
    if (destination) trip.destination = destination;
    if (numberOfDays) trip.numberOfDays = numberOfDays;
    if (budget) trip.budget = budget;
    if (travelStyle) trip.travelStyle = travelStyle;
    if (transportation) trip.transportation = transportation;
    if (foodPreferences) trip.foodPreferences = foodPreferences;

    // Regenerate itinerary if requested
    if (regenerate) {
      const itinerary = await generateItinerary({
        destination: trip.destination,
        numberOfDays: trip.numberOfDays,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        transportation: trip.transportation,
        foodPreferences: trip.foodPreferences,
      });
      trip.itinerary = itinerary;
      trip.title = itinerary.title || trip.title;
    }

    await trip.save();
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// DELETE /api/trips/:id   — Delete a trip (ownership verified)
// ---------------------------------------------------------------------------
export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};
