// // import React, { useState, useMemo, useEffect } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import {
// //   Heart,
// //   ShoppingBag,
// //   Zap,
// //   Truck,
// //   ShieldCheck,
// //   RotateCcw,
// //   Check,
// //   X,
// //   Minus,
// //   Plus,
// // } from 'lucide-react';
// // import { getProductById, getRelatedProducts } from '../data/products';
// // import { useCart } from '../context/CartContext';
// // import { useWishlist } from '../context/WishlistContext';
// // import ProductCard from '../components/ProductCard';
// // import QuickViewModal from '../components/QuickViewModal';
// // import NotFound from './NotFound';

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { addToCart } = useCart();
// //   const { isWishlisted, toggleWishlist } = useWishlist();

// //   const product = useMemo(() => getProductById(id), [id]);
// //   const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

// //   const [activeImage, setActiveImage] = useState(0);
// //   const [activeColor, setActiveColor] = useState(product?.colors?.[0] || '');
// //   const [quantity, setQuantity] = useState(1);
// //   const [tab, setTab] = useState('description');
// //   const [quickViewProduct, setQuickViewProduct] = useState(null);
// //   const [added, setAdded] = useState(false);

// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //     setActiveImage(0);
// //     setQuantity(1);
// //     setAdded(false);
// //     if (product) setActiveColor(product.colors?.[0] || '');
// //   }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

// //   if (!product) return <NotFound />;

// //   const wished = isWishlisted(product.id);

// //   const handleAddToCart = () => {
// //     addToCart({ ...product, selectedColor: activeColor }, quantity);
// //     setAdded(true);
// //     setTimeout(() => setAdded(false), 2000);
// //   };

// //   const handleBuyNow = () => {
// //     addToCart({ ...product, selectedColor: activeColor }, quantity);
// //     navigate('/checkout');
// //   };

// //   return (
// //     <div className="bg-white">
// //       <div className="container mx-auto px-4 max-w-7xl py-6">
// //         <div className="text-[11px] text-gray-500 uppercase tracking-wider flex items-center gap-2">
// //           <Link to="/" className="hover:text-ink">Home</Link> /
// //           <Link to="/products" className="hover:text-ink">Products</Link> /
// //           <span className="text-ink">{product.name}</span>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-4 max-w-7xl pb-16">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
// //           {/* Gallery */}
// //           <div>
// //             <div className="aspect-square rounded-3xl overflow-hidden bg-sand shadow-card">
// //               <motion.img
// //                 key={activeImage}
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 src={product.images[activeImage] || product.image}
// //                 alt={product.name}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             {product.images.length > 1 && (
// //               <div className="flex gap-3 mt-4">
// //                 {product.images.map((img, i) => (
// //                   <button
// //                     key={img + i}
// //                     onClick={() => setActiveImage(i)}
// //                     className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
// //                       activeImage === i ? 'border-ink' : 'border-transparent'
// //                     }`}
// //                   >
// //                     <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Info */}
// //           <div>
// //             <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink">{product.name}</h1>

// //             {typeof product.reviews === 'number' && (
// //               <div className="flex items-center gap-4 mt-3">
// //                 <span className="text-xs text-gray-500">{product.reviews} reviews</span>
// //               </div>
// //             )}

// //             <div className="flex items-baseline gap-3 mt-6">
// //               <span className="text-3xl font-bold text-ink">Rs. {product.price.toLocaleString()}</span>
// //             </div>

// //             <p className="text-sm text-gray-600 leading-relaxed mt-6">{product.description}</p>

