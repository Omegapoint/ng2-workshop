declare var ENV;
export const API_URL = typeof ENV === 'undefined' ? '' : ENV.host + '/api';
