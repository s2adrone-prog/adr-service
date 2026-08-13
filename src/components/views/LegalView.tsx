import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms';
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center space-x-1.5">
          {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>Legal & Governance</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="text-slate-400 text-xs">Last updated: July 2026</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-3xl space-y-6 text-slate-300 text-xs md:text-sm leading-relaxed">
        {type === 'privacy' ? (
          <>
            <h2 className="text-lg font-bold text-white">1. Data Collection & Usage</h2>
            <p>
              ADR E-Store respects client confidentiality. When you submit a quote request, custom merchandise order, or contact enquiry, we collect essential contact information (name, email, phone number, company name) solely for project estimation and fulfillment purposes.
            </p>

            <h2 className="text-lg font-bold text-white">2. Artwork & IP Security</h2>
            <p>
              All client logos, vector assets, and custom design files uploaded to ADR E-Store remain 100% confidential. We never resell, license, or publish client vector assets without explicit written authorization.
            </p>

            <h2 className="text-lg font-bold text-white">3. Third-Party Services</h2>
            <p>
              We integrate secure payment processors, cloud hosting (Cloud Run, Vercel), and shipping logistics partners to process merchandise orders. Your data is encrypted in transit and at rest.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-white">1. Scope of Services</h2>
            <p>
              ADR E-Store provides creative digital agency services including Logo Design, Graphic Design, Corporate Branding Systems, Web & Mobile Application Development, and Custom Print-On-Demand Gifting.
            </p>

            <h2 className="text-lg font-bold text-white">2. Intellectual Property Ownership</h2>
            <p>
              Upon receipt of final project payment, ADR E-Store assigns full commercial copyright ownership and title of all final vector graphics, brand books, and compiled software code repositories to the client.
            </p>

            <h2 className="text-lg font-bold text-white">3. Revisions & Approvals</h2>
            <p>
              Revision cycles vary by package tier. For custom gifting orders, digital 3D pre-production proofs must be explicitly approved by the client prior to mass physical printing.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
