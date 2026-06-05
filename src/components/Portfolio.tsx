import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Maximize2, Layers, Repeat } from 'lucide-react';
import ImageComparison from './portfolio/ImageComparison';
import ProjectTimeline from './portfolio/ProjectTimeline';
import ThreeDViewer from './portfolio/ThreeDViewer';
import SustainabilityMetrics, { SustainabilityData } from './portfolio/SustainabilityMetrics';
import { useLanguage } from './LanguageContext';

interface Project {
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  type: 'standard' | 'renovation' | 'design';
  modelUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  stats: { area: string; status: string };
  milestones: { date: string; title: string; status: 'completed' | 'ongoing' | 'planned' }[];
  sustainability: SustainabilityData;
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const projectTitle = customEvent.detail;
      const matched = projects.find(p => p.title === projectTitle);
      if (matched) {
        setSelectedProject(matched);
      }
    };
    window.addEventListener('select-portfolio-project', handleSelectProject);
    return () => window.removeEventListener('select-portfolio-project', handleSelectProject);
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const projects: Project[] = [
    {
      title: "The Vertex Plaza",
      category: "Commercial",
      location: "Kisumu City",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
      description: "A premier commercial complex designed to redefine corporate excellence in the heart of Kisumu. The Vertex Plaza features modern workspaces, energy-efficient glazing, and high-tech security systems.",
      type: 'design',
      modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", 
      stats: { area: "45,000 sqft", status: "Completed" },
      milestones: [
        { date: "Oct 2024", title: "Conceptual Design Approval", status: 'completed' },
        { date: "Jan 2025", title: "Foundation & Substructure", status: 'completed' },
        { date: "June 2025", title: "Structural Topping Out", status: 'completed' },
        { date: "March 2026", title: "Facade & Interior Fit-out", status: 'ongoing' },
        { date: "May 2026", title: "Final Inspection & Handover", status: 'planned' }
      ],
      sustainability: {
        carbonReduction: 38,
        energySavings: 45,
        materialSourcing: 52,
        waterConservation: 30,
        highlightEn: "Engineered with integrated double-glazing structural glass systems and HVAC heat recovery loops, mitigating commercial solar gains.",
        highlightSw: "Imesanifiwa kwa mifumo ya vioo viwili kuzuia joto la jua na mifumo ya kurejesha nishati inayookoa rasilimali kibiashara.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 120, design: 74 },
          { month: "Mar", monthSw: "Mac", baseline: 110, design: 68 },
          { month: "May", monthSw: "Mei", baseline: 135, design: 84 },
          { month: "Jul", monthSw: "Jul", baseline: 130, design: 80 },
          { month: "Sep", monthSw: "Sep", baseline: 125, design: 77 },
          { month: "Nov", monthSw: "Nov", baseline: 115, design: 71 }
        ]
      }
    },
    {
      title: "Heritage Hotel Restore",
      category: "Commercial",
      location: "Kibuye",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070",
      description: "A complete overhaul of one of Kisumu's historic hotel sites. We preserved the colonial architectural charm while integrating modern energy systems and luxury amenities.",
      type: 'renovation',
      beforeImage: "https://images.unsplash.com/photo-1449156003053-930cce1b7fd9?auto=format&fit=crop&q=80&w=2070",
      afterImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070",
      stats: { area: "18,000 sqft", status: "Completed" },
      milestones: [
        { date: "Feb 2025", title: "Structural Assessment", status: 'completed' },
        { date: "Aug 2025", title: "Phase 1 Restoration", status: 'completed' },
        { date: "Jan 2026", title: "Grand Re-opening", status: 'completed' }
      ],
      sustainability: {
        carbonReduction: 42,
        energySavings: 35,
        materialSourcing: 75,
        waterConservation: 25,
        highlightEn: "Preserved original colonial structural brick framework, diverting approximately 420 tonnes of carbon waste from Kisumu landfills.",
        highlightSw: "Tulihifadhi msingi halisi wa kuta za kale, tukaokoa takriban tani 420 za taka za carbon kuharibu mazingira Kisumu.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 80, design: 52 },
          { month: "Mar", monthSw: "Mac", baseline: 75, design: 49 },
          { month: "May", monthSw: "Mei", baseline: 90, design: 58 },
          { month: "Jul", monthSw: "Jul", baseline: 85, design: 55 },
          { month: "Sep", monthSw: "Sep", baseline: 80, design: 52 },
          { month: "Nov", monthSw: "Nov", baseline: 78, design: 51 }
        ]
      }
    },
    {
      title: "Lakeside Mansions",
      category: "Residential",
      location: "Milimani, Kisumu",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
      description: "A series of high-end lake-front residences focusing on privacy and luxury. Every mansion features smart home automation and bespoke interior design tailored to the client's lifestyle.",
      type: 'standard',
      stats: { area: "12,000 sqft", status: "Ongoing" },
      milestones: [
        { date: "Dec 2025", title: "Land Acquisition & Survey", status: 'completed' },
        { date: "May 2026", title: "Groundbreaking Ceremony", status: 'ongoing' },
        { date: "Nov 2026", title: "Rough-in Utilities", status: 'planned' },
        { date: "Feb 2027", title: "Final Finishing", status: 'planned' }
      ],
      sustainability: {
        carbonReduction: 30,
        energySavings: 50,
        materialSourcing: 40,
        waterConservation: 60,
        highlightEn: "Features a localized closed-loop greywater filtration system feeding organic lake-front gardens and natural passive draft cooling.",
        highlightSw: "Ina mfumo thabiti wa kusafisha maji makoafu kumwagilia bustani kiasili na usanifu wa kupoza joto bila kiyoyozi.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 95, design: 66 },
          { month: "Mar", monthSw: "Mac", baseline: 90, design: 63 },
          { month: "May", monthSw: "Mei", baseline: 105, design: 73 },
          { month: "Jul", monthSw: "Jul", baseline: 100, design: 70 },
          { month: "Sep", monthSw: "Sep", baseline: 98, design: 68 },
          { month: "Nov", monthSw: "Nov", baseline: 92, design: 64 }
        ]
      }
    },
    {
      title: "Skyline Apartments",
      category: "Residential",
      location: "Riat Hills",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2070",
      description: "Contemporary multi-unit residential development offering panoramic views of Lake Victoria. Designed for sustainability with rainwater harvesting and solar lighting.",
      type: 'standard',
      stats: { area: "28,000 sqft", status: "Completed" },
      milestones: [
        { date: "Jan 2024", title: "Initial Planning", status: 'completed' },
        { date: "March 2024", title: "Boring & Soil Tests", status: 'completed' },
        { date: "Sept 2024", title: "Upper Level Construction", status: 'completed' },
        { date: "Dec 2025", title: "Project Handover", status: 'completed' }
      ],
      sustainability: {
        carbonReduction: 35,
        energySavings: 40,
        materialSourcing: 45,
        waterConservation: 55,
        highlightEn: "Equipped with large underground rainwater harvesting reservoirs supplying toilets, laundries, and solar-metered public light grids.",
        highlightSw: "Imewekewa matangi makubwa ya chini ya ardhi ya maji ya mvua, mifumo ya kufulia, pamoja na taa za barabarani za nishati ya jua.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 140, design: 91 },
          { month: "Mar", monthSw: "Mac", baseline: 130, design: 84 },
          { month: "May", monthSw: "Mei", baseline: 155, design: 100 },
          { month: "Jul", monthSw: "Jul", baseline: 150, design: 97 },
          { month: "Sep", monthSw: "Sep", baseline: 145, design: 94 },
          { month: "Nov", monthSw: "Nov", baseline: 135, design: 87 }
        ]
      }
    },
    {
       title: "Futuristic Annex",
       category: "Industrial",
       location: "Kisumu West",
       image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&q=80&w=2070",
       description: "A high-concept industrial annex designed for modern manufacturing. Features a modular layout and integrated smart management systems.",
       type: 'design',
       modelUrl: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
       stats: { area: "32,000 sqft", status: "Planning" },
       milestones: [
        { date: "Jan 2026", title: "Design Phase Initiation", status: 'completed' },
        { date: "April 2026", title: "Zoning Approval", status: 'ongoing' },
        { date: "June 2026", title: "Contracting & Sourcing", status: 'planned' }
      ],
      sustainability: {
        carbonReduction: 48,
        energySavings: 60,
        materialSourcing: 65,
        waterConservation: 40,
        highlightEn: "Fully off-grid design powered by kinetic roof solar pathways and local circular aggregate concrete foundation recipes.",
        highlightSw: "Ujenzi kamili usiotegemea gridi kuu, unatumia nishati ya jua ya makorobeko na fomula ya zege isiyomaliza nishati.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 160, design: 83 },
          { month: "Mar", monthSw: "Mac", baseline: 150, design: 78 },
          { month: "May", monthSw: "Mei", baseline: 180, design: 93 },
          { month: "Jul", monthSw: "Jul", baseline: 175, design: 91 },
          { month: "Sep", monthSw: "Sep", baseline: 170, design: 88 },
          { month: "Nov", monthSw: "Nov", baseline: 155, design: 80 }
        ]
      }
    },
    {
      title: "Victoria Bay Manor",
      category: "Residential",
      location: "Dunga Beach",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
      description: "A complete transformation of a dated 1980s villa into a contemporary Mediterranean-style manor. The renovation included structural reinforcements, a new infinite pool, and custom interior woodwork.",
      type: 'renovation',
      beforeImage: "https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=2070",
      afterImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
      stats: { area: "9,500 sqft", status: "Completed" },
      milestones: [
        { date: "Nov 2024", title: "Stripping & Demolition", status: 'completed' },
        { date: "March 2025", title: "Interior Re-routing", status: 'completed' },
        { date: "Sept 2025", title: "Luxury Finishes Installation", status: 'completed' },
        { date: "Dec 2025", title: "Landscaping & Pool", status: 'completed' }
      ],
      sustainability: {
        carbonReduction: 28,
        energySavings: 38,
        materialSourcing: 70,
        waterConservation: 45,
        highlightEn: "Reconstructed using high-insulation clay bricks that retain cooling and active solar panels heater supply loops for the swimming pool.",
        highlightSw: "Imefanyiwa ukarabati kwa kutumia matofali kauri yanayohifadhi ubaridi na hita ya jua kupasha maji ya bwawa lake la kuogelea.",
        monthlyEmissions: [
          { month: "Jan", monthSw: "Jan", baseline: 70, design: 50 },
          { month: "Mar", monthSw: "Mac", baseline: 65, design: 46 },
          { month: "May", monthSw: "Mei", baseline: 80, design: 57 },
          { month: "Jul", monthSw: "Jul", baseline: 75, design: 54 },
          { month: "Sep", monthSw: "Sep", baseline: 72, design: 51 },
          { month: "Nov", monthSw: "Nov", baseline: 68, design: 48 }
        ]
      }
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Portfolio</span>
            <h2 className="heading-lg">Building Iconic Landmarks Across Kenya.</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${filter === cat ? 'bg-brand-primary dark:bg-brand-accent dark:text-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-brand-secondary dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-brand-accent hover:border-brand-accent hover:text-brand-primary">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="py-1 px-3 bg-white dark:bg-slate-800 dark:text-white text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-lg capitalize">
                      {project.category}
                    </div>
                    {project.type === 'design' && (
                      <div className="py-1 px-3 bg-brand-accent text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-lg flex items-center gap-1">
                        <Layers size={10} /> 3D Design
                      </div>
                    )}
                    {project.type === 'renovation' && (
                      <div className="py-1 px-3 bg-white dark:bg-slate-800 dark:text-white text-[10px] font-bold uppercase tracking-widest text-brand-primary border border-brand-primary/20 shadow-lg flex items-center gap-1">
                        <Repeat size={10} className="text-brand-accent" /> Before / After
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="heading-md text-xl">{project.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${project.stats.status === 'Ongoing' ? 'bg-brand-accent/10 text-brand-accent font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-brand-secondary dark:text-zinc-300'}`}>
                      {project.stats.status}
                    </span>
                  </div>
                  <p className="text-sm text-brand-secondary dark:text-zinc-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-accent rounded-full" /> {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <a href="#contact" className="btn-outline">
            Inquire About a Project
          </a>
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-primary/95 dark:bg-slate-950/95 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-6xl bg-white dark:bg-slate-900 border dark:border-slate-800 h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-white/10 dark:bg-slate-800/80 hover:bg-brand-accent hover:text-brand-primary text-brand-primary dark:text-white rounded-full transition-all border border-slate-200 dark:border-slate-700 pointer-events-auto cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="flex-1 h-[40vh] md:h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                {selectedProject.type === 'design' && selectedProject.modelUrl ? (
                   <ThreeDViewer modelUrl={selectedProject.modelUrl} />
                ) : selectedProject.type === 'renovation' && selectedProject.beforeImage && selectedProject.afterImage ? (
                  <div className="h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                    <ImageComparison before={selectedProject.beforeImage} after={selectedProject.afterImage} />
                  </div>
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                )}
              </div>

              <div className="w-full md:w-[450px] bg-white dark:bg-slate-900 h-full overflow-y-auto p-8 md:p-12 flex flex-col border-l border-slate-100 dark:border-slate-800">
                <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Project Excellence</span>
                <h3 className="heading-lg text-3xl mb-4 dark:text-white">{selectedProject.title}</h3>
                <p className="text-sm text-brand-secondary dark:text-zinc-300 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Total Area</span>
                    <span className="text-sm font-bold text-brand-primary dark:text-white">{selectedProject.stats.area}</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Status</span>
                    <span className="text-sm font-bold text-brand-primary dark:text-white">{selectedProject.stats.status}</span>
                  </div>
                </div>

                <ProjectTimeline milestones={selectedProject.milestones} />

                <SustainabilityMetrics data={selectedProject.sustainability} language={language} />

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <a href="#contact" onClick={() => setSelectedProject(null)} className="btn-primary w-full justify-center text-sm uppercase tracking-widest">
                    Request Similar Project <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

