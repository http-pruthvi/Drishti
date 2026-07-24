import React, { useState } from 'react';
import { User, FileText, MapPin, Landmark, HelpCircle, Network, Car, Layers } from 'lucide-react';

const initialNodes = [
  // Accused
  { id: "ACC-001", label: "Signal Kiran", type: "accused", x: 250, y: 150, risk: 88, centrality: 0.82, cluster: "North Bangalore Burglary Gang", details: "CCTV signal jammer, linked to burglaries." },
  { id: "ACC-003", label: "EMP Naga", type: "accused", x: 200, y: 300, risk: 92, centrality: 0.91, cluster: "North Bangalore Burglary Gang", details: "Smart lock override specialist, absconding." },
  { id: "ACC-002", label: "Mohammad Yusuf", type: "accused", x: 550, y: 150, risk: 75, centrality: 0.78, cluster: "Majestic Cyber Mule Syndicate", details: "Mule account coordinator in cybercrime cases." },
  { id: "ACC-004", label: "Vikram Malhotra", type: "accused", x: 600, y: 320, risk: 68, centrality: 0.71, cluster: "Majestic Cyber Mule Syndicate", details: "Financial backer, routes funds offshore." },
  
  // Vehicles
  { id: "VEH-01", label: "Black Verna", type: "vehicle", x: 140, y: 200 },
  { id: "VEH-02", label: "White Honda City", type: "vehicle", x: 700, y: 260 },

  // Cases
  { id: "FIR-2026/0401", label: "FIR-0401 (Burglary)", type: "case", x: 100, y: 80, status: "Under Investigation" },
  { id: "FIR-2026/0502", label: "FIR-0502 (Burglary)", type: "case", x: 380, y: 90, status: "Charge Sheeted" },
  { id: "FIR-2026/0710", label: "FIR-0710 (Burglary)", type: "case", x: 80, y: 330, status: "Under Investigation" },
  { id: "FIR-2026/0615", label: "FIR-0615 (Cyber)", type: "case", x: 450, y: 220, status: "Under Investigation" },
  { id: "FIR-2026/0688", label: "FIR-0688 (Fraud)", type: "case", x: 740, y: 150, status: "Under Investigation" },

  // Locations
  { id: "LOC-YEL", label: "Yelahanka", type: "location", x: 250, y: 40 },
  { id: "LOC-MAJ", label: "Majestic", type: "location", x: 650, y: 50 },

  // Accounts
  { id: "ACC-SEC-01", label: "A/C ...2019", type: "account", x: 350, y: 240 },
  { id: "ACC-SEC-05", label: "A/C ...3041", type: "account", x: 320, y: 380 },
  { id: "ACC-SEC-03", label: "A/C ...4729", type: "account", x: 480, y: 350 },
  { id: "ACC-SEC-06", label: "A/C ...1524", type: "account", x: 680, y: 400 }
];

const initialLinks = [
  // Burglary Gang Links
  { source: "ACC-001", target: "ACC-003", label: "ASSOCIATE_OF" },
  { source: "ACC-001", target: "VEH-01", label: "USED_VEHICLE" },
  { source: "ACC-004", target: "VEH-02", label: "USED_VEHICLE" },
  { source: "ACC-001", target: "FIR-2026/0401", label: "ACCUSED_IN" },
  { source: "ACC-001", target: "FIR-2026/0502", label: "ACCUSED_IN" },
  { source: "ACC-003", target: "FIR-2026/0401", label: "ACCUSED_IN" },
  { source: "ACC-003", target: "FIR-2026/0710", label: "ACCUSED_IN" },
  { source: "FIR-2026/0401", target: "LOC-YEL", label: "LOCATED_AT" },
  { source: "FIR-2026/0502", target: "LOC-YEL", label: "LOCATED_AT" },
  { source: "FIR-2026/0710", target: "LOC-YEL", label: "LOCATED_AT" },

  // Cyber Fraud Links
  { source: "ACC-002", target: "ACC-004", label: "ASSOCIATE_OF" },
  { source: "ACC-002", target: "FIR-2026/0615", label: "ACCUSED_IN" },
  { source: "ACC-002", target: "FIR-2026/0688", label: "ACCUSED_IN" },
  { source: "ACC-004", target: "FIR-2026/0688", label: "ACCUSED_IN" },
  { source: "FIR-2026/0688", target: "LOC-MAJ", label: "LOCATED_AT" },

  // Financial Links
  { source: "ACC-001", target: "ACC-SEC-01", label: "OWNS" },
  { source: "ACC-003", target: "ACC-SEC-05", label: "OWNS" },
  { source: "ACC-SEC-01", target: "ACC-SEC-05", label: "TRANSACTED_WITH", suspicious: true },

  { source: "ACC-002", target: "ACC-SEC-03", label: "OWNS" },
  { source: "ACC-004", target: "ACC-SEC-06", label: "OWNS" },
  { source: "ACC-SEC-03", target: "ACC-SEC-06", label: "TRANSACTED_WITH", suspicious: true }
];

