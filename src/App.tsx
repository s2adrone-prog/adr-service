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
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';

const isUserAdminUrl = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/user-admin' ||
    path.startsWith('/user-admin') ||
    hash === '#user-admin' ||
    hash === '#/user-admin'
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    if (isUserAdminUrl()) {
      return 'admin';
    }
    return 'home';
  });

  const [adminUser, setAdminUser] = useState<{ userId: string; role: string } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored =
          localStorage.getItem('adr_admin_session') ||
          sessionStorage.getItem('adr_admin_session');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.user?.userId) {
            return parsed.user;
          }
        }
      } catch (e) {
        // ignore parse error
      }
    }
    return null;
  });

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteDefaultService, setQuoteDefaultService] = useState('logo-design');
  const [quoteDefaultPackage, setQuoteDefaultPackage] = useState('');

  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Scroll to top or target element on route change
  const navigateTo = (route: PageRoute, targetId?: string) => {
    setCurrentRoute(route);
    if (route === 'admin') {
      if (typeof window !== 'undefined' && window.location.pathname !== '/user-admin') {
        window.history.pushState(null, '', '/user-admin');
      }
    } else {
      if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('user-admin')) {
        window.history.pushState(null, '', '/');
      }
      if (typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('user-admin')) {
        window.location.hash = '';
      }
    }

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExitAdmin = () => {
    setCurrentRoute('home');
    if (typeof window !== 'undefined') {
      if (window.location.pathname.toLowerCase().includes('user-admin')) {
        window.history.pushState(null, '', '/');
      }
      if (window.location.hash.toLowerCase().includes('user-admin')) {
        window.location.hash = '';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adr_admin_session');
      sessionStorage.removeItem('adr_admin_session');
    }
    setAdminUser(null);
  };

  const handleOpenQuote = (serviceCategory?: string, packageTier?: string) => {
    if (serviceCategory) setQuoteDefaultService(serviceCategory);
    if (packageTier) setQuoteDefaultPackage(packageTier);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithAiScope = (aiSummary: string) => {
    setQuoteModalOpen(true);
  };

  // Keyboard shortcut Cmd+K for Search and listen to location change for /user-admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    const handleLocationChange = () => {
      if (isUserAdminUrl()) {
        setCurrentRoute('admin');
      } else if (currentRoute === 'admin') {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [currentRoute]);

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 font-sans selection:bg-cyan-400 selection:text-slate-950 ${
        isDarkMode
          ? 'bg-[#0a1128] text-slate-100'
          : 'bg-slate-900 text-slate-100'
      }`}
    >
      {currentRoute === 'admin' ? (
        !adminUser ? (
          <AdminLogin
            onLoginSuccess={(user) => setAdminUser(user)}
            onExit={handleExitAdmin}
          />
        ) : (
          <AdminPanel
            onExit={handleExitAdmin}
            onLogout={handleAdminLogout}
            currentUser={adminUser}
          />
        )
      ) : (
        <>
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
        </>
      )}

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
