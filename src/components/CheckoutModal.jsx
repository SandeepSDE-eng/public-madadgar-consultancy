import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Truck, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckoutModal() {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, triggerConfetti, showToast, setCart } = useApp();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'upi'
  });

  const [isPlaced, setIsPlaced] = useState(false);

  if (!isCheckoutOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.addressLine) return;

    setIsPlaced(true);
    triggerConfetti();
    showToast('Order Placed Successfully! Tracking details sent via SMS & WhatsApp.', 'success');

    setTimeout(() => {
      setCart([]);
      setIsPlaced(false);
      setIsCheckoutOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6">
        
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 rounded-full text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isPlaced ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-white">Order Confirmed!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you for shopping at Public Madadgar Marketplace. Your order invoice and tracking ID have been generated.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Secure Checkout
              </span>
              <h2 className="text-lg font-extrabold text-white mt-1">Shipping & Payment Details</h2>
              <p className="text-xs text-slate-400">Order Payable Total: <span className="text-amber-400 font-bold">₹{total.toLocaleString()}</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Receiver Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ankit Sharma"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 12345"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Shipping Address *</label>
              <input
                type="text"
                required
                placeholder="House No, Street, Landmark"
                value={address.addressLine}
                onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">Payment Gateway Gateway</span>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['UPI / GPay', 'Cards / NetBanking', 'Cash on Delivery'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setAddress({ ...address, paymentMethod: m })}
                    className={`p-2 rounded-xl border text-center font-semibold text-[11px] ${
                      address.paymentMethod === m ? 'bg-brand-950 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-all"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Pay ₹{total.toLocaleString()} & Complete Order</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
