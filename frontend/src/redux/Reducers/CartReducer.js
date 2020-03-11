import { GET_CART_SUCCESS, GET_CART_ERROR, GET_CART_LOADING } from "./../Actions/types";

const INITIAL_STATE = {
  dataCartRedux: [],
  loading: false,
  message: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CART_SUCCESS:
      return { ...state, dataCartRedux: action.payload };
    case GET_CART_LOADING:
      return { ...state, loading: true };
    case GET_CART_ERROR:
      return { ...state, message: "axios gagal get di action redux" };
    default:
      return state;
  }
};
