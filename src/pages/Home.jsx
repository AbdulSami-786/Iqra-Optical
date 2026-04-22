import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/Products';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Clock, Award } from 'lucide-react';

// Math function to calculate 10% discount
const applyDiscount = (originalPrice) => {
  const discountRate = 0.10; // 10% discount
  const discountedPrice = originalPrice - (originalPrice * discountRate);
  return Math.round(discountedPrice); // Round to nearest whole number
};

// Carousel Slider Component (defined outside Home)
const CarouselSlider = () => {
  const slides = [
    {
      id: 1,
      image: "./b1.jpg",
      title: "",
      subtitle: "",
      description: "",
      ctaLink: "/products"
    },
    {
      id: 2,
      image: "./b2.jpg",
      title: "",
      subtitle: "",
      description: "",
      ctaLink: "/products"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Manual navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    resetAutoPlay();
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section style={{
  minHeight: "100vh",
  ...(window.innerWidth <= 768 && { minHeight: "30vh" })
}}
 className="relative w-full   bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image with Fade Transition - BLACK OVERLAY REMOVED */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img 
          src={currentSlide.image} 
          alt={currentSlide.title}
          className="w-full h-full object-cover"
        />
        {/* BLACK OVERLAY COMPLETELY REMOVED - No more bg-black/40 */}
      </div>

      {/* Content with Fade Animation */}
      <div className="relative z-10 text-white max-w-2xl animate-fadeIn">
        <h2 className="text-[10px] tracking-[0.5em] mb-3 md:mb-4 uppercase font-bold">
          {currentSlide.subtitle}
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-4 md:mb-6 italic leading-tight">
          {currentSlide.title}
        </h1>
        <p className="text-base md:text-xl mb-6 md:mb-8 font-light tracking-wide">
          {currentSlide.description}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 md:w-10 h-1.5 md:h-2 bg-white'
                : 'w-2 h-1.5 md:w-2.5 md:h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-6 md:bottom-8 right-4 md:right-8 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label={isAutoPlaying ? 'Pause autoplay' : 'Play autoplay'}
      >
        {isAutoPlaying ? (
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </section>
  );
};

const Home = () => {
  const { addToCart, cartItems } = useCart();
  const [addedToCart, setAddedToCart] = useState({});
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const dealProduct = {
    id: 'deal1',
    name: "",
    originalPrice: 0,
    price: 0,
    image: "b4.jpeg",
    description: ""
  };

  const categories = [
    { name: " ", image: "b3.jpeg", link: "/products?category=bestseller" },
    { name: "", image: "b5.jpeg", link: "/products?category=women" },
    { name: "", image: "b2.jpg", link: "/products?category=men" },
  ];

  // Handle add to cart with animation - applying discount before adding
  const handleAddToCart = (product) => {
    const discountedPrice = applyDiscount(product.price);
    const productWithDiscount = {
      ...product,
      price: discountedPrice,
      originalPrice: product.price // Store original price for reference
    };
    addToCart(productWithDiscount);
    
    // Show temporary "Added" state
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Check if a product is in cart to show quantity
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Carousel Slider */}
      <CarouselSlider />

      {/* 2. HORIZONTAL SCROLLING CRAZY DEALS */}
<section className="py-12 md:py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="flex items-end justify-between mb-8 md:mb-12">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif italic mb-2">Crazy Deals</h2>
        <div className="w-20 h-1 bg-black"></div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => scroll('left')} className="p-2 border border-black hover:bg-black hover:text-white transition"><ChevronLeft size={20}/></button>
        <button onClick={() => scroll('right')} className="p-2 border border-black hover:bg-black hover:text-white transition"><ChevronRight size={20}/></button>
      </div>
    </div>

    <div 
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide snap-x no-scrollbar pb-6 md:pb-10"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {products && products.map((product) => {
        const quantity = getItemQuantity(product.id);
        // FIXED: Use discountPrice from your data instead of calculating
        const discountedPrice = parseFloat(product.discountPrice);
        const originalPrice = parseFloat(product.originalPrice);
        const discountAmount = originalPrice - discountedPrice;
        const discountPercent = product.discount || `${Math.round((discountAmount / originalPrice) * 100)}%`;
        
        return (
          <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-[4/5] block">
              <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-[8px] md:text-[10px] tracking-widest z-10 font-bold">
                {discountPercent} OFF
              </span>
              {quantity > 0 && (
                <div className="absolute top-3 right-3 bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[8px] md:text-[10px] font-bold z-10">
                  {quantity}
                </div>
              )}
              <img 
                src={product.variants?.[0]?.image || product.mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </Link>
            <div className="p-4 md:p-6 text-center">
              <Link to={`/product/${product.id}`}>
                <h4 className="font-bold text-xs md:text-sm tracking-widest uppercase mb-2 truncate hover:text-gray-600 transition">
                  {product.name}
                </h4>
              </Link>
              <div className="flex justify-center items-center gap-3 mb-4 md:mb-6">
                <span className="text-gray-400 line-through text-xs md:text-sm font-light italic">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-base md:text-lg font-bold text-red-600 font-serif">
                  {formatPrice(discountedPrice)}
                </span>
              </div>
              <div className="mb-3">
                <span className="bg-red-100 text-red-600 text-[9px] md:text-[10px] px-2 py-1 rounded font-semibold">
                  Save {formatPrice(discountAmount)}
                </span>
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                className={`w-full py-2 md:py-3 text-[10px] tracking-[0.3em] uppercase transition duration-300 ${
                  addedToCart[product.id]
                    ? 'bg-gray-600 text-white'
                    : 'border border-black hover:bg-black hover:text-white'
                }`}
              >
                {addedToCart[product.id] ? '✓ ADDED TO CART' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* 3. NEW CONTENT: WHY CHOOSE US */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck className="mb-3 md:mb-4 text-gray-700 w-6 h-6 md:w-8 md:h-8" />
            <h5 className="font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">Fast Delivery</h5>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Across Pakistan</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="mb-3 md:mb-4 text-gray-700 w-6 h-6 md:w-8 md:h-8" />
            <h5 className="font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">100% Original</h5>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Authentic Scents</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="mb-3 md:mb-4 text-gray-700 w-6 h-6 md:w-8 md:h-8" />
            <h5 className="font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">Long Lasting</h5>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">12+ Hours Sillage</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="mb-3 md:mb-4 text-gray-700 w-6 h-6 md:w-8 md:h-8" />
            <h5 className="font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">Premium Quality</h5>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">French Ingredients</p>
          </div>
        </div>
      </section>

      {/* 4. CATEGORY BANNERS - Fixed for mobile: full image visible */}
      <section  className="space-y-0 mb-0 md:mb-0 px-0">
        {categories.map((cat, idx) => (
          <Link  style={{
  minHeight: "100vh",
  ...(window.innerWidth <= 768 && { minHeight: "30vh" })
}} key={idx} to={cat.link} className="relative block  w-full group overflow-hidden">
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full grayscale-[0%] group-hover:grayscale-0 transition duration-700" 
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl md:text-5xl font-serif italic font-light tracking-[0.1em] mb-3 md:mb-4">
                {cat.name}
              </h3>
              <span className="text-[10px] tracking-[0.5em] border-b border-white pb-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                SHOP NOW
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* 5. TESTIMONIALS */}
      <div className="max-w-4xl mx-auto text-center py-12 md:py-20 px-4">
         <div className="text-yellow-500 mb-4 md:mb-6 text-xl md:text-2xl tracking-widest">★★★★★</div>
         <p className="text-xl md:text-2xl italic font-serif text-gray-800 mb-6 md:mb-8 leading-relaxed">
           "The sillage and longevity of Zareen Fragrances are unmatched. It feels like wearing pure luxury every single day."
         </p>
         <h5 className="font-bold tracking-[0.4em] text-[10px] md:text-xs">— AYESHA KHAN, KARACHI</h5>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-serif italic mb-6 md:mb-8 tracking-widest">ZAREEN FRAGRANCE</h2>
          <div className="flex justify-center space-x-8 md:space-x-12 text-[10px] tracking-[0.3em] font-bold mb-8 md:mb-12">
            <Link to="/products" className="hover:text-gray-400 transition">COLLECTIONS</Link>
            <Link to="/about" className="hover:text-gray-400 transition">OUR STORY</Link>
            <Link to="/contact" className="hover:text-gray-400 transition">CONTACT</Link>
          </div>
          <p className="text-gray-500 text-[10px] tracking-widest">
            © {new Date().getFullYear()} ZAREEN FRAGRANCE | CRAFTED FOR ELEGANCE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;