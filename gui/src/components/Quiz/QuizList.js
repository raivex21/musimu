import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizzes } from "../../features/quizSlice";
import { navigate } from "hookrouter";
import { Typography } from "@material-ui/core";

function QuizList() {
  const quizList = useSelector((state) => state.quiz.quizzes);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizzes(token));
  }, [token, dispatch]);
  return (
    <>
      <div className="createQuiz">
        <Typography variant="h6">Quiz List</Typography>
        {quizList?.length === 0 ? (
          <div>There is no quiz at the moment...</div>
        ) : null}
        {quizList?.map((item, index) => {
          return (
            <div key={index} className="quizlist__item">
              <div className="quizlist__itemName">
                {item.name} by {item.teacher_name}
              </div>
              <button onClick={() => navigate(`/quiz/${item.id}`)}>Open</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizList;
