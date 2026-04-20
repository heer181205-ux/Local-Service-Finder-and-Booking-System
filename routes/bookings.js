import express from 'express';
import { 
  createBooking, 
  updateBookingStatus, 
  getMyBookings, 
  getBookingById 
} from '../controllers/bookingController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Create booking
router.post('/', createBooking);

// Get user's bookings
router.get('/my-bookings', getMyBookings);

// Get single booking
router.get('/:id', getBookingById);

// Update booking status
router.patch('/:id/status', updateBookingStatus);

export default router;
