import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      maintainAspectRatio: false,
    },
    title: {
      display: true,
      text: 'Your anual statistics',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Mistakes',
      data: [14, 22, 18, 22, 19, 14, 11],
      backgroundColor: 'rgba(155, 0, 0, 1)',
    },
    {
      label: 'Words Per Minute',
      data: [8, 9, 12, 17, 22, 27, 32],
      backgroundColor: 'rgba(22, 142, 122, 1)',
    },
  ],
};

function Chart() {
  return <Bar height={'220px'} options={options} data={data} />;
}

export default Chart
