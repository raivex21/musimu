import React, { useState } from "react";
import { authLogin } from "../features/authSlice";
import { navigate, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
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
    dispatch(authLogin(username, password1));
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
          <div className="">
            <input onChange={(e) => onUsernameChange(e)} />
          </div>
          <div className="">
            <input onChange={(e) => onEmailChange(e)} />
          </div>
          <div className="">
            <input type="password" onChange={(e) => onPassword1Change(e)} />
          </div>
          <div className="">
            <input type="password" onChange={(e) => onPassword2Change(e)} />
          </div>
          <div className="">
            <input onChange={(e) => onFirstNameChange(e)} />
          </div>
          <div className="">
            <input onChange={(e) => onLastNameChange(e)} />
          </div>
          <div className="">
            <button onClick={register}>Register</button>
          </div>
          <A className="link" href="/">
            Home
          </A>
        </form>
      </div>
    </div>
  );
}

export default Register;
