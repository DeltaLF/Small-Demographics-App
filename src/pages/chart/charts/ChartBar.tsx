import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Household } from '../../home/Home.type';
import colorVariable from '../../../sass/color';

const { colorPrimaryLight, colorPrimaryDark, colorDark } = colorVariable;

function ChartBar({ single_m, ordinary_m, single_f, ordinary_f }: Household) {
  const barData = {
    labels: ['共同生活', '獨立生活'],

    datasets: [
      {
        // barThickness: 60,
        barPercentage: 0.5,
        label: '男性',
        data: [ordinary_m, single_m],
        backgroundColor: [colorPrimaryDark, colorPrimaryDark],
      },
      {
        // barThickness: 80,
        barPercentage: 0.5,
        label: '女性',
        data: [ordinary_f, single_f],
        backgroundColor: [colorPrimaryLight, colorPrimaryLight],
      },
    ],
  };

  const yScaleText: Plugin = {
    id: 'yScaleText',
    afterDraw(chart, _, optionsSub) {
      const {
        ctx,
        chartArea: { top },
        // scales: { x, y },
      } = chart;
      ctx.save();
      ctx.font = '1rem';
      ctx.fillStyle = optionsSub.fontColor;
      ctx.fillText('數量', 10, top - 20);
      ctx.restore();
    },
  };

  const barOptions = {
    // responsive: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        color: colorDark,
        text: '人口數統計',
        font: {
          size: 20,
          weight: 'bold',
        },
        display: true,
        position: 'top' as 'top',
      },
      legend: {
        title: {
          display: true,
          text: '型態',
          font: {
            weight: 'bold',
          },
          // useBorderRadius: true,
          // borderRadius: '50%',
        },
        position: 'bottom' as 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: (x: string) => {
          return parseInt(x, 10).toLocaleString();
        },
        anchor: 'end' as 'end',
        offset: -20,
        align: 'start' as 'start',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        title: { display: false },
        // title: { text: '數量', display: true, align: 'end' as 'end' },
      },
    },
  };

  return (
    <div className="chartBox">
      <Bar
        data={barData}
        options={barOptions}
        plugins={[ChartDataLabels, yScaleText]}
      />
    </div>
  );
}

export default React.memo(ChartBar);
