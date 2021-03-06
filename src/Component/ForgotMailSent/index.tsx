// component to send verrification code to server for verrfication
// after successful verrification router redirects to change password container

import React from "react";
import "./main.scss";
import axios from "axios";
import { URL_LINK } from "../../Constant/Constant";

import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
interface Iverify {
  moveToChangePassowrd: () => void;
  updateShowEnterCode: () => void;
  submitForgetHandler: (state: boolean) => void;
}
const ForgotMailSent = (prop: Iverify) => {
  const [otp, setOtp] = React.useState("");
  const updateToken = (event: any) => {
    setOtp(event.target.value);
  };
  const submitHandler = () => {
    axios
      .post(URL_LINK + "VerrifyToken ", {
        token: otp,
      })
      .then(function (response) {
        alert(response.data);
        if (response.status === 200 && response.data === "Success") {
          localStorage.setItem("changePassword", "true");
          prop.moveToChangePassowrd();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="forgot-wrapper">
      <Row>
        <Col>
          <h5>Verify code</h5>
        </Col>
        <Col>
          <Typography
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              prop.updateShowEnterCode();
            }}
          >
            Re-Enter
          </Typography>
        </Col>
        <Col>
          <Typography
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              prop.submitForgetHandler(false);
            }}
          >
            Re-send
          </Typography>
        </Col>
      </Row>
      <Row>
        <TextField
          id="outlined-basic"
          label="Enter verrification code"
          variant="standard"
          autoFocus
          required
          fullWidth
          onChange={(event) => updateToken(event)}
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
    </div>
  );
};
export default ForgotMailSent;
