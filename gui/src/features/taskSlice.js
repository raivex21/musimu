import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const convoSlice = createSlice({
  name: "convo",
  initialState: {
    taskList: [],
    task: {},
    loading: false,
    error: null,
  },
  reducers: {
    getTaskListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTaskListSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    getTaskListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
