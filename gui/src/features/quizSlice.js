import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    quizDetail: {},
    choiceList: [],
    loading: false,
    error: null,
  },
  reducers: {
    getQuizzesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getQuizzesSuccess: (state, action) => {
      state.quizzes = action.payload;
      state.loading = false;
      state.error = null;
    },
    getQuizzesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getQuizDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getQuizDetailSuccess: (state, action) => {
      state.quizDetail = action.payload;
      state.loading = false;
      state.error = null;
    },
    getQuizDetailFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createQuizSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createQuizFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getChoiceListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getChoiceListSuccess: (state, action) => {
      state.loading = false;
      state.choiceList = action.payload;
    },
    getChoiceListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addQuestionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addQuestionSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addQuestionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addChoiceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addChoiceSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addChoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getQuizzesFail,
  getQuizzesStart,
  getQuizzesSuccess,
  getQuizDetailStart,
  getQuizDetailFail,
  getQuizDetailSuccess,
  createQuizFail,
  createQuizStart,
  createQuizSuccess,
  getChoiceListFail,
  getChoiceListStart,
  getChoiceListSuccess,
  addQuestionFail,
  addQuestionStart,
  addQuestionSuccess,
  addChoiceFail,
  addChoiceStart,
  addChoiceSuccess,
} = quizSlice.actions;

export const getQuizzes = (token) => {
  return (dispatch) => {
    dispatch(getQuizzesStart());
    console.log("getQuizzes======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(process.env.REACT_APP_AXIOS_URL + `/api/quizzes`)
      .then((res) => {
        dispatch(getQuizzesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getQuizzesFail(err.message));
      });
  };
};

export const getQuizDetail = (token, id) => {
  return (dispatch) => {
    dispatch(getQuizDetailStart());
    console.log("getQuizDetail======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/quizzes/${id}`)
      .then((res) => {
        dispatch(getQuizDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getQuizDetailFail(err.message));
      });
  };
};

export const createQuiz = (token, formData) => {
  return (dispatch) => {
    dispatch(createQuizStart());
    console.log("getQuizDetail======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(process.env.REACT_APP_AXIOS_URL + "/api/quizzes/", formData)
      .then((res) => {
        dispatch(createQuizSuccess(res.data));
        dispatch(getQuizzes(token));
      })
      .catch((err) => {
        dispatch(createQuizFail(err.message));
      });
  };
};

export const getChoiceList = (token) => {
  return (dispatch) => {
    dispatch(getChoiceListStart());
    console.log("getQuizDetail======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_AXIOS_URL}/api/choices`)
      .then((res) => {
        dispatch(getChoiceListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getChoiceListFail(err.message));
      });
  };
};

export const addQuestion = (token, formData, id) => {
  return (dispatch) => {
    dispatch(addQuestionStart());
    console.log("getQuizDetail======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/questions/`, formData)
      .then((res) => {
        dispatch(addQuestionSuccess(res.data));
        dispatch(getQuizDetail(token, id));
      })
      .catch((err) => {
        dispatch(addQuestionFail(err.message));
      });
  };
};

export const addChoice = (token, formData) => {
  return (dispatch) => {
    dispatch(addChoiceStart());
    console.log("getQuizDetail======>");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_AXIOS_URL}/api/choices/`, formData)
      .then((res) => {
        dispatch(addChoiceSuccess(res.data));
        dispatch(getChoiceList(token));
      })
      .catch((err) => {
        dispatch(addChoiceFail(err.message));
      });
  };
};

export default quizSlice.reducer;
