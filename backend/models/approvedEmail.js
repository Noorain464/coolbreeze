// models/ApprovedEmail.js
import mongoose from 'mongoose';

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, unique: true },
});

export default mongoose.model('ApprovedEmail', approvedEmailSchema);
