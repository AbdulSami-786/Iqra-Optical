// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
//         <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-6">
//           <ShoppingBag size={32} className="text-gold" strokeWidth={1.5} />
//         </div>
//         <h1 className="text-2xl font-serif font-semibold text-ink mb-2">Your Cart is Empty</h1>
//         <p className="text-sm text-gray-500 mb-8 max-w-sm">
//           Looks like you haven't added anything yet. Explore our collection and find your perfect pair.
//         </p>
//         <Link
//           to="/products"
//           className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
//         >
//           Shop Now
//         </Link>
//       </div>
//     );
//   }

//   const shipping = cartTotal >= 5000 ? 0 : 250;
//   const total = cartTotal + shipping;

//   return (
//     <div className="container mx-auto px-4 max-w-7xl py-12">
//       <div className="mb-8">
//         <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-ink transition-colors mb-4">
//           <ArrowLeft size={14} /> Continue Shopping
//         </Link>
//         <h1 className="text-3xl font-serif font-semibold text-ink">Shopping Cart</h1>
//         <p className="text-sm text-gray-500 mt-1">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
//         <div className="space-y-4">
//           <AnimatePresence>
//             {cartItems.map((item) => (
//               <motion.div
//                 key={item.cartItemId}
//                 layout
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="flex gap-4 sm:gap-5 p-4 rounded-2xl border border-gray-100 shadow-card"
//               >
//                 <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-sand flex-shrink-0">
//                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                 </Link>
//                 <div className="flex-1 min-w-0 flex flex-col justify-between">
//                   <div>
//                     <div className="flex items-start justify-between gap-2">
//                       <div>
//                         <Link to={`/product/${item.id}`} className="text-sm font-semibold text-ink hover:underline line-clamp-1">
//                           {item.name}
//                         </Link>
//                         {item.selectedColor && (
//                           <p className="text-xs text-gray-500 mt-0.5">Color: {item.selectedColor}</p>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item.cartItemId)}
//                         className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
//                         aria-label="Remove item"
//                       >
//                         <Trash2 size={17} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center border border-gray-300 rounded-full">
//                       <button
//                         onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
//                         className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={12} />
//                       </button>
//                       <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
//                         className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={12} />
//                       </button>
//                     </div>
//                     <span className="text-sm font-bold text-ink">
//                       Rs. {(item.price * item.quantity).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Summary */}
//         <div className="h-fit rounded-2xl border border-gray-100 shadow-card p-6 lg:sticky lg:top-28">
//           <h2 className="text-lg font-serif font-semibold text-ink mb-6">Order Summary</h2>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span>
//               <span className="font-medium text-ink">Rs. {cartTotal.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-gray-600">
//               <span>Shipping</span>
//               <span className="font-medium text-ink">{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
//             </div>
//             {shipping > 0 && (
//               <p className="text-[11px] text-gray-400">
//                 Add Rs. {(5000 - cartTotal).toLocaleString()} more for free shipping
//               </p>
//             )}
//           </div>
//           <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">
//             <span className="text-sm font-bold text-ink">Total</span>
//             <span className="text-xl font-bold text-ink">Rs. {total.toLocaleString()}</span>
//           </div>
//           <Link
//             to="/checkout"
//             className="mt-6 block text-center w-full py-4 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
//           >
//             Proceed to Checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;




















// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gold" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">Your Cart is Empty</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Looks like you haven't added anything yet. Explore our collection and find your perfect pair.
        </p>
        <Link
          to="/products"
          className="px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-ink transition-colors mb-4">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-serif font-semibold text-ink">Shopping Cart</h1>
        <p className="text-sm text-gray-500 mt-1">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => {
              // Use finalPrice if present, otherwise item.price
              const itemPrice = item.finalPrice ?? item.price;
              const totalItemPrice = itemPrice * item.quantity;

              return (
                <motion.div
                  key={item.cartItemId}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 sm:gap-5 p-4 rounded-2xl border border-gray-100 shadow-card"
                >
                  <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-sand flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/product/${item.id}`} className="text-sm font-semibold text-ink hover:underline line-clamp-1">
                            {item.name}
                          </Link>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500 mt-0.5">Color: {item.selectedColor}</p>
                          )}
                          {/* Prescription details if present */}
                          {item.prescription && (
                            <div className="mt-1 text-xs text-gray-500">
                              <span className="font-medium">Lens:</span> {item.prescription.lensLabel} 
                              <span className="ml-2 text-gray-400">(+PKR {item.prescription.extraCharge})</span>
                              <div className="flex gap-3 mt-0.5 text-[10px] text-gray-400">
                                <span>R: Sph {item.prescription.rightEye.sphere || '0.00'}, Ax {item.prescription.rightEye.axis || '0'}</span>
                                <span>L: Sph {item.prescription.leftEye.sphere || '0.00'}, Ax {item.prescription.leftEye.axis || '0'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ink">
                        Rs. {totalItemPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-gray-100 shadow-card p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-serif font-semibold text-ink mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-ink">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-ink">{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-gray-400">
                Add Rs. {(5000 - cartTotal).toLocaleString()} more for free shipping
              </p>
            )}
          </div>
          <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">
            <span className="text-sm font-bold text-ink">Total</span>
            <span className="text-xl font-bold text-ink">Rs. {total.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block text-center w-full py-4 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;