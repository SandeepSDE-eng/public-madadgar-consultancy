import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, FileText, ShoppingBag, Heart, ShieldCheck, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

export default function CustomerDashboardPage() {
  const { customerRequests, wishlist, cart, setCurrentPage } = useApp();

  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-900 border-2 border-brand-500 flex items-center justify-center text-white text-2xl font-black shadow-lg">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">Sanjay Kumar</h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                Verified Citizen Account
              </span>
            </div>
            <p className="text-xs text-slate-400">Mobile: +91 98765 43210 • New Delhi, India</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('services')}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs"
        >
          Book New Service
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'requests' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          My Service Requests ({customerRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'wishlist' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          My Saved Wishlist ({wishlist.length})
        </button>
      </div>

      {/* Requests Table */}
      {activeTab === 'requests' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Service Requests & Bookings</h2>

          <div className="space-y-3">
            {customerRequests.map((req) => (
              <div key={req.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      {req.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {req.id}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-1">{req.serviceName}</h3>
                  <p className="text-xs text-slate-400">Assigned Provider: <strong className="text-slate-200">{req.providerName}</strong></p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-400">₹{req.price}</span>
                    <span className="block text-[10px] text-slate-400">{req.date}</span>
                  </div>

                  <span className="px-3 py-1 bg-brand-950 text-brand-300 font-bold text-xs rounded-full border border-brand-800">
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
