import { FormControl, Input, InputLabel, withStyles } from "@material-ui/core";
import { signStyles } from "./SignStyles";

function RegInput({ classes, onChange, label, type }) {
  return (
    <FormControl required fullWidth margin="normal">
      <InputLabel htmlFor={type} className={classes.labels}>
        {label}
      </InputLabel>
      <Input
        name={type}
        type={type}
        autoComplete={type}
        className={classes.inputs}
        disableUnderline={true}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default withStyles(signStyles)(RegInput);
