import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, FileText, ChevronRight, HelpCircle, Shield } from 'lucide-react';
import { querySimulatedAI } from '../data/mockCrimeData';
import ExplainabilityPanel from './ExplainabilityPanel';

function ChatInterface({ language, role, onCitationClick, selectedEntity, setSelectedEntity }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTtsActive, setIsTtsActive] = useState(false);
  const [activeExplainability, setActiveExplainability] = useState(null);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Initialize Speech Recognition (ASR)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };

      rec.onerror = (e) => {
        console.error("Speech recognition error", e);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [language]);

  // Handle Initial Welcome Message
  useEffect(() => {
    const welcome = querySimulatedAI("", language, role);
    setMessages([
      { id: "msg-welcome", sender: "ai", text: welcome.text, explainability: welcome.explainability, citations: welcome.citations }
    ]);
  }, [language, role]);

  // Scroll to Bottom on New Messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Trigger TTS if active
  const speakText = (text) => {
    if (!isTtsActive || !synthRef.current) return;
    
    // Stop any ongoing speech
    synthRef.current.cancel();

    // Clean markdown bold syntax etc
    const cleanText = text.replace(/[*#`_\-]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
    synthRef.current.speak(utterance);
  };

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    // User Message
    const userMsg = { id: `msg-user-${Date.now()}`, sender: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = querySimulatedAI(textToSend, language, role);
      const aiMsg = { 
        id: `msg-ai-${Date.now()}`, 
        sender: "ai", 
        text: response.text, 
        citations: response.citations,
        explainability: response.explainability 
      };
      setMessages(prev => [...prev, aiMsg]);
      speakText(response.text);
      
      // Auto-open explainability for the latest response
      setActiveExplainability(response.explainability);
    }, 600);
  };

  // Toggle Recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition API is not supported in this browser. Please type your query.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      recognitionRef.current.start();
    }
  };

  // Toggle TTS
  const toggleTts = () => {
    if (isTtsActive) {
      synthRef.current?.cancel();
      setIsTtsActive(false);
    } else {
      setIsTtsActive(true);
      // Speak the last AI response if available
      const aiMsgs = messages.filter(m => m.sender === 'ai');
      if (aiMsgs.length > 0) {
        speakText(aiMsgs[aiMsgs.length - 1].text);
      }
    }
  };

  // Export to PDF
  const handlePdfExport = () => {
    const originalTitle = document.title;
    document.title = `DRISHTI_Case_Report_${Date.now()}`;
    window.print();
    document.title = originalTitle;
  };

  const sampleQueries = language === 'en' ? [
    "Show repeat burglary offenders in Yelahanka.",
    "Trace suspicious transactions in Majestic.",
    "Retrieve details on accused Kiran Kumar."
  ] : [
    "ಯಲಹಂಕ ಕನ್ನಗಳವು ಪ್ರಕರಣಗಳ ಹಳೆಯ ಅಪರಾಧಿಗಳು ತೋರಿಸಿ.",
    "ಮೆಜೆಸ್ಟಿಕ್‌ನಲ್ಲಿನ ಅನುಮಾನಾಸ್ಪದ ಹಣಕಾಸು ವರ್ಗಾವಣೆಗಳು ತೋರಿಸಿ.",
    "ಆರೋಪಿ ಕಿರಣ್ ಕುಮಾರ್ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ."
  ];

  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-[600px] max-h-[85vh]">
      {/* Left / Main Chat Panel */}
      <div className={`flex-1 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-sm transition-all duration-300`}>
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'en' ? 'Conversational Crime Intelligence' : 'ಸಂವಾದಾತ್ಮಕ ಅಪರಾಧ ಗುಪ್ತಚರ'}
              </h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                INTENT_ROUTER: ACTIVE · RAG_GROUNDING: ENABLED
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 no-print">
            <button
              onClick={toggleTts}
              className={`p-2 rounded-lg transition-colors ${
                isTtsActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500'
              }`}
              title="Toggle Audio Readout"
            >
              {isTtsActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePdfExport}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
              title="Save Conversation as PDF"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              {/* Sender Tag */}
              <span className="text-[9px] font-mono text-zinc-400 mb-1 capitalize">
                {msg.sender === 'user' ? (role === 'investigator' ? 'Investigator' : 'Analyst') : 'DRISHTI AI'}
              </span>

              {/* Message Bubble */}
              <div 
                className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-bl-none'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {/* Citations Panel */}
                {msg.sender === 'ai' && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-1.5 items-center no-print">
                    <span className="text-[10px] font-bold text-zinc-400 mr-1 uppercase">Evidence:</span>
                    {msg.citations.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => onCitationClick(c.type, c.id)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-200 hover:bg-blue-100 hover:text-blue-700 dark:bg-zinc-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] border border-zinc-300 dark:border-zinc-700 transition-colors"
                      >
                        📄 {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Explainability Button */}
              {msg.sender === 'ai' && msg.explainability && (
                <button
                  onClick={() => setActiveExplainability(msg.explainability)}
                  className="mt-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 no-print"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Show query reasoning and SQL/Cypher trail' : 'ವಿಶ್ಲೇಷಣಾ ಮಾರ್ಗ ವೀಕ್ಷಿಸಿ'}
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions Panel */}
        <div className="px-6 py-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 items-center bg-zinc-50/50 dark:bg-zinc-900/20 no-print">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase mr-1">Suggestions:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 transition-all font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 no-print">
          {/* Voice Input Button */}
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-all shadow-sm ${
              isRecording 
                ? 'bg-rose-500 text-white animate-pulse-speech' 
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500'
            }`}
            title={isRecording ? "Recording... Click to stop" : "Speak to Query (Kannada/English)"}
          >
            {isRecording ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isRecording 
                ? (language === 'kn' ? "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ" : "Listening... Speak now") 
                : (language === 'kn' ? "ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." : "Ask a question about FIRs, accused, or transactions...")
            }
            className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-950 dark:text-zinc-100 transition-all"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm flex items-center justify-center"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Right / Explainability Details Panel */}
      {activeExplainability && (
        <div className="w-full xl:w-[400px] shrink-0 no-print">
          <ExplainabilityPanel 
            explainability={activeExplainability} 
            language={language}
            onClose={() => setActiveExplainability(null)}
          />
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
