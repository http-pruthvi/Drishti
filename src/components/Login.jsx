import React, { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState('investigator');
  const [name, setName] = useState('');
  const [badgeNo, setBadgeNo] = useState('');
  const [password, setPassword] = useState('');
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
    if (!password.trim()) {
      setError('Please enter credentials');
      return;
    }
    setError('');
    onLogin(role, name);
  };

  const autofillUser = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'investigator') {
      setName('Inspector Gowda');
      setBadgeNo('KSP-2019-8802');
      setPassword('••••••••');
    } else {
      setName('Senior Analyst Kavitha');
      setBadgeNo('KSP-2021-0043');
      setPassword('••••••••');
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-6 lg:p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 text-3xl">
          👁️
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          DRISHTI · ದೃಷ್ಟಿ
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
          Intelligent Conversational AI & Crime Analytics Platform <br />
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Karnataka State Police Crime Database</span>
        </p>
      </div>

      <div className="mb-6 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl flex gap-1">
        <button
          type="button"
          onClick={() => autofillUser('investigator')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            role === 'investigator'
              ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          Investigator View
        </button>
        <button
          type="button"
          onClick={() => autofillUser('analyst')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            role === 'analyst'
              ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          Analyst View
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/30 text-rose-800 dark:text-rose-300 rounded-lg p-3 text-xs">
            ⚠️ {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Inspector H. S. Gowda"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            KSP Service Badge Number
          </label>
          <input
            type="text"
            value={badgeNo}
            onChange={(e) => setBadgeNo(e.target.value)}
            placeholder="KSP-YYYY-XXXX"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Security Passcode / Token
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter security passcode"
            className="w-full bg-white dark:bg-darkBg border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-semibold transition-colors shadow-sm mt-2"
        >
          Secure Log In
        </button>
      </form>

      <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800/80 pt-4 text-center">
        <button
          type="button"
          onClick={() => autofillUser(role)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          ⚡ Autofill Demo Credentials
        </button>
        <p className="text-[10px] text-zinc-400 mt-2 leading-normal">
          This system is intended for authorized law enforcement personnel only. 
          All connections are securely encrypted and access logs are recorded.
        </p>
      </div>
    </div>
  );
}

export default Login;
