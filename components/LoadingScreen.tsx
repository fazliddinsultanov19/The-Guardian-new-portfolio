
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const systemLogs = [
    "INITIALIZING FAZLIDDIN_MAIN_FRAME...",
    "ESTABLISHING SECURE CONNECTION TO FAZLIDDIN_TECH...",
    "LOADING BIOMETRIC DATA: FAZLIDDIN SULTANOV",
    "ACCESSING CLASSIFIED PORTFOLIO ARCHIVES...",
    "ENCRYPTING SIGNAL PATHWAY...",
    "FAZLIDDIN PROTOCOL ENGAGED."
  ];

  useEffect(() => {
    const duration = 4000;
    const interval = 40;
    const step = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    systemLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, (duration / systemLogs.length) * index);
    });

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-8 font-mono">
      <div className="w-full max-w-md space-y-8 relative">
        <div className="absolute -inset-20 bg-blue-900/10 blur-[100px] rounded-full"></div>

        <div className="flex justify-between items-center text-[10px] text-blue-500/60 uppercase tracking-widest border-b border-white/5 pb-2 relative z-10">
          <span>FAZLIDDIN SULTANOV v4.0</span>
          <span>BATT_LEVEL: 100%</span>
        </div>

        <div className="text-7xl md:text-9xl font-bold tracking-tighter text-white tabular-nums relative z-10 text-center">
          {Math.floor(progress)}<span className="text-blue-500">.</span>
        </div>

        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden z-10">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="h-24 space-y-1 overflow-hidden relative z-10">
          {logs.map((log, i) => (
            <div key={i} className="text-[9px] text-blue-400 flex items-center gap-2">
              <span className="opacity-30">#_{i+1}</span>
              <span className="tracking-widest">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;