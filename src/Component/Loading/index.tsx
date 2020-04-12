import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function Loading(prop: any) {
  const classes = useStyles();
  const { history } = prop;
  const loggedin = () => {
    return localStorage.getItem("isLoggedIn");
  };
  // React.useEffect(() => {
  //   if (loggedin() === "false") history.push("/");
  //   else history.push("/home");
  // }, [history]);
  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
