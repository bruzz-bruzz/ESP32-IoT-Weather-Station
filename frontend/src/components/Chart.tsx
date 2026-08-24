import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type {ChartData, ChartOptions} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        color: '#31413a',
        font: {
          size: 12,
          weight: 600,
        },
      },
    },
    tooltip: {
      backgroundColor: '#20332b',
      titleColor: '#d9f2e4',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#718078',
        maxTicksLimit: 7,
        maxRotation: 0,
      },
      border: { color: '#dbe6df' },
    },
    y: {
      beginAtZero: false,
      grid: { color: 'rgba(49, 65, 58, 0.09)' },
      ticks: { color: '#718078', padding: 8 },
      border: { display: false },
    },
  },
};
type GivenData = {
  data: ChartData<'line', number[], string>
}
export default function TypedLineGraph({data}: GivenData) {
  const visibleData: ChartData<'line', number[], string> = {
    ...data,
    datasets: data.datasets
      .filter(dataset => dataset.data.some(value => value !== null))
      .map(dataset => ({
        ...dataset,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        fill: true,
        backgroundColor: `${dataset.borderColor}18`,
      })),
  }

  return (
    <div className="chart-frame">
      <Line options={options} data={visibleData} />
    </div>
  );
}
