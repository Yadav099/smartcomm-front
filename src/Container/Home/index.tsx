import React from "react";
import "./main.scss";
import { isLoggediN } from "../../Util/Authenticate";
import { FetchUser } from "../../Util/FetchUser";
import { connect } from "react-redux";

// import of icons layouts from material ui
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Container } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";

// icons
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AdminLogo from "../../Assets/icons8-microsoft-admin-50.png";

//import of component
import { AddCustomer } from "../../Component/AddCustomer/index";
import Filter from "../../Component/Filters/index";
import AccountSetting from "../../Component/AccountSetting/index";
import Profile from "../../Component/Profile/index";
import CustomerFileUploader from "../../Component/CustomerFileUploader/index";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    float: "left",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#45398B",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  logo: {
    float: "right",
    backgroundColor: "white",
    borderRadius: "1em",
  },
  adminLogo: { fontWeight: "bold", padding: "5px 0" },
}));

const Home = (prop: any) => {
  const { history } = prop;
  React.useEffect(() => {
    sessionStorage.setItem("fetch", "false");

    FetchUser();

    if (loggedin() === "false") history.push("/");
  }, [history]);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(1);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    companyEmail: "",
    company: "",
    admin: false,
  });

  const loggedin = () => {
    isLoggediN();
    return localStorage.getItem("isLoggedIn");
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const send = () => {
    setValue(1);
    console.log(value);
  };
  const employee = () => {
    setValue(2);
    console.log(value);
  };
  const Logout = () => {
    console.log(value);
    history.push("/");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("token");
    sessionStorage.removeItem("fetch");
    sessionStorage.removeItem("newEmployee");
  };

  const accountSetting = () => {
    setValue(3);
    console.log(value);
  };
  const profile = () => {
    setValue(4);
    console.log(value);
  };
  const customer = () => {
    setValue(5);
    console.log(value);
  };

  // fetch function called from profile component after successful fetching
  // of user data from server .....   state user lifted up from profile
  const fetchData = () => {
    const Cryptr = require("cryptr");
    const cryptr = new Cryptr("myTotalySecretKey");
    if (localStorage.getItem("UserDetails")) {
      var data = cryptr.decrypt(localStorage.getItem("UserDetails"));
      data = JSON.parse(data);

      setUser({
        name: data["name"],
        email: data["email"],
        company: data["company"],
        companyEmail: data["companyEmail"],
        admin: data["admin"],
      });
    }
  };

  // drawer function constitutes of nav bar
  const drawer = (
    <div>
      <List>
        {/* {dummyCategories.map((text, index) => ( */}
        <ListItem
          button
          key="Send"
          onClick={() => {
            send();
          }}
        >
          <ListItemText primary={<h3>Send</h3>} secondary="Send mail " />
        </ListItem>
        {prop.Admin ? (
          <ListItem
            button
            key="Employee"
            onClick={() => {
              employee();
            }}
          >
            <ListItemText
              primary={<h3>Employees</h3>}
              secondary="Add or delete  users"
            />
          </ListItem>
        ) : (
          <></>
        )}
        <ListItem
          button
          key="Profile"
          onClick={() => {
            profile();
          }}
        >
          <ListItemText
            primary={<h3>Profile</h3>}
            secondary="Check your dtails"
          />
        </ListItem>
        <ListItem
          button
          key="Customer"
          onClick={() => {
            customer();
          }}
        >
          <ListItemText
            primary={<h3>Customer</h3>}
            secondary="Create and manage customer table"
          />
        </ListItem>
        <ListItem
          button
          key="Account setting"
          onClick={() => {
            accountSetting();
          }}
        >
          <ListItemText
            primary={<h3>Account setting</h3>}
            secondary="Change your account details"
          />
        </ListItem>
        <ListItem
          button
          key="Logout"
          onClick={() => {
            Logout();
          }}
        >
          <ListItemText
            primary={<h3>Logout</h3>}
            secondary="Logout ofthe session"
          />
        </ListItem>
        {/* ))} */}
      </List>
    </div>
  );

  return (
    <Container className={classes.root}>
      <CssBaseline />{" "}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap className={classes.title}>
            Smart Comm
          </Typography>
          {prop.Admin ? (
            <div className={classes.adminLogo}>
              <img className={classes.logo} src={AdminLogo} alt="admin" />
              <p style={{ marginBottom: "0" }}>ADMIN</p>
            </div>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClick={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Container className={classes.content}>
        <div className={classes.toolbar} />

        {/* comparision of value set from nav bar to set component to show */}
        {value === 1 && <Filter />}
        {value === 2 && <AddCustomer />}
        {value === 3 && <AccountSetting />}
        {value === 4 && (
          <Profile
            accountSetting={accountSetting}
            user={user}
            fetchData={fetchData}
          />
        )}
        {value === 5 && <CustomerFileUploader />}
      </Container>
    </Container>
  );
};

//redux connector to fetch state from redux store
// and bind it to state Admin of local component
const mapStateProps = (state: any) => {
  return { Admin: state.Admin };
};
export default connect(mapStateProps)(Home);
