import React from "react";
import { createStyles, makeStyles, Theme, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ErrorMessage: {
      color: "white",
      width: "20em",
      padding: "0.3em 0.5em",
      boxShadow: "  3px 3px 5px 6px #ccc",
      borderRadius: "0.4em",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
    },
    ErrorMessageText: {
      margin: "auto 1em",
    },
  })
);

interface INotifcation {
  state: boolean;
  message: string;
  response: boolean;
}
const Notification = (prop: INotifcation) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(prop.state);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {!prop.response ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <p
            className={classes.ErrorMessage}
            style={{
              backgroundColor: "red",
            }}
          >
            <ErrorOutlineIcon />
            <p className={classes.ErrorMessageText}>{prop.message}</p>
            <CloseIcon style={{ marginLeft: "auto" }} onClick={handleClose} />
          </p>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <p
            className={classes.ErrorMessage}
            style={{
              backgroundColor: "Green",
            }}
          >
            <CheckIcon />
            <p className={classes.ErrorMessageText}>{prop.message}</p>
            <CloseIcon style={{ marginLeft: "auto" }} onClick={handleClose} />
          </p>
        </Snackbar>
      )}
    </>
  );
};
export default Notification;
