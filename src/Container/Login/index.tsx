import React from "react";

// import of routing and axios api call
import axios from "axios";
import { Link } from "react-router-dom";
import { URL_LINK } from "../../Constant/Constant";

// imports of layouts and styles from bootstrap and material ui
import {
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Container } from "react-bootstrap";

// import for validation of inputs
import {
  validateCompanyName,
  validateEmployeeEmail,
  validatePssword,
} from "../../Util/Validation";

// import for components
import TopBar from "../../Component/AppBar/index";
import ForgotPassword from "../../Component/ForgotPassword/index";
import ForgotMailSent from "../../Component/ForgotMailSent/index";
import { isLoggediN } from "../../Util/Authenticate";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
    company: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: theme.spacing(50),
    },
    textfield: {
      width: "350px",
      margin: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      width: theme.spacing(100),
      height: theme.spacing(80),
      margin: theme.spacing(6),
    },
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(2),
      width: "500px",
      marginTop: "90px",
      marginLeft: "20px",
      marginRight: "20px",
    },
  })
);

export const Login = (prop: any) => {
  const classes = useStyles();
  const { history } = prop;
  // states for handling inputs
  const [companyName, updateCompanyName] = React.useState("");
  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const [password, updatePassword] = React.useState("");

  const remindData = () => {
    const rememberData: any = sessionStorage.getItem("loginData");

    if (rememberData) {
      const Cryptr = require("cryptr");
      const cryptr = new Cryptr("myTotalySecretKey");

      var data = JSON.parse(rememberData);
      updateCompanyName(data["companyName"]);
      updateEmployeeEmail(data["userEmail"]);
      updatePassword(cryptr.decrypt(data["userPassword"]));
    }
  };
  const loggedin = () => {
    return localStorage.getItem("isLoggedIn");
  };
  React.useEffect(() => {
    remindData();
    if (loggedin() === "true") history.push("/Home");
  }, [history]);
  // history  object to handle routing

  const handleClick = () => {
    // const decryptedString = cryptr.decrypt(encryptedString);
    // sessionStorage.setItem("loginData");
    console.log("post");

    // axios api call
    // with authentication header
    // and company name
    axios
      .post(
        URL_LINK + "login ",
        { companyName: companyName },
        {
          auth: { username: employeeMail, password: password },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200) {
          history.push("/Home");
          localStorage.setItem(
            "token",
            JSON.stringify(response.data["access_token"])
          );
          console.log(response.data["access_token"]);
          isLoggediN();
          if (remember) {
            const Cryptr = require("cryptr");
            const cryptr = new Cryptr("myTotalySecretKey");
            console.log(response.data);

            const loginCredential = {
              companyName: companyName,
              userEmail: employeeMail,
              userPassword: cryptr.encrypt(password),
            };
            sessionStorage.setItem(
              "loginData",
              JSON.stringify(loginCredential)
            );
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //states and call back function to handle forgot password
  const [showForget, setShowForget] = React.useState(false);
  const [showEnterCode, setShowEnterCode] = React.useState(true);
  const updateForget = () => {
    setShowForget(!showForget);
    console.log(showForget);
  };
  const updateShowEnterCode = () => {
    setShowEnterCode(!showEnterCode);
    console.log(showEnterCode);
  };

  //successful verrification of code
  const moveToChangePassowrd = () => {
    history.push("/ChangePassword");
  };

  ///////// validation part from here/////////

  const [emailValidation, setEmailValidation] = React.useState(false);
  const [companyValidation, setCompanyValidation] = React.useState(false);
  const [passwordValidation, setPasswordValidation] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const validate = () => {
    setEmailValidation(validateEmployeeEmail(employeeMail));
    setCompanyValidation(validateCompanyName(companyName));
    setPasswordValidation(validatePssword(password));
  };

  ///////validation ends here//////////////
  return (
    <>
      <TopBar />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Paper className={classes.padding} style={{}} elevation={3}>
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                      id="outlined-basic"
                      label="Company Name"
                      variant="standard"
                      value={companyName}
                      onChange={(e) => updateCompanyName(e.target.value)}
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
                      onChange={(e) => updateEmployeeEmail(e.target.value)}
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
                      type="password"
                      value={password}
                      onChange={(e) => updatePassword(e.target.value)}
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
                      onChange={() => setRemember(!remember)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      disableFocusRipple
                      disableRipple
                      style={{ textTransform: "none" }}
                      variant="text"
                      color="primary"
                      onClick={() => {
                        updateForget();
                      }}
                    >
                      Forgot password?
                    </Button>
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
                {showForget ? (
                  showEnterCode ? (
                    <>
                      <br />
                      <Divider />
                      <ForgotPassword
                        updateShowEnterCode={updateShowEnterCode}
                      />
                    </>
                  ) : (
                    <>
                      <br />
                      <Divider />
                      <ForgotMailSent
                        moveToChangePassowrd={moveToChangePassowrd}
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
