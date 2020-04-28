import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryGroup,
  VictoryScatter,
  VictoryPie,
  VictoryArea,
} from "victory";
import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import LandscapeIcon from "@material-ui/icons/Landscape";

import { createStyles, makeStyles, Tabs, Tab } from "@material-ui/core";
import MyEditor from "../EmailEditor";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      alignContent: "space-evenly",
      paddng: "10px",
      overflow: "scrollable",
      "@media (max-width:600px)": {
        display: "none",
      },
    },
    graphs: {
      margin: "0 10em 3em 10em",
      display: "block",
      width: "30em",
      height: "25em",
      padingLeft: "10px",
      touchAction: "manipulation",
      "@media (max-width:600px)": {
        width: "20em",
        height: "20em",
        margin: 0,
      },
    },
    wrapper: {
      display: "flex",
      "@media (max-width:600px)": {
        flexDirection: "column",
      },
    },
    rootMob: {
      display: "none",
      "@media (max-width:600px)": {
        display: "block",
        "-webkit-overflow-scrolling": "touch",
      },
    },
  })
);

interface IVisualization {
  data: any;
}
const Datavisulization = (prop: IVisualization) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState([true, false, false, false]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.graphs}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={10}
              width={500}
              height={500}
              standalone
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryBar
                barWidth={5}
                alignment="start"
                data={prop.data}
                style={{
                  data: {
                    fill: "blue",
                  },
                }}
              />
            </VictoryChart>
          </div>
          <br />
          <br />
          <div className={classes.graphs}>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryGroup
                data={prop.data}
                style={{
                  data: {
                    fill: "#aaaaaa",
                  },
                }}
              >
                <VictoryLine />
                <VictoryScatter />
              </VictoryGroup>
            </VictoryChart>
          </div>
          <div></div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.graphs}>
            <VictoryPie width={500} height={500} data={prop.data} />
          </div>
          <div className={classes.graphs}>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              theme={VictoryTheme.material}
            >
              <VictoryArea data={prop.data} />
            </VictoryChart>
          </div>
        </div>
      </div>
      <div className={classes.rootMob}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            icon={<BarChartIcon />}
            onClick={() => setShow([true, false, false, false])}
          />
          <Tab
            icon={<LinearScaleIcon />}
            onClick={() => setShow([false, true, false, false])}
          />
          <Tab
            icon={<PieChartIcon />}
            onClick={() => setShow([false, false, true, false])}
          />
          <Tab
            icon={<LandscapeIcon />}
            onClick={() => setShow([false, false, false, true])}
          />
        </Tabs>
        {show[0] ? (
          <div className={classes.graphs}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={10}
              width={500}
              height={500}
              standalone
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryBar
                barWidth={5}
                alignment="start"
                data={prop.data}
                style={{
                  data: {
                    fill: "blue",
                  },
                }}
              />
            </VictoryChart>
          </div>
        ) : show[1] ? (
          <div className={classes.graphs}>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryGroup
                data={prop.data}
                style={{
                  data: {
                    fill: "#aaaaaa",
                  },
                }}
              >
                <VictoryLine />
                <VictoryScatter />
              </VictoryGroup>
            </VictoryChart>
          </div>
        ) : show[2] ? (
          <div className={classes.graphs}>
            <VictoryPie width={500} height={500} data={prop.data} />
          </div>
        ) : (
          <div className={classes.graphs}>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              theme={VictoryTheme.material}
            >
              <VictoryArea data={prop.data} />
            </VictoryChart>
          </div>
        )}
      </div>
    </>
  );
};

export default Datavisulization;
{
  /* [
//     { x: 1, y: 2 },
//     { x: 2, y: 3 },
//     { x: 3, y: 5 },
//     { x: 4, y: 4 },
//     { x: 5, y: 6 },
//   ] */
}
