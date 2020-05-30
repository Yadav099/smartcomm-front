//constants for nav bar add here
export const navBar = [
  {
    id: 0,
    mainList: "Send",
    subList: ["Email", "SMS", "Push notification"],
  },
  {
    id: 1,
    mainList: "New user",
    subList: ["Add/Delete"],
  },
  {
    id: 2,
    mainList: "Customer",
    subList: [""],
  },
  {
    id: 3,
    mainList: "Logout",
    subList: [""],
  },
];
export const Fileds = ["User Name", "Employee Id", "Password"];
// constants for filters add here
// export const Filters = ["All Users", "Loyal Users", "Users about to leave"];
export const Filters = ["Email"];

export const dbFilter = [
  { attribute: "customer_name", type: 0, name: "Names" },
  { attribute: "customer_email", type: 0, name: "Emails" },
  { attribute: "customer_pno", type: 1, name: "Phone-Number" },
  { attribute: "customer_gender", type: 0, name: "Gender" },
  { attribute: "customer_age", type: 1, name: "Age" },
  { attribute: "customer_place", type: 0, name: "Place" },
  { attribute: "date", type: 3, name: "Date of registered" },
];
// export const URL_LINK = "http://127.0.0.1:5000/";
export const URL_LINK = "https://2b682732a983.ngrok.io/";
