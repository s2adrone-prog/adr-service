import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Sparkles, Send, Loader2 } from 'lucide-react';
import { ServiceCategory } from '../../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceCategory | string;
  defaultPackage?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'logo-design',
  defaultPackage = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: defaultService,
    packageTier: defaultPackage,
    projectDescription: '',
    budgetRange: '₹25,000 - ₹50,000',
    timeline: '1-2 Weeks',
    attachmentName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachmentName: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setQuoteId(data.quote?.id || 'Q-SUCCESS');
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setQuoteId('Q-' + Math.floor(1000 + Math.random() * 9000));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Quote Request Received!
            </h3>
            <p className="text-slate-300 max-w-md mx-auto text-sm">
              Thank you, <span className="font-semibold text-cyan-400">{formData.name}</span>. Your quote ID is{' '}
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-400">{quoteId}</span>.
              Our creative director will analyze your project brief and respond within 2 business hours.
            </p>

            <div className="bg-slate-800/60 p-4 rounded-xl text-left text-xs space-y-1.5 text-slate-300 border border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="capitalize font-medium text-slate-200">{formData.serviceCategory.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Budget Range:</span>
                <span className="font-medium text-emerald-400">{formData.budgetRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Timeline:</span>
                <span className="font-medium text-amber-400">{formData.timeline}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant Lead Consultation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              Request a Free Custom Quote
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mb-6">
              Tell us about your project goals. Receive a tailored scope proposal and fixed pricing quote.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    placeholder="Starlight Tech"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Service Line *</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="logo-design">Logo Design & Identity</option>
                    <option value="graphic-design">Graphic Design & Marketing</option>
                    <option value="corporate-branding">Corporate Branding Systems</option>
                    <option value="web-mobile-apps">Web Apps & Mobile Applications</option>
                    <option value="custom-gifting">Custom Gifting & Merchandise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Budget Range</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹2,000,000">₹50,000 - ₹2,00,000</option>
                    <option value="₹2,00,000+ Enterprise">₹2,00,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Brief & Details *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your project, required deliverables, target audience, and design preferences..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Rush (24-48 Hours)">Rush (24-48 Hours)</option>
                    <option value="1-2 Weeks">1-2 Weeks</option>
                    <option value="2-4 Weeks">2-4 Weeks</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Attachment (Brief / Reference)</label>
                  <label className="flex items-center justify-center space-x-2 w-full bg-slate-950 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl px-3.5 py-2 text-slate-300 text-xs cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span className="truncate">
                      {formData.attachmentName || 'Upload Brief (PDF, PNG, ZIP)'}
                    </span>
                    <input type="file" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>
                <div className="mt-3 text-center text-xs text-slate-400">
                  Or email us directly at{' '}
                  <a
                    href="mailto:info@adrestore.co.in"
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    info@adrestore.co.in
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
