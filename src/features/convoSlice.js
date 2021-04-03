import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const convoSlice = createSlice({
  name: "convo",
  initialState: {
    convos: [],
    convoDetail: {},
    loading: false,
    error: null,
  },
  reducers: {
    getConvoListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConvoListSuccess: (state, action) => {
      state.convos = action.payload;
      state.error = null;
      state.loading = false;
    },
    getConvoListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createConvoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createConvoSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createConvoFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createConvoMessageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createConvoMessageSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createConvoMessageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getConvoDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConvoDetailSuccess: (state, action) => {
      state.convoDetail = action.payload;
      state.loading = false;
      state.error = null;
    },
    getConvoDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getConvoListSuccess,
  getConvoListStart,
  getConvoListFail,
  createConvoStart,
  createConvoSuccess,
  createConvoFail,
  createConvoMessageSuccess,
  createConvoMessageFail,
  createConvoMessageStart,
  getConvoDetailFail,
  getConvoDetailStart,
  getConvoDetailSuccess,
} = convoSlice.actions;

export const getConvoList = (token, userId) => {
  return (dispatch) => {
    dispatch(getConvoListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get(process.env.REACT_APP_AXIOS_URL + "/api/convos/")
      .then((res) => {
        // const convos = res.data.filter((c) => c.id === id);
        const convos = res.data.filter((item) => item.users.includes(userId));
        console.log(res.data);
        console.log(convos);
        dispatch(getConvoListSuccess(convos));
      })
      .catch((err) => {
        console.log(err.status);
        dispatch(getConvoListFail(err.message));
      });
  };
};

export const createConvo = (token, formData, userId) => {
  return (dispatch) => {
    dispatch(createConvoStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .post(process.env.REACT_APP_AXIOS_URL + "/api/convos/", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(createConvoSuccess(res.data));
        dispatch(getConvoList(token, userId));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(createConvoFail(err.message));
      });
  };
};

export const createConvoMessage = (token, formData, userId) => {
  return (dispatch) => {
    dispatch(createConvoMessageStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .post(process.env.REACT_APP_AXIOS_URL + "/api/convo_message/", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(createConvoMessageSuccess(res.data));
        dispatch(getConvoList(token, userId));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(createConvoMessageFail(err.message));
      });
  };
};

export const getConvoDetail = (token, id) => {
  return (dispatch) => {
    dispatch(getConvoDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/convos/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getConvoDetailSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(getConvoDetailFail(err.message));
      });
  };
};

export default convoSlice.reducer;
