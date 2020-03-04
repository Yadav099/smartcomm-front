import React from "react";
import "./main.scss";
import { TextBox } from "../../Component/TextBox";
import "bootstrap/dist/css/bootstrap.min.css";
// interface for holding login value
interface ILogin {
  companyName: string;
  employeeEmailId: string;
  password: string;
}

export const Login = () => {
  //state to set and reset logindata
  const [companyName, setCompanyName] = React.useState("");
  const [employeeEmailId, setEmployeeEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");

  //login data object used for api call

  //function to set company name
  const updateCompanyName = (data: string) => {
    setCompanyName(data);
  };

  //function to set password
  const updateEmployeeEmail = (data: string) => {
    setEmployeeEmailId(data);
  };

  //function to set employee email id
  const updatePassword = (data: string) => {
    setPassword(data);
  };

  const makeLoginDataObject = () => {
    const entry: ILogin = {
      companyName: companyName,
      employeeEmailId: employeeEmailId,
      password: password
    };
    //call api here
  };

  return (
    <div className="loginWrapper">
      <h1 className="loginHeading">Login</h1>

      <TextBox placeHolder={"Company Name"} updater={updateCompanyName} />
      <TextBox
        placeHolder={"Employee Email-Id"}
        updater={updateEmployeeEmail}
      />
      <TextBox placeHolder={"Password"} updater={updatePassword} />

      <b onClick={() => makeLoginDataObject()}>Button</b>

      <section className="loginRedirectLinks">
        <a href="#"> Forgot email ?</a>
        <a href="#"> Sign Up for Smart Comm.</a>
      </section>
    </div>
  );
};
