// component to send email id and company name to server
// on successful resonse switche to forgot mail sent

import React from "react";
import "./main.scss";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Row, Container } from "react-bootstrap";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
interface IForgotPass {
  updateShowEnterCode: () => void;
  updateEmail: (e: any) => void;
  updateCompany: (e: any) => void;
  submitForgetHandler: (state: boolean) => void;
}
const ForgotPassword = (prop: IForgotPass) => {
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
          onChange={(event) => prop.updateEmail(event)}
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
          onChange={(event) => prop.updateCompany(event)}
        />
      </Row>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Button
          variant="outlined"
          color="primary"
          style={{ textTransform: "none" }}
          onClick={() => {
            prop.submitForgetHandler(true);
          }}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
};
export default ForgotPassword;
