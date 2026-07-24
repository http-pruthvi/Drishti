import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import NetworkGraph from './components/NetworkGraph';
import CrimeAnalytics from './components/CrimeAnalytics';
import OffenderProfiler from './components/OffenderProfiler';
import FinancialLinkage from './components/FinancialLinkage';
import ForecastingView from './components/ForecastingView';
import SociologicalInsights from './components/SociologicalInsights';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('investigator'); // investigator or analyst
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState('en'); // en or kn
  const [theme, setTheme] = useState('dark'); // light or dark
  const [activeTab, setActiveTab] = useState('chat'); // chat, network, map, profile, financial, forecasting, sociological
  const [selectedEntity, setSelectedEntity] = useState(null); // for global citations drilldown

  // Theme Management
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (selectedRole, name) => {
    setRole(selectedRole);
    setUserName(name);
    setIsLoggedIn(true);
    // Investigators default to Chat, Analysts default to Map/Analytics
    if (selectedRole === 'analyst') {
      setActiveTab('map');
    } else {
      setActiveTab('chat');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedEntity(null);
  };

  const handleCitationClick = (entityType, entityId) => {
    setSelectedEntity({ type: entityType, id: entityId });
    // Route to appropriate tab depending on citation type
    if (entityType === 'accused') {
      setActiveTab('profile');
    } else if (entityType === 'account') {
      setActiveTab('financial');
    } else if (entityType === 'case') {
      setActiveTab('chat'); // Case detail is inspected in chat/explainability panel
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-darkBg text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-4">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-darkBg text-zinc-950 dark:text-zinc-50 transition-colors duration-300">
      <Header 
        userName={userName}
        role={role} 
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1700px] w-full mx-auto p-4 lg:p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="lg:w-64 flex flex-col gap-2 shrink-0">
          <div className="p-3 bg-white dark:bg-darkCard rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h6 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {language === 'en' ? 'Core Capabilities' : 'ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು'}
            </h6>
            <nav className="flex flex-col gap-1 mt-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                💬 {language === 'en' ? 'Conversational AI' : 'ಸಂವಾದಾತ್ಮಕ ಎಐ'}
              </button>
              
              <button
                onClick={() => setActiveTab('network')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'network'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                🕸️ {language === 'en' ? 'Criminal Network Graph' : 'ಅಪರಾಧ ಜಾಲದ ನಕ್ಷೆ'}
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'map'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                📍 {language === 'en' ? 'Pattern & Hotspots' : 'ಮಾದರಿ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು'}
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                👤 {language === 'en' ? 'Offender Profiling' : 'ಅಪರಾಧಿ ಪ್ರೊಫೈಲಿಂಗ್'}
              </button>

              <button
                onClick={() => setActiveTab('financial')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'financial'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                💳 {language === 'en' ? 'Financial Linkage' : 'ಹಣಕಾಸು ವರ್ಗಾವಣೆ ಜಾಲ'}
              </button>

              <button
                onClick={() => setActiveTab('forecasting')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'forecasting'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                🔮 {language === 'en' ? 'Forecasting & Warnings' : 'ಮುನ್ಸೂಚನೆ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು'}
              </button>

              <button
                onClick={() => setActiveTab('sociological')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'sociological'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                📊 {language === 'en' ? 'Sociological Insights' : 'ಸಾಮಾಜಿಕ ಒಳನೋಟಗಳು'}
              </button>
            </nav>
          </div>
          
          {/* Quick Context Card */}
          <div className="p-4 bg-zinc-100 dark:bg-[#111116] rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex flex-col gap-2">
            <div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Session Mode:</span>
              <span className="ml-1 capitalize px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-mono text-[10px]">
                {role}
              </span>
            </div>
            <div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Jurisdiction:</span>
              <span className="ml-1 text-zinc-600 dark:text-zinc-400">KSP State-wide Core</span>
            </div>
            <div className="mt-1 border-t border-zinc-200 dark:border-zinc-800 pt-2 text-[10px] leading-relaxed">
              🔐 Auth compliance active. Every lookup recorded in the immutable audit registry.
            </div>
          </div>
        </aside>

        {/* Main Panel Display */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {activeTab === 'chat' && (
            <ChatInterface 
              language={language} 
              role={role} 
              onCitationClick={handleCitationClick} 
              selectedEntity={selectedEntity}
              setSelectedEntity={setSelectedEntity}
            />
          )}
          {activeTab === 'network' && (
            <NetworkGraph language={language} onCitationClick={handleCitationClick} />
          )}
          {activeTab === 'map' && (
            <CrimeAnalytics language={language} />
          )}
          {activeTab === 'profile' && (
            <OffenderProfiler 
              language={language} 
              selectedEntity={selectedEntity}
              setSelectedEntity={setSelectedEntity} 
            />
          )}
          {activeTab === 'financial' && (
            <FinancialLinkage 
              language={language} 
              selectedEntity={selectedEntity} 
              setSelectedEntity={setSelectedEntity}
            />
          )}
          {activeTab === 'forecasting' && (
            <ForecastingView language={language} />
          )}
          {activeTab === 'sociological' && (
            <SociologicalInsights language={language} />
          )}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-3 px-6 text-center text-xs text-zinc-400 bg-white dark:bg-darkCard mt-auto">
        DRISHTI Crime Analytics Platform &copy; 2026 Karnataka State Police · Team AI_VENGERS Datathon
      </footer>
    </div>
  );
}

export default App;
