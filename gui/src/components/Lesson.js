import React, { useEffect } from "react";
import { getCurrentLesson } from "../features/lesson";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Typography } from "@material-ui/core";

function Lesson(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { currentLesson } = useSelector((state) => state.lesson);
  console.log(props.id);
  console.log(currentLesson);
  useEffect(() => {
    dispatch(getCurrentLesson(token, props.id));
  }, [props.id]);

  return (
    <div className="lesson">
      <Typography variant="h3">{currentLesson?.name}</Typography>
      <Divider />

      {currentLesson?.steps?.map((step, index) => {
        return (
          <div>
            <Typography variant="h6">{step.Lesson_name}</Typography>

            <div className="lesson-content">{step.lesson_content}</div>
            <div className="lesson-images">
              <img
                alt=""
                src={`${process.env.REACT_APP_AXIOS_URL}${step.image1}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Lesson;
