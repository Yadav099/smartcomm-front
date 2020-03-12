import React from "react";
import "./App.css";
import { Signup } from "./Container/Signup";
import { Login } from "./Container/Login";
import Home from "./Container/Home";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  var session = {
    isLoggedin: "false",
    User: "",
    Company: ""
  };
  localStorage.setItem("UserSession", JSON.stringify(session));
  // JSON.parse(localStorage.getItem("UserSession"));
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/Home" component={Home} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
