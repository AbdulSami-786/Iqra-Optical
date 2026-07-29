// import React, { useMemo, useState } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { Search as SearchIcon } from 'lucide-react';
// import { searchProducts } from '../data/products';
// import ProductCard from '../components/ProductCard';
// import QuickViewModal from '../components/QuickViewModal';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q') || '';
//   const results = useMemo(() => searchProducts(query), [query]);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   return (
//     <div className="container mx-auto px-4 max-w-7xl py-12">
//       <div className="flex items-center gap-2 mb-2 text-gray-500">
//         <SearchIcon size={16} />
//         <span className="text-xs uppercase tracking-wider font-semibold">Search Results</span>
//       </div>
//       <h1 className="text-3xl font-serif font-semibold text-ink mb-2">"{query}"</h1>
//       <p className="text-sm text-gray-500 mb-10">{results.length} product{results.length !== 1 ? 's' : ''} found</p>

//       {results.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-lg font-serif text-ink mb-2">No results found</p>
//           <p className="text-sm text-gray-500 mb-6">Try searching by brand, shape, color, or category.</p>
//           <Link to="/products" className="px-6 py-3 bg-ink text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
//             Browse All Products
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
//           {results.map((p) => (
//             <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
//           ))}
//         </div>
//       )}

//       <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
//     </div>
//   );
// };

// export default SearchResults;


















import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useMemo(() => searchProducts(query), [query]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      {/*
        Mobile-only override: single product per row under 768px, matching
        Home / Products / ProductDetail. Plain CSS media query + !important
        so it can't be lost to any build/purge quirk. Tablet/desktop layout
        (grid-cols-2 / lg:grid-cols-4) is untouched.
      */}
      <style>{`
        @media (max-width: 767px) {
          .iq-search-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="flex items-center gap-2 mb-2 text-gray-500">
        <SearchIcon size={16} />
        <span className="text-xs uppercase tracking-wider font-semibold">Search Results</span>
      </div>
      <h1 className="text-3xl font-serif font-semibold text-ink mb-2">"{query}"</h1>
      <p className="text-sm text-gray-500 mb-10">{results.length} product{results.length !== 1 ? 's' : ''} found</p>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-serif text-ink mb-2">No results found</p>
          <p className="text-sm text-gray-500 mb-6">Try searching by brand, shape, color, or category.</p>
          <Link to="/products" className="px-6 py-3 bg-ink text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="iq-search-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default SearchResults;