import API from './api';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const api = new API(serverUrl);

export default api;
