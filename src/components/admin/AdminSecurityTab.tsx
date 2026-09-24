import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  UserCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';

interface AdminSecurityTabProps {
  currentUser?: { userId: string; role: string } | null;
}

export const AdminSecurityTab: React.FC<AdminSecurityTabProps> = ({ currentUser }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUserId, setNewUserId] = useState(currentUser?.userId || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!currentPassword) {
      setStatusMsg({ type: 'error', text: 'Please enter your current password to authorize changes.' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUserId: newUserId.trim(),
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: 'success',
          text: 'Admin credentials updated successfully! Please note your new credentials for future logins.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to update credentials. Check your current password.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to communicate with server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span>Security & Access Control</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Manage your Admin User ID, change passwords, and view active session details for https://www.adrestore.co.in/user-admin
        </p>
      </div>

      {/* Active Session Info Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span>Active Authenticated Session</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Logged In User</span>
            <span className="text-white font-mono font-bold">{currentUser?.userId || 'admin'}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Role & Permissions</span>
            <span className="text-emerald-400 font-bold">{currentUser?.role || 'Super Administrator'}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Access URL Endpoint</span>
            <span className="text-cyan-400 font-mono text-[11px]">/user-admin</span>
          </div>
        </div>
      </div>

      {/* Change Credentials Form */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-cyan-400" />
            <span>Update User ID & Password</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Modify the credentials required to log into the Admin Studio at <code className="text-cyan-400">/user-admin</code>.
          </p>
        </div>

        {statusMsg && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            )}
            <span className="leading-relaxed font-medium">{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-4">
          {/* User ID */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Admin User ID / Username
            </label>
            <input
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. admin or s2adrone@gmail.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                New Password (leave blank to keep current)
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Current Password Required */}
          <div className="space-y-1.5 pt-4 border-t border-slate-800">
            <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Current Admin Password (Required to authorize change)</span>
            </label>
            <div className="relative max-w-md">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400 focus:outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Default password is <code className="text-slate-400">ADR@Admin2026!</code>.
            </p>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving Changes...' : 'Save New Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
