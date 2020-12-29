import { GET_CART_SUCCESS, GET_CART_ERROR, GET_CART_LOADING, CART_DELETE_LOADING, CART_DELETE_ERROR } from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";

export const CartGetProduct = () => {
  return (dispatch) => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: GET_CART_LOADING });
    Axios.get(`${APIURL}product/getCart/${IdUserRedux}`)
      .then((res) => {
        var dataTotalHarga = 0;
        res.data.dataCart.forEach((val) => {
          dataTotalHarga += val.totalHarga;
        });
        dispatch({ type: GET_CART_SUCCESS, payload: { dataCart: res.data.dataCart, dataTotalHarga } });
      })
      .catch((err) => {
        dispatch({ type: GET_CART_ERROR });
      });
  };
};
export const DeleteCartAction = (idDelete, IdUserRedux) => {
  return (dispatch) => {
    dispatch({ type: CART_DELETE_LOADING });
    Axios.delete(`${APIURL}product/deletecart/${idDelete}/${IdUserRedux}`)
      .then((res) => {
        Axios.get(`${APIURL}product/getCart/${IdUserRedux}`)
          .then((res) => {
            var dataTotalHarga = 0;
            res.data.dataCart.forEach((val) => {
              dataTotalHarga += val.totalHarga;
            });
            dispatch({ type: GET_CART_SUCCESS, payload: { dataCart: res.data.dataCart, dataTotalHarga } });
          })
          .catch((err) => {
            dispatch({ type: GET_CART_ERROR });
          });
      })
      .catch((err) => {
        dispatch({ type: CART_DELETE_ERROR });
      });
  };
};
