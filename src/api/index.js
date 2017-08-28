import axios from 'axios';
import config from '../../build-config.json';

const { baseURL, apiKey } = config.booksApi;

const instance = axios.create({ baseURL });

export const get = (url, options = {}) => (
  instance.get(url, { params: { apiKey, ...options }})
);

