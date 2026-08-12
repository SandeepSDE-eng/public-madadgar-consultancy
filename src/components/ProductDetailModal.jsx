import React from 'react';
import { 
  X, Star, ShieldCheck, ShoppingBag, Truck, CheckCircle2, Handshake, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductDetailModal() {
  const { 
    selectedProduct, setSelectedProduct, 
    isProductModalOpen, setIsProductModalOpen, 
    addToCart, setIsMediatorModalOpen, language 
  } = useApp();

  if (!isProductModalOpen || !selectedProduct) return null;

  const title = language === 'hi' ? (selectedProduct.name_hi || selectedProduct.name) : selectedProduct.name;
  const desc = language === 'hi' ? (selectedProduct.description_hi || selectedProduct.description) : selectedProduct.description;
  const features = language === 'hi' ? (selectedProduct.features_hi || selectedProduct.features) : selectedProduct.features;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    setIsProductModalOpen(false);
  };

  const handleMediatorOrder = () => {
    setIsProductModalOpen(false);
    setIsMediatorModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 p-5 space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => setIsProductModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image & Details Header */}
        <div className="flex items-start gap-4 pr-8">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-md shrink-0"
          />

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {selectedProduct.brand}
              </span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {selectedProduct.rating}
              </span>
            </div>

            <h2 className="text-base font-black text-slate-900 leading-snug">{title}</h2>
            <p className="text-[11px] text-slate-500 font-bold">SKU: {selectedProduct.sku}</p>
          </div>
        </div>

        {/* Price & Stock Box */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">{language === 'hi' ? 'मूल्य' : 'Offer Price'}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">₹{selectedProduct.price.toLocaleString()}</span>
              {selectedProduct.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
              )}
              {selectedProduct.discount && (
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  {selectedProduct.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold">{language === 'hi' ? 'डिलीवरी' : 'Delivery'}</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 justify-end">
              <Truck className="w-3.5 h-3.5" /> Free Express Delivery
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{language === 'hi' ? 'उत्पाद विवरण' : 'Description'}</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            {desc}
          </p>
        </div>

        {/* Key Features */}
        {features && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{language === 'hi' ? 'मुख्य विशेषताएं' : 'Key Specifications'}</h3>
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              {features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Add to Cart vs Order via Mediator */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleMediatorOrder}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Handshake className="w-4 h-4 text-slate-950" />
            <span>{language === 'hi' ? 'मध्यस्थ सहायता से ऑर्डर' : 'Order via Mediator'}</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow shadow-sky-600/20"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
