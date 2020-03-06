import React from "react";
import "./main.scss";
import { Nav } from "react-bootstrap";
import { navBar } from "../../Constant/Constant";


interface INavBar {
  id: number;
  mainList: string;
  subList: string[];
}

//interface to structure the input from home page

interface ISideNavBar {
  setBody: (index: number) => void;
}

const SideNavBar = (prop: ISideNavBar) => {
  //glow state is used to toggel the left border
  const [glow, setGlow] = React.useState(0);
  const selectedOption = (index: number) => {
    setGlow(index);
    prop.setBody(index);
  };

  const glowSelected = (index: number, glowingIndex: number) => {
    if (index === glowingIndex) return "glowIt";
  };

  return (
    <aside className="sideBarWrapper">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav variant="pills" defaultActiveKey="/home">
          {navBar.map((item: INavBar, index: number) => (
            <Nav.Item
              className={glowSelected(index, glow)}
              onClick={() => {
                selectedOption(index);
              }}
            >
              {item["mainList"]}
            </Nav.Item>
          ))}
        </Nav>
      </Nav>
    </aside>
  );
};

export default SideNavBar;
