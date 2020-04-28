import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  TextField,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    TextField: { margin: "1em" },
  })
);

interface IString {
  submit: boolean;
  attribute: string;
  pushData: (data: any) => void;
}
export default function StringFilter(prop: IString) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState([true, false]);
  const [toggler, setToggler] = React.useState([false, false]);
  // setting up datas
  const [string, setString] = React.useState(["", ""]);

  const updateString = (event: any) => {
    setString([event.target.value, string[1]]);
  };
  const updateSubString = (event: any) => {
    setString([string[0], event.target.value]);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // function to push data to parent
  const pushToParent = () => {
    var data: any = {};
    data["type"] = 0;
    data["attribute"] = prop.attribute;
    show.forEach((state: boolean, index) => {
      if (state) {
        data["filterType"] = index;
        data["data"] = string[index];
      }
    });
    if (data["data"] !== "") prop.pushData(data);
  };
  React.useEffect(() => {
    if (prop.submit) pushToParent();
  });

  return (
    <Paper square>
      {prop.attribute !== "customer_gender" ? (
        <>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Search string" onClick={() => setShow([true, false])} />
            <Tab
              label="Enter string if it contains"
              onClick={() => setShow([false, true])}
            />
          </Tabs>
          {show[0] ? (
            <TextField
              id="outlined-basic"
              className={classes.TextField}
              label="Enter exact string"
              variant="outlined"
              onChange={(e) => updateString(e)}
            />
          ) : (
            <TextField
              id="outlined-basic"
              className={classes.TextField}
              label="Enter sub string"
              variant="outlined"
              onChange={(e) => updateSubString(e)}
            />
          )}
        </>
      ) : (
        <>
          <MenuItem
            value="Male"
            style={
              toggler[0] ? { backgroundColor: "gray", color: "white" } : {}
            }
            onClick={(e) => {
              setToggler([true, false]);
              setString(["Male", string[1]]);
            }}
          >
            Male
          </MenuItem>
          <MenuItem
            value="Female"
            style={
              toggler[1] ? { backgroundColor: "gray", color: "white" } : {}
            }
            onClick={(e) => {
              setToggler([false, true]);
              setString(["Female", string[1]]);
            }}
          >
            Female
          </MenuItem>
        </>
      )}
    </Paper>
  );
}
