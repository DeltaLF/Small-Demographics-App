import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Layout, Select, Space } from 'antd';
import './Home.scss';
import { DISTRICTS_OPTIONS, CITY_OPTIONS } from '../../utils/city';
import SearchResultSplitter from './SearchResultSplitter';
import GovAxApi from '../../axApis/gov';

function Home() {
  const { year: urlYear, city: urlCity, district: urlDistrict } = useParams();
  const [year, setYear] = useState<string | undefined>(urlYear);
  const [city, setCity] = useState<string | undefined>(urlCity);
  const [districtsList, setDistrictsList] = useState<typeof CITY_OPTIONS>([]);
  const [district, setDistrict] = useState<string | undefined>(urlDistrict);

  useEffect(() => {
    if (city && city in DISTRICTS_OPTIONS) {
      setDistrictsList(
        DISTRICTS_OPTIONS[city as keyof typeof DISTRICTS_OPTIONS]
      );
    }
  }, [city]);

  useEffect(() => {
    if (!!year && !!city && !!district && district === urlDistrict) {
      GovAxApi.getInstance()
        .getCitizenCountByDistrict(year, city, district)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [urlDistrict]);
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
        {!city || !district ? (
          <Button disabled>submit</Button>
        ) : (
          <Link to={`/${year}/${city}/${district}`}>
            <Button color="red">submit</Button>
          </Link>
        )}
      </Space>
      <SearchResultSplitter />
    </Layout>
  );
}

export default Home;
