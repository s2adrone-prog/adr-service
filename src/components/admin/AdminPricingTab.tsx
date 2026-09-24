import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, Check, RefreshCw, Star } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { PricingPackage, ServiceCategory } from '../../types';

export const AdminPricingTab: React.FC = () => {
  const { config, updatePricing, isSaving, saveConfig } = useSiteConfig();
  const { pricingPackages } = config;

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('logo-design');
  const [editingId, setEditingId] = useState<string | null>(pricingPackages[0]?.id || null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newFeatureText, setNewFeatureText] = useState('');

  const filteredPackages = pricingPackages.filter((p) => p.serviceCategory === selectedCategory);
  const activePackage = pricingPackages.find((p) => p.id === editingId) || filteredPackages[0] || pricingPackages[0];

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateActive = (patch: Partial<PricingPackage>) => {
    if (!activePackage) return;
    const updated = pricingPackages.map((p) => (p.id === activePackage.id ? { ...p, ...patch } : p));
    updatePricing(updated);
  };

  const handleAddNewPackage = () => {
    const newId = `pkg-${Date.now()}`;
    const newPkg: PricingPackage = {
      id: newId,
      serviceCategory: selectedCategory,
      name: 'New Custom Package',
      description: 'Engineered for brands needing exceptional quality and fast delivery.',
      deliveryTime: '3-5 Business Days',
      revisions: '5 times Revision',
      popular: false,
      features: [
        'Initial Creative Discovery',
        'High-Resolution Source Files',
        '5 times Revision',
        '100% Full IP Commercial Rights',
      ],
    };
    updatePricing([...pricingPackages, newPkg]);
    setEditingId(newId);
  };

  const handleDeletePackage = (id: string) => {
    if (pricingPackages.length <= 1) {
      alert('You must retain at least one pricing tier.');
      return;
    }
    if (confirm('Delete this package?')) {
      const updated = pricingPackages.filter((p) => p.id !== id);
      updatePricing(updated);
      setEditingId(updated[0].id);
    }
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim() || !activePackage) return;
    handleUpdateActive({ features: [...activePackage.features, newFeatureText.trim()] });
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!activePackage) return;
    handleUpdateActive({ features: activePackage.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Tag className="w-6 h-6 text-cyan-400" />
            <span>Pricing Packages & Revision Cycles</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure tiered packages, turnaround timelines, revision counts (e.g. 5 times Revision), and feature checklists.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewPackage}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Package</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Packages'}</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Pricing packages updated successfully!</span>
        </div>
      )}

      {/* Category selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['logo-design', 'graphic-design', 'web-mobile-apps', 'custom-gifting'] as ServiceCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const firstInCat = pricingPackages.find((p) => p.serviceCategory === cat);
              if (firstInCat) setEditingId(firstInCat.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-400 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {cat.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Packages list for active category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredPackages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setEditingId(pkg.id)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              editingId === pkg.id
                ? 'border-cyan-400 bg-slate-800/90 shadow-md shadow-cyan-500/10'
                : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-white">{pkg.name}</span>
                {pkg.popular && (
                  <span className="px-2 py-0.5 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 rounded-full text-[10px] font-bold">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-[11px] line-clamp-2">{pkg.description}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">{pkg.deliveryTime}</span>
              <span className="text-cyan-400 font-bold">{pkg.revisions}</span>
            </div>
          </button>
        ))}
      </div>

      {activePackage && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>Editing Tier: {activePackage.name}</span>
            </h3>
            <button
              onClick={() => handleDeletePackage(activePackage.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Package Name</label>
              <input
                type="text"
                value={activePackage.name}
                onChange={(e) => handleUpdateActive({ name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Revision Policy <span className="text-cyan-400 font-bold">(e.g. 5 times Revision)</span>
              </label>
              <input
                type="text"
                value={activePackage.revisions}
                onChange={(e) => handleUpdateActive({ revisions: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm font-semibold text-cyan-400"
                placeholder="5 times Revision"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Turnaround Delivery Time</label>
              <input
                type="text"
                value={activePackage.deliveryTime}
                onChange={(e) => handleUpdateActive({ deliveryTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="4 Business Days"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5">Tier Description</label>
              <input
                type="text"
                value={activePackage.description}
                onChange={(e) => handleUpdateActive({ description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!activePackage.popular}
                  onChange={(e) => handleUpdateActive({ popular: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-400 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Highlight as "Most Popular" Tier</span>
                </span>
              </label>
            </div>
          </div>

          {/* Included Features */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Included Features & Deliverables</h4>
            <div className="space-y-2">
              {activePackage.features.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{f}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                placeholder="Add package feature (e.g. 5 times Revision, 6 Initial Concepts)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddFeature}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
