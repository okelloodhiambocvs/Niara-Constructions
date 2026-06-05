import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, Building2, HardHat, Home, Layers } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ProjectType {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  baseCostPerSqMMin: number; // in KES
  baseCostPerSqMMax: number; // in KES
}

export default function CostEstimator() {
  const { language, t } = useLanguage();
  const [projectTypeId, setProjectTypeId] = useState('residential');
  const [areaUnit, setAreaUnit] = useState<'sqm' | 'sqft'>('sqm');
  const [areaSize, setAreaSize] = useState<number>(150); // initial 150 sqm
  const [luxuryLevel, setLuxuryLevel] = useState<'standard' | 'premium' | 'luxury'>('premium');

  // Reactively computed project types with full Swahili and English support
  const projectTypes: ProjectType[] = useMemo(() => [
    {
      id: 'residential',
      name: t.estTypeRes,
      desc: t.estTypeResDesc,
      icon: <Home size={18} />,
      baseCostPerSqMMin: 45000,
      baseCostPerSqMMax: 62000,
    },
    {
      id: 'commercial',
      name: t.estTypeCom,
      desc: t.estTypeComDesc,
      icon: <Building2 size={18} />,
      baseCostPerSqMMin: 50000,
      baseCostPerSqMMax: 75000,
    },
    {
      id: 'design-build',
      name: t.estTypeDesign,
      desc: t.estTypeDesignDesc,
      icon: <Layers size={18} />,
      baseCostPerSqMMin: 55000,
      baseCostPerSqMMax: 85000,
    },
    {
      id: 'renovation',
      name: t.estTypeRen,
      desc: t.estTypeRenDesc,
      icon: <HardHat size={18} />,
      baseCostPerSqMMin: 20000,
      baseCostPerSqMMax: 38000,
    }
  ], [t]);

  // Multipliers for finish level
  const finishMultipliers = {
    standard: 0.95,
    premium: 1.15,
    luxury: 1.45
  };

  const currentType = useMemo(() => {
    return projectTypes.find(t => t.id === projectTypeId) || projectTypes[0];
  }, [projectTypeId, projectTypes]);

  // Handle area slide adjustments or text feedback limit boundaries
  const handleAreaChange = (val: number) => {
    const minVal = areaUnit === 'sqm' ? 20 : 200;
    const maxVal = areaUnit === 'sqm' ? 1500 : 16000;
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    setAreaSize(clamped);
  };

  // Unit conversion helper
  const areaInSqM = useMemo(() => {
    if (areaUnit === 'sqm') return areaSize;
    return areaSize / 10.764; // convert sqft to sqm for calculation
  }, [areaSize, areaUnit]);

  // Compute final estimates
  const estimates = useMemo(() => {
    const baseMin = currentType.baseCostPerSqMMin * areaInSqM;
    const baseMax = currentType.baseCostPerSqMMax * areaInSqM;
    const multiplier = finishMultipliers[luxuryLevel];

    const projectCostMin = baseMin * multiplier;
    const projectCostMax = baseMax * multiplier;

    // Breakdown distribution (Approximate construction splits)
    // Materials (55%), Labor & Supervision (30%), Permits & Contingency (15%)
    const materialsMin = projectCostMin * 0.55;
    const materialsMax = projectCostMax * 0.55;
    
    const laborMin = projectCostMin * 0.30;
    const laborMax = projectCostMax * 0.30;

    const permitsMin = projectCostMin * 0.15;
    const permitsMax = projectCostMax * 0.15;

    return {
      totalMin: Math.round(projectCostMin / 1000) * 1000,
      totalMax: Math.round(projectCostMax / 1000) * 1000,
      materialsMin: Math.round(materialsMin / 1000) * 1000,
      materialsMax: Math.round(materialsMax / 1000) * 1000,
      laborMin: Math.round(laborMin / 1000) * 1000,
      laborMax: Math.round(laborMax / 1000) * 1000,
      permitsMin: Math.round(permitsMin / 1000) * 1000,
      permitsMax: Math.round(permitsMax / 1000) * 1000,
    };
  }, [currentType, areaInSqM, luxuryLevel]);

  // Formatting utility (always format in local currency KES beautifully)
  const formatValue = (kesValue: number) => {
    return new Intl.NumberFormat(language === 'sw' ? 'sw-KE' : 'en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(kesValue);
  };

  return (
    <div id="cost-estimator-panel" className="mt-24 bg-slate-50 dark:bg-slate-900/40 border border-slate-100/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative p-6 md:p-12 transition-colors duration-300">
      {/* Decorative accent tags */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Input Configuration Division */}
        <div className="lg:col-span-7 space-y-8" id="cost-inputs-column">
          <div>
            <span className="text-[10px] bg-brand-accent/10 text-brand-accent font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded mb-4 inline-block label-brand">
              {t.estBadge}
            </span>
            <h3 className="font-display font-medium text-2xl md:text-3xl text-brand-primary dark:text-white tracking-tight leading-none">
              {t.estHeading}
            </h3>
            <p className="text-brand-secondary dark:text-zinc-300 text-sm leading-relaxed mt-3 max-w-xl font-sans">
              {t.estDesc}
            </p>
          </div>

          {/* Project Type Grid */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/80 dark:text-zinc-300 mb-3 block">
              {t.estStep1}
            </label>
            <div className="grid sm:grid-cols-2 gap-3" id="project-type-selector">
              {projectTypes.map((type) => {
                const isSelected = projectTypeId === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setProjectTypeId(type.id)}
                    className={`p-4 text-left border rounded transition-all flex items-start gap-3.5 group cursor-pointer ${
                      isSelected 
                        ? 'bg-brand-primary dark:bg-brand-accent dark:border-brand-accent dark:text-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/10' 
                        : 'bg-white dark:bg-slate-800 text-brand-primary dark:text-zinc-200 border-slate-200/60 dark:border-slate-700 hover:border-brand-accent/40 hover:bg-slate-50/50 dark:hover:bg-slate-700/30'
                    }`}
                  >
                    <div className={`p-2 rounded-full mt-0.5 ${isSelected ? 'bg-brand-accent text-white' : 'bg-slate-100 dark:bg-slate-700 text-brand-primary dark:text-zinc-350 transition-colors'}`}>
                      {type.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs tracking-tight uppercase">
                        {type.name}
                      </h4>
                      <p className={`text-[10px] leading-relaxed mt-1.5 ${isSelected ? 'text-white/60 dark:text-brand-primary/70' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-450'}`}>
                        {type.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Dimension Sliders */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/80 dark:text-zinc-300">
                {t.estStep2}
              </label>

              {/* Unit Toggle buttons */}
              <div className="flex bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    if (areaUnit === 'sqft') {
                      setAreaUnit('sqm');
                      setAreaSize(prev => Math.round(prev / 10.764));
                    }
                  }}
                  className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    areaUnit === 'sqm' ? 'bg-brand-primary dark:bg-brand-accent dark:text-brand-primary text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white'
                  }`}
                >
                  {t.estUnitM}
                </button>
                <button
                  onClick={() => {
                    if (areaUnit === 'sqm') {
                      setAreaUnit('sqft');
                      setAreaSize(prev => Math.round(prev * 10.764));
                    }
                  }}
                  className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    areaUnit === 'sqft' ? 'bg-brand-primary dark:bg-brand-accent dark:text-brand-primary text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white'
                  }`}
                >
                  {t.estUnitFt}
                </button>
              </div>
            </div>

            {/* Slider with precise output display */}
            <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200/60 dark:border-slate-700 rounded">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.estAreaBound}</span>
                <div className="flex items-baseline gap-1" id="square-footage-output">
                  <input
                    type="number"
                    value={areaSize}
                    onChange={(e) => handleAreaChange(parseInt(e.target.value) || 0)}
                    className="w-24 text-right font-display font-medium text-2xl text-brand-primary dark:text-white bg-none bg-transparent outline-none border-b border-dashed border-slate-300 dark:border-slate-600 focus:border-brand-accent py-0 font-bold"
                  />
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-widest pl-1">
                    {areaUnit === 'sqm' ? 'sq m' : 'sq ft'}
                  </span>
                </div>
              </div>

              {/* Slider element */}
               <input
                type="range"
                className="w-full accent-brand-accent cursor-pointer bg-slate-100 dark:bg-slate-700 h-1.5 rounded-lg appearance-none mt-4 select-none touch-pan-y"
                min={areaUnit === 'sqm' ? 20 : 200}
                max={areaUnit === 'sqm' ? 1200 : 13000}
                step={areaUnit === 'sqm' ? 10 : 100}
                value={areaSize}
                onChange={(e) => handleAreaChange(parseInt(e.target.value))}
              />

              <div className="flex justify-between text-[9px] text-slate-400 tracking-wider uppercase mt-3">
                <span>Min: {areaUnit === 'sqm' ? '20 sq m' : '200 sq ft'}</span>
                <span>Max: {areaUnit === 'sqm' ? '1,200 sq m' : '13,000 sq ft'}</span>
              </div>
            </div>
          </div>

          {/* Luxury & Fitout Levels */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/80 dark:text-zinc-300 mb-3 block">
              {t.estStep3}
            </label>
            <div className="grid grid-cols-3 gap-2" id="finish-grade-tabs">
              {(['standard', 'premium', 'luxury'] as const).map((level) => {
                const isActive = luxuryLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => setLuxuryLevel(level)}
                    className={`py-3.5 px-2 text-center border rounded transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-brand-primary dark:bg-brand-accent dark:border-brand-accent dark:text-brand-primary text-white border-brand-primary shadow-md' 
                        : 'bg-white dark:bg-slate-800 text-brand-primary dark:text-zinc-200 border-slate-200/60 dark:border-slate-700 hover:border-brand-accent/40'
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest">
                      {level === 'standard' && t.estFinishStandard}
                      {level === 'premium' && t.estFinishPremium}
                      {level === 'luxury' && t.estFinishLuxury}
                    </span>
                    <span className={`block text-[9px] mt-1.5 font-normal tracking-tight ${isActive ? 'text-brand-accent dark:text-brand-primary/80 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
                      {level === 'standard' && t.estFinishStandardDesc}
                      {level === 'premium' && t.estFinishPremiumDesc}
                      {level === 'luxury' && t.estFinishLuxuryDesc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Outputs Sidepanel (Plaque Design) */}
        <div className="lg:col-span-5 bg-brand-primary text-white p-8 rounded border border-white/5 shadow-2xl relative overflow-hidden self-stretch flex flex-col justify-between" id="cost-outputs-column">
          {/* Subtle texture layout in background */}
          <div className="absolute inset-0 bg-[radial-gradient(#118a7e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="text-brand-accent animate-pulse" size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400">
                  {t.estPlaqueHeader}
                </span>
              </div>

              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{t.estPlaqueDesc}</p>
                <div className="mt-3" id="estimated-cost-range">
                  <h4 className="text-2xl sm:text-3xl font-display font-black tracking-tighter text-brand-accent">
                    {formatValue(estimates.totalMin)}
                  </h4>
                  <div className="py-2 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">{t.estPlaqueBound}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-display font-black tracking-tighter text-white">
                    {formatValue(estimates.totalMax)}
                  </h4>
                </div>
              </div>

              {/* Progress Line */}
              <div className="h-px bg-white/10 w-full" />

              {/* Value Itemized list */}
              <div className="space-y-4" id="cost-itemized-breakdown">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[3px] h-[3px] rounded-full bg-brand-accent" />
                    <span className="text-[10px] text-white/60 font-semibold tracking-wide">{t.estBreakdownMaterials}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white tracking-tighter">
                    {formatValue(estimates.materialsMin)} - {formatValue(estimates.materialsMax)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[3px] h-[3px] rounded-full bg-brand-accent" />
                    <span className="text-[10px] text-white/60 font-semibold tracking-wide">{t.estBreakdownLabor}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white tracking-tighter">
                    {formatValue(estimates.laborMin)} - {formatValue(estimates.laborMax)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[3px] h-[3px] rounded-full bg-brand-accent" />
                    <span className="text-[10px] text-white/60 font-semibold tracking-wide">{t.estBreakdownPermits}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white tracking-tighter">
                    {formatValue(estimates.permitsMin)} - {formatValue(estimates.permitsMax)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/15 space-y-4">
              <div className="bg-white/5 p-4 rounded border border-white/5">
                <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                  {t.estDisclaimer}
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="w-full bg-brand-accent hover:bg-white text-brand-primary py-3.5 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-lg flex items-center justify-center gap-2"
                id="estimator-cta-button"
              >
                {t.estCtaButton} <Sparkles size={12} />
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
