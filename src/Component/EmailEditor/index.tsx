import React, { Component } from "react";
import { render } from "react-dom";
import { URL_LINK } from "../../Constant/Constant";
import axios from "axios";
import { EditorState } from "draft-js";

import EmailEditor from "react-email-editor";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles, createStyles, Button } from "@material-ui/core";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "@media (max-width:600px)": {
        display: "none",
        width: "fit-content",
        margin: "0 ",
      },
    },
    button: { float: "right", marginRight: "3em", marginTop: "1em" },
    editor: {
      display: "none",
      border: "1px solid black",
      margin: "0 ",
      height: "fit-content",
      "@media (max-width:600px)": {
        display: "block",
      },
    },
  })
);
const MyEditor = () => {
  const classes = useStyles();
  const [body, setBody] = React.useState("");

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
    axios
      .post(URL_LINK + "mail", {
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
  };
  return (
    <>
      <div>
        <div className={classes.root}>
          <EmailEditor ref={(editor) => (data = editor)} />
          <div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={() => exportHtml(data)}
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
            className={classes.button}
            onClick={() => sendBody()}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyEditor;
