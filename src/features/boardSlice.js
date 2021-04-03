import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardMessages: {},
    loading: false,
    error: null,
  },
  reducers: {
    getBoardMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBoardMessagesSuccess: (state, action) => {
      state.boardMessages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getBoardMessagesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createBoardMessageStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    createBoardMessageSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    createBoardMessageFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getBoardMessagesFail,
  getBoardMessagesStart,
  getBoardMessagesSuccess,
  createBoardMessageFail,
  createBoardMessageStart,
  createBoardMessageSuccess,
} = boardSlice.actions;

export const getBoardMessages = (token, id) => {
  return (dispatch) => {
    dispatch(getBoardMessagesStart());
    console.log("getBoardMessages ====>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/boards/${id}`)
      .then((res) => {
        console.log("getting board success");
        console.log(res.data);
        dispatch(getBoardMessagesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getBoardMessagesFail(err.status));
      });
  };
};

export const createBoardMessage = (token, formData, id) => {
  return (dispatch) => {
    dispatch(createBoardMessageStart());
    console.log("createBoardMessage ====>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/board_messages/`, formData)
      .then((res) => {
        console.log("creating board success");
        dispatch(createBoardMessageSuccess(res.data));
        dispatch(getBoardMessages(token, id));
      })
      .catch((err) => {
        dispatch(createBoardMessageFail(err.status));
      });
  };
};

export default boardSlice.reducer;
