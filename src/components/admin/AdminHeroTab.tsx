import React, { useState } from 'react';
import { Layout, Sparkles, Image, Check, RefreshCw, Eye, Upload } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const AdminHeroTab: React.FC = () => {
  const { config, updateHero, isSaving, saveConfig } = useSiteConfig();
  const { hero } = config;

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateHero({ heroImage: reader.result });
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
            <Layout className="w-6 h-6 text-cyan-400" />
            <span>Homepage Hero Section & Headlines</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Edit the main banner, hero headline words, paragraph description, CTA button, and hero visual showcase.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Hero Changes'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Hero content updated and live across your homepage!</span>
        </div>
      )}

      {/* Hero Copy Editor */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>Hero Copy & Headlines</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Floating Hero Badge Text</label>
            <input
              type="text"
              value={hero.badgeText}
              onChange={(e) => updateHero({ badgeText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="e.g. ADR E-Store Digital Agency & Custom Gifting"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Headline Prefix</label>
              <input
                type="text"
                value={hero.titlePrefix}
                onChange={(e) => updateHero({ titlePrefix: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="Transforming Ideas into"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Headline Highlight <span className="text-cyan-400">(Gradient Text)</span>
              </label>
              <input
                type="text"
                value={hero.titleHighlight}
                onChange={(e) => updateHero({ titleHighlight: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm font-bold text-cyan-400"
                placeholder="Powerful Brands"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Headline Suffix</label>
              <input
                type="text"
                value={hero.titleSuffix}
                onChange={(e) => updateHero({ titleSuffix: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="& Digital Experiences"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Hero Body Paragraph</label>
            <textarea
              rows={3}
              value={hero.paragraph}
              onChange={(e) => updateHero({ paragraph: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm leading-relaxed"
              placeholder="Agency overview narrative..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Primary CTA Button Label</label>
              <input
                type="text"
                value={hero.ctaButtonText}
                onChange={(e) => updateHero({ ctaButtonText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="Book a Consultation"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Primary CTA Button Target</label>
              <select
                value={hero.ctaButtonTarget}
                onChange={(e) => updateHero({ ctaButtonTarget: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
              >
                <option value="contact">Contact & Enquiry Form</option>
                <option value="portfolio">Portfolio Case Studies</option>
                <option value="services">Services Catalog</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Image Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Image className="w-5 h-5 text-cyan-400" />
          <span>Hero Visual & Showcase Asset</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Image URL</label>
              <input
                type="text"
                value={hero.heroImage}
                onChange={(e) => updateHero({ heroImage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Or Upload Image from Device</label>
              <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-2xl bg-slate-950/60 cursor-pointer transition-colors text-slate-300 hover:text-white">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-xs">Choose local file (PNG, JPG, WebP)</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="lg:col-span-5">
            <label className="block text-slate-300 font-semibold mb-1.5">Current Hero Image Preview</label>
            <div className="h-44 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
              <img
                src={hero.heroImage}
                alt="Hero preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                <span className="text-[10px] text-cyan-300 font-mono truncate">Live Hero Asset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
