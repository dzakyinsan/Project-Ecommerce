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

// =============================== function get product =====================
export const AdminGetProduct = () => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_LOADING });
    Axios.get(`${APIURL}product/getproductFootball`)
      .then(resfootball => {
        Axios.get(`${APIURL}product/getproductBasketball`).then(resbasketball => {
          Axios.get(`${APIURL}product/getproductRunning`).then(resrunning => {
            Axios.get(`${APIURL}product/getproduct`).then(resdataproduct => {
              dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: {
                  dataProduct: resdataproduct.data.dataProduct,
                  dataRunning: resrunning.data.dataRunning,
                  dataBasketball: resbasketball.data.dataBasketball,
                  dataFootball: resfootball.data.dataFootball
                }
              });
              dispatch({ type: GET_CATEGORY_SUCCESS, payload: resdataproduct.data.dataCategory });
              dispatch({ type: GET_DATAEDIT_SUCCESS, payload: resdataproduct.data.ForDataEdit });
            });
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_PRODUCT_ERROR });
      });
    // Axios.get(`${APIURL}product/getproduct`)
    //   .then(res => {
    //     dispatch({
    //       type: GET_PRODUCT_SUCCESS,
    //       payload: { dataProduct: res.data.dataProduct, dataRunning: res.data.dataRunning, dataBasketball: res.data.dataBasketball, dataFootball: res.data.dataFootball }
    //     });
    //     dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.dataCategory });
    //     dispatch({ type: GET_DATAEDIT_SUCCESS, payload: res.data.ForDataEdit });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     dispatch({ type: GET_PRODUCT_ERROR });
    //   });
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

        // dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data.dataProduct });
        // dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.dataCategory });
        // dispatch({ type: MODAL_DELETE });
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
