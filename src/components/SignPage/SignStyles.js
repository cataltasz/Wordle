
export const signStyles = (theme) => ({
  paper: {
    position: "relative",
    marginTop: theme.spacing(1),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(0,0,0,.1)",
    boxShadow: "4px 4px 0 #ADFF45",

    "&:hover": {
      boxShadow: "8px 8px 0 #ADFF45"
    }
  },
  avatar: {
    marginTop: 20,
    position: "relative",
    background: "rgba(0,0,0,0.2)",
    width: "100px",
    height: "100px"
  },

  icon: {
    width: "80px",
    height: "80px",
    color: "rgba(173, 255, 69,0.79)"
  },

  form: {
    margin: theme.spacing(2)
  },
  labels: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    fontSize: "10px",
    lineHeight: "5px",
    fontWeight: 300,
    opacity: 0.45,
    color: `#ADFF45 !important`
  },

  inputs: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "#ADFF45",
    fontSize: "14px",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    border: "1.4px solid",
    borderColor: "#ADFF45",
    borderRadius: "10px",

    "&:hover": {
      background: "rgba(41, 41, 41,0.36457423) "
    }
  },

  button: {
    color: "black",
    background: "#ADFF45",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: theme.spacing(6),
    padding: `${theme.spacing(1.6)}px`,
    border: "none",
    letterSpacing: "3px",

    "&::before, &::after": {
      position: "absolute",
      content: '""',
      boxSizing: "border-box",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1
    },

    "&:hover": {
      background: "rgba(0,0,0,.1)",
      color: "#adff55",
      border: "1.4px solid",
      borderColor: "#ADFF45"
    }
  },

  passwordEye: {
    color: "#ADFF45",
    opacity: 0.7
  },

  main: {
    margin: "0px 10px",
    paddingTop: "30px",
    display: "block",
    width: "auto",
    borderRadius: "10px",
    [theme.breakpoints.up(400 + theme.spacing(2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  header: {
    margin: "0 0 0 0",
    padding: "10px 2px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  headerItem: {
    padding: "10px 30px",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "4px 4px 0 #ADFF45"
    },

    "&.light": {
      color: "#333",
      backgroundColor: "#4443"
    }
  },

  error: {
    background: "rgba(139,0,0,0.69457423)",
    color: "white",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(3)
  },

  headerItemActive: {
    backgroundColor: "#fff2",
    padding: "12px 35px",

    "&.light": {
      backgroundColor: "#4441"
    }
  }
});
