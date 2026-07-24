// Complete Comprehensive Mock Database for DRISHTI Platform (KSP Crime Database)

export const mockVehicles = [
  { id: "VEH-01", plateNo: "KA-04-MA-8890", model: "Hyundai Verna (Black)", owner: "Rent-A-Car Nelamangala", linkedAccused: ["ACC-001"], sightings: ["Yelahanka 2026-04-12 02:15 AM", "Nelamangala Toll 2026-05-25"] },
  { id: "VEH-02", plateNo: "KA-03-NC-4102", model: "Honda City (White)", owner: "Vikram Malhotra", linkedAccused: ["ACC-004"], sightings: ["Indiranagar 2026-06-08", "Majestic 2026-06-22"] }
];

export const mockFIRs = [
  {
    id: "FIR-2026/0401",
    crimeType: "Burglary",
    date: "2026-04-12",
    time: "02:30 AM",
    location: {
      area: "Yelahanka",
      station: "Yelahanka Police Station",
      lat: 13.1008,
      lng: 77.5963
    },
    modusOperandi: "Night house break-in, targeted locked residences, bypassed security systems using digital signal blockers, used specialized lockpicks.",
    status: "Under Investigation",
    investigatingOfficer: "Inspector H. S. Gowda",
    details: "Complainant reported theft of gold ornaments valued at Rs. 12 Lakhs and cash of Rs. 2.5 Lakhs from their locked bungalow. Neighbours reported a black sedan with masked license plates in the vicinity.",
    accusedIds: ["ACC-001", "ACC-003"],
    victim: {
      name: "Ramesh Kumar",
      age: 52,
      contact: "987XXXXXX1",
      masked: true
    },
    timeline: [
      { date: "2026-04-12 03:00 AM", action: "FIR Registered at Yelahanka PS" },
      { date: "2026-04-13 10:00 AM", action: "Forensic team collected fingerprint samples & RF interference log" },
      { date: "2026-04-18 04:00 PM", action: "Suspicious black sedan (KA-04-MA-8890) traced to rental agency, linked to ACC-001" },
      { date: "2026-04-22 11:30 AM", action: "Interrogation of ACC-001 revealed co-conspirator ACC-003" }
    ],
    similarCases: [
      { id: "FIR-2025/1102", title: "Burglary at Hebbal Villa", similarity: 94, reason: "Identical RF jammer signature & night 2-4 AM window" },
      { id: "FIR-2026/0502", title: "Smart Home Heist Yelahanka", similarity: 88, reason: "Same jurisdiction, digital CCTV jammer used" }
    ],
    leads: [
      { id: "LEAD-01", type: "Vehicle Trace", detail: "Check toll cameras at Devanahalli toll gate for KA-04-MA-8890 on 2026-04-12 between 01:00 AM - 04:00 AM.", status: "Active" },
      { id: "LEAD-02", type: "Fence Interception", detail: "Alert gold pawnbrokers in Nelamangala regarding 120g stamped gold bangles.", status: "Verified" }
    ]
  },
  {
    id: "FIR-2026/0502",
    crimeType: "Burglary",
    date: "2026-05-19",
    time: "03:15 AM",
    location: {
      area: "Yelahanka",
      station: "Yelahanka Police Station",
      lat: 13.0985,
      lng: 77.5892
    },
    modusOperandi: "Night house break-in, used digital signal blockers to disable smart CCTV, lock-snapping.",
    status: "Charge Sheeted",
    investigatingOfficer: "Inspector H. S. Gowda",
    details: "Locked house broken into between 2 AM and 4 AM. Smart security cameras were jammed during the heist. Valuables worth Rs. 8 Lakhs stolen.",
    accusedIds: ["ACC-001"],
    victim: {
      name: "Saraswathi Bai",
      age: 67,
      contact: "987XXXXXX2",
      masked: true
    },
    timeline: [
      { date: "2026-05-19", action: "FIR Registered" },
      { date: "2026-05-20", action: "RF signature scanner confirms usage of 2.4GHz jammer" },
      { date: "2026-05-25", action: "ACC-001 apprehended at Nelamangala toll gate with signal jammer in possession" }
    ],
    similarCases: [
      { id: "FIR-2026/0401", title: "Yelahanka Bungalow Theft", similarity: 91, reason: "Lock-snapping & jammer MO match" }
    ],
    leads: [
      { id: "LEAD-03", type: "Property Recovery", detail: "Seized Rs. 4.5 Lakh cash from ACC-001 residence.", status: "Completed" }
    ]
  },
  {
    id: "FIR-2026/0615",
    crimeType: "Cybercrime",
    date: "2026-06-08",
    time: "11:00 AM",
    location: {
      area: "Indiranagar",
      station: "CEN Police Station East",
      lat: 12.9719,
      lng: 77.6412
    },
    modusOperandi: "Phishing link sent via SMS claiming electricity bill outstanding, diverted victims to fake payment portal, stole net banking credentials.",
    status: "Under Investigation",
    investigatingOfficer: "Sub-Inspector Kavitha R.",
    details: "Victim clicked on a link in SMS warning of immediate power disconnection. Transferred Rs. 4,95,000 to fraud account in three quick transactions.",
    accusedIds: ["ACC-002"],
    victim: {
      name: "Anand Murthy",
      age: 43,
      contact: "987XXXXXX3",
      masked: true
    },
    timeline: [
      { date: "2026-06-08 11:30 AM", action: "Cyber Helpline 1930 call received, transaction frozen, FIR registered" },
      { date: "2026-06-10 02:00 PM", action: "Money trail traced to digital wallet linked to bank account in Majestic branch" },
      { date: "2026-06-15 05:00 PM", action: "ACC-002 identified as primary mule account organizer" }
    ],
    similarCases: [
      { id: "FIR-2026/0688", title: "Mule Syndicate Fraud Majestic", similarity: 96, reason: "Identical UPI structuring and shell company receiving accounts" }
    ],
    leads: [
      { id: "LEAD-04", type: "Telecom Trace", detail: "Request CDR logs for SMS gateway sender ID BESCOM-ALERT.", status: "Active" }
    ]
  },
  {
    id: "FIR-2026/0688",
    crimeType: "Financial Fraud",
    date: "2026-06-22",
    time: "02:00 PM",
    location: {
      area: "Majestic",
      station: "Upparpet Police Station",
      lat: 12.9756,
      lng: 77.5728
    },
    modusOperandi: "Mule account network operation, structuring transactions under Rs. 50,000 to bypass AML alerts, shell firm registrations.",
    status: "Under Investigation",
    investigatingOfficer: "ACP Rajesh Kumar",
    details: "Suspicious transaction patterns flagged by commercial bank. Accused operated 15 bank accounts under dummy names, receiving cybercrime proceeds and routing them to offshore crypto wallets.",
    accusedIds: ["ACC-002", "ACC-004"],
    victim: {
      name: "State Bank of India",
      age: 0,
      contact: "Corporate",
      masked: false
    },
    timeline: [
      { date: "2026-06-22", action: "FIR registered based on FIU-IND suspicious activity report" },
      { date: "2026-06-24", action: "Raids conducted at commercial office in Majestic, seized 50+ debit cards and SIM cards" }
    ],
    similarCases: [
      { id: "FIR-2026/0615", title: "Electricity Bill Phishing Indiranagar", similarity: 95, reason: "Receiver accounts match Yusuf & Vikram Malhotra syndicate" }
    ],
    leads: [
      { id: "LEAD-05", type: "Crypto Exchange Freeze", detail: "Issue Section 91 CrPC notice to WazirX exchange to freeze crypto wallet 0x71F...90A.", status: "Priority" }
    ]
  },
  {
    id: "FIR-2026/0710",
    crimeType: "Burglary",
    date: "2026-07-05",
    time: "01:45 AM",
    location: {
      area: "Yelahanka",
      station: "Yelahanka Police Station",
      lat: 13.1112,
      lng: 77.6021
    },
    modusOperandi: "Night house break-in, bypassed smart door locks using electromagnetic pulse (EMP) tool.",
    status: "Under Investigation",
    investigatingOfficer: "Inspector H. S. Gowda",
    details: "EMP device used to short-circuit the electronic smart lock of a villa. Gold and diamonds worth Rs. 20 Lakhs stolen.",
    accusedIds: ["ACC-003"],
    victim: {
      name: "Dr. Prema Raju",
      age: 38,
      contact: "987XXXXXX4",
      masked: true
    },
    timeline: [
      { date: "2026-07-05", action: "FIR filed" },
      { date: "2026-07-07", action: "Security camera of adjacent villa shows suspect matching physical build of ACC-003" }
    ],
    similarCases: [
      { id: "FIR-2026/0401", title: "Yelahanka Bungalow Theft", similarity: 92, reason: "Co-conspirator EMP Naga footprint" }
    ],
    leads: [
      { id: "LEAD-06", type: "Lookout Circular", detail: "Issue LOC at Bangalore Airport & Railway stations for absconding suspect ACC-003.", status: "Issued" }
    ]
  }
];

