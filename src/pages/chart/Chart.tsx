import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import { Household } from '../home/Home.type';
import './Chart.scss';
import 'chart.js/auto';
import ChartBar from './charts/ChartBar';
import ChartPie from './charts/ChartPie';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

function ChartComponent({
  errorMessage,
  household,
  isLoading,
}: {
  errorMessage: string;
  household?: Household;
  isLoading: boolean;
}) {
  const { year, city, district } = useParams();
  return (
    <div className="Chart">
      {isLoading && <Spin indicator={antIcon} />}
      {!!errorMessage && <Alert message={errorMessage} type="error" />}
      {!!household && !isLoading && !!year && !!city && !!district && (
        <>
          <h1>{`${year}年 ${city} ${district}`}</h1>
          {/* transform props to immute value for React.memo */}
          <div className="chartGroup">
            <ChartBar
              single_m={household.single_m}
              ordinary_m={household.ordinary_m}
              single_f={household.single_f}
              ordinary_f={household.ordinary_f}
            />
            <ChartPie
              single_m={household.single_m}
              ordinary_m={household.ordinary_m}
              single_f={household.single_f}
              ordinary_f={household.ordinary_f}
            />
          </div>
        </>
      )}
    </div>
  );
}

ChartComponent.defaultProps = {
  household: undefined,
};
export default ChartComponent;
