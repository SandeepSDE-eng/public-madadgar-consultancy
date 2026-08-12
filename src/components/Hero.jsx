import React, { useState } from 'react';
import { 
  Search, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  MapPin, Scale, Home, Utensils, Wifi, GraduationCap, HeartPulse, Handshake 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AskLawAndNeedModal from './AskLawAndNeedModal';

export default function Hero() {
  const { 
    searchQuery, setSearchQuery, setCurrentPage, 
    setSelectedCategory, categoriesList, language, setIsMediatorModalOpen 
  } = useApp();

  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('services');
    }
  };

  const quickPills = [
    { label: language === 'hi' ? '⚖️ निःशुल्क कानून सलाह' : '⚖️ Free Legal Advice', icon: Scale },
    { label: language === 'hi' ? '🏠 पीजी / हॉस्टल खोज' : '🏠 PG & Hostel Finder', icon: Home },
    { label: language === 'hi' ? '🍲 टिफिन व भोजन सेवा' : '🍲 Tiffin & Food Service', icon: Utensils },
    { label: language === 'hi' ? '📶 ब्रॉडबैंड इंटरनेट' : '📶 Fiber Broadband', icon: Wifi },
    { label: language === 'hi' ? '📜 यूपी खतौनी / आय जाति' : '📜 UP Khatauni & Certificates', icon: ShieldCheck },
    { label: language === 'hi' ? '🏦 KCC व मुद्रा लोन' : '🏦 KCC & MUDRA Loans', icon: Sparkles }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-950 to-slate-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-sky-800/40">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Top Government & Platform Trust Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-900/80 border border-sky-600/60 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-extrabold text-sky-100">
            {language === 'hi' 
              ? 'भारत का भरोसेमंद सार्वजनिक नागरिक मदद केंद्र एवं मध्यस्थ हब' 
              : "India's Trusted Public Citizen Concierge & Mediator Hub"}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {language === 'hi' ? (
            <>
              नागरिक सहायता, <span className="text-amber-400">कानूनी सलाह</span>, पीजी, टिफिन व <span className="text-sky-400">सरकारी सेवाएं</span>
            </>
          ) : (
            <>
              Citizen Help, <span className="text-amber-400">Legal Guidance</span>, PG, Tiffin & <span className="text-sky-400">Govt Services</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-sky-100 max-w-3xl mx-auto font-medium leading-relaxed">
          {language === 'hi'
            ? 'पब्लिक मददगार आपके और वकील, डॉक्टर, हॉस्टल, कैटरर, जन सेवा केंद्र या व्यापारी के बीच सीधा भरोसेमंद मध्यस्थ (Mediator) है। कोई भी सवाल पूछें या सहायता प्राप्त करें।'
            : 'Public Madadgar acts as your direct trusted mediator between citizens, advocates, doctors, hostels, caterers, and vendors. Ask any query or request instant help nationwide.'}
        </p>

        {/* Universal Search Box */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-2xl border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder={
                language === 'hi' 
                  ? 'कानून सलाह, पीजी हॉस्टल, टिफिन, यूपी खतौनी, ITR, लोन या उत्पाद खोजें...' 
                  : 'Search Legal advice, PG Hostel, Tiffin, UP Khatauni, ITR, Loans, Products...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-32 py-3 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-bold focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-1 shadow transition-all hover:scale-105"
            >
              <span>{language === 'hi' ? 'खोजें' : 'Search'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Help Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => setIsAskModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-900/60 hover:bg-sky-800 text-sky-100 hover:text-white border border-sky-700/60 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* Action Banners Grid */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => setIsAskModalOpen(true)}
            className="w-full p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
          >
            <Scale className="w-4 h-4 text-slate-950" />
            <span>{language === 'hi' ? 'निःशुल्क कानून या दैनिक सेवा सवाल पूछें' : 'Ask Free Legal or Daily Need Query'}</span>
          </button>

          <button
            onClick={() => setIsMediatorModalOpen(true)}
            className="w-full p-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 border border-sky-400/40"
          >
            <Handshake className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'डॉक्टर/वकील/विक्रेता सीधा संपर्क' : 'Direct Mediator & Expert Match'}</span>
          </button>
        </div>

      </div>

      {/* Ask Law & Need Modal Integration */}
      <AskLawAndNeedModal isOpen={isAskModalOpen} onClose={() => setIsAskModalOpen(false)} />
    </div>
  );
}
