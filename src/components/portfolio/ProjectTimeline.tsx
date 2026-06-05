import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, Clock, Filter } from 'lucide-react';

interface Milestone {
  date: string;
  title: string;
  status: 'completed' | 'ongoing' | 'planned';
}

interface ProjectTimelineProps {
  milestones: Milestone[];
}

export default function ProjectTimeline({ milestones }: ProjectTimelineProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing' | 'planned'>('all');

  const filteredMilestones = statusFilter === 'all' 
    ? milestones 
    : milestones.filter(m => m.status === statusFilter);

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6 mb-12">
        <h4 className="font-display font-bold text-lg uppercase tracking-widest border-l-4 border-brand-accent pl-4">
          Project Milestones
        </h4>
        
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'completed', 'ongoing', 'planned'] as const).map((status) => (
            <motion.button
              key={status}
              onClick={() => setStatusFilter(status)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
                statusFilter === status 
                  ? 'bg-brand-primary dark:bg-brand-accent dark:text-brand-primary text-white border-brand-primary dark:border-brand-accent shadow-lg' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-zinc-450 border-slate-200 dark:border-slate-700 hover:border-brand-accent hover:text-brand-primary dark:hover:text-white'
              }`}
            >
              {status === 'all' ? 'Entire Journey' : status}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[140px]">
        {/* Continuous Background Track */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
        
        <div className="space-y-6 relative">
          <AnimatePresence mode="popLayout">
            {filteredMilestones.map((milestone, index) => (
              <motion.div 
                key={`${milestone.title}-${index}`}
                layout
                initial={{ opacity: 0, x: -15, y: 5 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="relative pl-12"
              >
                {/* Milestone Node */}
                <div className={`absolute left-0 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center z-10 transition-all duration-700 ${
                  milestone.status === 'completed' ? 'bg-brand-accent text-brand-primary' : 
                  milestone.status === 'ongoing' ? 'bg-brand-primary dark:bg-white text-white dark:text-brand-primary scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                }`}>
                  {milestone.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                </div>
                
                {/* Milestone Card */}
                <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800/85 rounded-lg hover:border-brand-accent/30 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-500 group overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-2 transition-colors ${
                    milestone.status === 'completed' ? 'text-brand-accent' : 
                    milestone.status === 'ongoing' ? 'text-brand-primary dark:text-zinc-200' : 'text-slate-400'
                  }`}>
                    <Calendar size={12} className="opacity-60" /> {milestone.date}
                  </span>
                  
                  <h5 className="font-display font-bold text-brand-primary dark:text-white text-sm tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                    {milestone.title}
                  </h5>
                  
                  {milestone.status === 'ongoing' && (
                    <div className="mt-3 h-0.5 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-brand-primary dark:bg-brand-accent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredMilestones.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pl-12 py-6 text-xs font-medium text-slate-400 italic"
            >
              No milestones found for the selected phase.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
