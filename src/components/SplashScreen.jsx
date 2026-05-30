import React, { useEffect, useState } from 'react';

const initSequence = [
  { text: '> INIT HEALSYNC_CORE_V3.0...', delay: 200 },
  { text: '> LOADING EMERGENCY AI MODELS... [OK]', delay: 600 },
  { text: '> CALIBRATING VOICE RECOGNITION... [OK]', delay: 1000 },
  { text: '> VERIFYING OFFLINE DATABASE... [OK]', delay: 1400 },
  { text: '> ACTIVATING EMERGENCY NETWORK... [OK]', delay: 1800 },
  { text: '> ALL SYSTEMS OPERATIONAL.', delay: 2200 },
];

export default function SplashScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeouts = [];

    // Stagger each init line
    initSequence.forEach(({ text, delay }, i) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, text]);
          setProgress(((i + 1) / initSequence.length) * 100);
        }, delay)
      );
    });

    // Fade out
    timeouts.push(setTimeout(() => setIsFadingOut(true), 2800));
    // Unmount
    timeouts.push(setTimeout(() => onComplete(), 3500));

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#03080c] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 bg-cyan-400/30 rounded-full blur-[1px] animate-float"></div>
        <div className="absolute top-[70%] right-[20%] w-2 h-2 bg-cyan-300/20 rounded-full blur-[2px] animate-float-delayed"></div>
        <div className="absolute bottom-[25%] left-[15%] w-1 h-1 bg-white/20 rounded-full blur-[1px] animate-float-slow"></div>
        <div className="absolute top-[40%] right-[35%] w-1.5 h-1.5 bg-cyan-500/25 rounded-full blur-[1px] animate-float"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        {/* Logo Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full animate-pulse-glow"></div>
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <img src="/logo.png" alt="HealSync Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          HealSync
        </h1>
        <p className="text-cyan-500/70 text-sm font-bold tracking-[0.4em] uppercase mb-10">
          Emergency AI Platform
        </p>

        {/* EKG SVG Animation */}
        <div className="w-64 h-16 mb-8 opacity-80">
          <svg viewBox="0 0 200 40" className="w-full h-full overflow-visible">
            <path 
              d="M 0 20 L 60 20 L 70 5 L 80 35 L 90 20 L 200 20" 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-draw-ekg drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
            />
          </svg>
        </div>

        {/* Terminal Init Lines */}
        <div className="w-80 md:w-96 h-40 overflow-hidden font-mono mb-6">
          <div className="flex flex-col gap-1.5">
            {visibleLines.map((line, i) => (
              <p 
                key={i} 
                className={`text-[11px] md:text-xs tracking-wider uppercase animate-fade-in-up ${
                  line.includes('[OK]') ? 'text-cyan-400/80' : 
                  line.includes('OPERATIONAL') ? 'text-green-400/90 font-bold' : 
                  'text-cyan-400/60'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Version Number */}
      <div className="absolute bottom-6 right-6 text-[10px] text-slate-600 font-mono tracking-widest">
        v3.0.1
      </div>
    </div>
  );
}
