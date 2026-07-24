import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { mockForecasts } from '../data/mockCrimeData';
import { Sparkles, AlertTriangle, ShieldCheck, TrendingUp, Info } from 'lucide-react';

function ForecastingView({ language }) {
  const forecastChartRef = useRef(null);

  // Initialize ECharts Forecast with Confidence Bands
  useEffect(() => {
    const chart = echarts.init(forecastChartRef.current);

    const months = mockForecasts.trends.map(t => t.month);
    const actualData = mockForecasts.trends.map(t => t.actual);
    const forecastData = mockForecasts.trends.map(t => t.forecast);
    const lowerBand = mockForecasts.trends.map(t => t.lower);
    const upperBand = mockForecasts.trends.map(t => t.upper);

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0c0c0f',
        borderColor: '#1e1e24',
        textStyle: { color: '#fafafa', fontSize: 11 },
        formatter: function (params) {
          let res = params[0].name + '<br/>';
          params.forEach(item => {
            if (item.value !== null && item.value !== undefined) {
              res += item.marker + item.seriesName + ': ' + item.value + '<br/>';
            }
          });
          return res;
        }
      },
      legend: {
        data: ['Actual Incidents', 'Forecasted Trend', 'Upper Band', 'Lower Band'],
        textStyle: { color: '#71717a', fontSize: 10 }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: months,
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
          name: 'Actual Incidents',
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#3b82f6' },
          lineStyle: { width: 3 },
          data: actualData
        },
        {
          name: 'Forecasted Trend',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 2.5, type: 'dashed' },
          itemStyle: { color: '#a855f7' },
          data: forecastData
        },
        // Area shading for confidence bands
        {
          name: 'Upper Band',
          type: 'line',
          data: upperBand,
          lineStyle: { opacity: 0 },
          symbol: 'none',
          stack: 'confidence-band'
        },
        {
          name: 'Lower Band',
          type: 'line',
          data: lowerBand,
          lineStyle: { opacity: 0 },
          symbol: 'none',
          stack: 'confidence-band',
          areaStyle: {
            color: 'rgba(168, 85, 247, 0.1)',
            origin: 'start'
          }
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
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5.5 h-5.5 text-purple-500" />
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              {language === 'en' ? 'Crime Forecasting & Early Warning Systems' : 'ಅಪರಾಧ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಪೂರ್ವ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ'}
            </h2>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {language === 'en' 
                ? 'Time-series projection models and real-time statistical anomaly warnings.' 
                : 'ಅಪರಾಧ ಪ್ರಮಾಣದ ಮುನ್ಸೂಚನೆ ಮತ್ತು ನೈಜ ಸಮಯದ ಅಸಹಜತೆಯ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Forecast Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-4">
            <TrendingUp className="w-4 h-4 inline mr-1 text-purple-500" />
            {language === 'en' ? '30-Day Predictive Volatility Projection' : 'ಮೂವತ್ತು ದಿನಗಳ ಮುನ್ಸೂಚನೆಯ ನಕ್ಷೆ'}
          </span>
          <div ref={forecastChartRef} className="flex-1 w-full" />
        </div>

        {/* Right: Early Warning Alert Board */}
        <div className="bg-white dark:bg-darkCard border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col space-y-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-100 dark:border-zinc-800 pb-2">
            🚨 {language === 'en' ? 'Early Warning Board' : 'ಪೂರ್ವ ಎಚ್ಚರಿಕೆ ಫಲಕ'}
          </span>

          <div className="space-y-4 overflow-y-auto max-h-[320px] pr-1">
            {mockForecasts.earlyWarnings.map((warning) => (
              <div 
                key={warning.id} 
                className="p-4 bg-rose-50/40 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-800/40 rounded-xl space-y-3 shadow-inner"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded font-mono uppercase">
                      {warning.area}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-50 mt-1">
                      {warning.type}
                    </h4>
                  </div>
                  <span className="text-[10px] font-black text-rose-500">
                    {warning.confidence}
                  </span>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                  {warning.description}
                </p>

                <div className="border-t border-rose-200/50 dark:border-rose-800/25 pt-2">
                  <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                    Recommended Actions:
                  </span>
                  <ul className="list-disc pl-4 text-[10px] text-zinc-600 dark:text-zinc-300 space-y-1">
                    {warning.actions.map((act, idx) => (
                      <li key={idx} className="leading-normal">{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal flex gap-1.5">
            <Info className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>
              Warnings are generated utilizing seasonal decomposition algorithms (Prophet engine simulation) when current volumes breach the 95th confidence percentile.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ForecastingView;
