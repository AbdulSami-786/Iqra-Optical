// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
// import ProductCard from '../components/ProductCard';
// import ProductCardSkeleton from '../components/ProductCardSkeleton';
// import QuickViewModal from '../components/QuickViewModal';
// import { getAllProducts, getFilterOptions } from '../data/products';

// const PAGE_SIZE = 9;

// const FilterGroup = ({ title, options, selected, onToggle }) => (
//   <div className="border-b border-gray-100 py-5">
//     <p className="text-xs font-bold uppercase tracking-wider text-ink mb-4">{title}</p>
//     <div className="flex flex-wrap gap-2">
//       {options.map((opt) => {
//         const active = selected.includes(opt);
//         return (
//           <button
//             key={opt}
//             onClick={() => onToggle(opt)}
//             className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
//               active
//                 ? 'bg-ink text-white border-ink'
//                 : 'bg-white text-gray-600 border-gray-200 hover:border-ink'
//             }`}
//           >
//             {opt}
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );

// const emptyFilters = () => ({
//   categories: [],
//   shapes: [],
//   genders: [],
// });

// const Product = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const allProducts = useMemo(() => getAllProducts(), []);
//   const filterOptions = useMemo(() => getFilterOptions(), []);

//   const [filters, setFilters] = useState(emptyFilters());
//   const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
//   const [page, setPage] = useState(1);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [priceMax, setPriceMax] = useState(filterOptions.priceRange.max);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   // Pick up ?category= from links elsewhere (e.g. Home page category tiles)
//   useEffect(() => {
//     const cat = searchParams.get('category');
//     if (cat) {
//       setFilters((f) => ({ ...f, categories: [cat] }));
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // Simulate a brief loading state for skeletons, then never again per session
//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(t);
//   }, []);

//   const toggleFilter = useCallback((group, value) => {
//     setFilters((prev) => {
//       const list = prev[group];
//       const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
//       return { ...prev, [group]: next };
//     });
//     setPage(1);
//   }, []);

//   const clearFilters = () => {
//     setFilters(emptyFilters());
//     setPriceMax(filterOptions.priceRange.max);
//     setPage(1);
//     setSearchParams({});
//   };

//   const filtered = useMemo(() => {
//     let list = allProducts.filter((p) => {
//       if (filters.categories.length && !filters.categories.includes(p.category)) return false;
//       if (filters.shapes.length && !filters.shapes.includes(p.shape)) return false;
//       if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
//       if (p.price > priceMax) return false;
//       return true;
//     });

//     switch (sort) {
//       case 'price-low':
//         list = [...list].sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         list = [...list].sort((a, b) => b.price - a.price);
//         break;
//       case 'newest':
//         list = [...list].sort((a, b) => b.id - a.id);
//         break;
//       case 'popular':
//         list = [...list].sort((a, b) => b.reviews - a.reviews);
//         break;
//       default:
//         break;
//     }
//     return list;
//   }, [allProducts, filters, sort, priceMax]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [totalPages]); // eslint-disable-line react-hooks/exhaustive-deps

//   const activeFilterCount =
//     filters.categories.length +
//     filters.shapes.length +
//     filters.genders.length;

//   const FiltersPanel = (
//     <div>
//       <FilterGroup title="Category" options={filterOptions.categories} selected={filters.categories} onToggle={(v) => toggleFilter('categories', v)} />
//       <FilterGroup title="Shape" options={filterOptions.shapes} selected={filters.shapes} onToggle={(v) => toggleFilter('shapes', v)} />
//       <FilterGroup title="Gender" options={filterOptions.genders} selected={filters.genders} onToggle={(v) => toggleFilter('genders', v)} />

//       <div className="py-5 border-b border-gray-100">
//         <p className="text-xs font-bold uppercase tracking-wider text-ink mb-4">Max Price: Rs. {priceMax.toLocaleString()}</p>
//         <input
//           type="range"
//           min={filterOptions.priceRange.min}
//           max={filterOptions.priceRange.max}
//           value={priceMax}
//           onChange={(e) => {
//             setPriceMax(Number(e.target.value));
//             setPage(1);
//           }}
//           className="w-full accent-ink"
//         />
//       </div>

//       {activeFilterCount > 0 && (
//         <button
//           onClick={clearFilters}
//           className="mt-2 w-full text-center text-[11px] font-semibold uppercase tracking-wider text-red-600 hover:text-red-800 py-2"
//         >
//           Clear All Filters ({activeFilterCount})
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="bg-cream/60 py-12 border-b border-gray-100">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Our Collection</span>
//           <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">All Eyewear</h1>
//           <p className="text-sm text-gray-500 mt-2">{filtered.length} products found</p>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
//           {/* Desktop filters */}
//           <aside className="hidden lg:block">
//             <div className="sticky top-28">
//               <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink mb-2">
//                 <SlidersHorizontal size={16} /> Filters
//               </h3>
//               {FiltersPanel}
//             </div>
//           </aside>

