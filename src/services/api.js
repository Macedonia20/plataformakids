import axios from 'axios';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3232'
    : 'https://apikids.plataformaqgr.com.br';

const api = axios.create({ baseURL: url });

export default api;
