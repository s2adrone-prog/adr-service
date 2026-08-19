import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  PenTool,
  Palette,
  Building2,
  Code,
  Gift,
  Zap,
  ShieldCheck,
  Award,
  ChevronDown,
  Search,
  MessageSquare,
  Bot,
} from 'lucide-react';
import { PageRoute } from '../../types';
import {
  SERVICES_DATA,
  PORTFOLIO_DATA,
  TESTIMONIALS_DATA,
  FAQS,
  TECH_STACK,
} from '../../data/mockData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuote: (serviceCategory?: string) => void;
  onOpenAiAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenAiAssistant,
}) => {
  const [activePortfolioTab, setActivePortfolioTab] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredPortfolio =
    activePortfolioTab === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((p) => p.category === activePortfolioTab);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-24 pb-16">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>ADR E-Store Digital Agency & Custom Gifting</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Transforming Ideas into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Powerful Brands
                </span>{' '}
                & Digital Experiences.
              </h1>

              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                ADR E-Store is a full-service creative agency offering custom logo design, graphic collateral, corporate branding identity, high-performance web/mobile applications, and bespoke print-on-demand gifting solutions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer text-sm"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get a Free Quote</span>
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold rounded-2xl border border-slate-700/80 transition-all hover:border-cyan-400 flex items-center justify-center space-x-2 cursor-pointer text-sm"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Book a Consultation</span>
                </button>

                <button
                  onClick={onOpenAiAssistant}
                  className="w-full sm:w-auto px-5 py-4 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 font-bold rounded-2xl border border-indigo-700/50 transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AI Estimator</span>
                </button>
              </div>


            </div>

            {/* Right Column: Interactive Showcase / Card Stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    ADR Studio Engine v4.2
                  </span>
                </div>

                {/* Hero Feature Showcase Cards */}
                <div className="mt-6 space-y-4">
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <PenTool className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Logo & Brand Identity</div>
                        <div className="text-xs text-slate-400">Vector AI, EPS, 3D Mockups</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      3-5 Days
                    </span>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <Code className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">React Web & Mobile Apps</div>
                        <div className="text-xs text-slate-400">TypeScript, Flutter, Express API</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                      High Speed
                    </span>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Custom Gifting & Merchandise</div>
                        <div className="text-xs text-slate-400">T-shirts, Mugs, Welcome Swag Kits</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                      Print-on-Demand
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                  <button
                    onClick={() => onNavigate('service-custom-gifting')}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center justify-center space-x-1 mx-auto"
                  >
                    <span>Try Interactive 3D Merch Customizer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED SERVICES ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Our Core Specializations
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Digital & Print Agency Services
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            From iconic visual identity creation to high-scale software development and branded merchandise fulfillment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const iconMap: Record<string, any> = {
              PenTool: PenTool,
              Palette: Palette,
              Building2: Building2,
              Code: Code,
              Gift: Gift,
            };
            const IconComponent = iconMap[service.iconName] || Sparkles;

            return (
              <div
                key={service.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden"
              >
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                    Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shadow-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-semibold text-cyan-400">
                    Tailored Solutions
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenQuote(service.category)}
                      className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-400 text-cyan-400 hover:text-slate-950 text-xs font-bold rounded-xl transition-all"
                    >
                      Enquire
                    </button>
                    <button
                      onClick={() => onNavigate(`service-${service.category}` as PageRoute)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center space-x-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="bg-slate-950/80 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
                Why ADR E-Store
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Designed for Brands That Refuse to Compromise
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                We combine creative agency artistry with full-stack engineering discipline to deliver end-to-end digital assets and tangible corporate merchandise.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-lg"
                >
                  Start Your Project Today
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Rapid Turnaround</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Logos delivered in 3-5 days; full web apps in 2-4 weeks with clear milestone updates.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Full Copyright Transfer</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  100% full intellectual property and commercial source file ownership transferred to you.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Unlimited Revisions</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We refine until your vector assets and software interfaces match your exact standard.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">In-House Print & Merch</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Seamless print-on-demand fulfillment for hoodies, drinkware, and corporate welcome swag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PORTFOLIO SHOWCASE & BEFORE/AFTER ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
              Proven Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2">
              Recent Case Studies & Transformations
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActivePortfolioTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activePortfolioTab === 'all'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setActivePortfolioTab('web-mobile-apps')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activePortfolioTab === 'web-mobile-apps'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Apps
            </button>
            <button
              onClick={() => setActivePortfolioTab('corporate-branding')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activePortfolioTab === 'corporate-branding'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Branding
            </button>
            <button
              onClick={() => setActivePortfolioTab('custom-gifting')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activePortfolioTab === 'custom-gifting'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Custom Merch
            </button>
          </div>
        </div>

        {/* Featured Interactive Before / After Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                Interactive Before / After Redesign Comparison
              </span>
              <h3 className="text-2xl font-black text-white">Nexus Fintech Redesign</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Slide the control handle below to compare the original legacy payment portal against the new high-converting dark-navy mobile app and brand ecosystem created by ADR E-Store.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">Conversion Lift</span>
                  <span className="text-emerald-400 font-extrabold text-lg">+184% Signups</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">App Store Rating</span>
                  <span className="text-amber-400 font-extrabold text-lg">4.9 / 5.0</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
                afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                beforeLabel="Legacy Portal"
                afterLabel="ADR Redesign"
              />
            </div>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPortfolio.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('portfolio')}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-800">
                  {item.client}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-950 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PROCESS TIMELINE ---------------- */}
      <section className="bg-slate-950/90 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
              Our Execution Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Discover → Design → Develop → Deliver
            </h2>
            <p className="text-slate-400 text-xs md:text-sm">
              A transparent 4-stage process ensuring precision quality and zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative space-y-3">
              <span className="text-3xl font-black text-cyan-400/30">01</span>
              <h3 className="text-lg font-bold text-white">Discover</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Deep-dive project brief, target market analysis, moodboard alignment, and technical specification.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative space-y-3">
              <span className="text-3xl font-black text-cyan-400/30">02</span>
              <h3 className="text-lg font-bold text-white">Design</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vector logo crafting, typography mapping, interactive UI wireframes, and merchandise proofs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative space-y-3">
              <span className="text-3xl font-black text-cyan-400/30">03</span>
              <h3 className="text-lg font-bold text-white">Develop</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clean TypeScript code, mobile app compiling, database integration, or high-precision DTG merchandise printing.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative space-y-3">
              <span className="text-3xl font-black text-cyan-400/30">04</span>
              <h3 className="text-lg font-bold text-white">Deliver</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Source file handover, full copyright assignment, production deployment, or tracked doorstep swag shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TECH STACK SHOWCASE ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Modern Engineering Stack
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Built with Leading Enterprise Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-center space-x-2 text-slate-200 text-xs font-bold hover:border-cyan-400 transition-colors"
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CLIENT TESTIMONIALS ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Verified Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-white">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-4 shadow-xl relative"
            >
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed italic">
                "{t.content}"
              </p>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center space-x-1">
                    <span>{t.name}</span>
                    {t.verified && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="text-xs text-slate-400">
                    {t.role}, <span className="text-slate-300 font-semibold">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ SECTION ---------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-white">Got Questions? We Have Answers</h2>

          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-200 hover:text-cyan-400 text-sm transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-cyan-400' : 'text-slate-500'
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-800/80 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FINAL CTA BANNER ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 rounded-3xl p-8 md:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Ready to Launch Your Brand & Digital Experience?
            </h2>
            <p className="text-slate-900/90 text-sm md:text-base font-medium">
              Get in touch today for a free custom quote, brand audit, or software estimate from our creative team.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-900 text-cyan-400 font-extrabold rounded-2xl text-sm shadow-xl transition-all"
              >
                Request Free Quote Now
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-white/20 hover:bg-white/30 text-slate-950 font-extrabold rounded-2xl text-sm backdrop-blur-md transition-all"
              >
                Contact Our Agency
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
