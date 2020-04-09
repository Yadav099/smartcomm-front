import { URL_LINK } from "../Constant/Constant";
import axios from "axios";
// jwttoken: data,
export const isLoggediN = () => {
  if (localStorage.getItem("token")) {
    const data: any = localStorage.getItem("token");
    const { token, isLoggedIn } = JSON.parse(data);
    axios
      .post(URL_LINK + "verify", {
        Authorization: token,
      })
      .then(function (response) {
        if (response.status === 200) {
          const output = response.data["isLoggedIn"];

          localStorage.setItem("isLoggedIn", output);
        }
      })
      .catch(function (error) {
        console.log(error.data["Error"]);
      });
  }
};
