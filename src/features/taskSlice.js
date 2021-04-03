import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const taskSlice = createSlice({
  name: "task",
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
      state.taskList = action.payload;
      state.error = null;
      state.loading = false;
    },
    getTaskListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTaskSuccess: (state, action) => {
      state.task = action.payload;
      state.error = null;
      state.loading = false;
    },
    getTaskFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTaskFail,
  getTaskListFail,
  getTaskListStart,
  getTaskListSuccess,
  getTaskSuccess,
  getTaskStart,
  createTaskFail,
  createTaskSuccess,
  createTaskStart,
} = taskSlice.actions;

export const getTaskList = (token) => {
  return (dispatch) => {
    dispatch(getTaskListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/tasks/")
      .then((res) => {
        dispatch(getTaskListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getTaskListFail(err.message));
      });
  };
};

export const getTask = (token, id) => {
  return (dispatch) => {
    dispatch(getTaskStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/tasks/${id}`)
      .then((res) => {
        dispatch(getTaskSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getTaskFail(err.message));
      });
  };
};

export const createTask = (token, formData) => {
  return (dispatch) => {
    dispatch(createTaskStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/tasks/`, formData)
      .then((res) => {
        dispatch(createTaskSuccess(res.data));
        dispatch(getTaskList(token));
      })
      .catch((err) => {
        dispatch(createTaskFail(err.message));
      });
  };
};

export default taskSlice.reducer;
