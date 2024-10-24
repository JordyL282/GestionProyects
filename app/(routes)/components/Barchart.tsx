// app/components/BarChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Proyecto } from '../page';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: Proyecto[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const labels = data.map(proyecto => proyecto.nombre);
  
  const historiasPendientes = data.map(proyecto => proyecto.historiasProcesoQA);
  const historiasEnCorrecion = data.map(proyecto => proyecto.historiasEnCorrecion);
  const historiasRechazadas = data.map(proyecto => proyecto.historiasRechazadas);
  const historiasEnDesarrollo = data.map(proyecto => proyecto.historiasEnDesarrollo);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Proceso QA',
        data: historiasPendientes,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'En Correccion',
        data: historiasEnCorrecion,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Rechazada',
        data: historiasRechazadas,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'En Desarrollo',
        data: historiasEnDesarrollo,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Estadísticas de Historias por Proyecto',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
