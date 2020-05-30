import React, { Component } from "react";
import { render } from "react-dom";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
import { EditorState } from "draft-js";
import EmailEditor from "react-email-editor";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import ConfirmationDialog from "../ConfirmationDialog";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: "4em",
      "@media (max-width:600px)": {
        display: "none",
        width: "fit-content%",
        margin: "0 ",
      },
    },
    button: { float: "right", marginRight: "19em", marginTop: "1em" },
    editor: {
      display: "none",
      border: "1px solid black",
      margin: "0",
      height: "fit-content",
      "@media (max-width:600px)": {
        display: "block",
      },
    },
  })
);
const MyEditor = (prop: any) => {
  const classes = useStyles();
  const [body, setBody] = React.useState("");
  const [type, setType] = React.useState(1);
  const updateBody = (event: any) => {
    setBody(event.blocks[0].text);
  };
  var data: any;
  const exportHtml = (data: any) => {
    data.exportHtml((value: any) => {
      const { design, html } = value;
      console.log("exportHtml", html);
      console.log(design);
      sendMail(html);
    });
  };

  const sendBody = () => {
    sendMail(body);
  };
  const sendMail = (form: any) => {
    console.log(resp);
    axios
      .post(URL_LINK + "mailBody", {
        form: form,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setResponse(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [resp, setResponse] = React.useState(false);
  const handleResponse = (response: boolean) => {
    console.log(type, response);
    if (response) {
      if (type === 1) exportHtml(data);

      if (type === 2) sendBody();

      prop.gotoMailData();
    }
    prop.setPersistent();
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className={classes.root}>
          {/* <EmailEditor ref={(editor) => (data = editor)} /> */}
          <Editor
            editorStyle={{
              height: "30em",
              border: "2px solid black",
              width: "85%",
              paddingLeft: "1em",
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onChange={(e) => updateBody(e)}
          />
          <div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={() => {
                handleClickOpen();
                setType(2);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.editor}>
        <Editor
          editorStyle={{ width: "100%", height: "30em" }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onChange={(e) => updateBody(e)}
        />
        <div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ float: "right", marginTop: "1em", marginRight: "2em" }}
            onClick={() => {
              handleClickOpen();
              setType(2);
            }}
          >
            Send
          </Button>
        </div>
      </div>
      <ConfirmationDialog
        open={open}
        handleResponse={handleResponse}
        text={"Are you sure to send mail if yes click on agree ?"}
        handleClose={handleClose}
      />
    </>
  );
};

export default MyEditor;