// //             {/* Specs grid */}
// //             <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-sm">
// //               <div className="flex justify-between border-b border-gray-100 pb-2">
// //                 <span className="text-gray-500">Category</span>
// //                 <span className="font-medium text-ink">{product.category}</span>
// //               </div>
// //               <div className="flex justify-between border-b border-gray-100 pb-2">
// //                 <span className="text-gray-500">Shape</span>
// //                 <span className="font-medium text-ink">{product.shape}</span>
// //               </div>
// //               <div className="flex justify-between border-b border-gray-100 pb-2">
// //                 <span className="text-gray-500">Gender</span>
// //                 <span className="font-medium text-ink">{product.gender}</span>
// //               </div>
// //               <div className="flex justify-between border-b border-gray-100 pb-2">
// //                 <span className="text-gray-500">Made in Taiwan</span>
// //                 <span className="font-medium text-ink flex items-center gap-1">
// //                   {product.madeInTaiwan ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
// //                   {product.madeInTaiwan ? 'Yes' : 'No'}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Colors */}
// //             {product.colors?.length > 0 && (
// //               <div className="mt-6">
// //                 <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
// //                   Color: <span className="font-normal text-gray-500">{activeColor}</span>
// //                 </p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {product.colors.map((color) => (
// //                     <button
// //                       key={color}
// //                       onClick={() => setActiveColor(color)}
// //                       className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
// //                         activeColor === color ? 'bg-ink text-white border-ink' : 'border-gray-300 text-gray-600 hover:border-ink'
// //                       }`}
// //                     >
// //                       {color}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Stock status */}
// //             <div className="mt-6">
// //               <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
// //                 <Check size={14} /> In Stock
// //               </p>
// //             </div>

// //             {/* Quantity + Actions */}
// //             <div className="flex flex-wrap items-center gap-4 mt-6">
// //               <div className="flex items-center border border-gray-300 rounded-full">
// //                 <button
// //                   onClick={() => setQuantity((q) => Math.max(1, q - 1))}
// //                   className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
// //                   aria-label="Decrease quantity"
// //                 >
// //                   <Minus size={14} />
// //                 </button>
// //                 <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
// //                 <button
// //                   onClick={() => setQuantity((q) => Math.min(99, q + 1))}
// //                   className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
// //                   aria-label="Increase quantity"
// //                 >
// //                   <Plus size={14} />
// //                 </button>
// //               </div>

// //               <button
// //                 onClick={() => toggleWishlist(product)}
// //                 className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:border-ink transition-colors"
// //                 aria-label="Toggle wishlist"
// //               >
// //                 <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
// //               </button>
// //             </div>

// //             <div className="flex gap-3 mt-4">
// //               <button
// //                 onClick={handleAddToCart}
// //                 className="flex-1 flex items-center justify-center gap-2 bg-ink text-white text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-black transition-colors"
// //               >
// //                 {added ? <Check size={16} /> : <ShoppingBag size={16} />}
// //                 {added ? 'Added to Cart' : 'Add to Cart'}
// //               </button>
// //               <button
// //                 onClick={handleBuyNow}
// //                 className="flex-1 flex items-center justify-center gap-2 border-2 border-ink text-ink text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-ink hover:text-white transition-colors"
// //               >
// //                 <Zap size={16} /> Buy Now
// //               </button>
// //             </div>

