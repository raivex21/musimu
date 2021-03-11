import React from "react";
// import { authLogin } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authCheckState } from "./features/authSlice";
import CustomLayout from "./containers/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import "fontsource-roboto";
import { useRoutes } from "hookrouter";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import "./styles/app.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  dispatch(authCheckState());

  // useEffect(() => {
  //   dispatch(authCheckState());
  // }, [dispatch]);

  const isAuthenticated = user.token !== null;
  const privateRoutes = useRoutes(PrivateRoutes);
  const publicRoutes = useRoutes(PublicRoutes);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <CustomLayout
            isAuth={isAuthenticated}
            routes={isAuthenticated ? privateRoutes : publicRoutes}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
