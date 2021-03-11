import React from "react";

import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";

import MailIcon from "@material-ui/icons/Mail";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Avatar from "@material-ui/core/Avatar";
import { logout } from "../features/authSlice";

function Header(props) {
  const avatar = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();

  return (
    <div className="header__container">
      <div className="header__brand">
        {/* <IconButton>
          <MenuIcon />
        </IconButton> */}
        <span className="musimu">Musimu</span>
      </div>
      <div className="header__navbar">
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <MailIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(logout())}>
          <Avatar src={`http://localhost:8000${avatar}`} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;

//<IconButton onClick={() => props.toggle()}>
