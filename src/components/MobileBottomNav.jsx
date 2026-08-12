import React from 'react';
import { Home, Layers, ShoppingBag, User, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MobileBottomNav() {
  const { currentPage, setCurrentPage, setIsCartOpen, setIsSidebarOpen, cart, user, setIsLoginModalOpen, role } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAccountClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setCurrentPage(role === 'provider' ? 'provider-dash' : role === 'admin' ? 'admin-dash' : 'customer-dash');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-1.5 px-4 lg:hidden flex items-center justify-between">
      
      {/* Home */}
      <button
        onClick={() => setCurrentPage('home')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
          currentPage === 'home' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* Services */}
      <button
        onClick={() => setCurrentPage('services')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
          currentPage === 'services' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>21+ Services</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-800"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* Account */}
      <button
        onClick={handleAccountClick}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
          currentPage.includes('dash') ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className="w-4 h-4" />
        <span>{user ? 'Account' : 'Login'}</span>
      </button>

      {/* Menu */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-800"
      >
        <Menu className="w-4 h-4 text-sky-600" />
        <span>Menu</span>
      </button>

    </div>
  );
}
