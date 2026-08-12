import React from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductDetailModal() {
  const { selectedProduct, isProductModalOpen, setIsProductModalOpen, addToCart, setIsCartOpen } = useApp();

  if (!isProductModalOpen || !selectedProduct) return null;

  const handleBuyNow = () => {
    addToCart(selectedProduct);
    setIsProductModalOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6">
        
        <button
          onClick={() => setIsProductModalOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 rounded-full text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Image View */}
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-2">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto object-cover rounded-xl" />
          </div>

          {/* Details Column */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                {selectedProduct.brand}
              </span>
              <h2 className="text-lg font-extrabold text-white mt-1 leading-snug">{selectedProduct.name}</h2>
              
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {selectedProduct.rating} ({selectedProduct.reviewCount} Reviews)
                </span>
                <span className="text-slate-400">SKU: {selectedProduct.sku}</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">₹{selectedProduct.price.toLocaleString()}</span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-slate-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
              )}
              {selectedProduct.discount > 0 && (
                <span className="text-xs text-rose-400 font-bold">({selectedProduct.discount}% OFF)</span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedProduct.description}</p>

            {/* Features */}
            {selectedProduct.features && (
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                {selectedProduct.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-2">
              <div className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-brand-400" /> Fast Express Shipping</div>
              <div className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-amber-400" /> 7 Days Replacement</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
