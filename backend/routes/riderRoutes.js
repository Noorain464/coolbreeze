import express from 'express';
import { getRiders, createRider, updateRiderStatus } from '../controllers/riderController.js';
import { verifyFirebaseToken, isRider } from '../middleware/auth.js';

const router = express.Router();

// Route to get all riders (protected route)
router.get('/', verifyFirebaseToken, isRider, getRiders);

// Route to create a new rider (protected route)
router.post('/', verifyFirebaseToken, isRider, createRider);

// Route to update rider status (protected route)
router.put('/:id', verifyFirebaseToken, isRider, updateRiderStatus);

export default router;