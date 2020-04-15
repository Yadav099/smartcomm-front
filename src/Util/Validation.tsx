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
