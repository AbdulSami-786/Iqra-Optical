import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { useState, useEffect } from 'react';

// Helper function to get product images
const getProductImages = (product) => {
  if (!product) return ['/placeholder.jpg'];
  
  // If product has images array
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    
    return product.images;
  }
  
  // If product has variants with images
  if (product.variants && product.variants.length > 0) {
    const variantImages = product.variants.map(v => v.image).filter(img => img);
    if (variantImages.length > 0) return variantImages;
  }
  
  // If product has mainImage
  if (product.mainImage) return [product.mainImage];
  
  // If product has image
  if (product.image) return [product.image];
  
  return ['/placeholder.jpg'];
};

// Helper function to get main image
const getMainImage = (product) => {
  if (!product) return '/placeholder.jpg';
  if (product.mainImage) return product.mainImage;
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.variants && product.variants.length > 0) return product.variants[0].image;
  if (product.image) return product.image;
  return '/placeholder.jpg';
};

// Get discounted price - FIXED to handle string prices with commas
const getDiscountedPrice = (product) => {
  if (product.discountPrice) {
    // Handle string with commas like "1,499"
    const priceString = String(product.discountPrice).replace(/,/g, '');
    return parseFloat(priceString);
  }
  if (product.originalPrice) {
    const priceString = String(product.originalPrice).replace(/,/g, '');
    return parseFloat(priceString);
  }
  if (product.price) {
    const priceString = String(product.price).replace(/,/g, '');
    return Math.round(parseFloat(priceString) * 0.9);
  }
  return 0;
};

const getOriginalPrice = (product) => {
  if (product.originalPrice) {
    const priceString = String(product.originalPrice).replace(/,/g, '');
    return parseFloat(priceString);
  }
  if (product.price) {
    const priceString = String(product.price).replace(/,/g, '');
    return parseFloat(priceString);
  }
  return 0;
};

