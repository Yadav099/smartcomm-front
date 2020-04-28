import React from "react";
import Filter from "../../Component/Filters";
import Background from "../../Assets/background.jpg";
import Mail from "../../Assets/logo.png";

import TopBar from "../../Component/AppBar";
import {
  Image,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Carousel,
  Jumbotron,
  Row,
} from "react-bootstrap";
import "./main.scss";

function Index(prop: any) {
  const { history } = prop;
  return (
    <div className="root">
      <Jumbotron className="navBar">
        <h1 className="title">
          <p> Smart Comm</p>
        </h1>
      </Jumbotron>

      <Row className="buttonWrapper">
        <Button
          className="button"
          variant="primary"
          size="lg"
          onClick={() => history.push("/Login")}
        >
          Login
        </Button>
        <Button
          className="button"
          variant="primary"
          size="lg"
          onClick={() => history.push("/Signup")}
        >
          Signup
        </Button>
      </Row>
      <Navbar className="navBar" variant="dark" fixed="bottom">
        <Nav className="center">
          {" "}
          <Nav.Link href="#home">About Us</Nav.Link>
          <Nav.Link href="#features">Contact </Nav.Link>
          <Nav.Link href="#pricing">Help</Nav.Link>
        </Nav>
        <Nav></Nav>
      </Navbar>
    </div>
  );
}

export default Index;
