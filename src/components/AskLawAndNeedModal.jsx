import React, { useState } from 'react';
import { 
  X, Scale, Home, Utensils, Wifi, GraduationCap, HeartPulse, 
  Send, ShieldCheck, Sparkles, CheckCircle2, PhoneCall, HelpCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AskLawAndNeedModal({ isOpen, onClose }) {
  const { submitServiceRequest, showToast, language } = useApp();

  const [needCategory, setNeedCategory] = useState('law');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'New Delhi / UP',
    question: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const catLabels = {
      law: 'Legal Advisory & Lawyer Match',
      pg: 'PG, Hostel & Rental Housing',
      food: 'Food, Tiffin & Catering',
      telecom: 'Telecom, Fiber & Broadband',
      education: 'Education & Admissions',
      medical: 'Health & Hospitals'
    };

    submitServiceRequest({
      serviceName: `Citizen Query (${catLabels[needCategory]})`,
      providerName: 'Public Madadgar Direct Helpline Mediator',
      price: 0,
      category: catLabels[needCategory],
      customerDetails: formData,
      notes: formData.question
    });

    setSubmitted(true);
    showToast(language === 'hi' ? 'आपका सवाल जमा हो गया! हमारी टीम आपको 15 मिनट में कॉल करेगी।' : 'Your query submitted! Our concierge team will call in 15 mins.');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-extrabold border border-sky-200">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            {language === 'hi' ? 'सार्वजनिक नागरिक सहायता केंद्र' : 'All-In-One Public Citizen Helpline'}
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-snug">
            {language === 'hi'
              ? 'कानून, पीजी, टिफिन, इंटरनेट या शिक्षा का सवाल पूछें'
              : 'Ask Law, PG, Food, Broadband or Education Query'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {language === 'hi'
              ? 'बेसिक जानकारी लें और सीधे वकील, हॉस्टल मालिक, कैटरर या विशेषज्ञ से मुफ़्त जुड़ें।'
              : 'Get basic details explained and match directly with certified advocates, hostel owners, caterers or experts.'}
          </p>
        </div>

        {/* Category Pills Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-[11px] font-extrabold">
          {[
            { id: 'law', label: language === 'hi' ? '⚖️ कानून सलाह' : '⚖️ Free Law', icon: Scale },
            { id: 'pg', label: language === 'hi' ? '🏠 पीजी / हॉस्टल' : '🏠 PG / Hostel', icon: Home },
            { id: 'food', label: language === 'hi' ? '🍲 टिफिन / खाना' : '🍲 Food/Tiffin', icon: Utensils },
            { id: 'telecom', label: language === 'hi' ? '📶 ब्रॉडबैंड' : '📶 Fiber Broadband', icon: Wifi },
            { id: 'education', label: language === 'hi' ? '🎓 शिक्षा प्रवेश' : '🎓 Education', icon: GraduationCap },
            { id: 'medical', label: language === 'hi' ? '🏥 अस्पताल' : '🏥 Medical', icon: HeartPulse }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setNeedCategory(cat.id)}
              className={`py-2 px-1 rounded-xl transition-all text-center truncate ${
                needCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-sm font-black'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'सवाल दर्ज हो गया!' : 'Query Submitted Successfully!'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'hi' ? 'पब्लिक मददगार टीम आपसे संपर्क करके समाधान प्रदान करेगी।' : 'Our helpline team is calling you shortly to guide you.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'आपका नाम *' : 'Your Name *'}</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'शहर / जिला' : 'City / District'}</label>
              <input
                type="text"
                placeholder="Lucknow / Delhi / Patna"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'आपकी आवश्यकता या सवाल *' : 'Your Question or Help Needed *'}</label>
              <textarea
                rows="3"
                required
                placeholder={
                  needCategory === 'law'
                    ? (language === 'hi' ? 'कानून से जुड़ा सवाल लिखें (जैसे- जमीन विवाद, एफआईआर, लीगल नोटिस)...' : 'Ask legal query (e.g. Property partition law, FIR guidance)...')
                    : needCategory === 'pg'
                    ? (language === 'hi' ? 'पीजी या हॉस्टल आवश्यकता लिखें (जैसे- बॉय्स पीजी लखनऊ वाईफाई सहित)...' : 'Describe PG requirement (e.g. Boys PG in Lucknow with food)...')
                    : (language === 'hi' ? 'अपनी आवश्यकता लिखें...' : 'Describe what help or guidance you need...')
                }
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{language === 'hi' ? 'मुफ़्त सवाल पूछें एवं विशेषज्ञ से जुड़ें' : 'Submit Query & Connect to Expert'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
