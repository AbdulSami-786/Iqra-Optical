import { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

 

  return (
    <div className="bg-white text-black font-sans">
      {/* 1. Header Section */}
      <div className="py-16 md:py-24 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight text-black mb-4 uppercase">
          Contact Us
        </h1>
        <div className="w-20 h-px bg-black mx-auto mb-6"></div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-bold px-4">
          Expert Assistance for your Fragrance Journey
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* 2. Communication Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center group">
            <div className="mb-6 flex justify-center text-gray-400 group-hover:text-black transition-colors">
              <Phone size={30} strokeWidth={1} />
            </div>
            <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-3">Customer Concierge</h3>
            <p className="text-sm font-serif italic mb-1">+92 371 1191925</p>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Mon-Sun, 11am - 11pm</p>
          </div>
          
          <div className="text-center group">
            <div className="mb-6 flex justify-center text-gray-400 group-hover:text-black transition-colors">
              <Mail size={30} strokeWidth={1} />
            </div>
            <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-3">Digital Inquiries</h3>
            <p className="text-sm font-serif italic mb-1">zareenfragrances@gmail.com</p>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">24/7 Response Time</p>
          </div>
          
          <div className="text-center group">
            <div className="mb-6 flex justify-center text-gray-400 group-hover:text-black transition-colors">
              <MessageSquare size={30} strokeWidth={1} />
            </div>
            <h3 className="text-xs tracking-[0.3em] font-bold uppercase mb-3">WhatsApp Live</h3>
            <p className="text-sm font-serif italic mb-1">+92 371 1191925</p>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Quickest Assistance</p>
          </div>
        </div>

        {/* 3. Form Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div>
            <h2 className="text-2xl font-serif italic mb-6">Share Your Thoughts</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
              Whether you are looking for a signature scent or need help with an order, our specialists are here to assist you.
            </p>
            
            {isSubmitted ? (
              <div className="p-6 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-bold text-center">
                Your message has been received. Thank you.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="NAME"
                  className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest focus:border-black outline-none transition-colors uppercase font-bold"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="EMAIL ADDRESS"
                  className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest focus:border-black outline-none transition-colors uppercase font-bold"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="HOW CAN WE HELP YOU?"
                  className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest focus:border-black outline-none transition-colors uppercase font-bold resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="bg-black text-white px-10 py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-gray-800 transition shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
          
          <div className="bg-[#F9F9F9] p-8 md:p-12 text-center flex flex-col items-center justify-center border border-gray-100 h-full min-h-[400px]">
            <MapPin size={40} strokeWidth={1} className="mb-6 text-gray-300" />
            <h3 className="text-lg font-serif italic mb-4">The Flagship Experience</h3>
          
            <button className="text-[10px] font-bold tracking-[0.3em] border-b border-black pb-1 hover:text-gray-500 transition">
              FIND ON MAPS
            </button>
          </div>
        </div>

        {/* 4. Retail Outlets */}
       
      </div>
    </div>
  );
};

export default Contact;