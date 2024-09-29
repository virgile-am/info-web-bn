import express from 'express';
import { trackVisit, getVisitorStats, getVisitLogs } from '../controllers/visitorController.js'; // Corrected named imports
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();
router.use(trackVisit);
router.get('/stats', protect, admin, getVisitorStats);
router.get('/logs', protect, admin, getVisitLogs);

export default router;
