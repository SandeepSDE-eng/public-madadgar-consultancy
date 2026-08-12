import React, { useState } from 'react';
import { 
  ShieldCheck, Phone, Mail, MapPin, Send, CheckCircle2, 
  MessageSquare, Lock, Heart, Award, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setCurrentPage, setIsLegalModalOpen, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to Public Madadgar updates!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8 mt-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-glow-blue -top-20 -left-20 opacity-30 pointer-events-none"></div>
      <div className="bg-glow-gold -bottom-20 -right-20 opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Bio Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Public Madadgar Consultancy" className="w-10 h-10 rounded-xl border border-amber-500/40" />
              <div>
                <h2 className="text-base font-extrabold text-white">Public Madadgar Consultancy</h2>
                <p className="text-[11px] text-amber-400 font-medium">One-Stop Digital Service & Marketplace Platform</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed pr-4 text-[11px]">
              "A platform where people can come to solve multiple everyday problems from one trusted digital destination." Connecting citizens and enterprise clients with verified experts across 21+ service categories in India.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-semibold">100% Admin Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 font-semibold">SSL Secured Engine</span>
              </div>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">Top Service Categories</h3>
            <ul className="space-y-2">
              {['Tax & Accounting', 'Legal Services', 'Property Verification', 'Government Services', 'Digital Marketing', 'Website Development', 'Career Counselling'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => setCurrentPage('services')} 
                    className="hover:text-brand-400 transition-colors flex items-center gap-1"
                  >
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features & Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">Platform Ecosystem</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('providers')} className="hover:text-amber-400 transition-colors">Verified Provider Directory</button></li>
              <li><button onClick={() => setCurrentPage('marketplace')} className="hover:text-amber-400 transition-colors">E-Commerce Marketplace</button></li>
              <li><button onClick={() => setCurrentPage('sync')} className="hover:text-cyan-400 transition-colors">Amazon & Meesho API Sync</button></li>
              <li><button onClick={() => setCurrentPage('onboarding')} className="hover:text-emerald-400 transition-colors">Join as Service Provider</button></li>
              <li><button onClick={() => setCurrentPage('crm')} className="hover:text-purple-400 transition-colors">Lead CRM Console</button></li>
              <li><button onClick={() => setCurrentPage('integrations')} className="hover:text-indigo-400 transition-colors">Meta & WhatsApp Hub</button></li>
              <li><button onClick={() => setIsLegalModalOpen(true)} className="hover:text-white transition-colors">Legal & Compliance Policy</button></li>
            </ul>
          </div>

          {/* Newsletter & Support */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">Stay Informed</h3>
            <p className="text-slate-400 text-[11px]">Subscribe for tax deadlines, legal updates, and new marketplace releases.</p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe Now
              </button>
            </form>

            <div className="pt-2 text-slate-400 text-[11px] space-y-1">
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-400" /> Helpline: +91 1800-MADADGAR</p>
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> support@publicmadadgar.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Footer Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 Public Madadgar Consultancy. All Rights Reserved. Production-Grade Multi-Service Platform.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-slate-300">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-slate-300">Refund Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
