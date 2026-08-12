import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LegalModal() {
  const { isLegalModalOpen, setIsLegalModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('terms');

  if (!isLegalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6">
        
        <button
          onClick={() => setIsLegalModalOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 rounded-full text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-extrabold text-white">Public Madadgar Legal & Governance Framework</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-4 text-xs font-semibold">
          {[
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'refund', label: 'Refund Policy' },
            { id: 'provider', label: 'Provider Agreement' },
            { id: 'disclaimer', label: 'Disclaimer' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-brand-950 text-brand-300 border border-brand-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Document Content */}
        <div className="max-h-96 overflow-y-auto text-xs text-slate-300 space-y-3 leading-relaxed pr-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          {activeTab === 'terms' && (
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">1. Acceptance of Terms</h3>
              <p>By accessing Public Madadgar Consultancy platform, users and service providers agree to adhere to all service guidelines, verified identity requirements, and transaction commissions governed under IT Act 2000 (India).</p>
              <h3 className="font-bold text-white my-2 text-sm">2. Provider Verification</h3>
              <p>Service providers are required to submit genuine identity, qualification, and registration credentials. Admin reserves absolute right to verify, approve, or reject provider applications.</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">Data Protection & Privacy</h3>
              <p>Public Madadgar Consultancy respects customer privacy. Personal data including mobile numbers, identity documents, and service requests are encrypted and never sold to third-party telemarketers.</p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">100% Service Satisfaction Guarantee</h3>
              <p>If a service requested is unfulfilled or rejected by an assigned provider prior to work commencement, customer funds are 100% refunded to the original payment source within 3-5 business days.</p>
            </div>
          )}

          {activeTab === 'provider' && (
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">Provider Onboarding Agreement</h3>
              <p>Providers agree to maintain professional ethics, deliver services within promised turnaround times, and pay applicable platform commissions as calculated automatically by the admin engine.</p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">General Disclaimer</h3>
              <p>Public Madadgar Consultancy operates as a multi-service digital directory and lead-generation marketplace. Domain advice (legal/tax/medical) is rendered by independent certified professionals.</p>
            </div>
          )}
        </div>

        <div className="pt-4 text-right">
          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
