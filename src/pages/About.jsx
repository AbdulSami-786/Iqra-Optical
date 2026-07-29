import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Sparkles, Truck, Eye } from 'lucide-react';
import { useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const values = [
  { icon: Sparkles, title: 'Premium Quality', desc: 'Every frame is crafted from carefully sourced materials and finished to the highest standard.' },
  { icon: Heart, title: 'Personal Touch', desc: 'Styles curated for every face shape, gender, and personality — with expert fitting guidance.' },
  { icon: ShieldCheck, title: 'Trusted Craftsmanship', desc: 'We partner only with verified manufacturers, never compromising on lens or frame quality.' },
  { icon: Truck, title: 'Easy Delivery', desc: 'Nationwide delivery with cash-on-delivery available for a stress-free shopping experience.' },
];

const About = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src="/b4.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Iqra Optics store" />
      </div>

      <section className="container mx-auto px-4 max-w-4xl py-20 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Eye size={36} className="text-gold mx-auto mb-6" strokeWidth={1.2} />
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mb-6">Vision Beyond Eyewear</h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Iqra Optics began with a simple belief: that eyewear should be as much a statement of
            style as it is a tool for clarity. From our roots in Karachi, we've grown into a trusted
            destination for premium eyeglasses, sunglasses, and contact lenses — blending precision
            optics with timeless design for men, women, and everyone in between.
          </p>
        </motion.div>
      </section>

      <section className="bg-cream/50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mt-2">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-card text-center"
              >
                <v.icon size={30} className="text-gold mx-auto mb-4" strokeWidth={1.3} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-card aspect-[4/3]">
            <img src="/b5.jpeg" alt="Iqra Optics craftsmanship" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Award size={30} className="text-gold mb-4" strokeWidth={1.3} />
            <h2 className="text-3xl font-serif font-semibold text-ink mb-4">Established on Precision</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every pair in our collection is inspected for fit, durability, and finish before it
              reaches you. We work directly with trusted manufacturers to bring internationally
              inspired designs to Pakistan at honest prices.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold transition-all duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
