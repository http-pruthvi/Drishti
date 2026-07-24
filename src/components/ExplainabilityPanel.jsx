import React from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';

function ExplainabilityPanel({ explainability, language, onClose }) {
  if (!explainability) return null;

  return (
    <div className="h-full bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-sm animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {language === 'en' ? 'Explainability & Evidence' : 'ಪುರಾವೆ ಮತ್ತು ವಿವರಣೆ'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        
        {/* Intent Info */}
        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
            {language === 'en' ? 'Identified Query Intent' : 'ಗುರುತಿಸಲಾದ ಪ್ರಶ್ನೆಯ ಉದ್ದೇಶ'}
          </span>
          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
            🎯 {explainability.intent}
          </p>
        </div>

        {/* Confidence progress bar */}
        <div>
          <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span>{language === 'en' ? 'Grounding Confidence' : 'ಆಧಾರದ ನಂಬಿಕಾರ್ಹತೆ'}</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{explainability.confidence}</span>
          </div>
          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: parseFloat(explainability.confidence) + '%' }}
            />
          </div>
        </div>

        {/* Database Queries */}
        <div className="space-y-3">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
            {language === 'en' ? 'Simulated Execution Trail' : 'ಡೇಟಾಬೇಸ್ ಕ್ವೆರಿ ಟ್ರಯಲ್'}
          </span>

          {explainability.cypher && explainability.cypher !== "None (Help navigation)" && (
            <div>
              <label className="text-[9px] font-bold text-zinc-400 uppercase font-mono block mb-1">
                Graph DB Query (Cypher)
              </label>
              <pre className="text-[11px] font-mono p-3 bg-zinc-900 text-zinc-300 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-[120px]">
                {explainability.cypher}
              </pre>
            </div>
          )}

          {explainability.sql && explainability.sql !== "None (Help navigation)" && (
            <div>
              <label className="text-[9px] font-bold text-zinc-400 uppercase font-mono block mb-1">
                Relational CCTNS Query (SQL)
              </label>
              <pre className="text-[11px] font-mono p-3 bg-zinc-900 text-zinc-300 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-[120px]">
                {explainability.sql}
              </pre>
            </div>
          )}
        </div>

        {/* Grounding Source Records */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
            {language === 'en' ? 'Grounded Evidence Sources' : 'ಆಧಾರಿತ ಮೂಲ ದಾಖಲೆಗಳು'}
          </span>
          
          {explainability.evidence && explainability.evidence.length > 0 ? (
            <div className="space-y-2">
              {explainability.evidence.map((ev, i) => (
                <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
                    📄 {ev.record}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 mt-1 block leading-normal">
                    {ev.detail}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">No direct database records loaded.</p>
          )}
        </div>

        {/* Governance banner */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800/30 rounded-xl text-[10px] text-blue-700 dark:text-blue-400 leading-relaxed flex gap-2">
          <Info className="w-4.5 h-4.5 shrink-0" />
          <div>
            <strong>Legal Accountability</strong>: This reasoning trace provides verifiable audit tracks in accordance with the Karnataka Digital Evidence directives. Model outputs are advisory and must be cross-checked against certified physical FIR registers.
          </div>
        </div>

      </div>
    </div>
  );
}

export default ExplainabilityPanel;
