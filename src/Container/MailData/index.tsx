import React from "react";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import TopBar from "../../Component/AppBar";
import ConfirmationDialog from "../../Component/ConfirmationDialog";
import Notification from "../../Component/Notification/index";
const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    // margin: theme.spacing(1),
    margin: "1em auto",

    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 1, 2),
    margin: "0.5em",
  },
  button: {
    display: "flex",
  },
}));

export function MailData(prop: any) {
  const classes = useStyles();

  // const { data } = prop.match.params;
  // console.log(JSON.parse(data));
  const { history } = prop;
  const Logout = () => {
    // localStorage.setItem("isLoggedIn", "false");
    localStorage.clear();
    history.push("/Login");
    // localStorage.removeItem("UserDetails");
    // localStorage.removeItem("token");
    // sessionStorage.removeItem("fetch");
    // sessionStorage.removeItem("newEmployee");
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleResponse = (response: boolean) => {
    console.log(response);
    if (response) {
      history.push("/Dashboard");
    }
  };

  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });

  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const updateEmail = (event: any) => {
    updateEmployeeEmail(event.target.value);
  };
  const sendMail = () => {
    axios
      .post(URL_LINK + "mail", {
        email: employeeMail,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200 && response.data === "Successful") {
          console.log(response.data);
          setNotification({
            state: true,
            response: true,
            message: response.data,
          });
          history.push("/Dashboard");
        } else
          setNotification({
            state: true,
            response: false,
            message: response.data,
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <TopBar func={Logout} />
      <Container className={classes.root} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            style={{ textAlign: "center" }}
            component="h1"
            variant="h5"
          >
            Provide the distributive email credentials
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => updateEmail(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => updatePassword(event)}
          />
          <div className={classes.button}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => sendMail()}
            >
              Sign In
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
              className={classes.submit}
            >
              Cancel
            </Button>
          </div>
        </div>{" "}
        <ConfirmationDialog
          open={open}
          handleResponse={handleResponse}
          text={"Are you sure to cancel the process ?"}
          handleClose={handleClose}
        />
      </Container>
      {notification["state"] ? (
        <Notification
          state={notification["state"]}
          message={notification["message"]}
          response={notification["response"]}
        />
      ) : (
        <></>
      )}
    </>
  );
}
