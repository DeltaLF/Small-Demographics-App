import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Plugin } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Household } from '../home/Home.type';
import './Chart.scss';
import 'chart.js/auto';
import colorVariable from '../../sass/color';

const {
  colorPrimaryLight,
  colorPrimaryDark,
  colorSecondaryDark,
  colorSecondaryLight,
} = colorVariable;

function ChartComponent({ household }: { household?: Household }) {
  let householdSum = 0;
  if (household) {
    Object.keys(household).forEach((key) => {
      householdSum += household[key as keyof Household];
    });
  }

  const barData = {
    labels: ['共同生活', '獨立生活'],

    datasets: [
      {
        // barThickness: 60,
        barPercentage: 0.5,
        label: '男性',
        data: [household?.ordinary_m || 0, household?.single_m || 0],
        backgroundColor: [colorPrimaryDark, colorPrimaryDark],
      },
      {
        // barThickness: 80,
        barPercentage: 0.5,
        label: '女性',
        data: [household?.ordinary_f || 0, household?.single_f || 0],
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
    maintainAspectRatio: false,
    plugins: {
      title: {
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

  const pieData = {
    labels: ['共同生活', '獨立生活'],
    datasets: [
      {
        data: [
          (household?.ordinary_m || 0) + (household?.ordinary_f || 0),
          (household?.single_m || 0) + (household?.single_f || 0),
        ],
        backgroundColor: [colorSecondaryDark, colorSecondaryLight],
        spacing: 1,
      },
    ],
  };
  const pieOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      title: {
        text: '戶數統計',
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
    <div className="Chart">
      <div className="bar-chart">
        {!!household && (
          <>
            <Bar
              data={barData}
              options={barOptions}
              plugins={[ChartDataLabels, yScaleText]}
            />
            <Pie
              data={pieData}
              options={pieOptions}
              // @ts-ignore
              plugins={[ChartDataLabels]}
            />
          </>
        )}
      </div>
    </div>
  );
}

ChartComponent.defaultProps = {
  household: undefined,
};
export default ChartComponent;
