import type { envType } from '@books-client/models';

export const environment: envType = {
    production: false,
    APP_PATH: process.env['REACT_APP_PATH'] || process.env['NX_APP_PATH'] || 'http://localhost:8085',
};
