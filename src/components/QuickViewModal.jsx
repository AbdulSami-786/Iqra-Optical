import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl relative"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="aspect-square bg-sand">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
              <h2 className="text-2xl font-serif font-semibold text-ink">{product.name}</h2>
              {typeof product.reviews === 'number' && (
                <span className="text-[11px] text-gray-400">{product.reviews} reviews</span>
              )}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{product.description}</p>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-ink">Rs. {product.price.toLocaleString()}</span>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-xl hover:bg-black transition-colors"
                >
                  <ShoppingBag size={15} /> Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center border border-ink text-ink text-xs font-semibold uppercase tracking-wider py-3 rounded-xl hover:bg-ink hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
