import React, { useState } from 'react';
import { 
  X, CheckCircle2, Upload, Calendar, Clock, MapPin, 
  ShieldCheck, CreditCard, Lock, Sparkles, FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { 
    selectedService, selectedProvider, isBookingModalOpen, 
    setIsBookingModalOpen, submitServiceRequest 
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              Service Request Wizard
            </span>
            <h2 className="text-lg font-extrabold text-white mt-1 line-clamp-1">{selectedService.name}</h2>
            <p className="text-xs text-slate-300">Total Price: <span className="text-emerald-400 font-bold">₹{selectedService.price}</span> (Zero Hidden Charges)</p>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="p-2 bg-slate-950/60 hover:bg-slate-950 rounded-full text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="ramesh@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Service Address / City</label>
              <input
                type="text"
                placeholder="Street address or city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">PIN Code</label>
              <input
                type="text"
                placeholder="110001"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Preferred Date & Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot</label>
              <select
                value={formData.slot}
                onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
              >
                <option>09:00 AM - 12:00 PM</option>
                <option>12:00 PM - 03:00 PM</option>
                <option>03:00 PM - 06:00 PM</option>
                <option>06:00 PM - 09:00 PM</option>
              </select>
            </div>
          </div>

          {/* Upload Related Documents (Simulation) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Upload Supporting Documents (PAN / Aadhaar / Property Papers)
            </label>
            <div className="relative border-2 border-dashed border-slate-800 hover:border-brand-500/50 rounded-2xl p-3 text-center bg-slate-950/50 cursor-pointer">
              <input
                type="file"
                onChange={handleDocUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Upload className="w-4 h-4 text-brand-400" />
                <span>{uploadedDocName ? `Attached: ${uploadedDocName}` : 'Click to select file (PDF, JPG, PNG up to 10MB)'}</span>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Requirement Notes (Optional)</label>
            <textarea
              rows="2"
              placeholder="Specify any special instructions or detail..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Payment Method Selection */}
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white block">Payment Mode Preference</span>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                formData.paymentMethod === 'online' ? 'bg-brand-950/80 border-brand-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <input
                  type="radio"
                  name="paymentMode"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                  className="hidden"
                />
                <CreditCard className="w-4 h-4 text-brand-400" />
                <span className="font-semibold">Razorpay / UPI</span>
              </label>

              <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                formData.paymentMethod === 'after' ? 'bg-amber-950/80 border-amber-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <input
                  type="radio"
                  name="paymentMode"
                  value="after"
                  checked={formData.paymentMethod === 'after'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'after' })}
                  className="hidden"
                />
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Pay After Service</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Confirm & Submit Service Request</span>
          </button>
        </form>

      </div>
    </div>
  );
}
