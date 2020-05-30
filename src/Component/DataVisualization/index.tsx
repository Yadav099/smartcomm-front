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
      margin: "0 0em 3em 10em",
      display: "block",
      width: "100%",
      height: "100%",
      padingLeft: "10px",
      paddingRight: "10px",
      touchAction: "manipulation",
      "@media (max-width:600px)": {
        width: "20em",
        height: "20em",
        margin: 0,
      },
    },
    wrapper: {
      margin: "1em auto",
      display: "flex",
      width: "fit-content",
      border: "1px solid black",

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
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Year Vs Number of clients
            </h4>

            {/* <VictoryChart
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
                barWidth={7}
                alignment="start"
                data={prop.data["year"]}
                style={{
                  data: {
                    fill: "#002C6A",
                  },
                }}
              />
            </VictoryChart> */}
          </div>
          <br />
          <br />
          {/* <div className={classes.graphs} style={{ marginTop: "2em" }}>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              theme={VictoryTheme.material}
            >
              <VictoryArea
                style={{ data: { fill: "#76BCDC" } }}
                interpolation="natural"
                data={prop.data["year"]}
              />
            </VictoryChart>
          </div> */}
          <div></div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.graphs}>
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Male to Female ratio
            </h4>
            <VictoryPie
              width={500}
              colorScale={["#002C6A", "#76BCDC"]}
              height={500}
              data={prop.data["gender"]}
            />
          </div>
          <div className={classes.graphs}>
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Number of people by Age group
            </h4>
            <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryGroup
                data={prop.data["age"]}
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
          </div>{" "}
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
            {/* <VictoryChart
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
                data={prop.data["year"]}
                style={{
                  data: {
                    fill: "#002C6A",
                  },
                }}
              />
            </VictoryChart> */}
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Year Vs Number of clients
            </h4>
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
                data={prop.data["age"]}
                style={{
                  data: {
                    fill: "#aaaaaa",
                  },
                }}
              >
                <VictoryLine />
                <VictoryScatter />
              </VictoryGroup>
            </VictoryChart>{" "}
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Number of people by Age group
            </h4>
          </div>
        ) : show[2] ? (
          <div className={classes.graphs}>
            <VictoryPie
              colorScale={["#002C6A", "#76BCDC"]}
              width={500}
              height={500}
              data={prop.data["gender"]}
            />

            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Male to Female ratio
            </h4>
          </div>
        ) : (
          <div className={classes.graphs}>
            {/* <VictoryChart
              width={500}
              height={500}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              theme={VictoryTheme.material}
            >
              <VictoryArea
                style={{ data: { fill: "#76BCDC" } }}
                data={prop.data["year"]}
              />
            </VictoryChart> */}
            <h4
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                color: "#4D545A",
                fontFamily: "Calibri",
                fontSize: 24,
                paddingTop: "5px",
              }}
            >
              Year Vs Number of clients
            </h4>
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
