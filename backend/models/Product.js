import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  colorOptions: [String],
  sizeOptions: [String],
});

export default mongoose.model('Product', productSchema);
