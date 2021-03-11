import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    first_name: null,
    last_name: null,
    userId: null,
    is_teacher: false,
    avatar: null,
    error: null,
    loading: false,
    userList: null,
    isAuth: false,
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.last_name = action.payload.last_name;
      state.first_name = action.payload.first_name;
      state.userId = action.payload.userId;
      state.is_teacher = action.payload.is_teacher;
      state.avatar = action.payload.avatar;
      state.isAuth = action.payload.token !== null;
      state.error = null;
      state.loading = false;
    },
    authFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.username = null;
      state.token = null;
      state.first_name = null;
      state.last_name = null;
      state.userId = null;
      state.isAuth = null;
      state.avatar = null;
      state.is_teacher = null;
    },
    getUserListSuccess: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  logout,
  authFail,
  getUserListSuccess,
} = authSlice.actions;

//if need dispatch; put here
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          last_name: res.data.user_detail.last_name,
          first_name: res.data.user_detail.first_name,
          userId: res.data.user_detail.userId,
          is_teacher: res.data.user_detail.is_teacher,
          avatar: res.data.user_detail.avatar,
          expirationDate: new Date(new Date().getTime() + 86400 * 1000),
        };

        localStorage.setItem("user", JSON.stringify(user));
        console.log(res.data);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(86400));
      })
      .catch((err) => {
        authFail(err.message);
      });
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    console.log("AUTHCHECKSTATE => running");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const getUserList = (token) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/users/all/")
      .then((res) => {
        console.log(res.data);
        dispatch(getUserListSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default authSlice.reducer;
