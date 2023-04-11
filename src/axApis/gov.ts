import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CitizenCountByDistrict } from './gov.type';

const config: AxiosRequestConfig = {
  baseURL: 'https://www.ris.gov.tw/rs-opendata/api/v1/datastore',
  headers: {
    accept: 'application/json',
    // charset: 'utf-8', // cause cors
  },
};

class GovAxApi {
  private axios: AxiosInstance = axios.create(config);

  getCitizenCountByDistrict(year: string, city: string, district: string) {
    return this.axios.get<CitizenCountByDistrict>(`ODRP019/${year}`, {
      params: {
        COUNTY: encodeURIComponent(city),
        TOWN: encodeURIComponent(district),
      },
    });
  }
}

const govAxApi = new GovAxApi();
export default govAxApi;
