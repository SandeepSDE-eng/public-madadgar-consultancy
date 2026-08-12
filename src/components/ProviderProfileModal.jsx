import React from 'react';
import { 
  X, ShieldCheck, Star, MapPin, Briefcase, Award, Clock, 
  Phone, Globe, CheckCircle2, ArrowRight, Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProviderProfileModal() {
  const { 
    selectedProvider, isProviderModalOpen, setIsProviderModalOpen, 
    setSelectedService, setIsBookingModalOpen, servicesList 
  } = useApp();

  if (!isProviderModalOpen || !selectedProvider) return null;

  const providerServices = servicesList.filter((s) => s.providerId === selectedProvider.id);

  const handleBookService = (service) => {
    setSelectedService(service);
    setIsProviderModalOpen(false);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Cover Header Banner */}
        <div className="h-36 bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 relative">
          <button
            onClick={() => setIsProviderModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 rounded-full text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content Container */}
        <div className="px-6 pb-6 relative">
          
          {/* Avatar & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={selectedProvider.image}
                  alt={selectedProvider.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
                />
                {selectedProvider.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 shadow-lg" title="Admin Verified">
                    <ShieldCheck className="w-5 h-5 text-slate-950" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{selectedProvider.businessName}</h2>
                  {selectedProvider.badge && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-500/40">
                      {selectedProvider.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium">{selectedProvider.name} • {selectedProvider.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm justify-end">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {selectedProvider.rating} ({selectedProvider.reviewCount} Reviews)
                </div>
                <p className="text-[11px] text-slate-400">{selectedProvider.experienceYears} Years Verified Experience</p>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs my-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Location</span>
                <span className="font-semibold text-slate-200">{selectedProvider.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Working Hours</span>
                <span className="font-semibold text-slate-200">{selectedProvider.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Status</span>
                <span className="font-semibold text-emerald-400">{selectedProvider.availability}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-3 my-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">About Expert</h3>
            <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
              {selectedProvider.about}
            </p>
          </div>

          {/* Qualifications & Certifications */}
          {selectedProvider.qualifications && (
            <div className="space-y-2 my-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualifications & Credentials</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProvider.qualifications.map((q, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs border border-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Offered Services */}
          <div className="space-y-3 my-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Available Services & Consultation</h3>
            
            <div className="space-y-2.5">
              {providerServices.length > 0 ? (
                providerServices.map((srv) => (
                  <div key={srv.id} className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 hover:border-brand-500/50 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{srv.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-white">₹{srv.price}</span>
                        <span className="block text-[10px] text-slate-400">{srv.deliveryTime}</span>
                      </div>

                      <button
                        onClick={() => handleBookService(srv)}
                        className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow transition-all"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                  Direct consultation starting from ₹{selectedProvider.startingPrice}. Click below to request custom service.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
