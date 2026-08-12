import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProviderCard from '../components/ProviderCard';
import { ShieldCheck, Search, MapPin, Award } from 'lucide-react';

export default function ProviderDirectoryPage() {
  const { providersList } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredProviders = providersList.filter((p) => {
    const matchesSearch = p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === 'All' ? true : p.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Admin Verified Network
        </span>
        <h1 className="text-3xl font-extrabold text-white">Verified Provider & Consultant Directory</h1>
        <p className="text-xs text-slate-400">Connect with background-checked Chartered Accountants, Advocates, Engineers & Consultants.</p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by provider name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Filter City:</span>
          {['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Lucknow'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                selectedCity === city ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

    </div>
  );
}
