import React from "react";
import "./App.css";
import { Signup } from "./Container/Signup";
import Login from "./Container/Login";
import Home from "./Container/Home";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ChangePassword from "./Container/ChangePassword";
import Loading from "./Component/Loading";
import UserDetails from "./Container/UserDetails";
import SelectFilter from "./Container/SelectFilter";
import Index from "./Container/LandingPage";
import { MailData } from "./Container/MailData/index";

function App() {
  var pers = ["", "", ""];
  const Cryptr = require("cryptr");
  const cryptr = new Cryptr("myTotalySecretKey");
  const rememberData: any = sessionStorage.getItem("loginData");
  if (rememberData) {
    var data = JSON.parse(rememberData);
    var pass: any;
    data["userPassword"]
      ? (pass = cryptr.decrypt(data["userPassword"]))
      : (pass = "");
    pers = [data["companyName"], data["userEmail"], pass];
    console.log(pers);
  }

  var visualPers: any;
  if (
    sessionStorage.getItem("filter") !== undefined &&
    sessionStorage.getItem("filter") !== null
  ) {
    const temp: any = sessionStorage.getItem("filter");
    if (temp) visualPers = JSON.parse(temp);
  }
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={"/Login"}
          component={() => {
            return <Login pers={pers} />;
          }}
        ></Route>
        <Route path="/Home" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/ChangePassword" component={ChangePassword} />
        <Route path="/Loading" component={Loading} />
        <Route path="/UserDetails/:data" component={UserDetails} />
        <Route
          path="/Dashboard"
          component={() => <SelectFilter visualPers={visualPers} />}
        />
        <Route exact path="/" component={Index} />

        <Route
          path="/Invalidurl"
          component={() => {
            return <h3>Invalid url</h3>;
          }}
        />
        <Route path="/Useremail" component={MailData} />
      </Switch>
    </Router>
  );
}

export default App;
