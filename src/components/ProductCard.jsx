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
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md flex flex-col justify-between h-full group transition-shadow">
      <div>
        {/* Product Image & Badges */}
        <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-50 aspect-video sm:aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            onClick={handleProductClick}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 cursor-pointer mix-blend-multiply"
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
            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full text-slate-400 hover:text-rose-500 border border-slate-200 shadow-sm backdrop-blur-md transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Category & Seller */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
          <span className="font-semibold text-sky-600 truncate">{product.brand}</span>
          <span className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3 h-3 fill-amber-500" /> {product.rating}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={handleProductClick}
          className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 hover:text-sky-600 cursor-pointer transition-colors"
        >
          {product.name}
        </h3>
      </div>

      {/* Pricing & Cart Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[9px] text-emerald-600 font-medium block mt-0.5">
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
