import React from 'react';
import { 
  X, Star, ShieldCheck, MapPin, Briefcase, Award, 
  Clock, PhoneCall, CheckCircle2, Handshake, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProviderProfileModal() {
  const { 
    selectedProvider, setSelectedProvider, 
    isProviderModalOpen, setIsProviderModalOpen, 
    setIsBookingModalOpen, setIsMediatorModalOpen,
    setSelectedService, servicesList, language 
  } = useApp();

  if (!isProviderModalOpen || !selectedProvider) return null;

  const handleBookWithProvider = () => {
    const firstService = servicesList.find((s) => s.providerId === selectedProvider.id) || {
      id: `srv-generic-${selectedProvider.id}`,
      name: `Consultation with ${selectedProvider.businessName}`,
      price: selectedProvider.startingPrice,
      category: selectedProvider.category,
      providerId: selectedProvider.id
    };
    setSelectedService(firstService);
    setIsProviderModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleMediatorConnect = () => {
    setIsProviderModalOpen(false);
    setIsMediatorModalOpen(true);
  };

  const aboutText = language === 'hi' ? (selectedProvider.about_hi || selectedProvider.about) : selectedProvider.about;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => setIsProviderModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-start gap-4 pr-8">
          <div className="relative shrink-0">
            <img
              src={selectedProvider.image}
              alt={selectedProvider.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
            />
            {selectedProvider.verified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1">
              {selectedProvider.category}
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-snug">{selectedProvider.businessName}</h2>
            <p className="text-xs text-slate-500 font-medium">{selectedProvider.name} • {selectedProvider.city}, {selectedProvider.state}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">{language === 'hi' ? 'अनुभव' : 'Experience'}</span>
            <span className="font-extrabold text-slate-900">{selectedProvider.experienceYears} {language === 'hi' ? 'वर्ष' : 'Years'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">{language === 'hi' ? 'रेटिंग' : 'Rating'}</span>
            <span className="font-extrabold text-amber-600 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {selectedProvider.rating}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">{language === 'hi' ? 'शुरुआती फीस' : 'Starting Price'}</span>
            <span className="font-extrabold text-emerald-600">₹{selectedProvider.startingPrice}</span>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{language === 'hi' ? 'विवरण एवं परिचय' : 'About Expert'}</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            {aboutText}
          </p>
        </div>

        {/* Qualifications */}
        {selectedProvider.qualifications && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{language === 'hi' ? 'प्रमाणपत्र एवं योग्यता' : 'Qualifications'}</h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedProvider.qualifications.map((q, idx) => (
                <span key={idx} className="px-2 py-1 bg-sky-50 text-sky-800 rounded-lg text-xs font-bold border border-sky-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" /> {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Book vs Connect via Mediator */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleMediatorConnect}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Handshake className="w-4 h-4 text-slate-950" />
            <span>{language === 'hi' ? 'मध्यस्थ सहायता (Mediator)' : 'Connect via Mediator'}</span>
          </button>

          <button
            onClick={handleBookWithProvider}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow shadow-sky-600/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'सीधा अपॉइंटमेंट लें' : 'Book Appointment'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
