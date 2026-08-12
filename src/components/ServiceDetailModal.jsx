import React from 'react';
import { 
  X, CheckCircle2, Clock, MapPin, ShieldCheck, Star, 
  ArrowRight, FileText, HelpCircle, PhoneCall, Sparkles, Handshake 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServiceDetailModal() {
  const { 
    selectedService, setSelectedService, 
    setIsBookingModalOpen, setIsMediatorModalOpen, language, providersList 
  } = useApp();

  if (!selectedService) return null;

  const provider = providersList.find((p) => p.id === selectedService.providerId);

  const title = language === 'hi' ? (selectedService.name_hi || selectedService.name) : selectedService.name;
  const desc = language === 'hi' ? (selectedService.description_hi || selectedService.description) : selectedService.description;
  const includedList = language === 'hi' ? (selectedService.included_hi || selectedService.included) : selectedService.included;

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleMediatorHelp = () => {
    setIsMediatorModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedService(null)}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
              {selectedService.location}
            </span>
            <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              {selectedService.rating} ({selectedService.reviewCount})
            </span>
          </div>

          <h2 className="text-lg font-black text-slate-900 leading-snug">{title}</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{desc}</p>
        </div>

        {/* Pricing & Time Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold block">
              {language === 'hi' ? 'कुल सेवा शुल्क' : 'Total Service Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">₹{selectedService.price.toLocaleString()}</span>
              {selectedService.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{selectedService.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-bold block">
              {language === 'hi' ? 'अनुमानित समय' : 'Estimated Time'}
            </span>
            <span className="text-xs font-extrabold text-sky-700 flex items-center gap-1 justify-end">
              <Clock className="w-3.5 h-3.5" /> {selectedService.deliveryTime}
            </span>
          </div>
        </div>

        {/* What's Included */}
        {includedList && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'hi' ? 'शामिल विशेषताएं एवं लाभ' : "What's Included"}
            </h3>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              {includedList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assigned Provider Detail Box */}
        {provider && (
          <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-200 flex items-center gap-3">
            <img src={provider.image} alt={provider.name} className="w-10 h-10 rounded-xl object-cover border border-sky-300" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-sky-800 block">
                {language === 'hi' ? 'सत्यापित विशेषज्ञ प्रदाता' : 'Verified Expert Provider'}
              </span>
              <h4 className="text-xs font-extrabold text-slate-900 truncate">{provider.businessName}</h4>
              <p className="text-[10px] text-slate-500 font-medium">{provider.name} • {provider.city}</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>
        )}

        {/* Action Buttons: Book vs Ask Mediator */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleMediatorHelp}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Handshake className="w-4 h-4 text-slate-950" />
            <span>{language === 'hi' ? 'मध्यस्थ सहायता (Call)' : 'Ask Mediator Help'}</span>
          </button>

          <button
            onClick={handleBookNow}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow shadow-sky-600/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'अनुरोध दर्ज करें' : 'Proceed to Request'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
