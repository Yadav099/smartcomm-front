import React from "react";
import "./main.scss";
import SideNavBar from "../../Component/SideNavBar";

const Home = () => {
  const [body, setBody] = React.useState(0);

  return (
    <>
      <SideNavBar setBody={setBody} />

      {body === 0 ? (
        <b>Send</b>
      ) : body === 1 ? (
        <b>New users</b>
      ) : (
        <b>Customer</b>
      )}
    </>
  );
};

export default Home;
