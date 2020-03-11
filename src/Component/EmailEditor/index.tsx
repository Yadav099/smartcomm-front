import React from "react";
import "./main.scss";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  FormControl,
  Container,
  Paper,
  Divider,
  Typography,
  FormLabel
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Filter from "../Filters";
import { Media } from "react-bootstrap";
//Email interface
interface IEmail {
  send: (filter: number, content: string) => void;
}

//EmailEditor component
const EmailEditor = (prop: IEmail) => {
  //setting the filter
  const [filter, setFilter] = React.useState(0);

  //function to set filter
  const selectFilter = (index: number) => {
    setFilter(index);
  };
  //state to set email content
  const [emailContent, setEmailContent] = React.useState("");

  //function to set state of email content on change
  const emailBody = (event: any) => {
    setEmailContent(event.target.value);
  };
  return (
    <Paper className="emailComponent" square>
      <FormControl className="textAreaWrapper">
        <Filter selectFilter={selectFilter} />
        <Divider />

        <FormLabel className="email_label" style={{ fontSize: "2em" }}>
          Email template
        </FormLabel>
        <TextareaAutosize
          rowsMax={200}
          style={{ height: "30em", width: "80em", fontSize: "16px" }}
          className="textArea"
          aria-label="maximum height"
          onChange={value => {
            emailBody(value);
          }}
          onKeyDown={value => emailBody(value)}
        />
        <Container className="buttonWrapper">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              prop.send(filter, emailContent);
            }}
          >
            <b className="submitLabel">Send</b>
            <SendIcon />
          </Button>
        </Container>
      </FormControl>
    </Paper>
  );
};
export default EmailEditor;
