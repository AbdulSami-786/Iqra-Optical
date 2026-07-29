// import React, { useState, useMemo, useCallback, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Truck, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';
// import ProductCard from '../components/ProductCard';
// import QuickViewModal from '../components/QuickViewModal';
// import {
//   getFeaturedProducts,
//   getNewArrivals,
//   getBestSellers,
//   getFilterOptions,
// } from '../data/products';

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const staggerParent = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const heroSlides = [
//   { src: '/banner/fix.1.jpeg', alt: 'Elevate your vision - IQRA Optics premium eyewear' },
//   { src: '/banner/fix.2.jpeg', alt: 'Perfect vision, perfect style - IQRA Optics eyewear collection' },
//   { src: '/banner/fix.3.jpeg', alt: 'IQRA Optics luxury eyewear' },
// ];

// const perks = [
//   { icon: Truck, title: 'Free Shipping', desc: 'On orders over Rs. 5,000' },
//     { icon: ShieldCheck, title: 'Prescription Accuracy', desc: 'Precision lenses for crystal-clear vision' },
//   { icon: Clock, title: 'premium quality', desc: 'good quality material' },
//   { icon: Award, title: 'Certified Lenses', desc: 'UV400 & anti-scratch coated' },
// ];

// const Section = ({ title, subtitle, children, viewAllLink }) => (
//   <section className="py-16 md:py-20">
//     <div className="container mx-auto px-4 max-w-7xl">
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//         className="flex items-end justify-between mb-10 gap-4"
//       >
//         <div>
//           <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{subtitle}</span>
//           <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">{title}</h2>
//         </div>
//         {viewAllLink && (
//           <Link
//             to={viewAllLink}
//             className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink hover:text-gold transition-colors group"
//           >
//             View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         )}
//       </motion.div>
//       {children}
//     </div>
//   </section>
// );

// const Home = () => {
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [heroIndex, setHeroIndex] = useState(0);
//   const featured = useMemo(() => getFeaturedProducts(8), []);
//   const newArrivals = useMemo(() => getNewArrivals(4), []);
//   const bestSellers = useMemo(() => getBestSellers(4), []);
//   const { categories } = useMemo(() => getFilterOptions(), []);

//   const handleQuickView = useCallback((product) => setQuickViewProduct(product), []);
//   const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setHeroIndex((i) => (i + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-white">
//       {/* HERO */}
//       <section className="relative w-full h-dvh overflow-hidden bg-ink">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={heroSlides[heroIndex].src}
//             src={heroSlides[heroIndex].src}
//             alt={heroSlides[heroIndex].alt}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8, ease: 'easeInOut' }}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         </AnimatePresence>
//         <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {heroSlides.map((slide, i) => (
//             <button
//               key={slide.src}
//               onClick={() => setHeroIndex(i)}
//               aria-label={`Go to slide ${i + 1}`}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 i === heroIndex ? 'w-8 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* PERKS */}
//       <section className="border-b border-gray-100">
//         <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
//           {perks.map((perk) => (
//             <div key={perk.title} className="flex items-center gap-3">
//               <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
//                 <perk.icon size={20} className="text-gold" strokeWidth={1.5} />
//               </div>
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-ink">{perk.title}</p>
//                 <p className="text-[11px] text-gray-500">{perk.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="py-16 md:py-20 bg-cream/50">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Shop by Category</span>
//             <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">Find Your Perfect Pair</h2>
//           </motion.div>
//           <motion.div
//             variants={staggerParent}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-5"
//           >
//             {categories.map((cat, i) => (
//               <motion.div key={cat} variants={fadeUp}>
//                 <Link
//                   to={`/products?category=${encodeURIComponent(cat)}`}
//                   className="group relative block rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-soft transition-shadow duration-500"
//                 >
//                   <img
//                     src={`/${((i % 8) + 1) * 3}.1.jpg`}
//                     alt={cat}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
//                   <div className="absolute bottom-5 left-5">
//                     <p className="text-white font-serif text-xl font-semibold">{cat}</p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* FEATURED */}
//       <Section title="Featured Products" subtitle="Handpicked" viewAllLink="/products">
//         <motion.div
//           variants={staggerParent}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
//         >
//           {featured.map((p) => (
//             <motion.div key={p.id} variants={fadeUp}>
//               <ProductCard product={p} onQuickView={handleQuickView} />
//             </motion.div>
//           ))}
//         </motion.div>
//       </Section>

//       {/* BANNER */}
//       <section className="py-4">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="relative rounded-3xl overflow-hidden min-h-[320px]">
//             <img src="/b3.jpeg" alt="Seasonal offer" className="absolute inset-0 w-full h-full object-cover" />
//           </div>
//         </div>
//       </section>

//       {/* NEW ARRIVALS */}
//       <Section title="New Arrivals" subtitle="Just Landed" viewAllLink="/products?sort=newest">
//         <motion.div
//           variants={staggerParent}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6"
//         >
//           {newArrivals.map((p) => (
//             <motion.div key={p.id} variants={fadeUp}>
//               <ProductCard product={p} onQuickView={handleQuickView} />
//             </motion.div>
//           ))}
//         </motion.div>
//       </Section>

//       {/* BEST SELLERS */}
//       <Section title="Best Sellers" subtitle="Customer Favorites" viewAllLink="/products?sort=popular">
//         <motion.div
//           variants={staggerParent}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6"
//         >
//           {bestSellers.map((p) => (
//             <motion.div key={p.id} variants={fadeUp}>
//               <ProductCard product={p} onQuickView={handleQuickView} />
//             </motion.div>
//           ))}
//         </motion.div>
//       </Section>

//       {/* NEWSLETTER STRIP */}
//       <section className="bg-ink py-16">
//         <div className="container mx-auto px-4 max-w-3xl text-center">
//           <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">Stay in the Loop</h3>
//           <p className="text-gray-400 text-sm mb-8">
//             Get early access to new collections, exclusive discounts, and eyewear styling tips.
//           </p>
//           <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <input
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 outline-none focus:border-gold transition-colors text-sm"
//             />
//             <button
//               type="submit"
//               className="px-7 py-3.5 bg-gold text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-all duration-300"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>

//       <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
//     </div>
//   );
// };

// export default Home;


























import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getFilterOptions,
} from '../data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const heroSlides = [
  { src: '/banner/fix.1.jpeg', alt: 'Elevate your vision - IQRA Optics premium eyewear' },
  { src: '/banner/fix.2.jpeg', alt: 'Perfect vision, perfect style - IQRA Optics eyewear collection' },
  { src: '/banner/fix.3.jpeg', alt: 'IQRA Optics luxury eyewear' },
];

