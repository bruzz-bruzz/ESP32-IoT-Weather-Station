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
import type {ChartOptions} from 'chart.js'
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
};
type givenData = {
    data:{
        labels:string[],
        datasets:any[]
    }
}
export default function TypedLineGraph({data}:givenData) {
  return (
    <div style={{ width: '100%', height: '400px', maxWidth: '800px', margin: '0 auto' }}>
      <Line options={options} data={data} />
    </div>
  );
}
