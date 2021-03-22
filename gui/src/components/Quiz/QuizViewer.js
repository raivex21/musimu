import React, { useState } from "react";
import { createGradedQuiz } from "../../features/gradeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

function QuizViewer(props) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState({});
  const { token, userId } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    let score = 0;
    const answerKeys = Object.keys(answers);
    const { questions } = props;
    for (let i = 0; i < questions?.length; i++) {}
    answerKeys.forEach(function (element) {
      const correctAnswer = questions.filter((item) => item.id == element);
      if (answers[element] == correctAnswer[0].answer) {
        score += 1;
      }
    });
    let total = questions.length;
    let grade = (score / total) * 100;
    const formData = new FormData();
    formData.append("total", total);
    formData.append("score", score);
    formData.append("grade", grade);
    formData.append("student", userId);
    formData.append("quiz", props.quizId);
    dispatch(createGradedQuiz(token, formData));
  };

  const onChangeAnswer = (e, id) => {
    answers[id] = e.target.value;
    setAnswers({ ...answers });
  };
  return (
    <>
      {props.questions?.map((item) => {
        return (
          <div key={item.id} className="quiz__question">
            <div className="question">
              <Typography variant="subtitle1">{item.question}</Typography>
            </div>
            <div className="choices">
              <div className="choices__row">
                {item.choices_data?.map((choice) => {
                  return (
                    <div
                      key={choice.id}
                      onChange={(e) => onChangeAnswer(e, item.id)}
                      className="choices__item"
                    >
                      <input type="radio" value={choice.id} name={item.id} />
                      <span>{choice.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {props.questions?.length !== 0 ? (
        <div className="quiz__submit">
          {props.editQuiz !== true ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default QuizViewer;
