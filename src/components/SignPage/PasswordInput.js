import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormControl, Input, InputLabel, withStyles } from "@material-ui/core";
import { signStyles } from "./SignStyles";

function PasswordInput({
  classes,
  hidePassword,
  onChange,
  showPassword,
  label
}) {
  return (
    <FormControl required fullWidth margin="normal">
      <InputLabel htmlFor="password" className={classes.labels}>
        {label}
      </InputLabel>

      <Input
        name="password"
        autoComplete="password"
        className={classes.inputs}
        disableUnderline={true}
        onChange={onChange}
        type={hidePassword ? "password" : "input"}
        endAdornment={
          hidePassword ? (
            <InputAdornment position="end">
              <VisibilityOffTwoToneIcon
                fontSize="medium"
                className={classes.passwordEye}
                onClick={showPassword}
              />
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <VisibilityTwoToneIcon
                fontSize="medium"
                className={classes.passwordEye}
                onClick={showPassword}
              />
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
}

export default withStyles(signStyles)(PasswordInput);
