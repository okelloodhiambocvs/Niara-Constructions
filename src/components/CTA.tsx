import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function CTA() {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-brand-accent dark:bg-brand-accent/90 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-brand-primary h-full rotate-12" />
        ))}
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-brand-primary dark:text-brand-primary mb-6">
            {t.ctaHeading}
          </h2>
          <p className="text-brand-primary/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-bold leading-relaxed">
            {language === 'sw' 
              ? "Jiunge na orodha ya wawekezaji na wamiliki wa nyumba walioshirikiana na Niara kufanikisha ndoto zao za ujenzi na usanifu wa kisasa."
              : "Join the elite list of homeowners and investors who have partnered with Niara to bring their modern architectural visions to life."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary bg-brand-primary text-white hover:bg-black px-12 py-5 text-sm uppercase tracking-widest font-bold">
              {language === 'sw' ? 'Anza Mradi Wako' : 'Start Your Project'} <ArrowRight size={18} />
            </a>
            <a href="tel:+254716417104" className="bg-white/20 hover:bg-white text-brand-primary px-12 py-5 text-sm uppercase tracking-widest font-bold transition-all border border-brand-primary">
              {language === 'sw' ? 'Tupigie Simu Moja kwa Moja' : 'Call Us Directly'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
