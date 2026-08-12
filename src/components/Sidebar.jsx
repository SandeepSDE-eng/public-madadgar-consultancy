import React, { useState } from 'react';
import { 
  Home, Layers, ShieldCheck, ShoppingBag, RefreshCw, 
  BarChart3, Settings, BookOpen, HelpCircle, Briefcase, 
  ChevronLeft, ChevronRight, ChevronDown, User, Sparkles, LogIn, LogOut, X, Languages
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import RoleSwitcher from './RoleSwitcher';

export default function Sidebar() {
  const { 
    currentPage, setCurrentPage, 
    categoriesList, setSelectedCategory, 
    isSidebarOpen, setIsSidebarOpen,
    isSidebarCollapsed, setIsSidebarCollapsed,
    user, logoutUser, setIsLoginModalOpen,
    language, setLanguage,
    role
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const mainNavItems = [
    { 
      id: 'home', 
      label: language === 'hi' ? 'मुख्य अवलोकन (Home)' : 'Home Overview', 
      icon: Home 
    },
    { 
      id: 'services', 
      label: language === 'hi' ? '21+ सेवा श्रेणियां' : '21+ Service Categories', 
      icon: Layers, 
      badge: '21' 
    },
    { 
      id: 'providers', 
      label: language === 'hi' ? 'सत्यापित विशेषज्ञ' : 'Verified Experts Network', 
      icon: ShieldCheck, 
      badge: language === 'hi' ? 'सत्यापित' : 'Verified' 
    },
    { 
      id: 'marketplace', 
      label: language === 'hi' ? 'ऑनलाइन स्टोर (Shop)' : 'E-Commerce Store', 
      icon: ShoppingBag 
    },
    { 
      id: 'sync', 
      label: language === 'hi' ? 'अमेज़न/मीशो सिंक' : 'Amazon & Meesho Sync', 
      icon: RefreshCw 
    },
    { 
      id: 'crm', 
      label: language === 'hi' ? 'लीड प्रबंधन CRM' : 'Lead Management CRM', 
      icon: BarChart3 
    },
    { 
      id: 'integrations', 
      label: language === 'hi' ? 'एपीआई एकीकरण (API)' : 'API Integrations Hub', 
      icon: Settings 
    },
    { 
      id: 'blogs', 
      label: language === 'hi' ? 'ज्ञान केंद्र एवं ब्लॉग' : 'Knowledge Hub & Blogs', 
      icon: BookOpen 
    },
    { 
      id: 'support', 
      label: language === 'hi' ? 'नागरिक सहायता केंद्र' : 'Citizen Help & Support', 
      icon: HelpCircle 
    }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage('services');
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200 shadow-2xl lg:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-x-hidden ${
          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-72 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header Logo */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group min-w-0"
          >
            <div className="relative shrink-0">
              <img 
                src="/logo.png" 
                alt="Public Madadgar Consultancy Logo" 
                className="w-10 h-10 rounded-xl object-cover border border-amber-400 shadow-md group-hover:scale-105 transition-transform" 
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 shadow">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className={`min-w-0 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
              <h1 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                Public Madadgar
              </h1>
              <p className="text-[10px] text-sky-700 font-bold uppercase tracking-wider truncate">
                Consultancy Platform
              </p>
            </div>
          </div>

          {/* Desktop Collapse & Mobile Close Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hidden lg:block"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 lg:hidden"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className={`px-3 py-2.5 bg-slate-50 border-b border-slate-100 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
          <RoleSwitcher />
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 sidebar-scroll">
          
          <p className={`text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 py-1 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
            {language === 'hi' ? 'नेविगेशन मेनू' : 'Main Navigation'}
          </p>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-bold scale-[1.01]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className={`truncate ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${isSidebarCollapsed ? 'lg:hidden' : 'inline'} ${
                    isActive ? 'bg-white text-sky-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* 21 Categories Quick Dropdown */}
          <div className={`pt-2 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <span className="uppercase text-[10px] tracking-widest text-slate-400">
                {language === 'hi' ? '21 मुख्य श्रेणियां' : '21 Core Categories'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoriesOpen && (
              <div className="pl-3 pr-1 py-1 space-y-1 max-h-48 overflow-y-auto sidebar-scroll">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 hover:bg-sky-50 hover:text-sky-700 truncate font-medium block"
                  >
                    • {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer User & Provider Action */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 space-y-2">
          <div className={`p-3 bg-gradient-to-br from-sky-900 to-indigo-900 rounded-2xl text-white space-y-2 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> {language === 'hi' ? 'पार्टनर बनें' : 'Become a Partner'}
            </div>
            <p className="text-[11px] text-sky-100 leading-snug">
              {language === 'hi' ? 'अपनी सेवाएं सूचीबद्ध करें और देश भर से ग्राहक लीड प्राप्त करें।' : 'List your services or products to receive citizen leads nationwide.'}
            </p>
            <button
              onClick={() => handleNavClick('onboarding')}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 shadow"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रदाता पंजीकरण' : 'Provider Onboarding'}</span>
            </button>
          </div>

          {/* User Account Status */}
          {user ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className={`min-w-0 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`}>
                  <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize truncate">{role} Account</p>
                </div>
              </div>

              <button onClick={logoutUser} className={`text-rose-500 hover:text-rose-700 p-1 ${isSidebarCollapsed ? 'lg:hidden' : 'block'}`} title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsLoginModalOpen(true);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span className={isSidebarCollapsed ? 'lg:hidden' : 'inline'}>
                {language === 'hi' ? 'लॉग इन / पंजीकरण' : 'Sign In / Register'}
              </span>
            </button>
          )}
        </div>

      </aside>
    </>
  );
}
