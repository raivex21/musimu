import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "../features/userSlice";

function Profile(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.userDetail);
  useEffect(() => {
    dispatch(getUserDetail(token, props.id));
  }, [token, dispatch, props.id]);

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
      </div>
    </div>
  );
}

export default Profile;
