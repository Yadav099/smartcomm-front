import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Row from "react-bootstrap/Row";
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Collapse,
  Switch,
} from "@material-ui/core";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Table, Col } from "react-bootstrap";
import { Fileds } from "../../Constant/Constant";
import {
  validateEmployeeEmail,
  validateCompanyName,
  validatePssword,
} from "../../Util/Validation";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    employeesTable: { width: "100%", marginTop: "5em" },
    deleteIcon: {
      "&:hover": { backgroundColor: "red" },
      borderRadius: "0.3em",
    },
    icon: { float: "right", margin: "auto", width: "2em", height: "2em" },
    switch: { marginTop: "1em", float: "right" },
  })
);
export const AddCustomer = () => {
  var data: any;
  const classes = useStyles();
  data = JSON.parse(sessionStorage.getItem("newEmployee") || "{}");
  const [name, setName] = React.useState(data[1]);
  const [id, setId] = React.useState(data[0]);
  const [email, setEmail] = React.useState(data[2]);
  const [admin, setAdmin] = React.useState(false);
  if (
    JSON.parse(sessionStorage.getItem("newEmployee") || "{}") !==
    (undefined || null)
  ) {
    data = JSON.parse(sessionStorage.getItem("newEmployee") || "{}");
  } else {
    data = ["", "", ""];
  }
  const handleDataChange = (data: any, e: any) => {
    if (data === "User Name") {
      setName(e.target.value);
      console.log(name);
    }
    if (data === "Employee Id") {
      setId(e.target.value);
      console.log(id);
    }
    if (data === "Email-ID") {
      setEmail(e.target.value);
      console.log(email);
    }
    setPersistent();
  };

  const sendFile = (event: any) => {
    checkError();

    console.log(error);
    var data: any = "";
    if (!error[0] && !error[1] && !error[2] && localStorage.getItem("token")) {
      data = localStorage.getItem("token");
      console.log(data);
      axios
        .post(URL_LINK + "customer/addemployee", {
          employeeName: name,
          employeeId: id,
          employeeMail: email,
          admin: admin,
        })
        .then(function (response) {
          if (response.status === 200) {
            getEmployees();
            wipePersistent();
            setChecked((prev) => !prev);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  //state and handler function to set views of viewing customer
  // axios call to fetch employees from company
  const [view, setView] = React.useState(false);
  const [views, setViews] = React.useState();

  const getEmployees = () => {
    axios
      .get(URL_LINK + "customer/viewemployee", {})

      .then(function (response) {
        if (response.status === 200 && !response.data["error"]) {
          var Employees: any;

          Employees = response.data["data"];
          Employees.map((data: any, index: number) => {});

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
                    <td>
                      <DeleteOutlineIcon
                        className={classes.deleteIcon}
                        onClick={() => {
                          handleDelete(data["name"], data["mail"]);
                        }}
                      />
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
  const setPersistent = () => {
    const data = { 1: name, 0: id, 2: email };
    sessionStorage.setItem("newEmployee", JSON.stringify(data));
  };
  const wipePersistent = () => {
    const data = { 1: "", 0: "", 2: "" };
    sessionStorage.setItem("newEmployee", JSON.stringify(data));
  };
  React.useEffect(() => {
    getEmployees();
    wipePersistent();
    const data = { 1: name, 0: id, 2: email };
    sessionStorage.setItem("newEmployee", JSON.stringify(data));
  }, []);

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
  const [error, setError] = React.useState([false, false, false]);

  const checkError = () => {
    setError([
      validateCompanyName(name),
      validatePssword(id),
      validateEmployeeEmail(email),
    ]);
  };
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <Paper>
        <Typography
          variant="h5"
          className={classes.Heading}
          onClick={handleChange}
        >
          Add new user
          <FormControlLabel
            onClick={handleChange}
            control={
              checked ? (
                <KeyboardArrowUpIcon
                  onClick={handleChange}
                  className={classes.icon}
                ></KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon
                  className={classes.icon}
                  onClick={handleChange}
                />
              )
            }
            label=""
            className={classes.icon}
          />
        </Typography>
        <Collapse in={checked}>
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
                    defaultValue={data[index]}
                    variant="standard"
                    onChange={(e) => {
                      handleDataChange(text, e);
                    }}
                  />
                </Col>
              </Row>
            ))}
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
            </Button>
          </div>
          <br />
          <br />
        </Collapse>
      </Paper>

      <Paper className={classes.employeesTable}>
        <Table size="small" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee name</th>
              <th>Employee email</th>
            </tr>
          </thead>

          {view ? views : <></>}
        </Table>
      </Paper>
    </div>
  );
};
