import React from 'react';
import { Fan, Snowflake, CircleDollarSign, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&q=80"
          alt="Modern living room with AC"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">Stay Cool & Comfortable</h1>
              <p className="text-xl mb-8">Discover our premium collection of fans and air conditioners for your home and office</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Fan className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Energy Efficient</h3>
          <p className="text-gray-600">Save money with our energy-efficient appliances</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Snowflake className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Smart Cooling</h3>
          <p className="text-gray-600">Advanced cooling technology for optimal comfort</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <CircleDollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
          <p className="text-gray-600">Competitive prices with no compromise on quality</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400`}
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Premium AC Unit</h3>
                <p className="text-gray-600 mb-4">High-efficiency split AC with smart features</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">$599</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;