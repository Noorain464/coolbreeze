import admin from 'firebase-admin';
import User from '../models/User.js';
import ApprovedEmail from '../models/ApprovedEmail.js';
import serviceAccount from '../config/cool-breeze-d0e22-firebase-adminsdk-fbsvc-195e07f7e9.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Authorization header missing or invalid:', authHeader);
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Token:', decodedToken); // Log the decoded token
    req.user = {
      email: decodedToken.email,
    };
    next();
  } catch (err) {
    console.error('Error verifying Firebase token:', err.message);
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
export const isRider = (req, res, next) => {
  if (req.user.role !== 'rider') {
    return res.status(403).json({ message: 'Access denied. Riders only.' });
  }
  next();
};