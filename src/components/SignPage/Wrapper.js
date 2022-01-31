import { withStyles } from "@material-ui/core";
import { signStyles } from "./SignStyles";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

function Wrapper(props) {
  return (
    <Paper className={props.classes.paper}>
      <Avatar className={props.classes.avatar}>
        <PeopleAltIcon className={props.classes.icon} />
      </Avatar>
      <h2>{props.label}</h2>
      {props.children}
    </Paper>
  );
}

export default withStyles(signStyles)(Wrapper);
