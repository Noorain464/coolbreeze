// controllers/riderController.js
import Order from '../models/Order.js';

export const getRiders = async (req, res) => {
  const riderId = req.user.id; // assume token middleware sets this
  const orders = await Order.find({ assignedRider: riderId }).populate('products.productId');
  res.json(orders);
};

export const createRider = async (req, res) => {
  const { products, customerDetails } = req.body;

  if (!products || !customerDetails) {
    return res.status(400).json({ message: 'Products and customer details are required' });
  }

  const order = new Order({
    products,
    customerDetails,
    assignedRider: req.user.id,
    status: 'pending',
  });

  await order.save();
  res.status(201).json(order);
}
export const updateRiderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order || order.assignedRider.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  order.status = status;
  await order.save();
  res.json(order);
};
