// middleware/auth.js
import admin from 'firebase-admin';
import User from '../models/User.js';
import ApprovedEmail from '../models/ApprovedEmail.js';

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Or use cert from Firebase
});

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;
    const name = decodedToken.name || 'User';

    const approved = await ApprovedEmail.findOne({ email });
    if (!approved) {
      return res.status(403).json({ message: 'Email not approved' });
    }

    // Register user if not exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, role: 'customer' });
      await user.save();
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
