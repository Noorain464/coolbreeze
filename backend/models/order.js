// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      size: String,
      color: String,
    },
  ],
  status: { type: String, enum: ['Paid', 'Shipped', 'Delivered', 'Undelivered'], default: 'Paid' },
  address: String,
  assignedRider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
});

export default mongoose.model('Order', orderSchema);
