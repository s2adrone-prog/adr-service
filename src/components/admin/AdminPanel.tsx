import React, { useState } from 'react';
import {
  Palette,
  Layout,
  Layers,
  Briefcase,
  Tag,
  Gift,
  BookOpen,
  HelpCircle,
  Inbox,
  Database,
  Eye,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { AdminBrandingStylesTab } from './AdminBrandingStylesTab';
import { AdminHeroTab } from './AdminHeroTab';
import { AdminServicesTab } from './AdminServicesTab';
import { AdminPortfolioTab } from './AdminPortfolioTab';
import { AdminPricingTab } from './AdminPricingTab';
import { AdminGiftingTab } from './AdminGiftingTab';
import { AdminBlogsTab } from './AdminBlogsTab';
import { AdminFaqsGuaranteesTab } from './AdminFaqsGuaranteesTab';
import { AdminInquiriesTab } from './AdminInquiriesTab';
import { AdminBackupTab } from './AdminBackupTab';
import { AdminSecurityTab } from './AdminSecurityTab';
import { LogOut, ShieldCheck as ShieldIcon, User as UserIcon } from 'lucide-react';

interface AdminPanelProps {
  onExit: () => void;
  onLogout: () => void;
  currentUser?: { userId: string; role: string } | null;
}

type AdminTabKey =
  | 'branding-styles'
  | 'hero'
  | 'services'
  | 'portfolio'
  | 'pricing'
  | 'gifting'
  | 'blogs'
  | 'faqs-guarantees'
  | 'inquiries'
  | 'security'
  | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onExit,
  onLogout,
  currentUser,
}) => {
  const { config, isSaving, lastSavedAt, saveConfig } = useSiteConfig();
  const [currentTab, setCurrentTab] = useState<AdminTabKey>('branding-styles');
  const [saveBanner, setSaveBanner] = useState(false);

  const handleGlobalSave = async () => {
    await saveConfig();
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2500);
  };

  const navItems: { id: AdminTabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'branding-styles', label: 'Branding & Styles', icon: <Palette className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero & Headlines', icon: <Layout className="w-4 h-4" /> },
    { id: 'services', label: 'Services Catalog', icon: <Layers className="w-4 h-4" />, badge: `${config.services.length}` },
    { id: 'portfolio', label: 'Portfolio Projects', icon: <Briefcase className="w-4 h-4" />, badge: `${config.portfolio.length}` },
    { id: 'pricing', label: 'Pricing & Revisions', icon: <Tag className="w-4 h-4" />, badge: `${config.pricingPackages.length}` },
    { id: 'gifting', label: 'Merchandise Catalog', icon: <Gift className="w-4 h-4" />, badge: `${config.giftingProducts.length}` },
    { id: 'blogs', label: 'Blog & Articles', icon: <BookOpen className="w-4 h-4" />, badge: `${config.blogPosts.length}` },
    { id: 'faqs-guarantees', label: 'FAQs & Guarantees', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'inquiries', label: 'Leads & Inquiries', icon: <Inbox className="w-4 h-4 text-cyan-400" /> },
    { id: 'security', label: 'Security & Password', icon: <ShieldIcon className="w-4 h-4 text-emerald-400" /> },
    { id: 'backup', label: 'Backup & Restore', icon: <Database className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Return to public live website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Live Site</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-black text-sm tracking-tight">ADR Admin Studio</span>
            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-[10px] font-bold">
              CMS v2.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {currentUser && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs">
              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300 font-mono font-medium">{currentUser.userId}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">({currentUser.role || 'Admin'})</span>
            </div>
          )}

          {lastSavedAt && (
            <span className="text-[11px] text-slate-400 hidden xl:inline">
              Saved: <span className="text-slate-200">{lastSavedAt}</span>
            </span>
          )}

          <button
            onClick={onExit}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={handleGlobalSave}
            disabled={isSaving}
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'Saving...' : 'Publish Live'}</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 sm:py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Sign out of Admin Studio"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Global save banner */}
      {saveBanner && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-2.5 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>All updates have been saved to the backend & applied live across your entire site!</span>
        </div>
      )}

      {/* Main Admin Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 bg-slate-900/60 border-r border-slate-800/80 p-4 sm:p-5 flex-shrink-0">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-3">
            CMS Controls
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick info box */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Reactivity</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every content edit, image swap, or style tweak updates the public site instantly.
            </p>
          </div>
        </aside>

        {/* Content Tab View */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl overflow-y-auto">
          {currentTab === 'branding-styles' && <AdminBrandingStylesTab />}
          {currentTab === 'hero' && <AdminHeroTab />}
          {currentTab === 'services' && <AdminServicesTab />}
          {currentTab === 'portfolio' && <AdminPortfolioTab />}
          {currentTab === 'pricing' && <AdminPricingTab />}
          {currentTab === 'gifting' && <AdminGiftingTab />}
          {currentTab === 'blogs' && <AdminBlogsTab />}
          {currentTab === 'faqs-guarantees' && <AdminFaqsGuaranteesTab />}
          {currentTab === 'inquiries' && <AdminInquiriesTab />}
          {currentTab === 'security' && <AdminSecurityTab currentUser={currentUser} />}
          {currentTab === 'backup' && <AdminBackupTab />}
        </main>
      </div>
    </div>
  );
};
