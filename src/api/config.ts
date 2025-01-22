import { store } from '../store';
import { CONFIG } from '../../config';
import axios, { AxiosRequestConfig } from 'axios';
import { language } from '../i18n';
import DeviceInfo from 'react-native-device-info';
import { userSelectors } from '../store/user.ts';

export const appAxios = axios.create({
  baseURL: CONFIG.API_URL,
});

export const masterAxios = axios.create({
  baseURL: CONFIG.API_URL,
});

export const ssoAxios = axios.create({
  baseURL: CONFIG.API_URL,
});

export const autoAxios = () => {
  const state = store.getState();
  const isLogged = userSelectors.isLogged(state);
  return isLogged ? appAxios : masterAxios;
};

appAxios.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = userSelectors.token(state);
    config.headers.Authorization = `Bearer ${token}`;
    config.params = { ...config.params, ...extendParams() };
    console.debug('config', config);
    return config;
  },
  error => Promise.reject(error),
);

masterAxios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${CONFIG.MASTER_TOKEN}`;
    config.params = { ...config.params, ...extendParams() };
    return config;
  },
  error => Promise.reject(error),
);

ssoAxios.interceptors.request.use(
  config => {
    config.params = { ...config.params, ...extendParams() };
    return config;
  },
  error => Promise.reject(error),
);

// SECTION RESPONSE
appAxios.interceptors.response.use(
  response => {
    const curl = requestToCurlCommand(response.config);
    console.log(`Axios Response: ${response.config.url}`, { data: response.data, response, curl });
    handleResponseSuccess(response);
    return response;
  },
  error => {
    const curl = requestToCurlCommand(error.config);
    console.log(`Axios error: ${error.config.url}`, { data: error.data, response: error.response, curl });
    handleResponseError(error);
    return Promise.reject(error);
  },
);
masterAxios.interceptors.response.use(
  response => {
    console.log(`MasterAxios Response: ${response.config.url}`, response.data, response);
    handleResponseSuccess(response);
    return response;
  },
  error => {
    console.log('appAxiosError', { appAxiosError: error });
    handleResponseError(error);
    return Promise.reject(error);
  },
);

export type SuccessResponse<T> = {
  data: T;
};

export const pickData = <T>(response: SuccessResponse<T>) => {
  return response.data;
};

const getAppVersionNumber = DeviceInfo.getVersion();
const extendParams = () => {
  return { l: language, v: getAppVersionNumber };
};

const handleResponseSuccess = (response: any) => {
  const successStatus = response?.status;
  return response;
};
const handleResponseError = (response: any) => {
  const errorStatus = response?.response?.status;
  // if (errorStatus === 401 && response.config.url === 'users/me') {
  //   logout();
  // }
  return response;
};

interface CurlOptions extends AxiosRequestConfig {
  baseURL?: string;
}

// Funzione per convertire una richiesta Axios in una stringa cURL
const requestToCurlCommand = (request: CurlOptions): string => {
  const { method, baseURL, url, headers = {}, data, params } = request;
  const fullUrl = `${baseURL || ''}/${url}${params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''}`;

  let curlCommand = `curl -X ${method?.toUpperCase() || 'GET'} '${fullUrl}'`;

  // Aggiungi gli headers
  Object.entries(headers).forEach(([key, value]) => {
    if (typeof value === 'string') {
      curlCommand += ` -H '${key}: ${value}'`;
    }
  });

  // Aggiungi il body se presente
  if (data) {
    curlCommand += ` -d '${JSON.stringify(data)}'`;
  }

  // console.log(`cURL ${url}`, { curlCommand });
  return curlCommand;
};
