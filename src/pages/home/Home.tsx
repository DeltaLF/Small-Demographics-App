import React, { useState } from 'react';
import { Button, Layout, Select, Space } from 'antd';
import './Home.scss';
import { DISTRICTS_OPTIONS, CITY_OPTIONS } from '../../utils/city';

function Home() {
  const [year, setYear] = useState<string>('110');
  const [city, setCity] = useState<string | undefined>();
  const [districtsList, setDistrictsList] = useState<typeof CITY_OPTIONS>([]);
  const [district, setDistrict] = useState<string | undefined>();
  return (
    <Layout className="Home">
      <h1>人口數、戶數按戶別及性別統計</h1>
      <Space className="input-group">
        <Select
          className="year-selector"
          onChange={(value) => {
            setYear(value);
            setCity(undefined);
            setDistrict(undefined);
          }}
          showSearch
          value={year}
          options={[
            {
              label: '106',
              value: '106',
            },
            {
              label: '107',
              value: '107',
            },

            {
              label: '108',
              value: '108',
            },
            {
              label: '109',
              value: '109',
            },
            {
              label: '110',
              value: '110',
            },
          ]}
        />
        <Select
          className="city-selector"
          placeholder="請選擇 縣/市"
          options={CITY_OPTIONS}
          onChange={(value) => {
            setCity(value);
            if (value in DISTRICTS_OPTIONS) {
              setDistrictsList(
                DISTRICTS_OPTIONS[value as keyof typeof DISTRICTS_OPTIONS]
              );
            }
            setDistrict(undefined);
          }}
          showSearch
          value={city}
        >
          縣/市
        </Select>
        <Select
          className="district-selector"
          placeholder="請先選擇 縣/市"
          disabled={typeof city !== 'string'}
          options={districtsList}
          showSearch
          value={district}
          onChange={(value) => {
            setDistrict(value);
          }}
        >
          區
        </Select>

        <Button disabled={!city || !district}>submit</Button>
      </Space>
    </Layout>
  );
}

export default Home;