export const mockAccused = [
  {
    id: "ACC-001",
    name: "Kiran Kumar alias 'Signal' Kiran",
    age: 29,
    status: "In Custody",
    primaryMO: "Smart Home CCTV Jamming / Lock-snapping",
    riskScore: 88,
    centralityScore: 0.82, // Betweenness centrality in crime network
    communityCluster: "North Bangalore Burglary Gang",
    demographics: "Resident of Nelamangala, High School Drop-out, Unemployed.",
    history: "Involved in 4 past burglaries in Yelahanka and Hebbal. Uses RF signal blockers.",
    financialAccounts: ["ACC-SEC-01", "ACC-SEC-02"],
    vehicles: ["VEH-01"],
    associates: ["ACC-003"]
  },
  {
    id: "ACC-002",
    name: "Mohammad Yusuf",
    age: 34,
    status: "Active",
    primaryMO: "Mule Account Coordinator / Phishing Host",
    riskScore: 75,
    centralityScore: 0.78,
    communityCluster: "Majestic Cyber Mule Syndicate",
    demographics: "Resident of Majestic, Graduate in Commerce, former mobile shop employee.",
    history: "Accused in 2 online banking fraud cases. Organizes networks of bank accounts using poor daily-wage earners' credentials.",
    financialAccounts: ["ACC-SEC-03", "ACC-SEC-04"],
    vehicles: [],
    associates: ["ACC-004"]
  },
  {
    id: "ACC-003",
    name: "Nagaraj alias 'EMP' Naga",
    age: 31,
    status: "Absconding",
    primaryMO: "Smart Lock EMP Bypass / Lockpicking",
    riskScore: 92,
    centralityScore: 0.91,
    communityCluster: "North Bangalore Burglary Gang",
    demographics: "Resident of Devanahalli, ITI Diploma in Electronics (discontinued).",
    history: "Expert in electronic bypasses. Known partner of 'Signal' Kiran in burglary gangs active in North Bangalore.",
    financialAccounts: ["ACC-SEC-05"],
    vehicles: [],
    associates: ["ACC-001"]
  },
  {
    id: "ACC-004",
    name: "Vikram Malhotra",
    age: 41,
    status: "In Custody",
    primaryMO: "Shell Company Director / Crypto Launderer",
    riskScore: 68,
    centralityScore: 0.71,
    communityCluster: "Majestic Cyber Mule Syndicate",
    demographics: "Resident of Indiranagar, MBA Finance, runs defunct import-export firm.",
    history: "Provides financial backing and laundering channels for online cyber-fraud gangs operating in Central Bangalore.",
    financialAccounts: ["ACC-SEC-06"],
    vehicles: ["VEH-02"],
    associates: ["ACC-002"]
  }
];

