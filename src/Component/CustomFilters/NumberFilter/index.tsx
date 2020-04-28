import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TextField, createStyles, makeStyles } from "@material-ui/core";
import { URL_LINK } from "../../../Constant/Constant";
import axios from "axios";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    root: {
      width: 300,
      margin: "1em",
    },
    TextField: { margin: "1em" },
    tabs: { width: "1em", padding: 0, marginRight: 0 },
  })
);

interface INumber {
  submit: boolean;
  attribute: string;
  name: string;
  pushData: (data: any) => void;
}
export default function NumberFilter(prop: INumber) {
  const classes = useStyles();

  const [val, setVal] = React.useState(0);
  const [show, setShow] = React.useState([true, false]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setVal(newValue);
  };
  const [lim, setLim] = React.useState<number[]>([50, 70]);

  const [numberData, setNumberData] = React.useState([0, { min: 0, max: 100 }]);

  const updateNumber = (event: any) => {
    setNumberData([event.target.value, numberData[1]]);
  };

  const pushToParent = () => {
    var data: any = {};
    data["type"] = 1;
    data["attribute"] = prop.attribute;
    console.log(numberData);
    show.forEach((state: boolean, index) => {
      if (state) {
        data["filterType"] = index;
        data["data"] = numberData[index];
      }
    });

    if (data["data"] !== 0) prop.pushData(data);
  };
  React.useEffect(() => {
    if (prop.submit) pushToParent();
  });
  React.useEffect(() => getLimit(), []);
  const getLimit = () => {
    axios
      .post(URL_LINK + "getlimit ", {
        attribute: prop.attribute,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLim([response.data["min"], response.data["max"]]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateMax = (event: any) => {
    const data: any = numberData[1];
    setNumberData([
      numberData[0],
      { min: data["min"], max: event.target.value },
    ]);
  };
  const updateMin = (event: any) => {
    const data: any = numberData[1];
    setNumberData([
      numberData[0],
      { max: data["max"], min: event.target.value },
    ]);
  };

  return (
    <Paper square className={classes.wrapper}>
      <Tabs
        value={val}
        centered
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab
          label="Exact"
          className={classes.tabs}
          onClick={() => setShow([true, false])}
        />
        {prop.attribute !== "customer_pno" ? (
          <Tab
            label="Range"
            className={classes.tabs}
            onClick={() => {
              setShow([false, true]);
            }}
          />
        ) : (
          <Tab />
        )}
      </Tabs>
      {show[0] ? (
        <TextField
          id="outlined-basic"
          className={classes.TextField}
          type="number"
          label="Outlined"
          variant="outlined"
          onChange={(e) => updateNumber(e)}
        />
      ) : prop.attribute !== "customer_pno" ? (
        <div className={classes.root}>
          <TextField
            id="outlined-basic"
            type="number"
            className={classes.TextField}
            label={"Minimum " + `${prop.name}` + " : " + `${lim[0]}`}
            variant="outlined"
            onChange={(e) => updateMin(e)}
          />
          <TextField
            id="outlined-basic"
            type="number"
            className={classes.TextField}
            label={"Maximum " + `${prop.name}` + " : " + `${lim[1]}`}
            variant="outlined"
            onChange={(e) => updateMax(e)}
          />
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
}
