import React from "react";
import Header from "../components/Header";

function CustomLayout(props) {
  return (
    <>
      {props.isAuth ? (
        <div className="app">
          <aside className="sidebar">
            <div className="sidebar__container">sidesidesidesideside</div>
          </aside>
          <div className="header">
            <Header />
          </div>
          <div className="main">{props.routes}</div>
        </div>
      ) : (
        <div className="app">{props.routes}</div>
      )}
    </>
  );
}

export default CustomLayout;
