import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { signStyles } from "./SignStyles";
import PasswordInput from "./PasswordInput";
import RegInput from "./RegInput";
import { changeAuth } from "./../../features/auth";
import Wrapper from "./Wrapper";

import {
  validateEmail,
  validatePassword,
  validateUsername,
  getErrorMessage,
} from "./../../utils/validations";

function SignUpForm({ classes, errorDispatch, hidePassword, showPassword }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Üye Ol ";
  }, []);

  const handleChange = (name) => (e) => {
    if (name === "email") setEmail(e.target.value);
    else if (name === "password") setPassword(e.target.value);
    else if (name === "username") setUsername(e.target.value);
    else if (name === "passwordConfirm") setPasswordConfirm(e.target.value);
  };

  const passwordMatch = () => password === passwordConfirm;

  const isValid = () =>
    validateEmail(email) &&
    validateUsername(username) &&
    validatePassword(password) &&
    passwordMatch();

  const submitRegistration = (e) => {
    e.preventDefault();

    const END_POINT_URL =
      process.env.REACT_APP_SIGNUP_ENDPOINT +
      process.env.REACT_APP_FIREBASE_API_KEY;

    if (!isValid()) {
      errorDispatch({
        type: "OPEN",
        payload: getErrorMessage("SIGNUP_INVALID"),
      });
      return;
    }

    const newUserCredentials = {
      email: email,
      password: password,
      username: username,
      passwordConfirm: passwordConfirm,
      returnSecureToken: true,
    };

    fetch(END_POINT_URL, {
      method: "POST",
      body: JSON.stringify(newUserCredentials),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        // Everything is okay
        res.json().then((data) => {
          // change auth token in redux
          dispatch(changeAuth(data.idToken));
          // set auth in localStorage
          localStorage.setItem("auth", data.idToken);

          // redirect to discoverPage
          history.push("/kesfet");
        });
      } else {
        // Something is wrong
        res.json().then((data) => {
          errorDispatch({
            type: "OPEN",
            payload: getErrorMessage(data.error.message),
          });
        });
      }
    });
  };

  return (
    <Wrapper label="Üye Ol">
      {" "}
      <form className={classes.form} onSubmit={() => submitRegistration}>
        <RegInput
          type="email"
          label={"E-mail Adresi"}
          onChange={handleChange("email")}
        />

        <RegInput
          type="username"
          label={"Kullanıcı Adı"}
          onChange={handleChange("username")}
        />

        <PasswordInput
          hidePassword={hidePassword}
          onChange={handleChange("password")}
          showPassword={showPassword}
          label={"Parola"}
        />

        <PasswordInput
          hidePassword={hidePassword}
          onChange={handleChange("passwordConfirm")}
          showPassword={showPassword}
          label={"Parolayı Doğrula"}
        />

        <Button
          disabled={!isValid()}
          disableRipple
          fullWidth
          variant="outlined"
          className={classes.button}
          type="submit"
          onClick={submitRegistration}
        >
          Üye Ol
        </Button>
      </form>
    </Wrapper>
  );
}

export default withStyles(signStyles)(SignUpForm);
