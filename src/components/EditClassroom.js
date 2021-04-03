import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  getSchoolYear,
  getGradeLevel,
  getCover,
} from "../features/schoolSlice";
import { createClassroom } from "../features/classroomSlice";

export default function EditClassroom() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const dispatch = useDispatch();
  const [cover, setCover] = useState(null);
  const [year, setYear] = useState(null);
  const [gradeLevel, setGradeLevel] = useState(null);
  const schoolYear = useSelector((state) => state.school.schoolYear);
  const covers = useSelector((state) => state.school.cover);
  const level = useSelector((state) => state.school.gradeLevel);
  const { token, first_name, last_name, userId } = useSelector(
    (state) => state.auth
  );
  const classrooms = useSelector((state) => state.classroom.classrooms);

  useEffect(() => {
    dispatch(getSchoolYear(token));
    dispatch(getGradeLevel(token));
    dispatch(getCover(token));
  }, [token, classrooms]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSchedule = (e) => {
    setSchedule(e.target.value);
  };
  const handleLevelChange = (e) => {
    console.log(e.target.value);
    setGradeLevel(e.target.value);
  };
  const handleYearChange = (e) => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  const handleCoverChange = (e) => {
    setCover(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("schedule", schedule);
    formData.append("teacher_id", userId);
    formData.append("level_id", gradeLevel);
    formData.append("school_year_id", year);
    formData.append("cover", cover);
    formData.append("isActive", true);
    dispatch(createClassroom(token, formData));
    console.log(formData);
    // dispatch(toggle(!update));
    navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Classroom
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add students after creating the classroom
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Classroom Name"
            type="text"
            fullWidth
            onChange={handleName}
          />
          <TextField
            margin="dense"
            id="schedule"
            label="Schedule"
            type="text"
            fullWidth
            onChange={handleSchedule}
          />
          <TextField
            margin="dense"
            id="teacher"
            label="Teacher"
            type="text"
            value={`${first_name} ${last_name}`}
            disabled
            fullWidth
          />
          <div className="classroom__create-select">
            <InputLabel id="coverLabel">Cover</InputLabel>
            <Select
              labelId="coverLabel"
              id="cover"
              value={cover}
              onChange={handleCoverChange}
              fullWidth
            >
              {covers &&
                covers.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div className="classroom__create-select">
            <InputLabel id="levelLabel">Level</InputLabel>
            <Select
              labelId="levelLabel"
              id="level"
              value={gradeLevel}
              onChange={handleLevelChange}
              fullWidth
            >
              {level &&
                level.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div className="classroom__create-select">
            <InputLabel id="yearLabel">School Year</InputLabel>
            <Select
              labelId="yearLabel"
              id="year"
              value={year}
              onChange={handleYearChange}
              fullWidth
            >
              {schoolYear &&
                schoolYear.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {`${item.start_year}-${item.end_year}`}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
