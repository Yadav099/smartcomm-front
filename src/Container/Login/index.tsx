import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { Link } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import {
  validateCompanyName,
  validateEmployeeEmail,
  validatePssword
} from "../../Util/Validation";
import { render } from "@testing-library/react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(0)
    },
    title: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center"
    },
    appbar: {
      backgroundColor: "#45398B"
    },
    company: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: theme.spacing(50)
    },
    textfield: {
      width: "350px",
      margin: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      width: theme.spacing(100),
      height: theme.spacing(80),
      margin: theme.spacing(6)
    },
    margin: {
      margin: theme.spacing(2)
    },
    padding: {
      padding: theme.spacing(2),
      width: "500px"
    }
  })
);

export const Login = (prop: any) => {
  const classes = useStyles();
  const [companyName, updateCompanyName] = React.useState("");

  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const [route, setRoute] = React.useState("");
  const handleClick = () => {
    console.log("post");
    const { history } = prop;
    axios
      .post(
        "http://127.0.0.1:5000/login ",
        { companyName: companyName },
        { auth: { username: employeeMail, password: password } }
      )
      .then(function(response) {
        if (response.status === 200 && response.data === "Success") {
          history.push("/Home");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  ///////// validation part from here/////////

  const [emailValidation, setEmailValidation] = React.useState(false);
  const [companyValidation, setCompanyValidation] = React.useState(false);
  const [passwordValidation, setPasswordValidation] = React.useState(false);

  const validate = () => {
    setEmailValidation(validateEmployeeEmail(employeeMail));
    setCompanyValidation(validateCompanyName(companyName));
    setPasswordValidation(validatePssword(password));
  };

  ///////validation ends here//////////////
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Smart Comm
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Paper
            className={classes.padding}
            style={{
              marginTop: "90px",
              marginLeft: "20px",
              marginRight: "20px"
            }}
            elevation={3}
          >
            <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="outlined-basic"
                    label="Company Name"
                    variant="standard"
                    value={companyName}
                    onChange={e => updateCompanyName(e.target.value)}
                    fullWidth
                    autoFocus
                    required
                    error={companyValidation}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    label="Employee Email-ID"
                    variant="standard"
                    value={employeeMail}
                    onChange={e => updateEmployeeEmail(e.target.value)}
                    fullWidth
                    autoFocus
                    required
                    error={emailValidation}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={8} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    label="password"
                    variant="standard"
                    value={password}
                    onChange={e => updatePassword(e.target.value)}
                    fullWidth
                    autoFocus
                    required
                    error={passwordValidation}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Button
                    disableFocusRipple
                    disableRipple
                    style={{ textTransform: "none" }}
                    variant="text"
                    color="primary"
                  >
                    <Link to="/ForgotPassword"> Forgot password? </Link>
                  </Button>{" "}
                  <Button
                    disableFocusRipple
                    disableRipple
                    style={{ textTransform: "none" }}
                    variant="text"
                    color="primary"
                  >
                    <Link to="/Signup"> New user ?? </Link>
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: "10px" }}>
                <Button
                  onClick={() => {
                    handleClick();
                    validate();
                  }}
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                >
                  Login
                </Button>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
