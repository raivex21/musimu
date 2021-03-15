import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: [],
    enrollment: {},
    loading: false,
    error: null,
  },
  reducers: {
    getEnrollmentsStart: (state) => {
      state.loading = true;
    },
    getEnrollmentsSuccess: (state, action) => {
      state.enrollments = action.payload;
      state.loading = false;
    },
    getEnrollmentsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getEnrollmentDetailStart: (state) => {
      state.loading = true;
    },
    getEnrollmentDetailSuccess: (state, action) => {
      state.enrollment = action.payload;
      state.loading = false;
    },
    getEnrollmentDetailFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createEnrollmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEnrollmentSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createEnrollmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getEnrollmentsStart,
  getEnrollmentsSuccess,
  getEnrollmentsFail,
  getEnrollmentDetailStart,
  getEnrollmentDetailSuccess,
  getEnrollmentDetailFail,
  createEnrollmentFail,
  createEnrollmentStart,
  createEnrollmentSuccess,
} = enrollmentsSlice.actions;

export const getEnrollments = (token, id) => {
  return (dispatch) => {
    dispatch(getEnrollmentsStart());
    console.log("getEnrollments======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/api/enrollments`)
      .then((res) => {
        // CHECK IF THE ENROLLMENT IS FOR CURRENT STUDENT AND IF IT IS ACTIVE
        const enrollments = res.data.filter(
          (d) => d.student_id === id && d.classroom_detail.isActive === true
        );

        dispatch(getEnrollmentsSuccess(enrollments));
      })
      .catch((err) => {
        dispatch(getEnrollmentsFail(err.message));
      });
  };
};

export const getEnrollmentDetail = (token, id) => {
  return (dispatch) => {
    dispatch(getEnrollmentDetailStart());
    console.log("starting getEnrollmentDetail");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/api/enrollments/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getEnrollmentDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getEnrollmentDetailFail(err.message));
      });
  };
};

export const createEnrollment = (token, formData) => {
  return (dispatch) => {
    dispatch(createEnrollmentStart());
    console.log("starting createEnrollment");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post("http://127.0.0.1:8000/api/enrollments/", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(createEnrollmentSuccess());
      })
      .catch((err) => {
        dispatch(createEnrollmentFail(err));
      });
  };
};

export default enrollmentsSlice.reducer;
