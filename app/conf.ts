declare var ENV;
export const API_URL = typeof ENV === 'undefined' ? '/api' : ENV.host + '/api';
export const USER = 'omegapoint';
export const PASSWORD = 'mad2016';
