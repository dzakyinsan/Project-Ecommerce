import {
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_CATEGORY_SUCCESS,
  GET_DATAEDIT_SUCCESS,
  // DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING,
  MODAL_DELETE
  // MODAL_ADD
} from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";
import Swal from "sweetalert2";

// =============================== function get product =====================
export const AdminGetProduct = page => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_LOADING });
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data.dataProduct });
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.dataCategory });
        dispatch({ type: GET_DATAEDIT_SUCCESS, payload: res.data.ForDataEdit });
      })

      .catch(err => {
        console.log(err);
        dispatch({ type: GET_PRODUCT_ERROR });
      });
  };
};

// ===================================== function delete data ====================
export const AdminDeleteProduct = idProduct => {
  return dispatch => {
    dispatch({ type: DELETE_PRODUCT_LOADING });
    Axios.delete(`${APIURL}product/deletedata/${idProduct}`)
      .then(res => {
        dispatch(AdminGetProduct());
        dispatch(OpenToggleDeleteRedux());
        let timerInterval;
        Swal.fire({
          title: "Deleting",
          html: " <b></b> ",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: DELETE_PRODUCT_ERROR });
      });
  };
};

export const OpenToggleDeleteRedux = index => {
  return dispatch => {
    dispatch({ type: MODAL_DELETE, payload: index });
  };
};

// ====================================== function add data =========================

// export const adddataproduct =(data)=>{
//   return dispatch=>{
//     dispatch ({ type: ADD_LOADING})
//    Axios.post(`${APIURL}product/postproduct`,data)
//   }
// }
