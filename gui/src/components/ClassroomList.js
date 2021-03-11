import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClassroomList } from "../features/classroomSlice";
import Card from "./Card";
import { navigate } from "hookrouter";
import "../styles/app.css";
// import MuiCard from "./MuiCard";

function EnrollmentsList() {
  const classrooms = useSelector((state) => state.classroom.classrooms);
  const update = useSelector((state) => state.update.isUpdated);
  const { userId, token } = useSelector((state) => state.auth);
  console.log(classrooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassroomList(token, userId));

    // eslint-disable-next-line
  }, [update, token, userId]);

  return (
    <>
      <div className="dashboard__grid">
        {classrooms &&
          classrooms.map((classroom, key) => (
            <div
              className="dashboard__card"
              onClick={() => navigate(`/classroom/${classroom.id}`)}
            >
              <Card
                key={key}
                name={classroom.name}
                teacher={classroom.teacher_name}
                cover={classroom.cover_url}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default EnrollmentsList;
