import React from "react";
import "./main.scss";
import { Filters } from "../../Constant/Constant";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  createStyles,
  Typography
} from "@material-ui/core";

//to accept the prop from home
interface IFilter {
  selectFilter: (index: number) => void;
}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "1em",
      height: "fit-content"
    },
    filter_wrapper: {
      display: "flex",
      flexDirection: "row",
      marginTop: "1em"
    },
    radio_filter: {
      margin: " 0 3em",
      fontSize: "1.5em"
    },
    filter_label: {
      display: "flex",
      justifyContent: "start",
      fontSize: "1.5em"
    }
  })
);

//filter component used in home container
const Filter = (prop: IFilter) => {
  const filterStyle = useStyles();
  return (
    <FormControl component="fieldset" className={filterStyle.root}>
      <div className={filterStyle.filter_label}>
        <FormLabel className={filterStyle.filter_label}>Filters</FormLabel>
      </div>
      <RadioGroup
        defaultValue={Filters[0]}
        aria-label="Filtes"
        name="Filters"
        className={filterStyle.filter_wrapper}
      >
        {/* loop through the constant filter items */}
        {Filters.map((item: string, index: number) => (
          <div className="try">
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "textSecondary"
                  }}
                >
                  {item}
                </Typography>
              }
              onChange={() => {
                prop.selectFilter(index);
              }}
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Filter;
