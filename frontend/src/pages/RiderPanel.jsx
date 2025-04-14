import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RiderPanel = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch assigned orders for the rider
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/rider/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching orders');
    }
  };

  // Handle status update
  const handleStatusUpdate = async (orderId, status) => {
    try {
      await axios.put(
        `/api/rider/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      setSuccess('Order status updated successfully.');
      setError('');
    } catch (err) {
      setError('Error updating order status. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rider Panel</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 px-4 py-2">{order._id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.user?.email || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{order.address}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.status === 'Shipped' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order._id, 'Undelivered')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Mark as Undelivered
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderPanel;