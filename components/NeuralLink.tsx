
import React, { useEffect, useState, useRef } from 'react';

const NeuralLink: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle from center to mouse
      const x = -(e.clientY - centerY) / 10;
      const y = (e.clientX - centerX) / 10;
      
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center perspective-2000 py-40 overflow-visible">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[1px] h-full bg-blue-500"></div>
        <div className="h-[1px] w-full bg-blue-500 absolute"></div>
      </div>
      
      <div 
        className="relative w-96 h-96 transform-style-3d transition-transform duration-150 ease-out"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {/* Core Frame */}
        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-xl flex items-center justify-center transform-style-3d">
           {/* Geometric Blades */}
           {[0, 60, 120, 180, 240, 300].map((angle) => (
             <div 
               key={angle}
               className="absolute w-1 h-64 bg-gradient-to-t from-blue-600 to-transparent"
               style={{ transform: `rotateZ(${angle}deg) translateZ(50px)` }}
             ></div>
           ))}
           
           {/* Internal Mechanism */}
           <div className="absolute w-40 h-40 border-4 border-blue-500/40 rounded-full animate-[spin_10s_linear_infinite] transform-style-3d">
              <div className="absolute inset-4 border border-white/20 rounded-full flex items-center justify-center">
                 <div className="w-10 h-10 bg-white rounded-full blur-[1px] shadow-[0_0_50px_#fff]"></div>
              </div>
           </div>

           {/* Precision HUD elements following z-depth */}
           <div className="absolute -translate-z-40 w-full h-full border border-blue-500/10 flex items-center justify-center">
              <div className="font-mono text-[10px] text-blue-500 opacity-40">AUTO_TARGETING_ENGAGED</div>
           </div>
           
           <div className="absolute translate-z-40 w-64 h-64 border border-blue-500/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-full bg-blue-500 opacity-20 rotate-45"></div>
              <div className="w-1 h-full bg-blue-500 opacity-20 -rotate-45"></div>
           </div>
        </div>
        
        {/* Floating Data Satellites */}
        {Array.from({length: 4}).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-blue-400 shadow-[0_0_15px_#3b82f6]"
            style={{ 
              transform: `rotateY(${i * 90}deg) translateZ(220px)`,
              animation: `float_${i} 3s ease-in-out infinite alternate`
            }}
          ></div>
        ))}
      </div>
      
      <div className="absolute bottom-10 font-mono text-[9px] text-blue-500 tracking-[1em] opacity-40 uppercase">
        Tactical_Focus_Module // XY_Tracking: {Math.floor(rotation.x)} | {Math.floor(rotation.y)}
      </div>
    </div>
  );
};

export default NeuralLink;
