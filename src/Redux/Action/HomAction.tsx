export const GET_DATA = "GET_DATA";

export const SET_DATA = "SET_DATA";

export const getData = () => {
  return { type: GET_DATA };
};

export const setData = (data: any) => {
  return {
    type: SET_DATA,
    payload: {
      name: data.name,
      email: data.email,
      id: data.id,
      company: data.company,
      company_email: data.company_email,
    },
  };
};
