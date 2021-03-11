import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    isUpdated: false,
  },
  reducers: {
    toggleUpdate: (state, action) => {
      state.isUpdated = action.payload;
    },
  },
});

export const { toggleUpdate } = updateSlice.actions;

export const toggle = (value) => {
  return (dispatch) => {
    dispatch(toggleUpdate(value));
  };
};

export default updateSlice.reducer;
