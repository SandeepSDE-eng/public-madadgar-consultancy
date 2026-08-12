import React from 'react';
import { User, Briefcase, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RoleSwitcher() {
  const { role, handleRoleChange, language } = useApp();

  const roles = [
    { 
      id: 'customer', 
      label: language === 'hi' ? 'ग्राहक' : 'Customer', 
      icon: User 
    },
    { 
      id: 'provider', 
      label: language === 'hi' ? 'प्रदाता' : 'Provider', 
      icon: Briefcase 
    },
    { 
      id: 'admin', 
      label: language === 'hi' ? 'एडमिन' : 'Admin', 
      icon: ShieldCheck 
    }
  ];

  return (
    <div className="w-full bg-slate-200/80 p-1 rounded-xl grid grid-cols-3 gap-1 text-[11px] font-bold shadow-inner">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = role === r.id;
        return (
          <button
            key={r.id}
            onClick={() => handleRoleChange(r.id)}
            className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-sky-600 text-white shadow-sm font-extrabold scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
            }`}
            title={`${r.label} Mode`}
          >
            <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
            <span className="truncate">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
}
