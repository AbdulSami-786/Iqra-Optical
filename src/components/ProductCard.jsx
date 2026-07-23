import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = memo(function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const wished = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-soft transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Wishlist & Quick View — always visible, not hover-only, so they work on touch devices */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300"
          >
            <Heart size={16} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300"
          >
            <Eye size={15} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <h3 className="text-sm font-semibold text-ink leading-snug line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-wide">
          <span>{product.shape}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{product.gender}</span>
        </div>
        {typeof product.reviews === 'number' && (
          <span className="text-[11px] text-gray-400">{product.reviews} reviews</span>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-ink">Rs. {product.price.toLocaleString()}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 bg-ink text-white text-[11px] font-semibold uppercase tracking-wider py-2.5 rounded-xl hover:bg-black transition-colors"
          >
            <ShoppingBag size={13} /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-1.5 border border-ink text-ink text-[11px] font-semibold uppercase tracking-wider py-2.5 rounded-xl hover:bg-ink hover:text-white transition-colors duration-300"
          >
            <Zap size={13} /> Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
