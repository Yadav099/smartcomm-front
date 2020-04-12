import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  Typography,
  TextField,
  createStyles,
  makeStyles,
  Button,
} from "@material-ui/core";
import { validatePssword } from "../../Util/Validation";
import axios from "axios";
import { URL_LINK } from "../../Constant/Constant";
const useStyles = makeStyles(() =>
  createStyles({
    headingWrapper: { width: "fit-content", fontWeight: "bold" },
    emailWrapper: { marginTop: "2em", width: "18em" },
    root: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: "2em",
    },
  })
);
const UserPasswordChange = () => {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [reNewPassword, setReNewPassword] = React.useState("");
  const updateOldPassword = (event: any) => {
    setOldPassword(event.target.value);
  };
  const updateNewPassword = (event: any) => {
    setNewPassword(event.target.value);
  };
  const updateReNewPassword = (event: any) => {
    setReNewPassword(event.target.value);
  };
  const [old, setOld] = React.useState(false);
  const [pas, setPas] = React.useState(false);
  const [reNew, setReNew] = React.useState(false);
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState(true);
  const validate = () => {
    if (oldPassword === "") setOld(true);
    else setOld(false);
    setPas(validatePssword(newPassword));
    setReNew(validatePssword(reNewPassword));

    //if password not equal
    if (newPassword !== reNewPassword) {
      setReNew(true);
      setError("Password donot match");
    }
    //if password is same as old
    if (newPassword === oldPassword) {
      setPas(true);

      setError("New password entered is same as old password");
    }
  };
  const submitHandler = () => {
    validate();
    if (!pas && !old && !reNew) {
      axios
        .put(URL_LINK + "ChangeProfilePassword", {
          emp_password: oldPassword,
          new_password: newPassword,
        })
        .then(function (response) {
          if (response.status === 200 && response.data === "success") {
            setState(false);
            if (localStorage.getItem("loginData")) {
              const Cryptr = require("cryptr");
              const cryptr = new Cryptr("myTotalySecretKey");
              var data: any = localStorage.getItem("loginData");
              data = JSON.parse(data);
              data["userPassword"] = cryptr.encrypt(newPassword);
              localStorage.setItem("loginData", JSON.stringify(data));
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Container className={classes.root}>
      {state ? (
        <>
          <Col xs={6} className={classes.headingWrapper}>
            <Row>
              <Typography variant="h4" style={{ color: "grey" }}>
                Change password
              </Typography>
            </Row>
          </Col>
          <Row className={classes.emailWrapper}>
            <TextField
              id="outlined-basic"
              label="Enter old password"
              variant="outlined"
              autoFocus
              error={old}
              required
              fullWidth
              onChange={(event) => updateOldPassword(event)}
            />
          </Row>
          <Row className={classes.emailWrapper}>
            <TextField
              id="outlined-basic"
              label="Enter new password"
              variant="outlined"
              autoFocus
              fullWidth
              error={pas}
              onChange={(event) => updateNewPassword(event)}
              required
            />
          </Row>
          <Row className={classes.emailWrapper}>
            <TextField
              id="outlined-basic"
              label="Renter new password"
              variant="outlined"
              autoFocus
              onChange={(event) => updateReNewPassword(event)}
              fullWidth
              error={reNew}
              required
            />
          </Row>
          <Row>
            <Typography variant="h6" style={{ color: "red" }}>
              {error}
            </Typography>
          </Row>
          <Button
            variant="contained"
            className={classes.buttonWrapper}
            color="primary"
            size="large"
            onClick={() => {
              submitHandler();
            }}
          >
            Change
          </Button>
        </>
      ) : (
        <Row>
          <Typography variant="h6" style={{ color: "green" }}>
            Password Changed
          </Typography>
        </Row>
      )}
    </Container>
  );
};
export default UserPasswordChange;
