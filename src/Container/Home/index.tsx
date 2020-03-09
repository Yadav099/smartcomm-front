import React from "react";
import "./main.scss";
import SideNavBar from "../../Component/SideNavBar";
import AppBar from "@material-ui/core/AppBar";

import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import EmailEditor from "../../Component/EmailEditor";

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
    }
  })
);

const Home = () => {
  const [body, setBody] = React.useState(0);

  const homeStyle = useStyles();
  const send = (filter: number, content: string) => {
    alert(filter + content);
  };

  return (
    <Container className={homeStyle.HomeWrapper}>
      <AppBar className={homeStyle.AppBar} position="static">
        <Typography variant="h6" className={"title"}>
          Smart Comm
        </Typography>
      </AppBar>
      <body className="homePageWrapper">
        <SideNavBar setBody={setBody} />

        {body === 0 ? (
          <>
            <EmailEditor send={send} />
          </>
        ) : body === 1 ? (
          <b>New users</b>
        ) : (
          <b>Customer</b>
        )}
      </body>
    </Container>
  );
};

export default Home;
