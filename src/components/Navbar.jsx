import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { searchProducts } from '../data/products';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const closeMenu = () => setIsMenuOpen(false);

  const results = query.trim() ? searchProducts(query).slice(0, 5) : [];

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <nav style={{background: '#f6f6f4'}} className=" backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100">
      <div className="bg-ink text-white text-[10px] py-2 text-center tracking-[0.3em] uppercase font-semibold">
        Free Shipping on orders over Rs. 5000
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 md:py-3">
          <Link to="/" onClick={closeMenu} className="inline-block hover:opacity-80 transition-opacity">
            <img
              src="/logo.jpeg"
              alt="Iqra Optics Logo"
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-[12px] tracking-[0.2em] font-semibold uppercase text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative group py-2 hover:text-black transition-colors duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-5">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden text-gray-700 hover:text-black transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.8} />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-3 w-[85vw] max-w-sm bg-white rounded-2xl shadow-soft border border-gray-100 p-3 z-50 animate-fadeIn">
                  <form onSubmit={submitSearch} className="flex items-center gap-2 border-b border-gray-200 pb-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, brand, shape..."
                      className="w-full outline-none text-sm placeholder:text-gray-400"
                    />
                  </form>
                  {results.length > 0 && (
                    <div className="mt-2 max-h-72 overflow-y-auto divide-y divide-gray-50">
                      {results.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery('');
                          }}
                          className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-1"
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-sand" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink truncate">{p.name}</p>
                            <p className="text-[11px] text-gray-500">Rs. {p.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {query.trim() && (
                    <button
                      onClick={submitSearch}
                      className="mt-2 w-full text-center text-[11px] font-semibold uppercase tracking-wider text-gold hover:text-ink py-1.5"
                    >
                      View all results
                    </button>
                  )}
                </div>
              )}
            </div>

      

          

            <Link to="/cart" onClick={closeMenu} className="relative group">
              <ShoppingBag size={20} strokeWidth={1.8} className="text-gray-700 group-hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out z-50 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-5 text-sm tracking-[0.15em] font-semibold uppercase text-gray-800">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={closeMenu} className="hover:text-gray-500 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Wishlist</Link>
          <Link to="/profile" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
