import React from "react";

import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";

// layouts import
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Collapse,
  Switch,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Table, Col, Row } from "react-bootstrap";

// components and constants
import { Fileds } from "../../Constant/Constant";
import Notification from "../../Component/Notification/index";

// validator
import { validateCompanyName, validatePssword } from "../../Util/Validation";
import TopBar from "../../Component/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginTop: "2em" },
    textwrapper: { position: "relative", margin: "10px" },
    textField: {
      width: "5300px",
      marginTop: "1em",
    },
    space: {
      margin: theme.spacing(1),
    },
    FieldName: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    displayBox: {
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    Heading: {
      padding: "1em",
      backgroundColor: "#45398B",
      color: "white",
      "&:hover": { cursor: "pointer" },
    },
    buttonWrapper: {
      marginRight: "2em",
      marginBottom: "1em",
      width: "fit-content",
      float: "right",
    },

    icon: { float: "right", margin: "auto", width: "2em", height: "2em" },
  })
);

const UserDetails = (prop: any) => {
  const { history } = prop;
  const classes = useStyles();
  const { data } = prop.match.params;
  const token = JSON.parse(data);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });
  const check = () => {
    axios
      .post(URL_LINK + "checkuser", {
        token: token,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
        }
        if (response.status === 203) history.push("/error");
      })
      .catch(function (error) {});
  };
  React.useEffect(() => check(), []);

  // error setting state
  const [error, setError] = React.useState([false, false, false]);

  // gets employee and set employees every time component is rendered

  const handleDataChange = (data: any, e: any) => {
    if (data === "User Name") {
      setName(e.target.value);
      console.log(name);
    }
    if (data === "Employee Id") {
      setId(e.target.value);
      console.log(id);
    }

    if (data === "Password") {
      setPassword(e.target.value);
      console.log(password);
    }
  };

  const checkError = () => {
    setError([
      validateCompanyName(name),
      validatePssword(id),
      validatePssword(password),
    ]);
  };

  // function to send new users to server
  const sendFile = (event: any) => {
    checkError();
    if (!error[0] && !error[1] && !error[2] && !error[3]) {
      axios
        .post(URL_LINK + "customer/addemployee", {
          employeeName: name,
          employeeId: id,
          employeePass: password,
          token: token,
        })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data === "Successful") {
              setNotification({
                state: true,
                response: true,
                message: "Employee is sucessfully added",
              });
              history.push("/Login");
            } else {
              setNotification({
                state: true,
                response: false,
                message: response.data,
              });
              console.log(response.data, response.status);
            }
          }
          console.log(notification);
        })
        .catch(function (error) {
          setNotification({
            state: true,
            response: false,
            message: error.data,
          });
        });
    }
  };

  return (
    <>
      <TopBar />
      <Paper className={classes.root}>
        <div className={classes.textwrapper}>
          {Fileds.map((text, index) => (
            <Row className="justify-content-md-center">
              <Col className={classes.FieldName}>
                <Typography>{text}:</Typography>
              </Col>
              <Col className={classes.textField}>
                <TextField
                  id="outlined-basic"
                  label={text}
                  error={error[index]}
                  variant="standard"
                  onChange={(e) => {
                    handleDataChange(text, e);
                  }}
                />
              </Col>
            </Row>
          ))}
        </div>
        \
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(event) => {
              sendFile(event);
            }}
          >
            submit
          </Button>{" "}
          {notification["state"] ? (
            <Notification
              state={notification["state"]}
              message={notification["message"]}
              response={notification["response"]}
            />
          ) : (
            <></>
          )}
        </div>
        <br />
        <br />
      </Paper>
    </>
  );
};

export default UserDetails;
