import React from  'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from 'axios'



export const Signup = () => {

  const[companyName,updateCompanyName]=React.useState("");
    const[employeeName,updateEmployeeName]=React.useState("");
    const[companyMail,updateCompanyEmail]=React.useState("");
    const[employeeMail,updateEmployeeEmail]=React.useState("");
    const[employeeID,updateEmployeeID]= React.useState("")
  

  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 350,
      },
    },
  }));
  const classes = useStyles()

  const handleClick= () =>{
    console.log("post")
    axios.post('http://tradenapp-env.us-east-1.elasticbeanstalk.com/api/v1/api-token-auth/', {
            companyname:companyName,
            companyemail:companyMail,
            employeename:employeeName,
            employeeid:employeeID,
            employeemail:employeeMail

          })
          .then(function (response) {
            console.log(response.status);
            if(response.status==200)
            {
              alert("success")      
            }
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
          
        console.log("Login Button Pressed")
  }
    
return(
    <Container>
  <Row>
  <Navbar className="justify-content-center" id="color-nav" fixed="top" style={{height:"60px",fontSize:"30px" }}>Smart Comm</Navbar>
  </Row>
  <br/>
  <br/>
  <Container className="main-signup">
  <Container className="main-signup">
    <br/>
    <br/>
  <br/>
  <br/>
  <br/>
    <Row>
    <h3 style={{height:"20px" }}>Company</h3>
    </Row>
    <br/>
   <Row>
  <form className={classes.root} noValidate autoComplete="off">
  <TextField id="outlined-basic" label="Company Name"  variant="outlined" value={companyName} onChange={(e) => updateCompanyName(e.target.value)}/>
  <br />
  <TextField id="outlined-basic" label="Company Email" variant="outlined" value={companyMail} onChange={(e) => updateCompanyEmail(e.target.value)}/>
</form>
</Row> 
  
  </Container>
  <br/>
  <br/>
  <Container>
    <br/>
    <Row>
    <h3 style={{height:"20px" }}>Employee</h3>
    </Row>
    <br/>
   <Row>
  <form className={classes.root} noValidate autoComplete="off">
  <TextField id="outlined-basic" label="Employee Name"  variant="outlined" value={employeeName} onChange={(e) => updateEmployeeName(e.target.value)}/>
  <br />
  <TextField id="outlined-basic" label="Employee ID" variant="outlined" value={employeeID} onChange={(e) => updateEmployeeID(e.target.value)}/>
  <br />
  <TextField id="outlined-basic" label="Employee Email" variant="outlined" value={employeeMail} onChange={(e) => updateEmployeeEmail(e.target.value)}/>
</form>
</Row> 
  
  </Container>
  <br/>

  <Row>
    <Button onClick={handleClick} style={{width:"10em" ,backgroundColor:"#45398B",color:"white"}}>Sign Up</Button>
  </Row>
  </Container>
  
</Container>
)

}




