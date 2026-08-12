import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function SupportTicketsPage() {
  const { showToast } = useApp();

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'General Inquiry',
    message: ''
  });

  const [tickets, setTickets] = useState([
    {
      id: 'TICK-901',
      subject: 'Clarification regarding ITR refund timeline',
      status: 'Resolved',
      date: '2026-08-10'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject) return;

    const newTick = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      subject: ticketForm.subject,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };

    setTickets([newTick, ...tickets]);
    setTicketForm({ subject: '', category: 'General Inquiry', message: '' });
    showToast('Support Ticket Created! ID: ' + newTick.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          24/7 Citizen & Provider Help Desk
        </span>
        <h1 className="text-3xl font-extrabold text-white">Support & Resolution Center</h1>
        <p className="text-xs text-slate-400">Need help with a service request, order shipment, or provider application?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Submit Ticket Form */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-extrabold text-white">Create New Support Ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Subject *</label>
              <input
                type="text"
                required
                placeholder="Briefly state your concern..."
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
              >
                <option>General Inquiry</option>
                <option>Service Request Status</option>
                <option>Marketplace Order Delivery</option>
                <option>Provider Verification</option>
                <option>Billing & Payment</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Detailed Message</label>
              <textarea
                rows="4"
                placeholder="Explain details..."
                value={ticketForm.message}
                onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Support Ticket</span>
            </button>
          </form>
        </div>

        {/* Existing Tickets & Direct Contact */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
            <h3 className="font-extrabold text-white text-sm">Direct Customer Support</h3>
            <p className="text-slate-400">Toll-Free Helpline: <strong className="text-emerald-400">+91 1800-MADADGAR</strong></p>
            <p className="text-slate-400">Email: <strong className="text-brand-300">support@publicmadadgar.com</strong></p>
            <p className="text-slate-400">Operational Hours: Mon-Sat 08:00 AM - 08:00 PM</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="font-extrabold text-white text-sm">Your Recent Tickets</h3>
            
            <div className="space-y-2">
              {tickets.map((t) => (
                <div key={t.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-mono text-slate-400">{t.id}</span>
                    <span className="text-emerald-400 font-bold">{t.status}</span>
                  </div>
                  <p className="font-semibold text-white mt-1">{t.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