export const mockFinancialAccounts = [
  {
    accountId: "ACC-SEC-01",
    accountNumber: "501004392019",
    bank: "HDFC Bank, Yelahanka Branch",
    ownerId: "ACC-001",
    balance: 42000,
    transactions: [
      { date: "2026-04-13", amount: 150000, type: "Deposit", source: "Cash deposit via ATM", targetId: null, suspicious: true },
      { date: "2026-04-14", amount: 145000, type: "Transfer", source: "Online Transfer", targetId: "ACC-SEC-05", suspicious: true }
    ]
  },
  {
    accountId: "ACC-SEC-05",
    accountNumber: "624910283041",
    bank: "SBI, Devanahalli Branch",
    ownerId: "ACC-003",
    balance: 148000,
    transactions: [
      { date: "2026-04-14", amount: 145000, type: "Receive", source: "Online Transfer", targetId: "ACC-SEC-01", suspicious: true },
      { date: "2026-04-15", amount: 48000, type: "Withdrawal", source: "ATM cash withdrawal", targetId: null, suspicious: false },
      { date: "2026-04-16", amount: 48000, type: "Withdrawal", source: "ATM cash withdrawal", targetId: null, suspicious: false },
      { date: "2026-04-17", amount: 48000, type: "Withdrawal", source: "ATM cash withdrawal", targetId: null, suspicious: true }
    ]
  },
  {
    accountId: "ACC-SEC-03",
    accountNumber: "302910384729",
    bank: "Canara Bank, Majestic Branch",
    ownerId: "ACC-002",
    balance: 8500,
    transactions: [
      { date: "2026-06-08", amount: 495000, type: "Receive", source: "IMPS Cyber Victim", targetId: "Cyber Victim AC", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true },
      { date: "2026-06-09", amount: 49000, type: "Transfer", source: "UPI Transfer", targetId: "ACC-SEC-06", suspicious: true }
    ]
  },
  {
    accountId: "ACC-SEC-06",
    accountNumber: "910283746152",
    bank: "ICICI Bank, Indiranagar",
    ownerId: "ACC-004",
    balance: 1240000,
    transactions: [
      { date: "2026-06-09", amount: 441000, type: "Receive", source: "Multiple Structured Trans", targetId: "ACC-SEC-03", suspicious: true },
      { date: "2026-06-11", amount: 430000, type: "Transfer", source: "Crypto Purchase - WazirX", targetId: "Offshore Wallet", suspicious: true }
    ]
  }
];

export const mockSocioEconomicData = [
  { area: "Yelahanka", crimeDensity: 42, literacy: 84.2, unemployment: 12.8, migrationDensity: 38.5, urbanGrowth: 15.2 },
  { area: "Majestic", crimeDensity: 78, literacy: 76.1, unemployment: 18.2, migrationDensity: 65.4, urbanGrowth: 4.8 },
  { area: "Indiranagar", crimeDensity: 22, literacy: 92.5, unemployment: 5.4, migrationDensity: 28.1, urbanGrowth: 8.6 },
  { area: "Koramangala", crimeDensity: 28, literacy: 91.0, unemployment: 6.2, migrationDensity: 34.0, urbanGrowth: 9.2 },
  { area: "Devanahalli", crimeDensity: 31, literacy: 79.8, unemployment: 14.5, migrationDensity: 48.2, urbanGrowth: 22.4 },
  { area: "Nelamangala", crimeDensity: 55, literacy: 72.3, unemployment: 19.8, migrationDensity: 52.0, urbanGrowth: 18.0 }
];

export const mockForecasts = {
  trends: [
    { month: "Jan", actual: 120, forecast: 120, lower: 110, upper: 130 },
    { month: "Feb", actual: 125, forecast: 124, lower: 112, upper: 136 },
    { month: "Mar", actual: 138, forecast: 135, lower: 121, upper: 149 },
    { month: "Apr", actual: 142, forecast: 140, lower: 125, upper: 155 },
    { month: "May", actual: 148, forecast: 146, lower: 130, upper: 162 },
    { month: "Jun", actual: 155, forecast: 153, lower: 137, upper: 169 },
    { month: "Jul", actual: null, forecast: 159, lower: 141, upper: 177 },
    { month: "Aug", actual: null, forecast: 164, lower: 145, upper: 183 },
    { month: "Sep", actual: null, forecast: 158, lower: 138, upper: 178 },
    { month: "Oct", actual: null, forecast: 171, lower: 150, upper: 192 },
    { month: "Nov", actual: null, forecast: 175, lower: 152, upper: 198 },
    { month: "Dec", actual: null, forecast: 182, lower: 158, upper: 206 }
  ],
  earlyWarnings: [
    {
      id: "EW-01",
      area: "Yelahanka",
      type: "Burglary Trend Deviation",
      confidence: "High (89%)",
      description: "A 38% statistical spike in night burglaries has been detected over the past 3 weeks in Yelahanka. The modus operandi matches digital jamming profiles linked to ACC-001 and ACC-003.",
      actions: ["Increase police patrolling between 1 AM - 4 AM.", "Deploy active RF monitoring to detect signal blockers.", "Initiate local verification of absconding suspect ACC-003."]
    },
    {
      id: "EW-02",
      area: "Majestic",
      type: "Mule Account Activity Spike",
      confidence: "Medium (72%)",
      description: "New transaction surges structured below Rs. 50,000 have been identified across 3 private sector banks in Majestic, resembling the active profile of ACC-002.",
      actions: ["Alert branch managers to flag accounts receiving frequent UPI transfers from out-of-state mobile numbers.", "Monitor cyber helpline logins for victims routing funds to these branches."]
    }
  ]
};

