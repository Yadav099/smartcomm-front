import { URL_LINK } from "../Constant/Constant";
import axios from "axios";

// jwttoken: data,
//function to verify jwt token
//onSuccess => store loggedIn as  true in local storage

export const isLoggediN = () => {
  if (localStorage.getItem("token")) {
    const data: any = localStorage.getItem("token");
    const { token, admin } = JSON.parse(data);
    axios
      .post(URL_LINK + "verify", {
        Authorization: token,
      })
      .then(function (response) {
        if (response.status === 200) {
          const output = response.data["isLoggedIn"];

          localStorage.setItem("isLoggedIn", output);
          localStorage.setItem("isAdmin", admin);
        }
      })
      .catch(function (error) {
        console.log(error.data["Error"]);
      });
  }
};
