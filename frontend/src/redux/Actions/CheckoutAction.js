import {
  GET_CHECKOUT_SUCCESS,
  GET_CHECKOUT_ERROR,
  GET_CHECKOUT_LOADING,
  POST_CHECKOUT_SUCCESS,
  POST_CHECKOUT_ERROR,
  POST_CHECKOUT_LOADING,
  PUT_CHECKOUT_SUCCESS,
  PUT_CHECKOUT_ERROR,
  PUT_CHECKOUT_LOADING
} from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";

export const CheckOutGetProduct = () => {
  return dispatch => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: GET_CHECKOUT_LOADING });
    Axios.get(`${APIURL}product/getCheckout/${IdUserRedux}`)
      .then(res => {
        var dataTotalHarga = 0;
        res.data.dataCheckout.forEach(val => {
          dataTotalHarga += val.totalHarga;

          dispatch({ type: GET_CHECKOUT_SUCCESS, payload: { dataCheckout: res.data.dataCheckout, dataTotalHarga } });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_CHECKOUT_ERROR });
      });
  };
};
export const PostCheckoutProduct = (PostCheckout) => {
  return dispatch => {
    dispatch({ type: POST_CHECKOUT_LOADING });
    Axios.post(`${APIURL}product/postCheckout`, { PostCheckout })
      .then(res => {
        if (res.data.validation === false) {
          dispatch({ type: POST_CHECKOUT_ERROR, payload: res.data.message });
        } else {
          dispatch({ type: POST_CHECKOUT_SUCCESS, payload: res.data.dataCheckout });
          dispatch(CheckOutGetProduct());
        //   dispatch(PutCheckoutProduct(dataCheckoutRedux));
        }
        //   console.log("berhasil", res.data.dataCheckout);
      })
      .catch(err => {
        console.log("error onclick checkout", err);
        dispatch({ type: POST_CHECKOUT_ERROR, payload: "gagal post" });
      });
  };
};
export const PutCheckoutProduct = dataCheckoutRedux => {
  return dispatch => {
    dispatch({ type: PUT_CHECKOUT_LOADING });
    for (var i = 0; i < dataCheckoutRedux.length; i++) {
      var data = {
        id: dataCheckoutRedux[i].id,
        userId: dataCheckoutRedux[i].userId,
        productId: dataCheckoutRedux[i].productId,
        size: dataCheckoutRedux[i].size,
        jumlah: dataCheckoutRedux[i].jumlah,
        harga: dataCheckoutRedux[i].harga,
        totalHarga: dataCheckoutRedux[i].totalHarga,
        status: "waiting payment"
      };
      var id = data.id;
      Axios.put(`${APIURL}product/waitingpayment/${id}`, { data })
      .then(res=>{
        dispatch(CheckOutGetProduct())
      })
      .catch(err=>{
        console.log(err)
      })
      
    }
  };
};
