import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern Architecture Construction" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent" />
      </div>

      <div className="container-custom relative z-10 px-6 mt-20 flex justify-between items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 bg-brand-accent/20 border-l-4 border-brand-accent text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              {t.heroBadge}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-primary dark:text-white mb-8 tracking-tighter leading-[1.1]">
              {t.heroHeading}
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary dark:text-zinc-350 font-light mb-10 leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="btn-primary bg-brand-accent hover:opacity-90 text-white px-10 py-5 text-sm uppercase tracking-widest font-bold border border-transparent dark:bg-brand-accent dark:text-brand-primary dark:hover:bg-white transition-all">
                {t.heroConsultBtn} <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary px-10 py-5 text-sm uppercase tracking-widest font-bold border border-brand-primary/15 transition-all inline-flex items-center gap-2 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/30">
                {t.heroPortfolioBtn} <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Premium Glassmorphic Brand Plaque */}
        <div className="hidden xl:flex items-center justify-center mr-16 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="p-10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-sm shadow-[0_0_80px_rgba(17,138,126,0.06)] dark:shadow-[0_0_80px_rgba(17,138,126,0.12)] max-w-sm flex items-center justify-center"
          >
            <Logo variant="full" light={theme === 'dark'} className="scale-95" />
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute right-12 bottom-0 top-0 w-px bg-slate-200 dark:bg-white/10 hidden lg:block" />
      <div className="absolute right-48 bottom-0 top-0 w-px bg-slate-200 dark:bg-white/10 hidden lg:block" />
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-secondary/40 dark:text-white/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-px h-10 bg-brand-secondary/40 dark:bg-white/40" />
      </motion.div>
    </section>
  );
}
