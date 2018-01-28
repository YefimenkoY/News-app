import axios from 'axios';
import config from '../../build-config.json';

const { booksApi: { baseURL, apiKey }, api: { baseUrl } } = config;
const instance = axios.create({ baseURL });
const api = axios.create({ baseURL: baseUrl });

const get = (url, options = {}) => (
  instance.get(url, { params: { apiKey, ...options }})
);

export {
  get,
  api,
};

