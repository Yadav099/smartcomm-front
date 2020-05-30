import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import Notification from "../../Component/Notification/index";
import { URL_LINK } from "../../Constant/Constant";
const CustomerFileUploader = () => {
  const [fileData, SetFile] = React.useState("");
  const inputFile = React.useRef<any>();

  // notification state to set erorr / success message
  const [notification, setNotification] = React.useState({
    state: false,
    response: true,
    message: "",
  });
  const updateFile = (event: any) => {
    SetFile(event.target.files[0]);
  };

  const submitFile = () => {
    if (fileData !== undefined) {
      var formData = new FormData();
      formData.append("file", fileData);
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      // formData.append("token", String(localStorage.getItem("userToken")));
      axios
        .post(URL_LINK + "uploadFile", formData, config)
        .then(function (response) {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data === "Data uploaded") {
              console.log("Reached");
              setNotification({
                state: true,
                response: true,
                message: response.data,
              });
            } else
              setNotification({
                state: true,
                response: false,
                message: response.data,
              });
          } else
            setNotification({
              state: true,
              response: false,
              message: response.data,
            });
        })
        .catch(function (error) {
          console.log(error.data);
          setNotification({
            state: true,
            response: false,
            message: error.data,
          });
        });
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(event) => updateFile(event)}
        />

        <img
          src={require("../../Assets/upload.png")}
          style={{
            borderRadius: "2em",
            margin: "auto auto",
            justifyContent: "center",
          }}
          width="350em"
          height="350em"
          alt="Upload logo"
          onClick={() => inputFile.current.click()}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        style={{ float: "right" }}
        color="primary"
        onClick={() => submitFile()}
      >
        Upload
      </Button>
      {notification["state"] ? (
        <Notification
          state={notification["state"]}
          message={notification["message"]}
          response={notification["response"]}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default CustomerFileUploader;
