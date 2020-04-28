import { URL_LINK } from "../Constant/Constant";
import axios from "axios";

// function to fetch user etails from database and store it in local storage encrypted
// encryption using crptr

export const FetchUser = () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    axios
      .get(URL_LINK + "user", {})
      .then(function (response) {
        if (response.status === 200) {
          const data = {
            name: response.data["name"],
            email: response.data["email"],
            admin: response.data["admin"],
            companyEmail: response.data["companyEmail"],
            company: response.data["company"],
            id: response.data["id"],
          };
          console.log(data);
          const Cryptr = require("cryptr");
          const cryptr = new Cryptr("myTotalySecretKey");
          localStorage.setItem(
            "UserDetails",
            cryptr.encrypt(JSON.stringify(data))
          );
        }
      })
      .catch(function (error) {
        return "No connection";
      });
  }
};
