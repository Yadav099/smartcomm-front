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
  Typography,
  Container,
  TextField, Button,
  Paper,
  Divider,
} from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles, Theme } from "@material-ui/core/styles";

import NativeSelect from "@material-ui/core/NativeSelect";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SendIcon from "@material-ui/icons/Send";

//to accept the prop from home
interface IFilter {
  selectFilter: (index: number) => void;
  send: (filter: number, content: string) => void;
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
    FieldName: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
    radio_filter: {
      margin: " 0 3em",
      fontSize: "1.5em"
    },
    filter_label: {
      display: "flex",
      justifyContent: "start",
      fontSize: "1.5em"
    },
    dropdown: {
      width: "300px"
    }
  })
);

//filter component used in home container
const Filter = (prop: any) => {
  const filterStyle = useStyles();
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [gender, setGender] = React.useState("");
  const [interest, setInterest] = React.useState("");

  
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
    console.log(gender);
  };

  const handleInterestChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInterest(event.target.value as string);
    console.log(interest);
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
    console.log(state.checkedA);
    console.log(state.checkedB);
    console.log(state.checkedC);
  };

  const [filter, setFilter] = React.useState(0);

  //function to set filter
  const selectFilter = (index: number) => {
    setFilter(index);
  };
  //state to set email content
  const [emailContent, setEmailContent] = React.useState("");

  //function to set state of email content on change
  const emailBody = (event: any) => {
    setEmailContent(event.target.value);
  };
  return (
    <Paper className="emailComponent" square>
      <FormControl className="textAreaWrapper">
      <Container>
      <Row>
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
      </Row>
      <Row>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange("checkedA")}
                value="checkedA"
                color="primary"
              />
            }
            label="Gender"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange("checkedB")}
                value="checkedB"
                color="primary"
              />
            }
            label="Age"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedC}
                onChange={handleChange("checkedC")}
                value="checkedC"
                color="primary"
              />
            }
            label="Interest"
          />
        </FormGroup>
      </Row>

      <Row>
        <Col>
          {state.checkedA && (
            <FormControl>
              <InputLabel htmlFor="demo-customized-select-native">
                Gender
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={gender}
                onChange={handleGenderChange}
                className={filterStyle.dropdown}
              >
                <option value="" />
                <option value="M">Male</option>
                <option value="F">Female</option>
              </NativeSelect>
            </FormControl>
          )}
        </Col>

        <Col>
          {state.checkedB && (
            <div>
              <Typography id="range-slider" gutterBottom>
                Age range
              </Typography>
              <Slider
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
          )}{" "}
        </Col>

        <Col>
          {state.checkedC && (
            <FormControl>
              <InputLabel htmlFor="demo-customized-select-native">
                Gender
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={interest}
                onChange={handleInterestChange}
                className={filterStyle.dropdown}
              >
                <option value="" />
                <option value="test1">test1</option>
                <option value="test2">test2</option>
              </NativeSelect>
            </FormControl>
          )}{" "}
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col className={filterStyle.FieldName}>
          <Typography>Event :</Typography>
        </Col>
        <Col>
          <TextField label="event" />
        </Col>
      </Row>
      <br />
      <br />
    </Container>
        <Divider />

        <FormLabel className="email_label" style={{ fontSize: "2em" }}>
          Email template
        </FormLabel>
        <TextareaAutosize
          rowsMax={200}
          style={{ height: "30em", width: "80em", fontSize: "16px" }}
          className="textArea"
          aria-label="maximum height"
          onChange={value => {
            emailBody(value);
          }}
          onKeyDown={value => emailBody(value)}
        />
        <Container className="buttonWrapper">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              prop.send(filter, emailContent);
            }}
          >
            <b className="submitLabel">Send</b>
            <SendIcon />
          </Button>
        </Container>
      </FormControl>
    </Paper>

    
  );
};

export default Filter;
