import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Zap, Leaf, Clock, Settings2 } from 'lucide-react';

export default function WhyChoose() {
  const highlights = [
    {
      title: "Industry Expertise",
      desc: "Our team consists of certified architects, engineers, and master builders with decades of combined experience.",
      icon: <ShieldCheck size={28} />
    },
    {
      title: "Innovative Solutions",
      desc: "We utilize modern construction technologies, from 3D modeling to advanced materials, for superior project outcomes.",
      icon: <Zap size={28} />
    },
    {
      title: "Sustainability",
      desc: "Committed to eco-friendly building practices that reduce environmental impact and lower long-term operation costs.",
      icon: <Leaf size={28} />
    },
    {
      title: "Timely Delivery",
      desc: "We strictly adhere to project timelines and budget constraints, ensuring your peace of mind from start to finish.",
      icon: <Clock size={28} />
    },
    {
      title: "End-to-End Service",
      desc: "From initial feasibility studies to final project handover, we manage every detail of the construction process.",
      icon: <Settings2 size={28} />
    },
    {
      title: "Client-Centric",
      desc: "Your vision is our blueprint. We prioritize transparent communication and collaborative decision-making.",
      icon: <CheckCircle2 size={28} />
    }
  ];

  return (
    <section className="section-padding bg-brand-primary dark:bg-slate-950 text-white overflow-hidden relative transition-colors duration-300">
      {/* Decorative architectural grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Niara Advantage</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8">Why Discerning Clients Trust Niara.</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              We don't just compete on price; we lead on quality, transparency, and innovation. Every structure we build is a testament to our commitment to excellence and our clients' legacies.
            </p>
            <div className="p-8 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-4xl font-display font-black text-brand-accent mb-2">100%</div>
              <div className="text-sm uppercase tracking-widest font-bold">Safety Compliance Rate</div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-display font-bold mb-3">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