// //             {/* Trust badges */}
// //             <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
// //               <div className="flex flex-col items-center text-center gap-1.5">
// //                 <Truck size={20} className="text-gold" strokeWidth={1.5} />
// //                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">Fast Delivery</span>
// //               </div>
// //               <div className="flex flex-col items-center text-center gap-1.5">
// //                 <ShieldCheck size={20} className="text-gold" strokeWidth={1.5} />
// //                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">1 Yr Warranty</span>
// //               </div>
// //               <div className="flex flex-col items-center text-center gap-1.5">
// //                 <RotateCcw size={20} className="text-gold" strokeWidth={1.5} />
// //                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">Easy Returns</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tabs: Description / Reviews */}
// //         <div className="mt-16">
// //           <div className="flex gap-8 border-b border-gray-200">
// //             {['description', 'reviews'].map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`pb-4 text-xs font-bold uppercase tracking-wider capitalize transition-colors ${
// //                   tab === t ? 'text-ink border-b-2 border-ink' : 'text-gray-400 hover:text-gray-600'
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="py-8 max-w-3xl">
// //             {tab === 'description' && (
// //               <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
// //             )}
// //             {tab === 'reviews' && (
// //               <div>
// //                 <p className="text-sm text-gray-600 mb-6">
// //                   {product.reviews ? `${product.reviews} customer reviews` : 'No reviews yet'}
// //                 </p>
// //                 <p className="text-sm text-gray-500">
// //                   Customer reviews are collected after verified purchases. Be the first to leave detailed
// //                   feedback on fit, comfort, and quality for this frame.
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Related products */}
// //         {related.length > 0 && (
// //           <div className="mt-16">
// //             <h2 className="text-2xl font-serif font-semibold text-ink mb-8">You May Also Like</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
// //               {related.map((p) => (
// //                 <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
// //     </div>
// //   );
// // };

// // export default ProductDetail;




// // src/pages/ProductDetail.jsx
// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Heart,
//   ShoppingBag,
//   Zap,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   Check,
//   X,
//   Minus,
//   Plus,
//   Eye,
// } from 'lucide-react';
// import { getProductById, getRelatedProducts } from '../data/products';
// import { useCart } from '../context/CartContext';
// import { useWishlist } from '../context/WishlistContext';
// import ProductCard from '../components/ProductCard';
// import QuickViewModal from '../components/QuickViewModal';
// import PrescriptionForm from '../components/PrescriptionForm';
// import NotFound from './NotFound';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { isWishlisted, toggleWishlist } = useWishlist();

//   const product = useMemo(() => getProductById(id), [id]);
//   const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

//   const [activeImage, setActiveImage] = useState(0);
//   const [activeColor, setActiveColor] = useState(product?.colors?.[0] || '');
//   const [quantity, setQuantity] = useState(1);
//   const [tab, setTab] = useState('description');
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [added, setAdded] = useState(false);

//   // Prescription state
//   const [prescription, setPrescription] = useState(null);
//   const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

//   // Calculate price with extra charge
//   const basePrice = product ? product.price : 0;
//   const extraCharge = prescription?.extraCharge || 0;
//   const finalPrice = basePrice + extraCharge;

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setActiveImage(0);
//     setQuantity(1);
//     setAdded(false);
//     setPrescription(null); // reset prescription on product change
//     if (product) setActiveColor(product.colors?.[0] || '');
//   }, [id, product]);

//   if (!product) return <NotFound />;

//   const wished = isWishlisted(product.id);

//   const handleAddToCart = () => {
//     addToCart(
//       {
//         ...product,
//         selectedColor: activeColor,
//         prescription: prescription,
//         finalPrice: finalPrice, // override price for this cart item
//       },
//       quantity
//     );
//     setAdded(true);
//     setTimeout(() => setAdded(false), 2000);
//   };

//   const handleBuyNow = () => {
//     addToCart(
//       {
//         ...product,
//         selectedColor: activeColor,
//         prescription: prescription,
//         finalPrice: finalPrice,
//       },
//       quantity
//     );
//     navigate('/checkout');
//   };

//   return (
//     <div className="bg-white">
//       {/* Breadcrumb */}
//       <div className="container mx-auto px-4 max-w-7xl py-6">
//         <div className="text-[11px] text-gray-500 uppercase tracking-wider flex items-center gap-2">
//           <Link to="/" className="hover:text-ink">Home</Link> /
//           <Link to="/products" className="hover:text-ink">Products</Link> /
//           <span className="text-ink">{product.name}</span>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
//           {/* Gallery */}
//           <div>
//             <div className="aspect-square rounded-3xl overflow-hidden bg-sand shadow-card">
//               <motion.img
//                 key={activeImage}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 src={product.images[activeImage] || product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {product.images.length > 1 && (
//               <div className="flex gap-3 mt-4">
//                 {product.images.map((img, i) => (
//                   <button
//                     key={img + i}
//                     onClick={() => setActiveImage(i)}
//                     className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
//                       activeImage === i ? 'border-ink' : 'border-transparent'
//                     }`}
//                   >
//                     <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Info */}
//           <div>
//             <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink">{product.name}</h1>

