import React, { useState } from 'react';
import { X, Sparkles, Bot, Loader2, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteWithEstimate?: (estimateSummary: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteWithEstimate,
}) => {
  const [serviceType, setServiceType] = useState('logo-design');
  const [projectDetails, setProjectDetails] = useState('');
  const [budget, setBudget] = useState('₹25,000 - ₹50,000');
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDetails.trim()) return;

    setLoading(true);
    setEstimate(null);

    try {
      const res = await fetch('/api/ai-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType, projectDetails, budget }),
      });
      const data = await res.json();
      if (data.success && data.estimate) {
        setEstimate(data.estimate);
      }
    } catch (err) {
      console.error('AI Estimator error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span>Gemini AI Project Architect</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
          Instant AI Project Estimator
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Describe your vision and our AI will generate an instant scope breakdown, stack recommendations, and timeline projection.
        </p>

        <form onSubmit={handleGenerate} className="space-y-4 text-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Service Category</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Logo Design & Brand Identity">Logo Design & Brand Identity</option>
                <option value="Graphic Design & Marketing">Graphic Design & Marketing</option>
                <option value="Corporate Branding System">Corporate Branding System</option>
                <option value="Web & Mobile App Development">Web & Mobile App Development</option>
                <option value="Custom Gifting & Merchandise">Custom Gifting & Merchandise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                <option value="₹2,00,000+ Enterprise">₹2,00,000+ Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">What do you want to create?</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. A fintech cross-platform mobile app with dark blue theme, real-time analytics, and custom logo mascot..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || !projectDetails.trim()}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI Analyzing Requirements...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Instant AI Estimate</span>
              </>
            )}
          </button>
        </form>

        {estimate && (
          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Generated Estimate
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Timeline: {estimate.estimatedTimeline}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Recommended Deliverable Scope</h4>
              <p className="text-sm text-slate-200 mt-1 font-medium">{estimate.projectScope}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Recommended Stack / Assets:</span>
                <p className="text-slate-200 mt-0.5 font-semibold">{estimate.recommendedStackOrMaterials}</p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Estimated Pricing Range:</span>
                <p className="text-emerald-400 font-bold text-sm mt-0.5">{estimate.estimatedPriceRange}</p>
              </div>
            </div>

            {estimate.keyMilestones && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-1.5">Project Phases</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {estimate.keyMilestones.map((m: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {estimate.proTips && (
              <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl text-xs text-indigo-200">
                <span className="font-bold text-indigo-400">Pro Tip: </span>
                {estimate.proTips}
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                if (onOpenQuoteWithEstimate) {
                  onOpenQuoteWithEstimate(`AI Scope: ${estimate.projectScope}`);
                }
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <span>Lock In This Quote & Consult ADR Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
