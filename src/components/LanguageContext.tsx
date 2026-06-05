import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'sw';

interface TranslationSet {
  // Top bar / Utilities
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  
  // Navbar
  aboutLink: string;
  servicesLink: string;
  projectsLink: string;
  processLink: string;
  faqLink: string;
  contactLink: string;
  getQuoteButton: string;

  // Hero Section
  heroBadge: string;
  heroHeading: string;
  heroDesc: string;
  heroPortfolioBtn: string;
  heroConsultBtn: string;

  // About Section
  aboutBadge: string;
  aboutHeading: string;
  aboutDesc1: string;
  aboutDesc2: string;
  statProjects: string;
  statYears: string;
  statSatisfaction: string;

  // Services Section
  servicesBadge: string;
  servicesHeading: string;
  servicesSublabel: string;

  // Cost Estimator Section
  estBadge: string;
  estHeading: string;
  estDesc: string;
  estStep1: string;
  estTypeRes: string;
  estTypeResDesc: string;
  estTypeCom: string;
  estTypeComDesc: string;
  estTypeDesign: string;
  estTypeDesignDesc: string;
  estTypeRen: string;
  estTypeRenDesc: string;
  estStep2: string;
  estUnitM: string;
  estUnitFt: string;
  estAreaBound: string;
  estStep3: string;
  estFinishStandard: string;
  estFinishStandardDesc: string;
  estFinishPremium: string;
  estFinishPremiumDesc: string;
  estFinishLuxury: string;
  estFinishLuxuryDesc: string;
  estPlaqueHeader: string;
  estPlaqueDesc: string;
  estPlaqueBound: string;
  estBreakdownMaterials: string;
  estBreakdownLabor: string;
  estBreakdownPermits: string;
  estDisclaimer: string;
  estCtaButton: string;

  // Process Section
  processBadge: string;
  processHeading: string;
  processSublabel: string;
  processStep1Title: string;
  processStep1Desc: string;
  processStep2Title: string;
  processStep2Desc: string;
  processStep3Title: string;
  processStep3Desc: string;
  processStep4Title: string;
  processStep4Desc: string;

  // Testimonials Section
  testiBadge: string;
  testiHeading: string;
  testiSublabel: string;

  // FAQ Section
  faqBadge: string;
  faqHeading: string;
  faqSublabel: string;
  faqClassAll: string;
  faqClassTimeline: string;
  faqClassCost: string;
  faqClassSteward: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  faqFooterText: string;
  faqFooterLink: string;

  // CTA Section
  ctaHeading: string;
  ctaButton: string;

  // Contact Form
  contactBadge: string;
  contactHeading: string;
  contactSubtitle: string;
  formTitle: string;
  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formPhone: string;
  formPhonePlaceholder: string;
  formService: string;
  formDetails: string;
  formDetailsPlaceholder: string;
  formSubmit: string;
  formSubmitting: string;
  formValidationNameReq: string;
  formValidationNameShort: string;
  formValidationEmailReq: string;
  formValidationPhoneReq: string;
  formValidationDetailsReq: string;
  formValidationDetailsShort: string;
  formSubmitSuccessTitle: string;
  formSubmitSuccessMsg: string;

  // Footer Section
  footerSlogan: string;
  footerColCompany: string;
  footerColServices: string;
  footerColNewsletter: string;
  footerNewsletterDesc: string;
  footerNewsletterPlaceholder: string;
  footerSubscribeSuccessTitle: string;
  footerSubscribeSuccessMsg: string;
  footerSubscribeFailTitle: string;
  footerSubscribeFailMsg: string;
  footerRights: string;
}

