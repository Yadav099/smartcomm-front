import React from "react";
import "./main.scss";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Row, Container } from "react-bootstrap";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
interface IForgotPass {
  updateShowEnterCode: () => void;
}
const ForgotPassword = (prop: IForgotPass) => {
  const [employeeMail, updateEmployeeEmail] = React.useState("");
  const updateEmail = (event: any) => {
    updateEmployeeEmail(event.target.value);
  };
  const [company, setCompany] = React.useState("");
  const updateCompany = (event: any) => {
    setCompany(event.target.value);
  };

  const submitHandler = () => {
    prop.updateShowEnterCode();
    axios
      .post(URL_LINK + "ForgotPassword ", {
        emp_email: employeeMail,
        emp_company: company,
      })
      .then(function (response) {
        alert(response.data);
        if (response.status === 200 && response.data === "Success") {
          alert(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container className="forgot-wrapper">
      <Row>
        <Typography variant="h5">Forgot password</Typography>
      </Row>
      <Row>
        <TextField
          id="outlined-basic"
          label="Enter Email-ID"
          variant="standard"
          autoFocus
          required
          fullWidth
          onChange={(event) => updateEmail(event)}
        />
      </Row>
      <br />
      <Row>
        <TextField
          id="outlined-basic"
          label="Enter Company name"
          variant="standard"
          autoFocus
          required
          fullWidth
          onChange={(event) => updateCompany(event)}
        />
      </Row>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Button
          variant="outlined"
          color="primary"
          style={{ textTransform: "none" }}
          onClick={() => {
            submitHandler();
          }}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
};
export default ForgotPassword;
