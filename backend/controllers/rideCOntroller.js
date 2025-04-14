// controllers/riderController.js
import Order from '../models/Order.js';

export const getRiderOrders = async (req, res) => {
  const riderId = req.user.id; // assume token middleware sets this
  const orders = await Order.find({ assignedRider: riderId }).populate('products.productId');
  res.json(orders);
};

export const updateRiderOrderStatus = async (req, res) => {
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
