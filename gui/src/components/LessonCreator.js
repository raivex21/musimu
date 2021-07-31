import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { getLessonList, getCurrentLesson } from "../features/lesson";
import { navigate } from "hookrouter";

const lessonTitle = [
  {
    id: 1,
    title: "Lesson #1",
  },
  {
    title: "Lesson #2",
  },
];

const lessonSteps = [
  {
    stepNumber: 1,
    stepName: "First",
    stepDescription: "First Sentence",
    stepTitle: 1,
    image1: "",
    image2: "",
  },
  {
    stepNumber: 2,
    stepName: "Second",
    stepDescription: "Second Sentence description",
    stepTitle: 1,
    image1: "",
    image2: "",
  },
];

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

function LessonCreator() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { is_teacher, token } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const { lessonList } = useSelector((state) => state.lesson);

  useEffect(() => {
    dispatch(getLessonList(token));
  }, []);

  console.log(lessonList);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="lessons">
      <Typography variant="h6">Lesson Creator</Typography>
      {is_teacher && (
        <div className="create-lesson">
          <Button
            onClick={() => navigate("/add-lesson")}
            variant="contained"
            color="primary"
          >
            Add New Lesson
          </Button>
        </div>
      )}
      <Typography variant="h6">Lessons</Typography>
      <TextField
        id="outlined-basic"
        label="Search Lesson Module"
        variant="outlined"
        className={classes.textField}
        onChange={handleSearch}
        size="small"
      />
      <div className="lesson-list">
        {lessonList
          ?.filter((item) => {
            if (item.name === "") {
              return item;
            } else if (
              item.name?.toLowerCase().includes(search?.toLowerCase())
            ) {
              return item;
            } else {
              return null;
            }
          })
          .map((item) => {
            return (
              <div
                onClick={() => navigate(`/lesson/${item.id}`)}
                key={item.id}
                className="lesson-name"
              >
                <Typography variant="subtitle2">{item.name}</Typography>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LessonCreator;
