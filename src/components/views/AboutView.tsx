import React from 'react';
import { Building2, Award, ShieldCheck, Users, Globe, Sparkles } from 'lucide-react';
import { PageRoute } from '../../types';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuote: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center space-x-1.5">
          <Building2 className="w-4 h-4" />
          <span>About ADR E-Store Agency</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Where Creative Artistry Meets Full-Stack Engineering
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Founded with a mission to bridge high-touch visual design and modern full-stack web/mobile application engineering, ADR E-Store empowers global enterprises, startups, and institutions to stand out and scale fast.
        </p>
      </div>

      {/* Story & Mission */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white">Our Journey & Philosophy</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Many traditional agencies specialize in either visual artwork OR technical code. ADR E-Store was created to eliminate that divide. We treat every logo mark as a strategic asset, every React application as a conversion engine, and every piece of corporate merchandise as a physical brand ambassador.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold text-xl block">100%</span>
              <span className="text-slate-400">In-House Execution</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold text-xl block">24/7</span>
              <span className="text-slate-400">Client Support</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-64 md:h-80">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
            alt="ADR Team Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Core Pillars</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Uncompromising Quality</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every vector node, typography spacing, and code line is audited for maximum aesthetic and technical performance.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Complete Transparency</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fixed pricing quotes, clear milestones, and complete copyright ownership assignments.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Users className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-white text-base">Client Partnership</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We work as an extension of your internal marketing and technology teams.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Globe className="w-6 h-6 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Global Scale</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Serving B2B clients across North America, Europe, Asia, and Australia.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Leadership Team</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Driven designers, architects, and merchandise strategists.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              name: 'Adrian Reyes',
              role: 'Founder & Chief Creative Officer',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              bio: '12+ years leading corporate rebrands and digital identity systems.',
            },
            {
              name: 'David Chen',
              role: 'Head of Web & Mobile Engineering',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
              bio: 'Former principal architect specialized in React, TypeScript, and Flutter.',
            },
            {
              name: 'Sophia Patel',
              role: 'Director of Merchandise & Swag Operations',
              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
              bio: 'Expert in print-on-demand fulfillment, DTG apparel, and luxury corporate gifting.',
            },
          ].map((m, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-center">
              <img src={m.img} alt={m.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-cyan-400 shadow-lg" />
              <div>
                <h3 className="font-extrabold text-white text-lg">{m.name}</h3>
                <span className="text-xs font-semibold text-cyan-400 block">{m.role}</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
