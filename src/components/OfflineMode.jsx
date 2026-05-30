import React, { useEffect, useState } from 'react';
import { WifiOff, ShieldAlert, AlertOctagon, Activity, AlertTriangle, ArrowRight, HeartPulse, Crosshair, Terminal } from 'lucide-react';
import offlineGuides from '../data/offlineGuides';

export default function OfflineMode({ isActive }) {
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    // Play a warning sound sequence using Web Audio API when activated
    if (isActive && !soundPlayed) {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const playBeep = (time, freq, type) => {
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscillator.type = type;
          oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + time);
          
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime + time);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + time + 0.3);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscillator.start(audioCtx.currentTime + time);
          oscillator.stop(audioCtx.currentTime + time + 0.3);
        };

        // Three quick urgent beeps to signify emergency
        playBeep(0, 880, 'square');
        playBeep(0.15, 880, 'square');
        playBeep(0.3, 880, 'square');
        
        setSoundPlayed(true);
      } catch (e) {
        console.warn("Audio playback failed or blocked by browser policy");
      }
    } else if (!isActive) {
      setSoundPlayed(false);
    }
  }, [isActive, soundPlayed]);

  const handleQuickAccess = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#020000] relative selection:bg-red-500/30 font-mono animate-[screenFlicker_0.6s_ease-out_forwards]">
      
      {/* Emergency Flashing Banner */}
      <div className="bg-red-600 text-white font-black uppercase tracking-[0.3em] text-center py-2 text-xs md:text-sm animate-[pulseGlow_1.5s_infinite] shadow-[0_0_25px_rgba(239,68,68,0.9)] relative z-[60] border-b-4 border-red-800 flex items-center justify-center gap-3">
        <ShieldAlert className="w-5 h-5" />
        ALERT: CONNECTION SEVERED • EMERGENCY BACKUP PROTOCOL ENGAGED
        <ShieldAlert className="w-5 h-5" />
      </div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* Intense pulsing red background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-red-700/10 rounded-full blur-[150px] animate-pulse-glow mix-blend-screen"></div>
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-red-950/40 to-transparent"></div>
      </div>

      {/* Sticky Quick Access Navbar */}
      <div className="sticky top-0 z-40 bg-[#050000]/95 backdrop-blur-md border-b-2 border-red-600/50 p-3 md:p-4 shadow-[0_4px_20px_rgba(239,68,68,0.2)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <Terminal className="w-4 h-4" /> EMERGENCY_LINK
          </div>
          <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto px-1">
            {offlineGuides.map(g => (
              <button 
                key={g.id} 
                onClick={() => handleQuickAccess(g.id)} 
                className="px-3 py-2 md:px-4 md:py-2.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-sm flex items-center gap-1.5 md:gap-2 whitespace-nowrap transition-all shrink-0 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              >
                <Crosshair className="w-3 h-3 md:w-4 md:h-4" /> {g.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-10 pb-24">
        
        {/* Header / Banner */}
        <div className="flex flex-col items-center text-center mb-16 animate-slide-up">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-600/40 blur-2xl rounded-full animate-pulse-glow"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#0a0000] border-2 border-red-500 rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <WifiOff className="w-12 h-12 md:w-16 md:h-16 text-red-500 animate-pulse" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-500 bg-red-500/20 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(239,68,68,0.3)] rounded-sm">
            <ShieldAlert className="w-4 h-4" />
            SYS_OVERRIDE // EMERGENCY_BACKUP_PROTOCOL
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            EMERGENCY BACKUP <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">PROTOCOL</span>
          </h1>
          <p className="text-sm md:text-base text-red-200/60 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide uppercase">
            &gt; CONNECTION_SEVERED. LOCAL_CACHE_ACCESSED.<br />
            &gt; EMERGENCY BACKUP PROTOCOL ACTIVE. FOLLOW INSTRUCTIONS PRECISELY.
          </p>
        </div>

        {/* Categorized Emergency Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {offlineGuides.map((guide, index) => {
            const isCritical = guide.severity === 'Critical';
            
            return (
              <div 
                key={index} 
                id={guide.id}
                className={`p-6 md:p-8 border-2 rounded-sm ${isCritical ? 'border-red-500 bg-[#120000] shadow-[0_0_25px_rgba(239,68,68,0.15)]' : 'border-orange-500/50 bg-[#0a0200]'} relative overflow-hidden flex flex-col transition-all duration-300 hover:border-white/50 scroll-mt-24`}
              >
                {/* Tactical Corner Accents */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isCritical ? 'border-red-500' : 'border-orange-500'}`}></div>
                <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isCritical ? 'border-red-500' : 'border-orange-500'}`}></div>
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isCritical ? 'border-red-500' : 'border-orange-500'}`}></div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isCritical ? 'border-red-500' : 'border-orange-500'}`}></div>

                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] pointer-events-none ${isCritical ? 'bg-red-600/10' : 'bg-orange-600/10'}`}></div>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10 gap-4">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">{guide.title}</h2>
                  <div className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 shrink-0 rounded-sm ${isCritical ? 'bg-red-500/20 text-red-400 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-orange-500/20 text-orange-400 border-orange-500'}`}>
                    {isCritical ? <AlertOctagon className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    LVL: {guide.severity}
                  </div>
                </div>

                {/* Symptoms */}
                <div className="mb-8 relative z-10">
                  <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <HeartPulse className="w-3.5 h-3.5" /> IDENTIFIERS
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {guide.symptoms.map((sym, i) => (
                      <li key={i} className="text-xs md:text-sm text-slate-300 font-medium uppercase tracking-wide">
                        {sym}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions & Avoid Grid */}
                <div className="grid grid-cols-1 gap-4 mt-auto relative z-10">
                  <div className="bg-[#1a0000] border border-red-500/50 rounded-sm p-4 md:p-5">
                    <h4 className="text-red-500 font-bold mb-4 flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                      <Activity className="w-4 h-4" /> EXECUTE_IMMEDIATELY
                    </h4>
                    <ul className="space-y-3">
                      {guide.actions.map((action, i) => (
                        <li key={i} className="flex gap-3 text-red-100 text-sm md:text-base font-bold tracking-tight">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {guide.avoid && guide.avoid.length > 0 && (
                    <div className="bg-[#150500] border border-orange-500/50 rounded-sm p-4 md:p-5">
                      <h4 className="text-orange-500 font-bold mb-4 flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                        <AlertTriangle className="w-4 h-4" /> RESTRICTED_ACTIONS
                      </h4>
                      <ul className="space-y-3">
                        {guide.avoid.map((avoid, i) => (
                          <li key={i} className="flex gap-3 text-orange-100 text-sm md:text-base font-bold tracking-tight">
                            <AlertOctagon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
