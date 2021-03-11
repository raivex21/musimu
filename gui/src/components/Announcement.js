import { Avatar } from "@material-ui/core";
import React from "react";

const Announcement = (props) => {
  return (
    <div className="announcement">
      <div className="announcement__row">
        <Avatar src={`http://127.0.0.1:8000${props.avatar}`} />
        <div className="announcement__details">
          <div className="announcement__title">
            <h5>{props.title}</h5>
          </div>
          <div className="announcement__content">
            <p>
              <small>{props.content}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
