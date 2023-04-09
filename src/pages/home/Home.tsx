import React, { useState } from 'react';
import { Button, Layout, Select, Space } from 'antd';
import './Home.scss';

function Home() {
  const [year, setYear] = useState<string[]>(['110']);
  return (
    <Layout className="Home">
      <h1>人口數、戶數按戶別及性別統計</h1>
      <Space className="input-group">
        <Select
          className="year-selector"
          onChange={(value) => {
            if (value.length > 0) {
              setYear([value[1]]);
            }
          }}
          mode="tags"
          value={year}
          options={[
            {
              label: '110',
              value: '110',
            },
            {
              label: '111',
              value: '111',
            },
            {
              label: '112',
              value: '112',
            },
          ]}
        />
        <Select className="city-selector" placeholder="請選擇 縣/市">
          縣/市
        </Select>
        <Select className="district-selector" placeholder="請先選擇 縣/市">
          區
        </Select>

        <Button>submit</Button>
      </Space>
    </Layout>
  );
}

export default Home;
