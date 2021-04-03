import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  createAnnouncement,
  getAnnouncementList,
} from "../features/announcementSlice";
import { getClassroomList } from "../features/classroomSlice";
import { InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

export default function CreateAnnouncement() {
  const [open, setOpen] = React.useState(false);
  const { token, userId } = useSelector((state) => state.auth);
  const classrooms = useSelector((state) => state.classroom.classrooms);
  const [global, setGlobal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [classroom, setClassroom] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassroomList(token, userId));
  }, [dispatch, token, userId]);

  const handlePost = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("isGlobal", global);
    formData.append("classroom_id", classroom);
    formData.append("author_id", userId);
    dispatch(createAnnouncement(token, formData));
    dispatch(getAnnouncementList(token));

    setOpen(false);
  };

  const handleGlobalChange = () => {
    setGlobal(!global);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClassroomChange = (e) => {
    setClassroom(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Post Announcement
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Post Announcement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add announcements globally or for specific Classroom.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={handleName}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            onChange={handleContent}
            fullWidth
          />
          <div className="classroom__create-select">
            <InputLabel id="classroomLabel">classroom</InputLabel>
            <Select
              labelId="classroomLabel"
              id="classroom"
              value={classroom}
              onChange={handleClassroomChange}
              fullWidth
            >
              {classrooms &&
                classrooms.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div className="classroom__create-select">
            <Switch
              checked={global}
              onChange={handleGlobalChange}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <Typography variant="subtitle2">
              Set this announcement to Global
            </Typography>
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
