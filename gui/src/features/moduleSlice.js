import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    modules: [],
    loading: false,
    error: null,
  },
  reducers: {
    getModulesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getModulesSuccess: (state, action) => {
      state.modules = action.payload;
      state.loading = false;
      state.error = null;
    },
    getModulesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createModuleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createModuleSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    createModuleFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getModulesFail,
  getModulesStart,
  getModulesSuccess,
  createModuleFail,
  createModuleStart,
  createModuleSuccess,
} = moduleSlice.actions;

export const getModules = (token) => {
  return (dispatch) => {
    dispatch(getModulesStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/modules`)
      .then((res) => {
        dispatch(getModulesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getModulesFail(err.message));
      });
  };
};

export const createModule = (token, formData) => {
  return (dispatch) => {
    dispatch(createModuleStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/modules/`, formData)
      .then((res) => {
        dispatch(createModuleSuccess(res.data));
        dispatch(getModules(token));
      })
      .catch((err) => {
        dispatch(createModuleFail(err.message));
      });
  };
};

export default moduleSlice.reducer;