// Conversational AI Intent Routing and Mock Response Generation
export const querySimulatedAI = (queryText, language = "en", role = "investigator") => {
  const q = queryText.toLowerCase().trim();
  
  const translations = {
    en: {
      underInvestigation: "Under Investigation",
      chargeSheeted: "Charge Sheeted",
      absconding: "Absconding",
      inCustody: "In Custody",
      active: "Active"
    },
    kn: {
      underInvestigation: "ತನಿಖೆಯಲ್ಲಿದೆ (Under Investigation)",
      chargeSheeted: "ದೋಷಾರೋಪಣೆ ಪಟ್ಟಿ ಸಲ್ಲಿಕೆ (Charge Sheeted)",
      absconding: "ತಲೆಮರೆಸಿಕೊಂಡಿದ್ದಾರೆ (Absconding)",
      inCustody: "ಪೊಲೀಸ್ ವಶದಲ್ಲಿ (In Custody)",
      active: "ಸಕ್ರಿಯ (Active)"
    }
  };

  const t = translations[language];

  // Lead recommendations & similar cases query
  if (q.includes("lead") || q.includes("recommend") || q.includes("similar") || q.includes("ಲೀಡ್") || q.includes("ಹೋಲಿಕೆ")) {
    const fir = mockFIRs[0];
    const answerEN = `Investigative Leads & Similar Case Analysis for **${fir.id}** (${fir.crimeType}):

1. **Automated Case Summary**:
   Night break-in at Yelahanka bungalow. Valuables worth Rs. 14.5 Lakhs stolen. RF digital signal jammer used to disable CCTV cameras.

2. **Top Similar Historical Cases**:
   - **${fir.similarCases[0].id}**: ${fir.similarCases[0].title} (**${fir.similarCases[0].similarity}% match**). Reason: ${fir.similarCases[0].reason}.
   - **${fir.similarCases[1].id}**: ${fir.similarCases[1].title} (**${fir.similarCases[1].similarity}% match**). Reason: ${fir.similarCases[1].reason}.

3. **Recommended Investigative Leads**:
   - **Lead #1 (${fir.leads[0].type})**: ${fir.leads[0].detail} [Status: **${fir.leads[0].status}**]
   - **Lead #2 (${fir.leads[1].type})**: ${fir.leads[1].detail} [Status: **${fir.leads[1].status}**]`;

    const answerKN = `**${fir.id}** ಪ್ರಕರಣದ ತನಿಖಾ ಲೀಡ್‌ಗಳು ಮತ್ತು ಹೋಲುವ ಪ್ರಕರಣಗಳ ವಿಶ್ಲೇಷಣೆ:

1. **ಸ್ವಯಂಚಾಲಿತ ಪ್ರಕರಣದ ಸಾರಾಂಶ**:
   ಯಲಹಂಕದ ಬಂಗಲೆಯಲ್ಲಿ ರಾತ್ರಿ ಕನ್ನಗಳವು. ರೂ. 14.5 ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನಾಭರಣ ಕಳುವು. ಸಿಸಿಟಿವಿ ಜ್ಯಾಮ್ ಮಾಡಲು ಆರ್‌ಎಫ್ ಡಿಜಿಟಲ್ ಜ್ಯಾಮರ್ ಬಳಕೆ.

2. **ಹೆಚ್ಚು ಹೋಲುವ ಹಳೆಯ ಪ್ರಕರಣಗಳು**:
   - **${fir.similarCases[0].id}**: ${fir.similarCases[0].title} (**${fir.similarCases[0].similarity}% ಹೋಲಿಕೆ**). ಕಾರಣ: ${fir.similarCases[0].reason}.
   - **${fir.similarCases[1].id}**: ${fir.similarCases[1].title} (**${fir.similarCases[1].similarity}% ಹೋಲಿಕೆ**). ಕಾರಣ: ${fir.similarCases[1].reason}.

3. **ಶಿಫಾರಸು ಮಾಡಲಾದ ತನಿಖಾ ಲೀಡ್‌ಗಳು**:
   - **ಲೀಡ್ #1 (${fir.leads[0].type})**: ${fir.leads[0].detail} [ಸ್ಥಿತಿ: **${fir.leads[0].status}**]
   - **ಲೀಡ್ #2 (${fir.leads[1].type})**: ${fir.leads[1].detail} [ಸ್ಥಿತಿ: **${fir.leads[1].status}**]`;

    return {
      text: language === "en" ? answerEN : answerKN,
      citations: [
        { type: "case", id: fir.id, name: fir.id },
        { type: "case", id: fir.similarCases[0].id, name: fir.similarCases[0].id }
      ],
      explainability: {
        intent: "Investigator Decision Support & Lead Generation",
        cypher: `MATCH (f:FIR {id: "FIR-2026/0401"})-[:HAS_LEAD]->(l:Lead)
MATCH (f)-[:SIMILAR_TO]->(f2:FIR)
RETURN f, l, f2`,
        sql: `SELECT * FROM case_leads WHERE fir_id = 'FIR-2026/0401';
SELECT * FROM semantic_case_vectors WHERE similarity_score > 0.85;`,
        confidence: "94.8% (Semantic Vector Nearest-Neighbors)",
        evidence: [
          { record: "Case Narrative Embedding Matrix", detail: "Cosine distance < 0.12 against Hebbal Villa robbery vector." },
          { record: "Vehicle Sightings Registry", detail: "Black Verna KA-04-MA-8890 captured at Devanahalli toll camera." }
        ]
      }
    };
  }

  // Burglary + Yelahanka
  if ((q.includes("yelahanka") || q.includes("ಯಲಹಂಕ")) && 
      (q.includes("burglary") || q.includes("ಕನ್ನಗಳವು") || q.includes("ಕಳ್ಳತನ") || q.includes("theft"))) {
    
    const cases = mockFIRs.filter(f => f.location.area === "Yelahanka");
    const accused = mockAccused.filter(a => a.associates.includes("ACC-001") || a.associates.includes("ACC-003") || a.id === "ACC-001" || a.id === "ACC-003");

    const answerEN = `Found ${cases.length} burglary cases in Yelahanka:
1. **${cases[0].id}** on ${cases[0].date} (Modus Operandi: ${cases[0].modusOperandi}) - Status: **${cases[0].status}**.
2. **${cases[1].id}** on ${cases[1].date} (Modus Operandi: ${cases[1].modusOperandi}) - Status: **${cases[1].status}**.
3. **${cases[4].id}** on ${cases[4].date} (Modus Operandi: ${cases[4].modusOperandi}) - Status: **${cases[4].status}**.

Two primary repeat offenders are linked to these burglaries:
- **${accused[0].name}** (Risk Score: **${accused[0].riskScore}%**, Cluster: **${accused[0].communityCluster}**). Linked Vehicle: **${accused[0].vehicles[0]}**.
- **${accused[1].name}** (Risk Score: **${accused[1].riskScore}%**, Status: **${accused[1].status}**). Expert in electronic smart-lock bypasses.

Network graph confirms high Betweenness Centrality (${accused[1].centralityScore}) linking these suspects.`;

    const answerKN = `ಯಲಹಂಕ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ${cases.length} ಕನ್ನಗಳವು ಪ್ರಕರಣಗಳು ಪತ್ತೆಯಾಗಿವೆ:
1. **${cases[0].id}** ದಿನಾಂಕ: ${cases[0].date} (ವಿಧಾನ: ${cases[0].modusOperandi}) - ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ: **${t.underInvestigation}**.
2. **${cases[1].id}** ದಿನಾಂಕ: ${cases[1].date} (ವಿಧಾನ: ${cases[1].modusOperandi}) - ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ: **${t.chargeSheeted}**.
3. **${cases[4].id}** ದಿನಾಂಕ: ${cases[4].date} (ವಿಧಾನ: ${cases[4].modusOperandi}) - ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ: **${t.underInvestigation}**.

ಈ ಕೃತ್ಯಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಇಬ್ಬರು ಹಳೆಯ ಅಪರಾಧಿಗಳು ಪತ್ತೆಯಾಗಿದ್ದಾರೆ:
- **${accused[0].name}** (ಅಪಾಯದ ಪ್ರಮಾಣ: **${accused[0].riskScore}%**, ಸಕ್ರಿಯ ವಾಹನ: **${accused[0].vehicles[0]}**).
- **${accused[1].name}** (ಅಪಾಯದ ಪ್ರಮಾಣ: **${accused[1].riskScore}%**, ಸ್ಥಿತಿ: **${t.absconding}**). ಸ್ಮಾರ್ಟ್ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಲಾಕ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವಲ್ಲಿ ಪರಿಣತ.`;

    return {
      text: language === "en" ? answerEN : answerKN,
      citations: [
        { type: "case", id: cases[0].id, name: cases[0].id },
        { type: "case", id: cases[1].id, name: cases[1].id },
        { type: "case", id: cases[4].id, name: cases[4].id },
        { type: "accused", id: accused[0].id, name: accused[0].name },
        { type: "accused", id: accused[1].id, name: accused[1].name }
      ],
      explainability: {
        intent: "Crime Pattern & Repeat Offender Association Retrieval",
        cypher: `MATCH (l:Location {area: "Yelahanka"})<-[:OCCURRED_AT]-(f:FIR)
MATCH (f)-[:ACCUSED_IN]->(a:Accused)
RETURN f, a`,
        sql: `SELECT * FROM fir_records WHERE area = 'Yelahanka' AND crime_type = 'Burglary';
SELECT * FROM accused_profiles WHERE id IN ('ACC-001', 'ACC-003');`,
        confidence: "98.5% (Exact record match)",
        evidence: [
          { record: `FIR Record: ${cases[0].id}`, detail: "Details incident at Yelahanka bungalows with RF jamming device indicators." },
          { record: `FIR Record: ${cases[1].id}`, detail: "CCTV signal jammer confirmed via RF analysis." },
          { record: `FIR Record: ${cases[4].id}`, detail: "Smart lock bypass using EMP device." },
          { record: `Accused Profile: ${accused[0].id}`, detail: "Signals Kiran history of burglaries in North Bangalore." },
          { record: `Accused Profile: ${accused[1].id}`, detail: "Naga's prior arrest histories with Kiran." }
        ]
      }
    };
  }

  // Financial account links / transactions
  if (q.includes("financial") || q.includes("account") || q.includes("money") || q.includes("transaction") || 
      q.includes("ಹಣಕಾಸು") || q.includes("ಖಾತೆ") || q.includes("ವರ್ಗಾವಣೆ") || q.includes("ಮನಿ")) {
    
    const account1 = mockFinancialAccounts[0];
    const account2 = mockFinancialAccounts[1];
    const account3 = mockFinancialAccounts[2];
    const account4 = mockFinancialAccounts[3];

    const answerEN = `Financial tracking of accused reveals two major suspicious transaction paths:

1. **Burglary Gang Money Trail**:
   - Account **${account1.accountNumber}** (Accused: 'Signal' Kiran) received a cash deposit of **Rs. 1,50,000** on 2026-04-13.
   - On 2026-04-14, this account transferred **Rs. 1,45,000** online to account **${account2.accountNumber}** belonging to 'EMP' Naga (ACC-003).
   - ACC-003 structured cash withdrawals under Rs. 50,000 to avoid bank alerts.

2. **Cyber Fraud Laundering Channel**:
   - Mule Account **${account3.accountNumber}** (operated by Mohammad Yusuf) received **Rs. 4,95,000** from a victim on 2026-06-08.
   - Yusuf structured 10 UPI transfers of **Rs. 49,000** to account **${account4.accountNumber}** belonging to Vikram Malhotra (ACC-004).
   - Malhotra routed the funds to offshore cryptocurrency accounts.`;

    const answerKN = `ಆರೋಪಿಗಳ ಹಣಕಾಸು ವಹಿವಾಟು ವಿಶ್ಲೇಷಣೆಯಿಂದ ಎರಡು ಪ್ರಮುಖ ಅನುಮಾನಾಸ್ಪದ ವರ್ಗಾವಣೆಗಳು ಪತ್ತೆಯಾಗಿವೆ:

1. **ಕನ್ನಗಳವು ಗ್ಯಾಂಗ್ ಮನಿ ಟ್ರಯಲ್**:
   - ಖಾತೆ **${account1.accountNumber}** (ಆರೋಪಿ: 'ಸಿಗ್ನಲ್' ಕಿರಣ್) ದಿನಾಂಕ 2026-04-13 ರಂದು **ರೂ. 1,50,000** ನಗದು ಜಮೆಯನ್ನು ಸ್ವೀಕರಿಸಿದೆ.
   - 2026-04-14 ರಂದು ಈ ಖಾತೆಯಿಂದ **ರೂ. 1,45,000** ಅನ್ನು 'ಇಎಮ್‌ಪಿ' ನಾಗ (ACC-003) ಅವರ ಖಾತೆ **${account2.accountNumber}** ಗೆ ವರ್ಗಾಯಿಸಲಾಗಿದೆ.

2. **ಸೈಬರ್ ವಂಚನೆ ಮನಿ ಲಾಂಡರಿಂಗ್ ಚಾನಲ್**:
   - ಮುಲೆ ಖಾತೆ **${account3.accountNumber}** (ಮೊಹಮ್ಮದ್ ಯೂಸುಫ್) ದಿನಾಂಕ 2026-06-08 ರಂದು ಬಲಿಪಶುವಿನಿಂದ **ರೂ. 4,95,000** ಸ್ವೀಕರಿಸಿದೆ.
   - ಯೂಸುಫ್ ವಿಕ್ರಮ್ ಮಲ್ಹೋತ್ರಾ (ACC-004) ಅವರ ಖಾತೆ **${account4.accountNumber}** ಗೆ ತಲಾ **ರೂ. 49,000** ರಂತೆ ಹತ್ತು ಪ್ರತ್ಯೇಕ ಯುಪಿಐ ವರ್ಗಾವಣೆಗಳನ್ನು ಮಾಡಿದ್ದಾರೆ.`;

    return {
      text: language === "en" ? answerEN : answerKN,
      citations: [
        { type: "account", id: account1.accountId, name: account1.accountNumber },
        { type: "account", id: account2.accountId, name: account2.accountNumber },
        { type: "account", id: account3.accountId, name: account3.accountNumber },
        { type: "account", id: account4.accountId, name: account4.accountNumber }
      ],
      explainability: {
        intent: "Financial Transaction Linkage & Anomaly Trace",
        cypher: `MATCH (a1:Accused)-[:OWNS]->(ac1:FinancialAccount)-[t:TRANSACTED_WITH]->(ac2:FinancialAccount)<-[:OWNS]-(a2:Accused)
WHERE t.suspicious = true
RETURN a1, ac1, t, ac2, a2`,
        sql: `SELECT * FROM transactions WHERE suspicious_flag = 1 AND amount > 40000;
SELECT * FROM bank_accounts WHERE owner_id IN ('ACC-001', 'ACC-002', 'ACC-003', 'ACC-004');`,
        confidence: "96.2% (Graph path validation verified)",
        evidence: [
          { record: `Bank Account Record: ${account1.accountNumber}`, detail: "Cash deposit matches the day after Yelahanka burglary FIR-2026/0401." },
          { record: `Transaction Log: Transfer to ${account2.accountNumber}`, detail: "Funds shifted to co-accused within 24 hours." },
          { record: `Transaction Log: Structuring in Majestic`, detail: "10 UPI deposits under the Rs. 50,000 alert ceiling from Yusuf to Vikram." }
        ]
      }
    };
  }

  // Profile or accused search
  if (q.includes("accused") || q.includes("kiran") || q.includes("yusuf") || q.includes("naga") || q.includes("malhotra") ||
      q.includes("ಆರೋಪಿ") || q.includes("ಕಿರಣ್") || q.includes("ಯೂಸುಫ್") || q.includes("ನಾಗ") || q.includes("ಮಲ್ಹೋತ್ರಾ")) {
    
    let aNode = mockAccused[0];
    if (q.includes("yusuf") || q.includes("ಯೂಸುಫ್")) aNode = mockAccused[1];
    else if (q.includes("naga") || q.includes("ನಾಗ")) aNode = mockAccused[2];
    else if (q.includes("malhotra") || q.includes("ಮಲ್ಹೋತ್ರಾ")) aNode = mockAccused[3];

    const answerEN = `Retrieved profile details for **${aNode.name}** (Accused ID: **${aNode.id}**):
- **Age**: ${aNode.age}
- **Status**: **${aNode.status}**
- **Risk Score**: **${aNode.riskScore}%** (Centrality Score: ${aNode.centralityScore})
- **Community Cluster**: ${aNode.communityCluster}
- **Primary Modus Operandi**: ${aNode.primaryMO}
- **Demographics / Social Risk Factors**: ${aNode.demographics}
- **Known History**: ${aNode.history}
- **Financial Accounts Linked**: ${aNode.financialAccounts.join(", ")}
- **Linked Vehicles**: ${aNode.vehicles.length > 0 ? aNode.vehicles.join(", ") : "None registered"}`;

    const answerKN = `**${aNode.name}** (ಆರೋಪಿ ಐಡಿ: **${aNode.id}**) ಅವರ ಪ್ರೊಫೈಲ್ ವಿವರಗಳು ಹೀಗಿವೆ:
- **ವಯಸ್ಸು**: ${aNode.age}
- **ಸ್ಥಿತಿ**: **${aNode.status === "In Custody" ? t.inCustody : (aNode.status === "Absconding" ? t.absconding : t.active)}**
- **ಅಪಾಯದ ಪ್ರಮಾಣ**: **${aNode.riskScore}%**
- **ಅಪರಾಧ ಜಾಲದ ಸಮೂಹ**: ${aNode.communityCluster}
- **ಮುಖ್ಯ ಅಪರಾಧ ವಿಧಾನ (MO)**: ${aNode.primaryMO}
- **ಜನಸಂಖ್ಯಾಶಾಸ್ತ್ರ**: ${aNode.demographics}`;

    return {
      text: language === "en" ? answerEN : answerKN,
      citations: [
        { type: "accused", id: aNode.id, name: aNode.name }
      ],
      explainability: {
        intent: "Habitual Offender Profile Inquiry",
        cypher: `MATCH (a:Accused {id: "${aNode.id}"})
OPTIONAL MATCH (a)-[:OWNS]->(ac:FinancialAccount)
OPTIONAL MATCH (a)-[:ASSOCIATE_OF]-(assoc:Accused)
RETURN a, ac, assoc`,
        sql: `SELECT * FROM accused_profiles WHERE id = '${aNode.id}';
SELECT * FROM offender_risk_metrics WHERE accused_id = '${aNode.id}';`,
        confidence: "100% (Unique Database ID matching)",
        evidence: [
          { record: `Accused Record: ${aNode.id}`, detail: `Fully populated profile dossier of ${aNode.name}.` }
        ]
      }
    };
  }

  // FIR / Case / Incident general query
  if (q.includes("fir") || q.includes("case") || q.includes("incident") || q.includes("ಪ್ರಕರಣ")) {
    const listEN = mockFIRs.map(f => `- **${f.id}** (${f.crimeType} in ${f.location.area}): Status **${f.status}**`).join("\n");
    const listKN = mockFIRs.map(f => `- **${f.id}** (${f.location.area} ನಲ್ಲಿ ${f.crimeType}): ಸ್ಥಿತಿ **${f.status}**`).join("\n");

    return {
      text: language === "en" 
        ? `Retrieved ${mockFIRs.length} registered case records from the KSP CCTNS database:\n\n${listEN}\n\nClick on any citation below to inspect the full case timeline and leads.`
        : `ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಸಿ‍ಸಿಟಿಎನ್‌ಎಸ್ ದತ್ತಸಂಚಯದಿಂದ ${mockFIRs.length} ಪ್ರಕರಣಗಳ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಲಾಗಿದೆ:\n\n${listKN}`,
      citations: mockFIRs.map(f => ({ type: "case", id: f.id, name: f.id })),
      explainability: {
        intent: "General Case Record Retrieval",
        cypher: "MATCH (f:FIR) RETURN f LIMIT 10",
        sql: "SELECT * FROM fir_records ORDER BY date DESC LIMIT 10;",
        confidence: "99.1% (Full database scan)",
        evidence: mockFIRs.map(f => ({ record: `FIR: ${f.id}`, detail: `${f.crimeType} in ${f.location.area}` }))
      }
    };
  }

  // Cybercrime / Phishing
  if (q.includes("cyber") || q.includes("phishing") || q.includes("ಸೈಬರ್")) {
    const fir = mockFIRs[2]; // FIR-2026/0615
    const accused = mockAccused[1]; // Yusuf

    return {
      text: language === "en"
        ? `Cybercrime Incident Analysis (**${fir.id}**):\n- **Location**: ${fir.location.area} (${fir.location.station})\n- **Modus Operandi**: ${fir.modusOperandi}\n- **Primary Suspect**: **${accused.name}** (${accused.id}) - ${accused.primaryMO}.\n- **Stolen Amount**: Rs. 4,95,000 (Routed via 10 structured UPI transfers under Rs. 50,000).`
        : `ಸೈಬರ್ ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ (**${fir.id}**):\n- **ಸ್ಥಳ**: ${fir.location.area}\n- **ವಿಧಾನ**: ${fir.modusOperandi}\n- **ಮುಖ್ಯ ಆರೋಪಿ**: **${accused.name}** (${accused.id}).`,
      citations: [
        { type: "case", id: fir.id, name: fir.id },
        { type: "accused", id: accused.id, name: accused.name }
      ],
      explainability: {
        intent: "Cybercrime Investigation Trace",
        cypher: `MATCH (f:FIR {crimeType: "Cybercrime"})-[:ACCUSED_IN]->(a:Accused) RETURN f, a`,
        sql: `SELECT * FROM fir_records WHERE crime_type = 'Cybercrime';`,
        confidence: "97.4% (Cyber Helpline 1930 Match)",
        evidence: [
          { record: `FIR: ${fir.id}`, detail: fir.details },
          { record: `Mule Account: ACC-SEC-03`, detail: "Canara Bank Majestic branch account operated by Yusuf." }
        ]
      }
    };
  }

  // Stats / Database Summary
  if (q.includes("stat") || q.includes("summary") || q.includes("total") || q.includes("ಸಂಖ್ಯೆ") || q.includes("ಸಾರಾಂಶ")) {
    return {
      text: language === "en"
        ? `KSP Crime Database System Summary:\n- **Registered FIRs**: ${mockFIRs.length} active cases\n- **Tracked Offenders**: ${mockAccused.length} habitual profiles (${mockAccused.filter(a => a.status === 'In Custody').length} in custody, ${mockAccused.filter(a => a.status === 'Absconding').length} absconding)\n- **Monitored Financial Accounts**: ${mockFinancialAccounts.length} suspicious accounts\n- **Identified Crime Clusters**: 2 major syndicates (North Bangalore Burglaries & Majestic Cyber Mules)`
        : `ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ದತ್ತಸಂಚಯದ ಸಾರಾಂಶ:\n- **ಒಟ್ಟು ಪ್ರಕರಣಗಳು (FIR)**: ${mockFIRs.length}\n- **ಅಪರಾಧಿಗಳ ಪ್ರೊಫೈಲ್**: ${mockAccused.length}\n- **ಅನುಮಾನಾಸ್ಪದ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು**: ${mockFinancialAccounts.length}\n- **ಅಪರಾಧ ಸಮೂಹಗಳು**: 2 ಜಾಲಗಳು`,
      citations: mockAccused.map(a => ({ type: "accused", id: a.id, name: a.name })),
      explainability: {
        intent: "System-wide Database Aggregation",
        cypher: "MATCH (n) RETURN labels(n), count(n)",
        sql: "SELECT COUNT(*) FROM fir_records; SELECT COUNT(*) FROM accused_profiles;",
        confidence: "100%",
        evidence: [
          { record: "System Registry Index", detail: "Real-time state database metrics compiled." }
        ]
      }
    };
  }

  // Dynamic substring search fallback
  const matchedCases = mockFIRs.filter(f => f.details.toLowerCase().includes(q) || f.modusOperandi.toLowerCase().includes(q) || f.location.area.toLowerCase().includes(q));
  const matchedAccused = mockAccused.filter(a => a.name.toLowerCase().includes(q) || a.primaryMO.toLowerCase().includes(q) || a.history.toLowerCase().includes(q));

  if (matchedCases.length > 0 || matchedAccused.length > 0) {
    let respEN = `Search results matching "${queryText}":\n`;
    if (matchedCases.length > 0) {
      respEN += `\n**Matching Case Records**:\n` + matchedCases.map(f => `- **${f.id}** (${f.crimeType} in ${f.location.area}): ${f.details}`).join("\n");
    }
    if (matchedAccused.length > 0) {
      respEN += `\n\n**Matching Accused Profiles**:\n` + matchedAccused.map(a => `- **${a.name}** (${a.id}): Risk Score ${a.riskScore}%, MO: ${a.primaryMO}`).join("\n");
    }

    return {
      text: respEN,
      citations: [
        ...matchedCases.map(f => ({ type: "case", id: f.id, name: f.id })),
        ...matchedAccused.map(a => ({ type: "accused", id: a.id, name: a.name }))
      ],
      explainability: {
        intent: "Dynamic Substring Database Search",
        cypher: `MATCH (n) WHERE n.details CONTAINS "${queryText}" OR n.name CONTAINS "${queryText}" RETURN n`,
        sql: `SELECT * FROM fir_records WHERE details LIKE '%${queryText}%';`,
        confidence: "95.0% (Text search hit)",
        evidence: [
          { record: "Dynamic Search Result", detail: `Matched ${matchedCases.length} cases and ${matchedAccused.length} profiles.` }
        ]
      }
    };
  }

  // Fallback
  const fallbackEN = `Received your query: "${queryText}". I can assist you with querying the Karnataka State Police Crime Database. 

Here are recommended queries you can try:
1. "Show repeat burglary offenders in Yelahanka and their modus operandi."
2. "Show investigative leads and similar cases for Yelahanka burglary."
3. "Trace the suspicious financial transactions and money trails for Yelahanka cases."
4. "List cybercrime phishing cases in Indiranagar."
5. "Show database summary and total case counts."`;

  const fallbackKN = `ನಿಮ್ಮ ಪ್ರಶ್ನೆ: "${queryText}". ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಅಪರಾಧ ದತ್ತಸಂಚಯದಿಂದ ಮಾಹಿತಿ ಹುಡುಕಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.

ನೀವು ಕೇಳಬಹುದಾದ ಪ್ರಶ್ನೆಗಳು:
1. "ಯಲಹಂಕ ಕನ್ನಗಳವು ಪ್ರಕರಣಗಳ ಹಳೆಯ ಅಪರಾಧಿಗಳು ತೋರಿಸಿ."
2. "ಯಲಹಂಕ ಪ್ರಕರಣಗಳ ತನಿಖಾ ಲೀಡ್‌ಗಳು ಮತ್ತು ಹೋಲುವ ಪ್ರಕರಣಗಳನ್ನು ತೋರಿಸಿ."
3. "ಯಲಹಂಕ ಪ್ರಕರಣಗಳ ಅನುಮಾನಾಸ್ಪದ ಹಣಕಾಸು ವರ್ಗಾವಣೆಗಳು ಪತ್ತೆಹಚ್ಚಿ."
4. "ಇಂದಿರಾ ನಗರ ಸೈಬರ್ ಅಪರಾಧ ಪ್ರಕರಣಗಳನ್ನು ತೋರಿಸಿ."`;

  return {
    text: language === "en" ? fallbackEN : fallbackKN,
    citations: [],
    explainability: {
      intent: "Interactive Chat Navigation Guidance",
      cypher: "None (Help navigation)",
      sql: "None (Help navigation)",
      confidence: "100%",
      evidence: [
        { record: "System Metadata Help Docs", detail: "Provides guidance to the user on chatbot capabilities." }
      ]
    }
  };
};

