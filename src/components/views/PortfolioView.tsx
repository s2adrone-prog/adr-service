import React, { useState } from 'react';
import {
  FolderGit2,
  SlidersHorizontal,
  X,
  ExternalLink,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/mockData';
import { PortfolioItem, ServiceCategory } from '../../types';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

interface PortfolioViewProps {
  onOpenQuote: (serviceCategory?: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredProjects =
    activeCategory === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center space-x-1.5">
          <FolderGit2 className="w-4 h-4" />
          <span>Case Studies & Portfolio</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Our Work & Client Transformations
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Explore our recent digital agency projects across brand design, SaaS web apps, mobile solutions, and custom corporate merchandise.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'logo-design', label: 'Logo Design' },
            { id: 'graphic-design', label: 'Graphic Design' },
            { id: 'web-mobile-apps', label: 'Web & Mobile Apps' },
            { id: 'custom-gifting', label: 'Custom Merch' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProject(item)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-2xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-950/90 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-800">
                {item.client}
              </span>
              <span className="absolute top-3 right-3 bg-slate-950/90 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-full border border-slate-800">
                {item.year}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-950 text-slate-400 text-[10px] px-2.5 py-0.5 rounded-md border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 my-8 space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                {selectedProject.client} • {selectedProject.year}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {selectedProject.title}
              </h2>
            </div>

            {/* Before / After Slider if images present */}
            {selectedProject.beforeImage && selectedProject.afterImage ? (
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-bold block">
                  Interactive Before & After Comparison:
                </span>
                <BeforeAfterSlider
                  beforeImage={selectedProject.beforeImage}
                  afterImage={selectedProject.afterImage}
                />
              </div>
            ) : (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-slate-800"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm uppercase">The Challenge</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.challenge}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-cyan-400 text-sm uppercase">ADR Solution</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {selectedProject.results && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-extrabold text-white text-xs uppercase">Key Metric Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {selectedProject.results.map((res, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.testimonial && (
              <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-500/30 text-xs space-y-1">
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <p className="text-slate-200 italic">"{selectedProject.testimonial.quote}"</p>
                <div className="text-slate-400 font-bold">
                  — {selectedProject.testimonial.author}, {selectedProject.testimonial.role}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedProject(null);
                onOpenQuote(selectedProject.category);
              }}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-colors"
            >
              Get Similar Results for Your Brand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
