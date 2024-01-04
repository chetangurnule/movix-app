import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
  bgImageData: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setBgImageData: (state, action) => {
      state.bgImageData = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setUrl, setGenres, setBgImageData } = homeSlice.actions;
