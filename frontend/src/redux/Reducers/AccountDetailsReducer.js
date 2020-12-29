import {
  EDIT_DETAILS_SUCCESS,
  EDIT_DETAILS_ERROR,
  EDIT_DETAILS_LOADING,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_ERROR,
  GET_DETAILS_LOADING,
  PASS_CHANGE_SUCCESS,
  PASS_CHANGE_ERROR,
  PASS_CHANGE_LOADING,
} from "./../Actions/types";

const INITIAL_STATE = {
  dataUserDetailRedux: {},
  message: "",
  messagePass: "",
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DETAILS_SUCCESS:
      return { ...state, dataUserDetailRedux: action.payload };
    case GET_DETAILS_ERROR:
      return { ...state, message: action.payload };
    case GET_DETAILS_LOADING:
      return { ...state, loading: true };
    case EDIT_DETAILS_SUCCESS:
      return { ...state, message: action.payload };
    case EDIT_DETAILS_ERROR:
      return { ...state, message: action.payload };
    case EDIT_DETAILS_LOADING:
      return { ...state, loading: true };
    case PASS_CHANGE_SUCCESS:
      return { ...state, messagePass: action.payload };
    case PASS_CHANGE_ERROR:
      return { ...state, message: action.payload };
    case PASS_CHANGE_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
