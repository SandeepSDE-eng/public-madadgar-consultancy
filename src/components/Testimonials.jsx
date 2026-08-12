import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Testimonials() {
  const { language } = useApp();

  const reviews = [
    {
      name: "Suresh Gupta",
      name_hi: "सुरेश गुप्ता",
      location: "New Delhi",
      location_hi: "नई दिल्ली",
      category: "Tax & Accounting",
      category_hi: "टैक्स व अकाउंटिंग",
      comment: "I filed my ITR through Public Madadgar Consultancy. The assigned CA Rajesh Verma handled capital gains tax calculations flawlessly. Got tax refund in 5 days!",
      comment_hi: "मैंने पब्लिक मददगार कंसल्टेंसी के माध्यम से अपना आईटीआर दाखिल किया। सीए राजेश वर्मा ने पूंजीगत लाभ कर की गणना त्रुटिरहित ढंग से संभाली। 5 दिनों में टैक्स रिफंड प्राप्त हुआ!",
      rating: 5
    },
    {
      name: "Ananya Deshmukh",
      name_hi: "अनन्या देशमुख",
      location: "Mumbai",
      location_hi: "मुंबई",
      category: "Property Legal",
      category_hi: "संपत्ति व कानूनी सलाह",
      comment: "Saved me from purchasing a disputed flat in Thane. The 13-year legal search report delivered by advocate Vikramaditya revealed a pending bank mortgage.",
      comment_hi: "ठाणे में विवादित फ्लैट खरीदने से मुझे बचाया। अधिवक्ता विक्रमादित्य द्वारा प्रदान की गई 13 वर्षीय कानूनी खोज रिपोर्ट से लंबित बैंक बंधक का खुलासा हुआ।",
      rating: 5
    },
    {
      name: "Dr. Vikram Singh",
      name_hi: "डॉ. विक्रम सिंह",
      location: "Lucknow",
      location_hi: "लखनऊ (यूपी)",
      category: "UP & Govt Services",
      category_hi: "यूपी व सरकारी सेवाएं",
      comment: "Needed urgent Tatkal passport appointment for a medical conference. The team completed the PSK application and slot booking in under 30 minutes!",
      comment_hi: "मेडिकल कॉन्फ्रेंस के लिए तत्काल पासपोर्ट अपॉइंटमेंट की तत्काल आवश्यकता थी। टीम ने 30 मिनट में आवेदन और स्लॉट बुकिंग पूरी की!",
      rating: 5
    }
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
            {language === 'hi' ? 'सत्यापित नागरिक कहानियां' : 'Verified Customer Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {language === 'hi'
              ? 'पूरे भारत एवं यूपी के 50,000+ नागरिकों का भरोसा'
              : 'Trusted by Over 50,000+ Citizens Across India'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => {
            const authorName = language === 'hi' ? r.name_hi : r.name;
            const authorLoc = language === 'hi' ? r.location_hi : r.location;
            const catLabel = language === 'hi' ? r.category_hi : r.category;
            const commentText = language === 'hi' ? r.comment_hi : r.comment;

            return (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(r.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                      {catLabel}
                    </span>
                  </div>

                  <Quote className="w-6 h-6 text-slate-300 mb-2" />
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic font-medium">
                    "{commentText}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{authorName}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold">{authorLoc}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {language === 'hi' ? 'सत्यापित ऑर्डर' : 'Verified Order'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
