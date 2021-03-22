import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../features/userSlice";

function StudentList(props) {
  const dispatch = useDispatch();
  const [student, setStudent] = React.useState("");
  const [veiwStudent, setViewStudent] = React.useState(null);
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUserList(token));
    // eslint-disable-next-line
  }, [dispatch, token]);

  const students = users.filter((d) => d.is_teacher === false);

  console.log(users);
  return (
    <div className="studentlist">
      <input
        placeholder="Search Student"
        onChange={(e) => setStudent(e.target.value)}
      />
      <div className="studentlist__students">
        {students
          .filter((user) => {
            if (student === "") {
              return user;
            } else if (
              user.full_name.toLowerCase().includes(student.toLowerCase())
            ) {
              return user;
            } else {
              return null;
            }
          })
          .map((u, index) => (
            <div
              onClick={() => props.onSelectStudent(u.id)}
              className="studentlist__student"
              key={index}
            >
              <Avatar src={u.avatar} />
              <p>{`${u.first_name} ${u.last_name}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StudentList;
