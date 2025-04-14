import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrdersAndRiders = async () => {
      try {
        const ordersResponse = await axios.get('/api/admin/orders');
        const ridersResponse = await axios.get('/api/admin/riders');
        setOrders(ordersResponse.data);
        setRiders(ridersResponse.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchOrdersAndRiders();
  }, []);

  const handleStatusChange = async (orderId, status, riderId) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { status, riderId });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status, assignedRider: riderId } : order
        )
      );
    } catch (err) {
      setError('Error updating order');
    }
  };

  return (
    <div>
      <h1>Admin Orders</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Assigned Rider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.status}</td>
              <td>{order.assignedRider?.name || 'None'}</td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(order._id, e.target.value, order.assignedRider?._id)}
                  value={order.status}
                >
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                </select>
                {order.status === 'Shipped' && (
                  <select
                    onChange={(e) => handleStatusChange(order._id, 'Shipped', e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign Rider
                    </option>
                    {riders.map((rider) => (
                      <option key={rider._id} value={rider._id}>
                        {rider.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;