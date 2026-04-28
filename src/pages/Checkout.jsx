import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ChevronLeft, MessageSquare, Eye } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: 'Karachi', paymentMethod: 'cod'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState({});

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

  // Get prescription details as formatted string
  const getPrescriptionText = (prescription) => {
    if (!prescription) return '';
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

  // Get full prescription details for WhatsApp message
  const getFullPrescriptionDetails = (item) => {
    if (!item.prescription) return '';
    const presc = item.prescription;
    const details = [];
    
    if (presc.sphereLeft || presc.sphereRight) {
      details.push(`   • Sphere (Power): Left ${presc.sphereLeft || '0'} | Right ${presc.sphereRight || '0'}`);
    }
    if (presc.cylinderLeft || presc.cylinderRight) {
      details.push(`   • Cylinder: Left ${presc.cylinderLeft || '0'} | Right ${presc.cylinderRight || '0'}`);
    }
    if (presc.axisLeft || presc.axisRight) {
      details.push(`   • Axis: Left ${presc.axisLeft || '0'}° | Right ${presc.axisRight || '0'}°`);
    }
    if (presc.pd) {
      details.push(`   • Pupillary Distance (PD): ${presc.pd}mm`);
    }
    
    return details.length ? `\n   📋 Prescription Details:\n${details.join('\n')}` : '';
  };

  const shippingCost = cartTotal > 5000 ? 0 : 200;
  const grandTotal = cartTotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePrescription = (itemId) => {
    setShowPrescriptions(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build order items with prescription details
    const orderItems = cartItems.map(item => {
      const itemPrice = getItemPrice(item);
      const prescText = getFullPrescriptionDetails(item);
      const variantText = item.variant?.colorName ? ` (${item.variant.colorName})` : '';
      const shapeText = item.shape ? ` [${item.shape}]` : '';
      
      return `• ${item.name}${variantText}${shapeText} x ${item.quantity} = ${formatPrice(itemPrice * item.quantity)}${prescText}`;
    }).join('\n');

    // Count items with prescription
    const prescriptionItems = cartItems.filter(item => hasPrescription(item));
    const hasPrescriptionItems = prescriptionItems.length > 0;

    const message = `✨ *NEW LUXURY ORDER - IQRA OPTICAL* ✨
    
👤 *Client Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}
• Address: ${formData.address}, ${formData.city}
• Payment: ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}

📦 *Selection:*
${orderItems}

${hasPrescriptionItems ? `\n👓 *Prescription Items: ${prescriptionItems.length} item(s)*\n` : ''}
📊 *Summary:*
• Subtotal: ${formatPrice(cartTotal)}
• Shipping: ${shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
• *Grand Total: ${formatPrice(grandTotal)}*

⏰ Order Time: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}

Thank you for choosing IQRA OPTICAL. We will confirm your order shortly.`;

    const phoneNumber = '923711191925'; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    clearCart();
    window.open(url, '_blank');
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-[#FCFCFC] min-h-screen text-black font-sans pb-20">
      {/* 1. Refined Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-serif italic tracking-widest uppercase">Checkout</h1>
          <div className="w-12 h-px bg-black mx-auto mt-4"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* 2. Form Section */}
          <div className="lg:w-2/3">
            <h2 className="text-xs tracking-[0.3em] font-bold uppercase mb-10 pb-4 border-b">Shipping & Client Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Full Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Enter your name"
                    className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Phone Number</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    placeholder="+92 XXX XXXXXXX"
                    className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="email@example.com"
                    className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">City</label>
                  <select
                    name="city" value={formData.city} onChange={handleChange} required
                    className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black bg-transparent"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Delivery Address</label>
                <textarea
                  name="address" value={formData.address} onChange={handleChange} required rows="2"
                  placeholder="Street address, Apartment, Landmark"
                  className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-8">
                <h3 className="text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-6">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="hidden" />
                      <span className="text-[10px] tracking-widest font-bold uppercase">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full bg-black text-white py-5 text-[11px] tracking-[0.4em] font-bold uppercase hover:bg-gray-900 transition flex items-center justify-center gap-4"
              >
                {isSubmitting ? 'SECURELY REDIRECTING...' : <><MessageSquare size={16}/> Complete via WhatsApp</>}
              </button>
            </form>
          </div>

          {/* 3. Order Summary Panel */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-100 p-8 sticky top-10">
              <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-8">Your Selection</h3>
              
              <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => {
                  const itemPrice = getItemPrice(item);
                  const hasPresc = hasPrescription(item);
                  const imageUrl = getItemImage(item);
                  const prescSummary = getPrescriptionText(item.prescription);
                  
                  return (
                    <div key={item.cartItemId || item.id} className="flex gap-4 items-start">
                      <img 
                        src={imageUrl} 
                        alt={item.name} 
                        className="w-16 h-20 object-cover grayscale hover:grayscale-0 transition-all"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest leading-tight">{item.name}</h4>
                        
                        {/* Variant/Color info */}
                        {item.variant?.colorName && (
                          <p className="text-[8px] text-gray-400 mt-0.5">
                            Color: {item.variant.colorName}
                          </p>
                        )}
                        
                        {/* Shape info */}
                        {item.shape && (
                          <p className="text-[8px] text-gray-400">
                            Shape: {item.shape}
                          </p>
                        )}
                        
                        <p className="text-[10px] text-gray-400 mt-1 uppercase">Qty: {item.quantity}</p>
                        
                        {/* Prescription Badge & Toggle */}
                        {hasPresc && (
                          <div className="mt-1">
                            <button
                              onClick={() => togglePrescription(item.cartItemId || item.id)}
                              className="flex items-center gap-1 text-[8px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-100 transition"
                            >
                              <Eye size={8} />
                              {showPrescriptions[item.cartItemId || item.id] ? 'Hide Rx' : 'View Rx'}
                            </button>
                            
                            {showPrescriptions[item.cartItemId || item.id] && (
                              <div className="mt-1 p-1.5 bg-gray-50 text-[7px] rounded">
                                <p className="font-semibold mb-0.5">Prescription:</p>
                                <div className="space-y-0.5 text-gray-600">
                                  {item.prescription.sphereLeft && (
                                    <div>SPH L: {item.prescription.sphereLeft} | R: {item.prescription.sphereRight || '0'}</div>
                                  )}
                                  {item.prescription.cylinderLeft && (
                                    <div>CYL L: {item.prescription.cylinderLeft} | R: {item.prescription.cylinderRight || '0'}</div>
                                  )}
                                  {item.prescription.axisLeft && (
                                    <div>AXIS L: {item.prescription.axisLeft}° | R: {item.prescription.axisRight || '0'}°</div>
                                  )}
                                  {item.prescription.pd && (
                                    <div>PD: {item.prescription.pd}mm</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <p className="text-xs font-serif italic mt-1">
                          {formatPrice(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 text-[10px] tracking-widest uppercase border-t pt-8">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t pt-4 mt-2">
                  <span>Grand Total</span>
                  <span className="font-serif italic text-lg tracking-normal">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Prescription Notice */}
              {cartItems.some(item => hasPrescription(item)) && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100">
                  <p className="text-[8px] text-blue-700 uppercase tracking-wider font-semibold mb-1">
                    📋 Prescription Order
                  </p>
                  <p className="text-[7px] text-blue-600 leading-relaxed">
                    Your prescription details have been included with this order. Our team will verify and contact you for confirmation if needed.
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <ShieldCheck size={16} strokeWidth={1} />
                  <span className="text-[9px] tracking-widest uppercase">Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Truck size={16} strokeWidth={1} />
                  <span className="text-[9px] tracking-widest uppercase">Premium Secure Packaging</span>
                </div>
              </div>

              <Link to="/cart" className="flex items-center justify-center gap-2 text-[9px] tracking-widest uppercase font-bold mt-8 hover:text-gray-500 transition">
                <ChevronLeft size={14} /> Back to Dressing Room
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Loading Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-6">
          <div className="text-center max-w-xs">
            <div className="w-16 h-px bg-black mx-auto mb-8 animate-pulse"></div>
            <h3 className="text-lg font-serif italic mb-4">Finalizing Your Request</h3>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 leading-loose">
              You are being directed to our WhatsApp concierge to finalize your luxury delivery.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;