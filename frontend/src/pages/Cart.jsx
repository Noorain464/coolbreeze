import React from 'react';
import { useCart } from '../hooks/Carthook';

const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  // Calculate the total amount
  const totalAmount = cart?.reduce((sum, product) => sum + product.price * product.quantity, 0);

  if (cart.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Size: {product.selectedSize || 'N/A'}</p>
                <p className="text-gray-600">Color: {product.selectedColor || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => decreaseQuantity(product.id)} // Decrease quantity
              >
                -
              </button>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => addToCart(product)} // Increase quantity
              >
                +
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(product.id)} // Remove product
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Total Amount</h2>
        <p className="text-lg">${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;