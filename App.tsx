
import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ThreeDCore from './components/ThreeDCore';
import NeuralLink from './components/NeuralLink';
import SectionHeader from './components/SectionHeader';
import SkillBar from './components/SkillBar';
import { 
  HERO_NAME, 
  HERO_SUBTITLE, 
  HERO_STATEMENT, 
  ABOUT_CONTENT, 
  SKILLS_TOOLS, 
  SOFT_SKILLS, 
  LANGUAGES, 
  PORTFOLIO_SOURCES, 
  CONTACT_INFO 
} from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for reveal animations
  const aboutRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      
      const flashlight = document.getElementById('flashlight');
      if (flashlight) {
        if (currentScroll < 500) {
          document.documentElement.style.setProperty('--mask-opacity', '0.99');
          document.documentElement.style.setProperty('--mask-size', '180px');
        } else {
          document.documentElement.style.setProperty('--mask-opacity', '0.30');
          document.documentElement.style.setProperty('--mask-size', '650px');
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    // Intersection Observer for About section animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0');
          entry.target.classList.remove('opacity-0', '-translate-x-10');
        }
      });
    }, { threshold: 0.2 });

    aboutRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => setAccessGranted(true), 100);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (loading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  const menuItems = [
    { label: 'IDENTITY', id: 'home' },
    { label: 'THE GUARDIAN', id: 'about' },
    { label: 'WEAPONS', id: 'skills' },
    { label: 'INTEL ARCHIVES', id: 'portfolio' },
    { label: 'SIGNAL', id: 'contact' }
  ];

  return (
    <div className={`bg-[#000] min-h-screen text-white font-inter selection:bg-blue-600 selection:text-white ${accessGranted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 overflow-x-hidden`}>
      <CustomCursor />
      
      {/* SYSTEM NAV HUD */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="font-space font-bold text-2xl tracking-tighter group flex items-center gap-3">
            <span className="group-hover:text-blue-500 transition-colors uppercase">Sultanov</span>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-white/20">FAZLIDDIN_SYSTEM_ALPHA</span>
          </div>
          <div className="font-mono text-[9px] text-blue-500/60 uppercase tracking-[0.5em] mt-1">
            System Analysis // Phase_4 // {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pointer-events-auto flex flex-col gap-1.5 items-end group bg-black/40 p-4 backdrop-blur-md border border-white/5"
        >
          <div className={`h-[1px] bg-blue-500 transition-all duration-500 ${isMenuOpen ? 'w-10 rotate-45 translate-y-2' : 'w-10'}`}></div>
          <div className={`h-[1px] bg-blue-500 transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></div>
          <div className={`h-[1px] bg-blue-500 transition-all duration-500 ${isMenuOpen ? 'w-10 -rotate-45 -translate-y-2' : 'w-10'}`}></div>
        </button>
      </nav>

      {/* TACTICAL MENU PANEL */}
      <div className={`fixed inset-0 z-[90] bg-black/98 backdrop-blur-3xl transition-all duration-700 flex items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-105'}`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"></div>
        </div>
        <nav className="flex flex-col gap-14 text-center relative z-10">
          {menuItems.map((item, i) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)}
              className="group font-space text-5xl md:text-8xl font-bold tracking-tighter hover:text-blue-500 transition-all duration-500"
            >
              <span className="font-mono text-sm text-blue-500/20 mr-4 group-hover:text-blue-500 transition-colors">0{i+1}_</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none z-0">
            <ThreeDCore />
          </div>

          <div className="relative z-10 space-y-12 max-w-7xl">
            <div className="space-y-6">
              <div className="font-mono text-[10px] text-blue-500 tracking-[1.5em] uppercase animate-pulse">Initial_Neural_Link_Status: OK</div>
              <h1 className="font-space text-6xl md:text-9xl lg:text-[13rem] font-bold tracking-tighter leading-[0.85] text-white uppercase text-reveal">
                {HERO_NAME.split(' ').map((word, i) => (
                  <span key={i} className="block group cursor-default title-hover-effect">
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col items-center space-y-12">
              <p className="text-lg md:text-2xl text-white/40 font-mono tracking-widest uppercase max-w-4xl leading-relaxed">
                {HERO_SUBTITLE}
              </p>
              
              <div className="flex flex-col items-center gap-12 pt-8">
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="group relative px-24 py-8 bg-blue-600/5 border border-blue-500/20 hover:border-blue-500 transition-all"
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 font-mono text-xs font-bold tracking-[1em] uppercase group-hover:text-black">Execute_Dossier</span>
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-blue-500"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-blue-500"></div>
                </a>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] max-w-md">"{HERO_STATEMENT}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MODULE - Neural Link */}
        <section className="bg-[#020202] border-y border-white/5 relative overflow-hidden">
           <NeuralLink />
        </section>

        {/* ABOUT SECTION - THE GUARDIAN */}
        <section className="py-60 px-6 md:px-20 lg:px-40" id="about">
          <SectionHeader title="Executive Dossier" index="01" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <div className="space-y-16">
              {ABOUT_CONTENT.map((p, i) => (
                <p 
                  key={i} 
                  ref={el => aboutRefs.current[i] = el}
                  className="text-xl md:text-3xl text-white/60 leading-relaxed font-light border-l-2 border-blue-500/20 pl-12 hover:border-blue-500 hover:text-white transition-all duration-[1200ms] opacity-0 -translate-x-10 ease-out"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full"></div>
               <div className="relative border border-white/5 p-12 bg-white/[0.02] backdrop-blur-xl border-l-4 border-l-blue-500 overflow-hidden group/box">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/box:opacity-40 transition-opacity">
                    <div className="w-16 h-16 border-t border-r border-blue-500"></div>
                  </div>
                  <div className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-10 border-b border-white/10 pb-4">Educational_Archives</div>
                  <div className="space-y-12">
                    <div className="relative group cursor-pointer">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 group-hover:h-full transition-all duration-500"></div>
                      <h4 className="font-space text-3xl font-bold mb-2 uppercase tracking-tight text-white group-hover:text-blue-500 transition-colors duration-500">Fergana State Technical University</h4>
                      <p className="text-xs text-white/30 font-mono uppercase tracking-[0.3em] group-hover:text-white/70 transition-colors duration-500">B.Eng // Computer Engineering // Year_03</p>
                    </div>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 group-hover:h-full transition-all duration-500"></div>
                      <h4 className="font-space text-3xl font-bold mb-2 uppercase tracking-tight text-white group-hover:text-blue-500 transition-colors duration-500">Secondary Sector 40</h4>
                      <p className="text-xs text-white/30 font-mono uppercase tracking-[0.3em] group-hover:text-white/70 transition-colors duration-500">Core_Education_Module</p>
                    </div>
                  </div>
                  <div className="mt-16 flex justify-between">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="w-4 h-1 bg-blue-500/10 animate-pulse" style={{animationDelay: `${i*100}ms`}}></div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION - WEAPONS */}
        <section className="py-60 px-6 md:px-20 lg:px-40" id="skills">
          <SectionHeader title="Tactical Weaponry" index="02" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="space-y-16">
              <h3 className="font-mono text-xs text-blue-500 tracking-[1em] uppercase mb-12 flex items-center gap-6">
                <div className="w-12 h-px bg-blue-500"></div>
                Visual_Ordnance
              </h3>
              {SKILLS_TOOLS.map((skill, i) => (
                <SkillBar key={i} name={skill.name} level={skill.level} />
              ))}
            </div>
            <div className="space-y-24">
              <div>
                 <h3 className="font-mono text-xs text-blue-500 tracking-[1em] uppercase mb-12 flex items-center gap-6">
                    <div className="w-12 h-px bg-blue-500"></div>
                    Cognitive_Intelligence
                 </h3>
                 <div className="grid grid-cols-2 gap-6">
                   {SOFT_SKILLS.map((skill, i) => (
                     <div key={i} className="px-6 py-5 border border-white/5 bg-white/[0.01] hover:border-blue-500 transition-all duration-500 text-[10px] font-mono tracking-[0.3em] uppercase relative overflow-hidden group/btn">
                       <div className="absolute inset-0 bg-blue-500/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform"></div>
                       <span className="relative z-10">{skill}</span>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="space-y-8">
                <h3 className="font-mono text-xs text-blue-500 tracking-[1em] uppercase mb-12 flex items-center gap-6">
                    <div className="w-12 h-px bg-blue-500"></div>
                    Neural_Channels
                 </h3>
                {LANGUAGES.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-mono group border-b border-white/5 pb-4 hover:border-blue-500/50 transition-all">
                    <span className="group-hover:text-blue-400 transition-colors tracking-[0.2em]">{lang.split(' — ')[0]}</span>
                    <span className="text-white/20 uppercase font-bold">{lang.split(' — ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION - INTEL ARCHIVES */}
        <section className="py-60 px-6 md:px-20 lg:px-40" id="portfolio">
          <SectionHeader title="Operational Intel" index="03" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PORTFOLIO_SOURCES.map((source, i) => (
              <a 
                key={i} href={source.url} target="_blank" rel="noopener noreferrer"
                className="group relative h-[650px] overflow-hidden border border-white/5 bg-black flex flex-col items-center justify-center transition-all duration-700 hover:border-blue-500"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-all duration-1000 grayscale group-hover:grayscale-0">
                   <img src={`https://images.unsplash.com/photo-${[
                     '1550751827-4bd374c3f58b', 
                     '1518770660439-4636190af475', 
                     '1451187580459-43490279c0fa'
                   ][i]}?auto=format&fit=crop&q=80&w=1200`} className="w-full h-full object-cover scale-125 group-hover:scale-110 transition-transform duration-[4s]" alt="Asset" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center space-y-12 px-12">
                  <div className="w-16 h-px bg-blue-500 mx-auto group-hover:w-48 transition-all duration-1000"></div>
                  <h3 className="font-space text-6xl font-bold tracking-tighter group-hover:text-blue-500 transition-all duration-500 uppercase">{source.platform}</h3>
                  <div className="flex justify-center gap-4">
                     {Array.from({length: 8}).map((_, j) => (
                        <div key={j} className="w-1 h-1 bg-blue-500/20 group-hover:bg-blue-500" style={{transitionDelay: `${j * 50}ms`}}></div>
                     ))}
                  </div>
                  <p className="font-mono text-[9px] text-white/30 tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase">Synchronizing_Encrypted_Archives</p>
                </div>

                <div className="absolute bottom-12 font-mono text-[11px] text-blue-500/40 tracking-[1em] group-hover:text-blue-500 transition-all duration-500 uppercase">Enter_Interface</div>
                
                <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-white/10 group-hover:border-blue-500 transition-all"></div>
                <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-white/10 group-hover:border-blue-500 transition-all"></div>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION - SIGNAL */}
        <section className="py-60 border-t border-white/5 px-6" id="contact">
          <div className="text-center max-w-6xl mx-auto space-y-32">
            <div className="font-mono text-sm text-blue-500 tracking-[1.5em] uppercase animate-pulse">Initiate_Signal_Broadcast</div>
            <h2 className="font-space text-7xl md:text-[14rem] font-bold tracking-tighter leading-none text-white uppercase title-hover-effect">Establish Link</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
               {[
                 { label: 'Secure_Signal_Relay', val: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                 { label: 'Tactical_COMMS_Line', val: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
                 { label: 'Encrypted_Satellite', val: '@FAZLIDDIN_DESIGNS', href: `https://${CONTACT_INFO.telegram}` }
               ].map((c, i) => (
                 <a key={i} href={c.href} className="group p-16 border border-white/5 bg-white/[0.01] hover:border-blue-500 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                    <div className="font-mono text-[10px] text-blue-500/60 uppercase mb-8 tracking-[0.6em] relative z-10">{c.label}</div>
                    <div className="text-sm font-bold tracking-widest relative z-10 font-mono group-hover:text-blue-400 transition-colors truncate">{c.val}</div>
                 </a>
               ))}
            </div>

            <div className="pt-40">
               <button 
                 onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                 className="px-32 py-12 bg-blue-600 text-black font-mono font-bold text-xs tracking-[1em] uppercase hover:bg-white transition-all duration-700"
               >
                 Terminate_Session_Purge
               </button>
            </div>
          </div>
        </section>

      </main>

      {/* SYSTEM STATUS FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full p-10 z-[50] flex justify-between items-end pointer-events-none">
         <div className="flex gap-12">
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></div>
                  <span className="font-mono text-[9px] text-blue-500 uppercase tracking-[0.5em]">System_Secure: fazliddin_sat</span>
               </div>
               <div className="flex gap-1.5 mt-2">
                  {Array.from({length: 25}).map((_, i) => (
                    <div key={i} className="w-4 h-0.5 bg-blue-500/20" style={{opacity: Math.random()}}></div>
                  ))}
               </div>
            </div>
         </div>
         <div className="font-mono text-[9px] opacity-20 text-right uppercase tracking-[0.6em] leading-loose">
            High Precision Interface // Fazliddin Architecture <br />
            © {new Date().getFullYear()} Fazliddin_Tactical // End_Session
         </div>
      </footer>
    </div>
  );
};

export default App;
