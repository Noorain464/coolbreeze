import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import ApprovedEmail from '../models/ApprovedEmail.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const allowedRoles = ['customer', 'admin', 'rider'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Add the email to the ApprovedEmail collection
    const approvedEmail = new ApprovedEmail({ email, createdAt: new Date() });
    await approvedEmail.save();

    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error in /signup:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.post('/google-login', verifyFirebaseToken, async (req, res) => {
  try {
    const { email } = req.user; // Extract email from the verified token
    console.log('Google login request received for email:', email);

    // Check if the email is approved
    const approvedEmail = await ApprovedEmail.findOne({ email });
    if (!approvedEmail) {
      console.log('Email not approved:', email);
      return res.status(403).json({ message: 'Email is not approved for login' });
    }

    // Fetch the user from the database
    let user = await User.findOne({ email });

    // If the user does not exist, create a new user with a default role
    if (!user) {
      user = new User({ email, role: 'customer' }); // Default role is 'customer'
      await user.save();
    }

    console.log('User logged in successfully:', user);
    // Respond with the user's role
    res.json({ role: user.role });
  } catch (err) {
    console.error('Error in /google-login:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

export default router;