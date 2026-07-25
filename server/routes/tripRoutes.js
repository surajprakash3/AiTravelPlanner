import { Router } from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController.js';
import protect from '../middleware/auth.js';

const router = Router();

// All trip routes are protected
router.use(protect);

router.route('/').get(getTrips).post(createTrip);
router.route('/:id').get(getTripById).put(updateTrip).delete(deleteTrip);

export default router;
