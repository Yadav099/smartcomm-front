import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import { isLoggediN } from "../../Util/Authenticate";
import { FetchUser } from "../../Util/FetchUser";
import { connect } from "react-redux";
import { Set } from "../../Redux/Action/action";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { dbFilter, URL_LINK } from "../../Constant/Constant";
import StringFilter from "../../Component/CustomFilters/StringFilter";
import NumberFilter from "../../Component/CustomFilters/NumberFilter";
import { Button, Typography } from "@material-ui/core";
import DateFilter from "../../Component/DateFilter";
import axios from "axios";
import Datavisulization from "../../Component/DataVisualization";
import TopBar from "../../Component/AppBar";
import FilterLogo from "../../Assets/Filter.png";
import MyEditor from "../../Component/EmailEditor";
import Background from "../../Assets/background.jpg";
import { isNullOrUndefined } from "util";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: "100em",
      flexShrink: 0,
    },
    drawerPaper: {
      width: "25em",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    clear: {
      color: "red",
      float: "right",
      marginRight: "1em",
      "&:hover": { cursor: "pointer" },
    },
    button: { marginLeft: "1em" },
    filters: {},
    logo: {
      color: "white",
      padding: "5px",
      "&:focus": { outline: "none" },
    },
    logiImg: {
      padding: "5px",
      borderRadius: "5px",
      backgroundColor: "white",
    },
    background: {
      width: "100vw",
      height: "100%",
      paddingTop: "10%",
      "@media (max-width: 600px) ": {
        paddingTop: "25%",
      },
    },
  })
);

const SelectFilter = (prop: any) => {
  var mainData: any = [];

  const reset = () => {
    dbFilter.forEach((text) => {
      data.push(false);
    });
  };
  var data: any = [];
  React.useEffect(() => {
    reset();
  }, []);
  React.useEffect(() => {
    if (prop.visualPers === undefined) sendFilters();
  }, [1]);

  const { history } = prop;
  const { dispatch } = prop;
  let history2 = useHistory();

  const gotoMailData = () => {
    history2.push("/Useremail");
  };
  const Logout = () => {
    // localStorage.setItem("isLoggedIn", "false");
    localStorage.clear();
    history.push("/Login");
    // localStorage.removeItem("UserDetails");
    // localStorage.removeItem("token");
    // sessionStorage.removeItem("fetch");
    // sessionStorage.removeItem("newEmployee");
  };
  React.useEffect(() => {
    sessionStorage.setItem("fetch", "false");

    FetchUser();

    isLoggediN();

    if (loggedin() !== "true") history2.push("/Login");
    dispatch(Set());
  }, [history2]);

  const loggedin = () => {
    isLoggediN();
    return localStorage.getItem("isLoggedIn");
  };
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [filterShow, setFilterShow] = React.useState(data);
  const [submit, setSubmit] = React.useState(false);
  const [customFilterSet, setCustomFilterSet] = React.useState(false);
  const [responseData, setResponseData] = React.useState(prop.visualPers);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const showFilter = (selectIndex: any) => {
    filterShow.forEach((text: any, index: number) => {
      data[index] = text;
    });
    data[selectIndex] = !data[selectIndex];

    setFilterShow(data);
  };

  const pushData = (data: any) => {
    mainData.push(data);
    setSubmit(false);

    sendFilters();
    showChoosenFilter();
    setCustomFilterSet(true);
    // console.log(customFilter);
    console.log(mainData);
  };
  var customFilter: any;
  const showChoosenFilter = () => {
    customFilter = mainData.map((text: any) => <h3>{text["attribute"]}</h3>);
  };
  const sendFilters = () => {
    axios
      .post(URL_LINK + "SetFilters ", {
        arr: mainData,
      })
      .then(function (response) {
        if (response.status === 200) {
          setResponseData(response.data["response"]);
          sessionStorage.setItem(
            "filter",
            JSON.stringify(response.data["response"])
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // setting main data persistentce
  const setPersistent = () => {
    sessionStorage.setItem("filter", JSON.stringify(data, mainData));
  };

  React.useEffect(() => {
    console.log(typeof responseData);
  });

  return (
    <div className={classes.background}>
      <TopBar func={Logout} />
      <div>
        <MyEditor
          setPersistent={setPersistent}
          gotoMailData={gotoMailData}
          mainData={mainData}
        />
      </div>
      <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <List>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                sendFilters();
                setOpen(!open);
                setSubmit(!submit);
              }}
            >
              Apply
            </Button>
            <p
              className={classes.clear}
              onClick={() => {
                mainData.length = 0;
                setSubmit(submit);
                reset();

                setFilterShow(data);
              }}
            >
              Clear
            </p>
            {dbFilter.map((text, index) => (
              <>
                <ListItem
                  button
                  style={
                    filterShow[index]
                      ? {
                          color: "white",
                          fontWeight: "bold",
                          backgroundColor: "#aaaaaa",
                        }
                      : {}
                  }
                  key={text["name"]}
                >
                  <ListItemText
                    primary={text["name"]}
                    onClick={() => {
                      showFilter(index);
                    }}
                  />
                </ListItem>

                <div className={classes.filters}>
                  {filterShow[index] ? (
                    text["type"] === 0 ? (
                      <StringFilter
                        submit={submit}
                        pushData={pushData}
                        attribute={text["attribute"]}
                      />
                    ) : text["type"] === 1 ? (
                      <NumberFilter
                        submit={submit}
                        attribute={text["attribute"]}
                        pushData={pushData}
                        name={text["name"]}
                      />
                    ) : (
                      <DateFilter
                        submit={submit}
                        attribute={text["attribute"]}
                        pushData={pushData}
                      />
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ))}
          </List>
          <Divider />
        </Drawer>
      </div>

      <IconButton
        aria-label="open drawer"
        edge="end"
        style={{
          borderRadius: "10px",
          marginLeft: "10px",
          marginTop: "10px",
          padding: "0.5em",
          backgroundImage: `url(${Background})`,
        }}
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
      >
        <img className={classes.logiImg} src={FilterLogo} alt="admin" />
        <Typography className={classes.logo}>Filter</Typography>{" "}
      </IconButton>
      <div
        style={{
          marginLeft: "10px",
        }}
      >
        <Datavisulization data={responseData} />
        {!customFilterSet ? customFilter : <></>}
      </div>
    </div>
  );
};

//redux connector to fetch state from redux store
// and bind it to state Admin of local component
const mapStateProps = (state: any) => {
  return { Admin: state.Admin };
};
export default connect(mapStateProps)(SelectFilter);
