import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEnrollments } from "../features/enrollmentSlice";
import Card from "../components/Card";
import { navigate } from "hookrouter";

function EnrollmentsList() {
  const enrollments = useSelector((state) => state.enrollments.enrollments);
  const { userId, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnrollments(token, userId));
  }, [token, userId, dispatch]);

  return (
    <>
      <div className="dashboard__grid">
        {enrollments &&
          enrollments.map((enrollment, index) => (
            <div
              className="dashboard__card"
              onClick={() => navigate(`/classroom/${enrollment.id}`)}
              key={index}
            >
              <Card
                key={enrollment.classroom_detail.id}
                name={enrollment.classroom_detail.name}
                teacher={enrollment.classroom_detail.teacher_name}
                cover={enrollment.classroom_detail.cover_url}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default EnrollmentsList;
