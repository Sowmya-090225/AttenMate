import React, { useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { getColorConfig } from '../utils/colorUtils';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title
);

const StatsDashboard = ({ subjects, average, summaries }) => {
  const [period, setPeriod] = useState('week');
  const currentSummaries = summaries ? summaries(period) : [];

  // Data for Doughnut Chart (Overall)
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalMissed = subjects.reduce((sum, s) => sum + (s.total - s.attended), 0);

  const doughnutData = {
    labels: ['Attended', 'Missed'],
    datasets: [{
      data: [totalAttended, totalMissed],
      backgroundColor: ['#10b981', '#f1f5f9'],
      borderColor: ['#10b981', '#e2e8f0'],
      borderWidth: 1,
      hoverOffset: 4
    }]
  };

  const doughnutOptions = {
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    maintainAspectRatio: false
  };

  // Data for Bar Chart (Subject Comparison)
  const barData = {
    labels: subjects.map(s => s.name.length > 15 ? s.name.substring(0, 13) + '..' : s.name),
    datasets: [{
      label: 'Attendance %',
      data: subjects.map(s => {
        const perc = s.total > 0 ? (s.attended / s.total) * 100 : 0;
        return parseFloat(perc.toFixed(1));
      }),
      backgroundColor: subjects.map(s => {
        const config = getColorConfig(s.color || 'blue');
        return config.color;
      }),
      borderRadius: 4,
      barThickness: 8,
    }]
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => subjects[items[0].dataIndex].name
        }
      }
    },
    scales: {
      x: { 
        beginAtZero: true, 
        max: 100, 
        ticks: { display: false },
        grid: { display: false },
        border: { display: false }
      },
      y: { 
        grid: { display: false },
        ticks: {
          font: { size: 10, weight: '600' },
          color: '#94a3b8',
          autoSkip: false
        },
        border: { display: false }
      }
    }
  };

  return (
    <div className="stats-dashboard">
      <div className="overall-stat glass">
        <div className="stat-info">
          <div className="stat-label">
            <TrendingUp size={18} />
            <span>Overall Performance</span>
          </div>
          <div className="stat-value">{average}%</div>
        </div>
        
        <div className="chart-view">
          <div className="doughnut-section">
            <div className="doughnut-wrapper">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="doughnut-center">
                <span className="center-val">{average}%</span>
              </div>
            </div>
          </div>
          
          <div className="bars-section">
            <div className="bar-wrapper" style={{ height: `${Math.max(120, subjects.length * 30)}px` }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="summaries-container glass">
        <div className="summary-header">
          <div className="header-title">
            <Calendar size={18} />
            <h3>History Summary</h3>
          </div>
          <div className="period-toggle">
            <button className={period === 'week' ? 'active' : ''} onClick={() => setPeriod('week')}>Week</button>
            <button className={period === 'month' ? 'active' : ''} onClick={() => setPeriod('month')}>Month</button>
          </div>
        </div>

        <div className="summary-list">
          {currentSummaries.length > 0 ? (
            currentSummaries.map((s, i) => (
              <div key={i} className="summary-row">
                <span className="summary-label">{s.label}</span>
                <div className="summary-metrics">
                  <span className="summary-counts">{s.attended}/{s.total}</span>
                  <span className={`summary-perc ${s.percentage >= 75 ? 'success' : s.percentage >= 65 ? 'warning' : 'danger'}`}>
                    {s.percentage}%
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-msg">No logs recorded yet.</p>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .stats-dashboard { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
        .overall-stat { padding: 2rem; border-radius: 2.5rem; background: rgba(255,255,255,0.02); overflow: hidden; }
        .stat-info { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .stat-label { display: flex; align-items: center; gap: 0.6rem; color: var(--text-secondary); }
        .stat-label span { font-bold: true; tracking-widest: true; text-transform: uppercase; font-size: 10px; opacity: 0.7; }
        .stat-value { font-size: 2.25rem; font-weight: 900; color: var(--text-primary); line-height: 1; }

        .chart-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .doughnut-section { display: flex; justify-content: center; padding: 0.5rem 0 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .doughnut-wrapper { position: relative; width: 130px; height: 130px; }
        .doughnut-center { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .center-val { font-size: 0.95rem; font-weight: 800; color: var(--text-primary); }
        
        .bars-section { padding-top: 0.5rem; }
        .bar-wrapper { width: 100%; transition: height 0.3s ease; }

        .summaries-container { padding: 1.5rem; }
        .summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .header-title { display: flex; align-items: center; gap: 0.5rem; }
        .header-title h3 { font-size: 1rem; font-weight: 600; }
        
        .period-toggle { display: flex; background: rgba(0, 0, 0, 0.05); padding: 0.25rem; border-radius: 0.75rem; }
        [data-theme='dark'] .period-toggle { background: rgba(255, 255, 255, 0.05); }
        .period-toggle button { padding: 0.35rem 0.75rem; border-radius: 0.6rem; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); background: transparent; }
        .period-toggle button.active { background: var(--surface-color); color: var(--text-primary); box-shadow: var(--shadow-sm); }

        .summary-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid rgba(0, 0, 0, 0.03); }
        [data-theme='dark'] .summary-row { border-bottom-color: rgba(255, 255, 255, 0.03); }
        .summary-row:last-child { border-bottom: none; }
        .summary-label { font-size: 0.9rem; font-weight: 500; }
        .summary-metrics { display: flex; align-items: center; gap: 1rem; }
        .summary-counts { font-size: 0.85rem; color: var(--text-secondary); }
        .summary-perc { font-weight: 700; font-size: 0.9rem; min-width: 45px; text-align: right; }
        .summary-perc.success { color: var(--success); }
        .summary-perc.warning { color: var(--warning); }
        .summary-perc.danger { color: var(--danger); }
        .empty-msg { text-align: center; color: var(--text-secondary); font-size: 0.85rem; padding: 1rem 0; }

        @media (max-width: 480px) {
          .chart-view { grid-template-columns: 1fr; justify-items: center; }
          .bar-wrapper { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default StatsDashboard;
