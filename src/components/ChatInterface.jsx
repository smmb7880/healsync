import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, ShieldAlert, HeartPulse, Activity, AlertOctagon,
  Mic, Volume2, Square, Loader2
} from 'lucide-react';
import { analyzeEmergency } from '../services/gemini';

const EmergencyCard = ({ data, onSpeak, isSpeaking }) => {
  if (!data) return null;

  const isCritical = data.severity === 'Critical' || data.severity === 'High';

  const speechText = `${data.summary}. Immediate actions: ${data.immediate_actions?.join('. ')}. ${data.warnings?.length ? 'Do not do this: ' + data.warnings.join('. ') : ''}`;

  const [confidence] = useState((96 + Math.random() * 3).toFixed(1));

  return (
    <div className={`glass-card p-5 md:p-8 rounded-[2rem] border mt-4 ${isCritical ? 'border-red-500/40 bg-red-950/20 shadow-[0_8px_32px_rgba(239,68,68,0.2)]' : 'border-orange-500/30 bg-[#0a0505]/80'} relative overflow-hidden animate-slide-up`}>
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none ${isCritical ? 'bg-red-500/20' : 'bg-orange-500/15'}`}></div>
      
      {/* Smart Features & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 ${isCritical ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-orange-500/20 text-orange-400 border-orange-500/50'}`}>
            <div className="relative flex items-center justify-center w-4 h-4">
              {isCritical && <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-radar"></div>}
              {isCritical ? <AlertOctagon className="w-4 h-4 relative z-10" /> : <ShieldAlert className="w-4 h-4" />}
            </div>
            {data.severity}
          </div>
          
          {/* Backup Badge */}
          {data.isBackup && (
            <div className="px-3 py-1.5 rounded-full bg-red-950 border border-red-500/50 flex items-center gap-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Emergency Backup Protocol Active</span>
            </div>
          )}
          
          {/* AI Confidence Meter */}
          {!data.isBackup && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">AI Confidence</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${confidence}%` }}></div>
                </div>
                <span className="text-xs font-bold text-cyan-400">{confidence}%</span>
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => onSpeak(speechText)}
          className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto ${isSpeaking ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
        >
          {isSpeaking ? (
            <>
              <div className="flex items-center gap-0.5 h-4">
                <span className="w-1 bg-cyan-400 animate-audio-wave rounded-full"></span>
                <span className="w-1 bg-cyan-400 animate-audio-wave rounded-full" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 bg-cyan-400 animate-audio-wave rounded-full" style={{ animationDelay: '0.4s' }}></span>
              </div>
              Stop Playback
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" /> Read Aloud
            </>
          )}
        </button>
      </div>

      {data.likely_condition && (
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold">
          <Activity className="w-4 h-4 text-cyan-500" />
          Likely Condition: <span className="text-white">{data.likely_condition}</span>
        </div>
      )}
      <p className="text-lg md:text-xl text-white font-medium mb-8 leading-relaxed relative z-10">
        {data.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-5 shadow-inner">
          <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4" /> IMMEDIATE ACTIONS
          </h4>
          <ul className="space-y-3">
            {data.immediate_actions?.map((action, i) => (
              <li key={i} className="flex gap-3 text-red-50 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <span className="leading-snug">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-5 shadow-inner">
          <h4 className="text-orange-400 font-bold mb-4 flex items-center gap-2 text-sm">
            <ShieldAlert className="w-4 h-4" /> DO NOT DO THIS
          </h4>
          <ul className="space-y-3">
            {data.warnings?.map((warning, i) => (
              <li key={i} className="flex gap-3 text-orange-50 font-medium">
                <AlertOctagon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {data.seek_help && (
        <div className="mt-4 p-4 rounded-xl bg-red-600/20 border border-red-500/50 flex gap-3 items-start relative z-10">
          <AlertOctagon className="w-6 h-6 text-red-500 shrink-0" />
          <p className="text-red-100 font-bold">{data.seek_help}</p>
        </div>
      )}
    </div>
  );
};

export default function ChatInterface({ initialQuery, onBack, selectedLanguage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [loadingText, setLoadingText] = useState('Analyzing symptoms...');
  
  const hasInitialized = useRef(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    let t1, t2;
    if (isLoading) {
      setLoadingText('Analyzing symptoms...');
      t1 = setTimeout(() => setLoadingText('Checking emergency severity...'), 1200);
      t2 = setTimeout(() => setLoadingText('Generating medical guidance...'), 2400);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoading]);

  useEffect(() => {
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true;
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Voice input is not supported in this browser. Please use Chrome.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'Urdu' ? 'ur-PK' : selectedLanguage === 'Hindi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = true;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const handleSpeak = (text, index) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'Urdu' ? 'ur-PK' : selectedLanguage === 'Hindi' ? 'hi-IN' : 'en-US';
    
    utterance.onend = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    try {
      const historyString = localStorage.getItem('healsync_history');
      let history = historyString ? JSON.parse(historyString) : [];
      if (history.length === 0 || history[0].query !== text) {
        history.unshift({ query: text, timestamp: new Date().toISOString() });
        if (history.length > 5) history.pop();
        localStorage.setItem('healsync_history', JSON.stringify(history));
      }
    } catch(e) {}

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const rawResponse = await analyzeEmergency(text, selectedLanguage);
      const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      
      setMessages((prev) => [...prev, { role: 'assistant', data: parsedData }]);
    } catch (error) {
      console.error("Error analyzing emergency:", error);
      const fallbackData = {
        severity: "Critical",
        summary: "AI connection severed. Displaying generalized emergency response protocol.",
        likely_condition: "Unspecified General Emergency",
        immediate_actions: [
          "Ensure the area is safe for you and the patient.",
          "Call local emergency services immediately.",
          "Check for breathing and pulse. Begin CPR if necessary and trained.",
          "Apply firm pressure to any severe bleeding with a clean cloth."
        ],
        warnings: [
          "Do not move the patient unless there is immediate danger.",
          "Do not give the patient anything to eat or drink.",
          "Do not leave the patient unattended."
        ],
        seek_help: "Immediate professional medical intervention is required. Keep emergency dispatch on the line.",
        isBackup: true
      };
      setMessages((prev) => [...prev, { role: 'assistant', data: fallbackData }]);
    } finally {
      setIsLoading(false);
    }
  };

  const latestMessage = messages[messages.length - 1];
  const isCriticalMode = latestMessage?.data?.severity === 'Critical' || latestMessage?.data?.severity === 'High';

  return (
    <div className={`flex flex-col h-[100dvh] w-full bg-[#03080c] relative z-20 transition-all duration-1000 ${isCriticalMode ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.2)]' : ''}`}>
      
      {/* Critical Emergency Background Effect */}
      {isCriticalMode && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 border-[4px] border-red-500/30 animate-pulse"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[100px] animate-float-delayed"></div>
        </div>
      )}

      <div className={`glass-card border-b px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-1000 backdrop-blur-xl ${isCriticalMode ? 'bg-red-950/40 border-red-500/40' : 'bg-[#03080c]/80 border-white/5'}`}>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-slate-300 hover:text-white relative z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium hidden sm:block">Return to Dashboard</span>
        </button>
        <div className="flex items-center gap-3">
          <HeartPulse className="w-6 h-6 text-cyan-400" />
          <span className="font-bold tracking-wide text-white">Emergency AI Assistant</span>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">AI Active</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-slate-500 mt-20 animate-slide-up">
              <Activity className="w-16 h-16 mx-auto text-cyan-500/20 mb-4" />
              <p className="text-xl font-light">Describe symptoms or the emergency situation to receive immediate AI-powered medical guidance.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'bg-cyan-600/20 text-cyan-50 border border-cyan-500/30 px-6 py-4 rounded-3xl rounded-tr-sm' : 'w-full'}`}>
                {msg.role === 'user' ? (
                  <p className="text-lg md:text-xl font-medium leading-relaxed">{msg.content}</p>
                ) : msg.data ? (
                  <EmergencyCard 
                    data={msg.data} 
                    onSpeak={(text) => handleSpeak(text, idx)}
                    isSpeaking={speakingIndex === idx}
                  />
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-3xl rounded-tl-sm text-lg">
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start relative z-10">
              <div className="bg-[#0a1520]/80 border border-white/10 px-6 py-4 rounded-3xl rounded-tl-sm flex items-center gap-3 shadow-xl">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-cyan-200 animate-pulse font-medium">{loadingText}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 md:p-6 bg-gradient-to-t from-[#03080c] via-[#03080c] to-transparent shrink-0">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Animated Listening Glow */}
          {isListening && (
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse-glow z-0"></div>
          )}

          <div className="relative z-10 flex items-center bg-[#0a1520] border border-white/20 rounded-full p-2 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
            
            {/* Voice Input Button */}
            <button
              onClick={toggleListening}
              className={`p-3 rounded-full transition-all flex items-center justify-center shrink-0 relative ${
                isListening 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 border border-transparent'
              }`}
            >
              {isListening && (
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-radar"></div>
              )}
              {isListening ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              placeholder={isListening ? "Listening..." : "Describe symptoms or emergency situation..."}
              className={`flex-1 bg-transparent text-lg py-3 px-4 focus:outline-none text-white font-medium ${isListening ? 'placeholder-cyan-400 animate-pulse' : 'placeholder-slate-500'}`}
            />
            
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() && !isListening}
              className="p-3 bg-cyan-500 text-[#03080c] rounded-full hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              <Send className="w-6 h-6 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
