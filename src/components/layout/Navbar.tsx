import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Search,
  PenTool,
  Palette,
  Building2,
  Code,
  Gift,
  Sun,
  Moon,
  Bot,
} from 'lucide-react';
import { PageRoute } from '../../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, targetId?: string) => void;
  onOpenQuote: (service?: string) => void;
  onOpenAiAssistant: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenQuote,
  onOpenAiAssistant,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    {
      route: 'service-logo-design' as PageRoute,
      label: 'Logo Design & Identity',
      desc: 'Minimal, 3D, Mascot & Luxury logos',
      icon: PenTool,
      color: 'text-cyan-400',
    },
    {
      route: 'service-graphic-design' as PageRoute,
      label: 'Graphic Design',
      desc: 'Social media, flyers, packaging & print',
      icon: Palette,
      color: 'text-sky-400',
    },
    {
      route: 'service-web-mobile-apps' as PageRoute,
      label: 'Web Apps & Mobile',
      desc: 'React web apps, Flutter & iOS/Android',
      icon: Code,
      color: 'text-emerald-400',
    },
    {
      route: 'service-custom-gifting' as PageRoute,
      label: 'Custom Gifting & Merchandise',
      desc: 'Print-on-demand t-shirts, mugs & swag kits',
      icon: Gift,
      color: 'text-amber-400',
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-left group"
        >
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                ADR <span className="text-cyan-400 font-light">E-Store</span>
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block -mt-1">
              Creative Digital Agency
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentRoute === 'home' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Home
          </button>

          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
                currentRoute.startsWith('service-') ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdown && (
              <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl mt-1 space-y-1 backdrop-blur-xl animate-fadeIn z-50">
                {serviceLinks.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.route}
                      onClick={() => {
                        onNavigate(item.route);
                        setServicesDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 transition-all flex items-start space-x-3 group"
                    >
                      <div className={`p-2 rounded-lg bg-slate-800/80 ${item.color} group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 text-xs group-hover:text-white">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-tight">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('portfolio')}
            className={`px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentRoute === 'portfolio' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Portfolio
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentRoute === 'about' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => onNavigate('blog')}
            className={`px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentRoute === 'blog' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentRoute === 'contact' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors"
            title="Search Services (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors"
            title="Toggle theme mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenu(false);
              }}
              className="p-2 rounded bg-slate-900 text-slate-200 text-left font-semibold"
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate('portfolio');
                setMobileMenu(false);
              }}
              className="p-2 rounded bg-slate-900 text-slate-200 text-left font-semibold"
            >
              Portfolio
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenu(false);
              }}
              className="p-2 rounded bg-slate-900 text-slate-200 text-left font-semibold"
            >
              About Us
            </button>

            <button
              onClick={() => {
                onNavigate('blog');
                setMobileMenu(false);
              }}
              className="p-2 rounded bg-slate-900 text-slate-200 text-left font-semibold"
            >
              Blog & News
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenu(false);
              }}
              className="p-2 rounded bg-slate-900 text-slate-200 text-left font-semibold"
            >
              Contact Us
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">Our Service Lines</span>
            <div className="space-y-1.5">
              {serviceLinks.map((s) => (
                <button
                  key={s.route}
                  onClick={() => {
                    onNavigate(s.route);
                    setMobileMenu(false);
                  }}
                  className="w-full p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-left flex items-center space-x-2 text-xs font-medium text-slate-200"
                >
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
