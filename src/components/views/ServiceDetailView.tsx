import React, { useState } from 'react';
import {
  PenTool,
  Palette,
  Building2,
  Code,
  Gift,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { ServiceCategory, PageRoute } from '../../types';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface ServiceDetailViewProps {
  category: ServiceCategory;
  onNavigate: (route: PageRoute) => void;
  onOpenQuote: (serviceCategory?: string, packageTier?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  category,
  onNavigate,
  onOpenQuote,
}) => {
  const { config } = useSiteConfig();
  const service = config.services.find((s) => s.category === category) || config.services[0];
  const portfolioItems = config.portfolio.filter((p) => p.category === category);
  const pricingTiers = config.pricingPackages.filter((p) => p.serviceCategory === category);

  const iconMap: Record<string, any> = {
    PenTool,
    Palette,
    Building2,
    Code,
    Gift,
  };
  const IconComponent = iconMap[service.iconName] || Sparkles;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Service Hero Section */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <IconComponent className="w-4 h-4" />
              <span className="capitalize">{service.category.replace('-', ' ')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-cyan-300 font-semibold text-base md:text-lg">
              {service.tagline}
            </p>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuote(service.category)}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl shadow-xl transition-all flex items-center space-x-2 cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request {service.title} Quote</span>
              </button>

              <div className="text-xs text-slate-400 flex items-center space-x-3">
                <a
                  href="mailto:info@adrestore.co.in"
                  className="font-semibold text-cyan-400 hover:underline"
                >
                  info@adrestore.co.in
                </a>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{service.turnaroundTime}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative h-64 md:h-80">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                <span className="text-cyan-400 font-bold block mb-0.5">Guaranteed Deliverable File Suite:</span>
                Vector Source (AI, EPS, SVG), Print PDF & High-Res Transparent PNGs.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialized Content for Logo Design */}
      {category === 'logo-design' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Logo Styles We Master
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Minimal, 3D, Mascot, Luxury, Vintage, and Emblem Logomarks tailored to your brand personality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { style: 'Minimalist & Flat', icon: PenTool, desc: 'Clean vector marks' },
              { style: '3D & Gradient', icon: Layers, desc: 'Dimensional illumination' },
              { style: 'Mascot & Character', icon: Zap, desc: 'Illustrated brand icons' },
              { style: 'Luxury & Crest', icon: Award, desc: 'Embroidery & foil ready' },
              { style: 'Vintage & Retro', icon: Palette, desc: 'Timeless hand-drawn feel' },
              { style: 'Wordmark & Monogram', icon: Building2, desc: 'Typographic precision' },
            ].map((st, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <st.icon className="w-6 h-6 text-cyan-400 mx-auto" />
                <h4 className="font-bold text-white text-xs">{st.style}</h4>
                <p className="text-[10px] text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features & Deliverables Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>Service Capabilities Included</span>
          </h3>
          <ul className="space-y-3">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs md:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Guaranteed Deliverables</span>
          </h3>
          <ul className="space-y-3">
            {service.deliverables.map((del, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs md:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Service Specific Packages */}
      {pricingTiers.length > 0 && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Service Packages
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              {service.title} Packages
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Customized scope & deliverables. Send an enquiry or email us at{' '}
              <a href="mailto:info@adrestore.co.in" className="text-cyan-400 font-semibold hover:underline">
                info@adrestore.co.in
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-slate-900 border rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative shadow-xl ${
                  pkg.popular ? 'border-cyan-400 shadow-cyan-500/10' : 'border-slate-800'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 right-6 bg-cyan-400 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">{pkg.description}</p>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
                    <span className="font-semibold text-cyan-400">Custom Scope</span>
                    <a
                      href="mailto:info@adrestore.co.in"
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Email Enquiry
                    </a>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onOpenQuote(service.category, pkg.name)}
                    className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Enquire for {pkg.name}
                  </button>
                  <a
                    href={`mailto:info@adrestore.co.in?subject=Enquiry%20for%20${encodeURIComponent(service.title)}%20-${encodeURIComponent(pkg.name)}`}
                    className="block w-full text-center py-2 text-xs text-slate-400 hover:text-cyan-400 font-semibold"
                  >
                    Mail: info@adrestore.co.in
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Category Portfolio Gallery */}
      {portfolioItems.length > 0 && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-white">
              Featured {service.title} Portfolio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 space-y-4 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-cover rounded-2xl"
                />
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{item.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((t, i) => (
                    <span key={i} className="bg-slate-950 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
