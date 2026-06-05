import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Clock, DollarSign, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FAQItem {
  id: string;
  category: 'timeline' | 'cost' | 'management';
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>('timeline-1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'timeline' | 'cost' | 'management'>('all');

  const categories = useMemo(() => [
    { id: 'all', label: t.faqClassAll },
    { id: 'timeline', label: t.faqClassTimeline, icon: <Clock size={14} /> },
    { id: 'cost', label: t.faqClassCost, icon: <DollarSign size={14} /> },
    { id: 'management', label: t.faqClassSteward, icon: <Shield size={14} /> }
  ] as const, [t]);

  const faqs: FAQItem[] = useMemo(() => [
    {
      id: 'timeline-1',
      category: 'timeline',
      question: t.faqQ1,
      answer: t.faqA1
    },
    {
      id: 'timeline-2',
      category: 'timeline',
      question: t.faqQ2,
      answer: t.faqA2
    },
    {
      id: 'cost-1',
      category: 'cost',
      question: t.faqQ3,
      answer: t.faqA3
    },
    {
      id: 'cost-2',
      category: 'cost',
      question: t.faqQ4,
      answer: t.faqA4
    },
    {
      id: 'management-1',
      category: 'management',
      question: t.faqQ5,
      answer: t.faqA5
    },
    {
      id: 'management-2',
      category: 'management',
      question: t.faqQ6,
      answer: t.faqA6
    }
  ], [t]);

  useEffect(() => {
    const handleSelectFAQ = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const faqId = customEvent.detail;
      const matched = faqs.find(f => f.id === faqId);
      if (matched) {
        setSelectedCategory('all');
        setActiveId(faqId);
      }
    };
    window.addEventListener('select-faq-item', handleSelectFAQ);
    return () => window.removeEventListener('select-faq-item', handleSelectFAQ);
  }, [faqs]);

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" style={{ contentVisibility: 'auto' }}>
      {/* Absolute Decorative Geometric Shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            {t.faqBadge}
          </span>
          <h2 className="heading-lg text-brand-primary dark:text-white tracking-tight font-black animate-fade-in">
            {t.faqHeading}
          </h2>
          <p className="text-brand-secondary dark:text-zinc-350 text-sm mt-4 leading-relaxed max-w-xl mx-auto font-sans">
            {t.faqSublabel}
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="faq-categories">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                // Automatically activate the first item of the selected category for better UX
                const firstOfCat = faqs.find(f => cat.id === 'all' || f.category === cat.id);
                if (firstOfCat) setActiveId(firstOfCat.id);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-primary dark:bg-brand-accent dark:text-brand-primary text-white border-brand-primary dark:border-brand-accent shadow-lg shadow-brand-primary/10'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-zinc-400 border-slate-200/60 dark:border-slate-800/80 hover:border-brand-accent dark:hover:border-brand-accent hover:text-brand-primary dark:hover:text-white'
              }`}
              id={`faq-btn-${cat.id}`}
            >
              {'icon' in cat && cat.icon}
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* FAQs Dynamic Grid/Accordion Container */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden rounded-lg p-3 md:p-8">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-slate-100 dark:divide-slate-800"
              >
                {filteredFaqs.map((faq, index) => {
                  const isOpen = activeId === faq.id;
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="py-5 first:pt-2 last:pb-2"
                      id={`faq-item-${faq.id}`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full flex items-center justify-between text-left gap-6 group focus:outline-none py-2 cursor-pointer touch-manipulation min-h-[44px]"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className="font-display font-bold text-brand-primary dark:text-white group-hover:text-brand-accent dark:group-hover:text-brand-accent transition-colors text-sm md:text-base leading-snug tracking-tight flex items-center gap-3">
                          <HelpCircle size={18} className="text-brand-accent/60 group-hover:text-brand-accent transition-colors flex-shrink-0" />
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:bg-brand-accent/10 dark:group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-colors flex-shrink-0"
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-7 pr-4 pb-4 pt-2 text-xs md:text-sm text-brand-secondary dark:text-zinc-350 leading-relaxed font-sans">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Post-FAQ Call to Action Banner */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-xs text-brand-secondary dark:text-zinc-350 tracking-widest uppercase font-bold">
            {t.faqFooterText}
          </p>
          <motion.a
            whileHover={{ x: 5 }}
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-primary dark:hover:text-white text-xs font-black uppercase tracking-widest mt-3 transition-colors group"
          >
            {t.faqFooterLink}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
