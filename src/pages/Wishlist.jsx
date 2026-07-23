import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-6">
          <Heart size={32} className="text-gold" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">Your Wishlist is Empty</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Save your favorite frames here so you never lose track of them.
        </p>
        <Link to="/products" className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <h1 className="text-3xl font-serif font-semibold text-ink mb-2">My Wishlist</h1>
      <p className="text-sm text-gray-500 mb-8">{wishlistItems.length} saved item{wishlistItems.length > 1 ? 's' : ''}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {wishlistItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
