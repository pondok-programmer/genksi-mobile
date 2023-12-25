import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  coords: {
    longitude: 106.82719,
    latitude: -6.175395,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCoordinates(state, {payload}) {
      state.coords = payload;
    },
  },
});
export const {setCoordinates} = mapSlice.actions;

export default mapSlice.reducer;
