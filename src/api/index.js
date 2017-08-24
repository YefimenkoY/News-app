import axios from 'axios';
import config from '../../build-config.json';

const { baseURL, apiKey } = config.newsApi;

axios.defaults.baseURL = baseURL;

export const get = (url, options = {}) => (
  axios.get(url, { params: { apiKey, ...options }})
);

