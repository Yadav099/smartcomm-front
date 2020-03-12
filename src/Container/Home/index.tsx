
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EmailEditor from "../../Component/EmailEditor";
import { CustomerPage } from "../../Component/CustomerPage"

const drawerWidth = 260;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#45398B"
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));
function Home() {

  const [value, setValue] = React.useState(1);
  // const dummyCategories = ['Send', 'Customer', 'Logout']
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const handleClick1 = () => {
    setValue(1)
    console.log(value)
  }
  const handleClick2 = () => {
    setValue(2)
    console.log(value)
  }
  const handleClick3 = () => {
    setValue(3)
    console.log(value)
  }

  const send = (filter: number, content: string) => {
         alert(filter + content);
  }
const drawer = (
    <div>
      <List>
        {/* {dummyCategories.map((text, index) => ( */}
          <ListItem button key='Send' onClick={handleClick1} >
            <ListItemText primary='Send' />
          </ListItem>

          <ListItem button key='Customer' onClick={handleClick2} >
            <ListItemText primary='Customer' />
          </ListItem>

          <ListItem button key='Logout' onClick={handleClick3} >
            <ListItemText primary='Logout' />
          </ListItem>
        {/* ))} */}
      </List>
    </div>
  );
return (
    <div className={classes.root}>
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
          <Typography variant="h6" noWrap className={classes.title}>
            Smart Comm
          </Typography>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
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
      <div className={classes.content}>
        <div className={classes.toolbar} /> 
        {value === 1 && <EmailEditor send={send} /> }
        {value === 2 && <CustomerPage/> }
        {value === 3 && <p> page 3</p> }

      </div>
    </div>
  );
}

export default Home;