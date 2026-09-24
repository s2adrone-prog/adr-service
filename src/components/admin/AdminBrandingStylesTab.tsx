import React, { useState } from 'react';
import { Palette, Building2, Phone, Mail, MapPin, Globe, Sparkles, Image, Check, RefreshCw } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const AdminBrandingStylesTab: React.FC = () => {
  const { config, updateBrand, updateStyles, isSaving, saveConfig } = useSiteConfig();
  const { brand, styles } = config;

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Color Presets
  const COLOR_PRESETS = [
    { name: 'Electric Cyan', primary: '#06b6d4', secondary: '#3b82f6', gradient: 'from-cyan-400 via-sky-400 to-blue-600' },
    { name: 'Emerald Mint', primary: '#10b981', secondary: '#059669', gradient: 'from-emerald-400 via-teal-400 to-cyan-600' },
    { name: 'Violet Nebula', primary: '#8b5cf6', secondary: '#ec4899', gradient: 'from-violet-500 via-purple-500 to-pink-500' },
    { name: 'Sunset Amber', primary: '#f59e0b', secondary: '#ea580c', gradient: 'from-amber-400 via-orange-500 to-rose-600' },
    { name: 'Rose Luxury', primary: '#f43f5e', secondary: '#be123c', gradient: 'from-rose-400 via-pink-500 to-indigo-600' },
    { name: 'Royal Sapphire', primary: '#2563eb', secondary: '#4f46e5', gradient: 'from-blue-500 via-indigo-500 to-violet-600' },
  ];

  // Dark Background Presets
  const BG_PRESETS = [
    { name: 'Deep Midnight', value: '#0a1128' },
    { name: 'Obsidian Slate', value: '#020617' },
    { name: 'Pitch Black', value: '#09090b' },
    { name: 'Dark Charcoal', value: '#121212' },
    { name: 'Deep Indigo', value: '#0f172a' },
  ];

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Palette className="w-6 h-6 text-cyan-400" />
            <span>Branding, Theme Styles & Contact Details</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Customize your agency brand identity, color scheme, background shade, and global contact information.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Branding & Styles'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Branding & Styles saved and applied live across all pages!</span>
        </div>
      )}

      {/* Section 1: Agency Brand Information */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
          <span>Agency Brand Profile</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Agency Name</label>
            <input
              type="text"
              value={brand.name}
              onChange={(e) => updateBrand({ name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="e.g. ADR E-Store"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Brand Tagline</label>
            <input
              type="text"
              value={brand.tagline}
              onChange={(e) => updateBrand({ tagline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="e.g. Creative Digital Agency"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1.5">Company Description / Mission</label>
            <textarea
              rows={3}
              value={brand.description}
              onChange={(e) => updateBrand({ description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm leading-relaxed"
              placeholder="Short agency mission used in footer and about pages..."
            />
          </div>
        </div>

        {/* Logo Icon settings */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-white font-bold text-sm block">Show Rounded Logo Badge Icon</span>
            <span className="text-slate-400 text-xs">
              Toggle the rounded gradient icon box next to the text logo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={brand.logoIconText || 'ADR'}
              onChange={(e) => updateBrand({ logoIconText: e.target.value })}
              className="w-20 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs text-center font-bold"
              placeholder="Text"
            />
            <button
              onClick={() => updateBrand({ showLogoIcon: !brand.showLogoIcon })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                brand.showLogoIcon
                  ? 'bg-cyan-400 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {brand.showLogoIcon ? 'Icon Badge Enabled' : 'Icon Badge Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Global Contact & Operating Information */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Phone className="w-5 h-5 text-cyan-400" />
          <span>Contact & Operating Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Phone Support</span>
            </label>
            <input
              type="text"
              value={brand.phone}
              onChange={(e) => updateBrand({ phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="+91 7003477334"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Phone Support Hours</label>
            <input
              type="text"
              value={brand.phoneHours}
              onChange={(e) => updateBrand({ phoneHours: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="Mon - Fri: 10am - 8pm IST"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Primary Consultation Email</span>
            </label>
            <input
              type="email"
              value={brand.email}
              onChange={(e) => updateBrand({ email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="info@adrestore.co.in"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">WhatsApp Contact Number</label>
            <input
              type="text"
              value={brand.whatsappNumber}
              onChange={(e) => updateBrand({ whatsappNumber: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="+91 7003477334"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Studio / Office Physical Address</span>
            </label>
            <input
              type="text"
              value={brand.address}
              onChange={(e) => updateBrand({ address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="ADR E-Store, Hridaypur, Netaji Subhas Road, Kolkata - 700127"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Visual Theme Styles & Color Palette */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>Color Palette & Dark Mode Theme</span>
        </h3>

        {/* Color presets */}
        <div>
          <label className="block text-slate-300 font-semibold text-xs mb-3">Quick Color Theme Presets</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  updateStyles({
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                    accentGradient: preset.gradient,
                  })
                }
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  styles.primaryColor === preset.primary
                    ? 'border-cyan-400 bg-slate-800/80 shadow-md shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                </div>
                <div className="text-[11px] font-bold text-white truncate">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom hex colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Primary Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={styles.primaryColor}
                onChange={(e) => updateStyles({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer p-1"
              />
              <input
                type="text"
                value={styles.primaryColor}
                onChange={(e) => updateStyles({ primaryColor: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Secondary Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={styles.secondaryColor}
                onChange={(e) => updateStyles({ secondaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer p-1"
              />
              <input
                type="text"
                value={styles.secondaryColor}
                onChange={(e) => updateStyles({ secondaryColor: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Dark Canvas Shade</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={styles.darkBgColor}
                onChange={(e) => updateStyles({ darkBgColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer p-1"
              />
              <select
                value={styles.darkBgColor}
                onChange={(e) => updateStyles({ darkBgColor: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
              >
                {BG_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.name} ({p.value})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Font and Shape styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Typography Pairing</label>
            <select
              value={styles.fontFamily}
              onChange={(e) => updateStyles({ fontFamily: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            >
              <option value="sans">Modern Sans (Clean & Precision Tech)</option>
              <option value="display">Display Grotesk (High-Impact Agency)</option>
              <option value="serif">Editorial Serif (Luxury & Refined)</option>
              <option value="mono">Technical Geometric Mono</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Corner Radius Archetype</label>
            <select
              value={styles.borderRadius}
              onChange={(e) => updateStyles({ borderRadius: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            >
              <option value="rounded-lg">Subtle Compact (rounded-lg 8px)</option>
              <option value="rounded-xl">Standard Modern (rounded-xl 12px)</option>
              <option value="rounded-2xl">Smooth Precision (rounded-2xl 16px)</option>
              <option value="rounded-3xl">Ultra Curvature (rounded-3xl 24px)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Navigation Bar Glass Style</label>
            <select
              value={styles.headerStyle}
              onChange={(e) => updateStyles({ headerStyle: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            >
              <option value="glass">Frosted Glass Blur Backdrop</option>
              <option value="solid">High-Contrast Solid Slate</option>
              <option value="transparent">Minimal Floating Transparent</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
