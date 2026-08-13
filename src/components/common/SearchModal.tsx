import React, { useState } from 'react';
import { X, Search, ArrowRight, Layers, FileText, Gift, FolderGit2 } from 'lucide-react';
import { PageRoute } from '../../types';
import { SERVICES_DATA, PORTFOLIO_DATA, BLOG_POSTS, GIFTING_PRODUCTS } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredServices = SERVICES_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPortfolio = PORTFOLIO_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlogs = BLOG_POSTS.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGifts = GIFTING_PRODUCTS.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl text-slate-100">
        <div className="flex items-center border-b border-slate-800 pb-3 px-2">
          <Search className="w-5 h-5 text-cyan-400 mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search services, portfolio, blog posts, gifting products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm md:text-base"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto mt-3 space-y-4 pr-1 text-xs md:text-sm">
          {/* Quick Pages */}
          {!query && (
            <div>
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Quick Shortcuts</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => {
                    onNavigate('portfolio');
                    onClose();
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200"
                >
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  <span>Portfolio Gallery</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('service-custom-gifting');
                    onClose();
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200"
                >
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>Custom Gifting</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    onClose();
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Contact & Enquiry</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('blog');
                    onClose();
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Blog & Insights</span>
                </button>
              </div>
            </div>
          )}

          {/* Service Results */}
          {filteredServices.length > 0 && (
            <div>
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Services</span>
              <div className="space-y-1 mt-1">
                {filteredServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigate(`service-${s.category}` as PageRoute);
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-cyan-400">{s.title}</div>
                      <div className="text-slate-400 text-xs line-clamp-1">{s.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Results */}
          {filteredPortfolio.length > 0 && (
            <div>
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Portfolio Case Studies</span>
              <div className="space-y-1 mt-1">
                {filteredPortfolio.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate('portfolio');
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-cyan-400">{p.title}</div>
                      <div className="text-slate-400 text-xs line-clamp-1">{p.summary}</div>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded ml-2">{p.year}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Gifting Results */}
          {filteredGifts.length > 0 && (
            <div>
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Print & Custom Gifting</span>
              <div className="space-y-1 mt-1">
                {filteredGifts.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      onNavigate('service-custom-gifting');
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2">
                      <img src={g.image} alt={g.name} className="w-8 h-8 rounded object-cover" />
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-amber-400">{g.name}</div>
                        <div className="text-slate-400 text-xs">Min. Order: {g.minQuantity} units</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Results */}
          {filteredBlogs.length > 0 && (
            <div>
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Articles & Guides</span>
              <div className="space-y-1 mt-1">
                {filteredBlogs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onNavigate('blog');
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-cyan-400">{b.title}</div>
                      <div className="text-slate-400 text-xs">{b.readTime} • {b.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
