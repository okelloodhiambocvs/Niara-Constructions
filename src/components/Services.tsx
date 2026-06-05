import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, Home, Building2, HardHat, ArrowUpRight, X, Cpu, Leaf, Sparkles, Check, HelpCircle } from 'lucide-react';
import CostEstimator from './CostEstimator';
import { useLanguage } from './LanguageContext';

export default function Services() {
  const { language, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const services = useMemo(() => [
    {
      title: language === 'sw' ? "Sanifu na Ujenge" : "Design & Build",
      desc: language === 'sw' 
        ? "Mkakati wetu mmoja unajumuisha upangaji wa ramani ya usanifu pamoja na ujenzi wa kitaalamu kwa safari isiyo na vikwazo." 
        : "Our integrated approach combines architectural design with expert construction, ensuring a seamless journey from concept to completion.",
      icon: <Ruler size={40} />,
      image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=2070",
      methodologies: language === 'sw'
        ? [
            "BIM 3D Modeling (Ujenzi Dijitali): Kuunda mfano halisi kabla ya ujenzi ili kuzuia migongano ya kiufundi.",
            "Upangaji Ramani Shirikishi: Kupitia ramani kwa uwazi na mteja katika kila awamu ili kuhakikisha usahihi.",
            "Usimamizi wa Kielektroniki: Kupunguza gharama zisizotarajiwa kupitia makadirio thabiti tangu kuchora."
          ]
        : [
            "BIM 3D Modeling & Virtual Prototyping: Creating digital twins to eliminate structural and system clashes.",
            "Interactive Phase-Aligned Walkthroughs: Regular collaborative design reviews ensuring no details are missed.",
            "Integrated Value Engineering: Streamlining elements during drafting to optimize budgeting and production efficiency."
          ],
      materials: language === 'sw'
        ? [
            "Simenti ya kijani: Kutumia saruji yenye viwango vya chini vya kaboni nchini Kenya.",
            "Mbao Endelevu: Mbao zilizothibitishwa na FSC ili kulinda misitu ya asili.",
            "Chuma cha hali ya juu: Kutumia nondo thabiti za kikanda zilizosindikwa kwa usalama."
          ]
        : [
            "Eco-conscious low-carbon cement: Minimizing structural carbon footprint safely.",
            "FSC-certified timber: Ethically sourced forest products preserving local ecosystems.",
            "Recycled high-tensile steel: Sourcing heavy structural reinforcement alloys locally inside Kenya."
          ],
      benefits: language === 'sw'
        ? [
            "Msimamizi mmoja tu wa mradi kwa mawasiliano mepesi and ya uwazi ya kila siku.",
            "Muda wa kazi unapungua kwa 15% hadi 20% kwa kuwa hatua zote zinashirikiana.",
            "Kuepusha bajeti kuongezeka bila mipangilio maalumu."
          ]
        : [
            "Single point of accountability ensures absolute project sync from draft to finish.",
            "Reduces delivery schedule by 15% to 20% compared to traditional disjointed methods.",
            "Prevents mid-construction budget surprises through locked-in architectural targets."
          ]
    },
    {
      title: language === 'sw' ? "Ujenzi wa Makazi" : "Residential Construction",
      desc: language === 'sw' 
        ? "Kutengeneza maeneo ya makazi yanayoakisi anasa na faraja. Tunahusika na nyumba za kibinafsi, ghorofa, na makazi ya kisasa." 
        : "Creating living spaces that reflect luxury and comfort. We specialize in custom homes, apartments, and modern housing estates.",
      icon: <Home size={40} />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
      methodologies: language === 'sw'
        ? [
            "Uimarishaji thabiti wa udongo (Soil Stabilization) kabla ya kumwaga msingi.",
            "Kumwaga saruji kwa viwango sahihi chini ya udhibiti wa joto.",
            "Ujenzi wa kuta wa kisasa na maandalizi ya miundombinu ya nyumba mahiri."
          ]
        : [
            "Rigorous soil stabilization: Testing and reinforcing load-bearing ground pre-foundation.",
            "Climate-optimized concrete casting: Perfect hydration rates overseen by certified engineers.",
            "Smart-home backbone integration: Routing structured piping for automation and sound insulation early."
          ],
      materials: language === 'sw'
        ? [
            "Matofali yanayohifadhi joto ili kupunguza matumizi ya feni/kiyoyozi.",
            "Rangi salama zisizo na kemikali mbaya (Non-toxic/VOC-free).",
            "Mifumo ya maji inayookoa rasilimali na mazingira."
          ]
        : [
            "Thermal-regulating clay bricks: Naturally moderating interior room temperatures in Kisumu's heat.",
            "Zero-VOC organic paints: Creating safe, allergen-free indoor environments instantly.",
            "High-efficiency water-saving brassware: High quality, durable fixtures saving community resources."
          ],
      benefits: language === 'sw'
        ? [
            "Mpangilio uliotengenezwa kukabili mtiririko wa asili wa upepo na mwanga wa jua.",
            "Hati ya dhamana ya miaka 10 ya usalama wa muundo mzima.",
            "Ongezeko kubwa la thamani ya nyumba yako sokoni kwa miaka mingi."
          ]
        : [
            "Microclimate ventilation layouts: Engineered to naturally stay cool and bright under the sun.",
            "Comprehensive 10-year structural warranty for peace of mind.",
            "Exceptional resale asset valuation driven by certified elite craftsmanship."
          ]
    },
    {
      title: language === 'sw' ? "Ujenzi wa Kibiashara" : "Commercial Construction",
      desc: language === 'sw' 
        ? "Suluhisho thabiti za ujenzi wa ofisi, maeneo ya rejareja, na miundo ya viwanda kwa kuimarisha tija ya biashara zote." 
        : "Robust construction solutions for offices, retail spaces, and industrial complexes, designed to enhance business productivity.",
      icon: <Building2 size={40} />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
      methodologies: language === 'sw'
        ? [
            "Mifumo ya saruji ya post-tensioned kuruhusu maeneo makubwa ya wazi.",
            "Uwekaji wa vioo vikubwa vya usalama vya kuzuia joto (curtain-wall glazing).",
            "Mifano modular za ngazi na kuta kurahisisha uundaji wa haraka."
          ]
        : [
            "Post-tensioned suspended slabs: Catering to expansive modern open-plan office architectures.",
            "Thermal curtain-wall glazing: Installing specialized energy-mitigating structural glass systems.",
            "Modular framing design: Standardizing assembly phases to slash commercial deployment overhead."
          ],
      materials: language === 'sw'
        ? [
            "Chuma cha viwango vya kibiashara chenye nguvu ya kipekee.",
            "Vioo vyenye safu mbili vinavyookoa nishati na kupunguza kelele.",
            "Marumaru (granite) asili ya Kisumu na vigae visivyopitisha maji kwa urahisi."
          ]
        : [
            "Heavy-gauge certified structural steel profiles.",
            "Acoustic double-glazed glass units: Enhancing workplace quietness and energy efficiency.",
            "Local premium Kisumu granite & anti-moisture high-traffic heavy-duty surfaces."
          ],
      benefits: language === 'sw'
        ? [
            "Upangaji makini wa mradi kuleta tija kwa muda mfupi ili uanze kupata faida haraka.",
            "Kuzingatia viwango vyote vya usalama na ulinzi dhidi ya moto vya ISO.",
            "Nafasi inayoweza kubadilishwa kwa urahisi kulingana na mahitaji ya biashara badilifu."
          ]
        : [
            "Fast-tracked commercial phasing: Getting your enterprise operationally live ahead of plan.",
            "Certifiable compliance: Ensuring ISO fire safety and heavy structural loading approvals.",
            "Scale-ready spaces: Interior configurations that allow swift business remodeling later."
          ]
    },
    {
      title: language === 'sw' ? "Usimamizi wa Ujenzi" : "Construction Management",
      desc: language === 'sw' 
        ? "Usimamizi wa kitaalamu wa mradi wako kuanzia mipango ya mwanzo hadi kukabidhi ufunguo, kuhakikisha unazingatia bajeti na ratiba." 
        : "Expert oversight of your project from planning to handover, ensuring timelines are met and budgets are optimized.",
      icon: <HardHat size={40} />,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070",
      methodologies: language === 'sw'
        ? [
            "Mfumo wa Earned Value Management (EVM) kufuatilia bajeti na kazi kila wiki.",
            "Ripoti kamili za dijiti za rasilimali kila siku kutoka kwenye eneo la ujenzi.",
            "Kutumia Critical Path Method (CPM) kuzuia ucheleweshaji wa aina yoyote."
          ]
        : [
            "Earned Value Management (EVM) reporting: Tracking financial and progress indexes weekly.",
            "Digital cloud logs: Instantly transmitting daily manpower, equipment, and milestones updates.",
            "Critical Path Analysis: Proactively correcting scheduling delays before they impact delivery."
          ],
      materials: language === 'sw'
        ? [
            "Mikataba ya moja kwa moja ya bei na wauzaji wakuu kuzuia gharama kuongezeka.",
            "Majaribio ya kila siku ya maabara kwa vifaa vinavyoletwa ili kuhakikisha ubora mkuu.",
            "Ukaguzi wa rasilimali ili kuzuia upotevu wa nyenzo eneo la ujenzi."
          ]
        : [
            "Manufacturer-direct supply pipeline: Cutting third-party markups for steel and cement.",
            "On-site laboratory material verification: Compressive strength testing of every delivered block.",
            "Zero-waste distribution algorithms: Optimizing real-time material logistics per shift."
          ],
      benefits: language === 'sw'
        ? [
            "Kuhakikisha kufuata masharti yote ya NCA (National Construction Authority) Kenya.",
            "Uharibifu na ajali sifuri kwenye kazi kupitia itifaki kali za usalama.",
            "Kuokoa hadi 12% ya bajeti kwa kutumia usimamizi wetu wa mikataba na ugavi."
          ]
        : [
            "Ensuring absolute National Construction Authority (NCA) compliance and local authorizations.",
            "Strict safety culture resulting in an industry-leading zero-accident target track record.",
            "Securing an average of 12% in sheer cost savings through professional direct bidding."
          ]
    }
  ], [language]);

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const serviceTitle = customEvent.detail;
      const matched = services.find(s => s.title === serviceTitle);
      if (matched) {
        setSelectedService(matched);
      }
    };
    window.addEventListener('select-service', handleSelectService);
    return () => window.removeEventListener('select-service', handleSelectService);
  }, [services]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <section id="services" className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-40 bg-slate-50 dark:bg-slate-900/40 rounded-full -mr-32 -mt-32 -z-0 blur-3xl opacity-50" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t.servicesBadge}
            </span>
            <h2 className="heading-lg text-brand-primary dark:text-white">
              {language === 'sw' 
                ? "Suluhisho Maalum za Ujenzi kwa Malengo ya Kisasa." 
                : "Specialized Construction Solutions for Modern Ambitions."}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-brand-secondary dark:text-zinc-300 max-w-sm mb-2 font-sans text-sm leading-relaxed"
          >
            {language === 'sw'
              ? "Tunatoa ujuzi wa tangu mwanzo hadi mwisho wa ujenzi, tukiweka kipaumbele uimara na usahihi wa hali ya juu. Bofya kadi yoyote ili kupata maelezo zaidi."
              : "We deliver end-to-end expertise across the construction lifecycle, prioritizing sustainability and precision. Click any card to explore deeper methodologies."}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-8 pt-24 hover:border-brand-accent dark:hover:border-brand-accent transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-black/20 cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <img src={service.image} alt={service.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              
              <div className="text-brand-accent mb-8 relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                {service.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className="heading-md text-xl mb-4 group-hover:text-brand-accent transition-colors dark:text-white dark:group-hover:text-brand-accent">
                  {service.title}
                </h3>
                <p className="text-xs text-brand-secondary dark:text-zinc-300 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary dark:text-white hover:text-brand-accent dark:hover:text-brand-accent group-hover:gap-4 transition-all cursor-pointer bg-transparent border-none p-0"
                >
                  {language === 'sw' ? 'Soma Undani' : 'Explore Details'} <ArrowUpRight size={14} />
                </button>
              </div>
              
              {/* Card number decoration */}
              <span className="absolute top-8 right-8 text-4xl font-display font-black text-slate-200 dark:text-slate-800 group-hover:text-brand-accent/20 transition-colors pointer-events-none select-none">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Interactive Modal Backed by Framer Motion */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 select-none">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-brand-primary/85 dark:bg-slate-950/90 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto select-text flex flex-col z-10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
              >
                {/* Visual Header / Banner */}
                <div className="relative h-48 md:h-56 bg-brand-primary overflow-hidden flex-shrink-0">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
                  
                  {/* Title & Badge */}
                  <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8">
                    <span className="text-brand-accent dark:text-brand-accent text-[9px] font-black uppercase tracking-[0.25em] bg-brand-accent/10 dark:bg-brand-accent/20 px-3 py-1 rounded-full mb-3 inline-block">
                      {language === 'sw' ? 'Maelezo ya Kina' : 'Deep Dive'}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight flex items-center gap-3">
                      {selectedService.title}
                    </h3>
                  </div>

                  {/* Close Floating Trigger */}
                  <button
                    onClick={() => setSelectedService(null)}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 dark:bg-slate-900/40 dark:hover:bg-slate-800/60 text-white rounded-full p-2 border border-white/10 transition-all cursor-pointer backdrop-blur-sm group hover:rotate-90 duration-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content Sections inside Grid */}
                <div className="p-6 md:p-8 space-y-8 flex-grow">
                  {/* Description Box */}
                  <p className="text-sm md:text-base text-brand-secondary dark:text-zinc-300 leading-relaxed max-w-3xl border-l-[3px] border-brand-accent pl-4 font-sans">
                    {selectedService.desc}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 pt-4">
                    {/* Methodologies */}
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-100/60 dark:border-slate-800/60 transition-colors">
                      <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
                        <Cpu size={16} />
                        {language === 'sw' ? 'Mbinu za Kazi' : 'Methodology'}
                      </div>
                      <h4 className="font-display font-bold text-sm text-brand-primary dark:text-white">
                        {language === 'sw' ? 'Teknolojia & Mchakato' : 'Systems & Process'}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.methodologies.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-brand-secondary dark:text-zinc-350 leading-relaxed font-sans flex items-start gap-2">
                             <span className="w-1 h-1 bg-brand-accent rounded-full mt-1.5 flex-shrink-0" />
                             <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Material Sourcing */}
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-100/60 dark:border-slate-800/60 transition-colors">
                      <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
                        <Leaf size={16} className="text-emerald-500/80" />
                        {language === 'sw' ? 'Upatikanaji Vifaa' : 'Material Sourcing'}
                      </div>
                      <h4 className="font-display font-bold text-sm text-brand-primary dark:text-white">
                        {language === 'sw' ? 'Uimara & Utunzaji' : 'Ecology & Sourcing'}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.materials.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-brand-secondary dark:text-zinc-355 leading-relaxed font-sans flex items-start gap-2">
                             <span className="w-1 h-1 bg-brand-accent rounded-full mt-1.5 flex-shrink-0" />
                             <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialized Benefits */}
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-100/60 dark:border-slate-800/60 transition-colors">
                      <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
                        <Sparkles size={16} className="text-brand-accent" />
                        {language === 'sw' ? 'Manufaa Kwako' : 'Key Benefits'}
                      </div>
                      <h4 className="font-display font-bold text-sm text-brand-primary dark:text-white">
                        {language === 'sw' ? 'Thamani Halisi' : 'Tangible Value'}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.benefits.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-brand-secondary dark:text-zinc-350 leading-relaxed font-sans flex items-start gap-2">
                            <Check size={14} className="text-brand-accent flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer of modal */}
                <div className="p-6 md:px-8 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                    <HelpCircle size={14} />
                    {language === 'sw' ? 'Maswali mengine yoyote kuhusu huduma?' : 'Have other service inquiries?'}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-brand-primary dark:text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {language === 'sw' ? 'Funga' : 'Close'}
                    </button>
                    <a
                      href="#contact"
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2 bg-brand-primary dark:bg-brand-accent text-white dark:text-brand-primary hover:bg-brand-primary/95 dark:hover:bg-brand-accent/90 text-xs font-bold uppercase tracking-wider shadow-md transition-all text-center flex items-center justify-center gap-2"
                    >
                      {language === 'sw' ? 'Agiza Ushauri Sasa' : 'Schedule Consultation'}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic Architect & Engineering Cost Estimator Panel */}
        <CostEstimator />
      </div>
    </section>
  );
}
