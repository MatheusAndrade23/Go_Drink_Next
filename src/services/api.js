import axios from 'axios';

import config from '../config';

export const api = axios.create({
  baseURL: config.apiUrl,
});

export const db = axios.create({
  baseURL: config.dbUrl,
});

export const translate = axios.create({
  baseURL: config.translateApiUrl,
});

export const createSession = async (email, password) => {
  return api.post('/auth/signin', { email, password });
};