//             {typeof product.reviews === 'number' && (
//               <div className="flex items-center gap-4 mt-3">
//                 <span className="text-xs text-gray-500">{product.reviews} reviews</span>
//               </div>
//             )}

//             <div className="flex items-baseline gap-3 mt-6">
//               <span className="text-3xl font-bold text-ink">
//                 Rs. {finalPrice.toLocaleString()}
//               </span>
//               {extraCharge > 0 && (
//                 <span className="text-sm text-gray-400 line-through">
//                   Rs. {basePrice.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             <p className="text-sm text-gray-600 leading-relaxed mt-6">{product.description}</p>

//             {/* Specs grid */}
//             <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-sm">
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500">Category</span>
//                 <span className="font-medium text-ink">{product.category}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500">Shape</span>
//                 <span className="font-medium text-ink">{product.shape}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500">Gender</span>
//                 <span className="font-medium text-ink">{product.gender}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500">Made in Taiwan</span>
//                 <span className="font-medium text-ink flex items-center gap-1">
//                   {product.madeInTaiwan ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
//                   {product.madeInTaiwan ? 'Yes' : 'No'}
//                 </span>
//               </div>
//             </div>

//             {/* Colors */}
//             {product.colors?.length > 0 && (
//               <div className="mt-6">
//                 <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
//                   Color: <span className="font-normal text-gray-500">{activeColor}</span>
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {product.colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setActiveColor(color)}
//                       className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
//                         activeColor === color ? 'bg-ink text-white border-ink' : 'border-gray-300 text-gray-600 hover:border-ink'
//                       }`}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Prescription section */}
//             {product.hasPrescription && (
//               <div className="mt-6 border-t border-gray-100 pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-semibold text-ink">Prescription Lenses</p>
//                     <p className="text-xs text-gray-500">Add prescription &amp; choose lens type. Extra charges apply.</p>
//                   </div>
//                   <button
//                     onClick={() => setShowPrescriptionForm(true)}
//                     className="px-4 py-2 bg-ink text-white text-xs font-bold rounded-full hover:bg-black transition-colors flex items-center gap-1"
//                   >
//                     <Eye size={14} /> {prescription ? 'Edit' : 'Add'} Prescription
//                   </button>
//                 </div>
//                 {prescription && (
//                   <div className="mt-3 bg-cream/40 rounded-xl p-3 text-sm">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium text-ink">{prescription.lensLabel}</span>
//                       <span className="text-xs text-gray-500">+PKR {prescription.extraCharge}</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
//                       <div>
//                         <span className="font-semibold">Right:</span> Sph {prescription.rightEye.sphere || '0.00'}, 
//                         Axis {prescription.rightEye.axis || '0'}
//                       </div>
//                       <div>
//                         <span className="font-semibold">Left:</span> Sph {prescription.leftEye.sphere || '0.00'}, 
//                         Axis {prescription.leftEye.axis || '0'}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Stock status */}
//             <div className="mt-6">
//               <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
//                 <Check size={14} /> In Stock
//               </p>
//             </div>

//             {/* Quantity + Actions */}
//             <div className="flex flex-wrap items-center gap-4 mt-6">
//               <div className="flex items-center border border-gray-300 rounded-full">
//                 <button
//                   onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                   className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
//                   aria-label="Decrease quantity"
//                 >
//                   <Minus size={14} />
//                 </button>
//                 <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity((q) => Math.min(99, q + 1))}
//                   className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
//                   aria-label="Increase quantity"
//                 >
//                   <Plus size={14} />
//                 </button>
//               </div>

