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

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dashboard__grid">
        {enrollments &&
          enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="dashboard__card-container"
              onClick={() => navigate(`/classroom/${enrollment.id}`)}
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
