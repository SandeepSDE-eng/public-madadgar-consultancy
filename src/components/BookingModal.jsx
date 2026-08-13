import React, { useState } from 'react';
import { 
  X, CheckCircle2, Upload, Calendar, Clock, MapPin, 
  ShieldCheck, CreditCard, Lock, Sparkles, FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { 
    selectedService, selectedProvider, isBookingModalOpen, 
    setIsBookingModalOpen, submitServiceRequest, language 
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'New Delhi',
    pincode: '110001',
    date: new Date().toISOString().split('T')[0],
    slot: '10:00 AM - 01:00 PM',
    notes: '',
    paymentMethod: 'online'
  });

  const [uploadedDocName, setUploadedDocName] = useState(null);

  if (!isBookingModalOpen || !selectedService) return null;

  const handleDocUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    submitServiceRequest({
      serviceName: selectedService.name,
      providerName: selectedProvider ? selectedProvider.businessName : 'Assigned Expert Provider',
      providerId: selectedProvider ? selectedProvider.id : 'prov-1',
      price: selectedService.price,
      category: selectedService.category || 'General Service',
      customerDetails: formData,
      notes: formData.notes
    });

    setIsBookingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Compact Header */}
        <div className="p-4 bg-sky-900 text-white flex items-center justify-between">
          <div className="pr-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-sky-950 px-2 py-0.5 rounded">
              {language === 'hi' ? 'त्वरित सेवा अनुरोध' : 'Quick Service Request'}
            </span>
            <h2 className="text-sm font-extrabold text-white mt-1 line-clamp-1">
              {language === 'hi' ? (selectedService.name_hi || selectedService.name) : selectedService.name}
            </h2>
            <p className="text-[11px] text-sky-100 font-semibold">
              {language === 'hi' ? 'शुल्क:' : 'Price:'} <strong className="text-amber-300">₹{selectedService.price}</strong>
            </p>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="p-1.5 bg-sky-950/60 hover:bg-sky-950 rounded-full text-slate-200 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'नाम *' : 'Full Name *'}</label>
              <input
                type="text"
                required
                placeholder="Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'मोबाइल *' : 'Mobile Number *'}</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'शहर / जिला' : 'City / District'}</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'पिन कोड' : 'PIN Code'}</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'पसंदीदा तिथि' : 'Preferred Date'}</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'समय स्लॉट' : 'Time Slot'}</label>
              <select
                value={formData.slot}
                onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-sky-600 focus:outline-none font-medium"
              >
                <option>09:00 AM - 12:00 PM</option>
                <option>12:00 PM - 03:00 PM</option>
                <option>03:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          {/* Upload Documents (Compact) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {language === 'hi' ? 'संलग्न दस्तावेज़ (ऐच्छिक)' : 'Attach Documents (Optional)'}
            </label>
            <div className="relative border border-dashed border-slate-300 hover:border-sky-500 rounded-xl p-2 text-center bg-slate-50 cursor-pointer">
              <input type="file" onChange={handleDocUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <Upload className="w-3.5 h-3.5 text-sky-600" />
                <span className="truncate">{uploadedDocName ? `Attached: ${uploadedDocName}` : 'Attach file (PDF/JPG)'}</span>
              </div>
            </div>
          </div>

          {/* Mediation Fee Lock */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-amber-900">
                  {language === 'hi' 
                    ? 'बुकिंग कन्फर्मेशन हेतु ₹149 का मध्यस्थता शुल्क अनिवार्य है।' 
                    : 'A ₹149 mediation/booking fee is required to confirm this request.'}
                </p>
                <p className="text-[10px] text-amber-700 font-medium mt-0.5 leading-tight">
                  {language === 'hi' 
                    ? 'भुगतान के पश्चात ही प्रदाता का सीधा संपर्क साझा किया जाएगा। सेवा शुल्क का बाकी भुगतान कार्य पूर्ण होने पर करें।' 
                    : 'Provider contact details will be shared immediately after this payment. The remaining service amount is settled during/after service completion.'}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all mt-2"
          >
            <CreditCard className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? '₹149 का भुगतान कर बुकिंग लॉक करें' : 'Pay ₹149 & Lock Booking'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
