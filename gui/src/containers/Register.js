import React, { useState } from "react";
import { authSignup } from "../features/authSlice";
import { navigate, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

function Register() {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const register = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password1: password1,
      password2: password2,
      email: email,
      first_name: firstName,
      last_name: lastName,
      is_teacher: false,
    };
    dispatch(authSignup(formData, username));
    if (error !== null || (username !== null && password1 !== null)) {
      navigate("/");
    }
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPassword1Change = (e) => {
    setPassword1(e.target.value);
  };
  const onPassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  return (
    <div className="home">
      <div className="home__welcome">
        <form>
          <div className="home__register">
            <div className="register__title">
              <Typography variant="h6">Register</Typography>
            </div>

            <div className="register__field">
              <input onChange={onUsernameChange} placeholder="Username" />
            </div>
            <div className="register__field">
              <input onChange={(e) => onEmailChange(e)} placeholder="Email" />
            </div>
            <div className="register__field">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => onPassword1Change(e)}
              />
            </div>
            <div className="register__field">
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => onPassword2Change(e)}
              />
            </div>
            <div className="register__field">
              <input
                onChange={(e) => onFirstNameChange(e)}
                placeholder="First Name"
              />
            </div>
            <div className="register__field">
              <input
                onChange={(e) => onLastNameChange(e)}
                placeholder="Last Name"
              />
            </div>
            <div className="register__field">
              <button onClick={register}>Register</button>
            </div>
            <div className="link__container">
              <A className="link" href="/">
                Home
              </A>
              <A className="link" href="/login">
                Login
              </A>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
