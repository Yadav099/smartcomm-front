// component to add employees and view employees
// only accessible and viewed by admin user

import React from "react";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";

// layouts import
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Table, Col, Row } from "react-bootstrap";

import Notification from "../Notification/index";

// validator
import {
  validateEmployeeEmail,
  validateCompanyName,
  validatePssword,
} from "../../Util/Validation";

// icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ConfirmationDialog from "../ConfirmationDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainWrapper: { height: "18em" },
    textwrapper: {
      position: "relative",
      margin: "10px",
      height: "fit-content",
    },
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
      padding: "1em",
    },
    employeesTable: { width: "100%", marginTop: "5em" },
    deleteIcon: {
      "&:hover": { backgroundColor: "red" },
      borderRadius: "0.3em",
    },
    icon: { float: "right", margin: "auto", width: "2em", height: "2em" },
    switch: { marginTop: "1em", float: "right" },

    employee: {
      width: "7em",
      padding: "1em",
      borderRadius: "1em",
      height: "fit-content",
      color: "white",
    },
  })
);

export const AddCustomer = () => {
  // set persistency

  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [admin, setAdmin] = React.useState(false);
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });

  //state and handler function to set views of viewing customer
  // axios call to fetch employees from company
  const [view, setView] = React.useState(false);
  const [views, setViews] = React.useState();
  const [checked, setChecked] = React.useState(false);

  // error setting state
  const [err, setError] = React.useState(false);
  var dontSend = true;
  const [delData, setdelData] = React.useState(["", ""]);
  // gets employee and set employees every time component is rendered
  React.useEffect(() => {
    getEmployees();
  }, []);

  const handleDataChange = (e: any) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  // function to send new users to server
  const sendFile = (event: any) => {
    console.log(err);
    var data: any = "";
    console.log(err);

    if (!validateEmployeeEmail(email) && localStorage.getItem("token")) {
      data = localStorage.getItem("token");
      console.log(data);
      axios
        .post(URL_LINK + "customer/addnewemployee", {
          employeeMail: email,
          admin: admin,
        })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data === "Successful") {
              getEmployees();
              setEmail("");
              setChecked((prev) => !prev);
              setNotification({
                state: true,
                response: true,
                message: "Employee is sucessfully added",
              });
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

  // function to send employee data to delete them from database
  const handleDelete = (name: string, mail: string) => {
    axios
      .delete(URL_LINK + "customer/deleteEmployee", {
        headers: {},
        data: {
          emp_name: name,
          emp_email: mail,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          getEmployees();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // funcction to fetch employees from server and
  // print them in table and differentiate them
  // based on admin and normal user
  const getEmployees = () => {
    axios
      .get(URL_LINK + "customer/viewemployee", {})

      .then(function (response) {
        if (response.status === 200 && !response.data["error"]) {
          var Employees: any;

          Employees = response.data["data"];

          setView(true);
          var count: number = 1;
          setViews(
            Employees.map((data: any) => {
              return response.data["employeeEmail"] !== data["mail"] ? (
                <tbody>
                  <tr>
                    <td>{count++}</td>
                    <td>{data["name"]}</td>
                    <td>{data["mail"]}</td>
                    <td>{data["id"]}</td>
                    <td>
                      {" "}
                      {data["admin"] ? (
                        <div
                          className={classes.employee}
                          style={{
                            backgroundColor: "green",
                          }}
                        >
                          Admin
                        </div>
                      ) : (
                        <div
                          className={classes.employee}
                          style={{
                            backgroundColor: "blue",
                          }}
                        >
                          Employee
                        </div>
                      )}
                    </td>
                    <td>
                      {!data["admin"] ? (
                        <DeleteOutlineIcon
                          className={classes.deleteIcon}
                          onClick={() => {
                            handleDelClickOpen();
                            setdelData([data["name"], data["mail"]]);
                            console.log(delData);
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <></>
              );
            })
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  var mailEvent: any;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [resp, setResponse] = React.useState(false);
  const handleResponse = (response: boolean) => {
    console.log(response);
    if (response) {
      sendFile(mailEvent);
    } else setResponse(false);
  };

  const [delOpen, setdelOpen] = React.useState(false);

  const handleDelClose = () => {
    setdelOpen(false);
  };

  const handleDelClickOpen = () => {
    setdelOpen(true);
  };
  const handleDelResponse = (response: boolean) => {
    console.log(response, delData);

    if (response) handleDelete(delData[0], delData[1]);
  };

  return (
    <div>
      <Paper className={classes.mainWrapper}>
        <Typography
          variant="h5"
          className={classes.Heading}
          onClick={handleChange}
        >
          Add new user
        </Typography>

        <div className={classes.textwrapper}>
          <Row className="justify-content-md-center">
            <Col className={classes.FieldName}>
              <Typography>Email-id:</Typography>
            </Col>
            <Col className={classes.textField}>
              <TextField
                id="outlined-basic"
                label="Email id"
                error={err}
                variant="standard"
                onChange={(e) => {
                  handleDataChange(e);
                }}
              />
            </Col>
          </Row>

          <Row className={classes.switch}>
            <FormControlLabel
              value="end"
              control={
                <Switch color="primary" onChange={() => setAdmin(!admin)} />
              }
              label="Admin"
              labelPlacement="end"
            />
          </Row>
        </div>

        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(event) => {
              setError(validateEmployeeEmail(email));
              handleClickOpen();
              mailEvent = event;
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
        <ConfirmationDialog
          open={open}
          handleResponse={handleResponse}
          text={"Are you sure of adding new user ?"}
          handleClose={handleClose}
        />
        <ConfirmationDialog
          open={delOpen}
          handleResponse={handleDelResponse}
          text={"Are you sure of deletin the user ?"}
          handleClose={handleDelClose}
        />

        <br />
        <br />
      </Paper>

      <Paper className={classes.employeesTable}>
        <Table striped bordered hover size="large" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee name</th>
              <th>Employee email</th>
              <th>Employee id </th>
              <th>Authorization</th>
            </tr>
          </thead>

          {view ? views : <></>}
        </Table>
      </Paper>
    </div>
  );
};
