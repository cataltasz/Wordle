import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { signStyles } from "./SignStyles";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { changeAuth } from "./../../features/auth";
import RegInput from "./RegInput";
import PasswordInput from "./PasswordInput";
import Wrapper from "./Wrapper";

import {
  validateEmail,
  validatePassword,
  getErrorMessage,
} from "./../../utils/validations";

import { useHistory } from "react-router-dom";

function LoginForm({ classes, errorDispatch, hidePassword, showPassword }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Giriş Yap ";
  }, []);

  const isValid = () => validateEmail(email) && validatePassword(password);

  const handleChange = (name) => (e) => {
    if (name === "email") setEmail(e.target.value);
    else if (name === "password") setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password,
    };

    const END_POINT_URL =
      process.env.REACT_APP_LOGIN_ENDPOINT +
      process.env.REACT_APP_FIREBASE_API_KEY;
    fetch(END_POINT_URL, {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(changeAuth(data.idToken));
          localStorage.setItem("auth", data.idToken);
          history.push("/kesfet");
        });
      } else {
        res.json().then((data) => {
          console.log(data.error.message);
          errorDispatch({
            type: "OPEN",
            payload: getErrorMessage(data.error.message),
          });
        });
      }
    });
  };

  return (
    <Wrapper label="Giriş Yap">
      {" "}
      <form className={classes.form} onSubmit={() => submitLogin}>
        <RegInput
          type="email"
          label={"E-mail Adresi"}
          onChange={handleChange("email")}
        />

        <PasswordInput
          hidePassword={hidePassword}
          onChange={handleChange("password")}
          showPassword={showPassword}
          label={"Parola"}
        />

        <Button
          disabled={!isValid()}
          disableRipple
          fullWidth
          variant="outlined"
          className={classes.button}
          type="submit"
          onClick={submitLogin}
        >
          Giriş Yap
        </Button>
      </form>
    </Wrapper>
  );
}

export default withStyles(signStyles)(LoginForm);
