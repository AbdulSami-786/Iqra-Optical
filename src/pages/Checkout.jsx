import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm';

const WHATSAPP_NUMBER = '923002615141';

const PAYMENT_OPTIONS = [
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Secure online payment' },
  { id: 'bank', label: 'Bank Transfer', desc: 'Direct transfer to our account' },
];

const buildWhatsAppMessage = ({ form, cartItems, cartTotal, shipping, total, paymentMethod }) => {
  const paymentLabel = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)?.label || paymentMethod;

  const itemLines = cartItems
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const lines = [
    '*New Order - Iqra Optics*',
    '',
    `*Name:* ${form.firstName} ${form.lastName}`,
    `*Phone:* ${form.phone}`,
    `*Email:* ${form.email}`,
    `*Address:* ${form.address}, ${form.city}${form.postalCode ? ` ${form.postalCode}` : ''}`,
    '',
    '*Items:*',
    itemLines,
    '',
    `*Subtotal:* Rs. ${cartTotal.toLocaleString()}`,
    `*Shipping:* ${shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}`,
    `*Total:* Rs. ${total.toLocaleString()}`,
    '',
    `*Payment Method:* ${paymentLabel}`,
  ];

  if (form.notes.trim()) lines.push('', `*Notes:* ${form.notes.trim()}`);

  return lines.join('\n');
};

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const req = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const errs = {};
    req.forEach((key) => {
      if (!form[key].trim()) errs[key] = 'Required';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage({ form, cartItems, cartTotal, shipping, total, paymentMethod });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle2 size={36} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">Order Sent on WhatsApp!</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Thank you, {form.firstName}. We've opened WhatsApp with your order details — just hit send.
          Our team will contact you shortly at {form.phone} to confirm delivery.
        </p>
        <div className="flex gap-3">
          <Link to="/orders" className="px-6 py-3 border border-ink text-ink text-xs font-bold uppercase tracking-wider rounded-full hover:bg-ink hover:text-white transition-colors">
            View Orders
          </Link>
          <Link to="/products" className="px-6 py-3 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">Your Cart is Empty</h1>
        <p className="text-sm text-gray-500 mb-8">Add items to your cart before checking out.</p>
        <Link to="/products" className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-ink transition-colors mb-4">
        <ChevronLeft size={14} /> Back to Cart
      </Link>
      <h1 className="text-3xl font-serif font-semibold text-ink mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">Contact & Shipping</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className={inputClass} />
                {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className={inputClass} />
                {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={inputClass} />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} className={inputClass} />
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div>
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className={inputClass} />
                {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
              </div>
              <input name="postalCode" placeholder="Postal Code (optional)" value={form.postalCode} onChange={handleChange} className={inputClass} />
              <textarea
                name="notes"
                placeholder="Order notes (optional)"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} sm:col-span-2 resize-none`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === opt.id ? 'border-ink bg-cream/40' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="accent-ink w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-gray-100 shadow-card p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-serif font-semibold text-ink mb-6">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-gray-500">Rs. {item.price.toLocaleString()}</p>
                </div>
                <span className="text-xs font-bold text-ink">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-ink">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-ink">{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-ink">Total</span>
            <span className="text-xl font-bold text-ink">Rs. {total.toLocaleString()}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1eb858] transition-colors"
          >
            <FaWhatsapp size={16} /> Place Order via WhatsApp
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">
            You'll be redirected to WhatsApp to confirm your order with us.
          </p>
          <div className="flex items-center gap-4 mt-5 justify-center text-[11px] text-gray-500">
            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure Checkout</span>
            <span className="flex items-center gap-1"><Truck size={14} /> Fast Delivery</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
