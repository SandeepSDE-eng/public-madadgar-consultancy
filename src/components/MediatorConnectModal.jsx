import React, { useState } from 'react';
import { X, Handshake, CheckCircle2, Send, PhoneCall, Sparkles, Building2, UserCheck, HeartPulse } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MediatorConnectModal() {
  const { isMediatorModalOpen, setIsMediatorModalOpen, submitServiceRequest, showToast, language } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    connectType: 'doctor-hospital',
    details: '',
    city: 'New Delhi / UP'
  });

  const [paymentStep, setPaymentStep] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isMediatorModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    if (!paymentStep) {
      setPaymentStep(true);
      return;
    }

    if (!utrNumber || utrNumber.length < 12) {
      alert(language === 'hi' ? 'कृपया 12 अंकों का UTR नंबर दर्ज करें।' : 'Please enter a valid 12-digit UTR/Transaction ID.');
      return;
    }

    submitServiceRequest({
      serviceName: `Mediator Concierge: ${formData.connectType}`,
      providerName: 'Public Madadgar Direct Helpline Mediator',
      price: 0,
      category: 'Public Mediator Hub',
      customerDetails: { ...formData, utrNumber },
      notes: formData.details
    });

    setSubmitted(true);
    showToast(language === 'hi' ? 'मध्यस्थ सहायता अनुरोध जमा हो गया! हमारी टीम 15 मिनट में कॉल करेगी।' : 'Mediator match request submitted! Our concierge team will call in 15 mins.');
    
    setTimeout(() => {
      setSubmitted(false);
      setPaymentStep(false);
      setUtrNumber('');
      setIsMediatorModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        <button
          onClick={() => setIsMediatorModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold border border-amber-200">
            <Handshake className="w-3.5 h-3.5" />
            {language === 'hi' ? 'सार्वजनिक मध्यस्थता एवं डायरेक्ट कनेक्ट' : 'Public Citizen Mediator & Concierge'}
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-snug">
            {language === 'hi' ? 'नागरिक एवं विक्रेता सीधा संपर्क हब' : 'Connect Doctor, Advocate, Tehsil or Vendor'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {language === 'hi'
              ? 'पब्लिक मददगार आपके और डॉक्टर/अस्पताल, वकील/तहसील या व्यापारी के बीच सीधा सेतु बनता है।'
              : 'Public Madadgar acts as your direct trusted mediator between patients, hospitals, advocates, and vendors.'}
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'अनुरोध प्राप्त हुआ!' : 'Connection Request Received!'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'hi' ? 'हमारी हेल्पलाइन टीम आपको सीधे संपर्क करवाकर मार्गदर्शन प्रदान करेगी।' : 'Our concierge team is connecting you right away.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {!paymentStep ? (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'hi' ? 'कनेक्शन प्रकार चुनें *' : 'Select Connection Needed *'}
                  </label>
                  <select
                    value={formData.connectType}
                    onChange={(e) => setFormData({ ...formData, connectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:border-sky-600 focus:outline-none"
                  >
                    <option value="doctor-hospital">{language === 'hi' ? '🏥 डॉक्टर एवं अस्पताल दाखिला सहायता' : '🏥 Doctor & Hospital Admission Aid'}</option>
                    <option value="tehsil-advocate">{language === 'hi' ? '⚖️ तहसील / हाईकोर्ट वकील संपर्क' : '⚖️ Tehsil / High Court Advocate Match'}</option>
                    <option value="govt-kendra">{language === 'hi' ? '🏛️ जन सेवा केंद्र / खतौनी सहायता' : '🏛️ Govt Kendra & Land Records Help'}</option>
                    <option value="vendor-business">{language === 'hi' ? '🤝 विक्रेता एवं स्थानीय ग्राहक व्यापार' : '🤝 Vendor & Customer Business Connect'}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'आपका नाम *' : 'Your Name *'}</label>
                    <input
                      type="text"
                      required
                      placeholder="Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'फ़ोन नंबर *' : 'Phone Number *'}</label>
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
                  <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'विवरण या समस्या *' : 'Explain Your Need *'}</label>
                  <textarea
                    rows="2"
                    required
                    placeholder={language === 'hi' ? 'अपनी आवश्यकता लिखें...' : 'Describe what help or connection you need...'}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
                  ></textarea>
                </div>

                {/* Mediation Fee Lock */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-amber-900">
                        {language === 'hi' 
                          ? 'विशेषज्ञ संपर्क हेतु ₹149 का मध्यस्थता शुल्क अनिवार्य है।' 
                          : 'A ₹149 mediation fee is required to connect with experts.'}
                      </p>
                      <p className="text-[10px] text-amber-700 font-medium mt-0.5 leading-tight">
                        {language === 'hi' 
                          ? 'इस सुरक्षित शुल्क का भुगतान करने पर आपको तुरंत विशेषज्ञ का नंबर दे दिया जाएगा।' 
                          : 'By paying this secure platform fee, you will instantly receive the direct contact details.'}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-2"
                >
                  <Handshake className="w-4 h-4 text-slate-950" />
                  <span>{language === 'hi' ? '₹149 भरें और सीधा संपर्क प्राप्त करें' : 'Pay ₹149 & Connect Directly'}</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-2">
                <div className="text-center">
                  <h3 className="text-sm font-bold text-slate-800">
                    {language === 'hi' ? 'पेमेंट स्कैन करें' : 'Scan to Pay'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'hi' ? 'QR कोड स्कैन करके ₹149 का भुगतान करें।' : 'Scan the QR code and pay exactly ₹149.'}
                  </p>
                </div>

                <div className="mx-auto w-56 h-56 rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src="/assets/payment-qr.jpg" 
                    alt="Payment QR Code" 
                    className="w-full h-full object-cover object-[center_20%] scale-[1.6]" 
                  />
                </div>

                <div className="w-full space-y-1">
                  <label className="block font-bold text-slate-700">
                    {language === 'hi' ? 'UTR / Transaction ID दर्ज करें *' : 'Enter UTR / Transaction ID *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 315482390123"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={utrNumber.length < 12}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-200 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'भुगतान विवरण जमा करें' : 'Submit Payment Details'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStep(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline mt-2"
                >
                  {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
}
