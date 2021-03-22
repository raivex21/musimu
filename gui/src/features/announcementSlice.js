import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcements: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAnnouncementListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAnnouncementListSuccess: (state, action) => {
      state.announcements = action.payload;
      state.error = null;
    },
    getAnnouncementListFail: (state, action) => {
      state.error = action.payload;
    },
    createAnnouncementStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAnnouncementSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createAnnouncementFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getAnnouncementListSuccess,
  getAnnouncementListStart,
  getAnnouncementListFail,
  createAnnouncementStart,
  createAnnouncementSuccess,
  createAnnouncementFail,
} = announcementSlice.actions;

export const getAnnouncementList = (token) => {
  return (dispatch) => {
    dispatch(getAnnouncementListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get("http://127.0.0.1:8000/api/announcements/")
      .then((res) => {
        console.log(res.data);
        // const announcements = res.data.filter((c) => c.id === id);
        const announcements = res.data;
        dispatch(getAnnouncementListSuccess(announcements));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getAnnouncementListFail(err.message));
      });
  };
};

export const createAnnouncement = (token, formData) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .post("http://127.0.0.1:8000/api/announcements/", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(createAnnouncementSuccess(res.data));
        dispatch(getAnnouncementList(token));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(createAnnouncementFail(err.message));
      });
  };
};

export default announcementSlice.reducer;
