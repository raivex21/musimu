import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGradeLevel } from "../features/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import { createQuiz } from "../features/quizSlice";
import QuizList from "../components/Quiz/QuizList";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "50%",
    margin: "10px 0",
  },
  textField: {
    minWidth: "100%",
    margin: "10px 0",
  },
  buttonStyle: {
    minWidth: "100%",
    margin: "10px 0",
    height: "3rem",
  },
}));

function CreateQuiz() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const { userId, token, first_name, last_name, is_teacher } = useSelector(
    (state) => state.auth
  );

  const [level, setLevel] = React.useState("");
  const [desc, setDesc] = useState("");

  const levels = useSelector((state) => state.school.gradeLevel);

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDesc(e.target.value);
  };

  useEffect(() => {
    dispatch(getGradeLevel(token));
  }, [token, dispatch]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", desc);
    formData.append("teacher", userId);
    formData.append("level", level);
    console.log(formData);
    dispatch(createQuiz(token, formData));

    setTitle("");
    setDesc("");
    setLevel("");
  };
  return (
    <div className="quiz__container">
      {is_teacher === true ? (
        <>
          <div className="createQuiz">
            <Typography variant="h6">Create Quiz</Typography>
            <TextField
              id="outlined-basic"
              label="Quiz Title"
              variant="outlined"
              className={classes.textField}
              onChange={handleTitle}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              multiline
              variant="outlined"
              className={classes.textField}
              onChange={handleDescription}
            />
            <TextField
              id="outlined-basic"
              label={`${first_name} ${last_name}`}
              variant="outlined"
              className={classes.formControl}
              disabled
            />
            <div className="createQuiz__level">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-outlined-label">Grade Level</InputLabel>
                <Select
                  color="primary"
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={level}
                  onChange={handleChange}
                  label="Grade Level"
                >
                  {levels?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {level !== "" && title !== "" && desc !== "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={handleSubmit}
                >
                  Create Quiz
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={handleSubmit}
                  disabled
                >
                  Create Quiz
                </Button>
              )}
            </div>
          </div>
          <div className="createQuiz__list">
            <QuizList />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CreateQuiz;
