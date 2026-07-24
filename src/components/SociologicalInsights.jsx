import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { mockSocioEconomicData } from '../data/mockCrimeData';
import { Info, BarChart2, ShieldAlert } from 'lucide-react';

function SociologicalInsights({ language }) {
  const chartRef = useRef(null);
  const [selectedMetric, setSelectedMetric] = useState('unemployment'); // literacy, unemployment, migrationDensity, urbanGrowth

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const xData = mockSocioEconomicData.map(d => d.area);
    const crimeDensityData = mockSocioEconomicData.map(d => d.crimeDensity);
    
    // Select metric data
    const metricData = mockSocioEconomicData.map(d => d[selectedMetric]);
    
    const metricLabel = {
      literacy: 'Literacy Rate (%)',
      unemployment: 'Unemployment Rate (%)',
      migrationDensity: 'Migration Density (%)',
      urbanGrowth: 'Urban Growth Rate (%)'
    }[selectedMetric];

    const metricColor = {
      literacy: '#10b981', // green
      unemployment: '#ef4444', // red
      migrationDensity: '#f59e0b', // amber
      urbanGrowth: '#3b82f6' // blue
    }[selectedMetric];

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0c0c0f',
        borderColor: '#1e1e24',
        textStyle: { color: '#fafafa', fontSize: 11 }
      },
      legend: {
        data: ['Crime Density Index', metricLabel],
        textStyle: { color: '#71717a', fontSize: 10 }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: xData,
        axisLine: { lineStyle: { color: '#27272a' } },
        axisLabel: { color: '#71717a', fontSize: 10 }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Crime Index',
          splitLine: { lineStyle: { color: '#1e1e24' } },
          axisLabel: { color: '#71717a', fontSize: 10 },
          nameTextStyle: { color: '#71717a', fontSize: 9 }
        },
        {
          type: 'value',
          name: 'Metric Value',
          splitLine: { show: false },
          axisLabel: { color: '#71717a', fontSize: 10 },
          nameTextStyle: { color: '#71717a', fontSize: 9 }
        }
      ],
      series: [
        {
          name: 'Crime Density Index',
          type: 'bar',
          itemStyle: { color: '#a855f7' }, // purple
          data: crimeDensityData
        },
        {
          name: metricLabel,
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { width: 3 },
          itemStyle: { color: metricColor },
          data: metricData
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedMetric]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-5.5 h-5.5 text-purple-500" />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'en' ? 'Sociological & Demographic Insights' : 'ಸಾಮಾಜಿಕ ಮತ್ತು ಜನಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ಒಳನೋಟಗಳು'}
              </h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {language === 'en' 
                  ? 'Correlate ward-level crime density with urban growth, unemployment, and literacy.' 
                  : 'ಸಾಕ್ಷರತೆ, ನಿರುದ್ಯೋಗ ಮತ್ತು ನಗರೀಕರಣದೊಂದಿಗೆ ಅಪರಾಧ ಪ್ರಮಾಣದ ಪರಸ್ಪರ ಹೋಲಿಕೆ.'}
              </p>
            </div>
          </div>

          {/* Metric Selector */}
          <div className="flex gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-full md:w-auto">
            {['unemployment', 'literacy', 'migrationDensity', 'urbanGrowth'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg capitalize transition-all flex-1 md:flex-initial ${
                  selectedMetric === m
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {m.replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-4">
            📊 Correlation: Crime Index vs {selectedMetric.replace(/([A-Z])/g, ' $1')}
          </span>
          <div ref={chartRef} className="flex-1 w-full" />
        </div>

        {/* Right Data Grid Table */}
        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col space-y-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-100 dark:border-zinc-800 pb-2">
            📋 Ward/Taluk Profile Registry
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs leading-normal">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-2">Area</th>
                  <th className="py-2 text-right">Crime Idx</th>
                  <th className="py-2 text-right capitalize">{selectedMetric.substring(0, 8)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {mockSocioEconomicData.map((d, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 font-semibold text-zinc-800 dark:text-zinc-200">{d.area}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-rose-500">{d.crimeDensity}</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                      {d[selectedMetric]}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Correlation Causation Disclaimer (Section 5.4 requirements) */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/15 border border-amber-250 dark:border-amber-850/30 rounded-xl text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed flex gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500" />
            <div>
              <strong>Analytical Warning: Correlation is not Causation</strong>
              <p className="mt-1 opacity-90 leading-normal">
                These statistical mappings are provided strictly for high-level resource planning. Socio-economic markers are demographic indicators and must never be utilized as bias parameters in profiling individual suspects or judging criminal culpability.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SociologicalInsights;
