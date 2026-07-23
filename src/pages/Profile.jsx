import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem('iqra_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('iqra_user');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <User size={48} className="text-gold mb-6" strokeWidth={1.2} />
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">You're Not Signed In</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">Sign in to view your profile, orders, and saved items.</p>
        <div className="flex gap-3">
          <Link to="/login" className="px-6 py-3 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="px-6 py-3 border border-ink text-ink text-xs font-bold uppercase tracking-wider rounded-full hover:bg-ink hover:text-white transition-colors">
            Register
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: ShoppingBag, label: 'Cart Items', value: cartItems.length, link: '/cart' },
    { icon: Heart, label: 'Wishlist', value: wishlistItems.length, link: '/wishlist' },
    { icon: Package, label: 'Orders', value: 0, link: '/orders' },
  ];

  return (
    <div className="container mx-auto px-4 max-w-4xl py-14">
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 rounded-full bg-ink text-white flex items-center justify-center text-2xl font-serif font-semibold uppercase flex-shrink-0">
          {user.name?.[0] || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-serif font-semibold text-ink capitalize">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="rounded-2xl border border-gray-100 shadow-card p-6 hover:shadow-soft transition-shadow"
          >
            <s.icon size={22} className="text-gold mb-3" strokeWidth={1.5} />
            <p className="text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
      >
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
};

export default Profile;
