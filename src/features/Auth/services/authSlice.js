import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  email: '',
  latitude: '',
  longitude: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName(state, {payload}) {
      state.name = payload;
    },
    setEmail(state, {payload}) {
      state.email = payload;
    },
    setToken(state, {payload}) {
      state.token = payload;
    },
  },
});

export const {setName, setEmail, setToken} = authSlice.actions;

export default authSlice.reducer;
