// pages/Product.jsx
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Math function to calculate discount
const applyDiscount = (originalPrice) => {
  // If discountPrice exists in data, use that, otherwise calculate
  if (originalPrice.discountPrice) {
    return parseInt(originalPrice.discountPrice);
  }
  // Parse string price to number
  const price = typeof originalPrice === 'string' ? parseInt(originalPrice) : originalPrice;
  const discountRate = 0.10; // 10% discount
  const discountedPrice = price - (price * discountRate);
  return Math.round(discountedPrice);
};

const Product = () => {
  const { addToCart, cartItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [addedToCart, setAddedToCart] = useState({});

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseInt(a.discountPrice || a.originalPrice);
    const priceB = parseInt(b.discountPrice || b.originalPrice);
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleAddToCart = (product) => {
    const finalPrice = parseInt(product.discountPrice || product.originalPrice);
    const productWithPrice = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      originalPrice: parseInt(product.originalPrice),
      category: product.category,
      image: product.variants?.[0]?.image || './fallback.jpg'
    };
    addToCart(productWithPrice);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Format price
  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numPrice);
  };

  // Get product image
  const getProductImage = (product) => {
    if (product.variants && product.variants[0] && product.variants[0].image) {
      return product.variants[0].image;
    }
    return './placeholder.jpg';
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Page Header */}
      <div className="py-8 md:py-20 text-center border-b border-gray-100">
        <h1 className="text-2xl md:text-5xl font-serif italic tracking-tight text-black mb-3 md:mb-4">
          All Collections
        </h1>
        <div className="w-16 md:w-24 h-px bg-black mx-auto mb-4 md:mb-6"></div>
        <p className="text-[9px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-bold">
          Signature Scents & Timeless Elegance
        </p>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 border-b border-gray-100 pb-4 md:pb-6 gap-4 md:gap-6">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-bold transition-all pb-1 border-b-2 ${
                  selectedCategory === category
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                {category === 'all' ? 'View All' : category}
              </button>
            ))}
          </div>

          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase pr-8 py-1 md:py-2 focus:outline-none cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="name">Sort: A-Z</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" size={12} />
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 italic font-serif">No fragrances found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-12">
            {sortedProducts.map(product => {
              const quantity = getItemQuantity(product.id);
              const originalPriceNum = parseInt(product.originalPrice);
              const discountedPriceNum = parseInt(product.discountPrice || applyDiscount(product.originalPrice));
              const hasDiscount = product.discount || (product.discountPrice && product.discountPrice < product.originalPrice);
              
              return (
                <div key={product.id} className="group flex flex-col items-center">
                  {/* Product Image Area */}
                  <Link to={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-[#F8F8F8] overflow-hidden mb-4 md:mb-6">
                    <img 
                      src={getProductImage(product)} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {hasDiscount && (
                      <div className="absolute top-0 left-0 bg-black text-white px-2 md:px-3 py-1 md:py-1.5 text-[7px] md:text-[8px] tracking-widest font-bold">
                        {product.discount || '-10% OFF'}
                      </div>
                    )}
                    {quantity > 0 && (
                      <div className="absolute top-0 right-0 bg-black text-white w-5 md:w-6 h-5 md:h-6 flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                        {quantity}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 md:p-4">
                      <button className="w-full bg-white text-black text-[8px] md:text-[10px] font-bold tracking-[0.2em] py-2 md:py-3 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        QUICK VIEW
                      </button>
                    </div>
                  </Link>

                  {/* Product Text Info */}
                  <div className="text-center px-2 flex flex-col items-center flex-grow">
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1 md:mb-2">
                      {product.gender || product.category}
                    </p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xs md:text-base font-serif tracking-wide text-black mb-2 md:mb-3 line-clamp-2 uppercase">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Additional product details */}
                    <div className="flex gap-2 mb-2 text-[8px] md:text-[9px] text-gray-500">
                      {product.shape && <span>{product.shape}</span>}
                      {product.madeInTaiwan && <span>• Made in Taiwan</span>}
                    </div>
                    
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-gray-400 line-through text-[10px] md:text-xs font-light tracking-tighter italic">
                          {formatPrice(originalPriceNum)}
                        </span>
                        <span className="text-sm md:text-base font-bold text-red-600 font-serif">
                          {formatPrice(discountedPriceNum)}
                        </span>
                      </div>
                      <div className="mt-1 md:mt-2">
                        <span className="bg-red-100 text-red-600 text-[7px] md:text-[8px] px-1.5 md:px-2 py-0.5 md:py-1 rounded font-semibold">
                          Save {formatPrice(originalPriceNum - discountedPriceNum)}
                        </span>
                      </div>
                    </div>

                    {/* Color variants preview */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex gap-1 mb-3 justify-center">
                        {product.variants.slice(0, 3).map((variant, idx) => (
                          <div 
                            key={idx}
                            className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: variant.hex === '#ffffff' ? '#f5f5f5' : variant.hex }}
                            title={variant.colorName}
                          />
                        ))}
                        {product.variants.length > 3 && (
                          <span className="text-[6px] md:text-[7px] text-gray-400">+{product.variants.length - 3}</span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full max-w-[140px] md:max-w-[180px] py-2 md:py-3 text-[9px] md:text-[10px] tracking-[0.3em] font-bold uppercase transition-all ${
                        addedToCart[product.id]
                          ? 'bg-gray-600 text-white'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      {addedToCart[product.id] ? '✓ ADDED' : 'ADD TO CART'}
                    </button>
                    
                    {/* Reviews */}
                    {product.reviews && (
                      <div className="mt-2 text-[7px] md:text-[8px] text-gray-400">
                        ⭐ {product.reviews} reviewsk
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;