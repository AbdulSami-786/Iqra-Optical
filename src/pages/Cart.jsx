// pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Eye } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showPrescription, setShowPrescription] = useState({});

  // Helper function to get image
  const getItemImage = (item) => {
    if (item.mainImage) return item.mainImage;
    if (item.image) return item.image;
    if (item.variant?.image) return item.variant.image;
    if (item.variants?.[0]?.image) return item.variants[0].image;
    return '/placeholder.jpg';
  };

  // Helper function to get item price
  const getItemPrice = (item) => {
    if (item.price) return item.price;
    if (item.discountPrice) return parseFloat(item.discountPrice);
    return 0;
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

  // Check if item has prescription
  const hasPrescription = (item) => {
    return item.prescription && Object.values(item.prescription).some(v => v);
  };

  // Get prescription summary
  const getPrescriptionSummary = (prescription) => {
    if (!prescription) return null;
    const parts = [];
    if (prescription.sphereLeft || prescription.sphereRight) {
      parts.push(`SPH: L:${prescription.sphereLeft || '0'} R:${prescription.sphereRight || '0'}`);
    }
    if (prescription.cylinderLeft || prescription.cylinderRight) {
      parts.push(`CYL: L:${prescription.cylinderLeft || '0'} R:${prescription.cylinderRight || '0'}`);
    }
    if (prescription.axisLeft || prescription.axisRight) {
      parts.push(`AXIS: L:${prescription.axisLeft || '0'}° R:${prescription.axisRight || '0'}°`);
    }
    if (prescription.pd) {
      parts.push(`PD: ${prescription.pd}mm`);
    }
    return parts.join(' | ');
  };

  const shippingCost = cartTotal > 5000 ? 0 : 200;
  const discountedTotal = promoApplied ? cartTotal * 0.9 : cartTotal;
  const grandTotal = discountedTotal + shippingCost;

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === 'IQRA10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid invitation code');
    }
  };

  const togglePrescription = (itemId) => {
    setShowPrescription(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={48} strokeWidth={1} className="mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-serif italic mb-4 uppercase tracking-widest">Your Bag is Empty</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-8">Discover your next signature scent</p>
          <Link 
            to="/products" 
            className="inline-block bg-black text-white px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-800 transition"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] min-h-screen text-black font-sans pb-20">
      {/* 1. Minimal Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif italic tracking-widest uppercase">Shopping Bag</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mt-4">
            {cartItems.length} {cartItems.length === 1 ? 'Selection' : 'Selections'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 2. Items List */}
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400">
              <div className="col-span-7">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map(item => {
                const itemPrice = getItemPrice(item);
                const hasPresc = hasPrescription(item);
                const prescSummary = getPrescriptionSummary(item.prescription);
                const imageUrl = getItemImage(item);
                
                return (
                  <div key={item.cartItemId || item.id} className="py-8 group">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Image & Detail */}
                      <div className="col-span-12 md:col-span-7 flex items-start gap-6">
                        <div className="w-24 h-32 bg-gray-50 overflow-hidden flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            onError={(e) => {
                              e.target.src = '/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs font-bold tracking-widest uppercase mb-1">{item.name}</h3>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                            {item.category || 'Unisex'}
                          </p>
                          
                          {/* Variant/Color info */}
                          {item.variant?.colorName && (
                            <p className="text-[9px] text-gray-400 mt-1">
                              Color: {item.variant.colorName}
                            </p>
                          )}
                          
                          {/* Shape info */}
                          {item.shape && (
                            <p className="text-[9px] text-gray-400">
                              Shape: {item.shape}
                            </p>
                          )}

                          {/* Prescription Badge & Toggle */}
                          {hasPresc && (
                            <div className="mt-2">
                              <button
                                onClick={() => togglePrescription(item.cartItemId || item.id)}
                                className="flex items-center gap-1 text-[9px] bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition"
                              >
                                <Eye size={10} />
                                {showPrescription[item.cartItemId || item.id] ? 'Hide Prescription' : 'View Prescription'}
                              </button>
                              
                              {showPrescription[item.cartItemId || item.id] && (
                                <div className="mt-2 p-2 bg-gray-50 text-[9px] rounded">
                                  <p className="font-semibold mb-1">👓 Prescription Details:</p>
                                  <div className="space-y-0.5 text-gray-600">
                                    {item.prescription.sphereLeft && (
                                      <div>Sphere (Left): {item.prescription.sphereLeft}</div>
                                    )}
                                    {item.prescription.sphereRight && (
                                      <div>Sphere (Right): {item.prescription.sphereRight}</div>
                                    )}
                                    {item.prescription.cylinderLeft && (
                                      <div>Cylinder (Left): {item.prescription.cylinderLeft}</div>
                                    )}
                                    {item.prescription.cylinderRight && (
                                      <div>Cylinder (Right): {item.prescription.cylinderRight}</div>
                                    )}
                                    {item.prescription.axisLeft && (
                                      <div>Axis (Left): {item.prescription.axisLeft}°</div>
                                    )}
                                    {item.prescription.axisRight && (
                                      <div>Axis (Right): {item.prescription.axisRight}°</div>
                                    )}
                                    {item.prescription.pd && (
                                      <div>PD: {item.prescription.pd}mm</div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 w-fit mt-3">
                            <button 
                              onClick={() => updateQuantity(item.cartItemId || item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 hover:bg-gray-50 transition"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-4 text-[11px] font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <p className="text-xs font-serif italic text-gray-500">
                          {formatPrice(itemPrice)}
                        </p>
                        {hasPresc && (
                          <p className="text-[8px] text-blue-600 mt-1">+Prescription</p>
                        )}
                      </div>

                      {/* Total & Remove */}
                      <div className="col-span-12 md:col-span-3 flex md:flex-col justify-between items-center md:items-end gap-4">
                        <button 
                          onClick={() => removeFromCart(item.cartItemId || item.id)}
                          className="text-black hover:text-gray-600 transition order-2 md:order-1"
                        >
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                        <p className="font-serif italic text-sm order-1 md:order-2">
                          {formatPrice(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Mobile Prescription Summary */}
                    {hasPresc && (
                      <div className="mt-3 pt-3 border-t border-gray-100 md:hidden">
                        <p className="text-[8px] text-gray-500 uppercase tracking-wider">Prescription</p>
                        <p className="text-[9px] text-gray-600">{prescSummary}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Link to="/products" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase mt-10 hover:text-gray-500 transition">
              <ArrowLeft size={14} /> Back to Collection
            </Link>
          </div>

          {/* 3. Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-100 p-8 sticky top-10">
              <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-8">Summary</h3>
              
              {/* Promo Code Boutique Style */}
              <div className="mb-10">
                <div className="flex border-b border-gray-200 focus-within:border-black transition-colors">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="INVITATION CODE"
                    className="flex-1 bg-transparent py-2 text-[10px] tracking-widest uppercase outline-none"
                  />
                  <button
                    onClick={handlePromoApply}
                    className="text-[10px] font-bold tracking-widest uppercase px-4 hover:text-gray-500 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-[9px] tracking-widest uppercase mt-2">{promoError}</p>}
                {promoApplied && <p className="text-gray-400 text-[9px] tracking-widest uppercase mt-2">Privilege Discount Applied</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-4 text-[10px] tracking-[0.2em] uppercase border-b border-gray-50 pb-8 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-gray-400 italic">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(cartTotal * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-[8px] italic text-gray-400 normal-case tracking-normal">
                    Complimentary delivery for orders above Rs.5,000
                  </p>
                )}
              </div>

              <div className="flex justify-between items-baseline mb-10">
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Estimated Total</span>
                <span className="text-xl font-serif italic">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-black text-white text-center py-5 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-gray-900 transition shadow-xl"
              >
                Proceed to Checkout
              </Link>

              {/* Trust Badges */}
              <div className="mt-10 flex justify-center gap-6 opacity-20 grayscale">
                <span className="text-xs uppercase tracking-tighter font-bold">Secure</span>
                <span className="text-xs uppercase tracking-tighter font-bold">Authentic</span>
                <span className="text-xs uppercase tracking-tighter font-bold">Premiumk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;