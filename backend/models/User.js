// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['customer', 'admin', 'rider'], default: 'customer' },
});

export default mongoose.model('User', userSchema);
