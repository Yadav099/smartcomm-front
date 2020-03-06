import React from "react";
import "./main.scss";
import SideNavBar from "../../Component/SideNavBar";
import Filter from "../../Component/Filters";

const Home = () => {
  const [body, setBody] = React.useState(0);
  //setting filter
  const [filter, setFilter] = React.useState(0);
  //function to set filter
  const selectFilter = (index: number) => {
    setFilter(index);
  };

  return (
    <body className="homePageWrapper">
      <SideNavBar setBody={setBody} />

      {body === 0 ? (
        <Filter selectFilter={selectFilter} />
      ) : body === 1 ? (
        <b>New users</b>
      ) : (
        <b>Customer</b>
      )}
    </body>
  );
};

export default Home;
