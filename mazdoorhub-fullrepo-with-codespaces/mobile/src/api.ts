import axios from 'axios';
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_BASE });
export default api;
