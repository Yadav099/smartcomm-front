//react and redux imports
import React from "react";
import { Set } from "../../Redux/Action/action";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./main.scss";

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
import Notification from "../../Component/Notification/index";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

      "@media (max-width: 600px) ": {
        position: "fixed",
      },
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
      backgroundColor: "inherit",

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
      backgroundColor: "#CCCCCC",
      padding: theme.spacing(2),
      width: "500px",
      marginTop: "20%",
      marginLeft: "20px",
      marginRight: "20px",
      "@media (max-width: 600px) ": {
        marginTop: "35%",
      },
    },
  })
);

const Login = (prop: any) => {
  //sets persistency and checks if
  // user is already loggedin or not
  var pers = ["", "", ""];
  React.useEffect(() => {
    remindData();
    if (loggedin() === "true") {
      history.push("/Home");
      console.log("reached");
    }
  }, []);
  const Cryptr = require("cryptr");
  const cryptr = new Cryptr("myTotalySecretKey");
  var data: any;
  const classes = useStyles();

  // history  object to handle routing
  const history = useHistory();

  // states for handling inputs
  const { dispatch } = prop;
  data = JSON.parse(sessionStorage.getItem("loginData") || "{}");

  // const [companyName, updateCompanyName] = React.useState(data["companyName"]);
  // const [employeeMail, updateEmployeeEmail] = React.useState(data["userEmail"]);
  // var pass: any;
  // data["userPassword"]
  //   ? (pass = cryptr.decrypt(data["userPassword"]))
  //   : (pass = "");

  // const [password, updatePassword] = React.useState(pass);

  const [companyName, updateCompanyName] = React.useState(prop.pers[0]);
  const [employeeMail, updateEmployeeEmail] = React.useState(prop.pers[1]);
  const [password, updatePassword] = React.useState(prop.pers[2]);
  // notification state to set erorr / success message
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });

  const updatePasswordValue = (event: any) => {
    updatePassword(event.target.value);
  };

  const updateCompanyValue = (event: any) => {
    updateCompanyName(event.target.value);
  };

  const updateEmailValue = (event: any) => {
    updateEmployeeEmail(event.target.value);
  };

  //states and call back function to handle forgot password
  const [showForget, setShowForget] = React.useState(false);
  const [showEnterCode, setShowEnterCode] = React.useState(true);

  // set up persistent from local storage to local states
  const remindData = () => {
    const rememberData: any = sessionStorage.getItem("loginData");
    if (rememberData) {
      data = JSON.parse(rememberData);
      updateCompanyName(data["companyName"]);
      updateEmployeeEmail(data["userEmail"]);
      updatePassword(cryptr.decrypt(data["userPassword"]));
      // var pass: any;
      // data["userPassword"]
      //   ? (pass = cryptr.decrypt(data["userPassword"]))
      //   : (pass = "");
      // pers = [data["companyName"], data["userEmail"], pass];
      // console.log(pers);
    }
  };

  const loggedin = () => {
    return localStorage.getItem("isLoggedIn");
  };

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

  // axios api call for login with aythentication header
  // which returns a JWT token on successful login
  // which is stored in local storage and

  const signin = () => {
    // axios api call
    // with authentication header
    // and company name
    if (!emailValidation && !companyValidation && !passwordValidation) {
      console.log(employeeMail);
      setNotification({
        state: false,
        response: false,
        message: "invalid email or password ",
      });
      axios
        .post(
          URL_LINK + "login ",
          { companyName: companyName },
          {
            auth: { username: employeeMail, password: password },
          }
        )
        .then(function (response) {
          if (response.status === 200 && !response.data["error"]) {
            if (response.data["render"]) {
              localStorage.setItem("changePassword", "true");
              history.push("/ChangePassword");
            } else {
              localStorage.setItem("isLoggedIn", "true");
              history.push("/Dashboard");

              localStorage.setItem(
                "token",
                JSON.stringify(response.data["access_token"])
              );
              console.log(response.data["access_token"]);
              setNotification({
                state: true,
                response: true,
                message: "Logging in... ",
              });
              if (remember) {
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
              dispatch(Set());
            }
          } else {
            setNotification({
              state: true,
              response: false,
              message: response["data"]["error"],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          setNotification({
            state: true,
            response: false,
            message: "No response ",
          });
        });
    }
    console.log(notification);
  };

  //forgot password props
  const [employeEmail, updateEmployeEmail] = React.useState("");
  const updateEmail = (event: any) => {
    updateEmployeEmail(event.target.value);
  };
  const [company, setCompany] = React.useState("");
  const updateCompany = (event: any) => {
    setCompany(event.target.value);
  };

  const submitForgetHandler = (state: boolean) => {
    if (state) updateShowEnterCode();
    axios
      .post(URL_LINK + "ForgotPassword ", {
        emp_email: employeEmail,
        emp_company: company,
      })
      .then(function (response) {
        if (response.status === 200 && response.data === "Success") {
          setNotification({
            state: true,
            response: true,
            message: "Verrification code sent",
          });
        }
      })
      .catch(function (error) {
        setNotification({
          state: true,
          response: false,
          message: "Wrong email or company name",
        });
      });
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
    <div className="background">
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
                      onChange={(e) => updateCompanyValue(e)}
                      fullWidth
                      defaultValue={prop.pers[0]}
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
                      onChange={(e) => updateEmailValue(e)}
                      fullWidth
                      defaultValue={prop.pers[1]}
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
                      onChange={(e) => updatePasswordValue(e)}
                      fullWidth
                      defaultValue={prop.pers[2]}
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
                      validate();
                      signin();
                    }}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                  {notification["state"] ? (
                    <Notification
                      state={notification["state"]}
                      message={notification["message"]}
                      response={notification["response"]}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
                {showForget ? (
                  showEnterCode ? (
                    <>
                      <br />
                      <Divider />
                      <ForgotPassword
                        updateEmail={updateEmail}
                        updateCompany={updateCompany}
                        submitForgetHandler={submitForgetHandler}
                        updateShowEnterCode={updateShowEnterCode}
                      />
                    </>
                  ) : (
                    <>
                      <br />
                      <Divider />
                      <ForgotMailSent
                        updateShowEnterCode={updateShowEnterCode}
                        moveToChangePassowrd={moveToChangePassowrd}
                        submitForgetHandler={submitForgetHandler}
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
    </div>
  );
};

const mapStateProps = (state: any) => {
  return { Admin: state.Admin };
};
export default connect(mapStateProps)(Login);
