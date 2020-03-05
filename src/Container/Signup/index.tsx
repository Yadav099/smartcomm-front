import React from  'react'
import { Button } from '../../Component/Button';
import { FileInput } from '../../Component/FileInput';
import { TextBox } from '../../Component/TextBox';

//interface to store the data inserted on the signup page
interface Registration{
    companyName :string
    companyMail :string
    employeeName :string
    employeeMail: string
    employeeID: string
    configFile: File
}

//function to store the register
export const Signup: React.FC = () => {
    const[companyName,updateCompanyName]=React.useState("");
    const[employeeName,updateEmployeeName]=React.useState("");
    const[companyMail,updateCompanyEmail]=React.useState("");
    const[employeeMail,updateEmployeeEmail]=React.useState("");
    const[employeeID,updateEmployeeID]= React.useState("")
    const[configFile,updateConfigFile]=React.useState();
    
    const AddUser = () => {
        const entry: Registration = {companyName,companyMail,employeeName,employeeMail,employeeID,configFile};
        console.log(entry);
    };

    const onUpdateCompanyName = (name:string) =>{
        updateCompanyName(name);
    }
    const onUpdateCompanyMail = (mailID:string) =>{
        updateCompanyEmail(mailID);
    }
    const onUpdateEmployeeName = (name:string) =>{
        updateEmployeeName(name);
    }
    const onUpdateEmployeeMail = (mail:string) =>{
        updateEmployeeEmail(mail);
    }
    const onUpdateEmployeeID = (ID:string) =>{
        updateEmployeeID(ID);
    }
    const onUpdateConfigFile = (e: React.ChangeEvent<HTMLInputElement>) =>{
        updateConfigFile(e.target.files);
    }
    return(
        <div>
            <h2>SignUp</h2>
            <div>
                <section className="companyData">
                    <h3>COMPANY</h3>
                    <TextBox placeHolder="Name" updater={onUpdateCompanyName} />
                    <TextBox placeHolder="Email" updater={onUpdateCompanyMail}/>
                    <FileInput uplodeFile={onUpdateConfigFile} />
                </section>
                <section className="EmployeeData">
                    <h3>EMPLOYEE</h3>
                    <TextBox placeHolder="Name" updater={onUpdateEmployeeName}/>
                    <TextBox placeHolder="Email" updater={onUpdateEmployeeMail}/>
                    <TextBox placeHolder="ID.No." updater={onUpdateEmployeeID}/>
                </section>
            </div>
            <Button onClick={AddUser}>
                Add Entry
            </Button>
        </div>
    );

}