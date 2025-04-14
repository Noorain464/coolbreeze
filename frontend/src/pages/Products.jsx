import React, { useEffect } from 'react';
import { Fan, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }
  if (products.length === 0) {
    return <div className="text-center">No products available</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
            <Snowflake className="h-5 w-5" />
            ACs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
            <Fan className="h-5 w-5" />
            Fans
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`} 
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;