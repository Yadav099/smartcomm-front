import React from "react";
import "./main.scss";
import {
  AppBar,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    appbar: {
      backgroundColor: "#45398b",
      height: "80px",
      position: "static",
      marginBottom: "1em",
    },
    title: { margin: "auto" },
  })
);
const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar}>
      <Typography variant="h4" className={classes.title}>
        Smart comm
      </Typography>
    </AppBar>
  );
};
export default TopBar;
