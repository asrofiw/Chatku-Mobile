import {default as axios} from 'axios';

import {API_URL} from '@env';

const http = (token = null) => {
  const headers = {};
  console.log(headers);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log(headers);
  return axios.create({
    baseURL: API_URL,
    headers,
  });
};
export default http;
