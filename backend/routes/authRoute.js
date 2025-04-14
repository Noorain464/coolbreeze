// routes/authRoutes.js
import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';

const router = express.Router();

// This route just confirms the user is authenticated and approved
router.get('/google-login', verifyFirebaseToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
