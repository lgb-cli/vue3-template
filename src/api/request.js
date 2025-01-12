import axios from 'axios';
console.log(import.meta.env.VITE_BASE_URL, 'baseURL')
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((response) => {
  return response;
});

function requestFun(method, url, data, config) {
  console.log(url, 'url')
  return request({
    method,
    url,
    data,
    headers: {
      'Content-Type': config && config.contentType || 'application/json',
    },
    responseType: config && config.responseType || 'json',
  });
}
export default requestFun;