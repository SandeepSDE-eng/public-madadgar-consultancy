import React from 'react';
import { 
  GraduationCap, HeartPulse, Briefcase, Compass, Building2, 
  Calculator, Megaphone, Users, Brain, Home, Scale, Coins, 
  ShieldCheck, Laptop, Code, FileText, Landmark, UserCheck, 
  BookOpen, ShoppingBag, Layers, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CategoryGrid({ limit }) {
  const { categoriesList, setSelectedCategory, setCurrentPage, language } = useApp();

  const iconMap = {
    "GraduationCap": GraduationCap,
    "HeartPulse": HeartPulse,
    "Briefcase": Briefcase,
    "Compass": Compass,
    "Building2": Building2,
    "Calculator": Calculator,
    "Megaphone": Megaphone,
    "Users": Users,
    "Brain": Brain,
    "Home": Home,
    "Scale": Scale,
    "Coins": Coins,
    "ShieldCheck": ShieldCheck,
    "Laptop": Laptop,
    "Code": Code,
    "FileText": FileText,
    "Landmark": Landmark,
    "UserCheck": UserCheck,
    "BookOpen": BookOpen,
    "ShoppingBag": ShoppingBag,
    "Layers": Layers
  };

  const displayedCategories = limit ? categoriesList.slice(0, limit) : categoriesList;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage('services');
  };

  return (
    <section className="py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4 text-sky-600" /> 
              {language === 'hi' ? 'बहु-क्षेत्रीय समाधान' : 'Multi-Domain Solutions'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {language === 'hi' ? '21+ मुख्य सेवा श्रेणियां देखें' : 'Explore 21+ Core Service Categories'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              {language === 'hi'
                ? 'प्रत्येक क्षेत्र के लिए सत्यापित विशेषज्ञ, सरकारी मदद और ऑनलाइन सामग्री प्राप्त करें।'
                : 'Find verified experts, certified advisory, and online products across every domain.'}
            </p>
          </div>

          {limit && (
            <button
              onClick={() => setCurrentPage('services')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 group shrink-0"
            >
              <span>{language === 'hi' ? 'सभी 21 श्रेणियां देखें' : 'View All 21 Categories'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* 21 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Layers;
            const categoryTitle = language === 'hi' ? (cat.name_hi || cat.name) : cat.name;
            const categoryDesc = language === 'hi' ? (cat.description_hi || cat.description) : cat.description;
            const subcats = language === 'hi' ? (cat.subcategories_hi || cat.subcategories) : cat.subcategories;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm glass-panel-hover cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {cat.featuredCount}+ {language === 'hi' ? 'सेवाएं' : 'Services'}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                    {categoryTitle}
                  </h3>

                  <p className="text-slate-500 text-[11px] mt-1.5 line-clamp-2 leading-relaxed font-medium">
                    {categoryDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {subcats.slice(0, 2).map((sub) => (
                    <span key={sub} className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {sub}
                    </span>
                  ))}
                  {subcats.length > 2 && (
                    <span className="text-[10px] text-sky-700 font-bold px-1 py-0.5">
                      +{subcats.length - 2} {language === 'hi' ? 'और' : 'more'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
