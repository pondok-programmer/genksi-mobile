import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/Auth/services/authSlice';
import demoReducer from '../features/DemoTes/services/demoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    demo: demoReducer,
  },
});
