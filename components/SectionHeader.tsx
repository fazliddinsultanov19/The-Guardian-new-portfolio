
import React from 'react';

interface SectionHeaderProps {
  title: string;
  index: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, index }) => {
  return (
    <div className="mb-20 group relative">
      <div className="flex items-baseline gap-6 mb-4">
        <span className="font-mono text-[10px] text-blue-500 opacity-60 font-bold tracking-[0.4em]">[{index}]</span>
        <h2 className="font-space text-4xl md:text-7xl font-bold tracking-tighter uppercase text-white group-hover:text-blue-500 transition-colors duration-700">
          {title}
        </h2>
      </div>
      <div className="w-full h-[1px] bg-white/5 relative">
        <div className="absolute top-0 left-0 w-20 h-full bg-blue-500 group-hover:w-full transition-all duration-1000"></div>
      </div>
      <div className="mt-2 font-mono text-[7px] text-white/10 uppercase tracking-[0.5em]">Fazliddin_Protocol_0{index}</div>
    </div>
  );
};

export default SectionHeader;