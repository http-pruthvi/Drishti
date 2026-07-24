import React, { useState, useEffect } from 'react';
import { mockFinancialAccounts, mockAccused } from '../data/mockCrimeData';
import { Landmark, ArrowRight, ShieldAlert, Filter, Download, FileCode, CheckCircle, X } from 'lucide-react';

function FinancialLinkage({ language, selectedEntity, setSelectedEntity }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filterSuspiciousOnly, setFilterSuspiciousOnly] = useState(false);
  const [showFiuModal, setShowFiuModal] = useState(false);

  // Setup citation selection
  useEffect(() => {
    if (selectedEntity && selectedEntity.type === 'account') {
      const match = mockFinancialAccounts.find(a => a.accountId === selectedEntity.id);
      if (match) {
        setSelectedAccount(match);
      }
    }
  }, [selectedEntity]);

  const handleAccountSelect = (acct) => {
    setSelectedAccount(acct);
    if (selectedEntity?.id === acct.accountId) {
      setSelectedEntity(null);
    }
  };

  const getOwnerName = (ownerId) => {
    const offender = mockAccused.find(a => a.id === ownerId);
    return offender ? offender.name : "Unknown Entity";
  };

  // Generate simulated FIU-IND XML payload
  const generateFiuXml = () => {
    const acct = selectedAccount || mockFinancialAccounts[2];
    return `<?xml version="1.0" encoding="UTF-8"?>
<FIU_IND_STR_REPORT version="2.1">
  <Header>
    <ReportingEntityID>KSP-CEN-EAST-88</ReportingEntityID>
    <ReportType>STR</ReportType> <!-- Suspicious Transaction Report -->
    <Timestamp>2026-07-24T14:57:00Z</Timestamp>
    <Jurisdiction>Karnataka State Police</Jurisdiction>
  </Header>
  <AccountDetails>
    <AccountNumber>${acct.accountNumber}</AccountNumber>
    <BankName>${acct.bank}</BankName>
    <PrimaryHolder>${getOwnerName(acct.ownerId)}</PrimaryHolder>
    <OwnerID>${acct.ownerId}</OwnerID>
    <RiskClassification>HIGH_PRIORITY_MULE</RiskClassification>
  </AccountDetails>
  <SuspiciousTransactionsCount>${acct.transactions.filter(t => t.suspicious).length}</SuspiciousTransactionsCount>
  <TransactionList>
${acct.transactions.filter(t => t.suspicious).map(t => `    <Transaction>
      <Date>${t.date}</Date>
      <Amount INR="${t.amount}">${t.amount}</Amount>
      <Type>${t.type}</Type>
      <Source>${t.source}</Source>
      <TargetRef>${t.targetId || 'N/A'}</TargetRef>
      <GroundsOfSuspicion>Structuring below Rs 50,000 AML threshold</GroundsOfSuspicion>
    </Transaction>`).join('\n')}
  </TransactionList>
</FIU_IND_STR_REPORT>`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Landmark className="w-5.5 h-5.5 text-amber-500" />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'en' ? 'Financial Crime & Transaction Link Analysis' : 'ಹಣಕಾಸು ಅಪರಾಧ ಮತ್ತು ವಹಿವಾಟು ಜಾಲದ ವಿಶ್ಲೇಷಣೆ'}
              </h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {language === 'en' 
                  ? 'Trace shell accounts, money laundering structuring patterns, and transaction anomaly paths.' 
                  : 'ಮುಲೆ ಖಾತೆಗಳು, ಮನಿ ಲಾಂಡರಿಂಗ್ ವರ್ಗಾವಣೆಗಳು ಮತ್ತು ಅಸಹಜ ಹಣಕಾಸು ಜಾಲ ಪತ್ತೆಹಚ್ಚಿ.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFiuModal(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <FileCode className="w-3.5 h-3.5" />
              {language === 'en' ? 'Export FIU-IND Format (STR)' : 'FIU-IND ಫಾರ್ಮ್ಯಾಟ್ ಎಕ್ಸ್‌ಪೋರ್ಟ್'}
            </button>

            <button
              onClick={() => setFilterSuspiciousOnly(!filterSuspiciousOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                filterSuspiciousOnly
                  ? 'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {language === 'en' ? 'Suspicious Flags Only' : 'ಅನುಮಾನಾಸ್ಪದ ಮಾತ್ರ'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Accounts Registry */}
        <div className="lg:col-span-1 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-100 dark:border-zinc-800 pb-2">
            {language === 'en' ? 'Identified Suspect Accounts' : 'ಸಂಪರ್ಕಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ಪಟ್ಟಿ'}
          </span>

          <div className="space-y-2.5">
            {mockFinancialAccounts.map((acct) => {
              const isSelected = selectedAccount?.accountId === acct.accountId;
              const suspiciousCount = acct.transactions.filter(t => t.suspicious).length;

              return (
                <div
                  key={acct.accountId}
                  onClick={() => handleAccountSelect(acct)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-800 shadow-sm'
                      : 'bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 font-mono">{acct.accountId}</span>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">A/C No: {acct.accountNumber}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">{acct.bank}</p>
                      <p className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">Owner: {getOwnerName(acct.ownerId)}</p>
                    </div>
                    {suspiciousCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                        ⚠️ {suspiciousCount} Flag
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Flow Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAccount ? (
            <>
              {/* Account dossier */}
              <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Account Details</span>
                    <h3 className="text-base font-extrabold text-zinc-950 dark:text-zinc-50 mt-1">
                      A/C {selectedAccount.accountNumber}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                      {selectedAccount.bank} · Owner: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{getOwnerName(selectedAccount.ownerId)}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase block">Account Balance</span>
                    <span className="text-lg font-mono font-black text-zinc-950 dark:text-zinc-50">
                      Rs. {selectedAccount.balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Structured Flow Chart */}
                <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800/80 space-y-3">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Money Trail Node Linkage</span>
                  
                  <div className="flex items-center justify-between max-w-md mx-auto text-xs py-3">
                    <div className="text-center p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-28 shadow-sm">
                      <span className="text-[9px] font-bold font-mono text-zinc-400 block">SENDER</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                        {getOwnerName(selectedAccount.ownerId).split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col items-center mx-2">
                      <ArrowRight className="w-5 h-5 text-amber-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-amber-600 dark:text-amber-400 font-bold mt-1">
                        Rs. 1,45,000 (Burglary)
                      </span>
                    </div>

                    <div className="text-center p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-28 shadow-sm">
                      <span className="text-[9px] font-bold font-mono text-zinc-400 block">RECIPIENT</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                        {selectedAccount.accountId === 'ACC-SEC-01' ? 'EMP Naga' : (selectedAccount.accountId === 'ACC-SEC-03' ? 'Vikram Malhotra' : 'External offshore')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transaction Ledger */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Transaction Ledger</span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {selectedAccount.transactions
                      .filter(t => !filterSuspiciousOnly || t.suspicious)
                      .map((t, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-lg border text-xs flex justify-between items-center transition-all ${
                            t.suspicious 
                              ? 'bg-rose-50/40 dark:bg-rose-950/10 border-rose-200/50 dark:border-rose-800/40 shadow-sm animate-pulse'
                              : 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-100 dark:border-zinc-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9px] text-zinc-400">{t.date}</span>
                              {t.suspicious && (
                                <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 font-bold text-[8px] uppercase tracking-wider font-mono">
                                  <ShieldAlert className="w-2.5 h-2.5" />
                                  Suspicious Structuring
                                </span>
                              )}
                            </div>
                            <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">{t.source}</p>
                            <p className="text-[10px] text-zinc-400">Type: {t.type} {t.targetId ? `· Target: ${t.targetId}` : ''}</p>
                          </div>
                          
                          <span className={`font-mono font-bold text-sm ${
                            t.type === 'Receive' || t.type === 'Deposit' ? 'text-emerald-500' : 'text-rose-500'
                          }`}>
                            {t.type === 'Receive' || t.type === 'Deposit' ? '+' : '-'} Rs. {t.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 shadow-inner text-center text-zinc-400 flex flex-col items-center justify-center h-full min-h-[300px]">
              <Landmark className="w-12 h-12 mb-3 text-zinc-400 opacity-60 animate-pulse" />
              <p className="text-sm font-semibold">Transaction Link Investigator</p>
              <p className="text-xs mt-1.5 text-zinc-500 max-w-[280px] leading-normal">
                Select a suspect financial account from the catalog index on the left to trace structuring loops, transactions ledger, and money flow trails.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* FIU-IND Export Modal */}
      {showFiuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden p-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                  FIU-IND Suspicious Activity Report (STR) Export
                </h3>
              </div>
              <button onClick={() => setShowFiuModal(false)} className="text-zinc-400 hover:text-zinc-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 mb-3">
              Standardized XML payload for transmission to Financial Intelligence Unit - India (FIU-IND) regarding money laundering structuring patterns.
            </p>

            <pre className="bg-zinc-900 text-emerald-400 font-mono text-[11px] p-4 rounded-xl max-h-[320px] overflow-y-auto border border-zinc-800 leading-relaxed select-all">
              {generateFiuXml()}
            </pre>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowFiuModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("FIU-IND Report Payload copied to clipboard and queued for secure transmission.");
                  setShowFiuModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download XML Package
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default FinancialLinkage;
