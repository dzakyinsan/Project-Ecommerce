import {GET_CHECKOUT_ERROR,GET_CHECKOUT_LOADING,GET_CHECKOUT_SUCCESS  } from "./../Actions/types";

const INITIAL_STATE={
    dataCheckoutRedux:[],
    dataTotalHarga:0,
    message: "",
    loading:false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CHECKOUT_SUCCESS:
        return { ...state, dataCheckoutRedux: action.payload.dataCheckout,dataTotalHarga:action.payload.dataTotalHarga };
      case GET_CHECKOUT_LOADING:
        return { ...state, loading: true };
      case GET_CHECKOUT_ERROR:
        return { ...state, message: "axios gagal get di action redux" };
      default:
        return state;
    }
  };
  