import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users, Briefcase, DollarSign, Layers, CheckCircle2, XCircle, Calculator, FileText, Settings, Sparkles } from 'lucide-react';

export default function AdminDashboardPage() {
  const { 
    pendingProviders, approveProvider, providersList, 
    leadsList, commissionConfig, setCommissionConfig, showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('verification');

  const [defaultComm, setDefaultComm] = useState(commissionConfig.defaultRate);

  const handleSaveCommission = (e) => {
    e.preventDefault();
    setCommissionConfig({ ...commissionConfig, defaultRate: defaultComm });
    showToast(`Updated default platform commission to ${defaultComm}%`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Executive Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">Public Madadgar Executive Admin Console</h1>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
              Master Control
            </span>
          </div>
          <p className="text-xs text-slate-400">Platform Governance, Provider Verifications, Commissions & Lead Distribution Hub</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
          <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            Pending Provider Apps: <strong className="text-amber-400">{pendingProviders.length}</strong>
          </span>
        </div>
      </div>

      {/* Admin Stat Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Total Registered Users</span>
          <p className="text-2xl font-black text-white mt-1">54,210</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Verified Experts</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{providersList.length}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Total Platform Leads</span>
          <p className="text-2xl font-black text-brand-400 mt-1">{leadsList.length}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Est. Platform Revenue</span>
          <p className="text-2xl font-black text-amber-400 mt-1">₹4,28,900</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'verification' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Provider Verification Queue ({pendingProviders.length})
        </button>

        <button
          onClick={() => setActiveTab('commission')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'commission' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Commission Calculator Engine
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'audit' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          System Audit Logs
        </button>
      </div>

      {/* Provider Verification Center */}
      {activeTab === 'verification' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Pending Provider Applications</h2>

          {pendingProviders.length > 0 ? (
            <div className="space-y-3">
              {pendingProviders.map((app) => (
                <div key={app.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        {app.category}
                      </span>
                      <span className="text-xs text-slate-400">Submitted: {app.submittedAt}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-1">{app.businessName}</h3>
                    <p className="text-xs text-slate-300">{app.name} • {app.city}, {app.state} • {app.experienceYears} Years Exp</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveProvider(app.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1 shadow"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Approve & Grant Badge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No pending applications at present.</p>
          )}
        </div>
      )}

      {/* Commission Calculator Engine */}
      {activeTab === 'commission' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Automatic Commission Calculation Engine</h2>

          <form onSubmit={handleSaveCommission} className="max-w-md space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default Platform Commission Rate (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={defaultComm}
                  onChange={(e) => setDefaultComm(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl text-xs shrink-0">
                  Save Rate
                </button>
              </div>
            </div>
          </form>

          {/* Example Calculation Table */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
            <span className="font-bold text-amber-400 block">Commission Rule Example:</span>
            <p>Service Price: <strong>₹1,000</strong></p>
            <p>Platform Commission ({commissionConfig.defaultRate}%): <strong className="text-emerald-400">₹{(1000 * commissionConfig.defaultRate) / 100}</strong></p>
            <p>Net Provider Payout: <strong>₹{1000 - (1000 * commissionConfig.defaultRate) / 100}</strong></p>
          </div>
        </div>
      )}

      {/* System Audit Logs */}
      {activeTab === 'audit' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Platform Security & Audit Log</h2>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>[2026-08-12 22:10] Admin approved Provider "Verma Tax & Advisory" (Granted Verified Badge)</span>
              <span className="text-emerald-400">AUDIT_OK</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>[2026-08-12 21:15] Amazon SP-API Auto Sync triggered for 50 SKUs</span>
              <span className="text-cyan-400">SYNC_OK</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
