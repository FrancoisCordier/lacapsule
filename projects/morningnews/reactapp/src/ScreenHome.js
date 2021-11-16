import React, { useState } from "react";
import "./App.css";
import { Input, Button, Alert, Form } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";

const morningNewsAPI = axios.create({
  baseURL: "http://localhost:3000/",
});

function ScreenHome() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorsSignUp, setErrorsSignUp] = useState([]);
  const [errorsSignIn, setErrorsSignIn] = useState([]);

  const submitSignUp = (username, email, password) => {
    morningNewsAPI
      .post("/sign-up", {
        userName: username,
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log("RESPONSE", response);
        if (response.data.errors) {
          console.log(response.data.errors);
          setErrorsSignUp(response.data.errors);
        } else {
          setIsLogged(true);
        }
      });
  };

  const submitSignIn = (email, password) => {
    morningNewsAPI
      .post("/sign-in", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.errors) {
          setErrorsSignIn(response.data.errors);
        }
        if (response.data.userExists) setIsLogged(true);
      });
  };

  return (
    <div className="Login-page">
      {/* SIGN-IN */}
      {isLogged ? <Redirect to="/screensource" /> : null}
      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="youremail@lsomething.com"
          onChange={(e) => setEmailSignIn(e.target.value)}
          value={emailSignIn}
        />
        {errorsSignIn.length > 0 &&
        errorsSignIn.find((el) => el.param === "email") ? (
          <Alert
            message={errorsSignIn.find((el) => el.param === "email").msg}
            type="error"
            showIcon
          />
        ) : null}
        <Input.Password
          className="Login-input"
          placeholder="Password"
          onChange={(e) => setPasswordSignIn(e.target.value)}
          value={passwordSignIn}
        />
        {errorsSignIn.length > 0 &&
        errorsSignIn.find((el) => el.param === "password") ? (
          <Alert
            message={errorsSignIn.find((el) => el.param === "password").msg}
            type="error"
            showIcon
          />
        ) : null}
        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => submitSignIn(emailSignIn, passwordSignIn)}
        >
          Sign-in
        </Button>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="User name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          name="userName"
        />

        {errorsSignUp.length > 0 &&
        errorsSignUp.find((el) => el.param === "userName") ? (
          <Alert
            message={errorsSignUp.find((el) => el.param === "userName").msg}
            type="error"
            showIcon
          />
        ) : null}
        <Input
          className="Login-input"
          placeholder="E-mail"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          name="email"
        />
        {errorsSignUp.length > 0 &&
        errorsSignUp.find((el) => el.param === "email") ? (
          <Alert
            message={errorsSignUp.find((el) => el.param === "email").msg}
            type="error"
            showIcon
          />
        ) : null}
        <Input.Password
          className="Login-input"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          name="password"
        />
        {errorsSignUp.length > 0 &&
        errorsSignUp.find((el) => el.param === "password") ? (
          <Alert
            message={errorsSignUp.find((el) => el.param === "password").msg}
            type="error"
            showIcon
          />
        ) : null}
        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => submitSignUp(userName, userEmail, userPassword)}
        >
          Sign-up
        </Button>
      </div>
    </div>
  );
}
// }

export default ScreenHome;
