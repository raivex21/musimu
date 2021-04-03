import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGradeLevel } from "../features/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import { createTask, getTaskList } from "../features/taskSlice";
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

const subCategories = [
  {
    id: 1,
    name: "A",
    cat: 3,
  },
  {
    id: 2,
    name: "B",
    cat: 3,
  },
  {
    id: 3,
    name: "C",
    cat: 3,
  },
  {
    id: 4,
    name: "D",
    cat: 3,
  },
  {
    id: 5,
    name: "E",
    cat: 3,
  },
  {
    id: 6,
    name: "F",
    cat: 3,
  },
  {
    id: 7,
    name: "G",
    cat: 3,
  },
  {
    id: 8,
    name: "Top",
    cat: 2,
  },
  {
    id: 9,
    name: "Bottom",
    cat: 2,
  },
  {
    id: 10,
    name: "F Clef",
    cat: 1,
  },
  {
    id: 11,
    name: "G Clef",
    cat: 1,
  },
];

const categories = [
  { id: 1, name: "Clef" },
  { id: 2, name: "Time Signature" },
  { id: 3, name: "Key Signature" },
];

function CreateTask() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const { token, is_teacher } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("");
  const [level, setLevel] = React.useState("");
  const [subcat, setSubcat] = useState("");
  const taskList = useSelector((state) => state.task.taskList);
  const levels = useSelector((state) => state.school.gradeLevel);

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubcat = (e) => {
    setSubcat(e.target.value);
  };

  useEffect(() => {
    dispatch(getGradeLevel(token));
    dispatch(getTaskList(token));
  }, [token, dispatch]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", title);
    formData.append("cat", category);
    formData.append("sub_cat", subcat);
    formData.append("level", 1);
    console.log(formData);
    dispatch(createTask(token, formData));
    setTitle("");
    setCategory("");
    setSubcat("");
    setLevel("");
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  console.log(taskList);

  const newSubcat = subCategories.filter((item) => item.cat === category);
  return (
    <div className="quiz__container">
      {is_teacher === true ? (
        <>
          <div className="createQuiz">
            <Typography variant="h6">Create Task</Typography>
            <TextField
              id="outlined-basic"
              label="Task Title"
              variant="outlined"
              className={classes.textField}
              onChange={handleTitle}
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
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="catgories">Category</InputLabel>
                <Select
                  color="primary"
                  labelId="categories"
                  id="category"
                  value={category}
                  onChange={handleChangeCategory}
                  label="Category"
                >
                  {categories?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="sub-categories">Sub Category</InputLabel>
                <Select
                  color="primary"
                  labelId="sub-categories"
                  id="sub-category"
                  value={subcat}
                  onChange={handleSubcat}
                  label="Sub Category"
                >
                  {newSubcat?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {level !== "" &&
              title !== "" &&
              subcat !== "" &&
              category !== "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={handleSubmit}
                >
                  Create Task
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={handleSubmit}
                  disabled
                >
                  Create Task
                </Button>
              )}
            </div>
          </div>
        </>
      ) : null}
      <div className="tasklist">
        <strong>Task List</strong>
        {taskList.map((item) => {
          return (
            <div className="tasklist__item" key={item.id}>
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateTask;
