import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, Car, Home, Package, Truck } from 'lucide-react';

const About = () => {
  const brandName = "ZAREEN FRAGRANCES";

  const storyPoints = [
    { 
      title: 'The Inspiration', 
      description: 'The idea behind Zareen Fragrances came from a simple inspiration: people often have a favorite perfume they love to wear, and we wanted them to experience that same scent in their car and their room as well.'
    },
    { 
      title: 'The Name', 
      description: 'The name "Zareen Fragrances" is inspired by the grandmother of the brand owner, Saim Sheikh, whose name was Zareen. This gives the brand a meaningful and personal touch.'
    },
    { 
      title: 'Our Promise', 
      description: 'Our team has more than five years of experience working with fragrance oils and scent development. We work with verified vendors and partners and never compromise on quality.'
    }
  ];

  const products = [
    { icon: <Car size={32} strokeWidth={1}/>, title: 'Car Diffusers', description: 'Take your favorite scent on every journey' },
    { icon: <Home size={32} strokeWidth={1}/>, title: 'Room Diffusers', description: 'Transform your living spaces with signature aromas' },
    { icon: <Package size={32} strokeWidth={1}/>, title: 'Tester Boxes', description: 'Explore multiple fragrances before choosing your favorite' }
  ];

  const values = [
    { icon: <Sparkles size={32} strokeWidth={1}/>, title: 'Premium Quality', description: 'High-quality perfume-inspired diffusers crafted with expertise' },
    { icon: <Heart size={32} strokeWidth={1}/>, title: 'Personal Touch', description: 'Fragrances for both male and female customers to match their personality' },
    { icon: <ShieldCheck size={32} strokeWidth={1}/>, title: 'Verified Vendors', description: 'Working with trusted partners, never compromising on quality' },
    { icon: <Truck size={32} strokeWidth={1}/>, title: 'Easy Delivery', description: 'Cash on Delivery for trust and customer convenience' }
  ];

  return (
    <div className="bg-white text-black font-sans">
      {/* 1. HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover" 
            alt="Fragrance Diffuser"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-[10px] tracking-[0.5em] text-white uppercase mb-4 font-bold">ESTABLISHED MARCH 1, 2026</h2>
          <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6">Our Story</h1>
          <div className="w-16 h-px bg-white mx-auto"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* 2. BRAND INTRODUCTION */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-serif italic mb-8 uppercase tracking-widest">Welcome to Zareen Fragrances</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Zareen Fragrances is a premium fragrance brand that provides high-quality perfume-inspired car diffusers and room diffusers. Our goal is to allow people to enjoy their favorite fragrances not only on their bodies but also in their cars and living spaces.
          </p>
          <p className="text-gray-500 italic">
            Founded on March 1, 2026, in Karachi, Pakistan, we cater to both male and female customers who want to enhance their lifestyle with a unique and pleasant fragrance experience.
          </p>
        </div>

        {/* 3. THE STORY - Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {storyPoints.map((point, idx) => (
            <div key={idx} className="text-center p-8 border border-gray-100 hover:border-black transition-colors duration-500">
              <div className="w-12 h-12 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-serif italic">{idx + 1}</span>
              </div>
              <h3 className="text-sm tracking-[0.3em] font-bold uppercase mb-4">{point.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* 4. OUR PRODUCTS */}
        <div className="mb-32">
          <h2 className="text-center text-2xl font-serif italic tracking-widest mb-4 uppercase">Our Collection</h2>
          <p className="text-center text-gray-400 text-xs tracking-[0.2em] uppercase mb-16">Specially designed for male and female categories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product, idx) => (
              <div key={idx} className="text-center group">
                <div className="mb-6 flex justify-center text-gray-600 group-hover:text-black transition-colors duration-500">
                  {product.icon}
                </div>
                <h3 className="text-sm tracking-[0.3em] font-bold uppercase mb-4">{product.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CORE VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 border-y border-gray-100 py-20">
          {values.map((val, idx) => (
            <div key={idx} className="text-center group">
              <div className="mb-6 flex justify-center text-gray-400 group-hover:text-black transition-colors duration-500">
                {val.icon}
              </div>
              <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-4">{val.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-tighter">{val.description}</p>
            </div>
          ))}
        </div>

        {/* 6. OUR MESSAGE */}
        <div className="bg-gray-50 p-20 mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif italic mb-8 uppercase tracking-widest">Our Philosophy</h2>
          <p className="text-gray-700 text-lg leading-relaxed italic">
            "People wear great clothes and present themselves well, but a great fragrance is always essential—whether it's on your body, in your car, or in your room."
          </p>
        </div>

        {/* 7. STATS - Clean Banner */}
        <div className="bg-black text-white py-20 px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center max-w-5xl mx-auto">
            <div>
              <div className="text-3xl font-serif mb-2 italic">5+</div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-serif mb-2 italic">100%</div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60">Quality Assured</div>
            </div>
            <div>
              <div className="text-3xl font-serif mb-2 italic">2026</div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-serif mb-2 italic">∞</div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60">Signature Scents</div>
            </div>
          </div>
        </div>

        {/* 8. VISION SECTION */}
        <div className="text-center py-10 mb-10">
          <h2 className="text-2xl font-serif italic mb-6 uppercase tracking-widest">Our Vision</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            To expand Zareen Fragrances across Pakistan and eventually into international markets, 
            allowing more people to experience our unique scents and build a fragrance identity 
            that stays with them wherever they go.
          </p>
        </div>

        {/* 9. CALL TO ACTION */}
        <div className="text-center py-20 border border-gray-100">
          <h2 className="text-3xl font-serif italic mb-6">Find Your Signature Scent</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mb-10 max-w-lg mx-auto leading-loose">
            Explore our fragrance details, view product images, and place orders easily through WhatsApp
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link 
              to="/products" 
              className="bg-black text-white px-12 py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-gray-800 transition shadow-xl"
            >
              Explore Collection
            </Link>
            <Link 
              to="/contact" 
              className="border border-black text-black px-12 py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black hover:text-white transition"
            >
              Order via WhatsApp
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-6">Cash on Delivery available for your convenience</p>
        </div>
      </div>
    </div>
  );
};

export default About;