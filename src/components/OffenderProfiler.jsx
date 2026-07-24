import React, { useState, useEffect } from 'react';
import { mockAccused } from '../data/mockCrimeData';
import { Search, UserCheck, AlertTriangle, Fingerprint, ExternalLink } from 'lucide-react';

function OffenderProfiler({ language, selectedEntity, setSelectedEntity }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccused, setActiveAccused] = useState(null);
  
  // Highlight selected entity from citation if applicable
  useEffect(() => {
    if (selectedEntity && selectedEntity.type === 'accused') {
      const match = mockAccused.find(a => a.id === selectedEntity.id);
      if (match) {
        setActiveAccused(match);
        setSearchTerm(match.name);
      }
    }
  }, [selectedEntity]);

  const filteredAccused = mockAccused.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.primaryMO.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (score) => {
    if (score > 85) return 'bg-rose-500 text-rose-500';
    if (score > 70) return 'bg-orange-500 text-orange-500';
    return 'bg-emerald-500 text-emerald-500';
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'en' ? 'Criminology-Based Offender Profiler' : 'ಅಪರಾಧಿಗಳ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಅಪಾಯದ ಮುನ್ಸೂಚನೆ'}
              </h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {language === 'en' 
                  ? 'Inspect profiles, behavior tags, and risk indexes for habitual offenders.' 
                  : 'ಹಳೆಯ ಅಪರಾಧಿಗಳ ನಡವಳಿಕೆ ಶ್ರೇಣಿ ಮತ್ತು ಅಪಾಯದ ಸೂಚ್ಯಂಕ ವೀಕ್ಷಿಸಿ.'}
              </p>
            </div>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'en' ? "Search offender name, ID, or MO..." : "ಅಪರಾಧಿಯ ಹೆಸರು, ಐಡಿ ಹುಡುಕಿ..."}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-50"
            />
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List Pane */}
        <div className="lg:col-span-1 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-100 dark:border-zinc-800 pb-2">
            {language === 'en' ? 'Habitual Offender Catalog' : 'ಸಕ್ರಿಯ ಅಪರಾಧಿಗಳ ಪಟ್ಟಿ'}
          </span>

          <div className="space-y-2">
            {filteredAccused.map((a) => {
              const riskColor = getRiskColor(a.riskScore);
              const isActive = activeAccused?.id === a.id;

              return (
                <div
                  key={a.id}
                  onClick={() => {
                    setActiveAccused(a);
                    if (selectedEntity?.id === a.id) {
                      setSelectedEntity(null); // Clear citation filter once viewed
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-sm' 
                      : 'bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 font-mono">{a.id}</span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{a.name}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">{a.primaryMO}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      a.status === 'In Custody' 
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                        : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                    }`}>
                      {a.status}
                    </span>
                  </div>

                  {/* Sparkline Progress Bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Risk:</span>
                    <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-850 rounded-full overflow-hidden">
                      <div className={`h-full ${riskColor.split(' ')[0]}`} style={{ width: `${a.riskScore}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold font-mono ${riskColor.split(' ')[1]}`}>
                      {a.riskScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details dossier */}
        <div className="lg:col-span-2">
          {activeAccused ? (
            <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Offender Dossier</span>
                  <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50 mt-1 flex items-center gap-2">
                    {activeAccused.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">
                    INDEX_ID: {activeAccused.id} · AGE: {activeAccused.age}
                  </p>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center min-w-[120px]">
                  <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Risk Threat Level</span>
                  <span className={`text-xl font-mono font-black block mt-0.5 ${getRiskColor(activeAccused.riskScore).split(' ')[1]}`}>
                    {activeAccused.riskScore}%
                  </span>
                  <span className="text-[9px] text-zinc-400">High Priority Tier</span>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Behavioral Details */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-blue-500" />
                      Behavioral & MO Profile
                    </h5>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 mt-2 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                      {activeAccused.primaryMO}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Demographics & Social Context
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {activeAccused.demographics}
                    </p>
                  </div>
                </div>

                {/* History & Associates */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
                      Registered Offense History
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {activeAccused.history}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
                      Crime Network Associates
                    </span>
                    <div className="flex gap-2 mt-2">
                      {activeAccused.associates.map((assocId) => (
                        <button
                          key={assocId}
                          onClick={() => {
                            const match = mockAccused.find(x => x.id === assocId);
                            if (match) setActiveAccused(match);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-blue-100 hover:text-blue-700 dark:bg-zinc-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {assocId}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
                      Linked Accounts
                    </span>
                    <div className="flex gap-2 mt-2">
                      {activeAccused.financialAccounts.map((acctId) => (
                        <span
                          key={acctId}
                          className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 font-mono text-[10px]"
                        >
                          💳 {acctId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 shadow-inner text-center text-zinc-400 flex flex-col items-center justify-center h-full min-h-[300px]">
              <Fingerprint className="w-12 h-12 mb-3 text-zinc-400 opacity-60 animate-pulse" />
              <p className="text-sm font-semibold">Habitual Offender Dossier Viewer</p>
              <p className="text-xs mt-1.5 text-zinc-500 max-w-[280px] leading-normal">
                Select an offender from the catalog index on the left to inspect detailed behavioural profiling, risk matrix scorecards, and network maps.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default OffenderProfiler;
