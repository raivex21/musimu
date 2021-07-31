import { Button, Divider, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  createLesson,
  createLessonDetails,
  getLessonList,
} from "../features/lesson";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  input: {
    display: "none",
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function AddLesson() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [step, setStep] = useState("");
  const [number, setNumber] = useState(0);
  const { lessonList } = useSelector((state) => state.lesson);
  const { token, is_teacher } = useSelector((state) => state.auth);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    dispatch(getLessonList(token));
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleStep = (e) => {
    setStep(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleChange = (e) => {
    setLesson(e.target.value);
  };
  const handleUpload = (e) => {
    setImage(e.target.files[0]);

    const formData = new FormData();
    formData.append("lesson_number", number);
    formData.append("Lesson_name", step);
    formData.append("lesson_content", content);
    formData.append("lesson_title", lesson);
    formData.append("image1", e.target.files[0]);
    dispatch(createLessonDetails(token, formData));
  };

  const handleCreateTitle = () => {
    const formData = new FormData();
    formData.append("name", title);
    dispatch(createLesson(token, formData));
  };
  console.log(lesson);
  return (
    <div className="add-lesson">
      <Typography variant="h3">Add New Lesson</Typography>

      <TextField
        id="outlined-basic"
        label="Lesson Title"
        variant="outlined"
        className={classes.textField}
        onChange={handleTitle}
        size="small"
      />
      <Button onClick={handleCreateTitle} variant="contained" color="primary">
        Add Lesson
      </Button>

      <TextField
        id="outlined-basic"
        label="Lesson Number"
        variant="outlined"
        className={classes.textField}
        onChange={handleNumber}
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Lesson Subtitle"
        variant="outlined"
        className={classes.textField}
        onChange={handleStep}
        size="small"
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax={4}
        className={classes.textField}
        onChange={handleContent}
        variant="outlined"
      />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Lesson Title
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Content for Lesson"
        >
          {lessonList.map((item) => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </div>
    </div>
  );
}

export default AddLesson;
