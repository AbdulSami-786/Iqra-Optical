import React from 'react';

const ProductCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card">
    <div className="shimmer aspect-square w-full" />
    <div className="p-4 space-y-3">
      <div className="shimmer h-3 w-1/3 rounded" />
      <div className="shimmer h-4 w-4/5 rounded" />
      <div className="shimmer h-3 w-2/3 rounded" />
      <div className="shimmer h-5 w-1/2 rounded" />
    </div>
  </div>
);

export default ProductCardSkeleton;
