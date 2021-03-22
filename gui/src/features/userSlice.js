import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userDetail: {},
    loading: false,
    error: null,
  },
  reducers: {
    getUserListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserListSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserDetailSuccess: (state, action) => {
      state.userDetail = action.payload;
      state.error = null;
      state.loading = false;
    },
    getUserDetailFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getUserListFail,
  getUserListStart,
  getUserListSuccess,
  getUserDetailFail,
  getUserDetailStart,
  getUserDetailSuccess,
} = userSlice.actions;

export const getUserList = (token) => {
  return (dispatch) => {
    dispatch(getUserListStart());
    console.log("getUserListStart ======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/user")
      .then((res) => {
        const users = res.data.filter((item) => item.username !== "admin");
        dispatch(getUserListSuccess(users));
      })
      .catch((err) => {
        dispatch(getUserListFail(err.message));
      });
  };
};

export const getUserDetail = (token, id) => {
  return (dispatch) => {
    dispatch(getUserDetailStart());
    console.log("getUserDetailStart ======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/user/${id}/`)
      .then((res) => {
        dispatch(getUserDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUserDetailFail(err.message));
      });
  };
};

export default userSlice.reducer;
