import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEnrollment } from "../features/enrollmentSlice";
import { getUserDetail } from "../features/userSlice";

function EnrollStudent(props) {
  const dispatch = useDispatch();
  const { is_teacher, token } = useSelector((state) => state.auth);
  const { userDetail } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetail(token, props.selectedStudent));
  }, [token, dispatch, props.selectedStudent]);
  const submitEnroll = () => {
    const formData = new FormData();
    formData.append("student_id", props.selectedStudent);
    formData.append("classroom_id", props.id);
    dispatch(createEnrollment(token, formData, props.id));
  };
  console.log(props.students);
  return (
    <div className="enroll">
      <div className="enroll__card">
        <img src={userDetail.avatar}></img>
        <div className="enroll__details">
          <p>{userDetail.full_name}</p>
          <p>{userDetail.email}</p>
          <p>{userDetail.bio}</p>
        </div>
        {is_teacher && (
          <button onClick={submitEnroll}>
            Enroll Student to this classroom
          </button>
        )}
      </div>
    </div>
  );
}

export default EnrollStudent;
