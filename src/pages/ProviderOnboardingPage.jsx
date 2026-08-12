import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Upload, ShieldCheck, 
  Briefcase, User, Building2, Layers, MapPin, Award, DollarSign, 
  Globe, CreditCard, Lock, Sparkles
} from 'lucide-react';

export default function ProviderOnboardingPage() {
  const { submitProviderOnboarding, categoriesList, setCurrentPage } = useApp();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    category: 'Tax & Accounting',
    subcategories: [],
    city: 'New Delhi',
    state: 'Delhi',
    experience: 5,
    qualification: '',
    about: '',
    pricing: '499',
    website: '',
    bankAccount: '',
    ifsc: '',
    agreed: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 12) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProviderOnboarding(formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
          Official Provider Verification Wizard
        </span>
        <h1 className="text-3xl font-black text-white">Join as a Verified Service Provider</h1>
        <p className="text-xs text-slate-400">Complete our 12-step verification wizard to list your services and start receiving customer leads.</p>
      </div>

      {/* Wizard Step Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
          <span>Step {step} of 12</span>
          <span className="text-amber-400">
            {step === 1 && "1. Basic Information"}
            {step === 2 && "2. Business Details"}
            {step === 3 && "3. Category Selection"}
            {step === 4 && "4. Services Offered"}
            {step === 5 && "5. Location & Area"}
            {step === 6 && "6. Experience & Qualification"}
            {step === 7 && "7. Document Submission"}
            {step === 8 && "8. Pricing & Packages"}
            {step === 9 && "9. Website & Social Links"}
            {step === 10 && "10. Bank Payout Details"}
            {step === 11 && "11. Terms & Consent"}
            {step === 12 && "12. Final Verification Review"}
          </span>
        </div>

        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-brand-500 h-full transition-all duration-300"
            style={{ width: `${(step / 12) * 100}%` }}
          ></div>
        </div>
      </div>

      {submitted ? (
        <div className="glass-panel p-10 rounded-3xl border border-emerald-500/40 text-center space-y-4 max-w-xl mx-auto bg-slate-900">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Application Submitted!</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Your profile has been submitted for verification." <br />
            Our admin team will review your identity and qualifications within 24-48 hours. Once approved, your official <strong className="text-emerald-400">Verified Provider Badge</strong> will be activated.
          </p>
          <button
            onClick={() => setCurrentPage('provider-dash')}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs"
          >
            Go to Provider Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-base font-extrabold text-white">Step 1: Personal Contact Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA Rajesh Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
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
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="verma.tax@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-base font-extrabold text-white">Step 2: Business / Professional Firm Details</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Business / Firm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verma Tax & Corporate Advisory"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">About Your Practice / Firm *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Provide a overview of your expertise, services rendered, and experience..."
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3: Category Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-base font-extrabold text-white">Step 3: Primary Category Selection</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.name })}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      formData.category === cat.name
                        ? 'bg-brand-950 border-brand-500 text-brand-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {formData.category === cat.name && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4-11 (Dynamic Forms) */}
          {step >= 4 && step <= 11 && (
            <div className="space-y-4 animate-fade-in text-xs text-slate-300">
              <h3 className="text-base font-extrabold text-white">
                Step {step}: {
                  step === 4 ? "Services & Offerings" :
                  step === 5 ? "Service Locations" :
                  step === 6 ? "Experience & Qualification" :
                  step === 7 ? "Verification Documents" :
                  step === 8 ? "Pricing Structure" :
                  step === 9 ? "Social Media & Website" :
                  step === 10 ? "Bank Account Details" : "Terms & Consent"
                }
              </h3>

              {step === 6 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Qualification</label>
                    <input
                      type="text"
                      placeholder="FCA / LL.B / B.Tech"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                  <p className="font-bold text-white">Upload Aadhaar / PAN / Professional Degree Certificate</p>
                  <div className="border-2 border-dashed border-slate-800 hover:border-brand-500 rounded-2xl p-4 text-center cursor-pointer">
                    <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                    <span>Click to attach document (PDF/JPG/PNG up to 15MB)</span>
                  </div>
                </div>
              )}

              {step === 11 && (
                <label className="flex items-start gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-0.5 rounded bg-slate-950 border-slate-800 text-brand-500"
                  />
                  <span>I certify that all details submitted are genuine and agree to Public Madadgar Provider Governance Terms.</span>
                </label>
              )}
            </div>
          )}

          {/* Step 12: Final Review */}
          {step === 12 && (
            <div className="space-y-4 text-xs text-slate-300 animate-fade-in">
              <h3 className="text-base font-extrabold text-white">Step 12: Final Verification Review</h3>
              
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Business Name:</strong> {formData.businessName}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Location:</strong> {formData.city}, {formData.state}</p>
                <p><strong>Experience:</strong> {formData.experience} Years</p>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 12 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Submit Profile for Admin Verification</span>
              </button>
            )}
          </div>

        </form>
      )}

    </div>
  );
}
