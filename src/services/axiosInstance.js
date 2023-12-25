import axios from 'axios';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
  baseURL: 'https://genksi.ejctechnology.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dlbmtzaS5lamN0ZWNobm9sb2d5LmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3MDM0NzgzNzMsImV4cCI6MTcwMzQ4MTk3MywibmJmIjoxNzAzNDc4MzczLCJqdGkiOiJ4dVlLMGZaaDdkOWlMcXdjIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.H6HD4F4yLtqKb5xqfjfyTIQAL0ptvaCDOwVXe_wzRrA`,
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
