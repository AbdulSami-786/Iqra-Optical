import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Menu, X, ShoppingBag, Search, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100]">
      <div className="bg-black text-white text-[10px] py-2 text-center tracking-[0.3em] uppercase font-bold">
        Free Shipping on orders over Rs. 5000
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="inline-block group">
              <h1 className="text-2xl md:text-4xl font-serif tracking-[0.1em] font-bold text-black uppercase leading-none">
                Zareen
                <span className="block text-[8px] md:text-[10px] tracking-[0.6em] font-light mt-1 text-gray-500 group-hover:text-black transition-colors uppercase">
                  Fragrance
                </span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.25em] font-bold uppercase text-gray-600">
            <Link to="/" className="hover:text-black border-b border-transparent hover:border-black transition-all pb-1">Home</Link>
            <Link to="/products" className="hover:text-black border-b border-transparent hover:border-black transition-all pb-1">Products</Link>
            <Link to="/about" className="hover:text-black border-b border-transparent hover:border-black transition-all pb-1">About Us</Link>
            <Link to="/contact" className="hover:text-black border-b border-transparent hover:border-black transition-all pb-1">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-800 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button className="hover:text-gray-500 transition">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/cart" onClick={closeMenu} className="relative group">
              <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:text-gray-500 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] bg-black text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-6 text-sm tracking-[0.3em] font-bold uppercase text-gray-800">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/products" onClick={closeMenu}>Products</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

/* --- NEW FOOTER COMPONENT --- */
const Footer = () => {
  return (
    <footer className="bg-[#f8f8f6] border-t border-gray-200 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold uppercase tracking-tighter">Zareen</h3>
            <p className="text-xs text-gray-500 leading-relaxed tracking-wider uppercase">
              Premium inspired fragrances crafted with the highest quality ingredients to last all day.
            </p>
            <div className="flex space-x-4">
              <FaFacebook size={18} className="text-gray-400 hover:text-black cursor-pointer" />
              <FaInstagram size={18} className="text-gray-400 hover:text-black cursor-pointer" />
              <FaTwitter size={18} className="text-gray-400 hover:text-black cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6">Information</h4>
            <ul className="text-[10px] space-y-3 uppercase tracking-widest text-gray-500">
              <li><Link to="/about" className="hover:text-black">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
              <li className="hover:text-black cursor-pointer">Shipping Policy</li>
              <li className="hover:text-black cursor-pointer">Refund Policy</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6">Newsletter</h4>
            <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest">Subscribe to receive updates and access to exclusive deals.</p>
            <div className="flex border-b border-black py-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent text-[10px] uppercase tracking-widest outline-none w-full"
              />
              <button className="text-gray-400 hover:text-black">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6">Get in Touch</h4>
            <div className="text-[10px] text-gray-500 space-y-3 uppercase tracking-widest leading-loose">
              <p>Karachi, Pakistan</p>
              <p>WhatsApp: +92 371 1191925</p>
              <p>Email: zareenfragrances@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">
            © 2026 Zareen Fragrance. All Rights Reserved.
          </p>
          <div className="flex space-x-2 grayscale opacity-50">
            {/* Simple placeholder icons for payment methods */}
            <div className="h-4 w-6 bg-gray-400 rounded-sm"></div>
            <div className="h-4 w-6 bg-gray-400 rounded-sm"></div>
            <div className="h-4 w-6 bg-gray-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer /> {/* Added Footer here */}
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;