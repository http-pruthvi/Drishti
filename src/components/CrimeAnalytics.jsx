import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import L from 'leaflet';
import { mockFIRs } from '../data/mockCrimeData';
import { Calendar, Filter, MapPin, TrendingUp } from 'lucide-react';

function CrimeAnalytics({ language }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const chartRef = useRef(null);
  const pieRef = useRef(null);
  
  const [filterType, setFilterType] = useState('All');
  const [filterArea, setFilterArea] = useState('All');
  const [selectedCase, setSelectedCase] = useState(null);

  // Filtered FIRs
  const filteredFIRs = mockFIRs.filter(fir => {
    const typeMatch = filterType === 'All' || fir.crimeType === filterType;
    const areaMatch = filterArea === 'All' || fir.location.area === filterArea;
    return typeMatch && areaMatch;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Set up Leaflet Map center on Bangalore
    const map = L.map(mapRef.current).setView([13.03, 77.61], 11);
    mapInstanceRef.current = map;

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Draw hotspot heat circles
    // Yelahanka Burglary Hotspot
    L.circle([13.1008, 77.5963], {
      color: '#ef4444',
      fillColor: '#f87171',
      fillOpacity: 0.15,
      radius: 1200
    }).addTo(map).bindPopup("<b>Hotspot: Yelahanka</b><br/>High incidence of night house burglaries using digital jamming tools.");

    // Majestic Cyber/Fraud mule account cluster
    L.circle([12.9756, 77.5728], {
      color: '#f59e0b',
      fillColor: '#fbbf24',
      fillOpacity: 0.15,
      radius: 900
    }).addTo(map).bindPopup("<b>Hotspot: Majestic Area</b><br/>Surge in shell company operations and mule account transactions.");

    // Add Markers for individual crimes
    filteredFIRs.forEach(fir => {
      const markerColor = fir.crimeType === 'Burglary' ? '#ef4444' : (fir.crimeType === 'Cybercrime' ? '#3b82f6' : '#f59e0b');
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${markerColor}; border: 2px solid #ffffff; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([fir.location.lat, fir.location.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div class="text-xs font-sans">
            <span class="font-bold text-zinc-950 dark:text-white block">${fir.id} (${fir.crimeType})</span>
            <span class="text-zinc-500 block">Date: ${fir.date}</span>
            <span class="text-zinc-500 block">Location: ${fir.location.area}</span>
            <span class="text-zinc-700 block mt-1">MO: ${fir.modusOperandi.substring(0, 50)}...</span>
          </div>
        `);
      
      marker.on('click', () => {
        setSelectedCase(fir);
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [filterType, filterArea]);

  // Initialize ECharts for Crime Trends (Time Series & Seasonality)
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    
    // Sample monthly trend data
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0c0c0f',
        borderColor: '#1e1e24',
        textStyle: { color: '#fafafa', fontSize: 11 }
      },
      legend: {
        data: ['Burglary Vol', 'Cybercrime Vol', 'Overall Trend (Decomposed)'],
        textStyle: { color: '#71717a', fontSize: 10 }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisLine: { lineStyle: { color: '#27272a' } },
        axisLabel: { color: '#71717a', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#1e1e24' } },
        axisLabel: { color: '#71717a', fontSize: 10 }
      },
      series: [
        {
          name: 'Burglary Vol',
          type: 'bar',
          stack: 'Total',
          itemStyle: { color: '#f87171' },
          data: [35, 38, 45, 52, 49, 58, 62]
        },
        {
          name: 'Cybercrime Vol',
          type: 'bar',
          stack: 'Total',
          itemStyle: { color: '#60a5fa' },
          data: [20, 22, 28, 30, 35, 41, 44]
        },
        {
          name: 'Overall Trend (Decomposed)',
          type: 'line',
          smooth: true,
          itemStyle: { color: '#a855f7' },
          lineStyle: { width: 3 },
          data: [55, 60, 73, 82, 84, 99, 106]
        }
      ]
    };

    chart.setOption(option);

    // Pie chart for Crime distribution
    const pieChart = echarts.init(pieRef.current);
    const pieOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#0c0c0f',
        borderColor: '#1e1e24',
        textStyle: { color: '#fafafa', fontSize: 11 }
      },
      series: [
        {
          name: 'Crime Categories',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 60, name: 'Burglary', itemStyle: { color: '#ef4444' } },
            { value: 30, name: 'Cybercrime', itemStyle: { color: '#3b82f6' } },
            { value: 10, name: 'Financial Fraud', itemStyle: { color: '#fbbf24' } }
          ]
        }
      ]
    };
    pieChart.setOption(pieOption);

    const handleResize = () => {
      chart.resize();
      pieChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      pieChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="space-y-6">
      
      {/* KPI Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            {language === 'en' ? 'Active Burglary Hotspots' : 'ಕನ್ನಗಳವು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು'}
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-rose-500">3 Areas</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold">
              +1 Yelahanka
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            {language === 'en' ? 'Anomalous Transaction Volume' : 'ಅಸಹಜ ವರ್ಗಾವಣೆ ಮೊತ್ತ'}
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-amber-500">Rs. 9.36 L</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold">
              Structured
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            {language === 'en' ? 'Under Investigation' : 'ತನಿಖೆಯ ಹಂತದಲ್ಲಿದೆ'}
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-blue-500">4 Cases</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold">
              CCTNS Live
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            {language === 'en' ? 'Seasonal Volatility index' : 'ಕಾಲೋಚಿತ ಅಪರಾಧ ಸೂಚ್ಯಂಕ'}
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-purple-500">Medium</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold">
              Stable
            </span>
          </div>
        </div>
      </div>

      {/* Main Map Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Leaflet Geospatial Map */}
        <div className="flex-1 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[480px]">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  {language === 'en' ? 'Geospatial Crime Hotspots' : 'ಭೂಗೋಳಿಕ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು'}
                </h3>
                <p className="text-[10px] text-zinc-500">
                  {language === 'en' ? 'Bangalore Division Interactive Heatmaps' : 'ಬೆಂಗಳೂರು ವಿಭಾಗದ ಅಪರಾಧ ನಕ್ಷೆ'}
                </p>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2 items-center text-xs">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                <option value="All">All Crime Types</option>
                <option value="Burglary">Burglary</option>
                <option value="Cybercrime">Cybercrime</option>
                <option value="Financial Fraud">Financial Fraud</option>
              </select>
              <select 
                value={filterArea} 
                onChange={(e) => setFilterArea(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                <option value="All">All Areas</option>
                <option value="Yelahanka">Yelahanka</option>
                <option value="Majestic">Majestic</option>
                <option value="Indiranagar">Indiranagar</option>
              </select>
            </div>
          </div>

          <div ref={mapRef} className="flex-1 w-full rounded-xl overflow-hidden min-h-[360px]" style={{ zIndex: 1 }} />
        </div>

        {/* Selected Case Side Card Info */}
        <div className="w-full lg:w-80 shrink-0">
          {selectedCase ? (
            <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono">
                    {selectedCase.id}
                  </span>
                  <h4 className="text-sm font-extrabold text-zinc-950 dark:text-zinc-50 mt-1.5">
                    {selectedCase.crimeType} - {selectedCase.location.area}
                  </h4>
                </div>
                <button onClick={() => setSelectedCase(null)} className="text-zinc-400 hover:text-zinc-500 text-xs">✕</button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <p><span className="font-semibold text-zinc-500">Date/Time</span>: {selectedCase.date} | {selectedCase.time}</p>
                <p><span className="font-semibold text-zinc-500">Investigating Officer</span>: {selectedCase.investigatingOfficer}</p>
                <p><span className="font-semibold text-zinc-500">Modus Operandi</span>: {selectedCase.modusOperandi}</p>
                <p><span className="font-semibold text-zinc-500">Brief Incident</span>: {selectedCase.details}</p>
                <p><span className="font-semibold text-zinc-500">Status</span>: <span className="text-rose-500 font-bold">{selectedCase.status}</span></p>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-inner text-center text-zinc-400 flex flex-col items-center justify-center h-full min-h-[220px]">
              <MapPin className="w-10 h-10 mb-2 text-zinc-400 opacity-60" />
              <p className="text-xs font-semibold">Incident Investigator</p>
              <p className="text-[10px] mt-1 text-zinc-500 max-w-[180px] leading-normal">
                Click on any map marker pin to display the registered case dossier.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend line */}
        <div className="lg:col-span-2 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[320px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-3">
            <TrendingUp className="w-4 h-4 inline mr-1 text-purple-500" />
            {language === 'en' ? 'Time-Series Volume & Seasonal Decomposition' : 'ಸಮಯ ಶ್ರೇಣಿ ಮತ್ತು ಕಾಲೋಚಿತ ವಿಶ್ಲೇಷಣೆ'}
          </span>
          <div ref={chartRef} className="flex-1 w-full" />
        </div>

        {/* Crime breakdown pie */}
        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[320px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-3">
            <Calendar className="w-4 h-4 inline mr-1 text-blue-500" />
            {language === 'en' ? 'Volume by Classification' : 'ವರ್ಗೀಕರಣದ ಆಧಾರದ ಮೇಲೆ ಅಪರಾಧಗಳು'}
          </span>
          <div ref={pieRef} className="flex-1 w-full" />
        </div>

      </div>

    </div>
  );
}

export default CrimeAnalytics;
