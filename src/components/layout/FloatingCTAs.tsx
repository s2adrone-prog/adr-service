import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Bot, X, Send, Sparkles } from 'lucide-react';

interface FloatingCTAsProps {
  onOpenQuote: () => void;
  onOpenAiAssistant: () => void;
}

export const FloatingCTAs: React.FC<FloatingCTAsProps> = ({
  onOpenQuote,
  onOpenAiAssistant,
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! 👋 Welcome to ADR E-Store. Need a logo, corporate branding, custom web app, or bulk merch quote?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thanks for reaching out! Our team is ready to help with "${userMsg.substring(0, 40)}...". Click 'Get Free Quote' or launch our AI Estimator to lock in custom pricing!`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
      {/* Expanded Quick Chat Drawer */}
      {chatOpen && (
        <div className="pointer-events-auto w-80 md:w-96 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden mb-2 animate-fadeIn text-slate-100">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-950 font-bold">
              <Bot className="w-5 h-5" />
              <span>ADR Live Concierge</span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1 text-slate-950 hover:bg-black/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask a question or request a price..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2 bg-cyan-400 text-slate-950 font-bold rounded-xl hover:bg-cyan-300 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="p-2 bg-slate-950 border-t border-slate-800/80 text-center">
            <button
              onClick={() => {
                setChatOpen(false);
                onOpenQuote();
              }}
              className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center justify-center space-x-1 mx-auto"
            >
              <Sparkles className="w-3 h-3" />
              <span>Launch Instant Quote Form Instead</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="pointer-events-auto flex items-center space-x-2">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/15550192834?text=Hi%20ADR%20E-Store,%20I'd%20like%20to%20get%20a%20free%20quote%20for..."
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
          title="WhatsApp Instant Chat"
        >
          <MessageCircle className="w-6 h-6 fill-slate-950" />
        </a>

        {/* Direct Call Button */}
        <a
          href="tel:+15550192834"
          className="p-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
          title="Call Us Directly"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Direct Email */}
        <a
          href="mailto:info@adrestore.co.in"
          className="p-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
          title="Send Direct Email to info@adrestore.co.in"
        >
          <Mail className="w-5 h-5" />
        </a>

        {/* AI Assistant Chat Toggle */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="p-3.5 bg-gradient-to-tr from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center font-bold"
          title="Live AI Concierge"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
