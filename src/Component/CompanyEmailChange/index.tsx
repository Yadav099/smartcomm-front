import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  Typography,
  TextField,
  createStyles,
  makeStyles,
  Button,
} from "@material-ui/core";
import DialogPassword from "../DialogBox";
import { validateEmployeeEmail } from "../../Util/Validation";
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
const CompanyEmailChange = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [task, setTask] = React.useState(true);
  const updateEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const validate = () => {
    if (validateEmployeeEmail(email)) setError(true);
    else {
      setState(!state);
      setError(false);
    }
  };
  const response = () => {
    setTask(false);
  };
  return (
    <Container className={classes.root}>
      {task ? (
        <>
          <Col xs={6} className={classes.headingWrapper}>
            <Row>
              <Typography variant="h4" style={{ color: "grey" }}>
                Change your Email id
              </Typography>
            </Row>
          </Col>

          <Row className={classes.emailWrapper}>
            <TextField
              id="outlined-basic"
              label="Enter new email id"
              variant="outlined"
              autoFocus
              error={error}
              onChange={(event) => updateEmail(event)}
              required
              fullWidth
            />
          </Row>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.buttonWrapper}
            onClick={() => validate()}
          >
            Change
          </Button>
          {state ? <DialogPassword email={email} response={response} /> : <></>}
        </>
      ) : (
        <Row>
          <Typography variant="h6" style={{ color: "green" }}>
            Email id updated to {email}
          </Typography>
        </Row>
      )}
    </Container>
  );
};

export default CompanyEmailChange;
