import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.PROD ?
    import.meta.env.VITE_PRO_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
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
  });
}
export default requestFun;