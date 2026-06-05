import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from './LanguageContext';

export default function Contact() {
  const { success, error } = useToast();
  const { language, t } = useLanguage();
  
  // Controlled inputs state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Design & Build');
  const [details, setDetails] = useState('');
  
  // Submitting spinner state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <MessageCircle className="text-brand-accent" size={24} />,
      title: "WhatsApp",
      details: ["+254 716 417 104"],
      action: "https://wa.me/254716417104"
    },
    {
      icon: <Mail className="text-brand-accent" size={24} />,
      title: language === 'sw' ? 'Barua Pepe' : 'Email Us',
      details: ["niaraconstrction@gmail.com"],
      action: "mailto:niaraconstrction@gmail.com"
    },
    {
      icon: <MapPin className="text-brand-accent" size={24} />,
      title: language === 'sw' ? 'Tupate Hapa' : 'Visit Us',
      details: [t.addressLabel, "Kenya"],
      action: "https://maps.google.com"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Strict premium validations in the selected language
    if (!name.trim()) {
      error(t.formValidationNameReq, language === 'sw' ? "Jina Linahitajika" : "Name Required");
      return;
    }
    if (name.trim().length < 3) {
      error(t.formValidationNameShort, language === 'sw' ? "Kosa la Jina" : "Invalid Name");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      error(t.formValidationEmailReq, language === 'sw' ? "Barua Pepe Inahitajika" : "Email Required");
      return;
    }

    // Phone validation
    if (!phone.trim()) {
      error(t.formValidationPhoneReq, language === 'sw' ? "Nambari ya Simu Inahitajika" : "Phone Required");
      return;
    }

    // Details validation
    if (!details.trim()) {
      error(t.formValidationDetailsReq, language === 'sw' ? "Maelezo yanahitajika" : "Details Required");
      return;
    }
    if (details.trim().length < 10) {
      error(t.formValidationDetailsShort, language === 'sw' ? "Maelezo ya Jengo" : "Project Scope");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate highly polished, realistic database write & request handling
      await new Promise((resolve) => setTimeout(resolve, 1400));
      
      // Success response toast notification
      success(
        t.formSubmitSuccessMsg,
        t.formSubmitSuccessTitle,
        7000
      );

      // Clean form inputs
      setName('');
      setEmail('');
      setPhone('');
      setService('Design & Build');
      setDetails('');
    } catch (err) {
      error(
        language === 'sw' 
          ? "Mitandao yetu inafanyiwa marekebisho ya kiufundi kwa sasa. Tafadhali wasiliana nasi moja kwa moja kwa kutumia WhatsApp."
          : "Our servers are currently undergoing routine maintenance. Please connect directly via WhatsApp.",
        language === 'sw' ? "Hitalafu ya Mtandao" : "Connection Interrupted"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t.contactBadge}
            </span>
            <h2 className="heading-lg mb-8">
              {t.contactHeading}
            </h2>
            <p className="text-brand-secondary dark:text-zinc-300 text-lg mb-12 leading-relaxed">
              {t.contactSubtitle}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="group">
                  <div className="mb-4">{info.icon}</div>
                  <h4 className="font-display font-bold text-brand-primary dark:text-white mb-2">{info.title}</h4>
                  {info.details.map((line, i) => (
                    <p key={i} className="text-sm text-brand-secondary dark:text-zinc-350">{line}</p>
                  ))}
                  <a href={info.action} className="text-xs font-bold uppercase tracking-widest text-brand-accent mt-3 inline-block hover:ml-1 transition-all">
                    {language === 'sw' ? 'Wasiliana Nasi' : 'Reach Out'} &rarr;
                  </a>
                </div>
              ))}
              <div className="group">
                <div className="mb-4"><Clock className="text-brand-accent" size={24} /></div>
                <h4 className="font-display font-bold text-brand-primary dark:text-white mb-2">
                  {language === 'sw' ? 'Saa za Kazi' : 'Office Hours'}
                </h4>
                <p className="text-sm text-brand-secondary dark:text-zinc-350">
                  {language === 'sw' ? 'Jumatatu - Ijumaa: 8:00 AM - 5:00 PM' : 'Mon - Fri: 8:00 AM - 5:00 PM'}
                </p>
                <p className="text-sm text-brand-secondary dark:text-zinc-350">
                  {language === 'sw' ? 'Jumamosi: 9:00 AM - 1:00 PM' : 'Sat: 9:00 AM - 1:00 PM'}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-300"
          >
            <h3 className="heading-md text-2xl mb-8">
              {t.formTitle}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-zinc-200 mb-2">
                    {t.formName}
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-sm text-brand-primary dark:text-white focus:border-brand-accent outline-none transition-colors disabled:opacity-60 placeholder-slate-400 dark:placeholder-zinc-500" 
                    placeholder={t.formNamePlaceholder} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-zinc-200 mb-2">
                    {t.formEmail}
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-sm text-brand-primary dark:text-white focus:border-brand-accent outline-none transition-colors disabled:opacity-60 placeholder-slate-400 dark:placeholder-zinc-500" 
                    placeholder={t.formEmailPlaceholder} 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-zinc-200 mb-2">
                    {t.formPhone}
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-sm text-brand-primary dark:text-white focus:border-brand-accent outline-none transition-colors disabled:opacity-60 placeholder-slate-400 dark:placeholder-zinc-500" 
                    placeholder={t.formPhonePlaceholder} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-zinc-200 mb-2">
                    {t.formService}
                  </label>
                  <div className="relative">
                    <select 
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-sm text-brand-primary dark:text-white focus:border-brand-accent outline-none transition-colors rounded-none cursor-pointer disabled:opacity-60 appearance-none"
                    >
                      <option value="Design & Build" className="dark:bg-slate-900">
                        {language === 'sw' ? 'Sanifu na Ujenge' : 'Design & Build'}
                      </option>
                      <option value="Residential Construction" className="dark:bg-slate-900">
                        {language === 'sw' ? 'Ujenzi wa Makazi' : 'Residential Construction'}
                      </option>
                      <option value="Commercial Construction" className="dark:bg-slate-900">
                        {language === 'sw' ? 'Ujenzi wa Kibiashara' : 'Commercial Construction'}
                      </option>
                      <option value="Construction Management" className="dark:bg-slate-900">
                        {language === 'sw' ? 'Usimamizi wa Ujenzi' : 'Construction Management'}
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      &darr;
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-zinc-200 mb-2">
                  {language === 'sw' ? 'Maelezo ya Kina' : 'Project Details'}
                </label>
                <textarea 
                  rows={4} 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-sm text-brand-primary dark:text-white focus:border-brand-accent outline-none transition-colors disabled:opacity-60 placeholder-slate-400 dark:placeholder-zinc-500" 
                  placeholder={t.formDetailsPlaceholder}
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full justify-center gap-3 py-5 uppercase text-sm tracking-widest font-bold disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    {t.formSubmitting} <Loader2 className="animate-spin" size={18} />
                  </>
                ) : (
                  <>
                    {t.formSubmit} <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
