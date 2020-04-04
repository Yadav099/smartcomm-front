import React from "react";

import SideNavBar from "../../Component/SideNavBar";
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

import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { UpdateCustomer } from "../UpdateCustomer";
import { AddCustomer } from "../AddCustomer";
import { DeleteCustomer } from "../DeleteCustomer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    HomeWrapper: {
      display: "flex",
      flexDirection: "column"
    },
    AppBar: {
      backgroundColor: "#45398B",
      padding: "1em"
    },
    "@media(width:762px) ": {
      AppBar: {
        width: "100rem"
      }
    },
    buttonStyle: {
      margin: theme.spacing(1)
    }
  })
);

export const CustomerPage = () => {
  const CustomerStyle = useStyles();
  const [select, setSelected] = React.useState(1);

  const handleOnClickAdd = () => {
    setSelected(1);
    console.log(select);
  };
  // const handleOnClickUpdate = () => {
  //   setSelected(2);
  //   console.log(select);
  // };
  // const handleOnClickDelete = () => {
  //   setSelected(3);
  //   console.log(select);
  // };

  return (
    <Container className={CustomerStyle.HomeWrapper}>
      <Row className="justify-content-md-center">
        <Button
          className={CustomerStyle.buttonStyle}
          style={{ width: "10em", backgroundColor: "#45398B", color: "white" }}
          onClick={handleOnClickAdd}
        >
          Add
        </Button>

        {/* <Button
          className={CustomerStyle.buttonStyle}
          onClick={handleOnClickUpdate}
        >
          Update
        </Button>

        <Button
          className={CustomerStyle.buttonStyle}
          onClick={handleOnClickDelete}
        >
          Delete
        </Button> */}
      </Row>
      <br />
      <br />
      <br />
      {select === 1 && <AddCustomer />}
      {/* {select === 2 && <UpdateCustomer />}
      {select === 3 && <DeleteCustomer />} */}
    </Container>
  );
};
