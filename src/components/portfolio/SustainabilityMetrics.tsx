import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Zap, Droplet, Layers, Award, Sparkles, TrendingDown, RefreshCw } from 'lucide-react';

export interface SustainabilityData {
  carbonReduction: number; // percentage
  energySavings: number; // percentage
  materialSourcing: number; // percentage
  waterConservation: number; // percentage
  highlightEn: string;
  highlightSw: string;
  monthlyEmissions: { month: string; monthSw: string; baseline: number; design: number }[];
}

interface SustainabilityMetricsProps {
  data: SustainabilityData;
  language: string;
}

export default function SustainabilityMetrics({ data, language }: SustainabilityMetricsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'materials'>('overview');
  const [hoveredEmissions, setHoveredEmissions] = useState<number | null>(null);

  const t = {
    titleEn: "Sustainability Performance",
    titleSw: "Matokeo ya Uendelevu",
    badgeEn: "Building Future-Proof",
    badgeSw: "Ujenzi Bila Athari",
    descEn: "Designed and certified to exceed environmental benchmarks using virtual design modelling (BIM) and low-carbon engineering.",
    descSw: "Imesanifiwa na kuidhinishwa kuzidi viwango vya kimazingira kwa kutumia mifumo ya ujenzi dijitali (BIM) na uhandisi wa hali ya juu.",
    tabOverviewEn: "Performance Overview",
    tabOverviewSw: "Jumla ya Matokeo",
    tabEnergyEn: "Energy Saving Curve",
    tabEnergySw: "Mviringo wa Nishati",
    tabMaterialsEn: "Eco-Material Index",
    tabMaterialsSw: "Vifuniko Rafiki",
    carbonReductionTitleEn: "Carbon Reduction",
    carbonReductionTitleSw: "Imepunguza Carbon",
    energySavingsTitleEn: "Energy Efficiency",
    energySavingsTitleSw: "Ufanisi Nishati",
    waterTitleEn: "Water Reclaimed",
    waterTitleSw: "Maji Yaliyookolewa",
    materialTitleEn: "Circular Sourcing",
    materialTitleSw: "Mzunguko wa Nyenzo",
    highlightTitleEn: "Innovation Spotlight",
    highlightTitleSw: "Kivutio Cha Teknolojia",
    emissionsChartTitleEn: "Emissions Baseline vs. Design (kg CO2e/sqm)",
    emissionsChartTitleSw: "Utoaji Carbon: Kiwango Sanifu vs. Sanifu Letu",
    baselineLabelEn: "Standard Baseline",
    baselineLabelSw: "Kawaida",
    designLabelEn: "Niara Eco-Design",
    designLabelSw: "Sanifu Letu",
    materialSubtextEn: "Recycled content, locally sourced timbers, and low-hydration concrete formulations.",
    materialSubtextSw: "Vifaa vilivyorejeshwa, mbao za kieneo na saruji ya kisasa inayookoa maji.",
    impactBadgeEn: "High Performance",
    impactBadgeSw: "Ufanisi Mkuu",
  };

  // SVG Chart Dimensions for the Area/Bar Chart
  const svgWidth = 460;
  const svgHeight = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const maxEmissions = Math.max(
    ...data.monthlyEmissions.map(d => Math.max(d.baseline, d.design))
  ) * 1.15;

  return (
    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 px-2.5 bg-brand-accent/10 dark:bg-brand-accent/20 border border-brand-accent/20 rounded-md">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-accent">
            {language === 'sw' ? t.badgeSw : t.badgeEn}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
          <Leaf size={10} /> LEED Platinum Align
        </div>
      </div>
      
      <h4 className="font-display font-bold text-lg text-brand-primary dark:text-white mb-2">
        {language === 'sw' ? t.titleSw : t.titleEn}
      </h4>
      <p className="text-xs text-brand-secondary dark:text-slate-400 mb-6 leading-relaxed">
        {language === 'sw' ? t.descSw : t.descEn}
      </p>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2.5 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'border-brand-accent text-brand-primary dark:text-white'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
          }`}
        >
          {language === 'sw' ? t.tabOverviewSw : t.tabOverviewEn}
        </button>
        <button
          onClick={() => setActiveTab('energy')}
          className={`pb-2.5 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'energy'
              ? 'border-brand-accent text-brand-primary dark:text-white'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
          }`}
        >
          {language === 'sw' ? t.tabEnergySw : t.tabEnergyEn}
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`pb-2.5 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'materials'
              ? 'border-brand-accent text-brand-primary dark:text-white'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
          }`}
        >
          {language === 'sw' ? t.tabMaterialsSw : t.tabMaterialsEn}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Tab 1: Performance Overview Dial Scorecards */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Interactive Grid of Dial/Ring Gauges */}
            <div className="grid grid-cols-2 gap-4">
              {/* Carbon Reduction Ring (D3-like custom SVG arc) */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 rounded-lg flex items-center gap-4 group hover:border-emerald-500/30 transition-all duration-300">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="23" className="stroke-slate-200 dark:stroke-slate-800" fill="transparent" strokeWidth="4" />
                    <motion.circle 
                      cx="28" cy="28" r="23" 
                      className="stroke-emerald-500" 
                      fill="transparent" 
                      strokeWidth="4" 
                      strokeDasharray={2 * Math.PI * 23}
                      initial={{ strokeDashoffset: 2 * Math.PI * 23 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 23 * (1 - data.carbonReduction / 100) }}
                      transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-brand-primary dark:text-white font-display">
                    {data.carbonReduction}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                    {language === 'sw' ? t.carbonReductionTitleSw : t.carbonReductionTitleEn}
                  </span>
                  <p className="text-xs font-bold text-brand-primary dark:text-zinc-200 flex items-center gap-1 leading-none">
                    <TrendingDown size={14} className="text-emerald-500" /> {data.carbonReduction}% CO₂e Less
                  </p>
                </div>
              </div>

              {/* Energy Savings Gauge */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 rounded-lg flex items-center gap-4 group hover:border-amber-500/30 transition-all duration-300">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="23" className="stroke-slate-200 dark:stroke-slate-800" fill="transparent" strokeWidth="4" />
                    <motion.circle 
                      cx="28" cy="28" r="23" 
                      className="stroke-amber-500" 
                      fill="transparent" 
                      strokeWidth="4" 
                      strokeDasharray={2 * Math.PI * 23}
                      initial={{ strokeDashoffset: 2 * Math.PI * 23 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 23 * (1 - data.energySavings / 100) }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-brand-primary dark:text-white font-display">
                    {data.energySavings}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                    {language === 'sw' ? t.energySavingsTitleSw : t.energySavingsTitleEn}
                  </span>
                  <p className="text-xs font-bold text-brand-primary dark:text-zinc-200 flex items-center gap-1 leading-none">
                    <Zap size={13} className="text-amber-500 fill-amber-500/20" /> Grid Reduced
                  </p>
                </div>
              </div>

              {/* Water Reclamation Arc */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 rounded-lg flex items-center gap-4 group hover:border-blue-500/30 transition-all duration-300">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="23" className="stroke-slate-200 dark:stroke-slate-800" fill="transparent" strokeWidth="4" />
                    <motion.circle 
                      cx="28" cy="28" r="23" 
                      className="stroke-blue-500" 
                      fill="transparent" 
                      strokeWidth="4" 
                      strokeDasharray={2 * Math.PI * 23}
                      initial={{ strokeDashoffset: 2 * Math.PI * 23 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 23 * (1 - data.waterConservation / 100) }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-brand-primary dark:text-white font-display">
                    {data.waterConservation}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                    {language === 'sw' ? t.waterTitleSw : t.waterTitleEn}
                  </span>
                  <p className="text-xs font-bold text-brand-primary dark:text-zinc-200 flex items-center gap-1 leading-none">
                    <Droplet size={13} className="text-blue-500 fill-blue-500/20" /> Loop Restored
                  </p>
                </div>
              </div>

              {/* Circular Sourcing Ring */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 rounded-lg flex items-center gap-4 group hover:border-brand-accent/30 transition-all duration-300">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="23" className="stroke-slate-200 dark:stroke-slate-800" fill="transparent" strokeWidth="4" />
                    <motion.circle 
                      cx="28" cy="28" r="23" 
                      className="stroke-brand-accent" 
                      fill="transparent" 
                      strokeWidth="4" 
                      strokeDasharray={2 * Math.PI * 23}
                      initial={{ strokeDashoffset: 2 * Math.PI * 23 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 23 * (1 - data.materialSourcing / 100) }}
                      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-brand-primary dark:text-white font-display">
                    {data.materialSourcing}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                    {language === 'sw' ? t.materialTitleSw : t.materialTitleEn}
                  </span>
                  <p className="text-xs font-bold text-brand-primary dark:text-zinc-200 flex items-center gap-1 leading-none">
                    <Layers size={13} className="text-brand-accent" /> Eco-Sourced
                  </p>
                </div>
              </div>
            </div>

            {/* Showcase Highlight Callout */}
            <div className="p-5 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/15 rounded-lg flex gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1.5 bg-emerald-500 text-white transform translate-x-2 -translate-y-2 rotate-45 text-[7px] font-black uppercase tracking-wider hidden sm:block">
                LEED PLATINUM
              </div>
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/15 rounded-lg flex items-center justify-center text-emerald-500 flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  {language === 'sw' ? t.highlightTitleSw : t.highlightTitleEn} <Award size={13} />
                </h5>
                <p className="text-xs text-brand-secondary dark:text-zinc-300 leading-relaxed font-sans font-medium">
                  {language === 'sw' ? data.highlightSw : data.highlightEn}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Energy Saving Curve (SVG Interactive Chart) */}
        {activeTab === 'energy' && (
          <motion.div
            key="energy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Custom Interactive SVG Graph (Computing precise grid points based on real data) */}
            <div className="p-4 bg-slate-950 rounded-xl relative overflow-hidden select-none border border-slate-800">
              <h5 className="text-[10px] font-bold text-slate-400 mb-4 flex items-center justify-between">
                <span>{language === 'sw' ? t.emissionsChartTitleSw : t.emissionsChartTitleEn}</span>
                <span className="text-[9px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/15 tracking-widest uppercase">
                  {language === 'sw' ? t.impactBadgeSw : t.impactBadgeEn}
                </span>
              </h5>

              <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
                {/* Horizontal gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const yVal = paddingTop + chartHeight * (1 - ratio);
                  return (
                    <g key={idx}>
                      <line 
                        x1={paddingLeft} 
                        y1={yVal} 
                        x2={svgWidth - paddingRight} 
                        y2={yVal} 
                        className="stroke-slate-800/60" 
                        strokeWidth="1" 
                        strokeDasharray="4 4" 
                      />
                      <text 
                        x={paddingLeft - 8} 
                        y={yVal + 3} 
                        className="fill-slate-500 font-mono text-[9px] text-right" 
                        textAnchor="end"
                      >
                        {Math.floor(maxEmissions * ratio)}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {data.monthlyEmissions.map((item, idx) => {
                  const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                  return (
                    <text 
                      key={idx} 
                      x={xVal} 
                      y={svgHeight - paddingBottom + 16} 
                      className="fill-slate-400 font-sans text-[9px] font-bold" 
                      textAnchor="middle"
                    >
                      {language === 'sw' ? item.monthSw : item.month}
                    </text>
                  );
                })}

                {/* Axis Lines */}
                <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={svgHeight - paddingBottom} className="stroke-slate-800" strokeWidth="1" />
                <line x1={paddingLeft} y1={svgHeight - paddingBottom} x2={svgWidth - paddingRight} y2={svgHeight - paddingBottom} className="stroke-slate-800" strokeWidth="1" />

                {/* Draw Areas & Lines */}
                {/* 1. Baseline Area (Emissions for standard build) */}
                <path
                  d={`
                    M ${paddingLeft} ${svgHeight - paddingBottom}
                    ${data.monthlyEmissions.map((item, idx) => {
                      const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                      const yVal = paddingTop + chartHeight * (1 - item.baseline / maxEmissions);
                      return `L ${xVal} ${yVal}`;
                    }).join(' ')}
                    H ${svgWidth - paddingRight}
                    V ${svgHeight - paddingBottom}
                    Z
                  `}
                  fill="url(#baselineGrad)"
                  opacity="0.1"
                />
                
                {/* 2. design Area (Emissions for Niara eco build) */}
                <path
                  d={`
                    M ${paddingLeft} ${svgHeight - paddingBottom}
                    ${data.monthlyEmissions.map((item, idx) => {
                      const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                      const yVal = paddingTop + chartHeight * (1 - item.design / maxEmissions);
                      return `L ${xVal} ${yVal}`;
                    }).join(' ')}
                    H ${svgWidth - paddingRight}
                    V ${svgHeight - paddingBottom}
                    Z
                  `}
                  fill="url(#designGrad)"
                  opacity="0.25"
                />

                {/* Path Lines */}
                {/* Baseline Line */}
                <motion.path
                  d={data.monthlyEmissions.map((item, idx) => {
                    const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                    const yVal = paddingTop + chartHeight * (1 - item.baseline / maxEmissions);
                    return `${idx === 0 ? 'M' : 'L'} ${xVal} ${yVal}`;
                  }).join(' ')}
                  fill="none"
                  className="stroke-slate-500"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />

                {/* Design Line */}
                <motion.path
                  d={data.monthlyEmissions.map((item, idx) => {
                    const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                    const yVal = paddingTop + chartHeight * (1 - item.design / maxEmissions);
                    return `${idx === 0 ? 'M' : 'L'} ${xVal} ${yVal}`;
                  }).join(' ')}
                  fill="none"
                  className="stroke-brand-accent"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Interactive circles / tooltip indicators */}
                {data.monthlyEmissions.map((item, idx) => {
                  const xVal = paddingLeft + (chartWidth / (data.monthlyEmissions.length - 1)) * idx;
                  const dYVal = paddingTop + chartHeight * (1 - item.design / maxEmissions);
                  const bYVal = paddingTop + chartHeight * (1 - item.baseline / maxEmissions);

                  const isHovered = hoveredEmissions === idx;

                  return (
                    <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredEmissions(idx)} onMouseLeave={() => setHoveredEmissions(null)}>
                      {/* Interaction Area Trigger Column */}
                      <rect
                        x={xVal - 15}
                        y={paddingTop}
                        width="30"
                        height={chartHeight}
                        fill="transparent"
                      />
                      
                      {/* Design Circle */}
                      <circle cx={xVal} cy={dYVal} r={isHovered ? 6 : 4} className="fill-brand-accent stroke-slate-950" strokeWidth="1.5" />
                      {/* Baseline Circle */}
                      <circle cx={xVal} cy={bYVal} r={isHovered ? 5 : 3.5} className="fill-slate-500 stroke-slate-950" strokeWidth="1.5" />

                      {/* Render custom hover overlay indicator vertical line */}
                      {isHovered && (
                        <line x1={xVal} y1={paddingTop} x2={xVal} y2={svgHeight - paddingBottom} className="stroke-white/30" strokeWidth="1" />
                      )}
                    </g>
                  );
                })}

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="designGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#118A7E" />
                    <stop offset="100%" stopColor="#118A7E" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dynamic Interactive Tooltip Box */}
              <div className="h-8 flex mt-2 justify-center items-center gap-4 text-[10px] text-zinc-300 font-mono">
                {hoveredEmissions !== null ? (
                  <div className="flex gap-4 items-center bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                    <span>
                      <strong className="text-white">{language === 'sw' ? data.monthlyEmissions[hoveredEmissions].monthSw : data.monthlyEmissions[hoveredEmissions].month}:</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> {language === 'sw' ? 'Kawaida' : 'Baseline'}: <strong className="text-white">{data.monthlyEmissions[hoveredEmissions].baseline}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" /> {language === 'sw' ? 'Sanifu' : 'Design'}: <strong className="text-brand-accent">{data.monthlyEmissions[hoveredEmissions].design}</strong>
                    </span>
                    <span className="text-emerald-500 font-bold">
                      -{Math.round(((data.monthlyEmissions[hoveredEmissions].baseline - data.monthlyEmissions[hoveredEmissions].design) / data.monthlyEmissions[hoveredEmissions].baseline) * 100)}%
                    </span>
                  </div>
                ) : (
                  <div className="text-slate-500 flex items-center gap-1 text-[9px] uppercase tracking-wider">
                    <RefreshCw size={10} className="animate-spin" /> Hover over a month data node for stats
                  </div>
                )}
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="flex justify-center gap-6 mt-2 text-[10px] font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 border-t border-dashed border-slate-500" />
                <span>{language === 'sw' ? t.baselineLabelSw : t.baselineLabelEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-brand-accent" />
                <span className="text-brand-primary dark:text-zinc-200">{language === 'sw' ? t.designLabelSw : t.designLabelEn}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Material Sustainability Index Sourcing */}
        {activeTab === 'materials' && (
          <motion.div
            key="materials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Visual breakdown bars representation */}
            <div className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-lg">
              {/* Recycled Raw Materials */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-brand-primary dark:text-zinc-200">
                    {language === 'sw' ? 'Nyenzo Zilizosindikwa' : 'Recycled Content'}
                  </span>
                  <span className="text-brand-accent font-display font-black">{data.materialSourcing}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${data.materialSourcing}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-brand-accent rounded"
                  />
                </div>
              </div>

              {/* Water Reclamation Ratio */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-brand-primary dark:text-zinc-200">
                    {language === 'sw' ? 'Mzunguko wa Nyenzo Zote' : 'Ethical Timber & Wood Sourcing'}
                  </span>
                  <span className="text-emerald-500 font-display font-black">{Math.min(100, data.materialSourcing + 20)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, data.materialSourcing + 20)}%` }}
                    transition={{ duration: 1, delay: 0.15 }}
                    className="h-full bg-emerald-500 rounded"
                  />
                </div>
              </div>

              {/* Carbon Embedded Index */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-brand-primary dark:text-zinc-200">
                    {language === 'sw' ? 'Ufanisi wa Saruji ya Kijani' : 'Low-Carbon Formulations'}
                  </span>
                  <span className="text-amber-500 font-display font-black">{Math.max(30, data.carbonReduction + 15)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(30, data.carbonReduction + 15)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-amber-500 rounded"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-zinc-400 leading-normal font-sans italic pt-2">
                * {language === 'sw' ? t.materialSubtextSw : t.materialSubtextEn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
