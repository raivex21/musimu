import React, { useState } from "react";
import { authLogin } from "../features/authSlice";
import { navigate, A } from "hookrouter";

import { useDispatch, useSelector } from "react-redux";

function Login() {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const login = (e) => {
    e.preventDefault();
    dispatch(authLogin(username, password));
    if (error !== null || (username !== null && password !== null)) {
      navigate("/");
    }
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  console.log(password);
  return (
    <div className="home">
      <div className="home__welcome">
        <div className="login__title">
          <h2>Login</h2>
        </div>
        <form>
          <div className="login__username">
            <input
              placeholder="Username"
              onChange={(e) => onUsernameChange(e)}
            />
          </div>
          <div className="login__password">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => onPasswordChange(e)}
            />
          </div>
          <div className="login__button">
            <button onClick={login}>Login</button>
          </div>
          <div className="links">
            <A className="link" href="/">
              Home
            </A>
            <A className="link" href="/register">
              Register
            </A>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
