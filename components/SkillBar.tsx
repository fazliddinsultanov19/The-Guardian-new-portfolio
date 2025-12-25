
import React, { useState, useEffect, useRef } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setCurrentWidth(level), 200);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="space-y-3 group" ref={barRef}>
      <div className="flex justify-between items-end">
        <span className="font-space text-sm font-bold tracking-[0.2em] group-hover:text-blue-500 transition-colors">{name}</span>
        <span className="font-mono text-[9px] opacity-30 tracking-widest">{currentWidth}%_LOADED</span>
      </div>
      <div className="h-[2px] bg-white/5 overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-[2000ms] ease-out shadow-[0_0_20px_#2563eb]" 
          style={{ width: `${currentWidth}%` }}
        >
          {/* Animated Highlight */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
};

export default SkillBar;
