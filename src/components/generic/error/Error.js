import classes from "./error.module.css";
import { BiError } from "react-icons/bi";
import Fade from "react-reveal/Fade";

export default function Error({ title, desc }) {
  return (
    <Fade>
      <div className={classes.errorContainer}>
        <BiError className={classes.errorIcon} />
        <span className={classes.errorTitle}> {title}</span>
        <span className={classes.errorDesc}> {desc}</span>
      </div>{" "}
    </Fade>
  );
}
