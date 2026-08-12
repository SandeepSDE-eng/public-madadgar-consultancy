import React from 'react';
import { 
  Search, ShieldCheck, ArrowRight, CheckCircle2, Star, 
  Users, Briefcase, Sparkles, Building, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { searchQuery, setSearchQuery, setCurrentPage } = useApp();

  const quickSearchTags = [
    "Tax Consultant",
    "Legal Notice",
    "Property Verification",
    "Career Guidance",
    "Digital Marketing",
    "Passport Aid",
    "Marketplace Products"
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('services');
  };

  return (
    <section className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-b from-sky-50/50 via-slate-50 to-slate-50">
      {/* Background Lighting Elements */}
      <div className="bg-glow-blue top-0 left-1/4 opacity-70"></div>
      <div className="bg-glow-gold top-20 right-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-extrabold text-slate-800">
              India's Premier Multi-Vendor Service & Product Marketplace
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            One Platform. Multiple Solutions. <br className="hidden sm:inline" />
            <span className="gradient-text">One Trusted Destination.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Find trusted services, certified professionals, verified products and customized solutions for all your everyday business and personal needs — all in one place.
          </p>

          {/* Universal Hero Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center p-2 rounded-2xl bg-white border border-slate-200 shadow-lg hover:border-sky-500 transition-all group">
              <Search className="w-5 h-5 text-sky-600 ml-3 mr-2" />
              <input
                type="text"
                placeholder="What service or solution are you looking for? (e.g. Tax, Legal, Property, IT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-0 py-2.5 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0"
              >
                <span>Find a Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-500 font-semibold">Popular Searches:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    setCurrentPage('services');
                  }}
                  className="px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 text-slate-700 hover:text-sky-700 rounded-xl font-medium transition-colors text-[11px] shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('services')}
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            >
              <Layers className="w-4 h-4 text-slate-950" />
              <span>Explore 21+ Categories</span>
            </button>

            <button
              onClick={() => setCurrentPage('onboarding')}
              className="px-7 py-3.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold rounded-xl text-sm flex items-center gap-2 hover:border-emerald-500 transition-all shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Join as a Service Provider</span>
            </button>
          </div>

          {/* Live Trust Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl text-center border border-slate-200 bg-white">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">50,000+</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">Happy Citizens Served</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-slate-200 bg-white">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">1,200+</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">Verified Experts</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-slate-200 bg-white">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-600">21+</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">Service Categories</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-slate-200 bg-white">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.4%</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">Resolution Rate</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