//               <button
//                 onClick={() => toggleWishlist(product)}
//                 className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:border-ink transition-colors"
//                 aria-label="Toggle wishlist"
//               >
//                 <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
//               </button>
//             </div>

//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 flex items-center justify-center gap-2 bg-ink text-white text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-black transition-colors"
//               >
//                 {added ? <Check size={16} /> : <ShoppingBag size={16} />}
//                 {added ? 'Added to Cart' : 'Add to Cart'}
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 flex items-center justify-center gap-2 border-2 border-ink text-ink text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-ink hover:text-white transition-colors"
//               >
//                 <Zap size={16} /> Buy Now
//               </button>
//             </div>

//             {/* Trust badges */}
//             <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
//               <div className="flex flex-col items-center text-center gap-1.5">
//                 <Truck size={20} className="text-gold" strokeWidth={1.5} />
//                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">Fast Delivery</span>
//               </div>
//               <div className="flex flex-col items-center text-center gap-1.5">
//                 <ShieldCheck size={20} className="text-gold" strokeWidth={1.5} />
//                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">1 Yr Warranty</span>
//               </div>
//               <div className="flex flex-col items-center text-center gap-1.5">
//                 <RotateCcw size={20} className="text-gold" strokeWidth={1.5} />
//                 <span className="text-[10px] text-gray-500 uppercase tracking-wide">Easy Returns</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="mt-16">
//           <div className="flex gap-8 border-b border-gray-200">
//             {['description', 'reviews'].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`pb-4 text-xs font-bold uppercase tracking-wider capitalize transition-colors ${
//                   tab === t ? 'text-ink border-b-2 border-ink' : 'text-gray-400 hover:text-gray-600'
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="py-8 max-w-3xl">
//             {tab === 'description' && (
//               <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
//             )}
//             {tab === 'reviews' && (
//               <div>
//                 <p className="text-sm text-gray-600 mb-6">
//                   {product.reviews ? `${product.reviews} customer reviews` : 'No reviews yet'}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Customer reviews are collected after verified purchases. Be the first to leave detailed
//                   feedback on fit, comfort, and quality for this frame.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related products */}
//         {related.length > 0 && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-serif font-semibold text-ink mb-8">You May Also Like</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
//               {related.map((p) => (
//                 <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Prescription Form Modal */}
//       <PrescriptionForm
//         isOpen={showPrescriptionForm}
//         onClose={() => setShowPrescriptionForm(false)}
//         onSave={(data) => setPrescription(data)}
//         initialData={prescription}
//       />

//       <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
//     </div>
//   );
// };

// export default ProductDetail;
























// src/pages/ProductDetail.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  X,
  Minus,
  Plus,
  Eye,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import PrescriptionForm from '../components/PrescriptionForm';
