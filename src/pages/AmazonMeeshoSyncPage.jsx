import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, ShoppingCart, ShieldCheck, CheckCircle2, AlertCircle, Zap, Settings, Key } from 'lucide-react';

export default function AmazonMeeshoSyncPage() {
  const { integrations, setIntegrations, showToast, language } = useApp();

  const [amazonConfig, setAmazonConfig] = useState({
    sellerId: "AMZ-IN-982347",
    mwsAuthToken: "amzn.mws.token.live.89234",
    autoSyncStock: true,
    autoSyncOrders: true,
    lastSync: "2026-08-12 21:15"
  });

  const [meeshoConfig, setMeeshoConfig] = useState({
    supplierId: "MSH-SUP-55421",
    apiKey: "meesho_api_live_998234",
    autoSyncStock: true,
    autoSyncOrders: true,
    lastSync: "2026-08-12 20:45"
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = (platform) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast(language === 'hi' ? `${platform} के लिए मैनुअल सिंक पूरा हुआ! 50+ उत्पाद अपडेट हुए।` : `Manual Sync completed for ${platform}! 50+ Product SKUs updated.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-widest bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
          {language === 'hi' ? 'मल्टी-चैनल एकीकरण परत' : 'Multi-Channel Integration Layer'}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {language === 'hi' ? 'अमेज़न एवं मीशो बाहरी सिंक केंद्र' : 'Amazon & Meesho External Sync Center'}
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          {language === 'hi' 
            ? 'उत्पादों, इन्वेंट्री और ऑर्डर की स्थिति को स्वचालित रूप से सिंक करने के लिए आधिकारिक एसपी-एपीआई और मीशो आपूर्तिकर्ता एपीआई कुंजियां कॉन्फ़िगर करें।' 
            : 'Configure official SP-API & Meesho Supplier API keys to sync products, inventory, and order statuses automatically.'}
        </p>
      </div>

      {/* Sync Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Amazon SP-API Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl border border-amber-300 flex items-center justify-center font-black text-amber-700 text-xl shadow-inner">
                a
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'अमेज़न सेलर सेंट्रल सिंक' : 'Amazon Seller Central Sync'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">Official Selling Partner API (SP-API v2)</p>
              </div>
            </div>

            <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {language === 'hi' ? 'कनेक्टेड' : 'Connected'}
            </span>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Seller ID:</span>
              <span className="font-mono text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{amazonConfig.sellerId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">MWS / SP Auth Token:</span>
              <span className="font-mono text-slate-700 font-bold">••••••••89234</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-600 font-semibold">Last Sync Timestamp:</span>
              <span className="text-slate-900 font-bold">{amazonConfig.lastSync}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={amazonConfig.autoSyncStock}
                onChange={(e) => setAmazonConfig({ ...amazonConfig, autoSyncStock: e.target.checked })}
                className="rounded bg-white border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
              />
              <span>{language === 'hi' ? 'स्टॉक एवं मूल्य ऑटो-सिंक करें' : 'Auto-Sync Stock & Pricing'}</span>
            </label>

            <button
              onClick={() => handleManualSync('Amazon')}
              disabled={isSyncing}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{language === 'hi' ? 'अभी सिंक करें' : 'Force Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Meesho Supplier API Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl border border-pink-300 flex items-center justify-center font-black text-pink-700 text-xl shadow-inner">
                m
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'मीशो आपूर्तिकर्ता सिंक' : 'Meesho Supplier Panel Sync'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">Official Meesho Reseller Supplier API</p>
              </div>
            </div>

            <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {language === 'hi' ? 'कनेक्टेड' : 'Connected'}
            </span>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Supplier ID:</span>
              <span className="font-mono text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{meeshoConfig.supplierId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">API Key Secret:</span>
              <span className="font-mono text-slate-700 font-bold">••••••••998234</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-600 font-semibold">Last Sync Timestamp:</span>
              <span className="text-slate-900 font-bold">{meeshoConfig.lastSync}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={meeshoConfig.autoSyncStock}
                onChange={(e) => setMeeshoConfig({ ...meeshoConfig, autoSyncStock: e.target.checked })}
                className="rounded bg-white border-slate-300 text-pink-600 focus:ring-pink-500 w-4 h-4"
              />
              <span>{language === 'hi' ? 'ऑर्डर एवं रिटर्न ऑटो-सिंक करें' : 'Auto-Sync Orders & Returns'}</span>
            </label>

            <button
              onClick={() => handleManualSync('Meesho')}
              disabled={isSyncing}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{language === 'hi' ? 'अभी सिंक करें' : 'Force Sync Now'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Sync Architecture Logs Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          {language === 'hi' ? 'लाइव सिंक इवेंट लॉग' : 'Live Sync Event Log'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">SKU / Order Ref</th>
                <th className="p-3">Status</th>
                <th className="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 font-medium">
                <td className="p-3 font-extrabold text-amber-700">Amazon SP-API</td>
                <td className="p-3">Inventory Stock Update</td>
                <td className="p-3 font-mono font-bold text-slate-900">BIO-AAD-2026</td>
                <td className="p-3 text-emerald-700 font-extrabold">SUCCESS (45 units)</td>
                <td className="p-3 text-slate-500">2026-08-12 21:15:04</td>
              </tr>
              <tr className="hover:bg-slate-50 font-medium">
                <td className="p-3 font-extrabold text-pink-700">Meesho Supplier</td>
                <td className="p-3">New Order Sync</td>
                <td className="p-3 font-mono font-bold text-slate-900">MSH-ORD-882341</td>
                <td className="p-3 text-emerald-700 font-extrabold">SUCCESS (1 unit)</td>
                <td className="p-3 text-slate-500">2026-08-12 20:45:12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
