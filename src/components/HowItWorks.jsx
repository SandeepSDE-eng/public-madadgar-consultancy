import React from 'react';
import { Search, FileCheck, UserCheck, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HowItWorks() {
  const { setCurrentPage, language } = useApp();

  const steps = [
    {
      num: "01",
      icon: Search,
      title: language === 'hi' ? 'समाधान खोजें' : 'Discover Your Solution',
      desc: language === 'hi'
        ? '21+ श्रेणियों में अपनी आवश्यकता (टैक्स, वकील, यूपी सरकारी खतौनी, आय/जाति, लोन) खोजें।'
        : 'Browse 21+ categories or search your specific requirement (Tax, Legal, Govt, Property, IT, Products).'
    },
    {
      num: "02",
      icon: FileCheck,
      title: language === 'hi' ? 'विवरण व दस्तावेज़ दें' : 'Submit Details & Docs',
      desc: language === 'hi'
        ? 'अपनी प्राथमिकताएं भरें, समय स्लॉट चुनें और आवश्यक दस्तावेज़ सुरक्षित रूप से संलग्न करें।'
        : 'Fill in your preferences, select preferred slot, and upload required documents securely.'
    },
    {
      num: "03",
      icon: UserCheck,
      title: language === 'hi' ? 'सत्यापित विशेषज्ञ नियुक्त' : 'Verified Expert Assigned',
      desc: language === 'hi'
        ? 'एडमिन द्वारा बैकग्राउंड सत्यापित सीए, वकील या अधिकृत मदद केंद्र आपके अनुरोध को स्वीकार करता है।'
        : 'An admin-verified background-checked expert or certified partner takes up your request.'
    },
    {
      num: "04",
      icon: Award,
      title: language === 'hi' ? 'सुरक्षित व आसान समाधान' : 'Hassle-Free Resolution',
      desc: language === 'hi'
        ? 'सेवा समय पर पूरी होती है, दस्तावेज़ आपको प्राप्त होते हैं और आपकी राशि शत-प्रतिशत सुरक्षित रहती है।'
        : 'Service is delivered cleanly, documents delivered, and platform protects your payment until completion.'
    }
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {language === 'hi' ? 'सरल 4-चरण प्रक्रिया' : 'Simple 4-Step Process'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            {language === 'hi' ? 'पब्लिक मददगार कैसे काम करता है' : 'How Public Madadgar Works'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 font-medium">
            {language === 'hi'
              ? 'नागरिकों, व्यापारियों व सेवा प्रदाताओं के लिए पारदर्शी और शत-प्रतिशत सुरक्षित डिजिटल प्रक्रिया।'
              : 'Transparent, digital, and end-to-end protected workflow for customers & business providers.'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group glass-panel-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-slate-400 transition-colors">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {s.title}
                </h3>

                <p className="text-slate-600 text-xs mt-2 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
