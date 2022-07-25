import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Your current budget', 'Missing budget'],
  datasets: [
    {
      data: [80, 20],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    },
  ],
};
  
const options = {
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start'
    },
    datalabels: {
      display: true,
      color: ['#3fa0a0', '#d7506d']
    }
  }}

const BudgetChart = ( ) => {
  return (
    <ChartWrapper>
      <Pie data={data} plugins={[ChartDataLabels]}  options={options} />
    </ChartWrapper>
  )
}

export default BudgetChart

const ChartWrapper = styled.div`
    width: 50%;
    padding: 0 1.6rem;
`   