import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Evans Omondi",
      role: "Property Developer",
      content: "Niara redefined what I expected from a local construction firm. Their attention to structural integrity and finishing detail is simply world-class. They delivered my lakeside villa ahead of schedule.",
      stars: 5
    },
    {
      name: "Sarah Wanjiku",
      role: "Business Owner",
      content: "Working with Niara on our office complex redesign was a breeze. Their project management team kept us informed every step of the way, and the final result has significantly boosted our brand image.",
      stars: 5
    },
    {
      name: "Capt. James Maloba",
      role: "Homeowner",
      content: "Building a home while working abroad is usually stressful, but Niara made it effortless. Their digital reporting and transparent billing allowed me to stay in control from miles away.",
      stars: 5
    }
  ];

  return (
    <section className="section-padding bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Client Confidence</span>
            <h2 className="heading-lg mb-8">What Our Partners Say.</h2>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="fill-brand-accent text-brand-accent" />
              ))}
            </div>
            <p className="text-brand-secondary dark:text-zinc-300">
              Our reputation is built on the words of those we've built for. We take pride in 100% client satisfaction across Kisumu and beyond.
            </p>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 relative group hover:bg-brand-primary dark:hover:bg-brand-accent hover:text-white dark:hover:text-brand-primary transition-all duration-500"
              >
                <div className="text-brand-accent mb-6 group-hover:text-white dark:group-hover:text-brand-primary transition-colors">
                  <Quote size={40} className="opacity-20" />
                </div>
                <p className="text-sm italic mb-8 leading-relaxed opacity-80">
                  "{item.content}"
                </p>
                <div>
                  <h4 className="font-display font-bold text-base">{item.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-brand-accent group-hover:text-white/80 dark:group-hover:text-brand-primary">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-brand-primary dark:text-slate-350">
           <div className="text-2xl font-display font-black tracking-tighter">NCA KENYA</div>
           <div className="text-2xl font-display font-black tracking-tighter">KEBS CERTIFIED</div>
           <div className="text-2xl font-display font-black tracking-tighter">ISO 9001:2015</div>
           <div className="text-2xl font-display font-black tracking-tighter">GREEN BUILD CO.</div>
        </div>
      </div>
    </section>
  );
}
