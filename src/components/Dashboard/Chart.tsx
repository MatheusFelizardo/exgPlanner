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
        '#00BFA6',
        '#EA4335'
      ],
      borderColor: [
        '#fff',
        '#FFF'
      ],
      borderWidth: 1,
    },
    
  ],
};
  
const options = {
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
      labels: {
        boxWidth: 8,
        boxHeight: 6,
        padding: 8,
        usePointStyle: true,
        pointStyle: 'circle',
        
      },
      
    },
    datalabels: {
      display: true,
      color: ['#FFF', '#FFF']
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
    width: calc(50% - .4rem);
    padding: .8rem 1.6rem;
    background: #fff;
`   