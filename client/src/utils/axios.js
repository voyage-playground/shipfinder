import axios from 'axios';

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL || window.location.origin,
});

export default instance;
