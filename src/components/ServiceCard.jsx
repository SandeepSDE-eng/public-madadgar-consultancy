import React from 'react';
import { Star, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServiceCard({ service }) {
  const { setSelectedService, setIsBookingModalOpen, language } = useApp();

  const handleInspect = () => {
    setSelectedService(service);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const title = language === 'hi' ? (service.name_hi || service.name) : service.name;
  const desc = language === 'hi' ? (service.description_hi || service.description) : service.description;
  const includedList = language === 'hi' ? (service.included_hi || service.included) : service.included;

  return (
    <div
      onClick={handleInspect}
      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm glass-panel-hover flex flex-col justify-between h-full cursor-pointer group"
    >
      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            {service.location}
          </span>
          <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            {service.rating} ({service.reviewCount})
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed font-medium">
          {desc}
        </p>

        {/* Included List Bullet Points */}
        {includedList && (
          <div className="mt-3 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            {includedList.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details & Pricing */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">₹{service.price.toLocaleString()}</span>
            {service.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{service.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> {service.deliveryTime}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleInspect}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 border border-slate-200"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
          </button>
          
          <button
            onClick={handleBookNow}
            className="px-3.5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-md shadow-sky-600/20 transition-all hover:scale-105 shrink-0"
          >
            <span>{language === 'hi' ? 'अनुरोध करें' : 'Request'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
