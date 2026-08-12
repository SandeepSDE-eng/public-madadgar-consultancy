import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ServiceCard from '../components/ServiceCard';
import { Search, Filter, Layers, CheckCircle2 } from 'lucide-react';

export default function ServiceMarketplacePage() {
  const { servicesList, categoriesList, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useApp();

  const [selectedCity, setSelectedCity] = useState('All');

  const filteredServices = servicesList.filter((s) => {
    const matchesCategory = selectedCategory ? s.categoryId === selectedCategory.id || s.category === selectedCategory.name : true;
    const matchesSearch = searchQuery
      ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCity = selectedCity === 'All' ? true : s.location.includes(selectedCity);
    return matchesCategory && matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-brand-950 px-3 py-1 rounded-full border border-brand-800">
          Service Marketplace Engine
        </span>
        <h1 className="text-3xl font-extrabold text-white">Browse Services Across 21+ Categories</h1>
        <p className="text-xs text-slate-400">Request consultation, file documents, or hire expert advisors with transparent pricing.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search service name (e.g., ITR, Legal Notice, Passport)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              !selectedCategory ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}
          >
            All 21 Categories
          </button>

          {categoriesList.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory?.id === cat.id ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {selectedCategory && (
        <div className="flex items-center justify-between p-3 bg-brand-950/60 rounded-xl border border-brand-800/40 text-xs text-brand-300">
          <span>Filtering by category: <strong>{selectedCategory.name}</strong></span>
          <button onClick={() => setSelectedCategory(null)} className="underline hover:text-white">Clear Filter</button>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center space-y-2">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-300 font-semibold">No services found matching your search filters.</p>
            <button onClick={() => { setSelectedCategory(null); setSearchQuery(''); }} className="text-xs text-brand-400 underline">
              Reset All Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
