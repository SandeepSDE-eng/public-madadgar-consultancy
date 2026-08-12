import React, { useState } from 'react';
import { 
  Search, MapPin, ShoppingBag, Heart, ShieldCheck, Menu, X, 
  ChevronDown, User, Layers, RefreshCw, BarChart3, Settings, HelpCircle,
  Briefcase, Bell, Sparkles, LogIn, LogOut, Languages
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { 
    currentPage, setCurrentPage, 
    location, setLocation, 
    cart, wishlist, 
    setIsCartOpen, role,
    categoriesList, setSearchQuery, searchQuery,
    isSidebarOpen, setIsSidebarOpen,
    user, logoutUser, setIsLoginModalOpen,
    language, setLanguage
  } = useApp();

  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategorySelect = (catName) => {
    setSearchQuery(catName);
    setCurrentPage('services');
    setSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-sky-900 text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-slate-100 font-medium truncate">
              {language === 'hi' 
                ? 'भारत का प्रमुख बहु-सेवा डिजिटल प्लेटफॉर्म — 50,000+ सत्यापित समाधान' 
                : "India's Premier Multi-Service Platform — 50,000+ Verified Resolutions"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sky-200">
            {/* Language Selector Button */}
            <div className="flex items-center bg-sky-950/80 p-0.5 rounded-lg border border-sky-700/60 font-bold text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded transition-all ${
                  language === 'en' ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded transition-all ${
                  language === 'hi' ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1 hover:text-white cursor-pointer" onClick={() => setCurrentPage('support')}>
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" /> {language === 'hi' ? 'सहायता केंद्र' : 'Citizen Support'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Sidebar Toggle & Location */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Location Selector */}
            <div className="relative">
              <button 
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:border-sky-600 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>{location.city}, {location.state}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                  <p className="px-2 py-1 text-slate-400 font-semibold border-b border-slate-100 mb-1">
                    {language === 'hi' ? 'अपना शहर चुनें' : 'Select Your Service City'}
                  </p>
                  {[
                    { city: 'New Delhi', state: 'Delhi' },
                    { city: 'Mumbai', state: 'Maharashtra' },
                    { city: 'Bengaluru', state: 'Karnataka' },
                    { city: 'Lucknow', state: 'Uttar Pradesh' },
                    { city: 'Jaipur', state: 'Rajasthan' },
                    { city: 'Patna', state: 'Bihar' }
                  ].map((loc) => (
                    <button
                      key={loc.city}
                      onClick={() => {
                        setLocation({ ...location, city: loc.city, state: loc.state });
                        setLocationDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sky-50 text-slate-700 flex items-center justify-between font-medium"
                    >
                      <span>{loc.city} ({loc.state})</span>
                      {location.city === loc.city && <span className="text-sky-600 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Universal Top Search Bar */}
          <div className="hidden sm:block flex-1 max-w-lg relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={language === 'hi' ? 'आईटीआर, कानूनी नोटिस, संपत्ति कागजात, उत्पाद खोजें...' : 'Search ITR filing, Legal Notice, Property Deed, Products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-all font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            </div>

            {/* Quick Search Autocomplete Popup */}
            {searchFocused && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50">
                <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  {language === 'hi' ? 'लोकप्रिय श्रेणियां' : 'Popular Categories'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.slice(0, 7).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategorySelect(c.name)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200 transition-colors"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist Button */}
            <button 
              onClick={() => setCurrentPage('marketplace')}
              className="relative p-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 transition-colors hidden sm:block"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-sky-600 text-slate-700 transition-colors flex items-center gap-1.5"
              title="Marketplace Cart"
            >
              <ShoppingBag className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-semibold hidden md:inline text-slate-800">
                {language === 'hi' ? 'कार्ट' : 'Cart'}
              </span>
              {totalCartCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(role === 'provider' ? 'provider-dash' : role === 'admin' ? 'admin-dash' : 'customer-dash')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'लॉग इन' : 'Sign In'}</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
