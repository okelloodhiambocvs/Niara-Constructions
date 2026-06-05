import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Trigger conversational greeting bubble after 4 seconds of page dwell time to humanize the interface
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('niara_wa_dismissed');
      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowTooltip(false);
    setHasDismissed(true);
    localStorage.setItem('niara_wa_dismissed', 'true');
  };

  const phone = "254716417104";
  
  // Custom pre-filled queries mapped clean to language switch state
  const textEn = "Hello Niara Consultant, I'd like to inquire about a construction project and schedule a planning session.";
  const textSw = "Habari mshauri wa Niara, ningependa kuuliza kuhusu mradi wa ujenzi na kupanga muda wa mazungumzo.";
  
  const encodedText = encodeURIComponent(language === 'sw' ? textSw : textEn);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  const t = {
    greetingEn: "Need building advice?",
    greetingSw: "Je, unahitaji ushauri wa ujenzi?",
    promptEn: "Chat with a project consultant directly.",
    promptSw: "Ongea na mshauri wa mradi sasa hivi.",
    hoverEn: "Consult planning on WhatsApp",
    hoverSw: "Panga ujenzi nami WhatsApp"
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-[80] flex flex-col items-end pointer-events-none select-none">
      
      {/* Interactive Chat Prompt Bubble */}
      <AnimatePresence>
        {showTooltip && !hasDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-3 max-w-[260px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-xl pointer-events-auto relative before:content-[''] before:absolute before:bottom-[-6px] before:right-5 before:w-3 before:h-3 before:bg-white dark:before:bg-slate-900 before:rotate-45 before:border-r before:border-b before:border-slate-100 dark:before:border-slate-800"
          >
            {/* Close trigger */}
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Dismiss chat tooltip"
            >
              <X size={12} />
            </button>

            <div className="flex gap-2">
              <span className="relative flex h-2 w-2 mt-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div>
                <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-brand-accent mb-0.5">
                  {language === 'sw' ? 'WASHMauri NIARA' : 'NIARA ADVISOR'}
                </h5>
                <p className="text-xs font-bold text-brand-primary dark:text-white leading-tight mb-1 pr-3">
                  {language === 'sw' ? t.greetingSw : t.greetingEn}
                </p>
                <p className="text-[11px] text-brand-secondary dark:text-slate-400 leading-normal pr-3">
                  {language === 'sw' ? t.promptSw : t.promptEn}
                </p>
                
                {/* Micro Action link inside bubble */}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  {language === 'sw' ? 'Anza Mazungumzo sasa' : 'Start conversation'} &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.a
        id="whatsapp-floating-action-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consult Niara via WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer relative group"
      >
        {/* Pulsating outer decorative compliance ring */}
        <span className="absolute -inset-1 rounded-full border border-emerald-500/40 animate-pulse pointer-events-none" />

        {/* Brand visual icon */}
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" />
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
        </svg>

        {/* Hover label tooltip */}
        <div className="absolute right-16 bg-brand-primary dark:bg-slate-900 border border-slate-700/50 text-[10px] font-bold uppercase tracking-wider text-white py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {language === 'sw' ? t.hoverSw : t.hoverEn}
        </div>
      </motion.a>

    </div>
  );
}
