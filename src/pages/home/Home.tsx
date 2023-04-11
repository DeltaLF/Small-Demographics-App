import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Layout, Select, Space } from 'antd';
import axios from 'axios';
import './Home.scss';
import { DISTRICTS_OPTIONS, CITY_OPTIONS } from '../../utils/city';
import SearchResultSplitter from './SearchResultSplitter';
import govAxApi from '../../axApis/gov';
import Chart from '../chart/Chart';
import { Household } from './Home.type';

function Home() {
  const { year: urlYear, city: urlCity, district: urlDistrict } = useParams();
  const [year, setYear] = useState<string | undefined>(urlYear);
  const [city, setCity] = useState<string | undefined>(urlCity);
  const [districtsList, setDistrictsList] = useState<typeof CITY_OPTIONS>([]);
  const [district, setDistrict] = useState<string | undefined>(urlDistrict);
  const [household, setHouseHold] = useState<Household>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (city && city in DISTRICTS_OPTIONS) {
      setDistrictsList(
        DISTRICTS_OPTIONS[city as keyof typeof DISTRICTS_OPTIONS]
      );
    }
  }, [city]);

  useEffect(() => {
    if (!!year && !!city && !!district && district === urlDistrict) {
      setIsLoading(true);
      setErrorMessage('');
      govAxApi
        .getCitizenCountByDistrict(year, city, district)
        .then((response) => {
          /*
          4 data needed
          male: single, ordinary
          female: single, oridnary
          */
          const data = response.data.responseData;
          if (!data) {
            setHouseHold(undefined);
            setErrorMessage(response.data.responseMessage);
            return;
          }
          const updateHouseHold: Household = {
            single_m: 0,
            ordinary_m: 0,
            single_f: 0,
            ordinary_f: 0,
          };
          data.forEach((districtData) => {
            updateHouseHold.ordinary_m += parseInt(
              districtData.household_ordinary_m,
              10
            );
            updateHouseHold.ordinary_f += parseInt(
              districtData.household_ordinary_f,
              10
            );
            updateHouseHold.single_m += parseInt(
              districtData.household_single_m,
              10
            );
            updateHouseHold.single_f += parseInt(
              districtData.household_single_f,
              10
            );
          });
          setHouseHold(updateHouseHold);
        })
        .catch((error) => {
          setHouseHold(undefined);
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage('Something went wrong');
          }
        })
        .finally(() => {
          setIsLoading(false);
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
      <Chart
        errorMessage={errorMessage}
        household={household}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default Home;
