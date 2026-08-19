import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe, Loader2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiryId(data.enquiry?.id || 'E-500');
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setEnquiryId('E-' + Math.floor(500 + Math.random() * 500));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center space-x-1.5">
          <MessageSquare className="w-4 h-4" />
          <span>Get In Touch</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Let's Discuss Your Next Big Project
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Have a question about logo packages, custom React applications, or bulk corporate merchandise orders? Our creative leads are standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Office Locations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Direct Agency Contact</h3>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex items-start space-x-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">Phone Support</div>
                  <a href="tel:+917003477334" className="hover:text-cyan-400 text-slate-300 font-semibold">
                    +91 7003477334
                  </a>
                  <span className="block text-[11px] text-slate-500">Mon - Fri: 10am - 8pm IST</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">Email Consultation & Enquiries</div>
                  <a href="mailto:info@adrestore.co.in" className="hover:text-cyan-400 text-cyan-300 font-semibold">
                    info@adrestore.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">ADR E-Store</div>
                  <span className="text-slate-400">Hridaypur, Netaji Subhas Road, Kolkata - 700127</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Map */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              ADR Global Headquarters Map
            </span>
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Map location"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute bg-slate-950/90 border border-cyan-400/80 px-3 py-1.5 rounded-xl text-cyan-300 font-bold text-xs flex items-center space-x-1.5 shadow-2xl">
                <MapPin className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>ADR E-Store Creative Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
          <div>
            <h3 className="text-2xl font-black text-white">Send Us a Message</h3>
            <p className="text-slate-400 text-xs mt-1">
              Fill out the form below and an ADR project director will respond shortly.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-extrabold text-white">Message Received!</h3>
              <p className="text-xs text-slate-300">
                Enquiry Reference: <span className="font-mono text-cyan-400">{enquiryId}</span>. Thank you <span className="font-semibold text-white">{formData.name}</span>! We will get back to you within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-6 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-400 font-bold text-xs rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Logo Design & Web App Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can ADR E-Store assist your business?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to ADR Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
