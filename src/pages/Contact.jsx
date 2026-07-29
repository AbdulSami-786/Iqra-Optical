import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Clock, CheckCircle } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const branches = [
    {
      title: 'IQRA OPTICS – Branch 1',
      desc: 'Shop No. 1, Memon Masjid, Siddiqabad, F.B. Area, Gulberg Town, Karachi',
    },
    {
      title: 'IQRA OPTICS – Branch 2',
      desc: 'Shop No. G24, Arshi Shopping Center, Ayesha Manzil, Karachi',
    },
  ];

  const infoItems = [
    { icon: Phone, title: 'WhatsApp', desc: '0300-2615141' },
    { icon: Mail, title: 'Email Us', desc: 'iqraoptics01@gmail.com' },
    { icon: Clock, title: 'Working Hours', desc: 'Mon – Sat, 10am – 9pm' },
  ];

  return (
    <div className="bg-white">
      <div className="bg-cream/60 py-16 text-center border-b border-gray-100">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Get in Touch</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">Contact Us</h1>
        <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto px-4">
          We're here to help with all your eyewear needs. For inquiries, orders, appointments, or product
          information, feel free to contact us — our team is always ready to assist you.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-16 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14">
        <div>
          <h2 className="text-xl font-serif font-semibold text-ink mb-6">Our Branches</h2>
          <div className="space-y-6 mb-10">
            {branches.map((branch) => (
              <div key={branch.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{branch.title}</p>
                  <p className="text-sm text-gray-500">{branch.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-serif font-semibold text-ink mb-6">Contact Information</h2>
          <div className="space-y-6">
            {infoItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden shadow-card aspect-video">
          <img src="/shop1.jpeg" alt="Iqra Optics location" className="w-full h-full object-contain" />
          </div>

          <p className="mt-6 text-center text-sm font-serif italic text-ink">
            IQRA OPTICS – Your Trusted Eyewear Destination.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={18} className="text-gold" />
            <h2 className="text-xl font-serif font-semibold text-ink">Send a Message</h2>
          </div>

          {sent && (
            <div className="mb-5 flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl">
              <CheckCircle size={16} /> Your message has been sent. We'll get back to you soon!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass}
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${inputClass} resize-none`}
              required
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;