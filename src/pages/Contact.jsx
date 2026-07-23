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

  const infoItems = [
    { icon: MapPin, title: 'Visit Us', desc: 'Karachi, Pakistan' },
    { icon: Phone, title: 'Call Us', desc: '+92 371 1191925' },
    { icon: Mail, title: 'Email Us', desc: 'IqraOptical@gmail.com' },
    { icon: Clock, title: 'Working Hours', desc: 'Mon – Sat, 10am – 9pm' },
  ];

  return (
    <div className="bg-white">
      <div className="bg-cream/60 py-16 text-center border-b border-gray-100">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Get in Touch</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">We'd Love to Hear From You</h1>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-16 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14">
        <div>
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
            <img src="/b2.jpg" alt="Iqra Optics location" className="w-full h-full object-cover" />
          </div>
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
