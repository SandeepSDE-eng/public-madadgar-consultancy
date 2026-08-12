import React from 'react';
import { BLOGS } from '../data/mockData';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-brand-950 px-3 py-1 rounded-full border border-brand-800">
          Knowledge & Governance Hub
        </span>
        <h1 className="text-3xl font-extrabold text-white">Latest Legal, Tax & Citizen Guidance Articles</h1>
        <p className="text-xs text-slate-400">Written by certified Chartered Accountants, Advocates, and Public Consultancy Experts.</p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOGS.map((post) => (
          <div key={post.id} className="glass-panel rounded-3xl p-5 border border-slate-800 flex flex-col justify-between glass-panel-hover">
            <div>
              <img src={post.image} alt={post.title} className="w-full h-44 object-cover rounded-2xl mb-4 border border-slate-800" />
              
              <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-2">
                <span className="bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">{post.category}</span>
                <span className="text-slate-400">{post.readTime}</span>
              </div>

              <h2 className="text-base font-extrabold text-white leading-snug hover:text-brand-300 transition-colors">
                {post.title}
              </h2>

              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand-400" /> {post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
