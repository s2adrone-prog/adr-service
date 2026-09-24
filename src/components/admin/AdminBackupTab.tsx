import React, { useState } from 'react';
import { Database, Download, Upload, RotateCcw, Check, Copy, AlertTriangle } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const AdminBackupTab: React.FC = () => {
  const { exportConfigJson, importConfigJson, resetToDefaults, lastSavedAt } = useSiteConfig();
  const [importText, setImportText] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExportDownload = () => {
    const dataStr = exportConfigJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adr-site-config-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ text: 'Site configuration backup downloaded successfully!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportConfigJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = async () => {
    if (!importText.trim()) return;
    const ok = await importConfigJson(importText);
    if (ok) {
      setStatusMsg({ text: 'Configuration imported and applied live successfully!' });
      setImportText('');
    } else {
      setStatusMsg({ text: 'Invalid JSON configuration schema.', isError: true });
    }
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          const ok = await importConfigJson(reader.result);
          if (ok) {
            setStatusMsg({ text: `Backup file "${file.name}" restored successfully!` });
          } else {
            setStatusMsg({ text: 'Failed to parse JSON file.', isError: true });
          }
          setTimeout(() => setStatusMsg(null), 3500);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all content, styles, and images to factory defaults?')) {
      await resetToDefaults();
      setStatusMsg({ text: 'Site reset to factory defaults.' });
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Database className="w-6 h-6 text-cyan-400" />
            <span>Site Backup, Restore & Reset</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Export a full snapshot of your website contents, import backup files, or restore default configurations.
          </p>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            statusMsg.isError
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
          }`}
        >
          {statusMsg.isError ? <AlertTriangle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Export Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-cyan-400" />
          <span>Export Site Configuration (JSON)</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Download a complete backup JSON containing your branding, hero copy, services, portfolio case studies,
          pricing packages, merchandise catalog, blog posts, and theme styles.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportDownload}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup File (.json)</span>
          </button>
          <button
            onClick={handleCopyJson}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON to Clipboard'}</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-cyan-400" />
          <span>Import Site Configuration (Restore)</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Upload a previously exported backup file or paste your JSON configuration below to restore your website.
        </p>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-2xl bg-slate-950/60 cursor-pointer text-slate-300 hover:text-white transition-colors">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-xs">Select JSON backup file from computer</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="relative">
            <textarea
              rows={4}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Or paste JSON configuration here..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={handleImportSubmit}
            disabled={!importText.trim()}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-400 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Apply Pasted Configuration</span>
          </button>
        </div>
      </div>

      {/* Factory Reset */}
      <div className="bg-slate-900 border border-rose-950/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-rose-400 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-rose-400" />
          <span>Reset to Factory Defaults</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Restore all original agency settings, default contact info, services, mock portfolio, and pricing packages.
        </p>
        <button
          onClick={handleReset}
          className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Content & Styles to Default</span>
        </button>
      </div>
    </div>
  );
};
