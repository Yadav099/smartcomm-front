import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(0),

      
    },
    title: {
      flexGrow: 1,
      display:"flex",
      justifyContent: "center",
      
    },
    appbar:{
      backgroundColor:"#45398B",
      },
      company:{
        display:"flex",
      justifyContent: "center",
      flexDirection:"column",
      width: theme.spacing(50),
      },
      textfield:{
        width:"350px",
        margin:theme.spacing(2)
        

      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: theme.spacing(100),
        height: theme.spacing(80),
        margin:theme.spacing(6)
        
      },
      margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(2),
        width:"500px"
  
    },

      

      
  }),
);

export const Login = () => {
  const classes = useStyles();
  const[companyName,updateCompanyName]=React.useState("");
    
    
    const[employeeMail,updateEmployeeEmail]=React.useState("");
    const[password,updatePassword]= React.useState("")


  const handleClick = () => {
    console.log("post");
    axios
      .post(
        "https://45179375.ngrok.io/login ",
        {
          companyName: companyName,
          employeeMail: employeeMail,
          password: password,
          
        }
      )
      .then(function(response) {
        console.log(response.status);
        if (response.status === 200) {
          alert("success");
        }
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(companyName);
    console.log("Login Button Pressed");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            Smart Comm
          </Typography>
         
        </Toolbar>
      </AppBar>
      </Grid>
      <Grid container
  direction="row"
  justify="center"
  alignItems="center">
          <Paper className={classes.padding} style={{marginTop:"90px",marginLeft:"20px",marginRight:"20px"}} elevation={3}>
            
        <div className={classes.margin}>
          
            <Grid container spacing={8} alignItems="flex-end">
            
                <Grid item md={true} sm={true} xs={true}>
                    
                    <TextField
                id="outlined-basic"
                label="Company Name"
                variant="standard"
                value={companyName}
                onChange={e => updateCompanyName(e.target.value)}
                fullWidth autoFocus required
              />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                
                <Grid item md={true} sm={true} xs={true}>
                <TextField
                
                label="Employee Email-ID"
                variant="standard"
                value={employeeMail}
                onChange={e => updateEmployeeEmail(e.target.value)}
                fullWidth autoFocus required
              />
                </Grid>
            </Grid>

            <Grid container spacing={8} alignItems="flex-end">
                
                <Grid item md={true} sm={true} xs={true}>
                <TextField
                
                label="password"
                variant="standard"
                value={password}
                onChange={e => updatePassword(e.target.value)}
                fullWidth autoFocus required
              />
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
                <Grid item>
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                        />
                    } label="Remember me" />
                </Grid>
                <Grid item>
                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button  onClick={handleClick} variant="outlined" color="primary" style={{ textTransform: "none" } }>Login</Button>
            </Grid>
        </div>
    </Paper>
          
      </Grid>

      </Grid>
      
    
    </div>
  );
}
