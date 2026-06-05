import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Clock, Building2, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

function AnimatedCounter({ from, to, suffix = "", duration = 1.8 }: { from: number; to: number; suffix?: string; duration?: number }) {
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

export default function Milestones() {
  const { language } = useLanguage();

  const milestonesData = [
    {
      id: "years-of-excellence",
      count: 12,
      suffix: "+",
      labelEn: "Years of Excellence",
      labelSw: "Miaka ya Ubora",
      descEn: "Over a decade of constructing safe, state-approved residential and commercial projects across East Africa.",
      descSw: "Zaidi ya miaka kumi ya kujenga miradi salama na yenye kibali cha serikali kote Afrika Mashariki.",
      icon: <Clock className="text-brand-accent" size={28} />
    },
    {
      id: "projects-delivered",
      count: 48,
      suffix: "+",
      labelEn: "Projects Delivered",
      labelSw: "Miradi Iliyokamilika",
      descEn: "Successful handovers of modern villas, luxury workspace facades, and comprehensive structural custom-builds.",
      descSw: "Tumefanikisha kukabidhi majumba ya kisasa, vituo vya biashara vya kifahari na majengo tofauti ya kipekee.",
      icon: <Building2 className="text-brand-accent" size={28} />
    },
    {
      id: "happy-clients",
      count: 156,
      suffix: "+",
      labelEn: "Happy Clients",
      labelSw: "Wateja Walioridhika",
      descEn: "Honorable partnerships with private land developers, businesses, and Kenyan families building their legacies.",
      descSw: "Ushirikiano mzuri na waendelezaji kibiashara, kampuni, na familia za Kenya zinazojenga miradi yao ya kudumu.",
      icon: <Users className="text-brand-accent" size={28} />
    },
    {
      id: "safety-rating",
      count: 100,
      suffix: "%",
      labelEn: "Safety & Compliance",
      labelSw: "Usalama na Vibali",
      descEn: "NCA-1 licensed operations with rigorous on-site hazard management guidelines and zero legal non-compliance.",
      descSw: "Uendeshaji ulioidhinishwa na NCA-1 wenye usimamizi thabiti wa usalama kuzuia hatari zote kiwanjani.",
      icon: <ShieldCheck className="text-brand-accent" size={28} />
    }
  ];

  return (
    <section id="milestones" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle organic geometric shapes behind to feel hand-crafted and authentic, not like machine grid lines */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none select-none" />
      <div className="absolute left-[-10%] bottom-[-10%] w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none select-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-3 block"
          >
            {language === 'sw' ? "HISTORIA YETU" : "TRACK RECORD OF TRUST"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold text-brand-primary dark:text-white tracking-tight mb-5 leading-tight"
          >
            {language === 'sw' 
              ? "Ufanisi Wetu Katika Takwimu Halisi" 
              : "Our Construction Milestones"}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-brand-secondary dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {language === 'sw'
              ? "Kila mradi tunaoujenga unategemea viwanja thabiti vya uhandisi na ushirikiano mzuri. Hapa kuna mafanikio tuliyofikia kwa pamoja."
              : "Every project we construct rests on a solid foundation of rigorous engineering, strict budget management, and unwavering collaboration. Here is what we have built together."}
          </motion.p>
        </div>

        {/* Milestones Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {milestonesData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgba(11,30,29,0.08)" }}
              className="bg-white dark:bg-slate-950 p-8 border border-slate-100 dark:border-slate-800/60 rounded-xl relative overflow-hidden transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              {/* Card Accent Top Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent/20 to-brand-accent/90 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg flex items-center justify-center mb-6 text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                  {item.icon}
                </div>

                {/* Counter */}
                <div className="text-4xl md:text-5xl font-display font-black text-brand-primary dark:text-white mb-2 group-hover:text-brand-accent dark:group-hover:text-brand-accent transition-colors">
                  <AnimatedCounter from={0} to={item.count} suffix={item.suffix} />
                </div>

                {/* Label */}
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-primary dark:text-zinc-200 mb-3">
                  {language === 'sw' ? item.labelSw : item.labelEn}
                </h4>
              </div>

              {/* Description Detail */}
              <p className="text-xs text-brand-secondary dark:text-slate-400 leading-relaxed mt-1">
                {language === 'sw' ? item.descSw : item.descEn}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
