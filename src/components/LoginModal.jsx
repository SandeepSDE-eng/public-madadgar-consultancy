import React, { useState } from 'react';
import { X, Phone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, loginUser, handleRoleChange, role } = useApp();

  const [loginType, setLoginType] = useState('mobile'); // 'mobile' | 'email'
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(role || 'customer');

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    const newUser = {
      name: mobile ? `User ${mobile.slice(-4)}` : email.split('@')[0],
      phone: mobile || '+91 98765 43210',
      email: email || 'user@publicmadadgar.com',
      role: selectedRole
    };
    handleRoleChange(selectedRole);
    loginUser(newUser);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Public Madadgar" className="w-12 h-12 rounded-2xl border border-amber-400 shadow-md" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Sign In to Public Madadgar</h2>
          <p className="text-xs text-slate-500">Access citizen services, provider leads, and marketplace orders.</p>
        </div>

        {/* Account Role Selector */}
        <div className="p-1 bg-slate-100 rounded-2xl flex items-center text-xs font-bold text-slate-600">
          {[
            { id: 'customer', label: 'Customer' },
            { id: 'provider', label: 'Provider' },
            { id: 'admin', label: 'Admin' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`flex-1 py-2 rounded-xl transition-all ${
                selectedRole === r.id ? 'bg-sky-600 text-white shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Mobile OTP Flow */}
        <form onSubmit={otpSent ? handleVerifyLogin : handleSendOtp} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile Number (WhatsApp OTP) *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-sky-600 focus:outline-none"
              />
            </div>
          </div>

          {otpSent && (
            <div className="animate-fade-in">
              <label className="block font-semibold text-slate-700 mb-1">Enter 4-Digit Verification OTP *</label>
              <input
                type="text"
                required
                maxLength={4}
                placeholder="1 2 3 4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full tracking-widest text-center py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:border-sky-600 focus:outline-none"
              />
              <p className="text-[10px] text-emerald-600 font-semibold mt-1 text-center">✓ OTP sent via SMS & WhatsApp</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
          >
            <span>{otpSent ? 'Verify OTP & Continue' : 'Send OTP via WhatsApp'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
