import React from "react";
import ClassroomDetail from "../containers/ClassroomDetail";
import Dashboard from "../containers/Dashboard";

const PrivateRoutes = {
  "/": () => <Dashboard />,
  "/classroom/:id": ({ id }) => <ClassroomDetail id={id} />,
  "*": () => <div>Error 404. Page Not Found.</div>,
};

export default PrivateRoutes;
