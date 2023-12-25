import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  email: '',
  latitude: '',
  longitude: '',
  token: '',
  loading: 'idle',
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
    setLoading(state, {payload}) {
      state.loading = payload;
    },
  },
});

export const {setName, setEmail, setToken, setLoading} = authSlice.actions;

export default authSlice.reducer;
