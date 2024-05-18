import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
  baseURL: 'https://genksi.ejctechnology.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await EncryptedStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.log('INTERCEPTORS ERROR:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    console.log('INTERCEPTOR SUCCESS:', response.data);
    return response;
  },
  async error => {
    const originalRequest = error.config;

    console.log('INTERCEPTOR ERROR:', error);
    if (error.response && error.response.data.message == 'Unauthenticated.') {
      try {
        const credential = await EncryptedStorage.getItem('user_credential');
        const response = await api.post('/login', JSON.parse(credential));
        const token = response.data.authorization.token;

        console.log('TOKEN BARU:', token);

        await EncryptedStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
