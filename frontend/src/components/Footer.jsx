import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coolblue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">CoolBreeze</h2>
            <p className="text-gray-300 mb-4">
              Your one-stop shop for premium cooling solutions. We provide top-quality fans and air conditioners for homes and offices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-coolblue-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-coolblue-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-coolblue-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-coolblue-300">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-coolblue-300">All Products</Link>
              </li>
              <li>
                <Link to="/products/fan" className="hover:text-coolblue-300">Fans</Link>
              </li>
              <li>
                <Link to="/products/ac" className="hover:text-coolblue-300">Air Conditioners</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/fan" className="hover:text-coolblue-300">Pedestal Fans</Link>
              </li>
              <li>
                <Link to="/products/fan" className="hover:text-coolblue-300">Ceiling Fans</Link>
              </li>
              <li>
                <Link to="/products/fan" className="hover:text-coolblue-300">Tower Fans</Link>
              </li>
              <li>
                <Link to="/products/ac" className="hover:text-coolblue-300">Split ACs</Link>
              </li>
              <li>
                <Link to="/products/ac" className="hover:text-coolblue-300">Window ACs</Link>
              </li>
              <li>
                <Link to="/products/ac" className="hover:text-coolblue-300">Portable ACs</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <p>123 Cooling Street, Breezy City, BC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneCall size={20} />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} />
                <p>support@coolbreeze.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} CoolBreeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
