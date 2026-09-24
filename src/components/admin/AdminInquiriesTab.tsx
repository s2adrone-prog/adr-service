import React, { useState, useEffect } from 'react';
import { Inbox, Mail, Phone, Clock, MessageSquare, CheckCircle, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { QuoteRequest, ContactEnquiry } from '../../types';

export const AdminInquiriesTab: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages'>('quotes');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resQ, resE] = await Promise.all([fetch('/api/quotes'), fetch('/api/enquiries')]);
      if (resQ.ok) {
        const dQ = await resQ.json();
        if (dQ.success && dQ.quotes) setQuotes(dQ.quotes);
      }
      if (resE.ok) {
        const dE = await resE.json();
        if (dE.success && dE.enquiries) setEnquiries(dE.enquiries);
      }
    } catch (e) {
      console.warn('Error fetching inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateQuoteStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus as any } : q)));
      }
    } catch (e) {
      console.error('Failed to update quote status:', e);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-cyan-400" />
            <span>Customer Inquiries & Project Leads</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Review client quote requests, project briefs, and messages received through the contact forms.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Selector pills */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'quotes'
              ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Quote Requests ({quotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Messages ({enquiries.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
              No quote requests received yet.
            </div>
          ) : (
            quotes.map((q) => (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 font-bold">{q.id}</span>
                    <span className="text-white font-extrabold text-sm">{q.name}</span>
                    {q.company && <span className="text-slate-400">({q.company})</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                    <select
                      value={q.status}
                      onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-semibold text-xs"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Review">In Review</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{q.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{q.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Service:</span>{' '}
                    <span className="text-cyan-300 font-semibold">{q.serviceCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Tier:</span>{' '}
                    <span className="text-slate-200">{q.packageTier}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-200 leading-relaxed">
                  <span className="font-semibold text-slate-400 block mb-1 text-[11px]">Project Brief:</span>
                  {q.projectDescription}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
              No contact messages received yet.
            </div>
          ) : (
            enquiries.map((e) => (
              <div
                key={e.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 font-bold">{e.id}</span>
                    <span className="text-white font-extrabold text-sm">{e.name}</span>
                    <span className="text-slate-400">({e.email})</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Subject: </span>
                  <span className="text-white font-bold">{e.subject}</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-200 leading-relaxed">
                  {e.message}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
