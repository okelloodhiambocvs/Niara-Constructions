import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Globe, Sun, Moon, Search } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Custom cross-browser trigger bindings (Ctrl+P or Cmd+K)
      if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.aboutLink, href: '#about' },
    { name: t.servicesLink, href: '#services' },
    { name: t.projectsLink, href: '#portfolio' },
    { name: t.processLink, href: '#process' },
    { name: language === 'sw' ? 'Kazi' : 'Careers', href: '#careers' },
    { name: t.faqLink, href: '#faq' },
    { name: t.contactLink, href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-accent origin-left z-[9999]" 
        style={{ scaleX }} 
      />

      {/* Top bar */}
      <div className="hidden lg:flex bg-brand-primary text-white py-2 px-12 justify-between items-center text-xs font-medium tracking-wider dark:bg-slate-950 dark:border-b dark:border-slate-900 transition-colors duration-300">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5"><Phone size={14} className="text-brand-accent" /> {t.phoneLabel}</span>
          <span className="flex items-center gap-1.5"><Mail size={14} className="text-brand-accent" /> {t.emailLabel}</span>
        </div>
        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-accent" /> {t.addressLabel}</div>
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-4 border-b dark:border-slate-800' 
          : 'top-0 lg:top-8 bg-transparent py-6'
      }`}>
        <div className="container-custom px-6 flex justify-between items-center">
          <a href="#" className="hover:opacity-90 transition-opacity">
            <Logo variant="horizontal" height={40} light={theme === 'dark'} />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-brand-accent ${
                  isScrolled 
                    ? 'text-brand-primary dark:text-zinc-200' 
                    : theme === 'dark' 
                      ? 'text-zinc-200 lg:text-white dark:text-zinc-200' 
                      : 'text-brand-primary lg:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Premium Language Toggler */}
            <div className={`flex items-center gap-1 p-[3px] border rounded transition-colors ${
              isScrolled 
                ? 'border-slate-200 dark:border-slate-800' 
                : theme === 'dark'
                  ? 'border-white/10 lg:border-white/20'
                  : 'border-brand-primary/25'
            }`} id="language-switcher">
              <Globe size={11} className={`ml-1.5 mr-0.5 ${
                isScrolled 
                  ? 'text-slate-400 dark:text-slate-500' 
                  : theme === 'dark'
                    ? 'text-white/60 lg:text-white/60'
                    : 'text-brand-primary/70'
              }`} />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 text-[8px] font-black uppercase tracking-widest transition-all rounded-[2px] cursor-pointer ${
                  language === 'en'
                    ? 'bg-brand-accent text-white shadow-sm'
                    : isScrolled 
                      ? 'text-slate-500 hover:text-brand-primary dark:text-slate-400' 
                      : theme === 'dark'
                        ? 'text-white/70 lg:text-white/70 hover:text-white'
                        : 'text-brand-primary/70 hover:text-brand-primary'
                }`}
                title="Switch to English"
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-1.5 py-1 text-[8px] font-black uppercase tracking-widest transition-all rounded-[2px] cursor-pointer ${
                  language === 'sw'
                    ? 'bg-brand-accent text-white shadow-sm'
                    : isScrolled 
                      ? 'text-slate-500 hover:text-brand-primary dark:text-slate-400' 
                      : theme === 'dark'
                        ? 'text-white/70 lg:text-white/70 hover:text-white'
                        : 'text-brand-primary/70 hover:text-brand-primary'
                }`}
                title="Badilisha hadi Kiswahili"
                aria-label="Badilisha hadi Kiswahili"
              >
                SW
              </button>
            </div>

            {/* Premium Theme Toggler */}
            <button
               onClick={toggleTheme}
               className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center hover:bg-brand-accent/10 hover:text-brand-accent ${
                 isScrolled 
                   ? 'border-slate-200 dark:border-slate-800 text-brand-primary dark:text-zinc-200' 
                   : theme === 'dark'
                     ? 'border-white/10 lg:border-white/20 text-white hover:border-brand-accent'
                     : 'border-brand-primary/20 text-brand-primary hover:border-brand-accent'
               }`}
               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
               aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} className="text-brand-accent" />}
            </button>

            {/* Desktop Command Center Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center hover:bg-brand-accent/10 hover:text-brand-accent ${
                isScrolled 
                  ? 'border-slate-200 dark:border-slate-800 text-brand-primary dark:text-zinc-200' 
                  : theme === 'dark'
                    ? 'border-white/10 lg:border-white/20 text-white hover:border-brand-accent'
                    : 'border-brand-primary/20 text-brand-primary hover:border-brand-accent'
              }`}
              title={language === 'sw' ? 'Tafuta (Ctrl+P)' : 'Search (Ctrl+P)'}
              aria-label={language === 'sw' ? 'Tafuta' : 'Search'}
            >
              <Search size={14} />
            </button>

            <a 
              href="#contact" 
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                isScrolled 
                  ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white dark:border-brand-accent dark:text-brand-accent dark:hover:bg-brand-accent dark:hover:text-brand-primary' 
                  : theme === 'dark'
                    ? 'border-zinc-200 text-zinc-200 lg:border-white lg:text-white hover:bg-white hover:text-brand-primary'
                    : 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
              }`}
            >
              {t.getQuoteButton}
            </a>
          </div>

          {/* Mobile Menu Toggle & Language & Theme Buttons */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Quick search toggle for mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-brand-primary dark:text-zinc-200 flex items-center justify-center hover:bg-brand-accent/10 hover:text-brand-accent"
              title={language === 'sw' ? 'Tafuta' : 'Search'}
              aria-label={language === 'sw' ? 'Tafuta' : 'Search'}
            >
              <Search size={13} />
            </button>

            {/* Quick theme toggle for mobile */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-brand-primary dark:text-zinc-200 flex items-center justify-center"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={13} /> : <Sun size={13} className="text-brand-accent" />}
            </button>

            {/* Quick language toggle for mobile */}
            <div className="flex items-center gap-0.5 p-[2px] border border-slate-200 dark:border-slate-800 rounded">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded-[2px] ${language === 'en' ? 'bg-brand-accent text-white' : 'text-slate-400'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded-[2px] ${language === 'sw' ? 'bg-brand-accent text-white' : 'text-slate-400'}`}
              >
                SW
              </button>
            </div>

            <button 
              className={`p-2 transition-colors ${
                isScrolled 
                  ? 'text-brand-primary dark:text-zinc-200' 
                  : theme === 'dark'
                    ? 'text-white'
                    : 'text-brand-primary'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl py-8 px-6 lg:hidden flex flex-col gap-6 border-b dark:border-slate-800 transition-colors"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-brand-primary dark:text-zinc-200 uppercase tracking-widest hover:text-brand-accent"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary justify-center uppercase text-sm tracking-widest"
              >
                {t.getQuoteButton}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Command Center Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
