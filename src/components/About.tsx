import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

function AnimatedCounter({ from, to, suffix = "", duration = 1.5 }: { from: number; to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(from);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * (to - from) + from));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(to);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [from, to, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const { language, t } = useLanguage();

  const values = [
    {
      title: language === 'sw' ? "Malengo Yetu" : "Our Mission",
      desc: language === 'sw' 
        ? "Kutoa huduma bora za ujenzi kwa kusisitiza usalama, ubora wa hali ya juu, na utunzaji mazingira huku tukizidi matarajio ya wateja kupitia ubunifu." 
        : "To deliver superior construction services by emphasizing safety, quality, and sustainability while exceeding client expectations through innovation and excellence.",
      icon: <Target className="text-brand-accent" size={32} />
    },
    {
      title: language === 'sw' ? "Maono Yetu" : "Our Vision",
      desc: language === 'sw' 
        ? "Kuwa mshirika wa ujenzi anayeaminika na kupendelewa zaidi nchini Kenya, anayeitambulika kwa kujenga majengo imara na endelevu." 
        : "To be the most trusted and preferred construction partner in Kenya, recognized for creating iconic and sustainable structures that stand the test of time.",
      icon: <Eye className="text-brand-accent" size={32} />
    }
  ];

  return (
    <section id="about" className="section-padding bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Main About Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                {t.aboutBadge}
              </span>
              <h2 className="heading-lg mb-8 text-brand-primary dark:text-white">
                {t.aboutHeading}
              </h2>
              <div className="space-y-6 text-brand-secondary dark:text-zinc-300 leading-relaxed">
                <p>
                  {t.aboutDesc1}
                </p>
                <p>
                  {t.aboutDesc2}
                </p>
              </div>
            </motion.div>

            {/* Premium Trust Accreditations Badge Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <motion.div 
                whileHover={{ y: -3, borderColor: '#118A7E' }}
                className="flex items-center gap-3.5 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-sm shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-brand-accent/5 dark:bg-brand-accent/15 rounded-full flex items-center justify-center text-brand-accent flex-shrink-0 font-display font-black text-[10px]">
                  NCA
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-brand-primary dark:text-white uppercase tracking-wider">NCA-1 Accredited</h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-tight mt-0.5">
                    {language === 'sw' ? 'Kibali Kisicho na Kikomo' : 'Unlimited Building Licence Class A'}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, borderColor: '#118A7E' }}
                className="flex items-center gap-3.5 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-sm shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-brand-accent/5 dark:bg-brand-accent/15 rounded-full flex items-center justify-center text-brand-accent flex-shrink-0 font-display font-black text-[10px]">
                  EBK
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-brand-primary dark:text-white uppercase tracking-wider">EBK & BORAQS</h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-tight mt-0.5">
                    {language === 'sw' ? 'Wataalamu Waliosajiliwa' : 'Registered Architects & Engineers'}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Statistics Board */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="space-y-1 group">
                <div className="text-3px font-display font-black text-brand-accent text-3xl md:text-4xl">
                  <AnimatedCounter from={0} to={25} suffix="+" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-tight transition-colors group-hover:text-brand-accent">
                  {t.statProjects}
                </div>
              </div>
              <div className="space-y-1 group">
                <div className="text-3px font-display font-black text-brand-primary dark:text-white text-3xl md:text-4xl">
                  <AnimatedCounter from={0} to={5} suffix="+" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-tight transition-colors group-hover:text-brand-primary dark:group-hover:text-white">
                  {t.statYears}
                </div>
              </div>
              <div className="space-y-1 group">
                <div className="text-3px font-display font-black text-brand-accent text-3xl md:text-4xl">
                  <AnimatedCounter from={0} to={100} suffix="%" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-tight transition-colors group-hover:text-brand-accent">
                  {t.statSatisfaction}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image & ISO Badges */}
          <div className="relative self-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <motion.div 
              className="aspect-[4/5] relative z-10 overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=2000" 
                alt="Construction Management" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Artistic background element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-accent/20 dark:bg-brand-accent/10 border border-brand-accent/20 -z-0" />
            
            <motion.div 
              className="absolute -top-12 -left-12 p-8 bg-white dark:bg-slate-800 shadow-xl dark:shadow-black/40 z-20 max-w-[245px] hidden md:block border dark:border-slate-700/40 cursor-pointer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-accent/10 rounded-full">
                  <ShieldCheck className="text-brand-accent" size={24} />
                </div>
                <h4 className="font-display font-bold text-brand-primary dark:text-white leading-tight text-sm">
                  {language === 'sw' ? 'Viwango vya ISO' : 'ISO Standard Quality'}
                </h4>
              </div>
              <p className="text-[11px] text-brand-secondary dark:text-zinc-300 leading-relaxed font-sans">
                {language === 'sw' 
                   ? 'Tunazingatia kanuni za juu na salama za ubora wa kimataifa katika kila hatua ya mradi.' 
                   : 'We adhere to the highest global safety and quality protocols in every project.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-12">
          {values.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="bg-white dark:bg-slate-800 p-10 shadow-sm border border-slate-100 dark:border-slate-700/40 hover:shadow-md dark:hover:shadow-black/30 transition-all group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="heading-md mb-4">{item.title}</h3>
              <p className="text-brand-secondary dark:text-zinc-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
