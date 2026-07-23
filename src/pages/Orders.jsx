import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const Orders = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-6">
        <Package size={32} className="text-gold" strokeWidth={1.5} />
      </div>
      <h1 className="text-2xl font-serif font-semibold text-ink mb-2">No Orders Yet</h1>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        Your order history will appear here once you place your first order.
      </p>
      <Link
        to="/products"
        className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default Orders;
