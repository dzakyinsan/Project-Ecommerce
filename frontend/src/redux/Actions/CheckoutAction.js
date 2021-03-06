import {
  GET_CHECKOUT_SUCCESS,
  GET_CHECKOUT_ERROR,
  GET_CHECKOUT_LOADING,
  POST_CHECKOUT_SUCCESS,
  POST_CHECKOUT_ERROR,
  POST_CHECKOUT_LOADING,
  // PUT_CHECKOUT_SUCCESS,
  // PUT_CHECKOUT_ERROR,
  // PUT_CHECKOUT_LOADING
} from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";
import Swal from "sweetalert2";

export const CheckOutGetProduct = () => {
  return (dispatch) => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: GET_CHECKOUT_LOADING });
    Axios.get(`${APIURL}product/getCheckout/${IdUserRedux}`)
      .then((res) => {
        var dataTotalHarga = 0;
        res.data.dataCheckout.forEach((val) => {
          dataTotalHarga += val.totalHarga;
          dispatch({ type: GET_CHECKOUT_SUCCESS, payload: { dataCheckout: res.data.dataCheckout, dataTotalHarga } });
        });
      })
      .catch((err) => {
        dispatch({ type: GET_CHECKOUT_ERROR });
      })
      .finally((final) => {
        dispatch({ type: "LOADING_DATA" });
      });
  };
};
export const PostCheckoutProduct = (PostCheckout, AddImageFile) => {
  return (dispatch) => {
    var IdUserRedux = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    dispatch({ type: POST_CHECKOUT_LOADING });
    var formdata = new FormData();
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    formdata.append("image", AddImageFile.imageFile);
    formdata.append("data", JSON.stringify(PostCheckout));
    Axios.post(`${APIURL}product/postCheckout/${IdUserRedux}`, formdata, Headers)
      .then((res) => {
        if (res.data.validation === false) {
          dispatch({ type: POST_CHECKOUT_ERROR, payload: res.data.message });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Thank you. Your order has been received.`,
            showConfirmButton: false,
            timer: 2500,
          }).then((res2) => {
            dispatch({ type: POST_CHECKOUT_SUCCESS });
          });
          dispatch(CheckOutGetProduct());
          // dispatch(CheckOutGetProduct());
          // dispatch(PutCheckoutProduct(dataCheckoutRedux));
        }
      })
      .catch((err) => {
        dispatch({ type: POST_CHECKOUT_ERROR, payload: "gagal post" });
      });
  };
};