import NotFound from './NotFound';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = useMemo(() => getProductById(id), [id]);
  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [added, setAdded] = useState(false);

  // Prescription state
  const [prescription, setPrescription] = useState(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  // Calculate price with extra charge
  const basePrice = product ? product.price : 0;
  const extraCharge = prescription?.extraCharge || 0;
  const finalPrice = basePrice + extraCharge;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImage(0);
    setQuantity(1);
    setAdded(false);
    setPrescription(null); // reset prescription on product change
    if (product) setActiveColor(product.colors?.[0] || '');
  }, [id, product]);

  if (!product) return <NotFound />;

  const wished = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        selectedColor: activeColor,
        prescription: prescription,
        finalPrice: finalPrice, // override price for this cart item
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        ...product,
        selectedColor: activeColor,
        prescription: prescription,
        finalPrice: finalPrice,
      },
      quantity
    );
    navigate('/checkout');
  };

  return (
    <div className="bg-white">
      {/*
        Mobile-only override: single column for the "You May Also Like" grid
        below, matching the same fix applied on Home and the Products listing
        page. Plain CSS media query + !important so it can't be lost to any
        build/purge quirk. Everything above md breakpoint is untouched.
      */}
      <style>{`
        @media (max-width: 767px) {
          .iq-related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Link to="/" className="hover:text-ink">Home</Link> /
          <Link to="/products" className="hover:text-ink">Products</Link> /
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-sand shadow-card">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-ink' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink">{product.name}</h1>

            {typeof product.reviews === 'number' && (
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-gray-500">{product.reviews} reviews</span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-bold text-ink">
                Rs. {finalPrice.toLocaleString()}
              </span>
              {extraCharge > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {basePrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mt-6">{product.description}</p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-ink">{product.category}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Shape</span>
                <span className="font-medium text-ink">{product.shape}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Gender</span>
                <span className="font-medium text-ink">{product.gender}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Made in Taiwan</span>
                <span className="font-medium text-ink flex items-center gap-1">
                  {product.madeInTaiwan ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
                  {product.madeInTaiwan ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Color: <span className="font-normal text-gray-500">{activeColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                        activeColor === color ? 'bg-ink text-white border-ink' : 'border-gray-300 text-gray-600 hover:border-ink'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prescription section */}
            {product.hasPrescription && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">Prescription Lenses</p>
                    <p className="text-xs text-gray-500">Add prescription &amp; choose lens type. Extra charges apply.</p>
                  </div>
                  <button
                    onClick={() => setShowPrescriptionForm(true)}
                    className="px-4 py-2 bg-ink text-white text-xs font-bold rounded-full hover:bg-black transition-colors flex items-center gap-1"
                  >
                    <Eye size={14} /> {prescription ? 'Edit' : 'Add'} Prescription
                  </button>
                </div>
                {prescription && (
                  <div className="mt-3 bg-cream/40 rounded-xl p-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-ink">{prescription.lensLabel}</span>
                      <span className="text-xs text-gray-500">+PKR {prescription.extraCharge}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                      <div>
                        <span className="font-semibold">Right:</span> Sph {prescription.rightEye.sphere || '0.00'}, 
                        Axis {prescription.rightEye.axis || '0'}
                      </div>
                      <div>
                        <span className="font-semibold">Left:</span> Sph {prescription.leftEye.sphere || '0.00'}, 
                        Axis {prescription.leftEye.axis || '0'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stock status */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
                <Check size={14} /> In Stock
              </p>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:border-ink transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
              </button>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-ink text-white text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-black transition-colors"
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-ink text-ink text-xs font-bold uppercase tracking-wider py-4 rounded-full hover:bg-ink hover:text-white transition-colors"
              >
                <Zap size={16} /> Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck size={20} className="text-gold" strokeWidth={1.5} />
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck size={20} className="text-gold" strokeWidth={1.5} />
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">1 Yr Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw size={20} className="text-gold" strokeWidth={1.5} />
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-200">
            {['description', 'reviews'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-4 text-xs font-bold uppercase tracking-wider capitalize transition-colors ${
                  tab === t ? 'text-ink border-b-2 border-ink' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">
            {tab === 'description' && (
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            )}
            {tab === 'reviews' && (
              <div>
                <p className="text-sm text-gray-600 mb-6">
                  {product.reviews ? `${product.reviews} customer reviews` : 'No reviews yet'}
                </p>
                <p className="text-sm text-gray-500">
                  Customer reviews are collected after verified purchases. Be the first to leave detailed
                  feedback on fit, comfort, and quality for this frame.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold text-ink mb-8">You May Also Like</h2>
            <div className="iq-related-grid grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prescription Form Modal */}
      <PrescriptionForm
        isOpen={showPrescriptionForm}
        onClose={() => setShowPrescriptionForm(false)}
        onSave={(data) => setPrescription(data)}
        initialData={prescription}
      />

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default ProductDetail;