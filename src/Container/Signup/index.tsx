import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  validateEmployeeEmail,
  validateCompanyName,
  validatePssword
} from "../../Util/Validation";

export const Signup = (prop: any) => {
  const [companyName, updateCompanyName] = React.useState("");
  const [employeeName, updateEmployeeName] = React.useState("");
  const [companyMail, updateCompanyEmail] = React.useState("");
  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const [employeeID, updateEmployeeID] = React.useState("");

  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center"
    },
    appbar: {
      backgroundColor: "#45398B"
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 350
      }
    }
  }));
  const classes = useStyles();

  const handleClick = () => {
    console.log("post");
    const { history } = prop;
    axios
      .post("http://127.0.0.1:5000/signup", {
        companyName: companyName,
        companyMail: companyMail,
        employeeName: employeeName,
        employeeID: employeeID,
        employeeMail: employeeMail
      })
      .then(function(response) {
        console.log(response.status);
        if (response.status === 200 && response.data === "Succesfull") {
          history.push("/");
        }
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(companyName);
    console.log("Login Button Pressed");
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
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Smart Comm
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className="main-signup">
        <Container className="main-signup">
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <h3 style={{ height: "20px" }}>Company</h3>
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
                onChange={e => updateCompanyName(e.target.value)}
              />
              <Row></Row>
              <TextField
                id="outlined-basic"
                label="Company Email"
                variant="outlined"
                value={companyMail}
                error={companyEmailValidation}
                onChange={e => updateCompanyEmail(e.target.value)}
              />
            </form>
          </Row>
        </Container>
        <br />
        <br />
        <Container>
          <br />
          <Row>
            <h3 style={{ height: "20px" }}>Employee</h3>
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
                onChange={e => updateEmployeeName(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Employee ID"
                variant="outlined"
                value={employeeID}
                error={passwordValidation}
                onChange={e => updateEmployeeID(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Employee Email"
                variant="outlined"
                value={employeeMail}
                error={emailValidation}
                onChange={e => updateEmployeeEmail(e.target.value)}
              />
            </form>
          </Row>
        </Container>
        <br />

        <Row>
          <Button
            onClick={() => {
              handleClick();
              validate();
            }}
            style={{
              width: "10em",
              backgroundColor: "#45398B",
              color: "white"
            }}
          >
            Sign Up
          </Button>
        </Row>
        <br />
        <Row>
          <Link to="/">Already a user</Link>
        </Row>
      </Container>
    </>
  );
};
