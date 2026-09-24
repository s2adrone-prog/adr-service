import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteConfig,
  BrandInfoConfig,
  BrandStylesConfig,
  HeroContentConfig,
  TrustGuaranteesConfig,
  BottomCtaConfig,
  ServiceItem,
  PortfolioItem,
  PricingPackage,
  GiftingProduct,
  BlogPost,
} from '../types';
import { DEFAULT_SITE_CONFIG } from '../data/defaultSiteConfig';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  saveConfig: (newConfig?: SiteConfig) => Promise<boolean>;
  updateBrand: (brand: Partial<BrandInfoConfig>) => void;
  updateStyles: (styles: Partial<BrandStylesConfig>) => void;
  updateHero: (hero: Partial<HeroContentConfig>) => void;
  updateGuarantees: (guarantees: Partial<TrustGuaranteesConfig>) => void;
  updateBottomCta: (cta: Partial<BottomCtaConfig>) => void;
  updateServices: (services: ServiceItem[]) => void;
  updatePortfolio: (portfolio: PortfolioItem[]) => void;
  updatePricing: (packages: PricingPackage[]) => void;
  updateGiftingProducts: (products: GiftingProduct[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateFaqs: (faqs: { question: string; answer: string }[]) => void;
  resetToDefaults: () => Promise<void>;
  importConfigJson: (jsonString: string) => Promise<boolean>;
  exportConfigJson: () => string;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'adr_site_config_v2';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    // Initial sync from local storage if available
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load site config from localStorage:', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Fetch latest config from server API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchServerConfig = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/site-config');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.config && isMounted) {
            setConfig((prev) => ({
              ...DEFAULT_SITE_CONFIG,
              ...prev,
              ...data.config,
            }));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.config));
          }
        }
      } catch (err) {
        console.warn('Backend site-config not reachable, using local fallback:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchServerConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  // Apply visual theme styles (Colors, Fonts, Root CSS variables)
  useEffect(() => {
    if (!config?.styles) return;

    const root = document.documentElement;
    root.style.setProperty('--brand-primary', config.styles.primaryColor);
    root.style.setProperty('--brand-secondary', config.styles.secondaryColor);
    root.style.setProperty('--brand-dark-bg', config.styles.darkBgColor);

    // Apply font family attribute
    document.body.dataset.font = config.styles.fontFamily;
  }, [config.styles]);

  // Persist to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    } catch (err) {
      console.warn('Failed to cache site config:', err);
    }
  }, [config]);

  // Save to backend server API
  const saveConfig = useCallback(
    async (overrideConfig?: SiteConfig): Promise<boolean> => {
      const targetConfig = overrideConfig || config;
      setIsSaving(true);
      try {
        const res = await fetch('/api/site-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetConfig),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setLastSavedAt(new Date().toLocaleTimeString());
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(targetConfig));
            return true;
          }
        }
      } catch (err) {
        console.error('Failed to sync site config to server:', err);
      } finally {
        setIsSaving(false);
      }
      // Even if server request failed (offline / local preview), local state is preserved
      setLastSavedAt(new Date().toLocaleTimeString() + ' (Local)');
      return true;
    },
    [config]
  );

  const updateBrand = useCallback((brand: Partial<BrandInfoConfig>) => {
    setConfig((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...brand },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateStyles = useCallback((styles: Partial<BrandStylesConfig>) => {
    setConfig((prev) => ({
      ...prev,
      styles: { ...prev.styles, ...styles },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateHero = useCallback((hero: Partial<HeroContentConfig>) => {
    setConfig((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateGuarantees = useCallback((guarantees: Partial<TrustGuaranteesConfig>) => {
    setConfig((prev) => ({
      ...prev,
      guarantees: { ...prev.guarantees, ...guarantees },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateBottomCta = useCallback((bottomCta: Partial<BottomCtaConfig>) => {
    setConfig((prev) => ({
      ...prev,
      bottomCta: { ...prev.bottomCta, ...bottomCta },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateServices = useCallback((services: ServiceItem[]) => {
    setConfig((prev) => ({
      ...prev,
      services,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updatePortfolio = useCallback((portfolio: PortfolioItem[]) => {
    setConfig((prev) => ({
      ...prev,
      portfolio,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updatePricing = useCallback((pricingPackages: PricingPackage[]) => {
    setConfig((prev) => ({
      ...prev,
      pricingPackages,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateGiftingProducts = useCallback((giftingProducts: GiftingProduct[]) => {
    setConfig((prev) => ({
      ...prev,
      giftingProducts,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateBlogPosts = useCallback((blogPosts: BlogPost[]) => {
    setConfig((prev) => ({
      ...prev,
      blogPosts,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateFaqs = useCallback((faqs: { question: string; answer: string }[]) => {
    setConfig((prev) => ({
      ...prev,
      faqs,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetToDefaults = useCallback(async () => {
    setIsSaving(true);
    try {
      await fetch('/api/site-config/reset', { method: 'POST' });
    } catch (e) {
      console.warn('Failed to call reset API:', e);
    }
    const fresh = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
    fresh.updatedAt = new Date().toISOString();
    setConfig(fresh);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
    setLastSavedAt('Reset to Defaults');
    setIsSaving(false);
  }, []);

  const importConfigJson = useCallback(async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.brand || !parsed.services) {
        throw new Error('Invalid schema: brand or services missing');
      }
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...parsed,
        updatedAt: new Date().toISOString(),
      };
      setConfig(merged);
      await saveConfig(merged);
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  }, [saveConfig]);

  const exportConfigJson = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoading,
        isSaving,
        lastSavedAt,
        saveConfig,
        updateBrand,
        updateStyles,
        updateHero,
        updateGuarantees,
        updateBottomCta,
        updateServices,
        updatePortfolio,
        updatePricing,
        updateGiftingProducts,
        updateBlogPosts,
        updateFaqs,
        resetToDefaults,
        importConfigJson,
        exportConfigJson,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
