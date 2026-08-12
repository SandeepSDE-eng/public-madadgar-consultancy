import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, ShieldCheck, DollarSign, Users, Star, CheckCircle2, Clock, Plus, BarChart3 } from 'lucide-react';

export default function ProviderDashboardPage() {
  const { leadsList, updateLeadStatus } = useApp();

  const providerLeads = leadsList.filter((l) => l.assignedProviderId === 'prov-1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300" alt="CA Rajesh Verma" className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-lg" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">Verma Tax & Corporate Advisory</h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Admin Verified Provider
              </span>
            </div>
            <p className="text-xs text-slate-400">CA Rajesh Verma • Senior Tax Expert • Delhi NCR</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Earnings</span>
            <span className="text-lg font-black text-emerald-400">₹1,48,500</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Assigned Leads</span>
          <p className="text-2xl font-black text-white mt-1">{providerLeads.length}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Completed Jobs</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">142</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Client Rating</span>
          <p className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1">
            4.9 <Star className="w-5 h-5 fill-amber-400" />
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-medium">Platform Commission Tier</span>
          <p className="text-2xl font-black text-brand-400 mt-1">10%</p>
        </div>
      </div>

      {/* Provider Assigned Leads Inbox */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Assigned Customer Leads Inbox</h2>

        <div className="space-y-3">
          {providerLeads.map((lead) => (
            <div key={lead.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {lead.source}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{lead.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold text-white mt-1">{lead.customerName} ({lead.phone})</h3>
                <p className="text-xs text-slate-300">Service: <strong className="text-brand-300">{lead.serviceRequested}</strong></p>
                {lead.notes && <p className="text-[11px] text-slate-400 italic mt-0.5">"{lead.notes}"</p>}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>In Progress</option>
                  <option>Converted</option>
                  <option>Lost</option>
                </select>

                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
