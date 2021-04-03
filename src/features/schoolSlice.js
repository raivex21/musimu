import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    gradeLevel: [],
    schoolYear: [],
    cover: [],
    error: null,
    loading: false,
  },
  reducers: {
    getGradeLevelStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradeLevelSuccess: (state, action) => {
      state.gradeLevel = action.payload;
      state.error = null;
      state.loading = false;
    },
    getGradeLevelFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getSchoolYearStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSchoolYearSuccess: (state, action) => {
      state.schoolYear = action.payload;
      state.error = null;
      state.loading = false;
    },
    getSchoolYearFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCoverStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCoverSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.cover = action.payload;
    },
    getCoverFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getGradeLevelStart,
  getGradeLevelSuccess,
  getGradeLevelFail,
  getSchoolYearFail,
  getSchoolYearStart,
  getSchoolYearSuccess,
  getCoverFail,
  getCoverStart,
  getCoverSuccess,
} = schoolSlice.actions;

export const getGradeLevel = (token) => {
  return (dispatch) => {
    dispatch(getGradeLevelStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/levels/")
      .then((res) => {
        console.log("getting classrooms success");
        console.log(res.data);
        dispatch(getGradeLevelSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getGradeLevelFail(err.message));
      });
  };
};

export const getSchoolYear = (token) => {
  return (dispatch) => {
    dispatch(getSchoolYearStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/schoolyears/")
      .then((res) => {
        console.log("getting classrooms success");
        console.log(res.data);
        dispatch(getSchoolYearSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getSchoolYearFail(err.message));
      });
  };
};

export const getCover = (token) => {
  return (dispatch) => {
    dispatch(getCoverStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/covers/")
      .then((res) => {
        console.log("getting cover success");
        console.log(res.data);
        dispatch(getCoverSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCoverFail(err.message));
      });
  };
};

export default schoolSlice.reducer;
