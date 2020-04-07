import React from "react";
import "./main.scss";
import { Container, Grid, TextField, Paper, Button } from "@material-ui/core";
import TopBar from "../../Component/AppBar/index";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import { URL_LINK } from "../../Constant/Constant";
const ChangePassword = (prop: any) => {
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const { history } = prop;
  const handleChange = () => {
    if (password === passwordRepeat) {
      axios
        .put(URL_LINK + "ChangePassword ", { emp_pass: password })
        .then(function (response) {
          if (response.status === 200) {
            alert(response.data);
            // history.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("donot match");
  };
  const onChange = (event: any) => {
    setPassword(event.target.value);
  };
  const onChangeRepeat = (event: any) => {
    setPasswordRepeat(event.target.value);
  };
  // 6Lfj2-YUAAAAAJc51y_lQvwGKUTmpB6srV9GdRAT
  return (
    <>
      <TopBar />
      <Container className="changePasswordWrapper" maxWidth="md">
        <Paper className="passwordWrapper">
          <Grid>
            <Typography variant="h3" style={{ color: "green" }}>
              Change password
            </Typography>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              label="password"
              variant="standard"
              fullWidth
              autoFocus
              required
              onChange={(event) => onChange(event)}
            />
          </Grid>
          <br />
          <br />
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              label="Renter password"
              variant="standard"
              fullWidth
              autoFocus
              required
              onChange={(event) => onChangeRepeat(event)}
            />
          </Grid>
          <br />
          <ReCAPTCHA sitekey="6Lfj2-YUAAAAAJRY-0TBlsN3ARmm2-T0JnJ1pvP_" />
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={() => handleChange()}
            >
              Change
            </Button>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default ChangePassword;
