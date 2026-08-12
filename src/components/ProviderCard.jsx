import React from 'react';
import { Star, ShieldCheck, MapPin, Briefcase, Award, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProviderCard({ provider }) {
  const { setSelectedProvider, setIsProviderModalOpen, setIsBookingModalOpen, setSelectedService, servicesList, language } = useApp();

  const handleViewProfile = () => {
    setSelectedProvider(provider);
    setIsProviderModalOpen(true);
  };

  const handleQuickBook = () => {
    setSelectedProvider(provider);
    const firstService = servicesList.find((s) => s.providerId === provider.id) || {
      id: `srv-generic-${provider.id}`,
      name: `Consultation with ${provider.businessName}`,
      price: provider.startingPrice,
      category: provider.category,
      providerId: provider.id
    };
    setSelectedService(firstService);
    setIsBookingModalOpen(true);
  };

  const aboutText = language === 'hi' ? (provider.about_hi || provider.about) : provider.about;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm glass-panel-hover flex flex-col justify-between h-full">
      <div>
        {/* Header Photo & Verification */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-500/40 shadow-md"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 shadow" title="Admin Verified Provider">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {provider.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {provider.rating}
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900 truncate mt-1 hover:text-sky-700 cursor-pointer" onClick={handleViewProfile}>
              {provider.businessName}
            </h3>

            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate font-medium">
              <User className="w-3 h-3 text-slate-400" /> {provider.name}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] mb-3">
          <div>
            <span className="text-slate-400 block text-[10px]">{language === 'hi' ? 'अनुभव' : 'Experience'}</span>
            <span className="font-bold text-slate-800">{provider.experienceYears} {language === 'hi' ? 'वर्षों का अनुभव' : 'Years Exp'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{language === 'hi' ? 'कार्य क्षेत्र' : 'Service Area'}</span>
            <span className="font-bold text-slate-800 truncate block">{provider.city}</span>
          </div>
        </div>

        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-medium">
          {aboutText}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">{language === 'hi' ? 'शुरुआती शुल्क' : 'Starts from'}</span>
          <span className="text-sm font-black text-emerald-600">₹{provider.startingPrice}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleViewProfile}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all border border-slate-200"
          >
            {language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}
          </button>
          <button
            onClick={handleQuickBook}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all hover:scale-105"
          >
            <span>{language === 'hi' ? 'बुक करें' : 'Book'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