const getDiscountPercent = (product) => {
  if (product.discount) {
    return product.discount;
  }
  const original = getOriginalPrice(product);
  const discounted = getDiscountedPrice(product);
  if (original && discounted && original > discounted) {
    const percent = Math.round(((original - discounted) / original) * 100);
    return `${percent}%`;
  }
  return '10%';
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  
  // Prescription state (optional - only for frames/glasses)
  const [needPrescription, setNeedPrescription] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    sphereLeft: '',
    sphereRight: '',
    cylinderLeft: '',
    cylinderRight: '',
    axisLeft: '',
    axisRight: '',
    pd: ''
  });

  // Load product on mount and when id changes
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct || null);
    // Reset states when product changes
    setSelectedImage(0);
    setSelectedVariant(0);
    setQuantity(1);
    setNeedPrescription(false);
  }, [id]);

  // Check if product is eyewear/frame
  const isEyewear = product?.shape || 
                    product?.name?.toLowerCase().includes('frame') ||
                    product?.name?.toLowerCase().includes('glass') ||
                    product?.name?.toLowerCase().includes('sunglass');

  // Swipe state for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20 font-serif">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  // Get prices using fixed functions
  const discountedPrice = getDiscountedPrice(product);
  const originalPrice = getOriginalPrice(product);
  const discountPercent = getDiscountPercent(product);
  const discountAmount = originalPrice - discountedPrice;
  
  // Get all images for this product
  const images = getProductImages(product);
  
  // Get variants
  const variants = product.variants || [];
  
  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Performance data (only for perfumes - you can customize based on product type)
  const performance = [
    { label: "Material", value: product.material || "Premium Quality" },
    { label: "Shape", value: product.shape || "Classic" },
    { label: "Made In", value: product.madeInTaiwan ? "Taiwan" : "Imported" }
  ];

  // Format price
  const formatPrice = (price) => {
    if (isNaN(price) || price === 0) return 'PKR 0';
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      originalPrice: originalPrice,
      discount: discountPercent,
      image: getMainImage(product),
      category: product.category,
      variant: variants[selectedVariant] || null,
      shape: product.shape,
      quantity: quantity,
      // Include prescription if needed
      prescription: needPrescription ? prescriptionDetails : null
    };
    addToCart(productToAdd, quantity);
    
    // Optional: Show success feedback
    // You could add a toast notification here
  };

  const handleBuyNow = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      originalPrice: originalPrice,
      discount: discountPercent,
      image: getMainImage(product),
      category: product.category,
      variant: variants[selectedVariant] || null,
      shape: product.shape,
      quantity: quantity,
      prescription: needPrescription ? prescriptionDetails : null
    };
    addToCart(productToAdd, quantity);
    navigate('/cart');
  };

  // Swipe handlers for mobile image gallery
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && selectedImage < images.length - 1) {
        setSelectedImage(prev => prev + 1);
      } else if (diff < 0 && selectedImage > 0) {
        setSelectedImage(prev => prev - 1);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrescriptionChange = (field, value) => {
    setPrescriptionDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white text-black font-sans">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-2"
        >
          ← Back to Collection
        </button>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">
          {/* Left: Product Images */}
          <div className="lg:w-1/2">
            <div className="flex gap-4">
              {/* Thumbnail Gallery - Desktop */}
              {images.length > 1 && (
                <div className="hidden lg:flex flex-col gap-2 w-20">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className={`border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedImage === index 
                          ? 'border-black' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Main Image Display */}
              <div 
                className="flex-1"
                onTouchStart={images.length > 1 ? handleTouchStart : undefined}
                onTouchMove={images.length > 1 ? handleTouchMove : undefined}
                onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
              >
                <div className="border border-gray-100 overflow-hidden bg-gray-50">
                  <img 
                    src={images[selectedImage] || '/placeholder.jpg'} 
                    alt={product.name} 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                </div>
                
                {/* Mobile Image Dots */}
                {images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4 lg:hidden">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          selectedImage === index ? 'w-6 bg-black' : 'w-2 bg-gray-300'
                        }`}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="text-center mt-4 font-bold tracking-tighter text-base sm:text-xl">
                  {product.category === 'men' ? 'MEN' : product.category === 'women' ? 'WOMEN' : 'UNISEX'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-xl sm:text-3xl font-bold uppercase tracking-tight mb-2">{product.name}</h1>
            
            {/* Product specs */}
            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              {product.shape && (
                <span className="bg-gray-100 px-2 py-1 rounded">{product.shape}</span>
              )}
              {product.madeInTaiwan && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Made in Taiwan</span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400 text-base sm:text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm">({product.reviews || 0} Reviews)</span>
            </div>

            {/* Price with Discount from data */}
            <div className="mb-4">
              <span className="text-xl sm:text-3xl font-bold text-red-600">{formatPrice(discountedPrice)}</span>
              {originalPrice > discountedPrice && (
                <>
                  <span className="text-gray-400 text-base sm:text-lg line-through ml-3 font-normal">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="ml-3 bg-red-100 text-red-600 text-xs sm:text-sm px-2 py-1 rounded font-semibold">
                    -{discountPercent} OFF
                  </span>
                </>
              )}
            </div>

            {/* Variant Selector */}
            {variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold border-b pb-1 uppercase text-xs sm:text-sm tracking-wider mb-3">Color / Style</h3>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedVariant(index);
                        // Update image when variant changes if variant has image
                        if (variant.image) {
                          const imageIndex = images.findIndex(img => img === variant.image);
                          if (imageIndex !== -1) {
                            setSelectedImage(imageIndex);
                          }
                        }
                      }}
                      className={`px-4 py-2 text-xs border transition ${
                        selectedVariant === index
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {variant.colorName || `Style ${index + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OPTIONAL PRESCRIPTION SECTION - Only for eyewear/frames */}
            {isEyewear && (
              <div className="mb-6 border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold uppercase text-xs sm:text-sm tracking-wider">Prescription Lenses</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-gray-600">Need prescription?</span>
                    <input
                      type="checkbox"
                      checked={needPrescription}
                      onChange={(e) => setNeedPrescription(e.target.checked)}
                      className="w-4 h-4 accent-black"
                    />
                  </label>
                </div>

                {needPrescription && (
                  <div className="bg-gray-50 p-4 space-y-4">
                    <p className="text-xs text-gray-500 mb-2">Please fill in your prescription details (optional, can be added later)</p>
                    
                    {/* Sphere (Power) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Sphere (Left Eye)</label>
                        <input
                          type="text"
                          placeholder="e.g., -2.00"
                          value={prescriptionDetails.sphereLeft}
                          onChange={(e) => handlePrescriptionChange('sphereLeft', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Sphere (Right Eye)</label>
                        <input
                          type="text"
                          placeholder="e.g., -1.75"
                          value={prescriptionDetails.sphereRight}
                          onChange={(e) => handlePrescriptionChange('sphereRight', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Cylinder */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Cylinder (Left)</label>
                        <input
                          type="text"
                          placeholder="e.g., -0.50"
                          value={prescriptionDetails.cylinderLeft}
                          onChange={(e) => handlePrescriptionChange('cylinderLeft', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Cylinder (Right)</label>
                        <input
                          type="text"
                          placeholder="e.g., -0.75"
                          value={prescriptionDetails.cylinderRight}
                          onChange={(e) => handlePrescriptionChange('cylinderRight', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Axis */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Axis (Left) - 0 to 180</label>
                        <input
                          type="text"
                          placeholder="e.g., 180"
                          value={prescriptionDetails.axisLeft}
                          onChange={(e) => handlePrescriptionChange('axisLeft', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Axis (Right) - 0 to 180</label>
                        <input
                          type="text"
                          placeholder="e.g., 175"
                          value={prescriptionDetails.axisRight}
                          onChange={(e) => handlePrescriptionChange('axisRight', e.target.value)}
                          className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* PD (Pupillary Distance) */}
                    <div>
                      <label className="block text-xs font-medium mb-1">Pupillary Distance (PD) in mm</label>
                      <input
                        type="text"
                        placeholder="e.g., 62"
                        value={prescriptionDetails.pd}
                        onChange={(e) => handlePrescriptionChange('pd', e.target.value)}
                        className="w-full border p-2 text-sm focus:outline-none focus:border-black"
                      />
                      <p className="text-xs text-gray-400 mt-1">Average PD is between 54-74mm</p>
                    </div>

                    <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                      ⚡ Prescription lenses may add additional charges. Our team will contact you for verification.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="space-y-3 mb-6">
              <h3 className="font-bold border-b pb-1 uppercase text-xs sm:text-sm tracking-wider">Description</h3>
              <div className="text-gray-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line max-h-96 overflow-y-auto">
                {product.description || `${product.name} - High quality eyewear with premium materials.`}
              </div>
            </div>

            {/* Product Features/Specs */}
            <div className="space-y-3 mb-6">
              <h3 className="font-bold border-b pb-1 uppercase text-xs sm:text-sm tracking-wider">Specifications</h3>
              <ul className="text-xs sm:text-sm space-y-1">
                {performance.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <span className="text-xs uppercase tracking-wider mr-4">Quantity</span>
                <div className="flex items-center border">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="px-3 py-1 sm:px-4 sm:py-2 border-r hover:bg-gray-100 transition disabled:opacity-50 text-sm"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="w-12 text-center focus:outline-none py-1 sm:py-2 text-sm"
                    min="1"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="px-3 py-1 sm:px-4 sm:py-2 border-l hover:bg-gray-100 transition text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white font-bold py-2 sm:py-4 text-sm sm:text-base uppercase tracking-widest hover:bg-black transition-colors"
              >
                Add to Cart - {formatPrice(discountedPrice * quantity)}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full border-2 border-black text-black font-bold py-2 sm:py-4 text-sm sm:text-base uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Buy Now - {formatPrice(discountedPrice * quantity)}
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-10 sm:mt-20 border-t pt-5 sm:pt-10">
          <h2 className="text-lg sm:text-2xl font-bold text-center uppercase mb-6 sm:mb-10">Customer Reviews</h2>
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div className="border-b pb-4 sm:pb-6">
              <div className="flex text-yellow-400 mb-1 text-base sm:text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="font-bold text-sm sm:text-base">Asad Murtaza</p>
              <p className="text-gray-600 italic text-xs sm:text-sm">"Very Good Product, exactly what I was looking for."</p>
              <p className="text-xs text-gray-400 mt-1">Verified Purchase</p>
            </div>
            <div className="border-b pb-4 sm:pb-6">
              <div className="flex text-yellow-400 mb-1 text-base sm:text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="font-bold text-sm sm:text-base">Ahmed</p>
              <p className="text-gray-600 italic text-xs sm:text-sm">"Great quality and fast shipping."</p>
              <p className="text-xs text-gray-400 mt-1">Verified Purchase</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 sm:mt-20 border-t pt-5 sm:pt-10">
            <h2 className="text-lg sm:text-2xl font-bold text-center uppercase mb-6 sm:mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {relatedProducts.map(relatedProduct => {
                const relatedImage = getMainImage(relatedProduct);
                const relatedDiscountedPrice = getDiscountedPrice(relatedProduct);
                const relatedOriginalPrice = getOriginalPrice(relatedProduct);
                const relatedDiscountPercent = getDiscountPercent(relatedProduct);
                
                return (
                  <div 
                    key={relatedProduct.id} 
                    className="cursor-pointer group"
                    onClick={() => {
                      navigate(`/product/${relatedProduct.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="overflow-hidden bg-gray-50 aspect-square">
                      <img 
                        src={`.${relatedImage}`} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <h3 className="text-[11px] sm:text-xs font-bold uppercase mt-1 truncate">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-red-600 text-[11px] sm:text-sm font-bold">{formatPrice(relatedDiscountedPrice)}</p>
                      {relatedOriginalPrice > relatedDiscountedPrice && (
                        <p className="text-gray-400 text-[10px] sm:text-xs line-through">{formatPrice(relatedOriginalPrice)}</p>
                      )}
                    </div>
                    <span className="text-green-600 text-[10px] sm:text-xs font-semibold">-{relatedDiscountPercent} OFFk</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;