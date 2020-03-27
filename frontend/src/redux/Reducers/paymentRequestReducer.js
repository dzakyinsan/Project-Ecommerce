import { GET_PAYREQ_SUCCESS, GET_PAYREQ_ERROR, GET_PAYREQ_LOADING, GET_EACH_SUCCESS, GET_EACH_ERROR, GET_EACH_LOADING } from "./../Actions/types";

const INITIAL_STATE = {
  dataPaymentRequest: [],
  dataEachProductRedux: [],
  message: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAYREQ_SUCCESS:
      // console.log("action.payload", action.payload);
      return { ...state, dataPaymentRequest: action.payload, loading: false };
    case GET_PAYREQ_ERROR:
      return { ...state, message: action.payload };
    case GET_PAYREQ_LOADING:
      return { ...state, loading: true };
    case GET_EACH_SUCCESS:
      return { ...state, dataEachProductRedux: action.payload };
    case GET_EACH_ERROR:
      return { ...state, message: action.payload };
    case GET_EACH_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
