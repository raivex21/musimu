import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getClassroom } from "./classroomSlice";

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
      state.error = null;
    },
    getEnrollmentsSuccess: (state, action) => {
      state.enrollments = action.payload;
      state.loading = false;
      state.error = null;
    },
    getEnrollmentsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getEnrollmentDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEnrollmentDetailSuccess: (state, action) => {
      state.enrollment = action.payload;
      state.loading = false;
      state.error = null;
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
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/enrollments`)
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
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/enrollments/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getEnrollmentDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getEnrollmentDetailFail(err.message));
      });
  };
};

export const createEnrollment = (token, formData, id) => {
  return (dispatch) => {
    dispatch(createEnrollmentStart());
    console.log("starting createEnrollment");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(process.env.REACT_APP_AXIOS_URL + "/api/enrollments/", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(createEnrollmentSuccess());
        dispatch(getEnrollments(token));
        dispatch(getClassroom(token, id));
      })
      .catch((err) => {
        dispatch(createEnrollmentFail(err));
      });
  };
};

export default enrollmentsSlice.reducer;
