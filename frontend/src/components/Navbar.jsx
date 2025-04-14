import React from 'react';
import { Link } from 'react-router-dom';
import { Fan, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../hooks/Carthook.jsx'; // Import the custom hook for cart functionality

const Navbar = () => {
  const { cart } = useCart(); // Access the cart state

  // Safely calculate the total number of items in the cart
  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Fan className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">CoolBreeze</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/account">
              <User className="h-6 w-6 text-gray-600 hover:text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;