import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{background: '#f6f6f4'}} className=" border-t border-gray-200 pt-16 pb-10 mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="space-y-6">
            <img src="/logo.jpeg" alt="Iqra Optics" className="h-14 w-auto object-contain" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium eyewear crafted with precision and style. Experience clarity and confidence with every pair.
            </p>
          <div className="flex space-x-3">
  {[
    { Icon: FaFacebook, href: 'https://www.facebook.com/share/19HQrUoKNU/' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/iqra_optic?igsh=NzJjdnFoeG15YTU1' },
  ].map(({ Icon, href }, i) => (
    <a
      key={i}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-ink hover:text-white hover:border-ink transition-all duration-300"
    >
      <Icon size={15} />
    </a>
  ))}
</div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] mb-6 text-ink">Quick Links</h4>
            <ul className="text-[12px] space-y-3.5 uppercase tracking-wider text-gray-600">
              <li><Link to="/products" className="hover:text-ink transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-ink transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-ink transition-colors">Contact Us</Link></li>
             
              
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] mb-6 text-ink">Newsletter</h4>
            <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">
              Subscribe for exclusive offers and the latest arrivals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border-b border-gray-300 focus-within:border-ink pb-3 transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="bg-transparent text-[12px] tracking-wider outline-none w-full placeholder:text-gray-400"
              />
              <button type="submit" className="text-gray-400 hover:text-ink transition-colors shrink-0 ml-3">
                <Send size={16} />
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] mb-6 text-ink">Get in Touch</h4>
            <div className="text-[12px] text-gray-600 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-700 mt-0.5 flex-shrink-0" />
                <p>Karachi, Pakistan</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-700 mt-0.5 flex-shrink-0" />
                <p>+92 371 1191925</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gray-700 mt-0.5 flex-shrink-0" />
                <p>IqraOptical@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 uppercase tracking-wider">
            © {new Date().getFullYear()} Iqra Optical. All Rights Reserved.
          </p>
          <div className="flex space-x-3">
            <div className="h-5 w-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-sm shadow-sm" />
            <div className="h-5 w-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-sm shadow-sm" />
            <div className="h-5 w-8 bg-gradient-to-b from-red-600 to-red-400 rounded-sm shadow-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
