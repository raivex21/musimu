import React, { useEffect, useState } from "react";
import { getQuizzes } from "../../features/quizSlice";
import { useSelector, useDispatch } from "react-redux";
import QuizViewer from "./QuizViewer";
import { getGradedQuiz } from "../../features/gradeSlice";

function ClassroomQuizList(props) {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => state.auth);
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const grades = useSelector((state) => state.grades.gradedQuizzes);
  const [quizId, setQuizId] = useState(null);
  const [questionList, setQuestions] = useState([]);

  useEffect(() => {
    dispatch(getQuizzes(token));
    dispatch(getGradedQuiz(token));
  }, [token, dispatch]);

  const quizzesTaken = grades
    .filter((grade) => grade.student === userId)
    .map((item) => item.quiz);

  const quizList = quizzes
    .filter((item) => props.classroomQuizzes.includes(item.id))
    .filter((item) => !quizzesTaken.includes(item.id));

  const handleQuizId = (id, questions) => {
    setQuizId(id);
    setQuestions(questions);
  };

  return (
    <div className="quizzes">
      <div className="quizlist">
        <h3>Quiz List</h3>
        {quizList?.length === 0 ? (
          <div>There is no quiz at the moment...</div>
        ) : null}
        {quizList?.map((item, index) => {
          return (
            <div key={index} className="quizlist__item">
              <div className="quizlist__itemName">{item.name}</div>
              <button onClick={() => handleQuizId(item.id, item.questions)}>
                Take Quiz
              </button>
            </div>
          );
        })}
      </div>
      <div className="quizViewer">
        <QuizViewer quizId={quizId} questions={questionList} />
      </div>
    </div>
  );
}

export default ClassroomQuizList;
