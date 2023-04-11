import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Household } from '../../home/Home.type';
import colorVariable from '../../../sass/color';

const { colorSecondaryDark, colorSecondaryLight, colorDark } = colorVariable;

function ChartPie({ single_m, ordinary_m, single_f, ordinary_f }: Household) {
  const householdSum = single_m + ordinary_m + single_f + ordinary_f;

  const pieData = {
    labels: ['共同生活', '獨立生活'],
    datasets: [
      {
        data: [ordinary_m + ordinary_f, single_m + single_f],
        backgroundColor: [colorSecondaryDark, colorSecondaryLight],
        spacing: 1,
      },
    ],
  };
  const pieOptions = {
    // responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      title: {
        text: '戶數統計',
        color: colorDark,
        font: {
          weight: 'bold',
          size: 20,
        },
        display: true,
        position: 'top' as 'top',
      },
      legend: {
        position: 'bottom' as 'bottom',
        labels: {
          padding: 18,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      datalabels: {
        position: 'outside',
        display: true,
        // color: 'black',
        anchor: 'end' as 'end',
        align: 'end' as 'end',
        formatter: (x: number) => {
          return `${((x / householdSum) * 100).toFixed(2)}%`;
        },
        offset: -3,
      },
    },
  };

  return (
    <div className="chartBox">
      <Pie
        data={pieData}
        options={pieOptions}
        // @ts-ignore
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}

export default React.memo(ChartPie);
