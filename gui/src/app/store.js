import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import announcementReducer from "../features/announcementSlice";

import classroomReducer from "../features/classroomSlice";
import enrollmentsSlice from "../features/enrollmentSlice";
import userSlice from "../features/userSlice";
import schoolSlice from "../features/schoolSlice";
import moduleSlice from "../features/moduleSlice";
import quizSlice from "../features/quizSlice";
import gradeSlice from "../features/gradeSlice";
import messageSlice from "../features/messageSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    announcement: announcementReducer,
    classroom: classroomReducer,
    enrollments: enrollmentsSlice,
    user: userSlice,
    school: schoolSlice,
    modules: moduleSlice,
    quiz: quizSlice,
    grades: gradeSlice,
    message: messageSlice,
  },
});
