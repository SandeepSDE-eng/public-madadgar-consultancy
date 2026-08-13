import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, Search, Filter, Tag } from 'lucide-react';

export default function ProductMarketplacePage() {
  const { productsList } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSub, setSelectedSub] = useState('All');

  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesSub = selectedSub === 'All' ? true : p.subcategory === selectedSub;
    return matchesSearch && matchesSub;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Online Product Marketplace
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Office Equipment, Biometrics & Business Products</h1>
        <p className="text-xs text-slate-600">Order STQC biometric hardware, Class 3 DSC tokens, billing printers, and legal handbooks directly.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <span className="text-slate-600 shrink-0 font-medium">Subcategory:</span>
          {['All', 'Biometric & POS Devices', 'Taxation & Legal Reference Books', 'Software & License Keys'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-colors ${
                selectedSub === sub ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}
