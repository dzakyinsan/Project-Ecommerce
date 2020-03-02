import { AUTH_LOADING, AUTH_SYSTEM_REGIS_ERROR, AUTH_SYSTEM_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_REGIS_SUCCESS, USER_LOGOUT, USER_MODAL_OPEN,USER_MODAL_CLOSE } from "./../Actions/types";

const INITIAL_STATE = {
  id: "",
  username: "",
  email: "",
  status: "",
  error: "",
  errorlogin: "",
  token: "",
  register: false,
  login: false,
  authchecked: false,
  loading: false,
  modalOpen: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_REGIS_SUCCESS:
      return { ...INITIAL_STATE, register: true,modalOpen:true };
    case USER_LOGIN_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload, login: true, modalOpen: false };
    case AUTH_SYSTEM_REGIS_ERROR:
      return { ...INITIAL_STATE, error: action.payload, authchecked: true,modalOpen:true };
    case AUTH_SYSTEM_LOGIN_ERROR:
      return { ...INITIAL_STATE, errorlogin: action.payload, authchecked: true,modalOpen:true };
    case AUTH_LOADING:
      return { ...state, error: "", loading: true };
    case USER_LOGOUT:
      return { ...INITIAL_STATE, authchecked: true };
    case USER_MODAL_OPEN:
      return { ...INITIAL_STATE, modalOpen: true };
    case USER_MODAL_CLOSE:
      return { ...INITIAL_STATE, modalOpen: false };
    case USER_LOGOUT:
      return {state}
    default:
      return state;
  }
};
