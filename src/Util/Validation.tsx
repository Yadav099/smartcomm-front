import React from "react";

export const validateCompanyName = (name: string) => {
  if (!name) return true;
  else return false;
};

export const validateEmployeeEmail = (email: string) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (email.match(emailRegex) && email) return false;
  else return true;
};

export const validatePssword = (password: string) => {
  if (password) return false;
  return true;
};
// #     if ($('#company').val().length < 1){
// #       this.setError("company", "Please enter your company name");
// #       hasErrors = true;
// #     } else this.setError("company", null)

// #     if ($('#industry').val().length < 1){
// #       this.setError("industry", "Please enter the industry");
// #       hasErrors = true;
// #     } else this.setError("industry", null)

// #     if ($('#firstName').val().length < 1){
// #       this.setError("firstName", "Please enter your first name");
// #       hasErrors = true;
// #     } else this.setError("firstName", null)

// #     if ($('#lastName').val().length < 1) {
// #       this.setError("lastName", "Please enter your last name");
// #       hasErrors = true;
// #     } else this.setError("lastName", null)

// #     if ($('#email').val() == '') {
// #       this.setError("email", "Please enter your email address");
// #       hasErrors = true;
// #     } else this.setError("email", null)

// #     if ($('#email').val() !== /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/) {
// #       this.setError("email", "Please enter a valid email address");
// #       hasErrors = true;
// #     } else this.setError("email", null)

// #     if ($('#phone').val().length < 1) {
// #       this.setError("phone", "Please enter your phone number");
// #       hasErrors = true;
// #     } else this.setError("phone", null)

// #     return !hasErrors;
// #   },
