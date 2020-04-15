import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import axios from "axios";
import { URL_LINK } from "../../Constant/Constant";

import { TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import TopBar from "../../Component/AppBar/index";
import Notification from "../../Component/Notification/index";

import {
  validateEmployeeEmail,
  validateCompanyName,
  validatePssword,
} from "../../Util/Validation";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
  },
  swrapper: {
    width: "fit-content",
    margin: "auto",

    padding: "1em",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 350,
    },
    display: "flex",

    flexDirection: "column",
  },
}));
export const Signup = (prop: any) => {
  // all the states to extract data

  const [companyName, updateCompanyName] = React.useState("");
  const [employeeName, updateEmployeeName] = React.useState("");
  const [companyMail, updateCompanyEmail] = React.useState("");
  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const [employeeID, updateEmployeeID] = React.useState("");

  // notification state to set  error message or success message in Notification componenet
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });

  const classes = useStyles();
  //function to carry out signup on submit
  const signup = () => {
    console.log("post");
    const { history } = prop;
    axios
      .post(URL_LINK + "signup", {
        companyName: companyName,
        companyMail: companyMail,
        employeeName: employeeName,
        employeeID: employeeID,
        employeeMail: employeeMail,
        admin: true,
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 200 && response.data === "Successful") {
          // setting success message

          setNotification({
            state: true,
            response: true,
            message: response.data,
          });
          setTimeout(function () {
            history.push("/");
          }, 2000);
        }

        // setting error message
        else
          setNotification({
            state: true,
            response: false,
            message: response.data,
          });
      })
      .catch(function (error) {
        // setting failure message

        setNotification({
          state: true,
          response: false,
          message: error.data,
        });
      });
    console.log(companyName);
  };

  ///////validator/////

  const [emailValidation, setEmailValidation] = React.useState(false);
  const [companyValidation, setCompanyValidation] = React.useState(false);
  const [companyEmailValidation, setCompanyEmailValidation] = React.useState(
    false
  );
  const [employeeNameValidation, setEmployeeNameValidation] = React.useState(
    false
  );
  const [passwordValidation, setPasswordValidation] = React.useState(false);

  const validate = () => {
    //  employee email
    setEmailValidation(validateEmployeeEmail(employeeMail));
    //company email
    setCompanyEmailValidation(validateEmployeeEmail(companyMail));
    //company name
    setCompanyValidation(validateCompanyName(companyName));
    //employee id
    setPasswordValidation(validatePssword(employeeID));
    //employee name
    setEmployeeNameValidation(validateCompanyName(employeeName));
  };
  //Validator //////

  return (
    <>
      <TopBar />

      <Paper className={classes.swrapper}>
        <Container className={classes.wrapper} style={{ margin: "auto" }}>
          <div className={classes.wrapper} style={{ margin: "auto" }}>
            <Row>
              <h3 className={classes.title}>Company</h3>
            </Row>
            <br />
            <Row>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  value={companyName}
                  error={companyValidation}
                  onChange={(e) => updateCompanyName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Company distribution email id"
                  variant="outlined"
                  value={companyMail}
                  error={companyEmailValidation}
                  onChange={(e) => updateCompanyEmail(e.target.value)}
                />
              </form>
            </Row>
          </div>

          <div style={{ margin: "auto" }}>
            <br />
            <Row>
              <h3 className={classes.title}>Employee</h3>
            </Row>
            <br />
            <Row>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Employee Name"
                  variant="outlined"
                  error={employeeNameValidation}
                  value={employeeName}
                  onChange={(e) => updateEmployeeName(e.target.value)}
                />
                <br />
                <Row></Row>
                <TextField
                  id="outlined-basic"
                  label="Employee ID (This is your password)"
                  variant="outlined"
                  value={employeeID}
                  error={passwordValidation}
                  onChange={(e) => updateEmployeeID(e.target.value)}
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Employee Email"
                  variant="outlined"
                  value={employeeMail}
                  error={emailValidation}
                  onChange={(e) => updateEmployeeEmail(e.target.value)}
                />
              </form>
            </Row>
          </div>
          <br />

          <Row>
            <Button
              onClick={() => {
                signup();
                validate();
                setNotification({
                  state: false,
                  response: false,
                  message: "",
                });
              }}
              style={{
                width: "10em",
                backgroundColor: "#45398B",
                color: "white",
                margin: "auto",
              }}
            >
              Sign Up
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
          </Row>
          <br />
          <Link style={{ margin: "auto" }} to="/">
            Already a user
          </Link>
        </Container>
      </Paper>
    </>
  );
};
