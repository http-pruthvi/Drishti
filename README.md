# DRISHTI (ದೃಷ್ಟಿ) · Intelligent Conversational AI & Crime Analytics Platform

> **Submitted for Datathon 2026 | Team AI_vengers**  
> **Challenge**: Intelligent Conversational AI & Analytics Platform for the Karnataka State Police (KSP) Crime Database

---

![DRISHTI Banner](https://img.shields.io/badge/Platform-Karnataka%20State%20Police-blue?style=for-the-badge&logo=shield)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS%20%7C%20ECharts%20%7C%20Leaflet-darkgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache%202.0-orange?style=for-the-badge)

DRISHTI (ದೃಷ್ಟಿ) is a conversational AI and analytics platform designed to empower Karnataka State Police (KSP) investigators, crime analysts, and policy executives. The platform enables plain-language querying — typed or spoken, in **English or Kannada** — over structured FIR records, accused dossiers, victim registers, and financial account linkages while surfacing hidden criminal networks, modus operandi patterns, and proactive early warning alerts.

---

## 🌟 Key Capabilities (All 10 Brief Requirements Implemented)

1. **💬 Conversational Crime Intelligence Interface**:
   - RAG-grounded natural language queries in English and Kannada.
   - Real-time **Speech-to-Text (ASR)** input and **Text-to-Speech (TTS)** audio readout.
   - Instant PDF case report printing and session history preservation.

2. **🕸️ Criminal Network & Link Analysis**:
   - Interactive SVG force-layout relationship graph connecting Accused, Cases, Locations, Accounts, and Vehicles (`VEH-01`).
   - **Community Cluster Hulls** (*North Bangalore Burglary Gang* vs *Majestic Cyber Mule Syndicate*).
   - **Betweenness Centrality scoring** for identifying gang coordinators.

3. **📍 Crime Pattern & Hotspot Analytics**:
   - Interactive dark-mode **Leaflet.js** map displaying geospatial heat circles over Yelahanka and Majestic.
   - **Apache ECharts** time-series decomposition tracking seasonal crime volume shifts.

4. **📊 Sociological & Demographic Crime Insights**:
   - Ward-level correlation plots matching crime density against unemployment, literacy, and urbanization rates.
   - Built-in analytical warnings prohibiting community profiling bias.

5. **👤 Criminology-Based Offender Profiling**:
   - Habitual offender dossiers featuring SHAP-inspired risk meters (progress sparklines).
   - MO similarity tags and demographic risk context.

6. **🔍 Investigator Decision Support**:
   - Automated case timeline generation.
   - **Semantic Vector Case Similarity Search** with percentage match scores (e.g., *94% match*).
   - AI Investigative Lead Recommendations (*Toll camera vehicle traces & pawnbroker alerts*).

7. **💳 Financial Crime & Transaction Link Analysis**:
   - Visual money trail node linkages.
   - Automated detection of UPI structuring transfers under the Rs. 50,000 alert ceiling.
   - **One-Click FIU-IND Suspicious Activity Report (STR) XML Payload Exporter**.

8. **🔮 Crime Forecasting & Early Warning Systems**:
   - 30-day predictive volume charts with shaded upper/lower confidence bands.
   - Real-time early warning board triggering alerts when incident rates breach 95th percentiles.

9. **🛡️ Explainable AI & Transparent Analytics**:
   - Slide-out Explainability Panel rendering identified query intents, generated **Cypher (Graph DB)** and **SQL (CCTNS)** query trails, confidence metrics, and grounded evidence records.

10. **🔐 Secure Role-Based Governance & Audit Logging**:
    - Dual persona authentication (**Investigator** vs **Analyst**).
    - Field-level victim data masking.
    - Slide-over **Immutable Audit Log Registry** tracking all user queries and record-view actions.

---

## 🏗️ System Architecture

```
                       ┌──────────────────────────────────────────┐
                       │     Presentation & Conversational UI     │
                       │  React 18 · Web Speech ASR/TTS · Leaflet │
                       └────────────────────┬─────────────────────┘
                                            │
                       ┌────────────────────▼─────────────────────┐
                       │    Conversational Orchestration Layer    │
                       │   Intent Router · RAG Grounding Engine   │
                       └────────────────────┬─────────────────────┘
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        │                                   │                                   │
┌───────▼─────────┐               ┌─────────▼─────────┐               ┌─────────▼─────────┐
│ Network Engine  │               │ Analytics Engine  │               │ Financial Engine  │
│ Community Hulls │               │ ECharts Hotspots  │               │ FIU-IND Exporter  │
└───────┬─────────┘               └─────────┬─────────┘               └─────────┬─────────┘
        │                                   │                                   │
        └───────────────────────────────────┼───────────────────────────────────┘
                                            │
                       ┌────────────────────▼─────────────────────┐
                       │       Secure Data & Knowledge Graph      │
                       │ FIRs · Accused · Accounts · Vector Store │
                       └──────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 in Vite
- **Styling & Icons**: Tailwind CSS (Dark Mode by default), Lucide React
- **Geospatial Mapping**: Leaflet.js with Carto Dark tiles
- **Data Visualization**: Apache ECharts
- **Voice UI**: Native Web Speech API (ASR / TTS)
- **Typography**: Outfit, DM Sans, JetBrains Mono

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/http-pruthvi/Drishti.git
   cd Drishti
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

---

## 🔑 Demo Login Credentials

You can use the **⚡ Autofill Demo Credentials** button on the login screen or enter the following:

| Role | Name | Badge Number | Passcode |
|---|---|---|---|
| **Investigator View** | Inspector Gowda | `KSP-2019-8802` | `admin` |
| **Analyst View** | Senior Analyst Kavitha | `KSP-2021-0043` | `admin` |

---

## 📂 Project Structure

```
Drishti/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── LICENSE
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockCrimeData.js          # Core Knowledge Graph & Intent Router
    └── components/
        ├── Login.jsx                 # Role-based Portal Entry
        ├── Header.jsx                # Session Navbar & Audit Log Drawer
        ├── ChatInterface.jsx         # Conversational Voice & PDF Interface
        ├── ExplainabilityPanel.jsx   # SQL/Cypher Query Reasoning Inspector
        ├── NetworkGraph.jsx          # Interactive Force Link & Cluster Graph
        ├── CrimeAnalytics.jsx        # Leaflet Maps & ECharts Volatility
        ├── OffenderProfiler.jsx      # Behavioral MO & Risk Scorecards
        ├── FinancialLinkage.jsx      # Money Trails & FIU-IND Export Modal
        ├── ForecastingView.jsx       # 30-Day Projections & Early Warnings
        └── SociologicalInsights.jsx  # Ward Socio-Economic Correlation
```

---

## 📄 License & Compliance

This project is licensed under the **Apache License 2.0**. Developed for evaluation in **Datathon 2026**.
All data entries in the mock database are synthetic and designed for demonstration purposes in accordance with due process directives.
