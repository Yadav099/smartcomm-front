import { SET } from "../../Redux/Action/action";

//reducer function to set admin true or not

const initialState = {
  Admin: {},
};
interface IUser {
  type: string;
  admin: boolean;
}

export default function reducer(state = initialState, action: IUser) {
  switch (action.type) {
    case SET:
      const newState = { ...state };
      newState.Admin = action.admin;
      return newState;

    default:
      return state;
  }
}
