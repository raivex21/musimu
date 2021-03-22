import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuizDetail,
  addQuestion,
  getChoiceList,
  addChoice,
} from "../../features/quizSlice";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";

import QuizViewer from "./QuizViewer";

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: "100%",
    margin: "10px 0",
  },
  buttonStyle: {
    minWidth: "100%",
    margin: "20px 0",
    height: "3rem",
  },
  choiceButton: {
    minWidth: "100%",
    margin: "10px 0",
    height: "2rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

function getStyles(name, choices, theme) {
  return {
    fontWeight:
      choices.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function QuizDetail(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [choices, setChoices] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newChoice, setNewChoice] = useState("");
  const quizDetail = useSelector((state) => state.quiz.quizDetail);
  const token = useSelector((state) => state.auth.token);
  const choiceList = useSelector((state) => state.quiz.choiceList);

  useEffect(() => {
    dispatch(getQuizDetail(token, props.id));
    dispatch(getChoiceList(token));
  }, [dispatch, token, props.id]);

  const handleChange = (event) => {
    setChoices(event.target.value);
  };
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleAddQuestion = () => {
    const intId = parseInt(props.id);
    const question_choices = choices.map((item) => parseInt(item.id));
    const formData = {
      question: question,
      quiz: intId,
      answer: answer,
      choices: question_choices,
    };
    dispatch(addQuestion(token, formData, props.id));
  };

  const handleChangeNewChoice = (e) => {
    setNewChoice(e.target.value);
  };

  const handleAddChoice = () => {
    for (let i = 0; i < choiceList.length; i++) {
      if (newChoice.toLowerCase() == choiceList[i].name.toLowerCase()) {
        setNewChoice("");
        return;
      }
    }
    const formData = {
      name: newChoice,
    };
    dispatch(addChoice(token, formData));
  };

  return (
    <div>
      <div className="createQuiz">
        <Typography variant="h5">{quizDetail.name}</Typography>
        <Typography variant="subtitle1">
          created by <strong>{quizDetail.teacher_name}</strong> at{" "}
          {quizDetail.created}
        </Typography>
        <Typography variant="subtitle1">
          This quiz is for <strong>{quizDetail.level_name}</strong>
        </Typography>
        <div className="createQuiz__question">
          <Typography variant="h6">Question Form</Typography>
          <TextField
            id={`outlined-basic`}
            label="Quiz Question"
            variant="outlined"
            className={classes.textField}
            size="small"
            multiline
            onChange={handleQuestion}
          />
          <div className="createQuiz__choicesGrid">
            <div className="createQuiz__choiceAnswer">
              <FormControl className={classes.formControl}>
                <InputLabel id={`chip-label`}>Choices</InputLabel>
                <Select
                  labelId={`chip-label`}
                  id={`chip`}
                  multiple
                  value={choices}
                  onChange={handleChange}
                  input={<Input id={`chip`} />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value.id}
                          label={value.name}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {choiceList.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name}
                      style={getStyles(name, choices, theme)}
                    >
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Answer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={answer}
                  onChange={handleAnswer}
                  label="Answer"
                  size="small"
                >
                  {choiceList.map((choice) => (
                    <MenuItem value={choice.id}>{choice.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="createQuiz__addChoice">
              <Typography variant="h6">
                Create a new Option to Choices
              </Typography>
              <TextField
                id={"choice"}
                label="Add to Choices"
                variant="outlined"
                className={classes.textField}
                size="small"
                onChange={handleChangeNewChoice}
              />
              <Button
                className={classes.choiceButton}
                variant="contained"
                color="secondary"
                onClick={handleAddChoice}
              >
                Add
              </Button>
            </div>
          </div>

          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
          >
            Add
          </Button>
        </div>
        <div className="createQuiz">
          <QuizViewer
            quizId={quizDetail.id}
            questions={quizDetail.questions}
            editQuiz={true}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;
