import React from "react";
import { navigate } from "hookrouter";
import { CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

function Home() {
  const { loading } = useSelector((state) => state.auth);
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home">
      <div className="home__welcome">
        <div className="app__title">
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Typography variant="h3">Musimu</Typography>
          )}
        </div>
        <div className="app__links">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
