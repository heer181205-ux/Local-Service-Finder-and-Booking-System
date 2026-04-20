import express from 'express';
import { searchServices, getAllServices } from '../controllers/serviceController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/search', searchServices);
router.get('/all', getAllServices);

export default router;
