import { IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail, editProfile } from "../features/userSlice";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { createConvo, getConvoList } from "../features/convoSlice";
import { navigate } from "hookrouter";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
    margin: theme.spacing(1),
  },
  message: {
    margin: "10px 0 10px 0",
  },
}));

function Profile(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.userDetail);
  const [newImage, setNewImage] = useState({});
  useEffect(() => {
    dispatch(getUserDetail(token, props.id));
  }, [token, dispatch, props.id]);
  const convos = useSelector((state) => state.convo.convos);

  useEffect(() => {
    dispatch(getConvoList(token, userId));
  }, [token, userId, dispatch]);

  console.log(props.id);
  console.log(userId);
  console.log(convos);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("email", user.email);
    formData.append("username", user.username);
    formData.append("last_name", user.last_name);
    formData.append("first_name", user.first_name);
    formData.append("is_teacher", user.is_teacher);
    formData.append("is_student", user.is_student);
    formData.append("avatar", e.target.files[0]);
    dispatch(editProfile(token, formData, userId));
    setNewImage(file);
  };

  console.log(newImage);

  const createConversation = () => {
    const list = convos.filter((item) =>
      item.users.includes(parseInt(props.id))
    );
    console.log(list);
    if (list.length === 0) {
      const formData = {
        user1: userId,
        user2: props.id,
      };
      dispatch(createConvo(token, formData, userId));
      navigate("/inbox");
    } else {
      navigate("/inbox");
    }
  };
  return (
    <div className="profile">
      <div className="profile__photo">
        <img src={user.avatar} />
      </div>
      <div className="profile__card">
        <Typography variant="h6">{user.full_name}</Typography>
        {user.is_teacher && (
          <Typography variant="subtitle1">Teacher</Typography>
        )}
        <Typography variant="subtitle2">{user.email}</Typography>
        {userId === parseInt(props.id) ? (
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
        ) : null}
        {userId == props.id ? null : (
          <Button
            className={classes.message}
            onClick={createConversation}
            variant="contained"
            color="primary"
          >
            Open Messages
          </Button>
        )}
      </div>
    </div>
  );
}

export default Profile;
