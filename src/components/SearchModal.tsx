import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Briefcase, HelpCircle, FileText, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SearchItem {
  id: string;
  type: 'service' | 'project' | 'faq';
  titleEn: string;
  titleSw: string;
  textEn: string;
  textSw: string;
  categoryEn?: string;
  categorySw?: string;
  targetId: string;
  payload: string | Record<string, any>;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search DB
  const searchItems: SearchItem[] = [
    // Services
    {
      id: 'service-1',
      type: 'service',
      titleEn: "Design & Build",
      titleSw: "Sanifu na Ujenge",
      textEn: "Our integrated approach combines architectural design with expert construction, ensuring a seamless journey from concept to completion. BIM 3D Modeling.",
      textSw: "Mkakati wetu mmoja unajumuisha upangaji wa ramani ya usanifu pamoja na ujenzi wa kitaalamu kwa safari isiyo na vikwazo. BIM 3D Modeling.",
      categoryEn: "Service",
      categorySw: "Huduma",
      targetId: "services",
      payload: "Design & Build"
    },
    {
      id: 'service-2',
      type: 'service',
      titleEn: "Residential Construction",
      titleSw: "Ujenzi wa Makazi",
      textEn: "Creating living spaces that reflect luxury and comfort. We specialize in custom homes, apartments, and modern housing estates. Soil stabilization, concrete casting.",
      textSw: "Kutengeneza maeneo ya makazi yanayoakisi anasa na faraja. Tunahusika na nyumba za kibinafsi, ghorofa, na makazi ya kisasa. Soil stabilization.",
      categoryEn: "Service",
      categorySw: "Huduma",
      targetId: "services",
      payload: "Residential Construction"
    },
    {
      id: 'service-3',
      type: 'service',
      titleEn: "Commercial Construction",
      titleSw: "Ujenzi wa Kibiashara",
      textEn: "Robust construction solutions for offices, retail spaces, and industrial complexes, designed to enhance business productivity. Post-tensioned slabs, glass glazing.",
      textSw: "Suluhisho thabiti za ujenzi wa ofisi, maeneo ya rejareja, na miundo ya viwanda kwa kuimarisha tija ya biashara zote. Suspended slabs, glass.",
      categoryEn: "Service",
      categorySw: "Huduma",
      targetId: "services",
      payload: "Commercial Construction"
    },
    {
      id: 'service-4',
      type: 'service',
      titleEn: "Construction Management",
      titleSw: "Usimamizi wa Ujenzi",
      textEn: "Expert oversight of your project from planning to handover, ensuring timelines are met and budgets are optimized. EVM, CPM methodology.",
      textSw: "Usimamizi wa kitaalamu wa mradi wako kuanzia mipango ya mwanzo hadi kukabidhi ufunguo, kuhakikisha unazingatia bajeti na ratiba. EVM, CPM.",
      categoryEn: "Service",
      categorySw: "Huduma",
      targetId: "services",
      payload: "Construction Management"
    },

    // Projects
    {
      id: 'project-1',
      type: 'project',
      titleEn: "The Vertex Plaza",
      titleSw: "The Vertex Plaza",
      textEn: "A premier commercial complex designed to redefine corporate excellence in Kisumu. Double glazing glass, heat recovery HVAC.",
      textSw: "Kituo cha kibiashara cha kwanza kilichoundwa ili kufafanua upya ubora wa kampuni huko Kisumu City. Vioo viwili, kiyoyozi, nishati.",
      categoryEn: "Commercial Project",
      categorySw: "Mradi wa Kibiashara",
      targetId: "portfolio",
      payload: "The Vertex Plaza"
    },
    {
      id: 'project-2',
      type: 'project',
      titleEn: "Heritage Hotel Restore",
      titleSw: "Heritage Hotel Restore",
      textEn: "A complete restoration of one of Kisumu's historic luxury hotel sites. Structural assessment, colonial charm brick.",
      textSw: "Ukarabati kamili wa hoteli ya kihistoria Kibuye. Tulihifadhi kuta za kale, tukaokoa taka za carbon carbon.",
      categoryEn: "Renovation Project",
      categorySw: "Ukarabati wa Thamani",
      targetId: "portfolio",
      payload: "Heritage Hotel Restore"
    },
    {
      id: 'project-3',
      type: 'project',
      titleEn: "Lakeside Mansions",
      titleSw: "Lakeside Mansions",
      textEn: "A series of high-end lake-front residences focusing on privacy and luxury. Milimani, smart home automation, greywater filtration.",
      textSw: "Upangaji wa nyumba za kifahari pembezoni mwa ziwa Milimani Kisumu. Mifumo ya kisasa ya kurejesha nishati na kusafisha maji.",
      categoryEn: "Residential Project",
      categorySw: "Mradi wa Makazi",
      targetId: "portfolio",
      payload: "Lakeside Mansions"
    },
    {
      id: 'project-4',
      type: 'project',
      titleEn: "Skyline Apartments",
      titleSw: "Skyline Apartments",
      textEn: "Contemporary multi-unit residential development offering panoramic views of Lake Victoria at Riat Hills. Rainwater harvesting.",
      textSw: "Nyumba za kisasa za ghorofa Riat Hills zenye mtazamo mzuri wa Ziwa Victoria. Matangi ya maji, taa za nishati ya jua.",
      categoryEn: "Residential Project",
      categorySw: "Mradi wa Makazi",
      targetId: "portfolio",
      payload: "Skyline Apartments"
    },
    {
      id: 'project-5',
      type: 'project',
      titleEn: "Futuristic Annex",
      titleSw: "Futuristic Annex",
      textEn: "A high-concept industrial annex designed for modern manufacturing in Kisumu West. Kinetic roof, off-grid solar, aggregate concrete.",
      textSw: "Ujenzi kamili wa viwanda usiotegemea gridi kuu Kisumu West. Nishati ya jua makorobeko na fomula ya zege.",
      categoryEn: "Industrial Project",
      categorySw: "Mradi wa Viwanda",
      targetId: "portfolio",
      payload: "Futuristic Annex"
    },
    {
      id: 'project-6',
      type: 'project',
      titleEn: "Victoria Bay Manor",
      titleSw: "Victoria Bay Manor",
      textEn: "A complete transformation of a dated 1980s villa into Mediterranean-style manor at Dunga Beach. Infinite swimming pool.",
      textSw: "Ukarabati wa jumba Dunga Beach kuwa la kisasa. Kauri, joto la jua, bwawa la kuogelea.",
      categoryEn: "Residential Project",
      categorySw: "Mradi wa Makazi",
      targetId: "portfolio",
      payload: "Victoria Bay Manor"
    },

    // FAQs
    {
      id: 'faq-1',
      type: 'faq',
      titleEn: "How does Niara establish and honor construction timelines?",
      titleSw: "Niara inahakikishaje kuwa inazingatia muda wa ujenzi uliopangwa?",
      textEn: "Building Information Modeling (BIM) paired with critical path method scheduling. Seasonal buffers.",
      textSw: "Programu za Kidijitali (BIM) zilizounganishwa na mbinu ya (CPM) kupanga na kukadiria muda wa ujenzi.",
      categoryEn: "FAQ - Timelines",
      categorySw: "Maswali - Muda",
      targetId: "faq",
      payload: "timeline-1"
    },
    {
      id: 'faq-2',
      type: 'faq',
      titleEn: "What measures are in place if adverse weather threatens progress?",
      titleSw: "Je, kuna hatua gani iwapo hali mbaya ya hewa inatishia maendeleo?",
      textEn: "Workforce rescheduling, covered techniques, and rapid-curing materials protect structures during rainy seasons.",
      textSw: "Hali ya hewa mbaya, kuhamisha mafundi kufanya kazi za ndani au kutumia teknolojia za kuzuia maji.",
      categoryEn: "FAQ - Timelines",
      categorySw: "Maswali - Muda",
      targetId: "faq",
      payload: "timeline-2"
    },
    {
      id: 'faq-3',
      type: 'faq',
      titleEn: "How accurate are your initial construction cost estimates?",
      titleSw: "Ukadiriaji wa kwanza wa gharama una usahihi kwa kiwango gani?",
      textEn: "Bill of Quantities achieves accuracy of over 95% using geotechnical soil testing and pre-construction analyses.",
      textSw: "Makadirio yetu (BQS) yana asilimia 95%. Ukaguzi wa kiwanja, kupima udongo, mifumo ya maji na umeme.",
      categoryEn: "FAQ - Budgeting",
      categorySw: "Maswali - Gharama",
      targetId: "faq",
      payload: "cost-1"
    },
    {
      id: 'faq-4',
      type: 'faq',
      titleEn: "What is the standard payment and installment structure?",
      titleSw: "Je, mfumo wa malipo uko vipi kwa kawaida?",
      textEn: "Milestones linked strictly to physical quality checks and verified completions. Mobilization deposit.",
      textSw: "Malipo yaliyogawanywa katika awamu zinazohusiana moja kwa moja na hatua halisi zilizomalizika.",
      categoryEn: "FAQ - Budgeting",
      categorySw: "Maswali - Gharama",
      targetId: "faq",
      payload: "cost-2"
    },
    {
      id: 'faq-5',
      type: 'faq',
      titleEn: "How will I be kept updated on my project’s status?",
      titleSw: "Nitajulishwa namna gani kuhusu maendeleo ya mradi wangu?",
      textEn: "Dedicated Project Steward, weekly briefs, high resolution aerial drone pictures, and interactive gantt charts.",
      textSw: "Msimamizi maalum (Project Steward), jukwaa la kidijitali, picha za ndege zisizo na rubani (drone).",
      categoryEn: "FAQ - Operations",
      categorySw: "Maswali - Utendaji",
      targetId: "faq",
      payload: "management-1"
    },
    {
      id: 'faq-6',
      type: 'faq',
      titleEn: "How does Niara navigate building permits and municipal compliance?",
      titleSw: "Je, Niara inashughulikia vipi vibali vya ujenzi na sheria za manispaa?",
      textEn: "National Construction Authority (NCA) certifications, regional municipal zoning approvals, drainage licenses, NEMA.",
      textSw: "Mamlaka ya Kitaifa ya Ujenzi (NCA), vibali vya mazingira (NEMA), vibali vya manispaa ya wilaya.",
      categoryEn: "FAQ - Compliance",
      categorySw: "Maswali - Vibali",
      targetId: "faq",
      payload: "management-2"
    }
  ];

  // Auto focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setQuery('');
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle outside click click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Keyboard shortcut listener (Ctrl+P or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % filtered.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[activeIndex]) {
            handleSelectItem(filtered[activeIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, activeIndex]);

  // Compute filtered matches
  const filtered = searchItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true; // Show all when empty to guide the user
    
    const title = (language === 'sw' ? item.titleSw : item.titleEn).toLowerCase();
    const text = (language === 'sw' ? item.textSw : item.textEn).toLowerCase();
    const cat = ((language === 'sw' ? item.categorySw : item.categoryEn) || '').toLowerCase();
    
    return title.includes(q) || text.includes(q) || cat.includes(q);
  });

  // Actionable Item selection
  const handleSelectItem = (item: SearchItem) => {
    onClose();
    
    // Scroll cleanly to the target section container
    const element = document.getElementById(item.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Delayed custom event formulation to let any scroll animations finish, feeding precise state
    setTimeout(() => {
      if (item.type === 'project') {
        window.dispatchEvent(new CustomEvent('select-portfolio-project', { detail: item.payload }));
      } else if (item.type === 'faq') {
        window.dispatchEvent(new CustomEvent('select-faq-item', { detail: item.payload }));
      } else if (item.type === 'service') {
        window.dispatchEvent(new CustomEvent('select-service', { detail: item.payload }));
      }
    }, 500);
  };

  const t = {
    placeholderEn: "Search projects, FAQs, or services... (e.g. mansions, evm, NCA)",
    placeholderSw: "Tafuta miradi, maswali, au huduma... (mf. mansions, evm, NCA)",
    noResultsEn: "No matches found for your keyword.",
    noResultsSw: "Hakuna matokeo yaliyopatikana kwa neno lako.",
    titleEn: "Niara Command Center",
    titleSw: "Kituo cha Ramani Niara",
    shortcutHelpEn: "Press esc to dismiss. Use up/down arrow keys and enter to navigate.",
    shortcutHelpSw: "Bonyeza esc kufunga. Tumia mishale ya juu na chini navi.",
    recEn: "Suggested Queries",
    recSw: "Yaliyopendekezwa"
  };

  const suggestions = language === 'sw' 
    ? ["Plaza", "Mvua", "Usimamizi", "Mansions", "Karabati"]
    : ["Plaza", "Weather", "Management", "Mansions", "Restore"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[10vh] px-4">
          
          {/* Backdrop Glass Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-brand-primary/80 dark:bg-slate-950/90 backdrop-blur-sm"
            id="global-search-backdrop"
          />

          {/* Palette body */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden relative shadow-2xl flex flex-col max-h-[75vh]"
            id="global-search-palette"
          >
            {/* Top decorative micro line */}
            <div className="h-[3px] bg-brand-accent w-full" />

            {/* Input wrap */}
            <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
              <Search size={20} className="text-slate-400 dark:text-zinc-500 shrink-0" />
              <input
                id="global-search-input"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-transparent border-0 outline-none text-sm font-semibold tracking-wide text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:ring-0 focus:border-0"
                placeholder={language === 'sw' ? t.placeholderSw : t.placeholderEn}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-brand-primary dark:hover:text-white transition-colors animate-fade-in"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Suggestions list when query is empty */}
            {!query && (
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1 shrink-0">
                  <Sparkles size={11} className="text-brand-accent" /> {language === 'sw' ? t.recSw : t.recEn}:
                </span>
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => {
                      setQuery(sug);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-brand-accent hover:text-brand-accent transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Search items scroll wrapper */}
            <div className="overflow-y-auto p-3 flex-1 space-y-1.5 max-h-[45vh] select-none">
              {filtered.length > 0 ? (
                filtered.map((item, index) => {
                  const isSelected = index === activeIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`p-3.5 rounded-xl cursor-pointer flex justify-between items-center transition-all ${
                        isSelected
                          ? 'bg-brand-primary/5 dark:bg-brand-accent/10 border-l-[3px] border-brand-accent ps-2.5 translate-x-1'
                          : 'bg-transparent border-l-[3px] border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex gap-3.5 max-w-[85%]">
                        {/* Type aligned visual indicator badge icons */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          item.type === 'service'
                            ? 'bg-blue-500/10 text-blue-500'
                            : item.type === 'project'
                              ? 'bg-amber-500/10 text-amber-500'
                              : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {item.type === 'service' && <Briefcase size={16} />}
                          {item.type === 'project' && <FileText size={16} />}
                          {item.type === 'faq' && <HelpCircle size={16} />}
                        </div>

                        {/* Title & Desc Text block */}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#a8a29e] dark:text-[#78716c]">
                              {language === 'sw' ? item.categorySw : item.categoryEn}
                            </span>
                            {isSelected && (
                              <span className="text-[8px] font-mono font-bold bg-[#172554] dark:bg-brand-accent/20 text-[#60a5fa] dark:text-brand-accent px-1 py-0.5 rounded uppercase">
                                {language === 'sw' ? 'CHAGUA' : 'SELECT'}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-xs text-brand-primary dark:text-white">
                            {language === 'sw' ? item.titleSw : item.titleEn}
                          </h4>
                          <p className="text-[11px] text-brand-secondary dark:text-slate-400 mt-1 line-clamp-1 leading-normal">
                            {language === 'sw' ? item.textSw : item.textEn}
                          </p>
                        </div>
                      </div>

                      {/* CTA arrow */}
                      <div className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                        isSelected 
                          ? 'bg-brand-accent text-white border-brand-accent'
                          : 'border-slate-100 dark:border-slate-800 text-slate-400'
                      }`}>
                        {isSelected ? <CornerDownLeft size={11} /> : <ArrowRight size={11} />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400 dark:text-zinc-500 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center">
                    <Search size={22} className="text-slate-300 dark:text-zinc-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                      {language === 'sw' ? t.noResultsSw : t.noResultsEn}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {language === 'sw' ? 'Jaribu maneno mengine' : 'Try alternative structural keywords'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Keyboard shortcuts guidelines footprint tray */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span className="hidden sm:block">
                {language === 'sw' ? t.shortcutHelpSw : t.shortcutHelpEn}
              </span>
              <span className="text-brand-accent font-bold uppercase tracking-widest text-[9px]">
                {language === 'sw' ? 'Niara Ujenzi' : 'NIARA CONSTRUCT'}
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
