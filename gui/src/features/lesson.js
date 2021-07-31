import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const lessonSlice = createSlice({
  name: "grade",
  initialState: {
    lessonList: [],
    currentLesson: {},
    error: null,
    loading: false,
  },
  reducers: {
    getLessonListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLessonListSuccess: (state, action) => {
      state.lessonList = action.payload;
      state.error = null;
      state.loading = false;
    },
    getLessonListFail: (state, action) => {
      state.error = action.payload;
      state.loading = null;
    },
    getCurrentLessonStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCurrentLessonSuccess: (state, action) => {
      state.currentLesson = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCurrentLessonFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createLessonStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createLessonSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createLessonFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getCurrentLessonFail,
  getCurrentLessonStart,
  getCurrentLessonSuccess,
  getLessonListSuccess,
  getLessonListFail,
  getLessonListStart,
  createLessonStart,
  createLessonFail,
  createLessonSuccess,
} = lessonSlice.actions;

export const getLessonList = (token) => {
  return (dispatch) => {
    dispatch(getLessonListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/lessons")
      .then((res) => {
        dispatch(getLessonListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getLessonListFail(err.message));
      });
  };
};

export const getCurrentLesson = (token, id) => {
  return (dispatch) => {
    dispatch(getCurrentLessonStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/lessons/${id}/`)
      .then((res) => {
        dispatch(getCurrentLessonSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCurrentLessonFail(err.message));
      });
  };
};

export const createLesson = (token, formData) => {
  return (dispatch) => {
    dispatch(createLessonStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/lessons/`, formData)
      .then((res) => {
        dispatch(createLessonSuccess(res.data));
        dispatch(getLessonList(token));
      })
      .catch((err) => {
        dispatch(createLessonFail(err.message));
      });
  };
};

export const createLessonDetails = (token, formData) => {
  return (dispatch) => {
    dispatch(createLessonStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/lesson-steps/`, formData)
      .then((res) => {
        dispatch(createLessonSuccess());
      })
      .catch((err) => {
        dispatch(createLessonFail(err.message));
      });
  };
};

export default lessonSlice.reducer;
