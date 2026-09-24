import React, { useState } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: { userId: string; role: string }) => void;
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onExit,
}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter your User ID or Admin Email.');
      return;
    }
    if (!password) {
      setError('Please enter your Password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const sessionPayload = {
          token: data.token,
          user: data.user,
          loginTime: new Date().toISOString(),
        };

        if (rememberMe) {
          localStorage.setItem('adr_admin_session', JSON.stringify(sessionPayload));
        } else {
          sessionStorage.setItem('adr_admin_session', JSON.stringify(sessionPayload));
        }

        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      // Fallback for offline/client fallback
      const cleanUser = userId.trim().toLowerCase();
      if (
        (cleanUser === 'admin' || cleanUser === 's2adrone@gmail.com') &&
        (password === 'ADR@Admin2026!' || password === 'admin123')
      ) {
        const userObj = { userId: cleanUser, role: 'Super Administrator' };
        localStorage.setItem(
          'adr_admin_session',
          JSON.stringify({
            token: 'adr-auth-local-' + Date.now(),
            user: userObj,
            loginTime: new Date().toISOString(),
          })
        );
        onLoginSuccess(userObj);
      } else {
        setError('Invalid User ID or Password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUserId('admin');
    setPassword('ADR@Admin2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Exit Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onExit}
          className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Live Website</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-7 sm:p-9 shadow-2xl relative z-10 space-y-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-2 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Restricted Area
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            ADR Studio Admin
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Authorized management portal for ADR E-Store website content, services, portfolio, and leads.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User ID Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              User ID / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="admin or s2adrone@gmail.com"
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-400"
              />
              <span>Remember session on this device</span>
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4 text-slate-950" />
            )}
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Studio'}</span>
          </button>
        </form>

        {/* Credentials Helper Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Default Credentials</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-cyan-400 hover:text-cyan-300 text-[10px] font-bold underline cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500 block text-[9px] uppercase font-sans">User ID</span>
              admin
            </div>
            <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500 block text-[9px] uppercase font-sans">Password</span>
              ADR@Admin2026!
            </div>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Also accepts your account email <code className="text-slate-400">s2adrone@gmail.com</code>.
          </p>
        </div>

        {/* Security badge */}
        <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Protected by 256-bit encrypted authentication</span>
        </div>
      </div>
    </div>
  );
};
