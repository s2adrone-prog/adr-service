import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit3, Check, RefreshCw, Upload, Image } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { PortfolioItem, ServiceCategory } from '../../types';

export const AdminPortfolioTab: React.FC = () => {
  const { config, updatePortfolio, isSaving, saveConfig } = useSiteConfig();
  const { portfolio } = config;

  const [editingId, setEditingId] = useState<string | null>(portfolio[0]?.id || null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [newResultText, setNewResultText] = useState('');

  const activeProject = portfolio.find((p) => p.id === editingId) || portfolio[0];

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateActive = (patch: Partial<PortfolioItem>) => {
    if (!activeProject) return;
    const updated = portfolio.map((p) => (p.id === activeProject.id ? { ...p, ...patch } : p));
    updatePortfolio(updated);
  };

  const handleAddNewProject = () => {
    const newId = `port-custom-${Date.now()}`;
    const newProject: PortfolioItem = {
      id: newId,
      title: 'New Featured Case Study',
      category: 'logo-design',
      client: 'Acme Global Ventures',
      year: new Date().getFullYear().toString(),
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
      summary: 'Complete brand overhaul and custom digital asset suite driving accelerated market adoption.',
      challenge: 'Needed a scalable visual identity system that differentiated from legacy competitors.',
      solution: 'Crafted a modern logomark, unified typography palette, and responsive digital UI kit.',
      results: ['+140% Qualified Inbound Inquiries', '100% Client Satisfaction Score', '5 times revision rounds included'],
      tags: ['Branding', 'Logo Design', 'UI/UX'],
    };
    updatePortfolio([newProject, ...portfolio]);
    setEditingId(newId);
  };

  const handleDeleteProject = (id: string) => {
    if (portfolio.length <= 1) {
      alert('You must retain at least one portfolio item.');
      return;
    }
    if (confirm('Are you sure you want to delete this case study?')) {
      const updated = portfolio.filter((p) => p.id !== id);
      updatePortfolio(updated);
      setEditingId(updated[0].id);
    }
  };

  const handleAddTag = () => {
    if (!newTagText.trim() || !activeProject) return;
    handleUpdateActive({ tags: [...activeProject.tags, newTagText.trim()] });
    setNewTagText('');
  };

  const handleRemoveTag = (index: number) => {
    if (!activeProject) return;
    handleUpdateActive({ tags: activeProject.tags.filter((_, i) => i !== index) });
  };

  const handleAddResult = () => {
    if (!newResultText.trim() || !activeProject) return;
    handleUpdateActive({ results: [...activeProject.results, newResultText.trim()] });
    setNewResultText('');
  };

  const handleRemoveResult = (index: number) => {
    if (!activeProject) return;
    handleUpdateActive({ results: activeProject.results.filter((_, i) => i !== index) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeProject) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateActive({ image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span>Portfolio & Case Studies Manager</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage your client showcase, before/after images, outcome metrics, and testimonials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewProject}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Project</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Portfolio'}</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Portfolio saved successfully!</span>
        </div>
      )}

      {/* Project Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {portfolio.map((p) => (
          <button
            key={p.id}
            onClick={() => setEditingId(p.id)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden group ${
              editingId === p.id
                ? 'border-cyan-400 bg-slate-800/90 shadow-md shadow-cyan-500/10'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block truncate">
                {p.category}
              </span>
              <h4 className="text-xs font-extrabold text-white line-clamp-2 mt-0.5">{p.title}</h4>
            </div>
            <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate">{p.client}</span>
              <span>{p.year}</span>
            </div>
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <img src={p.image} alt="" className="w-full h-full object-cover" />
            </div>
          </button>
        ))}
      </div>

      {activeProject && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>Editing: {activeProject.title}</span>
            </h3>
            <button
              onClick={() => handleDeleteProject(activeProject.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5">Project Title</label>
              <input
                type="text"
                value={activeProject.title}
                onChange={(e) => handleUpdateActive({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Category</label>
              <select
                value={activeProject.category}
                onChange={(e) => handleUpdateActive({ category: e.target.value as ServiceCategory })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"
              >
                <option value="logo-design">Logo Design</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="web-mobile-apps">Web & Mobile Apps</option>
                <option value="custom-gifting">Custom Gifting</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Client / Brand Name</label>
              <input
                type="text"
                value={activeProject.client}
                onChange={(e) => handleUpdateActive({ client: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Year Completed</label>
              <input
                type="text"
                value={activeProject.year}
                onChange={(e) => handleUpdateActive({ year: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 font-semibold mb-1.5">Executive Summary</label>
              <textarea
                rows={2}
                value={activeProject.summary}
                onChange={(e) => handleUpdateActive({ summary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">The Challenge</label>
                <textarea
                  rows={3}
                  value={activeProject.challenge}
                  onChange={(e) => handleUpdateActive({ challenge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Our Solution</label>
                <textarea
                  rows={3}
                  value={activeProject.solution}
                  onChange={(e) => handleUpdateActive({ solution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Project Image asset */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              <span>Project Feature Artwork / Cover Image</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
              <div className="md:col-span-8 space-y-3">
                <input
                  type="text"
                  value={activeProject.image}
                  onChange={(e) => handleUpdateActive({ image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl bg-slate-950/60 cursor-pointer text-slate-300 hover:text-white">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Local Project Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="md:col-span-4 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={activeProject.image} alt="Project" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Outcome metrics */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Client Key Results & Metrics</h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.results.map((r, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-cyan-300 font-semibold flex items-center gap-2"
                >
                  <span>{r}</span>
                  <button
                    onClick={() => handleRemoveResult(idx)}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <input
                type="text"
                value={newResultText}
                onChange={(e) => setNewResultText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddResult()}
                placeholder="Add result metric (e.g. +40% First-Month Conversions)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddResult}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Technology & Deliverable Tags</h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300 flex items-center gap-2"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(idx)}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <input
                type="text"
                value={newTagText}
                onChange={(e) => setNewTagText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tag (e.g. Brand Identity, 3D Packaging)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