const translations: Record<Language, TranslationSet> = {
  en: {
    phoneLabel: '+254 716 417 104',
    emailLabel: 'niaraconstrction@gmail.com',
    addressLabel: 'Mito Jura Rd, Kisumu',
    aboutLink: 'About',
    servicesLink: 'Services',
    projectsLink: 'Projects',
    processLink: 'Process',
    faqLink: 'FAQ',
    contactLink: 'Contact',
    getQuoteButton: 'Get a Quote',
    heroBadge: 'COMPUTATIONAL ARCHITECTURE & SUSTAINABLE BUILD',
    heroHeading: 'Kenyan building excellence with master architects',
    heroDesc: 'We integrate modern computational design with rigorous engineering honesty to build sustainable high-end projects across Kisumu and Nairobi.',
    heroPortfolioBtn: 'Explore Our Portfolio',
    heroConsultBtn: 'Initiate Consultation',
    aboutBadge: 'Who We Are',
    aboutHeading: 'Pioneering the Future of Construction',
    aboutDesc1: 'Niara Construction Company Limited is a leading and progressively developing architectural-building conglomerate based in Kenya. We are deeply committed to delivering innovative commercial structures, modern residential villas, and robust public works.',
    aboutDesc2: 'By leveraging state-of-the-art building models, sustainable high-performance materials, and structured project stewardship, we bring your architectural imagination into beautiful physical realities.',
    statProjects: 'Projects Completed',
    statYears: 'Years Experience',
    statSatisfaction: 'Satisfaction Rate',
    servicesBadge: 'Our Services',
    servicesHeading: 'Architectural & Construction Services',
    servicesSublabel: 'We provide structured solutions from initial drafts to final key handovers, maintaining rigorous quality oversight.',
    estBadge: 'Interactive Estimator',
    estHeading: 'Project Budget Estimation Tool',
    estDesc: 'Enter your anticipated building dimensions, select custom architectural finishes, and evaluate draft pricing bounds securely.',
    estStep1: '1. Project Specification & Scope',
    estTypeRes: 'Residential Custom Villa',
    estTypeResDesc: 'Elegant bespoke homes, townhouses, and family apartments.',
    estTypeCom: 'Commercial Workspace',
    estTypeComDesc: 'Bespoke corporate offices, modern retail storefronts, & medical centers.',
    estTypeDesign: 'Design & Build Turnkey',
    estTypeDesignDesc: 'End-to-end integration of architectural models & custom construction.',
    estTypeRen: 'Renovation & Internal Fitouts',
    estTypeRenDesc: 'Transforming existing workspaces or historic structures with modern finishes.',
    estStep2: '2. Approximate Building Floor Area',
    estUnitM: 'Sq Meters',
    estUnitFt: 'Sq Feet',
    estAreaBound: 'Dimension Bound',
    estStep3: '3. Architectural Finish & Specification Level',
    estFinishStandard: 'standard',
    estFinishStandardDesc: 'Honest & Solid',
    estFinishPremium: 'premium',
    estFinishPremiumDesc: 'Refined Veneers',
    estFinishLuxury: 'luxury',
    estFinishLuxuryDesc: 'Smart High-End',
    estPlaqueHeader: 'Pre-Construction Model',
    estPlaqueDesc: 'Preliminary Investment Budget',
    estPlaqueBound: 'Estimate bound up to',
    estBreakdownMaterials: 'Materials & Fabrications (55%)',
    estBreakdownLabor: 'Labor, Engineering & PM (30%)',
    estBreakdownPermits: 'Planning, Permits & Buffers (15%)',
    estDisclaimer: '*This range is a calculation based on regional costs in East Africa (Kenya bounds) using realistic luxury grades. Actual site conditions, design shapes, and zoning may vary specific budgets.',
    estCtaButton: 'Schedule Site Valuation',
    processBadge: 'How We Work',
    processHeading: 'Our Refined Lifecycle',
    processSublabel: 'We follow a carefully staged methodology to guide your draft files into concrete structures under clean project management.',
    processStep1Title: 'Conceptual Consultation',
    processStep1Desc: 'We evaluate site dimensions, geotechnical limits, and custom client briefs to align architectural parameters early.',
    processStep2Title: 'Advanced Modeling',
    processStep2Desc: 'Generating full computerized CAD designs and premium materials listings to visualize layouts in high precision.',
    processStep3Title: 'Supervised Build',
    processStep3Desc: 'Staging concrete frames, premium masonry, and modern utility routing on site using certified local craftsmanship.',
    processStep4Title: 'Refined Completion',
    processStep4Desc: 'Implementing luxury finish coatings, interior woodwork, and environmental compliance testing prior to handover.',
    testiBadge: 'Client Testimonials',
    testiHeading: 'Nurturing Lifelong Relationships',
    testiSublabel: 'Listen to the lived experiences of corporate developers and private homeowners who entrusted their legacy builds to Niara.',
    faqBadge: 'Clear Answers',
    faqHeading: 'Client Consultations & FAQ',
    faqSublabel: 'Demystifying the process of premium structural development. Here are detailed responses covering timescales, budget management, and on-site leadership.',
    faqClassAll: 'All Queries',
    faqClassTimeline: 'Timelines & Delivery',
    faqClassCost: 'Budgeting & Cost',
    faqClassSteward: 'Project Stewardship',
    faqQ1: 'How does Niara establish and honor construction timelines?',
    faqA1: 'We utilize state-of-the-art building information modeling (BIM) paired with critical-path-method (CPM) scheduling to forecast timelines with rigorous precision. By including seasonal weather buffers and coordinating with certified local material suppliers in advance, we ensure projects are delivered exactly as promised without unannounced delays.',
    faqQ2: 'What measures are in place if adverse weather threatens progress?',
    faqA2: 'While we design timelines anticipating seasonal shifts, extreme weather is managed through dynamic workforce rescheduling and priority interior tasks. Additionally, we use rapid-curing materials and covered structural techniques to mitigate moisture delay risks during rainy seasons without compromising structural integrity.',
    faqQ3: 'How accurate are your initial construction cost estimates?',
    faqA3: 'Our detailed cost estimations (Bill of Quantities) achieve a historical accuracy of over 95%. By conducting exhaustive pre-construction site analyses, geotechnical soil testing, and local plumbing/electrical reviews prior to breaking ground, we eliminate "unforeseen surprises" and outline clear contingency funds up front.',
    faqQ4: 'What is the standard payment and installment structure?',
    faqA4: 'Niara is committed to legal transparency. Payments are divided into milestones linked strictly to physical quality check-ins rather than arbitrary calendar dates. A standard Mobilization Deposit initiates architectural design and site setup, followed by progressive tranches after the verified completion of major stages like foundation pouring, structural framing, and final fit-outs.',
    faqQ5: 'How will I be kept updated on my project’s status?',
    faqA5: 'Every Niara client is assigned a dedicated Project Steward and gains access to our digital management portal. You will receive comprehensive weekly visual briefs, high-resolution aerial progress reports (drones), and updated gantt charts. Direct virtual consultation calls can be requested at any time.',
    faqQ6: 'How does Niara navigate building permits and municipal compliance?',
    faqA6: 'Our experienced in-house legal and administrative division manages the entire regulatory pathway. From obtaining National Construction Authority (NCA) certifications to clearing regional municipal zoning approvals, drainage licenses, and environmental impact assessments, we handle all compliance procedures seamlessly on your behalf.',
    faqFooterText: 'Still hold personalized engineering specifications?',
    faqFooterLink: 'Connect directly with an engineer',
    ctaHeading: 'Ready to build tomorrow’s legacy today?',
    ctaButton: 'Enquire About Your Project',
    contactBadge: 'Contact Us',
    contactHeading: 'Get In Touch',
    contactSubtitle: 'Whether you are constructing a residential home, corporate workspace, or looking for construction advice, our expert engineers are here to support.',
    formTitle: 'Request a Consultation',
    formName: 'Full Name',
    formNamePlaceholder: 'John Doe',
    formEmail: 'Email Address',
    formEmailPlaceholder: 'john@example.com',
    formPhone: 'Phone Number',
    formPhonePlaceholder: '+254 --- --- ---',
    formService: 'Service Type',
    formDetails: 'Tell us about your project...',
    formDetailsPlaceholder: 'Provide architectural details...',
    formSubmit: 'Submit Request',
    formSubmitting: 'Processing',
    formValidationNameReq: 'Please enter your full name so our experts we can address you personally.',
    formValidationNameShort: 'Please enter a valid full name (at least 3 characters).',
    formValidationEmailReq: 'Please enter a valid email address so we can send the consultation brief.',
    formValidationPhoneReq: 'Please enter your mobile or telephone number for instant inquiries.',
    formValidationDetailsReq: 'Please write a few details or scope description of your construction project.',
    formValidationDetailsShort: 'Please elaborate a bit more on your project goals (at least 10 characters).',
    formSubmitSuccessTitle: 'Proposal Submitted',
    formSubmitSuccessMsg: 'Consultation brief successfully received! Our Chief Architect is reviewing your requirements, and will get back to you shortly.',
    footerSlogan: 'Niara Construction Company Limited is Kenyan-owned building excellence. Specializing in modern, sustainable, and professional construction solutions.',
    footerColCompany: 'Company',
    footerColServices: 'Services',
    footerColNewsletter: 'Newsletter',
    footerNewsletterDesc: 'Subscribe to receive insights on modern architecture and project updates.',
    footerNewsletterPlaceholder: 'Email Address',
    footerSubscribeSuccessTitle: 'Newsletter Subscribed',
    footerSubscribeSuccessMsg: 'Subscription complete! Welcome to our inner circle of architectural insights and project timelines.',
    footerSubscribeFailTitle: 'Invalid Newsletter Email',
    footerSubscribeFailMsg: 'Please check your email formatting and try again.',
    footerRights: 'All Rights Reserved.'
  },
  sw: {
    phoneLabel: '+254 716 417 104',
    emailLabel: 'niaraconstrction@gmail.com',
    addressLabel: 'Barabara ya Mito Jura, Kisumu',
    aboutLink: 'Kuhusu Sisi',
    servicesLink: 'Huduma',
    projectsLink: 'Miradi',
    processLink: 'Utendaji',
    faqLink: 'Maswali',
    contactLink: 'Wasiliana Nasi',
    getQuoteButton: 'Omba Makadirio',
    heroBadge: 'USANIFU WA DIGITALI NA UJENZI ENDELEVU',
    heroHeading: 'Ujenzi bora wa kilele nchini Kenya na wasanifu wataalamu',
    heroDesc: 'Tunaunganisha usanii wa usanifu wa kisasa na uhandisi mwaminifu kujenga miradi thabiti inayojali mazingira huko Kisumu na Nairobi.',
    heroPortfolioBtn: 'Tazama Miradi Yetu',
    heroConsultBtn: 'Anza Ushauri wa Bure',
    aboutBadge: 'Sisi ni Akina Nani',
    aboutHeading: 'Tukiongoza Mustakabali wa Ujenzi nchini Kenya',
    aboutDesc1: 'Niara Construction Company Limited ni kundi la kijeshi la usanifu na ujenzi linalositawi kwa kasi nchini Kenya. Tuna dhamira thabiti ya kukuletea majengo ya kibiashara, majumba ya kisasa ya makazi, na miundombinu imara ya umma.',
    aboutDesc2: 'Kwa kutumia mifumo ya hali ya juu ya kidijitali (BIM), vifaa vya kipekee vya mazingira, na usimamizi madhubuti, tunabadilisha mawazo yako ya usanifu kuwa majengo halisi na ya kuvutia.',
    statProjects: 'Miradi Imekamilika',
    statYears: 'Miaka ya Uzoefu',
    statSatisfaction: 'Kiwango cha Kuridhika',
    servicesBadge: 'Huduma Zetu',
    servicesHeading: 'Huduma za Usanifu na Ujenzi',
    servicesSublabel: 'Tunatoa suluhisho thabiti kuanzia michoro ya kwanza hadi kukabidhi funguo za jengo, tukiweka kipaumbele ubora wa hali ya juu.',
    estBadge: 'Kadiria Gharama',
    estHeading: 'Chombo cha Kukadiria Bajeti ya Mradi',
    estDesc: 'Weka vipimo vya eneo lako la ujenzi, chagua aina ya utengenezaji, na upate makadirio halisi ya bajeti na gharama kwa sekunde.',
    estStep1: '1. Aina ya Mradi na Malengo',
    estTypeRes: 'Jumba la Kifahari la Makazi',
    estTypeResDesc: 'Nyumba bora za kipekee, ghorofa, na makazi ya kifahari ya familia.',
    estTypeCom: 'Ofisi na Maeneo ya Biashara',
    estTypeComDesc: 'Ofisi za kisasa za makampuni, maduka ya biashara, na vituo vya afya.',
    estTypeDesign: 'Usanifu na Ujenzi (Turnkey)',
    estTypeDesignDesc: 'Usimamizi wa pamoja kuanzia michoro ya ramani hadi ukamilishaji wa mradi.',
    estTypeRen: 'Ukarabati na Mapambo ya Ndani',
    estTypeRenDesc: 'Kubadilisha maeneo yaliyopo au majengo ya kale kwa kutumia vifaa na nakshi za kisasa.',
    estStep2: '2. Ukubwa wa Eneo la Sakafu ya Jengo',
    estUnitM: 'Mita za Mraba',
    estUnitFt: 'Futi za Mraba',
    estAreaBound: 'Kipimo cha Vipimo',
    estStep3: '3. Kiwango cha Mapambo na Nyenzo',
    estFinishStandard: 'kawaida',
    estFinishStandardDesc: 'Imara na ya Kawaida',
    estFinishPremium: 'cha juu',
    estFinishPremiumDesc: 'Nyenzo za Kifahari',
    estFinishLuxury: 'kifahari zaidi',
    estFinishLuxuryDesc: 'Hali ya Juu ya Kidijitali',
    estPlaqueHeader: 'Mfano wa Kabla ya Ujenzi',
    estPlaqueDesc: 'Bajeti ya Awali ya Uwekezaji',
    estPlaqueBound: 'Makadirio yanafikia hadi',
    estBreakdownMaterials: 'Nyenzo & Utengenezaji (55%)',
    estBreakdownLabor: 'Wafanyakazi, Uhandisi & Usimamizi (30%)',
    estBreakdownPermits: 'Kupanga, Vibali & Maandalizi (15%)',
    estDisclaimer: '*Makadirio haya ya bajeti yanatokana na gharama halisi za ujenzi katika ukanda wa Afrika Mashariki (Kenya). Gharama halisi zinaweza kubadilika kulingana na eneo na sifa maalum za ardhi.',
    estCtaButton: 'Mratibu wa Ukaguzi wa Kiwanja',
    processBadge: 'Utaratibu Wetu',
    processHeading: 'Tofauti Katika Utendaji wetu',
    processSublabel: 'Tunafuata mfumo uliopangwa vizuri ili kuelekeza mawazo ya ramani yako kuwa jengo halisi na imara.',
    processStep1Title: 'Mjadala wa Awali',
    processStep1Desc: 'Tunatathmini vipimo vya kiwanja, sifa za udongo, na mahitaji yako maalum ili kuoanisha malengo ya usanifu mapema.',
    processStep2Title: 'Uchoraji wa Kidijitali',
    processStep2Desc: 'Kutengeneza michoro dhabiti ya CAD ya pande tatu (3D) na orodha kamili ya vifaa kwa usahihi mkubwa.',
    processStep3Title: 'Ujenzi Unaosimamiwa',
    processStep3Desc: 'Kujenga msingi, kuta za matofali, na kuweka mifumo ya maji na umeme kwa kutumia mafundi walioidhinishwa.',
    processStep4Title: 'Ukamilishaji na Handover',
    processStep4Desc: 'Kuweka rangi bora za kifahari, kazi za mbao za ndani, na ukaguzi kamili wa mazingira kabla ya kukabidhi ufunguo.',
    testiBadge: 'Maoni ya Wateja',
    testiHeading: 'Kujenga Uhusiano wa Kudumu',
    testiSublabel: 'Sikia maoni ya wateja wetu wa kibinafsi na wa kibiashara ambao waliacha ujenzi wa miradi yao mikononi mwa Niara.',
    faqBadge: 'Majibu ya Kina',
    faqHeading: 'Maswali ya Kawaida kuhusu Ujenzi',
    faqSublabel: 'Tunarahisisha uelewa wa miradi ya ujenzi. Hapa kuna majibu ya kina kuhusu muda, usimamizi wa bajeti, na usimamizi wa kiwanjani.',
    faqClassAll: 'Maswali Yote',
    faqClassTimeline: 'Muda wa Uwasilishaji',
    faqClassCost: 'Bajeti na Gharama',
    faqClassSteward: 'Usimamizi wa Mradi',
    faqQ1: 'Niara inahakikishaje kuwa inazingatia muda wa ujenzi uliopangwa?',
    faqA1: 'Tunatumia Programu za Juu za Kidijitali (BIM) zilizounganishwa na mbinu ya (CPM) kupanga na kukadiria muda wa ujenzi kwa usahihi mkubwa. Pia tunajumuisha mabadiliko ya misimu ya hali ya hewa na kuagiza vifaa mapema ili kuepuka ucheleweshaji wowote.',
    faqQ2: 'Je, kuna hatua gani iwapo hali mbaya ya hewa inatishia maendeleo?',
    faqA2: 'Tunapopanga muda wa mradi, tunajumuisha mabadiliko ya hali ya hewa. Hali ya hewa inapokuwa mbaya, tunahamisha mafundi kufanya kazi za ndani ya nyumba au kutumia teknolojia za kuzuia maji ili kuendelea na kazi kwa usalama bila kuathiri uimara wa jengo.',
    faqQ3: 'Ukadiriaji wa kwanza wa gharama una usahihi kwa kiwango gani?',
    faqA3: 'Makadirio yetu ya kina ya gharama (BQS) yana usahihi wa zaidi ya asilimia 95%. Kwa kufanya ukaguzi wa kina wa kiwanja, kupima udongo, na kutathmini mifumo ya maji na umeme mapema, tunaondoa dharura zisizotarajiwa.',
    faqQ4: 'Je, mfumo wa malipo uko vipi kwa kawaida?',
    faqA4: 'Mkataba wetu ni wa wazi kabisa. Malipo yamegawanywa katika awamu maalum zinazohusiana moja kwa moja na hatua halisi za ujenzi zilizomalizika na kukaguliwa (milestones), badala ya tarehe za kalenda.',
    faqQ5: 'Nitajulishwa namna gani kuhusu maendeleo ya mradi wangu?',
    faqA5: 'Kila mteja anapewa msimamizi maalum wa mradi (Project Steward) na kuingizwa kwenye jukwaa letu la kidijitali. Utapata muhtasari wa picha kila wiki, ripoti za video za ndege zisizo na rubani (drone), na ratiba zilizohuishwa.',
    faqQ6: 'Je, Niara inashughulikia vipi vibali vya ujenzi na sheria za manispaa?',
    faqA6: 'Kitengo chetu cha sheria na utawala kinashughulikia mchakato wote wa kisheria. Kuanzia kupata vyeti vya Mamlaka ya Kitaifa ya Ujenzi (NCA) hadi vibali vyote vya mazingira (NEMA) na vibali vya manispaa ya wilaya.',
    faqFooterText: 'Je, una mahitaji gani thabiti ya usanifu na ujenzi?',
    faqFooterLink: 'Wasiliana moja kwa moja na Mhandisi wetu',
    ctaHeading: 'Uko tayari kujenga mradi wako wa ndoto leo?',
    ctaButton: 'Wasiliana Nasi Sasa kuhusu Mradi Wako',
    contactBadge: 'Wasiliana Nasi',
    contactHeading: 'Tuma Ujumbe',
    contactSubtitle: 'Ikiwa unataka kujenga nyumba, ofisi ya kisasa ya kibiashara, au unatafuta tu ushauri wa ujenzi, wahandisi wetu wako tayari kukusaidia.',
    formTitle: 'Omba Ushauri wa Bure',
    formName: 'Majina Kamili',
    formNamePlaceholder: 'John Doe',
    formEmail: 'Anwani ya Barua Pepe',
    formEmailPlaceholder: 'john@example.com',
    formPhone: 'Nambari ya Simu',
    formPhonePlaceholder: '+254 --- --- ---',
    formService: 'Aina ya Huduma',
    formDetails: 'Tueleze kwa ufupi kuhusu mradi wako...',
    formDetailsPlaceholder: 'Weka sifa maalum za ujenzi...',
    formSubmit: 'Tuma Ombi',
    formSubmitting: 'Inatuma...',
    formValidationNameReq: 'Tafadhali weka majina yako kamili ili wataalamu wetu wakutambue vizuri.',
    formValidationNameShort: 'Tafadhali weka jina lililo sahihi na kamili (kisipungue herufi 3).',
    formValidationEmailReq: 'Tafadhali weka barua pepe sahihi ili tukutumie muhtasari wa ushauri.',
    formValidationPhoneReq: 'Tafadhali weka nambari yako ya simu kwa mawasiliano ya haraka.',
    formValidationDetailsReq: 'Tafadhali andika maelezo mafupi kuhusu mradi wako wa ujenzi.',
    formValidationDetailsShort: 'Tafadhali fafanua kidogo zaidi kuhusu mradi wako (kisipungue herufi 10).',
    formSubmitSuccessTitle: 'Ombi Limetumwa',
    formSubmitSuccessMsg: 'Ujumbe wako umepokelewa kwa usalama! Msanifu Mkuu wetu anapitia mahitaji yako na wasaidizi watakuwasiliana nawe hivi karibuni.',
    footerSlogan: 'Niara Construction Company Limited ni kampuni ya ujenzi ya kizalendo nchini Kenya inayoleta ujenzi wa daraja la kwanza, unaojali mazingira na uimara mkubwa.',
    footerColCompany: 'Kampuni',
    footerColServices: 'Huduma',
    footerColNewsletter: 'Jarida',
    footerNewsletterDesc: 'Jiandikishe kwa jarida letu ili kupata habari mpya za usanifu wa kisasa na maendeleo ya miradi.',
    footerNewsletterPlaceholder: 'Anwani ya Barua Pepe',
    footerSubscribeSuccessTitle: 'Umejiandikisha Kikamilifu',
    footerSubscribeSuccessMsg: 'Hongera! Sasa umeunganishwa na habari zote za miradi ya ujenzi na ramani za wasanifu kutoka Niara.',
    footerSubscribeFailTitle: 'Barua Pepe si Sahihi',
    footerSubscribeFailMsg: 'Tafadhali angalia uandishi wa barua pepe yako na ujaribu tena.',
    footerRights: 'Haki zote zimehifadhiwa.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try recovering from local storage to keep session state nice
    try {
      const saved = localStorage.getItem('niara_lang');
      if (saved === 'en' || saved === 'sw') {
        return saved;
      }
    } catch (_) {}
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('niara_lang', lang);
    } catch (_) {}
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
