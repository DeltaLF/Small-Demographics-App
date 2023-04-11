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
  private static instance: GovAxApi;

  private static axios: AxiosInstance = axios.create(config);

  public static getInstance(): GovAxApi {
    if (!GovAxApi.instance) {
      GovAxApi.instance = new GovAxApi();
    }
    return GovAxApi.instance;
  }

  getCitizenCountByDistrict(year: string, city: string, district: string) {
    console.debug(this);
    return GovAxApi.axios.get<CitizenCountByDistrict>(`ODRP019/${year}`, {
      params: {
        COUNTY: encodeURIComponent(city),
        TOWN: encodeURIComponent(district),
      },
    });
  }
}

export default GovAxApi;
