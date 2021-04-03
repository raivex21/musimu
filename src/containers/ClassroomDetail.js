import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClassroom } from "../features/classroomSlice";
import { getEnrollmentDetail } from "../features/enrollmentSlice";
import Classroom from "../components/Classroom";

function ClassroomDetail(props) {
  const { token, is_teacher } = useSelector((state) => state.auth);
  const { classroom } = useSelector((state) => state.classroom);
  const currentClassroom = useSelector(
    (state) => state.enrollments.enrollment.classroom_detail
  );

  console.log(currentClassroom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassroom(token, props.id));
    dispatch(getEnrollmentDetail(token, props.id));
    // eslint-disable-next-line
  }, [token, dispatch, props.id]);

  return (
    <div className="">
      <Classroom classroom={is_teacher ? classroom : currentClassroom} />
    </div>
  );
}

export default ClassroomDetail;
