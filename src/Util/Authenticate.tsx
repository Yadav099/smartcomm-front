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
        const output = response.data["isLoggedIn"];

        if (response.status === 200) {
          if (output === "false") localStorage.clear();

          localStorage.setItem("isLoggedIn", output);
          localStorage.setItem("isAdmin", admin);
        }
      })
      .catch(function (error) {
        console.log("No connection");
      });
  }
};
