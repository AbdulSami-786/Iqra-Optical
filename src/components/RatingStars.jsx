import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = React.memo(function RatingStars({ rating = 0, size = 14, showValue = true, reviews }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= rounded ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>}
      {typeof reviews === 'number' && (
        <span className="text-xs text-gray-400">({reviews})</span>
      )}
    </div>
  );
});

export default RatingStars;
