// models/Rider.js
import mongoose from 'mongoose';

const riderSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});

export default mongoose.model('Rider', riderSchema);
