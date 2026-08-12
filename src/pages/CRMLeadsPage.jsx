import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Filter, Search, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function CRMLeadsPage() {
  const { leadsList, updateLeadStatus, providersList } = useApp();

  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredLeads = leadsList.filter((l) => {
    const matchesSource = selectedSource === 'All' ? true : l.source === selectedSource;
    const matchesStatus = selectedStatus === 'All' ? true : l.status === selectedStatus;
    return matchesSource && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
          Internal CRM & Lead Hub
        </span>
        <h1 className="text-3xl font-extrabold text-white">Meta, WhatsApp & Web Lead Management</h1>
        <p className="text-xs text-slate-400">Track incoming customer requirements from Facebook Lead Ads, WhatsApp Chatbots & Web requests.</p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Lead Source:</span>
          {['All', 'Website Direct', 'Facebook Lead Ads', 'WhatsApp Inquiry'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSource(s)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                selectedSource === s ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Status:</span>
          {['All', 'New', 'Contacted', 'In Progress', 'Converted'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                selectedStatus === st ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Service Requested</th>
                <th className="p-3">Source & Campaign</th>
                <th className="p-3">Assigned Expert</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-950/40">
                  <td className="p-3 font-semibold text-white">
                    {lead.customerName}
                    <span className="block text-[11px] text-slate-400 font-normal">{lead.phone}</span>
                  </td>

                  <td className="p-3">
                    <span className="font-semibold text-brand-300">{lead.serviceRequested}</span>
                    <span className="block text-[10px] text-slate-400">{lead.serviceCategory}</span>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800 text-[10px] font-bold">
                      {lead.source}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{lead.campaign}</span>
                  </td>

                  <td className="p-3 font-medium text-slate-200">
                    {lead.assignedProviderName}
                  </td>

                  <td className="p-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Qualified</option>
                      <option>In Progress</option>
                      <option>Converted</option>
                      <option>Lost</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px]"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
