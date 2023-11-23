import {createSlice} from '@reduxjs/toolkit';

const demoSlice = createSlice({
  name: 'demoSlice',
  initialState: {count: 0},
  reducers: {},
});

export default demoSlice.reducer;
