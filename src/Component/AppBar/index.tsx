import React from "react";
import { useHistory } from "react-router-dom";

import "./main.scss";
import {
  AppBar,
  Typography,
  createStyles,
  makeStyles,
  Button,
  Theme,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Background from "../../Assets/background.jpg";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "inherit",
      marginBottom: "1em",
      backgroundImage: `url(${Background})`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      userSelect: "none",
      color: "#ededd",
      fontWeight: "bold",

      alignItems: "center",

      textAlign: "center",
    },
    button: {},
  })
);
const TopBar = (prop: any) => {
  const classes = useStyles();
  const [login, setLogin] = React.useState(false);
  const history = useHistory();
  const isLoggediN = () => {
    return localStorage.getItem("isLoggedIn");
  };

  const Logout = () => {
    history.push("/login");
    localStorage.clear();
    // prop.func();
  };

  React.useEffect(() =>
    isLoggediN() === "true" ? setLogin(true) : setLogin(false)
  );
  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Smart-Comm
        </Typography>
        {login ? (
          <>
            {" "}
            <Link to="/home">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <AccountCircleRoundedIcon />
              </IconButton>
            </Link>
            <Button onClick={Logout} color="inherit">
              Logout
            </Button>
          </>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;

// appbar: {
//   backgroundColor: "#45398b",
//   height: "80px",
//   position: "static",
//   marginBottom: "1em",
// },
// title: { margin: "auto" },
// button: {
//   width: "fit-content",
//   marginRight: "auto",
// },
