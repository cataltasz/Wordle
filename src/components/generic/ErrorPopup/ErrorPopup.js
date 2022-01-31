import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "react-reveal/Fade";

export default function ErrorPopup({ errorOpen, errorClose, error, errClass }) {
  return (
    <Fade>
      <Snackbar
        variant="error"
        key={error}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={errorOpen}
        onClose={errorClose}
        autoHideDuration={3000}
      >
        <SnackbarContent
          className={errClass}
          message={
            <div>
              <span style={{ marginRight: "8px" }}>
                <ErrorIcon fontSize="large" color="error" />
              </span>
              <span> {error} </span>
            </div>
          }
          action={[
            <IconButton key="close" aria-label="close" onClick={errorClose}>
              <CloseIcon color="error" />
            </IconButton>
          ]}
        />
      </Snackbar>
    </Fade>
  );
}
