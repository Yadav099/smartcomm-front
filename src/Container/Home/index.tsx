import React from "react";

// import of icons layouts from material ui
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Container } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";

//import of component
import { CustomerPage } from "../../Component/CustomerPage";
import Filter from "../../Component/Filters";

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
}));

function Home(prop: any) {
  const [value, setValue] = React.useState(1);
  // const dummyCategories = ['Send', 'Customer', 'Logout']
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const handleClick1 = () => {
    setValue(1);
    console.log(value);
  };
  const handleClick2 = () => {
    setValue(2);
    console.log(value);
  };
  const handleClick3 = () => {
    alert("Logout");
    const { history } = prop;

    history.push("/");
    console.log(value);
  };

  const handleClick4 = () => {
    const { history } = prop;

    history.push("/Profile");
    console.log(value);
  };

  const drawer = (
    <div>
      <List>
        {/* {dummyCategories.map((text, index) => ( */}
        <ListItem button key="Send" onClick={handleClick1}>
          <ListItemText primary={<h3>Send</h3>} secondary="Send mail " />
        </ListItem>

        <ListItem button key="Customer" onClick={handleClick2}>
          <ListItemText
            primary={<h3>Employees</h3>}
            secondary="Add or delete  users"
          />
        </ListItem>

        <ListItem button key="Profile" onClick={handleClick4}>
          <ListItemText
            primary={<h3>Profile</h3>}
            secondary="Check your details"
          />
        </ListItem>
        <ListItem button key="Logout" onClick={handleClick3}>
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
      <CssBaseline />
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
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
        {value === 1 && <Filter />}
        {value === 2 && <CustomerPage />}
      </Container>
    </Container>
  );
}

export default Home;
