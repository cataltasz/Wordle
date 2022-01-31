import { CssBaseline, withStyles } from "@material-ui/core";
import { useReducer, useState } from "react";
import LoginForm from "./LoginForm";
import { signStyles } from "./SignStyles";
import SignUpForm from "./SignUpForm";
import ErrorPopup from "./../generic/ErrorPopup/ErrorPopup";
import { useSelector } from "react-redux";

const initialErrorState = {
  errorText: null,
  errorOpen: false
};

function errorReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { errorText: action.payload, errorOpen: true };
    case "CLOSE":
      return { errorText: null, errorOpen: false };
    default:
      throw new Error();
  }
}

function SignPage({ classes }) {
  const auth = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);

  const [errorState, errorDispatch] = useReducer(
    errorReducer,
    initialErrorState
  );
  const [page, setPage] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  const errorClose = (e) => {
    errorDispatch({ type: "CLOSE" });
  };

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  if (auth !== "")
    return (
      <div className={classes.main}>
        Hali hazırda giriş yapmış bulunmaktasınız!{" "}
      </div>
    );

  return (
    <div className={classes.main}>
      <CssBaseline />

      <div className={classes.header}>
        <span
          onClick={() => {
            if (!page) setPage(true);
          }}
          className={
            classes.headerItem +
            " " +
            theme +
            " " +
            (page && classes.headerItemActive)
          }
        >
          Giriş Yap
        </span>
        <span
          onClick={() => {
            if (page) setPage(false);
          }}
          className={
            classes.headerItem +
            " " +
            theme +
            " " +
            (!page && classes.headerItemActive)
          }
        >
          Üye Ol
        </span>
      </div>
      {page ? (
        <LoginForm
          errorDispatch={errorDispatch}
          showPassword={showPassword}
          hidePassword={hidePassword}
        />
      ) : (
        <SignUpForm
          errorDispatch={errorDispatch}
          showPassword={showPassword}
          hidePassword={hidePassword}
        />
      )}

      {errorState.errorOpen && (
        <ErrorPopup
          errorOpen={errorState.errorOpen}
          errorClose={errorClose}
          error={errorState.errorText}
          errClass={classes.error}
        />
      )}
    </div>
  );
}

export default withStyles(signStyles)(SignPage);
