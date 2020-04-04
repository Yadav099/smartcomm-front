import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Row from "react-bootstrap/Row";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Input
} from "@material-ui/core";

import axios from "axios";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Container, Col } from "react-bootstrap";
interface data {
  name: String;
  age: string;
  sex: String;
  email: String;
  phonenumber: string;
  interest: String;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "300px"
    },
    space: {
      margin: theme.spacing(1)
    },
    FieldName: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end"
    },
    displayBox: {
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);
export const AddCustomer = (prop: any) => {
  const Fileds = ["Name", "Age", "sex", "email", "Phone Number", "interest"];
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phonenumber, setPhoneNumber] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [interest, setInterest] = React.useState("");
  var jsondata: data[] = [];

  const handleDataChange = (data: string, e: any) => {
    if (data === "Name") {
      setName(e.target.value);
      console.log(name);
    }
    if (data === "Age") {
      setAge(e.target.value);
      console.log(age);
    }
    if (data === "sex") {
      setSex(e.target.value);
      console.log(sex);
    }
    if (data === "email") {
      setEmail(e.target.value);
      console.log(email);
    }
    if (data === "Phone Number") {
      setPhoneNumber(e.target.value);
      console.log(phonenumber);
    }
    if (data === "interest") {
      setInterest(e.target.value);
      console.log(interest);
    }
  };

  const sendFile = (event: any) => {
    const { history } = prop;
    // const data = new FormData();
    // const { file } = values.invitation;
    // data.append("file", file, file.name);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .post(
        "http://127.0.0.1:5000/customer/add/CSV",
        {
          csv: event.target.value
        },
        config
      )
      .then(function(response) {
        alert(response.data);
        if (response.status === 200) {
          history.push("/Home");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <form noValidate autoComplete="off">
          {Fileds.map((text, index) => (
            <Row className="justify-content-md-center">
              <Col className={classes.FieldName}>
                <Typography>{text}:</Typography>
              </Col>
              <Col className={classes.textField}>
                <TextField
                  label={text}
                  onChange={e => {
                    handleDataChange(text, e);
                  }}
                />
              </Col>
            </Row>
          ))}
        </form>
      </Row>
      <br />
      <br />
      <Row className="justify-content-md-center">
        <Button
          onClick={() => {
            var temp = name;

            jsondata.push({
              name: temp,
              age: age,
              sex: sex,
              email: email,
              phonenumber: phonenumber,
              interest: interest
            });
            console.log(jsondata);
          }}
        >
          submit
        </Button>
      </Row>
      <br />
      <br />
      {/* <Row className="justify-content-md-center">
        <Paper elevation={3} className={classes.displayBox}>
          {
              jsondata.map((element:data) => {return(<>
              <p>{element.age}</p> 
             </>
               ) })
          }
        </Paper>
      </Row> */}

      <br />
      <br />
      <Row>
        <Input name="upload-csv-file" type="file" />
      </Row>
      <Row className="justify-content-md-center">
        <Button
          onClick={event => {
            sendFile(event);
          }}
        >
          submit
        </Button>
      </Row>
    </Container>
  );
};
