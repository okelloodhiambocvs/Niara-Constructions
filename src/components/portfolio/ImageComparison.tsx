import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageComparisonProps {
  before: string;
  after: string;
}

export default function ImageComparison({ before, after }: ImageComparisonProps) {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-sm overflow-hidden group shadow-2xl bg-white">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage 
            src={before} 
            alt="Before Renovation" 
            referrerPolicy="no-referrer"
            style={{ filter: 'grayscale(20%)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage 
            src={after} 
            alt="After Renovation" 
            referrerPolicy="no-referrer"
          />
        }
        style={{ width: '100%', height: '100%' }}
        className="h-full"
      />
      
      {/* Decorative Overlays */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Project Phase</span>
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
            Initial State
          </span>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 z-10 pointer-events-none text-right">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent/50">Final Legacy</span>
          <span className="px-3 py-1 bg-brand-accent backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-brand-accent/50 shadow-lg">
            Niara Redesign
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
        <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">Slide to Compare Precision</span>
        <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
}
