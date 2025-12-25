
import React, { useEffect, useState } from 'react';

const ThreeDCore: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientY - innerHeight / 2) / 40;
      const y = (e.clientX - innerWidth / 2) / 40;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] flex items-center justify-center pointer-events-none perspective-2000">
      <div 
        className="relative w-full h-full transform-style-3d transition-transform duration-1000 ease-out"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {/* Layered Symmetrical Rings (Tactical Grade) */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="absolute inset-0 border border-blue-500/10 rounded-full flex items-center justify-center"
            style={{
              transform: `rotateX(${i * 36}deg) rotateY(${i * 18}deg)`,
              padding: `${i * 10}%`
            }}
          >
             <div className="w-full h-full border border-blue-500/5 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
          </div>
        ))}

        {/* Central Rectangular Matrix (Ordered) */}
        <div className="absolute inset-[30%] border border-blue-500/20 transform-style-3d backdrop-blur-sm">
           <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
              {Array.from({length: 64}).map((_, i) => (
                <div key={i} className="border-[0.5px] border-blue-500/10"></div>
              ))}
           </div>
           
           {/* Internal Symmetrical Components */}
           <div className="absolute inset-4 border border-blue-400/40 transform-style-3d rotate-45 flex items-center justify-center">
              <div className="w-24 h-24 border border-white/20 rotate-[-45deg] flex items-center justify-center">
                 <div className="w-4 h-4 bg-white shadow-[0_0_30px_#fff] rounded-full"></div>
              </div>
           </div>
        </div>

        {/* High Precision Data Points */}
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
            style={{
              transform: `rotateY(${i * 30}deg) translateZ(300px)`
            }}
          ></div>
        ))}

        {/* Vertical and Horizontal Precision Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.5px] h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[0.5px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default ThreeDCore;
