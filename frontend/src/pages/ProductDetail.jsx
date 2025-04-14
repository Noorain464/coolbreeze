import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/Carthook';

const ProductDetailPage = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size
  const [selectedColor, setSelectedColor] = useState(''); // State for selected color

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`); // Fetch product by ID
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color before adding to cart.');
      return;
    }

    // Add product with selected size and color to the cart
    addToCart({ ...product, selectedSize, selectedColor });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg mb-2">Price: <span className="font-semibold">${product.price}</span></p>
      <p className="text-gray-700 mb-4">{product.description}</p>

      {/* Size Selector */}
      <div className="mb-4">
        <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Select Size:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">-- Select Size --</option>
          {product.sizes?.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Color Selector */}
      <div className="mb-4">
        <label htmlFor="color" className="block text-gray-700 font-medium mb-2">Select Color:</label>
        <select
          id="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">-- Select Color --</option>
          {product.colors?.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;