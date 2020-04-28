import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      padding: "1em",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

interface IDate {
  submit: boolean;
  attribute: string;
  pushData: (data: any) => void;
}
export default function DateFilter(prop: IDate) {
  const classes = useStyles();
  const [date, setDate] = React.useState({
    min: "2016-05-24T10:30",
    max: "2017-05-24T10:30",
  });
  const updateDateMin = (event: any) => {
    setDate({ min: event.target.value, max: date["max"] });
    console.log(date);
  };
  const updateDateMax = (event: any) => {
    setDate({ max: event.target.value, min: date["min"] });

    console.log(date);
  };
  // function to push data to parent
  const pushToParent = () => {
    var data: any = {};
    data["type"] = 2;
    data["attribute"] = prop.attribute;
    data["filterType"] = 0;
    data["data"] = date;
    if (data["data"] !== "") prop.pushData(data);
  };
  React.useEffect(() => {
    if (prop.submit) pushToParent();
  });

  return (
    <>
      <form className={classes.container} noValidate>
        <b style={{ margin: "auto 0", width: "5em" }}>From </b>
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2016-05-24T10:30"
          className={classes.textField}
          onChange={(e) => {
            updateDateMin(e);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>

      <form className={classes.container} noValidate>
        <b style={{ margin: "auto 0", width: "5em" }}>To </b>

        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          onChange={(e) => {
            updateDateMax(e);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </>
  );
}
