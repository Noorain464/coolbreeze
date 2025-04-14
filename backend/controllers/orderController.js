// controllers/orderController.js
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('products.productId').populate('assignedRider');
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, riderId } = req.body;

  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  if (riderId) order.assignedRider = riderId;

  await order.save();
  res.json(order);
};
