import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    inbox: [],
    loading: false,
    error: null,
  },
  reducers: {
    getInboxStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getInboxSuccess: (state, action) => {
      state.inbox = action.payload;
      state.loading = false;
      state.error = null;
    },
    getInboxFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    sendMessageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    sendMessageFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getInboxFail,
  getInboxStart,
  getInboxSuccess,
  sendMessageFail,
  sendMessageStart,
  sendMessageSuccess,
} = messageSlice.actions;

export const getInbox = (token, id) => {
  return (dispatch) => {
    dispatch(getInboxStart());
    console.log("getInboxes======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/messages`)
      .then((res) => {
        const inbox = res.data.filter(
          (item) => item.receiver === id || item.sender === id
        );
        dispatch(getInboxSuccess(inbox));
      })
      .catch((err) => {
        dispatch(getInboxFail(err.message));
      });
  };
};

export const sendMessage = (token, formData) => {
  return (dispatch) => {
    dispatch(sendMessageStart());
    console.log("sendMessagees======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/messages/`, formData)
      .then((res) => {
        dispatch(sendMessageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(sendMessageFail(err.message));
      });
  };
};

export default messageSlice.reducer;
