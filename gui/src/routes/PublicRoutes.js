import React from "react";

import Home from "../containers/home/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";

const PublicRoutes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "*": () => <div>Error 404. Page not found.</div>,
};

export default PublicRoutes;
