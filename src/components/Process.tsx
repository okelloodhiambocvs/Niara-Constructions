import { motion } from 'motion/react';
import { MessageSquare, ClipboardList, PenTool, HardHat, CheckCircle } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      title: "Consultation",
      desc: "We begin with a deep dive into your vision, requirements, and budget to establish a solid project foundation.",
      icon: <MessageSquare size={24} />
    },
    {
      title: "Planning & Design",
      desc: "Our architects and engineers translate your ideas into detailed technical drawings and structural plans.",
      icon: <PenTool size={24} />
    },
    {
      title: "Material Sourcing",
      desc: "We procure high-quality, sustainable materials through our trusted network of global and local suppliers.",
      icon: <ClipboardList size={24} />
    },
    {
      title: "Construction",
      desc: "Our master builders execute the project with precision, overseen by dedicated project managers.",
      icon: <HardHat size={24} />
    },
    {
      title: "Handover",
      desc: "Final quality checks and site cleanup before we officially hand over your new modern legacy.",
      icon: <CheckCircle size={24} />
    }
  ];

  return (
    <section id="process" className="section-padding bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden transition-colors duration-300">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">How We Work</span>
          <h2 className="heading-lg mb-6">Our Seamless Five-Step Journey.</h2>
          <p className="text-brand-secondary dark:text-zinc-300">
            Transparency and structured workflows are the hallmarks of our management philosophy, ensuring every project is delivered with clinical precision.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 rounded-full shadow-lg flex items-center justify-center text-brand-primary dark:text-zinc-100 group-hover:bg-brand-accent dark:group-hover:bg-brand-accent group-hover:text-white dark:group-hover:text-brand-primary transition-all duration-500 mb-8">
                  {step.icon}
                </div>
                
                <div className="px-4">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2 block">Step 0{index + 1}</span>
                  <h3 className="heading-md text-lg mb-4">{step.title}</h3>
                  <p className="text-sm text-brand-secondary dark:text-zinc-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
