import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Search, 
  Bot, 
  WifiOff, 
  Languages, 
  Stethoscope,
  ArrowRight,
  Globe,
  Eye
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import OfflineMode from './components/OfflineMode';
import SplashScreen from './components/SplashScreen';
import useOnlineStatus from './hooks/useOnlineStatus';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('landing'); // 'landing' | 'chat'
  const isOnline = useOnlineStatus();
  const [recentSearches, setRecentSearches] = useState([]);
  
  // Voice & Multilingual State
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('healsync_lang') || 'English');
  const [isAccessible, setIsAccessible] = useState(() => localStorage.getItem('healsync_access') === 'true');

  useEffect(() => {
    localStorage.setItem('healsync_lang', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('healsync_access', isAccessible);
    if (isAccessible) {
      document.body.classList.add('accessibility-mode');
    } else {
      document.body.classList.remove('accessibility-mode');
    }
  }, [isAccessible]);

  useEffect(() => {
    try {
      const historyString = localStorage.getItem('healsync_history');
      if (historyString) {
        setRecentSearches(JSON.parse(historyString));
      }
    } catch(e) {}
  }, [view]);

  const handleAnalyze = (queryOverride) => {
    if (queryOverride) setSearchQuery(queryOverride);
    setView('chat');
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Online App Container - fades out when offline or splashing */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          isOnline && !showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none fixed inset-0'
        }`}
      >
        <div className="min-h-[100dvh] relative font-sans selection:bg-cyan-500/30 selection:text-cyan-100 bg-[#03080c] overflow-hidden">
          
          {/* Immersive Floating Background Blurs & Particles */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[140px] animate-float-slow mix-blend-screen"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[150px] animate-float-slow mix-blend-screen" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] bg-red-600/5 rounded-full blur-[120px] animate-float"></div>
            
            {/* Cinematic Soft Particles */}
            <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-cyan-400/40 rounded-full blur-[1px] animate-float"></div>
            <div className="absolute top-[60%] right-[30%] w-3 h-3 bg-blue-400/30 rounded-full blur-[2px] animate-float-delayed"></div>
            <div className="absolute bottom-[20%] left-[40%] w-2 h-2 bg-purple-400/40 rounded-full blur-[1px] animate-float"></div>
            <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-red-400/40 rounded-full blur-[1px] animate-float-delayed"></div>
            <div className="absolute top-[80%] left-[10%] w-2 h-2 bg-cyan-300/30 rounded-full blur-[2px] animate-float-slow"></div>
            
            {/* AI Circuit Flow Lines */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M10,10 L40,10 L60,30 L90,30 M10,90 L40,90 L60,70 L90,70 M50,0 L50,100" stroke="#22d3ee" strokeWidth="1" fill="none" />
                    <circle cx="10" cy="10" r="2" fill="#22d3ee" />
                    <circle cx="90" cy="30" r="2" fill="#22d3ee" />
                    <circle cx="10" cy="90" r="2" fill="#22d3ee" />
                    <circle cx="90" cy="70" r="2" fill="#22d3ee" />
                    <circle cx="50" cy="50" r="2" fill="#22d3ee" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </div>
          </div>

          {view === 'landing' ? (
            <>
              {/* Navbar */}
              <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5 px-4 md:px-6 py-4 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/40 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                    <img src="/logo.png" alt="HealSync Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-50 transition-colors hidden sm:block">HealSync</span>
                  
                  {/* Status Indicator */}
                  <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 shadow-inner">
                    <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`}></span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                      {isOnline ? 'System Online' : 'System Offline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  {/* Language Dropdown */}
                  <div className="relative group/lang hidden md:block z-50">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-semibold">{selectedLanguage}</span>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-32 bg-[#0a1520] border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all shadow-xl">
                      {['English', 'Urdu', 'Hindi'].map(lang => (
                        <button 
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${selectedLanguage === lang ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accessibility Toggle */}
                  <button 
                    onClick={() => setIsAccessible(!isAccessible)}
                    className={`p-2 rounded-full border transition-all ${isAccessible ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                    title="Toggle Accessibility Mode"
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => handleAnalyze()}
                    className="btn-premium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-semibold hover:bg-cyan-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 animate-pulse-glow shrink-0" />
                    <span className="hidden sm:inline">Emergency AI Assistant</span>
                    <span className="sm:hidden">Emergency AI</span>
                  </button>
                </div>
              </nav>

              {/* Main Content */}
              <main className="pt-32 md:pt-40 pb-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10 animate-slide-up">
                
                {/* Live AI Status Panel */}
                <div className="hidden lg:flex absolute top-40 right-8 xl:right-12 flex-col gap-4 z-30 animate-fade-in-up">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-cyan-500" /> Diagnostics
                  </div>
                  
                  <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 w-56 group cursor-default transition-transform hover:-translate-x-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-slate-400 font-medium">AI Core Active</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                        <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider">Online</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 w-56 group cursor-default transition-transform hover:-translate-x-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-slate-400 font-medium">Emergency Net</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Secured</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 w-56 group cursor-default transition-transform hover:-translate-x-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]">
                      <Languages className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-slate-400 font-medium">Voice System</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 w-56 group cursor-default transition-transform hover:-translate-x-1 border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.2)] scale-[1.02] bg-[#1a0505]/40 backdrop-blur-3xl">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      <WifiOff className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-red-100 font-semibold">Offline Backup</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]"></div>
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Active & Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Section */}
                <section className="flex flex-col items-center text-center mb-32 relative">
                  
                  {/* Animated Heartbeat Line SVG */}
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none opacity-20 z-0">
                    <svg width="800" height="200" viewBox="0 0 800 200" className="stroke-cyan-500">
                      <path 
                        d="M 0 100 L 300 100 L 330 50 L 370 180 L 400 20 L 430 100 L 800 100" 
                        fill="none" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="100"
                        className="animate-draw-line"
                      />
                    </svg>
                  </div>
                  
                  {/* Floating Icons */}
                  <div className="absolute top-10 left-[5%] lg:left-[15%] text-cyan-400/60 animate-float hidden md:flex items-center justify-center w-20 h-20 glass-card rounded-full border-cyan-500/20 z-10">
                    <Activity className="w-10 h-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  </div>
                  <div className="absolute top-24 right-[5%] lg:right-[15%] text-red-400/60 animate-float-delayed hidden md:flex items-center justify-center w-16 h-16 glass-card rounded-full border-red-500/20 z-10">
                    <Bot className="w-8 h-8 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>

                  {/* Hero Content */}
                  <div className="relative z-20 flex flex-col items-center w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 text-cyan-300 text-sm font-medium mb-8">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      AI Healthcare Intelligence 2.0
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 max-w-5xl leading-[1.1] pb-2">
                      Emergency Healthcare Guidance <br className="hidden md:block" />
                      <span className="text-gradient">When connectivity fails.</span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed">
                      Built for situations where medical help is out of reach.
                    </p>

                    {/* Hero Call-To-Action Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <button 
                        onClick={() => handleAnalyze()}
                        className="btn-premium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 px-6 py-3.5 rounded-full text-base font-semibold hover:bg-cyan-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] flex items-center gap-3 group w-full sm:w-auto justify-center"
                      >
                        <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Try Emergency AI Assistant
                      </button>
                      
                      <button 
                        onClick={() => { window.dispatchEvent(new Event('offline')) }}
                        className="btn-premium bg-[#1a0505]/60 text-slate-300 border border-red-500/20 hover:border-red-500/50 hover:text-red-300 px-6 py-3.5 rounded-full text-base font-semibold hover:bg-red-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.05)] hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] flex items-center gap-3 group w-full sm:w-auto justify-center"
                      >
                        <WifiOff className="w-5 h-5 text-red-500/70 group-hover:text-red-400 transition-colors" />
                        View Emergency Backup Protocol
                      </button>
                    </div>

                    {/* Premium Emergency Search Bar */}
                    <div className="w-full max-w-3xl relative animate-glow rounded-full group">
                      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all duration-500"></div>
                      <div className="relative flex flex-col sm:flex-row items-center bg-[#0a1520]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-full p-2 group-hover:border-cyan-500/40 transition-colors duration-500 shadow-2xl gap-2">
                        <div className="hidden sm:block pl-6 pr-4">
                          <Search className="h-6 w-6 text-cyan-400/70" />
                        </div>
                        <input
                          type="text"
                          className="flex-1 w-full bg-transparent text-lg md:text-xl py-3 sm:py-4 px-4 sm:px-0 focus:outline-none placeholder-slate-500 text-white font-medium"
                          placeholder="Describe emergency or symptoms..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAnalyze() }}
                        />
                        <button 
                          onClick={() => handleAnalyze()}
                          className="w-full sm:w-auto btn-premium bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3 sm:py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 sm:mr-1"
                        >
                          Analyze
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Feature Statistics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl mt-12 mb-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors border-white/5 hover:border-blue-500/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        <Languages className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-3 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Multilingual Support</span>
                      </div>
                      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors border-white/5 hover:border-green-500/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                        <Bot className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-3 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Voice Enabled</span>
                      </div>
                      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-[#1a0505]/40 transition-colors border-red-500/10 hover:border-red-500/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-red-500/5 blur-xl group-hover:bg-red-500/10 transition-colors"></div>
                        <WifiOff className="w-6 h-6 md:w-8 md:h-8 text-red-500 mb-3 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-transform relative z-10" />
                        <span className="text-xs md:text-sm font-bold text-red-100 group-hover:text-white transition-colors relative z-10">Offline Ready</span>
                      </div>
                      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors border-white/5 hover:border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        <Activity className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Emergency AI</span>
                      </div>
                    </div>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="w-full max-w-3xl mt-12 flex flex-col items-center animate-slide-up" style={{animationDelay: '150ms'}}>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">Emergency Activity Log</span>
                        <div className="flex flex-wrap justify-center gap-3">
                          {recentSearches.map((search, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnalyze(search.query)}
                              className="px-5 py-2 text-sm bg-[#040f1a]/80 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-900/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-full transition-all flex items-center gap-2.5 backdrop-blur-md"
                            >
                              <Activity className="w-4 h-4 text-cyan-500" />
                              {search.query.length > 30 ? search.query.substring(0, 30) + '...' : search.query}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Features Grid */}
                <section className="relative z-20">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-100">Intelligent features for critical moments</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    
                    <div className="glass-card glass-card-hover p-8 md:p-10 rounded-[2.5rem] group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
                      <div className="bg-gradient-to-br from-[#0a1a2f] to-[#040f1a] border border-cyan-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                        <Bot className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-cyan-300 transition-colors">Emergency AI Assistant</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Real-time triage and step-by-step first aid instructions powered by advanced medical LLMs tailored for emergency response.
                      </p>
                    </div>

                    <div className="glass-card glass-card-hover p-8 md:p-10 rounded-[2.5rem] group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] group-hover:bg-red-500/20 transition-colors duration-500"></div>
                      <div className="bg-gradient-to-br from-[#2a0e14] to-[#120508] border border-red-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all">
                        <WifiOff className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-red-400 transition-colors">Emergency Backup Protocol</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Crucial guidance available entirely on-device. No internet connection required when seconds matter most.
                      </p>
                    </div>

                    <div className="glass-card glass-card-hover p-8 md:p-10 rounded-[2.5rem] group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                      <div className="bg-gradient-to-br from-[#0a1a2f] to-[#040f1a] border border-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                        <Languages className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-blue-400 transition-colors">Multilingual Emergency Support</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Speak directly to the AI in English, Urdu, or Hindi. It listens, analyzes, and reads instructions back to you aloud.
                      </p>
                    </div>

                    <div className="glass-card glass-card-hover p-8 md:p-10 rounded-[2.5rem] group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
                      <div className="bg-gradient-to-br from-[#0a1a2f] to-[#040f1a] border border-cyan-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                        <Stethoscope className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-cyan-300 transition-colors">Voice Emergency Access</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Intelligent diagnostic assistance that evaluates symptoms and suggests immediate action plans before professional help arrives.
                      </p>
                    </div>

                  </div>
                </section>

                {/* Future Vision Section */}
                <section className="relative z-20 mt-32 mb-16 animate-slide-up">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold mb-6 uppercase tracking-widest">
                      Roadmap 2026
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-100">The future of emergency response</h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg font-light">HealSync is rapidly evolving to support even the most extreme conditions. Here is a glimpse into our upcoming integrations.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-purple-500/30 transition-colors group cursor-default">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <Activity className="w-7 h-7 text-purple-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Wearable Integration</h4>
                      <p className="text-slate-400 leading-relaxed font-light">Direct syncing with smartwatches for real-time vitals monitoring during active emergencies.</p>
                    </div>
                    {/* Card 2 */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-blue-500/30 transition-colors group cursor-default">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <Globe className="w-7 h-7 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Satellite Support</h4>
                      <p className="text-slate-400 leading-relaxed font-light">Direct satellite SOS integration for zero-connectivity zones, transmitting symptoms directly to EMS.</p>
                    </div>
                    {/* Card 3 */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-red-500/30 transition-colors group cursor-default">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                        <ShieldAlert className="w-7 h-7 text-red-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Disaster Relief Mesh</h4>
                      <p className="text-slate-400 leading-relaxed font-light">Mesh network capabilities allowing HealSync users to share offline guides during natural disasters.</p>
                    </div>
                  </div>
                </section>

              </main>
              
              {/* Footer */}
              <footer className="relative z-10 border-t border-white/5 bg-[#03080c]/80 backdrop-blur-xl py-10 mt-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col gap-2 items-center md:items-start opacity-70">
                    <div className="flex items-center gap-2">
                      <img src="/logo.png" alt="HealSync Logo" className="w-6 h-6 rounded-full grayscale opacity-80" />
                      <span className="font-bold tracking-wide text-white">HealSync</span>
                    </div>
                    <p className="text-slate-500 text-xs font-medium">Emergency healthcare guidance when connectivity fails.</p>
                  </div>
                  <div className="flex flex-col gap-2 items-center md:items-end">
                    <p className="text-slate-500 text-sm font-light text-center md:text-right max-w-sm">
                      &copy; {new Date().getFullYear()} HealSync Technologies. <br className="hidden md:block"/>
                      HealSync provides assistive emergency guidance and is not a replacement for professional medical care.
                    </p>
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <ChatInterface 
              initialQuery={searchQuery} 
              onBack={() => {
                setSearchQuery('');
                setView('landing');
              }} 
              selectedLanguage={selectedLanguage}
            />
          )}
        </div>
      </div>

      {/* Offline Mode Overlay - slides up and fades in */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-1000 ease-out transform overflow-y-auto overflow-x-hidden bg-[#020000] ${
          !isOnline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <OfflineMode isActive={!isOnline} />
      </div>
    </>
  );
}

export default App;
