import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Loader2, Type, Eye, Check, RotateCcw } from 'lucide-react';
import { useToast } from './Toast';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { success, error } = useToast();
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessibility State Hooked to Client Local Storage
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('niara_font_size') || '100%';
    }
    return '100%';
  });
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('niara_high_contrast') === 'true';
    }
    return false;
  });

  // Synchronize state preferences cleanly relative to body classes and root styles
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem('niara_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('accessibility-high-contrast');
      localStorage.setItem('niara_high_contrast', 'true');
    } else {
      document.documentElement.classList.remove('accessibility-high-contrast');
      localStorage.setItem('niara_high_contrast', 'false');
    }
  }, [highContrast]);

  const resetAccessibility = () => {
    setFontSize('100%');
    setHighContrast(false);
    success(
      language === 'sw' ? 'Mipangilio ya ufikiaji imerejeshwa' : 'Readability parameters reset successfully',
      language === 'sw' ? 'Ufikiaji Sawa' : 'Accessibility Reset',
      3000
    );
  };

  const a11y = {
    sectionTitleEn: "Accessibility Core Controls",
    sectionTitleSw: "Udhibiti wa Ufikiaji",
    fontSizeEn: "Display Text Size",
    fontSizeSw: "Kuza Maandishi",
    contrastEn: "Readability Contrast",
    contrastSw: "Hali ya Mwangaza",
    normalSizeEn: "Normal",
    normalSizeSw: "Kawaida",
    largeSizeEn: "Large (112%)",
    largeSizeSw: "Kubwa (112%)",
    xlSizeEn: "X-Large (125%)",
    xlSizeSw: "Kubwa Zaidi (125%)",
    hugeSizeEn: "Huge (137%)",
    hugeSizeSw: "Kubwa Sana (137%)",
    highContrastEn: "High Contrast Mode",
    highContrastSw: "Mwangaza Thabiti",
    normalContrastEn: "Standard Colorway",
    normalContrastSw: "Kawaida",
    resetEn: "Reset Settings",
    resetSw: "Rejesha Kawaida",
    complianceEn: "Niara conforms closely to global digital design standards (WCAG 2.1 AA) supporting inclusive access for all structural planners.",
    complianceSw: "Niara inazingatia viwango rasmi vya ufikiaji wa kidijitali vya (WCAG 2.1 AA) ili kuhakikisha huduma bora kwa kila mtumiaji wetu."
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      error(t.footerSubscribeFailMsg, t.footerSubscribeFailTitle);
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      success(
        t.footerSubscribeSuccessMsg,
        t.footerSubscribeSuccessTitle,
        5000
      );
      setEmail('');
    } catch (err) {
      error(
        language === 'sw' ? "Kosa la mtandao. Tafadhali jaribu tena baada ya muda mfupi." : "Unable to subscribe at this moment. Please try again soon.",
        language === 'sw' ? "Hitilafu ya Mtandao" : "Network Timeout"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-primary dark:bg-slate-950 text-white pt-24 pb-12 overflow-hidden relative transition-colors duration-300">
      {/* Decorative large text */}
      <div className="absolute -bottom-10 -right-20 text-[180px] font-display font-black text-white/5 dark:text-white/[0.02] pointer-events-none select-none hidden lg:block">
        NIARA
      </div>

      <div className="container-custom px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <a href="#" className="mb-8 block">
              <Logo variant="horizontal" height={40} light={true} />
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm font-sans">
              {t.footerSlogan}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-brand-primary transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 border-l-2 border-brand-accent pl-4">
              {t.footerColCompany}
            </h4>
            <ul className="space-y-4 text-sm text-white/50 font-sans">
              <li><a href="#about" className="hover:text-brand-accent transition-colors">{t.aboutLink}</a></li>
              <li><a href="#portfolio" className="hover:text-brand-accent transition-colors">{t.projectsLink}</a></li>
              <li><a href="#services" className="hover:text-brand-accent transition-colors">{t.servicesLink}</a></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">{t.processLink}</a></li>
              <li><a href="#careers" className="hover:text-brand-accent transition-colors">{language === 'sw' ? 'Mabadiliko ya Kazi' : 'Careers at Niara'}</a></li>
              <li><a href="#faq" className="hover:text-brand-accent transition-colors">{t.faqLink}</a></li>
              <li><a href="#contact" className="hover:text-brand-accent transition-colors">{t.contactLink}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
             <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 border-l-2 border-brand-accent pl-4">
               {t.footerColServices}
             </h4>
             <ul className="space-y-4 text-sm text-white/50 font-sans">
              <li>
                <a href="#services" className="hover:text-brand-accent transition-colors">
                  {language === 'sw' ? 'Sanifu na Ujenge' : 'Design & Build'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-accent transition-colors">
                  {language === 'sw' ? 'Ujenzi wa Makazi' : 'Residential Construction'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-accent transition-colors">
                  {language === 'sw' ? 'Ujenzi wa Kibiashara' : 'Commercial Construction'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-accent transition-colors">
                  {language === 'sw' ? 'Ukarabati na Nakshi' : 'Renovations & Fit-outs'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-accent transition-colors">
                  {language === 'sw' ? 'Ushaurishi wa Usimamizi' : 'Management Consulting'}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 border-l-2 border-brand-accent pl-4">
              {t.footerColNewsletter}
            </h4>
            <p className="text-sm text-white/50 mb-6 font-sans">
              {t.footerNewsletterDesc}
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                placeholder={t.footerNewsletterPlaceholder} 
                className="bg-white/5 dark:bg-slate-900 border border-white/10 dark:border-slate-800 px-4 py-3 text-sm text-white focus:border-brand-accent outline-none w-full disabled:opacity-60" 
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-accent text-brand-primary p-3 hover:bg-white transition-colors disabled:opacity-80 flex items-center justify-center min-w-[44px] cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowUp size={18} className="rotate-45" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ==========================================
            HUMAN-CENTRIC ACCESSIBILITY MENU
           ========================================== */}
        <div className="my-12 py-8 px-6 md:px-8 border-t border-b border-white/5 bg-white/[0.02] dark:bg-slate-900/10 rounded-2xl flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div className="max-w-md space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase font-black block">
              {language === 'sw' ? 'UFIKIAJI BILA VIKWAZO' : 'INCLUSIVE COGNITIVE ACCESS'}
            </span>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {language === 'sw' ? a11y.sectionTitleSw : a11y.sectionTitleEn}
            </h4>
            <p className="text-[11px] text-white/40 leading-relaxed font-sans">
              {language === 'sw' ? a11y.complianceSw : a11y.complianceEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 xl:gap-12">
            {/* Font Size Adjusters */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 flex items-center gap-1.5 font-sans">
                <Type size={12} className="text-brand-accent" /> {language === 'sw' ? a11y.fontSizeSw : a11y.fontSizeEn}
              </label>
              <div className="flex flex-wrap gap-1.5 bg-brand-primary dark:bg-slate-950 p-1 border border-white/10 rounded-xl">
                {[
                  { value: '100%', label: language === 'sw' ? a11y.normalSizeSw : a11y.normalSizeEn },
                  { value: '112.5%', label: language === 'sw' ? a11y.largeSizeSw : a11y.largeSizeEn },
                  { value: '125%', label: language === 'sw' ? a11y.xlSizeSw : a11y.xlSizeEn },
                  { value: '137.5%', label: language === 'sw' ? a11y.hugeSizeSw : a11y.hugeSizeEn }
                ].map((option) => {
                  const isCurrent = fontSize === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                        isCurrent
                          ? 'bg-brand-accent text-white shadow-md'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isCurrent && <Check size={10} />}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contrast adjusters */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 flex items-center gap-1.5 font-sans">
                <Eye size={12} className="text-brand-accent" /> {language === 'sw' ? a11y.contrastSw : a11y.contrastEn}
              </label>
              <div className="flex bg-brand-primary dark:bg-slate-950 p-1 border border-white/10 rounded-xl gap-1">
                <button
                  onClick={() => setHighContrast(false)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                    !highContrast
                      ? 'bg-brand-accent text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {!highContrast && <Check size={10} />}
                  {language === 'sw' ? a11y.normalContrastSw : a11y.normalContrastEn}
                </button>
                <button
                  onClick={() => setHighContrast(true)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                    highContrast
                      ? 'bg-brand-accent text-white font-extrabold border-l border-white/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {highContrast && <Check size={10} />}
                  {language === 'sw' ? a11y.highContrastSw : a11y.highContrastEn}
                </button>
              </div>
            </div>

            {/* Reset accessibility configs button */}
            {(fontSize !== '100%' || highContrast) && (
              <button
                onClick={resetAccessibility}
                className="self-end px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500 transition-colors duration-300 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer h-[34px]"
                title={language === 'sw' ? a11y.resetSw : a11y.resetEn}
              >
                <RotateCcw size={12} />
                {language === 'sw' ? a11y.resetSw : a11y.resetEn}
              </button>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30 font-sans">
            &copy; {currentYear} Niara Construction Company Limited. {t.footerRights}
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">
              {language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {language === 'sw' ? 'Masharti ya Huduma' : 'Terms of Service'}
            </a>
          </div>
          <button 
            onClick={handleScrollToTop}
            className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-brand-primary transition-all duration-300 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
