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
import { toggle } from "../features/updateSlice";

export default function EditClassroom() {
  const [open, setOpen] = React.useState(false);
  const { token, userId } = useSelector((state) => state.auth);
  const update = useSelector((state) => state.update.isUpdated);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();

  const handlePost = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("isGlobal", true);
    formData.append("classroom_id", 2);
    formData.append("author_id", userId);
    dispatch(createAnnouncement(token, formData));
    dispatch(toggle(!update));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAnnouncementList(token));
  }, [update, token]);

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
