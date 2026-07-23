import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isWishlisted = useCallback(
    (id) => wishlistItems.some((item) => String(item.id) === String(id)),
    [wishlistItems]
  );

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) return prev.filter((item) => String(item.id) !== String(product.id));
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
