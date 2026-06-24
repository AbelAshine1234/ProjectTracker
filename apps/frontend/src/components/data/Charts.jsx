'use client';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const COMMON_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false } },
    y: { grid: { color: '#F3F4F6' }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false } }
  }
};

export function LineChart({ data, title }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      label: title, data: data.map(d => d.value),
      borderColor: '#1A5C32', backgroundColor: '#1A5C32',
      tension: 0.4, borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#1A5C32'
    }]
  };
  return (
    <div className="chart-card" style={{ height: 300 }}>
      <div className="chart-card__header"><h3 className="chart-card__title">{title}</h3></div>
      <div style={{ height: 230 }}><Line options={COMMON_OPTIONS} data={chartData} /></div>
    </div>
  );
}

export function BarChart({ data, title, color = '#1A5C32' }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      label: title, data: data.map(d => d.value),
      backgroundColor: color, borderRadius: 4, barThickness: 24
    }]
  };
  return (
    <div className="chart-card" style={{ height: 300 }}>
      <div className="chart-card__header"><h3 className="chart-card__title">{title}</h3></div>
      <div style={{ height: 230 }}><Bar options={COMMON_OPTIONS} data={chartData} /></div>
    </div>
  );
}

export function DonutChart({ segments, title }) {
  const chartData = {
    labels: segments.map(s => s.label),
    datasets: [{
      data: segments.map(s => s.value),
      backgroundColor: segments.map(s => s.color),
      borderWidth: 0, hoverOffset: 4
    }]
  };
  return (
    <div className="chart-card" style={{ height: 300 }}>
      <div className="chart-card__header"><h3 className="chart-card__title">{title}</h3></div>
      <div style={{ height: 230, position: 'relative' }}>
        <Doughnut options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 12 } } } } }} data={chartData} />
      </div>
    </div>
  );
}
