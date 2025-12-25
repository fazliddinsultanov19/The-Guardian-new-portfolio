
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      {/* Target Ring */}
      <div className={`
        relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 
        border border-blue-500/50 rounded-full transition-all duration-300
        flex items-center justify-center
        ${isHovering ? 'scale-150 border-white/50 bg-white/5' : 'scale-100'}
      `}>
        {/* Crosshair */}
        <div className="absolute w-full h-[1px] bg-blue-500/30"></div>
        <div className="absolute h-full w-[1px] bg-blue-500/30"></div>
        {/* Dot */}
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* Coordinates Display */}
      <div className="absolute top-6 left-6 font-mono text-[8px] text-blue-400 opacity-50 whitespace-nowrap">
        X: {position.x} | Y: {position.y}
      </div>
    </div>
  );
};

export default CustomCursor;
