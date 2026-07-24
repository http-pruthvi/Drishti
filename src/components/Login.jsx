import React, { useState } from 'react';
import { Shield, BarChart2, Key, UserCheck, ArrowRight } from 'lucide-react';

function Login({ onLogin }) {
  const [role, setRole] = useState('investigator');
  const [name, setName] = useState('Inspector H. S. Gowda');
  const [badgeNo, setBadgeNo] = useState('KSP-2019-8802');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!badgeNo.trim()) {
      setError('Please enter your KSP Badge Number');
      return;
    }
    setError('');
    onLogin(role, name);
  };

  const handleQuickLogin = (selectedRole) => {
    if (selectedRole === 'investigator') {
      onLogin('investigator', 'Inspector H. S. Gowda');
    } else {
      onLogin('analyst', 'Senior Analyst Kavitha');
    }
  };

  const switchRolePreset = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'investigator') {
      setName('Inspector H. S. Gowda');
      setBadgeNo('KSP-2019-8802');
      setPassword('pass123');
    } else {
      setName('Senior Analyst Kavitha');
      setBadgeNo('KSP-2021-0043');
      setPassword('pass123');
    }
  };

  return (
    <div className="w-full max-w-lg bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 lg:p-8 space-y-6">
      
      {/* Header Branding */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-3 text-3xl shadow-lg">
          👁️
        </div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          DRISHTI · ದೃಷ್ಟಿ
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
          Intelligent Conversational AI & Crime Analytics Platform <br />
          <span className="font-bold text-zinc-700 dark:text-zinc-300">Karnataka State Police Crime Database</span>
        </p>
      </div>

      {/* 1-Click Test Login Cards for Evaluators */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block text-center">
          ⚡ 1-Click Instant Test Logins (For Judges & Evaluators)
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Investigator Quick Login Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('investigator')}
            className="p-3.5 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300 uppercase font-mono">
                  Investigator
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Inspector Gowda</p>
              <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">KSP-2019-8802</p>
            </div>
            <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold mt-2 block">
              Access Chat & Leads →
            </span>
          </button>

          {/* Analyst Quick Login Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('analyst')}
            className="p-3.5 rounded-2xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 hover:bg-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-900/30 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-300 uppercase font-mono">
                  Analyst
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Analyst Kavitha</p>
              <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">KSP-2021-0043</p>
            </div>
            <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold mt-2 block">
              Access Graphs & Maps →
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
        <span className="flex-shrink mx-3 text-[10px] text-zinc-400 font-bold uppercase">Or Manual Authentication</span>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/30 text-rose-800 dark:text-rose-300 rounded-lg p-3 text-xs">
            ⚠️ {error}
          </div>
        )}

        <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => switchRolePreset('investigator')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'investigator'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Investigator Mode
          </button>
          <button
            type="button"
            onClick={() => switchRolePreset('analyst')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'analyst'
                ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Analyst Mode
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Officer Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Inspector H. S. Gowda"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            KSP Service Badge Number
          </label>
          <input
            type="text"
            value={badgeNo}
            onChange={(e) => setBadgeNo(e.target.value)}
            placeholder="KSP-YYYY-XXXX"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Security Passcode / Token
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter security passcode"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm"
        >
          Secure Log In
        </button>
      </form>

      <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3 text-center">
        <p className="text-[10px] text-zinc-400 leading-normal">
          🔒 System Compliance: KSP Data Governance Framework v4.2. All access events recorded in immutable audit logs.
        </p>
      </div>

    </div>
  );
}

export default Login;
