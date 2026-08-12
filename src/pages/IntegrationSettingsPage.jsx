import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, CheckCircle2, MessageSquare, CreditCard, ShieldCheck, Key, RefreshCw } from 'lucide-react';

export default function IntegrationSettingsPage() {
  const { integrations, setIntegrations, showToast } = useApp();

  const [metaForm, setMetaForm] = useState(integrations.meta);
  const [waForm, setWaForm] = useState(integrations.whatsapp);
  const [payForm, setPayForm] = useState(integrations.paymentGateway);

  const handleSaveAll = (e) => {
    e.preventDefault();
    setIntegrations({
      ...integrations,
      meta: metaForm,
      whatsapp: waForm,
      paymentGateway: payForm
    });
    showToast('Integration Credentials & Webhook Settings Saved!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
          Official API Governance
        </span>
        <h1 className="text-3xl font-extrabold text-white">Meta, WhatsApp & Payment Integration Hub</h1>
        <p className="text-xs text-slate-400">Secure configuration for Meta Graph OAuth, WhatsApp Business Cloud API, and Razorpay Gateways.</p>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        
        {/* Meta / FB / IG Section */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold">f</span>
              Meta / Facebook & Instagram Integration (OAuth 2.0)
            </h2>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> OAuth Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Connected Facebook Page Name</label>
              <input
                type="text"
                value={metaForm.pageName}
                onChange={(e) => setMetaForm({ ...metaForm, pageName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Meta Pixel Tracking ID</label>
              <input
                type="text"
                value={metaForm.pixelId}
                onChange={(e) => setMetaForm({ ...metaForm, pixelId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Business API */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              WhatsApp Business Platform API (Meta Cloud)
            </h2>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> WABA Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Business Phone Number</label>
              <input
                type="text"
                value={waForm.businessPhone}
                onChange={(e) => setWaForm({ ...waForm, businessPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WABA Account ID</label>
              <input
                type="text"
                value={waForm.wabaId}
                onChange={(e) => setWaForm({ ...waForm, wabaId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Razorpay Gateway */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              Razorpay Gateway & Payout Engine
            </h2>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Live Webhooks Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={payForm.keyId}
                onChange={(e) => setPayForm({ ...payForm, keyId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Razorpay Webhook Secret</label>
              <input
                type="password"
                value="whsec_live_99823471092384"
                readOnly
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-extrabold rounded-xl text-sm flex items-center gap-2 shadow-xl"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Save API Credentials & Integration Rules</span>
        </button>
      </form>

    </div>
  );
}