function NetworkGraph({ language, onCitationClick }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [links] = useState(initialLinks);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [showClusters, setShowClusters] = useState(true);

  // SVG dimensions
  const width = 850;
  const height = 480;

  // Handle Dragging
  const handleMouseDown = (nodeId, e) => {
    setDraggedNode(nodeId);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!draggedNode) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    // Boundary clamp
    const clampedX = Math.max(20, Math.min(width - 20, x));
    const clampedY = Math.max(20, Math.min(height - 20, y));

    setNodes(prev => prev.map(node => 
      node.id === draggedNode ? { ...node, x: clampedX, y: clampedY } : node
    ));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'accused': return <User className="w-4.5 h-4.5" />;
      case 'case': return <FileText className="w-4.5 h-4.5" />;
      case 'location': return <MapPin className="w-4.5 h-4.5" />;
      case 'account': return <Landmark className="w-4.5 h-4.5" />;
      case 'vehicle': return <Car className="w-4.5 h-4.5" />;
      default: return <HelpCircle className="w-4.5 h-4.5" />;
    }
  };

  const getNodeColor = (type, nodeRisk) => {
    switch (type) {
      case 'accused':
        return nodeRisk > 80 
          ? 'fill-rose-500 stroke-rose-700 text-rose-500 bg-rose-500/10' 
          : 'fill-orange-400 stroke-orange-600 text-orange-400 bg-orange-400/10';
      case 'case':
        return 'fill-blue-500 stroke-blue-700 text-blue-500 bg-blue-500/10';
      case 'location':
        return 'fill-emerald-500 stroke-emerald-700 text-emerald-500 bg-emerald-500/10';
      case 'account':
        return 'fill-amber-500 stroke-amber-700 text-amber-500 bg-amber-500/10';
      case 'vehicle':
        return 'fill-purple-500 stroke-purple-700 text-purple-500 bg-purple-500/10';
      default:
        return 'fill-zinc-400 stroke-zinc-600 text-zinc-400 bg-zinc-400/10';
    }
  };

  // Check if link is highlighted
  const isLinkActive = (link) => {
    if (!hoveredNode) return true;
    return link.source === hoveredNode || link.target === hoveredNode;
  };

  // Check if node is highlighted
  const isNodeActive = (node) => {
    if (!hoveredNode) return true;
    if (node.id === hoveredNode) return true;
    return links.some(l => 
      (l.source === hoveredNode && l.target === node.id) ||
      (l.target === hoveredNode && l.source === node.id)
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Network Canvas */}
      <div className="flex-1 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'en' ? 'Criminal Network Graph & Community Detection' : 'ಅಪರಾಧ ಜಾಲ ನಕ್ಷೆ ಮತ್ತು ಸಮೂಹ ಶೋಧನೆ'}
              </h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {language === 'en' 
                  ? 'Drag nodes to reposition. Hover to highlight relations. Click to inspect dossier.' 
                  : 'ನೋಡ್ ಮರುಸ್ಥಾಪಿಸಲು ಡ್ರ್ಯಾಗ್ ಮಾಡಿ. ವಿವರ ನೋಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowClusters(!showClusters)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                showClusters 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {showClusters ? 'Clusters On' : 'Clusters Off'}
            </button>
          </div>
        </div>

        {/* SVG Network rendering */}
        <div className="relative border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl overflow-hidden shadow-inner">
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="cursor-crosshair select-none"
          >
            {/* Draw Cluster Hulls */}
            {showClusters && (
              <>
                <ellipse cx="230" cy="220" rx="200" ry="170" className="fill-rose-500/5 stroke-rose-500/20 stroke-1 stroke-dasharray" />
                <text x="210" y="380" className="fill-rose-400 text-[10px] font-bold font-mono uppercase">Cluster: North Bangalore Burglaries</text>
                
                <ellipse cx="620" cy="240" rx="190" ry="160" className="fill-blue-500/5 stroke-blue-500/20 stroke-1 stroke-dasharray" />
                <text x="560" y="390" className="fill-blue-400 text-[10px] font-bold font-mono uppercase">Cluster: Majestic Cyber Mule Syndicate</text>
              </>
            )}

            {/* Draw Links */}
            {links.map((link, idx) => {
              const srcNode = nodes.find(n => n.id === link.source);
              const tgtNode = nodes.find(n => n.id === link.target);
              if (!srcNode || !tgtNode) return null;

              const active = isLinkActive(link.source) || isLinkActive(link.target);

              return (
                <g key={idx} className="transition-all duration-300">
                  <line
                    x1={srcNode.x}
                    y1={srcNode.y}
                    x2={tgtNode.x}
                    y2={tgtNode.y}
                    className={`stroke-2 transition-all ${
                      link.suspicious 
                        ? 'stroke-rose-500 dark:stroke-rose-600 stroke-[3px] stroke-dasharray'
                        : 'stroke-zinc-300 dark:stroke-zinc-800'
                    }`}
                    style={{
                      opacity: hoveredNode ? (active ? 1 : 0.15) : 0.7,
                      strokeDasharray: link.suspicious ? "4,4" : undefined
                    }}
                  />
                  {active && !hoveredNode && (
                    <text
                      x={(srcNode.x + tgtNode.x) / 2}
                      y={(srcNode.y + tgtNode.y) / 2 - 4}
                      className="fill-zinc-400 text-[8px] font-bold text-center font-mono pointer-events-none"
                    >
                      {link.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const active = isNodeActive(node);
              const isSelected = selectedNode?.id === node.id;
              const colorClasses = getNodeColor(node.type, node.risk);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x},${node.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-all duration-300"
                  style={{ opacity: hoveredNode ? (active ? 1 : 0.2) : 1 }}
                >
                  {node.type === 'accused' && node.risk > 85 && (
                    <circle
                      r="26"
                      className="fill-transparent stroke-rose-500/25 stroke-[2px] animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  <circle
                    r="18"
                    className={`stroke-2 transition-all ${
                      isSelected 
                        ? 'fill-blue-600 dark:fill-blue-500 stroke-blue-200 dark:stroke-blue-800 scale-110 shadow-lg' 
                        : `${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]}`
                    }`}
                  />

                  <g transform="translate(-9,-9)" className="text-white pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isSelected ? 'text-white' : colorClasses.split(' ')[2]}>
                      {getNodeIcon(node.type).props.children}
                    </svg>
                  </g>

                  <text
                    y="32"
                    textAnchor="middle"
                    className={`text-[10px] font-bold tracking-tight font-sans select-none pointer-events-none transition-colors ${
                      isSelected 
                        ? 'fill-blue-600 dark:fill-blue-400 font-extrabold text-[11px]' 
                        : 'fill-zinc-700 dark:fill-zinc-300'
                    }`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Node Details Side Panel */}
      <div className="w-full xl:w-72 shrink-0">
        {selectedNode ? (
          <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4 animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase font-mono">
                  {selectedNode.type} dossier
                </span>
                <h3 className="text-base font-extrabold text-zinc-950 dark:text-zinc-50 mt-1">
                  {selectedNode.label}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-xs text-zinc-400 hover:text-zinc-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3 space-y-3 text-xs leading-normal">
              <div>
                <span className="font-semibold text-zinc-500 block mb-0.5">Reference ID:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 px-1.5 py-0.5 rounded">
                  {selectedNode.id}
                </span>
              </div>

              {selectedNode.type === 'accused' && (
                <>
                  <div>
                    <span className="font-semibold text-zinc-500 block mb-0.5">Betweenness Centrality:</span>
                    <span className="font-mono font-bold text-blue-500">{selectedNode.centrality}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-500 block mb-0.5">Community Cluster:</span>
                    <span className="text-zinc-600 dark:text-zinc-300 font-semibold">{selectedNode.cluster}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-500 block mb-0.5">Offense Profile:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedNode.details}</span>
                  </div>
                </>
              )}

              {selectedNode.type === 'case' && (
                <div>
                  <span className="font-semibold text-zinc-500 block mb-0.5">Case Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                    {selectedNode.status}
                  </span>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => onCitationClick(selectedNode.type, selectedNode.id)}
                  className="w-full text-center py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-bold border border-zinc-200 dark:border-zinc-700 transition-all text-xs"
                >
                  {language === 'en' ? 'Inspect Full Record' : 'ಸಂಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಿ'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-inner text-center text-zinc-400 flex flex-col items-center justify-center h-full min-h-[220px]">
            <Network className="w-10 h-10 mb-2 text-zinc-400 opacity-60 animate-pulse" />
            <p className="text-xs font-semibold">
              {language === 'en' ? 'Dossier Inspector' : 'ದಸ್ತಾವೇಜು ಇನ್ಸ್ಪೆಕ್ಟರ್'}
            </p>
            <p className="text-[10px] mt-1 text-zinc-500 leading-normal max-w-[200px]">
              {language === 'en' ? 'Click on any entity node inside the graph to inspect crime histories.' : 'ನಕ್ಷೆಯ ಯಾವುದೇ ನೋಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NetworkGraph;
