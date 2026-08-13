import React, { useState, useEffect } from 'react';
import { PageRoute, ServiceCategory } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingCTAs } from './components/layout/FloatingCTAs';
import { QuoteModal } from './components/common/QuoteModal';
import { SearchModal } from './components/common/SearchModal';
import { AiAssistantModal } from './components/common/AiAssistantModal';

import { HomeView } from './components/views/HomeView';
import { ServiceDetailView } from './components/views/ServiceDetailView';
import { CustomGiftingCustomizer } from './components/views/CustomGiftingCustomizer';
import { PortfolioView } from './components/views/PortfolioView';
import { AboutView } from './components/views/AboutView';
import { BlogView } from './components/views/BlogView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteDefaultService, setQuoteDefaultService] = useState('logo-design');
  const [quoteDefaultPackage, setQuoteDefaultPackage] = useState('');

  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Scroll to top on route change
  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceCategory?: string, packageTier?: string) => {
    if (serviceCategory) setQuoteDefaultService(serviceCategory);
    if (packageTier) setQuoteDefaultPackage(packageTier);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithAiScope = (aiSummary: string) => {
    setQuoteModalOpen(true);
  };

  // Keyboard shortcut Cmd+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 font-sans selection:bg-cyan-400 selection:text-slate-950 ${
        isDarkMode
          ? 'bg-[#0a1128] text-slate-100'
          : 'bg-slate-900 text-slate-100'
      }`}
    >
      {/* Sticky Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenQuote={handleOpenQuote}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Primary Page Views */}
      <main className="min-h-[80vh]">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
            onOpenAiAssistant={() => setAiAssistantOpen(true)}
          />
        )}

        {currentRoute === 'service-logo-design' && (
          <ServiceDetailView
            category="logo-design"
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentRoute === 'service-graphic-design' && (
          <ServiceDetailView
            category="graphic-design"
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentRoute === 'service-corporate-branding' && (
          <ServiceDetailView
            category="corporate-branding"
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentRoute === 'service-web-mobile-apps' && (
          <ServiceDetailView
            category="web-mobile-apps"
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentRoute === 'service-custom-gifting' && (
          <CustomGiftingCustomizer onOpenQuote={handleOpenQuote} />
        )}

        {currentRoute === 'portfolio' && (
          <PortfolioView onOpenQuote={handleOpenQuote} />
        )}

        {currentRoute === 'about' && (
          <AboutView onNavigate={navigateTo} onOpenQuote={handleOpenQuote} />
        )}

        {currentRoute === 'blog' && (
          <BlogView onNavigate={navigateTo} onOpenQuote={handleOpenQuote} />
        )}

        {currentRoute === 'contact' && <ContactView />}

        {currentRoute === 'privacy' && <LegalView type="privacy" />}

        {currentRoute === 'terms' && <LegalView type="terms" />}
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={navigateTo} onOpenQuote={handleOpenQuote} />

      {/* Floating CTAs (WhatsApp, Phone, Email, Live Chat) */}
      <FloatingCTAs
        onOpenQuote={handleOpenQuote}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={quoteDefaultService}
        defaultPackage={quoteDefaultPackage}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigateTo}
      />

      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onOpenQuoteWithEstimate={handleOpenQuoteWithAiScope}
      />
    </div>
  );
}
