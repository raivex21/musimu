import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const gradeSlice = createSlice({
  name: "grade",
  initialState: {
    gradedQuizzes: [],
    error: null,
    loading: false,
  },
  reducers: {
    getGradedQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradedQuizSuccess: (state, action) => {
      state.gradedQuizzes = action.payload;
      state.error = null;
      state.loading = false;
    },
    getGradedQuizFail: (state, action) => {
      state.error = action.payload;
      state.loading = null;
    },
    createGradedQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createGradedQuizSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createGradedQuizFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getGradedQuizFail,
  getGradedQuizSuccess,
  getGradedQuizStart,
  createGradedQuizFail,
  createGradedQuizStart,
  createGradedQuizSuccess,
} = gradeSlice.actions;

export const getGradedQuiz = (token) => {
  return (dispatch) => {
    dispatch(getGradedQuizStart());
    console.log("getGradedQuiz======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/grades")
      .then((res) => {
        dispatch(getGradedQuizSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(getGradedQuizFail(err.message));
      });
  };
};

export const createGradedQuiz = (token, formData) => {
  return (dispatch) => {
    dispatch(createGradedQuizStart());
    console.log("createGradedQuiz======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(process.env.REACT_APP_AXIOS_URL + "/api/grades/", formData)
      .then((res) => {
        dispatch(createGradedQuizSuccess(res.data));
        dispatch(getGradedQuiz(token));
      })
      .catch((err) => {
        dispatch(createGradedQuizFail(err.message));
      });
  };
};

export default gradeSlice.reducer;
