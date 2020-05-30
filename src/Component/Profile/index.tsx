import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import admin from "../../Assets/icons8-microsoft-admin-50.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SET } from "../../Redux/Action/action";
import { connect } from "react-redux";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { URL_LINK } from "../../Constant/Constant";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "100%",
  },

  title: { justifyContentL: "center", fontSize: 24 },
  pos: {
    marginBottom: 12,
  },
  logo: {
    float: "right",
    display: "flex",
    flexDirection: "column",
  },
  logoWrapper: { display: "inline-block" },
  logTag: { textAlign: "center" },

  edit: {
    color: "#45398b",

    float: "right",
    padding: "1em",
    "&:hover": { cursor: "pointer" },
  },
});

const Profile = (prop: any) => {
  const classes = useStyles();
  const [picture, setPicture] = React.useState();
  const [image, setImage] = React.useState(URL_LINK + "viewpicture");
  // calling fetch function to  fetch user from db and store it im local storage
  // fetch will be called once the user access the profile page
  //  later it will be stored in states and localstorage
  React.useEffect(() => {
    if (sessionStorage.getItem("fetch") === "true") {
    } else {
      sessionStorage.setItem("fetch", "true");
      prop.fetchData();
    }
  }, [prop.Admin]);

  const uploadPic = (event: any) => {
    console.log(event.target.files);
    setPicture(event.target.files[0]);
    console.log(picture);

    const data = event.target.files[0];
    var formData = new FormData();
    formData.append("image", data);
    axios
      .post(URL_LINK + "uploadprofilepic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: any) => {
        setImage(URL_LINK + "viewpicture");
        console.log(response.data);
      })
      .catch(function (error) {});
    console.log(formData);
  };
  const inputFile = React.useRef<any>();
  const fileUploader = () => {
    inputFile.current.click();
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Profile
        </Typography>
        <div>
          <Typography
            variant="h5"
            className={classes.logoWrapper}
            component="h2"
          >
            {prop.user["name"]}
          </Typography>

          <input
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={(event) => uploadPic(event)}
          />
          <img
            src={image}
            style={{ float: "right", borderRadius: "2em" }}
            width="80em"
            height="80em"
            alt="prfile"
            onClick={() => fileUploader()}
          />
          {/* 
          {prop.Admin ? (
            <div className={classes.logo}>
              <img src={admin} alt="admin" />
              <p className={classes.logTag}>Admin</p>
            </div>
          ) : (
            <div className={classes.logo}>
              <AccountCircleIcon />
              <p>User</p>
            </div>
          )} */}
        </div>
        <Typography className={classes.pos} color="textSecondary">
          {prop.user["email"]}
          <br />
        </Typography>{" "}
        <Typography className={classes.pos} color="textSecondary">
          {prop.user["id"]}
          <br />
        </Typography>
        <Typography variant="h5" component="h2">
          {prop.user["company"]}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {prop.user["companyEmail"]}
        </Typography>
        <p className={classes.edit} onClick={() => prop.accountSetting()}>
          Change details <ArrowForwardIcon />
        </p>
      </CardContent>
    </Card>
  );
};

//redux connector to fetch state from redux store
// and bind it to state Admin of local component

const mapStateProps = (state: any) => {
  return { Admin: state.Admin };
};
export default connect(mapStateProps)(Profile);
