import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ShieldCheck,
  Award,
  Globe,
} from 'lucide-react';
import { PageRoute } from '../../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
      }
    } catch (err) {
      console.error(err);
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Callout Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Stay Ahead of Digital Trends</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Subscribe to ADR Insights
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Get monthly strategy breakdowns on brand design, high-converting React apps, and custom corporate merchandise trends.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 p-4 rounded-2xl border border-emerald-500/40 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are subscribed to ADR Insights!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 min-w-[240px]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80 text-sm">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20">
                ADR
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                ADR <span className="text-cyan-400 font-light">E-Store</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Transforming creative ideas into high-converting brands, modern web & mobile applications, and custom print-on-demand corporate gifting solutions globally.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Hridaypur, Netaji Subhas Road, Kolkata - 700127</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+917003477334" className="hover:text-cyan-400 transition-colors">+91 7003477334</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:info@adrestore.co.in" className="hover:text-cyan-400 transition-colors font-medium">
                  info@adrestore.co.in
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('service-logo-design')} className="hover:text-cyan-400 transition-colors text-left">
                  Logo Design & Identity
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-graphic-design')} className="hover:text-cyan-400 transition-colors text-left">
                  Graphic & Marketing Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-web-mobile-apps')} className="hover:text-cyan-400 transition-colors text-left">
                  Web & Mobile Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-custom-gifting')} className="hover:text-cyan-400 transition-colors text-left">
                  Custom Gifting & Merchandise
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4 border-l-2 border-indigo-400 pl-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-cyan-400 transition-colors">
                  Portfolio Showcase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-cyan-400 transition-colors">
                  Blog & Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantees */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              Our Guarantees
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Commercial Copyright Ownership Transfer</span>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Unlimited Revisions on Pro & Business Tiers</span>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Global Express Merchandise & Swag Shipping</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold rounded-xl border border-slate-700 transition-colors text-xs"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">ADR E-Store</span>. All Rights Reserved. Designed & Engineered with precision.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
