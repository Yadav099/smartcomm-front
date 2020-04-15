import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
import { Typography } from "@material-ui/core";
interface IChange {
  email: string;
  response: () => void;
}
export default function DialogPassword(prop: IChange) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const submit = () => {
    axios
      .post(URL_LINK + "ChangeEmail", {
        emp_email: prop.email,
        emp_password: password,
      })
      .then(function (response) {
        if (response.status === 200 && response.data === "success") {
          console.log(response.data);
          prop.response();
          handleClose();
          if (localStorage.getItem("loginData")) {
            var data: any = localStorage.getItem("loginData");
            data = JSON.parse(data);
            data["userEmail"] = prop.email;
            localStorage.setItem("loginData", JSON.stringify(data));
          }
        } else if (response.data === "fail") {
          setError(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Verify
          {error ? (
            <Typography variant="h6" style={{ color: "red", margin: "0 auto" }}>
              Wrong password
            </Typography>
          ) : (
            <></>
          )}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter your password to change your email address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter your password"
            type="password"
            fullWidth
            onChange={(event) => updatePassword(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => submit()} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
