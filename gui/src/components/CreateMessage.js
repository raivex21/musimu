import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { getUserList } from "../features/userSlice";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { sendMessage } from "../features/messageSlice";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
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

export default function CreateMessage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { token, userId } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.users);

  const [receiver, setReceiver] = React.useState("");
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();

  const userList = users.filter((item) => item.id !== userId);

  const handlePost = () => {
    const formData = {
      message: content,
      receiver: receiver,
      sender: userId,
    };
    dispatch(sendMessage(token, formData));
    setOpen(false);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeReceiver = (e) => {
    setReceiver(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUserList(token));
  }, [dispatch, token]);

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <SendIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Messaging</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-outlined-label">Receiver</InputLabel>
            <Select
              color="primary"
              labelId="select-outlined-label"
              id="select-outlined"
              value={receiver}
              onChange={handleChangeReceiver}
              label="Grade Level"
            >
              {userList?.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.full_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            onChange={handleContent}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
