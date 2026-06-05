import { useEffect } from 'react';
import { motion } from 'motion/react';

interface ThreeDViewerProps {
  modelUrl: string;
  poster?: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        poster?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        exposure?: string;
        ar?: boolean;
      };
    }
  }
}

export default function ThreeDViewer({ modelUrl, poster }: ThreeDViewerProps) {
  useEffect(() => {
    // Dynamically load the model-viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-900/90 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-2xl transition-colors duration-300">
      <model-viewer
        src={modelUrl}
        poster={poster}
        camera-controls
        auto-rotate
        shadow-intensity="1.5"
        environment-image="neutral"
        exposure="1.2"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        ar
      >
        <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-50">
          <div className="flex flex-col items-center gap-8 max-w-[280px] text-center">
            <div className="relative">
              {/* Outer Ring */}
              <motion.div 
                className="w-24 h-24 border-2 border-slate-100 dark:border-slate-800 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              
              {/* Spinning Accent */}
              <motion.div 
                className="absolute inset-0 border-t-2 border-brand-accent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Scale */}
              <motion.div 
                className="absolute inset-4 bg-brand-primary/5 dark:bg-brand-accent/5 rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 bg-brand-accent rounded-full" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <motion.h5 
                className="text-xs font-bold uppercase tracking-[0.4em] text-brand-primary dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Initializing
              </motion.h5>
              <motion.p 
                className="text-[10px] text-slate-400 dark:text-zinc-400 uppercase tracking-widest leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Fetching architectural model and environmental lighting
              </motion.p>
            </div>
            
            {/* Progress Bar Background */}
            <div className="w-full h-[2px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-accent"
                animate={{ 
                  x: ["-100%", "100%"] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.2
                }}
              />
            </div>
          </div>
        </div>
      </model-viewer>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-6 right-6 p-4 bg-white/60 dark:bg-slate-900/70 backdrop-blur-md rounded-lg border border-white/40 dark:border-slate-800/60 flex items-center justify-between pointer-events-none hidden md:flex"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 dark:bg-white/10 flex items-center justify-center">
            <div className="w-4 h-4 border border-brand-primary/40 dark:border-white/40 rounded-sm rotate-45" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary dark:text-white">Model Viewer Active</p>
            <p className="text-[9px] text-slate-500 dark:text-zinc-400 uppercase tracking-tighter">Swipe to explore every angle</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </motion.div>
    </div>
  );
}
