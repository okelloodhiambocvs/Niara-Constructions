import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Users, 
  ShieldAlert, 
  GraduationCap, 
  MapPin, 
  Clock, 
  ChevronRight, 
  X, 
  Plus, 
  Upload, 
  Check, 
  ArrowRight,
  ClipboardCheck,
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useToast } from './Toast';

export default function Careers() {
  const { language } = useLanguage();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    roleType: 'engineer',
    experience: '1-3',
    coverLetter: ''
  });

  const t = {
    badgeEn: "BUILD THE FUTURE WITH US",
    badgeSw: "JENGA HISTORIA NASI",
    titleEn: "Where Craftsmanship Meets Human Dignity",
    titleSw: "Muungano wa Umahiri na Utu",
    descEn: "We believe a structure is only as strong as the human hands that laid its foundation. At Niara, we combine bleeding-edge digital building modeling (BIM) with continuous field apprenticeships, safe working environments, and fair sustainable wages.",
    descSw: "Tunaamini kuwa jengo lina nguvu tu kulingana na mikono ya wanadamu iliyoweka msingi wake. Pale Niara, tunaunganisha uelewa wa kisasa wa kidijitali wa majengo (BIM) na mafunzo thabiti ya kiwanjani, maeneo salama ya kazi, na mishahara mizuri.",
    
    // Core values
    val1TitleEn: "Uncompromising Safety Standards",
    val1TitleSw: "Viwango vya Usalama Visivyoyumba",
    val1DescEn: "With strict safety protocols governed by NCA guidelines, we maintain clean on-site hazards with zero major accident rates.",
    val1DescSw: "Kukiwa na miongozo thabiti ya NCA ya usalama, tunasimamia hatari zote kiwanjani bila ajali kubwa.",
    
    val2TitleEn: "Apprenticeship & Academy Initiatives",
    val2TitleSw: "Mafunzo ya Vitendo (Ujuzi)",
    val2DescEn: "We proactively train secondary graduates and masonry apprentices under seasoned local Kenyan structural masters.",
    val2DescSw: "Tunaelimisha kwa vitendo vijana na mafundi wanaoibukia chini ya wasimamizi na wahandisi wazoefu wa Kenya.",

    val3TitleEn: "Equity and Local Opportunities",
    val3TitleSw: "Fursa Zitokanazo na Maeneo Yetu",
    val3DescEn: "We prioritize hiring crew members and sourcing logistical tools from adjacent communities to grow micro-economies.",
    val3DescSw: "Tunatoa kipaumbele kwa kuajiri wafanyakazi na kupata vifaa kutoka jamii zetu za karibu ili kuongeza uchumi wao.",

    // Status Area
    statusTitleEn: "Current Openings Status",
    statusTitleSw: "Hali ya Nafasi za Kazi",
    statusEn: "All active site positions are currently filled by our core teams. However, our rapid East African expansion means we are constantly review profiles for our organic talent reservoir.",
    statusSw: "Nafasi zote za kazi zimejazwa kwa sasa na vikundi vyetu vikuu. Hata hivyo, ukuaji wetu wa haraka kote Afrika Mashariki unamaanisha tunakagua wasifu mara kwa mara.",

    btnExpressEn: "Express Interest / Join Talent Pool",
    btnExpressSw: "Wasilisha Nia Yako / Jiunge",
    
    // Form inside modal
    modalTitleEn: "Tell Us Why You're Built For Niara",
    modalTitleSw: "Eleza Sababu Unafaa Kujiunga na Niara",
    modalSubtitleEn: "Submit your details for future structural supervisor, engineer, design coordinator, or apprentice opening tracks.",
    modalSubtitleSw: "Tafadhali wasilisha taarifa zako kwa ajili ya nafasi zijazo za wasimamizi, wahandisi, au wanafunzi wa mafunzo.",
    
    labelNameEn: "Full Name",
    labelNameSw: "Jina Kamili",
    labelEmailEn: "Email Address",
    labelEmailSw: "Anwani ya Barua Pepe",
    labelPhoneEn: "Phone Number",
    labelPhoneSw: "Nambari ya Simu",
    labelTypeEn: "Primary Area of Interest",
    labelTypeSw: "Eneo Lako la Upendeleo",
    labelExpEn: "Years of Active Field Experience",
    labelExpSw: "Miaka ya Uzoefu Kiwanjani",
    labelCoverEn: "Statement of Intent & Purpose",
    labelCoverSw: "Maelezo ya Kusudi na Nia Yako",
    placeholderCoverEn: "Briefly tell us how your personal principles or technical track record align with safe, premium human-centric construction...",
    placeholderCoverSw: "Tueleze kwa ufupi jinsi maadili au uzoefu wako wa kiufundi unavyoendana na ujenzi salama na wa kisasa wa Niara...",
    
    // Select Options
    optEngineerEn: "Structural / Project Engineer",
    optEngineerSw: "Mhandisi wa Majengo / Miradi",
    optSupervisorEn: "Site Quality Supervisor or Foreman",
    optSupervisorSw: "Msimamizi wa Ubora wa Kiwanja",
    optApprenticeEn: "Apprentice / Assistant Estimator",
    optApprenticeSw: "Mwanafunzi / Mkadiriaji Msaidizi",
    optSpecialistEn: "Safety Inspector & Compliance",
    optSpecialistSw: "Mkaguzi wa Usalama na Vibali",
    optOtherEn: "Other Allied Carpentry/Masonry Trades",
    optOtherSw: "Kazi Nyingine za Kufundi/Useremala",

    uploadLabelEn: "Upload CV / Resume (PDF, DOCX max 10MB)",
    uploadLabelSw: "Pakia CV / Wasifu (PDF, DOCX hadi 10MB)",
    fileSelectedEn: "File selected successfully!",
    fileSelectedSw: "Faili limepakiwa kikamilifu!",
    clickToBrowseEn: "Click to drag or browse local files",
    clickToBrowseSw: "Bofya hapa ili kuburuta au kutafuta faili",

    submitEn: "Submit Interest Portfolio",
    submitSw: "Wasilisha Taarifa Zako",
    submittingEn: "Registering Profile...",
    submittingSw: "Tunasajili Taarifa...",
    successTitleEn: "Application Submitted Successfully",
    successTitleSw: "Taarifa Zimewasilishwa Kikamilifu",
    successDescEn: "Thank you for sharing your professional profile. Your interest portfolio is secure in our candidate pool; our logistics team will read it once roles expand.",
    successDescSw: "Asante kwa kushiriki wasifu wako wa kitaalam. Taarifa zako zimehifadhiwa salama; timu yetu ya rasilimali watu itakufikia nafasi zikiongezeka.",
    errorDocEn: "Please fill out all mandatory fields and attach a verified credential or CV.",
    errorDocSw: "Tafadhali jaza sehemu zote za lazima na uweke CV au wasifu uliothibitishwa."
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.coverLetter || !file) {
      toast.error(
        language === 'sw' ? t.errorDocSw : t.errorDocEn,
        language === 'sw' ? 'Hitilafu ya Kulaza' : 'Submission Alert'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate database network lag nicely
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        language === 'sw' ? t.successDescSw : t.successDescEn,
        language === 'sw' ? t.successTitleSw : t.successTitleEn,
        6000
      );
      
      // Reset Form State
      setForm({
        name: '',
        email: '',
        phone: '',
        roleType: 'engineer',
        experience: '1-3',
        coverLetter: ''
      });
      setFile(null);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <section id="careers" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative architectural grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,138,126,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(17,138,126,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none select-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Values / Human-Centric Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
                {language === 'sw' ? t.badgeSw : t.badgeEn}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-primary dark:text-white tracking-tight mb-5 leading-tight">
                {language === 'sw' ? t.titleSw : t.titleEn}
              </h2>
              <p className="text-brand-secondary dark:text-slate-300 text-sm md:text-base leading-relaxed">
                {language === 'sw' ? t.descSw : t.descEn}
              </p>
            </div>

            {/* Core Human Principles Grid */}
            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-primary dark:text-white mb-1">
                    {language === 'sw' ? t.val1TitleSw : t.val1TitleEn}
                  </h4>
                  <p className="text-xs text-brand-secondary dark:text-slate-400 leading-normal">
                    {language === 'sw' ? t.val1DescSw : t.val1DescEn}
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-primary dark:text-white mb-1">
                    {language === 'sw' ? t.val2TitleSw : t.val2TitleEn}
                  </h4>
                  <p className="text-xs text-brand-secondary dark:text-slate-400 leading-normal">
                    {language === 'sw' ? t.val2DescSw : t.val2DescEn}
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-primary dark:text-white mb-1">
                    {language === 'sw' ? t.val3TitleSw : t.val3TitleEn}
                  </h4>
                  <p className="text-xs text-brand-secondary dark:text-slate-400 leading-normal">
                    {language === 'sw' ? t.val3DescSw : t.val3DescEn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sourcing State Display Component */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 p-8 md:p-10 border border-slate-100 dark:border-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[460px]">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-brand-accent/5 rounded-full filter blur-xl pointer-events-none select-none" />
            
            <div>
              <div className="flex items-center gap-2 text-slate-500 mb-6 font-mono text-[10px] tracking-widest uppercase">
                <Briefcase size={14} className="text-brand-accent" /> {language === 'sw' ? 'MABADILIKO YA TALENT' : 'TALENT ACQUISITION POOL'}
              </div>

              <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/30 border border-brand-primary/15 rounded px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:text-zinc-300">
                  {language === 'sw' ? 'Hakuna Nafasi Kamili Sasa' : 'No Active Job Openings'}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-brand-primary dark:text-white mb-4 leading-tight">
                {language === 'sw' ? t.statusTitleSw : t.statusTitleEn}
              </h3>
              <p className="text-xs text-brand-secondary dark:text-slate-400 leading-relaxed mb-6">
                {language === 'sw' ? t.statusSw : t.statusEn}
              </p>
            </div>

            <div>
              {/* Premium application portal trigger card */}
              <div className="p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl mb-6 flex gap-3 items-center">
                <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 block mb-0.5">TALENT TRACK</span>
                  <p className="text-xs font-bold text-brand-primary dark:text-zinc-200">
                    {language === 'sw' ? t.labelTypeSw : t.labelTypeEn}
                  </p>
                </div>
              </div>

              <button
                id="careers-modal-trigger"
                onClick={() => setIsModalOpen(true)}
                className="btn-primary w-full justify-center group text-xs uppercase tracking-widest py-3.5 hover:gap-3 transition-all cursor-pointer"
              >
                {language === 'sw' ? t.btnExpressSw : t.btnExpressEn}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Talent Application Interactive Modal Portal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-primary/80 dark:bg-slate-950/90 backdrop-blur-sm"
              id="careers-modal-backdrop"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, type: "spring", damping: 30, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[90vh]"
              id="careers-modal"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-emerald-500 to-amber-500" />

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-brand-accent uppercase font-black mb-1.5">
                    <Sparkles size={11} /> {language === 'sw' ? 'TAKADIA YA VIPAJI' : 'TALENT GATEWAY'}
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-brand-primary dark:text-white leading-tight">
                    {language === 'sw' ? t.modalTitleSw : t.modalTitleEn}
                  </h3>
                  <p className="text-[11px] text-brand-secondary dark:text-slate-400 mt-1 leading-relaxed">
                    {language === 'sw' ? t.modalSubtitleSw : t.modalSubtitleEn}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-brand-accent hover:text-brand-accent text-slate-400 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Form Scroll Area */}
              <form onSubmit={handleApply} className="p-6 md:p-8 overflow-y-auto space-y-5 flex-1 select-none">
                
                {/* Visual grid 2 columns */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-name" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                      <User size={13} className="text-slate-400" /> {language === 'sw' ? t.labelNameSw : t.labelNameEn} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="talent-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input text-xs"
                      placeholder="e.g. Kiprop Kipruto"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-email" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                      <Mail size={13} className="text-slate-400" /> {language === 'sw' ? t.labelEmailSw : t.labelEmailEn} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="talent-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input text-xs"
                      placeholder="e.g. kiprop@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-phone" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-400" /> {language === 'sw' ? t.labelPhoneSw : t.labelPhoneEn} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="talent-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="form-input text-xs"
                      placeholder="e.g. +254 712 345 678"
                    />
                  </div>

                  {/* Years of Experience Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-exp" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                      <FileText size={13} className="text-slate-400" /> {language === 'sw' ? t.labelExpSw : t.labelExpEn}
                    </label>
                    <select
                      id="talent-exp"
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className="form-input text-xs bg-white dark:bg-slate-950 cursor-pointer"
                    >
                      <option value="0-1">{language === 'sw' ? 'Chini ya mwaka 1 (Ama Mwanafunzi)' : 'Less than 1 Year (or Apprentice)'}</option>
                      <option value="1-3">1 - 3 {language === 'sw' ? 'Miaka' : 'Years'}</option>
                      <option value="3-7">3 - 7 {language === 'sw' ? 'Miaka' : 'Years'}</option>
                      <option value="7+">7+ {language === 'sw' ? 'Miaka ya Ubora' : 'Years of Field Excellence'}</option>
                    </select>
                  </div>
                </div>

                {/* Dropdown Role interest */}
                <div className="space-y-1.5">
                  <label htmlFor="talent-role" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                    <Briefcase size={13} className="text-slate-400" /> {language === 'sw' ? t.labelTypeSw : t.labelTypeEn}
                  </label>
                  <select
                    id="talent-role"
                    value={form.roleType}
                    onChange={(e) => setForm({ ...form, roleType: e.target.value })}
                    className="form-input text-xs bg-white dark:bg-slate-950 cursor-pointer"
                  >
                    <option value="engineer">{language === 'sw' ? t.optEngineerSw : t.optEngineerEn}</option>
                    <option value="supervisor">{language === 'sw' ? t.optSupervisorSw : t.optSupervisorEn}</option>
                    <option value="apprentice">{language === 'sw' ? t.optApprenticeSw : t.optApprenticeEn}</option>
                    <option value="specialist">{language === 'sw' ? t.optSpecialistSw : t.optSpecialistEn}</option>
                    <option value="other">{language === 'sw' ? t.optOtherSw : t.optOtherEn}</option>
                  </select>
                </div>

                {/* Statement of Intent / Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="talent-cover" className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-slate-400" /> {language === 'sw' ? t.labelCoverSw : t.labelCoverEn} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="talent-cover"
                    required
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    className="form-input text-xs resize-none leading-relaxed"
                    placeholder={language === 'sw' ? t.placeholderCoverSw : t.placeholderCoverEn}
                  />
                </div>

                {/* CV Upload Component */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-zinc-300 block mb-1">
                    {language === 'sw' ? t.uploadLabelSw : t.uploadLabelEn} <span className="text-red-500">*</span>
                  </span>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 md:p-6 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-brand-accent bg-brand-accent/5' 
                        : file 
                          ? 'border-emerald-500 bg-emerald-500/[0.02]' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-brand-accent/60 hover:bg-slate-50/50 dark:hover:bg-slate-900/40'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <Check size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-md">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-emerald-500 font-semibold font-mono">
                          {language === 'sw' ? t.fileSelectedSw : t.fileSelectedEn} ({Math.round(file.size / 1024)} KB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                          <Upload size={18} />
                        </div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {language === 'sw' ? t.clickToBrowseSw : t.clickToBrowseEn}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">
                          PDF, DOCX (Max 10MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form CTA Submit Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center text-xs uppercase tracking-widest py-3.5 gap-2 cursor-pointer disabled:opacity-80"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {language === 'sw' ? t.submittingSw : t.submittingEn}
                      </>
                    ) : (
                      <>
                        <ClipboardCheck size={16} />
                        {language === 'sw' ? t.submitSw : t.submitEn}
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
