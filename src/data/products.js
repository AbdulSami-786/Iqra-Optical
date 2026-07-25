const rawProducts = [
  {
    "id": 1,
    "name": "Rb Ring Master",
    "originalPrice": "2500",
    "reviews": 12,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The Rb Ring Master brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/1.1.jpg",
    "images": ["/1.1.jpg"]
  },
  {
    "id": 2,
    "name": "  Metal double bridge ",
    "originalPrice": "2500",
    "reviews": 24,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Oval",
    "description": "The Metal double bridge brings a bold oval-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/2.1.jpg",
    "images": ["/2.1.jpg", "/2.2.jpg"]
  },
  {
    "id": 3,
    "name": "Square tr frame ",
    "originalPrice": "1800",
    "reviews": 8,
    "madeInTaiwan": true,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Square",
    "description": "The Square tr frame brings a bold sqaure-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/3.1.jpg",
    "images": ["/3.1.jpg", "/3.2.jpg"]
  },
  {
    "id": 4,
    "name": "Sqaure printed sunglasses",
    "originalPrice": "1500",
    "reviews": 45,
    "madeInTaiwan": false,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Square",
    "description": "The Sqaure printed sunglasses brings a bold sqaure-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/4.1.jpg",
    "images": ["/4.1.jpg", "/4.2.jpg"]
  },
  {
    "id": 5,
    "name": "Double bridge sqaure frames",
    "originalPrice": "3900",
    "reviews": 31,
    "madeInTaiwan": true,
    "category": "Unisex",
    "gender": "Unisex",
    "shape": "Square",
    "description": "The Double bridge sqaure frames brings a bold square-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for everyone who want comfort without compromising on look.",
    "image": "/5.1.jpg",
    "images": ["/5.1.jpg"]
  },
  {
    "id": 6,
    "name": "Cat Eye ",
    "originalPrice": "3000",
    "reviews": 18,
    "madeInTaiwan": false,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Oval",
    "description": "The Cat Eye brings a bold oval-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/6.1.jpg",
    "images": ["/6.1.jpg", "/6.2.jpg"]
  },
  {
    "id": 7,
    "name": "Matel ring Master ",
    "originalPrice": "3000",
    "reviews": 6,
    "madeInTaiwan": true,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "The Matel Ring Master brings a bold square-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/7.1.jpg",
    "images": ["/7.1.jpg", "/7.2.jpg"]
  },
  {
    "id": 8,
    "name": "Plastic tr frame",
    "originalPrice": "1200",
    "reviews": 52,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "The Plastic  Tr frame brings a bold square-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/8.1.jpg",
    "images": ["/8.1.jpg", "/8.2.jpg"]
  },
  {
    "id": 9,
    "name": "Cat Eye",
    "originalPrice": "3000",
    "reviews": 27,
    "madeInTaiwan": true,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Wayfarer",
    "description": "The Cat Eye frame brings a bold wayfarer-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/9.1.jpg",
    "images": ["/9.1.jpg", "/9.2.jpg"]
  },
  {
    "id": 10,
    "name": "High Quality Metal Frame",
    "originalPrice": "3500",
    "reviews": 33,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "High Quality Metal Frame brings a bold square-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for everyone who want comfort without compromising on look.",
    "image": "/10.1.jpg",
    "images": ["/10.1.jpg", "/10.2.jpg"]
  },
  {
    "id": 11,
    "name": "Plastic tr frame",
    "originalPrice": "1500",
    "reviews": 4,
    "madeInTaiwan": true,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Wayfarer",
    "description": "The plastic tr frame brings a bold vaffer-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/11.1.jpg",
    "images": ["/11.1.jpg", "/11.2.jpg"]
  },
  {
    "id": 12,
    "name": "Metal double bridge",
    "originalPrice": "2200",
    "reviews": 67,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "Metal frame brings  a bold square-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/12.1.jpg",
    "images": ["/12.1.jpg"]
  },
  {
    "id": 13,
    "name": "High quality metal ",
    "originalPrice": "2500",
    "reviews": 41,
    "madeInTaiwan": true,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "The High quality metal framebrings a bold square-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/13.1.jpg",
    "images": ["/13.1.jpg", "/13.2.jpg"]
  },
  {
    "id": 14,
    "name": "High quality double bridge",
    "originalPrice": "3500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The High quality double frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for everyone who want comfort without compromising on look.",
    "image": "/14.1.jpg",
    "images": ["/14.1.jpg"]
  },
  {
    "id": 15,
    "name": "cat I frame",
    "originalPrice": "1500",
    "reviews": 15,
    "madeInTaiwan": true,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Geometric",
    "description": "The cat I frame brings a bold geometric-shaped silhouette to your everyday style, crafted with Taiwanese precision engineering. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/15.1.jpg",
    "images": ["/15.1.jpg", "/15.2.jpg"]
  },
  {
    "id": 16,
    "name": "vintage charm",
    "originalPrice": "2200",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Eye",
    "description": "The vintage charm frame brings a bold eye-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/16.1.jpg",
    "images": ["/16.1.jpg", "/16.2.jpg"]
  },
  {
    "id": 17,
    "name": "Diamond border",
    "originalPrice": "1500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Square",
    "description": "The diamond border brings a bold square-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/17.1.jpg",
    "images": ["/17.1.jpg", "/17.2.jpg"]
  },
  {
    "id": 18,
    "name": "Signature frame ",
    "originalPrice": "2000",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The  Signature frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/18.1.jpg",
    "images": ["/18.1.jpg", "/18.2.jpg"]
  },
  {
    "id": 19,
    "name": "Elegant Style ",
    "originalPrice": "2700",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Round",
    "description": "The Elegant Style frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/19.1.jpg",
    "images": ["/19.1.jpg", "/19.2.jpg"]
  },
  {
    "id": 20,
    "name": "platnium border souble bridge",
    "originalPrice": "3000",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The plastic tr frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/20.1.jpg",
    "images": ["/20.1.jpg", "/20.2.jpg"]
  },
  {
    "id": 21,
    "name": "Evi",
    "originalPrice": "3200",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The metal three piece brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/21.1.jpg",
    "images": ["/21.1.jpg", "/21.2.jpg"]
  },
  {
    "id": 22,
    "name": "Tinted Brown",
    "originalPrice": "1900",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The Tinted brown sunglasses brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/22.1.jpg",
    "images": ["/22.1.jpg", "/22.2.jpg"]
  },
  {
    "id": 23,
    "name": "Square tinted sunglasses",
    "originalPrice": "3500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The Square tinted sunglasses brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/23.1.jpg",
    "images": ["/23.1.jpg", "/23.2.jpg"]
  },
  {
    "id": 24,
    "name": "high quality Mental frame ",
    "originalPrice": "2500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The high quality Mental frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/24.1.jpg",
    "images": ["/24.1.jpg", "/24.2.jpg"]
  },
  {
    "id": 25,
    "name": "square printed sunglasses",
    "originalPrice": "1500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Ladies",
    "gender": "Ladies",
    "shape": "Round",
    "description": "The square sunglasses brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for women who want comfort without compromising on look.",
    "image": "/25.1.jpg",
    "images": ["/25.1.jpg", "/25.2.jpg"]
  },
  {
    "id": 26,
    "name": "Metal ring master",
    "originalPrice": "3000",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The Metal ring master brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/26.1.jpg",
    "images": ["/26.1.jpg", "/26.2.jpg"]
  },
  {
    "id": 27,
    "name": "plastic with metal sides",
    "originalPrice": "1500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The plastic with metal sides brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/27.1.jpg",
    "images": ["/27.1.jpg", "/27.2.jpg"]
  },
  {
    "id": 28,
    "name": "high quality metal frame",
    "originalPrice": "2200",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The high quality metal frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/28.1.jpg",
    "images": ["/28.1.jpg", "/28.2.jpg"]
  },
  {
    "id": 29,
    "name": "double bridge",
    "originalPrice": "3500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The double bridge brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/29.1.jpg",
    "images": ["/29.1.jpg", "/29.2.jpg"]
  },
  {
    "id": 30,
    "name": "plastic frame",
    "originalPrice": "2500",
    "reviews": 22,
    "madeInTaiwan": false,
    "category": "Gents",
    "gender": "Gents",
    "shape": "Round",
    "description": "The plastic frame brings a bold round-shaped silhouette to your everyday style, designed for everyday durability. Lightweight yet sturdy, it's a versatile pick for men who want comfort without compromising on look.",
    "image": "/30.1.jpg",
    "images": ["/30.1.jpg", "/30.2.jpg"]
  }
];

