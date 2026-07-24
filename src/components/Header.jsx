import React, { useState } from 'react';
import { Sun, Moon, LogOut, ShieldAlert, ClipboardList, CheckCircle } from 'lucide-react';

function Header({ userName, role, language, setLanguage, theme, setTheme, onLogout }) {
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  
  // Simulated audit logs generated in this session
  const [auditLogs] = useState([
    { timestamp: "2026-07-24 14:45:10", action: "User Authentication", status: "Success", details: `Token verified for ${userName}.` },
    { timestamp: "2026-07-24 14:45:15", action: "Query Executed", status: "Success", details: "Retrieved Yelahanka burglary records." },
    { timestamp: "2026-07-24 14:46:02", action: "Network Traversal", status: "Success", details: "Traced transaction links for ACC-001." },
    { timestamp: "2026-07-24 14:47:40", action: "Record View Masking", status: "Masked", details: "Victim identifying contacts hashed for case FIR-2026/0401." }
  ]);

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-darkCard px-4 py-3 lg:px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-md font-bold">
            ದೃ
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              DRISHTI <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded font-normal font-mono">MVP</span>
            </h1>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
              KSP Crime Analytics & Conversational Agent
            </p>
          </div>
        </div>

        {/* Right Side: Options and User Info */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Audit Logs Trigger */}
          <button
            onClick={() => setShowAuditLogs(!showAuditLogs)}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="View Audit Logs"
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden md:inline">{language === 'en' ? 'Audit Logs' : 'ಆಡಿಟ್ ಲಾಗ್ಸ್'}</span>
          </button>

          {/* Language Toggle */}
          <div className="bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg flex">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('kn')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'kn'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* User Details */}
          <div className="hidden sm:flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-3 lg:pl-4">
            <div className="text-right">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{userName}</p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 capitalize font-mono">{role}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-700 dark:text-blue-400 text-sm border border-blue-200 dark:border-blue-800">
              {userName ? userName[0] : 'U'}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-colors ml-1"
            title="Log Out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Audit Logs Drawer Overlay */}
      {showAuditLogs && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop */}
            <div 
              onClick={() => setShowAuditLogs(false)}
              className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm transition-opacity"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-darkCard border-l border-zinc-200 dark:border-zinc-800 shadow-2xl py-6">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" id="slide-over-title">
                        <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        {language === 'en' ? 'Audit Log Registry' : 'ಆಡಿಟ್ ಲಾಗ್ ನೋಂದಣಿ'}
                      </h2>
                      <button
                        onClick={() => setShowAuditLogs(false)}
                        className="rounded-md text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="sr-only">Close panel</span>
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 leading-normal">
                      Immutable transaction log recording all actions taken by {userName} ({role}) on this terminal.
                    </p>
                  </div>
                  
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="space-y-4">
                      {auditLogs.map((log, index) => (
                        <div key={index} className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-[10px] text-zinc-400">{log.timestamp}</span>
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                              log.status === 'Success' 
                                ? 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400' 
                                : 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400'
                            }`}>
                              <CheckCircle className="w-2.5 h-2.5" />
                              {log.status}
                            </span>
                          </div>
                          <p className="font-bold text-zinc-800 dark:text-zinc-200">{log.action}</p>
                          <p className="text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{log.details}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 text-[10px] text-blue-700 dark:text-blue-400 leading-relaxed">
                      🔒 <strong>System Compliance</strong>: Log items are hashed and synced to a secure block-store to maintain procedural accountability and compliance with Section 10 of the KSP data directive.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
