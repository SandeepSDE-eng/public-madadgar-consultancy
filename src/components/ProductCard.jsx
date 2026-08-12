import React from 'react';
import { Star, ShoppingBag, Heart, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, setSelectedProduct, setIsProductModalOpen } = useApp();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleProductClick = () => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 glass-panel-hover border border-slate-800 flex flex-col justify-between h-full group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-950 aspect-video sm:aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            onClick={handleProductClick}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />

          {/* Discount Tag */}
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
              {product.discount}% OFF
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-slate-950 rounded-full text-slate-300 hover:text-rose-400 border border-slate-700/80 backdrop-blur-md transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Category & Seller */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
          <span className="font-semibold text-brand-400 truncate">{product.brand}</span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={handleProductClick}
          className="text-xs font-bold text-white leading-snug line-clamp-2 hover:text-brand-300 cursor-pointer transition-colors"
        >
          {product.name}
        </h3>
      </div>

      {/* Pricing & Cart Button */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-white">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[9px] text-emerald-400 font-medium block">
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}
