import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { environment } from '@books-client/env';
import { USER_FEATURE_KEY } from '@books-client/models';

export { apiEndpoint } from './endpoints';

const { APP_PATH } = environment;

const baseURL = `${APP_PATH}/api`;

const apiConfig: AxiosRequestConfig = {
    baseURL,
};

export const $api = axios.create(apiConfig);

$api.interceptors.request.use((config) => {
    const user = localStorage.getItem(USER_FEATURE_KEY);

    if (user && config.headers) {
        const { token } = JSON.parse(user);
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
