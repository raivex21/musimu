import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const classroomSlice = createSlice({
  name: "classroom",
  initialState: {
    classroom: {},
    classrooms: [],
    error: null,
    loading: false,
  },
  reducers: {
    getClassroomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClassroomSuccess: (state, action) => {
      state.classroom = action.payload;
      state.loading = false;
      state.error = null;
    },
    getClassroomFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getClassroomListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClassroomListSuccess: (state, action) => {
      state.classrooms = action.payload;
      state.error = null;
    },
    getClassroomListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createClassroomStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    createClassroomSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createClassroomFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getClassroomStart,
  getClassroomSuccess,
  getClassroomFail,
  getClassroomListStart,
  getClassroomListSuccess,
  getClassroomListFail,
  createClassroomFail,
  createClassroomStart,
  createClassroomSuccess,
} = classroomSlice.actions;

export const getClassroom = (token, id) => {
  return (dispatch) => {
    dispatch(getClassroomStart());
    console.log("getClassroom ====>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/api/classrooms/${id}`)
      .then((res) => {
        console.log("getting classrooms success");
        console.log(res.data);
        dispatch(getClassroomSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getClassroomFail(err.message));
      });
  };
};

export const getClassroomList = (token, id) => {
  return (dispatch) => {
    dispatch(getClassroomListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/api/classrooms/")
      .then((res) => {
        console.log("getting classrooms successful");
        console.log(res.data);
        const classrooms = res.data.filter(
          (classroom) => classroom.teacher_id === id
        );
        dispatch(getClassroomListSuccess(classrooms));
      })
      .catch((err) => {
        dispatch(getClassroomListFail(err.message));
      });
  };
};

export const createClassroom = (token, formData, id) => {
  return (dispatch) => {
    dispatch(createClassroomStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post("http://127.0.0.1:8000/api/classrooms/", formData)
      .then((res) => {
        console.log("successfully added classroom");
        console.log(res.data);
        dispatch(createClassroomSuccess());
        dispatch(getClassroomList(token, id));
      })
      .catch((err) => {
        dispatch(createClassroomFail(err.message));
      });
  };
};

export default classroomSlice.reducer;
