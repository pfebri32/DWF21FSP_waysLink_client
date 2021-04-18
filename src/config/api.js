import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://wayslink-api.herokuapp.com/api/v2',
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
