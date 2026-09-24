import React, { useState } from 'react';
import { HelpCircle, Award, Check, RefreshCw, Plus, Trash2, ShieldCheck, Megaphone } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const AdminFaqsGuaranteesTab: React.FC = () => {
  const { config, updateFaqs, updateGuarantees, updateBottomCta, isSaving, saveConfig } = useSiteConfig();
  const { faqs, guarantees, bottomCta } = config;

  const [savedNotice, setSavedNotice] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateFaq = (index: number, question: string, answer: string) => {
    const next = [...faqs];
    next[index] = { question, answer };
    updateFaqs(next);
  };

  const handleDeleteFaq = (index: number) => {
    const next = faqs.filter((_, i) => i !== index);
    updateFaqs(next);
  };

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    updateFaqs([...faqs, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <span>FAQs, Guarantees & Call-To-Action</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure trust badges, revision policies, customer FAQs, and bottom conversion banners.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save FAQs & Guarantees'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>FAQs and Guarantees saved successfully!</span>
        </div>
      )}

      {/* Trust Guarantees */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Trust Guarantees & Footer Badges</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guarantee Badge 1</span>
            </label>
            <input
              type="text"
              value={guarantees.guarantee1}
              onChange={(e) => updateGuarantees({ guarantee1: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Guarantee Badge 2 (Revisions Policy)</span>
            </label>
            <input
              type="text"
              value={guarantees.guarantee2}
              onChange={(e) => updateGuarantees({ guarantee2: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm font-semibold text-amber-400"
              placeholder="5 times Revision on Pro & Business Tiers"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Guarantee Badge 3</span>
            </label>
            <input
              type="text"
              value={guarantees.guarantee3}
              onChange={(e) => updateGuarantees({ guarantee3: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-cyan-400" />
          <span>Bottom Conversion Banner</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1.5">Banner Heading Title</label>
            <input
              type="text"
              value={bottomCta.title}
              onChange={(e) => updateBottomCta({ title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Banner Subtitle / Description</label>
            <textarea
              rows={2}
              value={bottomCta.description}
              onChange={(e) => updateBottomCta({ description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">CTA Button Text</label>
            <input
              type="text"
              value={bottomCta.buttonText}
              onChange={(e) => updateBottomCta({ buttonText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>Frequently Asked Questions ({faqs.length})</span>
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleUpdateFaq(idx, e.target.value, faq.answer)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
                  placeholder="Question text..."
                />
                <button
                  onClick={() => handleDeleteFaq(idx)}
                  className="text-rose-400 hover:text-rose-300 font-semibold text-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={faq.answer}
                onChange={(e) => handleUpdateFaq(idx, faq.question, e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                placeholder="Answer text..."
              />
            </div>
          ))}
        </div>

        {/* Add new FAQ */}
        <div className="p-5 bg-slate-950/80 border border-dashed border-slate-800 rounded-2xl space-y-3 text-xs">
          <h4 className="font-bold text-white flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add New FAQ</span>
          </h4>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Question (e.g. What is the revision policy?)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
          />
          <textarea
            rows={2}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Answer (e.g. We provide 5 times revision across our packages)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />
          <button
            onClick={handleAddFaq}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
          >
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
};
