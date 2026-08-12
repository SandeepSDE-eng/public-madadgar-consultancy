import React from 'react';
import { 
  X, Layers, CheckCircle2, ArrowRight, ShieldCheck, Handshake, PhoneCall, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CategoryDetailModal() {
  const { 
    selectedCategory, setSelectedCategory, 
    servicesList, setSelectedService, 
    setIsMediatorModalOpen, language 
  } = useApp();

  if (!selectedCategory) return null;

  const categoryTitle = language === 'hi' ? (selectedCategory.name_hi || selectedCategory.name) : selectedCategory.name;
  const categoryDesc = language === 'hi' ? (selectedCategory.description_hi || selectedCategory.description) : selectedCategory.description;
  const subcats = language === 'hi' ? (selectedCategory.subcategories_hi || selectedCategory.subcategories) : selectedCategory.subcategories;

  // Filter services under this category
  const categoryServices = servicesList.filter((s) => s.categoryId === selectedCategory.id);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSelectedCategory(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-black border border-sky-200">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            {language === 'hi' ? 'श्रेणी विवरण एवं सेवाएं' : 'Category Inspection & Services'}
          </div>
          <h2 className="text-xl font-black text-slate-900 leading-snug">{categoryTitle}</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{categoryDesc}</p>
        </div>

        {/* Subcategories Tags */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {language === 'hi' ? 'उप-श्रेणियां' : 'Available Subcategories'}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {subcats.map((sub, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200">
                • {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Services under Category */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {language === 'hi' ? 'मुख्य सेवाएं (क्लिक करें जानकारी हेतु)' : 'Available Services (Click for Details)'}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {categoryServices.length > 0 ? (
              categoryServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleServiceClick(srv)}
                  className="p-3 bg-slate-50 hover:bg-sky-50 rounded-2xl border border-slate-200/80 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-sky-700 truncate">
                      {language === 'hi' ? (srv.name_hi || srv.name) : srv.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{srv.location} • ₹{srv.price}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border">
                {language === 'hi' ? 'इस श्रेणी में सभी सेवाएं उपलब्ध हैं। मध्यस्थ से पूछें।' : 'Full customized services available. Connect with Public Mediator.'}
              </p>
            )}
          </div>
        </div>

        {/* Direct Public Mediator Helpline Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsMediatorModalOpen(true);
            }}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Handshake className="w-4 h-4 text-slate-950" />
            <span>{language === 'hi' ? '📞 मध्यस्थ (Mediator) से सीधा मार्गदर्शन लें' : '📞 Ask Public Mediator for Direct Help'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
