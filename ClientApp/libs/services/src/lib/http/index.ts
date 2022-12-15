import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import { environment } from '@books-client/env';

export { apiEndpoint } from './endpoints';

const { APP_PATH } = environment;

const baseURL = `${APP_PATH}/api`;

const apiConfig: AxiosRequestConfig = {
    baseURL,
};

export const $api = axios.create(apiConfig);

$api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }
);