import {
  GET_CHECKOUT_ERROR,
  GET_CHECKOUT_LOADING,
  GET_CHECKOUT_SUCCESS,
  POST_CHECKOUT_SUCCESS,
  POST_CHECKOUT_ERROR,
  POST_CHECKOUT_LOADING,
  PUT_CHECKOUT_SUCCESS,
  PUT_CHECKOUT_ERROR,
  // PUT_CHECKOUT_LOADING
} from "./../Actions/types";

const INITIAL_STATE = {
  dataCheckoutRedux: [],

  dataTotalHarga: 0,
  message: "",
  loading: false,
  loadingData:true,
  goToCompletePage:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHECKOUT_SUCCESS:
      return { ...state, dataCheckoutRedux: action.payload.dataCheckout, dataTotalHarga: action.payload.dataTotalHarga };
    case "LOADING_DATA":
      return{...state,loadingData:false}
    case GET_CHECKOUT_LOADING:
      return { ...state, loading: true };
    case GET_CHECKOUT_ERROR:
      return { ...state, message: "axios gagal get di action redux" };
    case POST_CHECKOUT_SUCCESS:
      return { ...state,goToCompletePage:true};
    case POST_CHECKOUT_ERROR:
      return { ...state, message: action.payload };
    case POST_CHECKOUT_LOADING:
      return { ...state, loading: true };
    case PUT_CHECKOUT_SUCCESS:
      return {...state,message: "berhasil post dan update"}
    case  PUT_CHECKOUT_ERROR:
      return {...state,message:'gagal put'}
    default:
      return state;
  }
};