const perks = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over Rs. 5,000' },
  { icon: ShieldCheck, title: 'Prescription Accuracy', desc: 'Precision lenses for crystal-clear vision' },
  { icon: Clock, title: 'premium quality', desc: 'good quality material' },
  { icon: Award, title: 'Certified Lenses', desc: 'UV400 & anti-scratch coated' },
];

const Section = ({ title, subtitle, children, viewAllLink }) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4 max-w-7xl">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex items-end justify-between mb-10 gap-4"
      >
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{subtitle}</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">{title}</h2>
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink hover:text-gold transition-colors group"
          >
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const featured = useMemo(() => getFeaturedProducts(8), []);
  const newArrivals = useMemo(() => getNewArrivals(4), []);
  const bestSellers = useMemo(() => getBestSellers(4), []);
  const { categories } = useMemo(() => getFilterOptions(), []);

  const handleQuickView = useCallback((product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/*
        Hard CSS overrides — plain media queries with !important instead of
        relying only on Tailwind's responsive utility classes. This guarantees
        the mobile layout regardless of any build/purge/specificity issue
        elsewhere in the project.
      */}
      <style>{`
        .iq-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #15171c;
          height: 100dvh;
        }
        .iq-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 767px) {
          .iq-hero {
            height: auto !important;
            min-height: 0 !important;
          }
          .iq-hero img {
            position: static !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
            object-fit: cover !important;
          }
        }

        .iq-product-grid {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 1.5rem;
        }
        @media (max-width: 767px) {
          .iq-product-grid {
            display: flex !important;
            grid-template-columns: none !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            flex-wrap: nowrap !important;
            scroll-snap-type: x mandatory;
            padding-bottom: 10px;
            -webkit-overflow-scrolling: touch;
          }
          .iq-product-item {
            flex: 0 0 auto !important;
            width: 68vw !important;
            scroll-snap-align: start;
          }
          .iq-product-grid::-webkit-scrollbar {
            height: 6px;
          }
          .iq-product-grid::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.3);
            border-radius: 9999px;
          }
          .iq-product-grid {
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.3) transparent;
          }
        }

        .iq-banner-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 767px) {
          .iq-banner-wrap {
            min-height: 0 !important;
          }
          .iq-banner-wrap img {
            position: static !important;
            object-fit: contain !important;
            height: auto !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="iq-hero">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroSlides[heroIndex].src}
            src={heroSlides[heroIndex].src}
            alt={heroSlides[heroIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.src}
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-8 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* PERKS */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                <perk.icon size={20} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink">{perk.title}</p>
                <p className="text-[11px] text-gray-500">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-20 bg-cream/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Shop by Category</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">Find Your Perfect Pair</h2>
          </motion.div>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {categories.map((cat, i) => (
              <motion.div key={cat} variants={fadeUp}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-soft transition-shadow duration-500"
                >
                  <img
                    src={`/${((i % 8) + 1) * 3}.1.jpg`}
                    alt={cat}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-white font-serif text-xl font-semibold">{cat}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <Section title="Featured Products" subtitle="Handpicked" viewAllLink="/products">
                  <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="iq-product-grid"
          >
            {featured.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="iq-product-item">
                <ProductCard product={p} onQuickView={handleQuickView} />
              </motion.div>
            ))}
          </motion.div>
      </Section>

      {/* BANNER */}
      <section className="py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="iq-banner-wrap relative rounded-3xl overflow-hidden min-h-[320px]">
            <img src="/b3.jpeg" alt="Seasonal offer" className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <Section title="New Arrivals" subtitle="Just Landed" viewAllLink="/products?sort=newest">
                  <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="iq-product-grid"
          >
            {newArrivals.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="iq-product-item">
                <ProductCard product={p} onQuickView={handleQuickView} />
              </motion.div>
            ))}
          </motion.div>
      </Section>

      {/* BEST SELLERS */}
      <Section title="Best Sellers" subtitle="Customer Favorites" viewAllLink="/products?sort=popular">
                  <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="iq-product-grid"
          >
            {bestSellers.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="iq-product-item">
                <ProductCard product={p} onQuickView={handleQuickView} />
              </motion.div>
            ))}
          </motion.div>
      </Section>

      {/* NEWSLETTER STRIP */}
      <section className="bg-ink py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">Stay in the Loop</h3>
          <p className="text-gray-400 text-sm mb-8">
            Get early access to new collections, exclusive discounts, and eyewear styling tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 outline-none focus:border-gold transition-colors text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-gold text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
    </div>
  );
};

export default Home;