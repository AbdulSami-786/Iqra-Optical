import React from 'react';
import { Link } from 'react-router-dom';
import { Glasses } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
    <Glasses size={56} className="text-gold mb-6" strokeWidth={1.2} />
    <h1 className="text-6xl font-serif font-semibold text-ink mb-3">404</h1>
    <p className="text-lg text-gray-600 mb-2">Page Not Found</p>
    <p className="text-sm text-gray-500 mb-8 max-w-sm">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <Link
      to="/"
      className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
