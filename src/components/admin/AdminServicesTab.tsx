import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit3, Check, RefreshCw, Upload, Image, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { ServiceItem, ServiceCategory } from '../../types';

export const AdminServicesTab: React.FC = () => {
  const { config, updateServices, isSaving, saveConfig } = useSiteConfig();
  const { services } = config;

  const [editingId, setEditingId] = useState<string | null>(services[0]?.id || null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newDeliverableText, setNewDeliverableText] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');

  const activeService = services.find((s) => s.id === editingId) || services[0];

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateActive = (patch: Partial<ServiceItem>) => {
    if (!activeService) return;
    const updated = services.map((s) => (s.id === activeService.id ? { ...s, ...patch } : s));
    updateServices(updated);
  };

  const handleAddNewService = () => {
    const newId = `service-custom-${Date.now()}`;
    const newService: ServiceItem = {
      id: newId,
      category: 'graphic-design',
      title: 'New Creative Service',
      tagline: 'High-Impact Brand Strategy & Execution',
      description: 'Comprehensive design and consulting service crafted to scale your business.',
      iconName: 'Sparkles',
      features: ['Dedicated Project Lead', '5 times Revision Cycles', 'HD Source Files'],
      deliverables: ['Vector Assets', 'Commercial Copyright License'],
      turnaroundTime: '3-5 Business Days',
      heroImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    };
    updateServices([...services, newService]);
    setEditingId(newId);
  };

  const handleDeleteService = (id: string) => {
    if (services.length <= 1) {
      alert('You must retain at least one active service.');
      return;
    }
    if (confirm('Are you sure you want to delete this service?')) {
      const updated = services.filter((s) => s.id !== id);
      updateServices(updated);
      setEditingId(updated[0].id);
    }
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableText.trim() || !activeService) return;
    handleUpdateActive({
      deliverables: [...activeService.deliverables, newDeliverableText.trim()],
    });
    setNewDeliverableText('');
  };

  const handleRemoveDeliverable = (index: number) => {
    if (!activeService) return;
    const next = activeService.deliverables.filter((_, i) => i !== index);
    handleUpdateActive({ deliverables: next });
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim() || !activeService) return;
    handleUpdateActive({
      features: [...activeService.features, newFeatureText.trim()],
    });
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!activeService) return;
    const next = activeService.features.filter((_, i) => i !== index);
    handleUpdateActive({ features: next });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeService) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateActive({ heroImage: reader.result });
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
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>Services Catalog Manager</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Edit service offerings, taglines, deliverables, turnaround times, images, and package details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewService}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Service</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Services'}</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Services updated successfully!</span>
        </div>
      )}

      {/* Services Tabs / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setEditingId(s.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              editingId === s.id
                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {activeService && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>Editing Service: {activeService.title}</span>
            </h3>
            <button
              onClick={() => handleDeleteService(activeService.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Service Title</label>
              <input
                type="text"
                value={activeService.title}
                onChange={(e) => handleUpdateActive({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Tagline / Subheading</label>
              <input
                type="text"
                value={activeService.tagline}
                onChange={(e) => handleUpdateActive({ tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Turnaround Time</label>
              <input
                type="text"
                value={activeService.turnaroundTime}
                onChange={(e) => handleUpdateActive({ turnaroundTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="e.g. 2-4 Business Days"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Starting Price (Optional)</label>
              <input
                type="text"
                value={activeService.startingPrice || ''}
                onChange={(e) => handleUpdateActive({ startingPrice: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="e.g. ₹9,999"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5">Service Overview Description</label>
              <textarea
                rows={3}
                value={activeService.description}
                onChange={(e) => handleUpdateActive({ description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              <span>Service Hero Banner Image</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
              <div className="md:col-span-8 space-y-3">
                <input
                  type="text"
                  value={activeService.heroImage}
                  onChange={(e) => handleUpdateActive({ heroImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs"
                  placeholder="https://..."
                />
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl bg-slate-950/60 cursor-pointer text-slate-300 hover:text-white">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Local Banner Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="md:col-span-4 h-28 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={activeService.heroImage} alt="Service banner" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Deliverables List */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Deliverables List</h4>
            <div className="flex flex-wrap gap-2">
              {activeService.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center gap-2"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveDeliverable(idx)}
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
                value={newDeliverableText}
                onChange={(e) => setNewDeliverableText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDeliverable()}
                placeholder="Add deliverable (e.g. 100% Vector AI/EPS)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddDeliverable}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Features List */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Features & Capabilities</h4>
            <div className="flex flex-wrap gap-2">
              {activeService.features.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center gap-2"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveFeature(idx)}
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
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                placeholder="Add feature (e.g. 5 times Revision Cycles)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddFeature}
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
