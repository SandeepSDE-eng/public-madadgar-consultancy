import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function FAQSection() {
  const { language } = useApp();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold text-sky-800 uppercase tracking-widest bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {language === 'hi' ? 'आपके सवाल, हमारे जवाब' : "Got Questions? We've Got Answers"}
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const qText = language === 'hi' ? (faq.question_hi || faq.question) : faq.question;
            const aText = language === 'hi' ? (faq.answer_hi || faq.answer) : faq.answer;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-sky-700 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                    {qText}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3.5 font-medium bg-slate-50/50">
                    {aText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