// Every card/detail/cart view reads a numeric `price` — derive it once here
// so the raw catalogue (which only tracks `originalPrice` as a string) stays
// the single source of truth.
export const products = rawProducts.map((p) => ({
  ...p,
  price: Number(p.originalPrice),
}));

// ---------- Derived helpers ----------

export const getAllProducts = () => products;

export const getProductById = (id) =>
  products.find((p) => String(p.id) === String(id));

export const getRelatedProducts = (product, limit = 4) => {
  if (!product) return [];
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.shape === product.shape)
    )
    .slice(0, limit);
};

// Deterministic "featured" / "new arrivals" / "best sellers" slices so
// every page shows a consistent, non-random subset of the catalogue.

// Featured: top-reviewed products (using review count as a proxy for popularity)
export const getFeaturedProducts = (limit = 8) =>
  [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);

// New arrivals: newest IDs first (assuming higher ID = newer)
export const getNewArrivals = (limit = 8) =>
  [...products].sort((a, b) => b.id - a.id).slice(0, limit);

// Best sellers: most reviews
export const getBestSellers = (limit = 8) =>
  [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);

// No discount field exists; return empty array (or you can define your own logic)
export const getDiscountedProducts = (limit = 8) => [];

// ---------- Filter option lists (generated from product.js, never hardcoded) ----------

const uniqueSorted = (arr) => [...new Set(arr)].filter(Boolean).sort();

export const getFilterOptions = () => ({
  categories: uniqueSorted(products.map((p) => p.category)),
  shapes: uniqueSorted(products.map((p) => p.shape)),
  genders: uniqueSorted(products.map((p) => p.gender)),
  madeInTaiwan: uniqueSorted(products.map((p) => String(p.madeInTaiwan))),
  priceRange: {
    min: Math.min(...products.map((p) => Number(p.originalPrice))),
    max: Math.max(...products.map((p) => Number(p.originalPrice))),
  },
});

// ---------- Search ----------

export const searchProducts = (query) => {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return products.filter((p) =>
    [p.name, p.category, p.shape, p.gender, p.description]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q))
  );
};
