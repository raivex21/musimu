import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import announcementReducer from "../features/announcementSlice";

import classroomReducer from "../features/classroomSlice";
import enrollmentsSlice from "../features/enrollmentSlice";
import userSlice from "../features/userSlice";
import schoolSlice from "../features/schoolSlice";
import updateSlice from "../features/updateSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    announcement: announcementReducer,
    classroom: classroomReducer,
    enrollments: enrollmentsSlice,
    user: userSlice,
    school: schoolSlice,
    update: updateSlice,
  },
});
