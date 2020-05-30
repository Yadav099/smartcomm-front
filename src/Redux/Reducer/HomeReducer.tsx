import { GET_DATA, SET_DATA } from "../Action/HomAction";

const initialState = {
  name: "",
  email: "",
  id: "",
  company: "",
  company_email: "",
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_DATA:
      return { ...state };
    case SET_DATA:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
        company: action.payload.company,
        company_email: action.payload.company_email,
      };
  }
}
