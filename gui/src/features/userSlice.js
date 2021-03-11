import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    getUserListStart: (state) => {
      state.loading = true;
    },
    getUserListSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUserListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getUserListFail,
  getUserListStart,
  getUserListSuccess,
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
      .get("http://127.0.0.1:8000/api/user")
      .then((res) => {
        const students = res.data.filter((d) => d.is_teacher === false);
        dispatch(getUserListSuccess(students));
        console.log(students);
      })
      .catch((err) => {
        dispatch(getUserListFail(err.message));
      });
  };
};

export default userSlice.reducer;