//           {/* Mobile filter drawer */}
//           <AnimatePresence>
//             {drawerOpen && (
//               <motion.div
//                 className="fixed inset-0 z-[150] lg:hidden"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
//                 <motion.div
//                   className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white overflow-y-auto p-6"
//                   initial={{ x: '100%' }}
//                   animate={{ x: 0 }}
//                   exit={{ x: '100%' }}
//                   transition={{ type: 'tween', duration: 0.3 }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Filters</h3>
//                     <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">
//                       <X size={20} />
//                     </button>
//                   </div>
//                   {FiltersPanel}
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div>
//             {/* Toolbar */}
//             <div className="flex items-center justify-between mb-8 gap-3">
//               <button
//                 onClick={() => setDrawerOpen(true)}
//                 className="lg:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-wider border border-gray-300 rounded-full px-4 py-2.5"
//               >
//                 <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
//               </button>
//               <div className="relative ml-auto">
//                 <select
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                   className="appearance-none pl-4 pr-9 py-2.5 text-xs font-semibold uppercase tracking-wider border border-gray-300 rounded-full bg-white outline-none cursor-pointer"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="newest">Newest</option>
//                   <option value="popular">Most Popular</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                 </select>
//                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
//               </div>
//             </div>

//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <ProductCardSkeleton key={i} />
//                 ))}
//               </div>
//             ) : paged.length === 0 ? (
//               <div className="text-center py-24">
//                 <p className="text-lg font-serif text-ink mb-2">No products match your filters</p>
//                 <p className="text-sm text-gray-500 mb-6">Try adjusting or clearing your filters.</p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-6 py-3 bg-ink text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <motion.div
//                 layout
//                 className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
//               >
//                 {paged.map((p) => (
//                   <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
//                 ))}
//               </motion.div>
//             )}

//             {/* Pagination */}
//             {!loading && totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-14">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-gray-50"
//                 >
//                   ‹
//                 </button>
//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setPage(i + 1)}
//                     className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
//                       page === i + 1 ? 'bg-ink text-white' : 'border border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-gray-50"
//                 >
//                   ›
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
//     </div>
//   );
// };

// export default Product;













import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import QuickViewModal from '../components/QuickViewModal';
import { getAllProducts, getFilterOptions } from '../data/products';

const PAGE_SIZE = 9;

const FilterGroup = ({ title, options, selected, onToggle }) => (
  <div className="border-b border-gray-100 py-5">
    <p className="text-xs font-bold uppercase tracking-wider text-ink mb-4">{title}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
              active
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-gray-600 border-gray-200 hover:border-ink'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const emptyFilters = () => ({
  categories: [],
  shapes: [],
  genders: [],
});

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useMemo(() => getAllProducts(), []);
  const filterOptions = useMemo(() => getFilterOptions(), []);

  const [filters, setFilters] = useState(emptyFilters());
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [priceMax, setPriceMax] = useState(filterOptions.priceRange.max);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Pick up ?category= from links elsewhere (e.g. Home page category tiles)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters((f) => ({ ...f, categories: [cat] }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Simulate a brief loading state for skeletons, then never again per session
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const toggleFilter = useCallback((group, value) => {
    setFilters((prev) => {
      const list = prev[group];
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [group]: next };
    });
    setPage(1);
  }, []);

  const clearFilters = () => {
    setFilters(emptyFilters());
    setPriceMax(filterOptions.priceRange.max);
    setPage(1);
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.shapes.length && !filters.shapes.includes(p.shape)) return false;
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
      if (p.price > priceMax) return false;
      return true;
    });

    switch (sort) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    return list;
  }, [allProducts, filters, sort, priceMax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeFilterCount =
    filters.categories.length +
    filters.shapes.length +
    filters.genders.length;

  const FiltersPanel = (
    <div>
      <FilterGroup title="Category" options={filterOptions.categories} selected={filters.categories} onToggle={(v) => toggleFilter('categories', v)} />
      <FilterGroup title="Shape" options={filterOptions.shapes} selected={filters.shapes} onToggle={(v) => toggleFilter('shapes', v)} />
      <FilterGroup title="Gender" options={filterOptions.genders} selected={filters.genders} onToggle={(v) => toggleFilter('genders', v)} />

      <div className="py-5 border-b border-gray-100">
        <p className="text-xs font-bold uppercase tracking-wider text-ink mb-4">Max Price: Rs. {priceMax.toLocaleString()}</p>
        <input
          type="range"
          min={filterOptions.priceRange.min}
          max={filterOptions.priceRange.max}
          value={priceMax}
          onChange={(e) => {
            setPriceMax(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-ink"
        />
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="mt-2 w-full text-center text-[11px] font-semibold uppercase tracking-wider text-red-600 hover:text-red-800 py-2"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/*
        Mobile-only override: force a single product per row under 768px.
        Plain CSS + !important (not just Tailwind classes) so it can't be
        lost to any build/purge quirk. Tablet/desktop layout (grid-cols-2 /
        md:grid-cols-3 from Tailwind) is completely untouched.
      */}
      <style>{`
        @media (max-width: 767px) {
          .iq-listing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="bg-cream/60 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Our Collection</span>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">All Eyewear</h1>
          <p className="text-sm text-gray-500 mt-2">{filtered.length} products found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink mb-2">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              {FiltersPanel}
            </div>
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                className="fixed inset-0 z-[150] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
                <motion.div
                  className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white overflow-y-auto p-6"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Filters</h3>
                    <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">
                      <X size={20} />
                    </button>
                  </div>
                  {FiltersPanel}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-wider border border-gray-300 rounded-full px-4 py-2.5"
              >
                <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <div className="relative ml-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2.5 text-xs font-semibold uppercase tracking-wider border border-gray-300 rounded-full bg-white outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>

            {loading ? (
              <div className="iq-listing-grid grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : paged.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-lg font-serif text-ink mb-2">No products match your filters</p>
                <p className="text-sm text-gray-500 mb-6">Try adjusting or clearing your filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-ink text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="iq-listing-grid grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
              >
                {paged.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-gray-50"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      page === i + 1 ? 'bg-ink text-white' : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-gray-50"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default Product;